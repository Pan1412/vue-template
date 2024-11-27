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

                <label style="padding-top: 1rem; padding-bottom: 0.5rem;">{{ fullName }}</label>

                <div class="content-sections mt-3">
                    <div class="left-section">
                        <span class="large-number">{{ score }}</span>
                    </div>
                    <div class="right-section">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th class="thead-bg" style="width: 3rem;">#</th>
                                    <th class="thead-bg">รายการ</th>
                                    <th class="thead-bg">วันที่</th>
                                    <th class="thead-bg">คะแนน</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="score === 100">
                                    <td colspan="3" style="text-align: center;">ไม่พบข้อมูลการหักคะเเนนความประพฤติ</td>
                                </tr>
                                <template v-else>
                                    <tr v-for="(behavior, index) in behaviorDetails" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td><b>{{ behavior.name_beh }}</b></td>
                                        <td>
                                            <p class="p-link-target">{{ formatDate(behavior.date) }}</p>
                                        </td>
                                        <td>
                                            <p class="p-link-target">{{ behavior.score }}</p>
                                        </td>
                                    </tr>
                                </template>
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
            fullName: '',
            term: '',
            year: '',
            score: '',
            behaviorDetails: '',
        }
    },

    async mounted() {
        let auth = this.getStore().setAuth()
        console.log(auth);

        if (auth) {
            this.studentId = auth.id_school
            let classCheck = auth.class == 'vc' ? `ระดับชั้นปประกาศนียบัตรวิชาชีพชั้นปีที่ ${auth.room}` : `ระดับชั้นมัธยมศึกษาปีที่ ${auth.class} ห้อง ${auth.room}`
            this.fullName = `ของ ${auth.prefix_stu}${auth.name_stu} ${auth.surname_stu} ${classCheck}`
            await this.getScoreBehaviorOneStudent()
        }

        await this.getTypeDetailBehaviorStudent()
    },

    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); 
            const year = String(date.getFullYear()).slice(-2);
            return `${day}/${month}/${year}`;
        },

        async getScoreBehaviorOneStudent() {
            const data = {
                id_school: this.studentId
            };
            await callApi.getScoreBehaviorOneStudent(data).then(res => {
                if (res.code === 0) {
                    this.score = res.students[0].score;
                }
            }).catch(err => {
                console.log(err);
            })
        },

        async getTypeDetailBehaviorStudent() {
            const data = {
                id_school: this.studentId
            };

            try {
                const res = await callApi.getTypeDetailBehaviorStudent(data);
                if (res.code === 0) {
                    this.behaviorDetails = res.data;
                    console.log(this.behaviorDetails)
                } else {
                    console.log('ไม่พบข้อมูล');
                }
            } catch (err) {
                console.error('เกิดข้อผิดพลาด:', err);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.content-sections {
    display: flex;
    margin-top: 1rem;

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
