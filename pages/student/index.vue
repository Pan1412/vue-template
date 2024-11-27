<template>
    <div>
        <div class="row">
            <div class="col bgbox2">
                <div class="header_text_l">
                    <h2 class="sriracha-font">รายการลงทะเบียน</h2>
                </div>
                <label class="Promptfont">{{ fullName }}</label>

                <label>{{ fullName }}</label>

                <div class="mt-3">
                    <nav>
                        <div class="nav nav-tabs w-100" id="nav-tab" role="tablist">
                            <button class="nav-link active w-50" id="nav-club-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-club" type="button" role="tab" aria-controls="nav-club"
                                aria-selected="true">กิจกรรมชุมนุม</button>

                            <button class="nav-link w-50" id="nav-subject-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-subject" type="button" role="tab" aria-controls="nav-subject"
                                aria-selected="false">รายวิชาเพิ่มเติม</button>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-club" role="tabpanel"
                            aria-labelledby="nav-club-tab" tabindex="0">

                            <div class="d-flex justify-content-end mt-2">
                                <button class="btn btn-primary btn-sm" @click="gotoPage('/student/clubList')">
                                    <Icon name="mdi:file-document-outline"
                                        style="padding: 0 0; margin: 0 0; font-size: 1.5rem;" class="fm-kanit" />
                                    รายชื่อชุมนุนม {{ `${term}/${year}` }}
                                </button>

                                <button class="btn btn-success btn-sm ms-2" @click="gotoPage('/student/clubRegis')"
                                    :disabled="openClub == 0 ? true : false">
                                    <Icon name="material-symbols:add"
                                        style="padding: 0 0; margin: 0 0; font-size: 1.5rem;" class="fm-kanit" />
                                    ลงทะเบียนชุมนุม
                                </button>
                            </div>

                            <div class="table-responsive mt-3">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th class="thead-bg">ปีการศึกษา</th>
                                            <th class="thead-bg">ชื่อชุมนุม</th>
                                            <th class="thead-bg">ครูประจำชุมนุม</th>
                                            <th class="thead-bg" style="text-align: right;">ผลการลงทะเบียน</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="listClubRegisted.length > 0" v-for="list in listClubRegisted">
                                            <td>
                                                <b>
                                                    {{ list.regis_term }}/{{ list.regis_year }}
                                                </b>
                                            </td>
                                            <td>
                                                <p class="p-link-target"
                                                    @click="gotoPage('/student/listMember', { type: 'club', id: list.act_id })">
                                                    {{ list.act_name }}
                                                </p>
                                            </td>
                                            <td>{{ list.prefix_tea }}{{ list.first_name }} {{ list.last_name }}</td>
                                            <td align="right">
                                                <button class="btn btn-success btn-sm w-75" disabled
                                                    v-if="list.status == 1">
                                                    <Icon name="mingcute:check-fill" class="icon-status" />
                                                    ผ่าน
                                                </button>

                                                <button class="btn btn-danger btn-sm w-75" disabled
                                                    v-else-if="list.status == 2">
                                                    <Icon name="lets-icons:close-round" class="icon-status" />
                                                    ไม่ผ่าน
                                                </button>

                                                <button class="btn btn-secondary btn-sm w-75" disabled v-else>
                                                    <Icon name="mingcute:check-fill" class="icon-status" />
                                                    ไม่ระบุ
                                                </button>
                                            </td>
                                        </tr>
                                        <tr v-if="listClubRegisted.length == 0" align="center">
                                            <td colspan="4">ไม่พบข้อมูล</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>

                        <div class="tab-pane fade" id="nav-subject" role="tabpanel" aria-labelledby="nav-subject-tab"
                            tabindex="0">

                            <div class="d-flex justify-content-end mt-2">
                                <button class="btn btn-primary btn-sm" @click="gotoPage('/student/osjList')">
                                    <Icon name="mdi:file-document-outline"
                                        style="padding: 0 0; margin: 0 0; font-size: 1.5rem;" class="fm-kanit" />
                                    รายชื่อวิชาเพิ่มปี 2/2567
                                </button>

                                <button class="btn btn-success btn-sm ms-2" @click="gotoPage('/student/osjRegis')"
                                    :disabled="openClub == 0 ? true : false">
                                    <Icon name="material-symbols:add"
                                        style="padding: 0 0; margin: 0 0; font-size: 1.5rem;" class="fm-kanit" />
                                    ลงทะเบียนชวิชาเพิ่มเติม
                                </button>
                            </div>

                            <div class="table-responsive mt-3">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th class="thead-bg">ปีการศึกษา</th>
                                            <th class="thead-bg">ชื่อรายวิชาเพิ่มเติม</th>
                                            <th class="thead-bg">ครูประจำชุมนุม</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="listOsjRegisted.length > 0" v-for="list in listOsjRegisted">
                                            <td>
                                                <b>
                                                    {{ list.sregis_term }}/{{ list.sregis_year }}
                                                </b>
                                            </td>
                                            <td>
                                                <p class="p-link-target"
                                                    @click="gotoPage('/student/listMember', { type: 'osj', id: list.osj_id })">
                                                    {{ list.osj_name }} ({{ list.osj_code }})
                                                </p>
                                            </td>
                                            <td>{{ list.prefix_tea }}{{ list.first_name }} {{ list.last_name }}</td>
                                        </tr>
                                        <tr v-if="listOsjRegisted.length == 0" align="center">
                                            <td colspan="3">ไม่พบข้อมูล</td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>

                        </div>
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
            studentId: '',
            listClubRegisted: [],
            listOsjRegisted: [],
            openClub: 0,
            fullName: '',
            term: '',
            year: ''
        }
    },

    async mounted() {

        let auth = this.getStore().setAuth()

        if (auth) {
            this.studentId = auth.id_school
            let classCheck = auth.class == 'vc' ? `ระดับชั้นปประกาศนียบัตรวิชาชีพชั้นปีที่ ${auth.room}` : `ระดับชั้นมัธยมศึกษาปีที่ ${auth.class} ห้อง ${auth.room}`
            this.fullName = `ของ ${auth.prefix_stu}${auth.name_stu} ${auth.surname_stu} ${classCheck}`
        }

        await this.getOpen()
        await this.getClubRegisted()
        await this.getOsjRegisted()
        await this.getOpenClub()

    },

    methods: {
        async getOpen() {
            await callApi.getOpenClub().then(res => {
                this.openClub = res.open
            })
        },

        async getClubRegisted() {
            await callApi.getClubRegisted({ student_id: this.studentId }).then(res => {

                if (res.code == 0) {
                    this.listClubRegisted = res.result
                }

            }).catch(err => {

            })
        },

        async getOsjRegisted() {
            await callApi.getOsjStudent({ student_id: this.studentId }).then(res => {

                if (res.code == 0) {
                    this.listOsjRegisted = res.result
                }

            }).catch(err => {

            })
        },

        async getOpenClub() {
            await callApi.getSetting().then(res => {
                if (res.code == 0) {
                    this.term = res.setting.term
                    this.year = res.setting.year
                }
            }).catch(err => {
                console.log(err);
            })
        }

    },
}
</script>

<style lang="scss" scoped></style>