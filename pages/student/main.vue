<template>
    <div>
        <div class="row">
            <div class="col bgbox2">
                <div class="header_text_l">
                    <h2 class="sriracha-font">รายงานคะแนน</h2>
                </div>
                <label class="fm-kanit">{{ fullName }}</label>

                <div class="row mt-2">
                    <div class="col-md-5 fm-kanit">
                        <div class="score_board" align="center">
                            100
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div class="table-responsive fm-IBM">
                        <table class="table table-striped table-hover mt-3">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">วันที่</th>
                                    <th scope="col">รายการ</th>
                                    <th scope="col">คะแนน</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="score === 100">
                                    <td colspan="4" style="text-align: center;">ไม่พบข้อมูลการหักคะเเนนความประพฤติ</td>
                                </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>1</td>
                                        <td><b>มาสาย</b></td>
                                        <td>
                                            <p class="p-link-target">-5</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>1</td>
                                        <td><b>ไม่ส่งการบ้าน</b></td>
                                        <td>
                                            <p class="p-link-target">-3</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>1</td>
                                        <td><b>ไม่แต่งเครื่องแบบ</b></td>
                                        <td>
                                            <p class="p-link-target">-2</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>1</td>
                                        <td><b>ทะเลาะวิวาท</b></td>
                                        <td>
                                            <p class="p-link-target">-10</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>1</td>
                                        <td><b>ใช้มือถือในห้องเรียน</b></td>
                                        <td>
                                            <p class="p-link-target">-4</p>
                                        </td>
                                    </tr>
                            </tbody>
                        </table>
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
            year: '',
            score: '',
        }
    },

    async mounted() {
        let auth = this.getStore().setAuth()
        console.log(auth);

        if (auth) {
            this.studentId = auth.id_school
            let classCheck = auth.class == 'vc' ? `ระดับชั้นปประกาศนียบัตรวิชาชีพชั้นปีที่ ${auth.room}` : `ระดับชั้นมัธยมศึกษาปีที่ ${auth.class} ห้อง ${auth.room}`
            this.fullName = `ของ ${auth.prefix_stu}${auth.name_stu} ${auth.surname_stu} ${classCheck}`
            this.score = auth.score
        }

        await this.getOpen()
        await this.getClubRegisted()
        await this.getOsjRegisted()
        await this.getOpenClub()
        await this.geScoreBehaviourStudent()
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
            }).catch(err => { })
        },

        async getOsjRegisted() {
            await callApi.getOsjStudent({ student_id: this.studentId }).then(res => {
                if (res.code == 0) {
                    this.listOsjRegisted = res.result
                }
            }).catch(err => { })
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
        },

        async geScoreBehaviourStudent() {
            await callApi.getScoreBehaviorStudent().then(res => {
                if (res.code == 0) {
                    console.log(res)
                } else {
                    console.log(res)
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.content-sections {
    display: flex;
    margin-top: 1rem;

    // Layout for larger screens
    .left-section {
        flex: 0 0 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .large-number {
        font-size: 10rem;
        font-weight: bold;
    }

    .right-section {
        flex: 0 0 50%;
        padding-left: 1rem;
    }
}

@media (max-width: 768px) {
    .content-sections {
        flex-direction: column;
    }

    .left-section,
    .right-section {
        flex: 0 0 100%;
        padding-left: 0;
    }

    .large-number {
        font-size: 5rem;
    }
}
</style>
