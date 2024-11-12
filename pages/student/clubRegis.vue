<template>
    <div>
        <div class="row">
            <div class="col bgbox2">

                <div align="left">
                    <button class="btn btn-danger btn-sm" @click="gotoPage('/student/main')">
                        <Icon name="ep:refresh-left" style="padding: 0 0; margin: 0 0; font-size: 1rem;"
                            class="fm-kanit" />
                        กลับหน้าก่อน
                    </button>
                </div>

                <div class="mt-5">
                    <div class="table-responsive mt-3">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th class="thead-bg" style="min-width: 40px;">#</th>
                                    <th class="thead-bg" style="text-align: left;">ชื่อชุมนุม</th>
                                    <th class="thead-bg" style="min-width: 100px;">ระดับชั้น</th>
                                    <th class="thead-bg" style="min-width: 200px;">ครูประจำชุมนุม</th>
                                    <th class="thead-bg" style="text-align: right;">จำนวน</th>
                                    <th class="thead-bg" style="text-align: right;"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="listClub.length > 0" v-for="(club, index) in listClub">
                                    <td>{{ index + 1 }}</td>
                                    <td>
                                        <b>{{ club.act_name }}</b>
                                        <br>
                                            {{ club.act_explan }}
                                        </br>
                                        <br/>
                                        <p color=" #569617 "><b>สถานที่เรียนชุมนุม :: </b>{{ club.act_addr }}</p>
                                    </td>
                                    <td>
                                        <label v-if="club.act_class == 1">ม.ต้น</label>
                                        <label v-else-if="club.act_class == 2">ม.ปลาย</label>
                                        <label v-else >ทุกระดับ</label>
                                    </td>
                                    <td>{{ club.prefix_tea }}{{ club.first_name }} {{ club.last_name }}</td>
                                    <td align="right">
                                        <p class="p-link-target f-w-500" @click="gotoPage('/student/listMember', {type: 'club', id: club.act_id })">
                                            {{ club.total }}/{{ club.act_limit }}
                                        </p>
                                    </td>
                                    <td>
                                        <button class="btn btn-success btn-sm w-100" :disabled="disabledBTN" @click="regisClub(club)" v-if="club.total < club.act_limit">ลงทะเบียน</button>
                                        <button class="btn btn-danger btn-sm w-100" disabled v-if="club.total >= club.act_limit">เต็ม</button>
                                    </td>
                                </tr>
                                <tr v-if="listClub.length == 0" align="center">
                                    <td colspan="6">ไม่พบข้อมูล</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import callApi from '../api/callApi'

export default {
    setup() {
        const swal = getCurrentInstance().appContext.config.globalProperties;
        return {swal}
    },

    data() {
        return {
            listClub: [],
            studentId: '',
            disabledBTN: false
        }
    },

    async mounted() {
        let auth = this.getStore().setAuth()

        if(auth){
            this.studentId = auth.id_school
        }
        await this.getClub()
    },

    methods: {
        async getClub(){
            await callApi.getClub({ student_id: this.studentId }).then( res => {
                if(res.code == 0){
                    this.listClub = res.result
                }
            }).catch( err => {

            })
        },

        async regisClub(club) {
            let check = confirm(`คุณตัองการลงทะเบียนชุมนุม "${club.act_name}" ของ "คุณครู${club.first_name} ${club.last_name}" ใช่หรือไม่ ***เมื่อยืนยันการลงทะเบียนแล้วจะไม่สามารถยกเลิกได้***`)
            if(check){
                this.disabledBTN = true
                this.alertModal('loading', 'กำลังลงทะเบียน กรุณารอสักครู่....')

                await callApi.regisClubStudent({student_id: this.studentId, act_id: club.act_id }).then( res => {
                    if(res.code == 0){
                        this.alertModal('success', 'สำเร็จ', 'ลงทะเบียนสำเร็จ')

                    }else if (res.code == 2){
                        this.alertModal('warning', 'ไม่สำเร็จ', 'เคยลงทะเบียนชุมนุมอื่นไปแล้ว')

                    }else if (res.code == 3){
                        this.alertModal('warning', 'ไม่สำเร็จ', 'ชุมนุมนี้มีจำนวนสมาชิกครบแล้ว')

                    }else{
                        this.alertModal('error', 'ไม่สำเร็จ', 'ลงทะเบียนไม่สำเร็จ')
                    }
                }).catch( err => {

                })
            }
            this.disabledBTN = false
            // window.location.reload()
        }
    },
}
</script>

<style lang="scss" scoped>
.thead-bg {
    background-color: #e9ecef;
    color: #495057;
    border-color: #dee2e6;
    min-width: 120px;
}
</style>