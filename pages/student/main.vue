<template>
    <div>
        <div class="row">
            <div class="col bgbox2">
                <div>
                    <div class="row-container">
                        <h2 class="sriracha-font">คะเเนนความประพฤติ</h2>
                        <div>
                            <button class="btn btn-success" @click="logout()">
                                <Icon name="bi:door-open" style="padding: 0 0; margin: 0 0; font-size: 1.5rem;"
                                    class="fm-kanit" />
                                ย้อนกลับ
                            </button>
                        </div>
                    </div>
                </div>

                <label style="padding-top: 2rem; padding-bottom: 2rem;">นาย A นามสกุล B</label>

                <div class="content-sections mt-3">
                    <div class="left-section">
                        <span class="large-number">100</span>
                    </div>
                    <div class="right-section">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th class="thead-bg" style="width: 3rem;">#</th>
                                    <th class="thead-bg">รายการ</th>
                                    <th class="thead-bg">คะแนน</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td><b>มาสาย</b></td>
                                    <td>
                                        <p class="p-link-target">-5</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td><b>ไม่ส่งการบ้าน</b></td>
                                    <td>
                                        <p class="p-link-target">-3</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td><b>ไม่แต่งเครื่องแบบ</b></td>
                                    <td>
                                        <p class="p-link-target">-2</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td><b>ทะเลาะวิวาท</b></td>
                                    <td>
                                        <p class="p-link-target">-10</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>5</td>
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
