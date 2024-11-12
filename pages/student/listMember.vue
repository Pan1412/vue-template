<template>
    <div>
        <div class="row">
            <div class="col bgbox2">

                <div class="d-flex justify-content-between">
                    <button class="btn btn-danger btn-sm" @click="gotoPage('/student/main')">
                        <Icon name="ep:refresh-left" style="padding: 0 0; margin: 0 0; font-size: 1rem;"
                            class="fm-kanit" />
                        กลับหน้าก่อน
                    </button>

                    <h3 class="sriracha-font">{{ nameHead }}</h3>
                </div>

                <div class="mt-3">
                    <div class="table-responsive mt-3">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th class="thead-bg" style="min-width: 40px;">#</th>
                                    <th class="thead-bg" style="text-align: left;">เลขประจำตัว</th>
                                    <th class="thead-bg" style="min-width: 100px; text-align: left;">ชื่อ-นามสกุล</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="listMember.length > 0" v-for="(member, index) in listMember">
                                    <td>
                                        <b>{{ index+1 }}</b>
                                    </td>
                                    <td>
                                        <b>{{ member.id_school }}</b>
                                    </td>
                                    <td>{{ member.prefix_stu }}{{ member.name_stu }} {{ member.surname_stu }}</td>
                                </tr>
                                <tr v-if="listMember.length == 0">
                                    <td colspan="3" align="center">ไม่พบข้อมูล</td>
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
            listMember: [],
            nameHead: ''
        }
    },

    async mounted() {
        await this.getListMemeber()
    },

    methods: {
        async getListMemeber(){

            if(this.$route.query.type == 'club'){
                let actId = this.$route.query.id
                await callApi.getListMember({act_id: actId}).then( res => {
                    if(res.code == 0){
                        this.listMember = res.result
                        this.nameHead = this.listMember[0].act_name
                    }
                }).catch( err => {

                })
            }else if (this.$route.query.type == 'osj'){
                let osjId = this.$route.query.id
                await callApi.getOsjMember({osj_id: osjId}).then( res => {
                    if(res.code == 0){
                        this.listMember = res.result
                        this.nameHead = this.listMember[0].osj_name
                    }
                }).catch( err => {

                })
            }

            
        }
    },
}
</script>

<style lang="scss" scoped>

</style>