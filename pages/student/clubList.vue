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
                                        <font color=" #569617 "><b>สถานที่เรียนชุมนุม :: </b>{{ club.act_addr }}</font>
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
                                </tr>
                                <tr v-if="listClub.length == 0" align="center">
                                    <td colspan="5">ไม่พบข้อมูล</td>
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
    data() {
        return {
            listClub: [],
            studentId: ''
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
        }
    },
}
</script>

<style lang="scss" scoped>
</style>