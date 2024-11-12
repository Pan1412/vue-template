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
                                    <th class="thead-bg" style="text-align: left;">รายวิชาเพิ่มเติม</th>
                                    <th class="thead-bg" style="min-width: 100px;">ระดับชั้น</th>
                                    <th class="thead-bg" style="min-width: 200px;">ครูประจำชุมนุม</th>
                                    <th class="thead-bg" style="text-align: right;">จำนวน</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="listOsj.length > 0" v-for="(osj, index) in listOsj">
                                    <td>{{ index + 1 }}</td>
                                    <td>
                                        <b>{{ osj.osj_name }} ({{ osj.osj_code }})</b>
                                    </td>
                                    <td>
                                        <label v-if="osj.osj_class == 1">ม.ต้น</label>
                                        <label v-else-if="osj.osj_class == 2">ม.ปลาย</label>
                                        <label v-else >ทุกระดับ</label>
                                    </td>
                                    <td>{{ osj.prefix_tea }}{{ osj.first_name }} {{ osj.last_name }}</td>
                                    <td align="right">
                                        <p class="p-link-target f-w-500" @click="gotoPage('/student/listMember', {type: 'osj', id: osj.osj_id })">
                                            {{ osj.total }}/{{ osj.osj_limit }}
                                        </p>
                                    </td>
                                </tr>
                                <tr v-if="listOsj.length == 0" align="center">
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
            listOsj: [],
            studentId: '15265'
        }
    },

    async mounted() {
        await this.getOsj()
    },

    methods: {
        async getOsj(){
            await callApi.getOsj({ student_id: this.studentId }).then( res => {
                if(res.code == 0){
                    this.listOsj = res.result
                }
            }).catch( err => {

            })
        }
    },
}
</script>

<style lang="scss" scoped>
</style>