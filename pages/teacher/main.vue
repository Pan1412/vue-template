<template>
    <div>
        <div align="center">
            <div class="block-main">
                <div class="block-bg-main">
                    <div class="row">
                        <div class="col bgbox2">

                            <div align="left">
                                <button class="btn btn-danger btn-sm" @click="gotoPage('')">
                                    <Icon name="ep:refresh-left" style="padding: 0 0; margin: 0 0; font-size: 1rem;"
                                        class="fm-kanit" />
                                    กลับหน้าก่อน
                                </button>
                            </div>

                            <div class="mt-3">
                                <div class="d-flex">
                                    <label for="" class="mt-2 w-10" style="margin-right: -1%;">ชั้นเรียน</label>
                                    <select class="form-select w-50" aria-label="Default select example" v-model="classSearch"
                                        @change="vcCheck()">
                                        <option value=""></option>
                                        <option value="1">ม.1</option>
                                        <option value="2">ม.2</option>
                                        <option value="3">ม.3</option>
                                        <option value="4">ม.4</option>
                                        <option value="5">ม.5</option>
                                        <option value="6">ม.6</option>
                                        <option value="vc">ปวช.</option>
                                    </select>


                                    <label for="" class="mt-2 w-10 ms-3" style="margin-right: -2%;">ห้อง/ปี</label>
                                    <select class="form-select w-50" aria-label="Default select example" v-model="roomSearch"
                                        @change="getStudent">
                                        <option :value="room" v-for=" room in roomList">{{ room }}</option>
                                    </select>

                                    <!-- <input v-model="nameSearch" type="text" class="form-control input-width-student ms-3 w-50"
                                        placeholder="กรอกชื่อนักเรียน" aria-label="Username" aria-describedby="basic-addon1"> -->

                                    <button class="btn btn-primary btn-sm ms-3 w-50 fm-kanit" @click="searchStudent">
                                        ค้นหา
                                    </button>
                                </div>
                            </div>

                            <div class="mt-2">
                                <div class="table-responsive mt-3">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th class="thead-bg" style="width: 5%;">#</th>
                                                <th class="thead-bg" style="text-align: left;">ชื่อ-นามสกุล</th>
                                                <th class="thead-bg">ห้องเรียน</th>
                                                <th class="thead-bg">เลขที่</th>
                                                <th class="thead-bg">คะเเนนความประพฤติ</th>
                                                <th class="thead-bg"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-if="listStudent.length > 0" v-for="list in listStudent">
                                                <td>{{ list.id_school }}</td>
                                                <td>{{ list.prefix_stu }}{{ list.name_stu }} {{ list.surname_stu }}</td>
                                                <td>
                                                    <label v-if="list.class == 'vc'">ปวช.{{ list.room }}</label>
                                                    <label v-else>ม.{{ list.class }}/{{ list.room }}</label>
                                                </td>
                                                <td>{{ list.student_num }}</td>
                                                <td>{{ list.score }}</td>
                                                <td>
                                                    <select class="form-select form-select-sm w-100"
                                                        v-model="list.selectedBehavior">
                                                        <option value="" disabled selected>เลือกการหักคะแนน</option>
                                                        <option v-for="item in listTypeBehaviour" :key="item.id" :value="item">
                                                            {{ item.name_beh }}
                                                        </option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr v-if="listStudent.length == 0" align="center">
                                                <td colspan="6">ไม่พบข้อมูล</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div v-if="listStudent.length > 0" class="text-center mt-3">
                                <button type="button" class="btn btn-success" @click="deductScore">
                                    บันทึกการหักคะแนน
                                </button>
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
    setup() {
        const swal = getCurrentInstance().appContext.config.globalProperties;
        return { swal }
    },
    data() {
        return {
            classSearch: '',
            roomSearch: '',
            nameSearch: '',
            roomList: [1, 2, 3, 4, 5, 6],
            dataSearch: {
                class: '',
                room: '',
                name: '',
                tId: 0
            },

            listStudent: [],
            listTypeBehaviour: [],
            selectedBehavior: [],
            tId: 22,
        }
    },

    mounted() {
        let auth = this.getStore().setAuth()

        if (auth) {
            this.tId = auth.id
        }

        this.getDaTaTypeBehaviour()
    },

    methods: {
        vcCheck() {
            if (this.classSearch == 'vc') {
                this.vcGrade = true
                this.roomList = [1, 2, 3]
            } else {
                this.vcGrade = false
                this.roomList = [1, 2, 3, 4, 5, 6]
            }
        },

        async searchStudent() {
            if (this.classSearch === '' || this.roomSearch === '') {
                alert('กรุณาระบุระดับชั้นและห้องให้ครบถ้วน');
                return;
            }

            this.dataSearch.class = this.classSearch;
            this.dataSearch.room = this.roomSearch;
            this.dataSearch.name = this.nameSearch;
            this.dataSearch.tId = this.tId;

            await callApi.getStudentForBehaviorScore({ ...this.dataSearch })
                .then(res => {
                    this.listStudent = res.result.map(student => ({
                        ...student,
                        selectedBehavior: ''
                    }));
                    console.log(this.listStudent);
                })
                .catch(err => {
                    console.error('Error:', err);
                });
        },

        async getDaTaTypeBehaviour() {
            await callApi.gettypeBehaviorStudent().then(res => {
                if (res.code == 0) {
                    this.listTypeBehaviour = res.result
                    console.log(this.listTypeBehaviour)
                } else {
                    this.listTypeBehaviour = res.result
                    console.log(this.listTypeBehaviour)
                }
            }).catch(err => {
                console.log(err);
            })
        },

        async deductScore() {
            const deductionRequests = [];

            this.listStudent.forEach(student => {
                if (student.selectedBehavior) {
                    const selectedBehavior = student.selectedBehavior;
                    const requestData = {
                        id_school: student.id_school,
                        type_beh_id: selectedBehavior.id
                    };
                    deductionRequests.push(requestData);
                }
            });

            if (deductionRequests.length === 0) {
                alert('กรุณาเลือกการหักคะแนนอย่างน้อยหนึ่งรายการ');
                return;
            }

            try {
                await callApi.deductBehaviorScore(deductionRequests).then((res) => {
                    if (res.code === 0) {
                        deductionRequests.forEach((request) => {
                            const studentToUpdate = this.listStudent.find(student => student.id_school === request.id_school);
                            if (studentToUpdate && studentToUpdate.selectedBehavior) {
                                const scoreToDeduct = studentToUpdate.selectedBehavior.score;
                                studentToUpdate.score -= scoreToDeduct;
                            }
                        });

                        try {
                            callApi.getDetailsBehaviorScore(deductionRequests);
                        } catch (error) {
                            console.error('Error getDetailsBehaviorScore:', error);
                            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูลการหักคะแนน');
                        }

                        // setTimeout(() => {
                        //     this.alertModal('success', 'สำเร็จ', 'ทำการหักคะเเนนสำเร็จ', true);
                        // }, 500);
                    } else {
                        setTimeout(() => {
                            this.alertModal('error', 'ไม่สำเร็จ', 'ไม่สามารถหักคะเเนนได้');
                        }, 500);
                    }
                });
            } catch (error) {
                console.error('Error deducting score:', error);
                alert('เกิดข้อผิดพลาดในการบันทึก');
            }
        },

        async regisClubTeacher(list) {
            if (list.act_id == 0) {
                alert('ไม่สามารถลงทะเบียนชุมนุมให้กับนักเรียนได้ เนื่องจากท่านไม่ได้เปิดสอนชุมนุมในเทอมนี้')
                return
            }

            let check = confirm('คุณตัองการลงทะเบียนชุมนุม ใช่หรือไม่')

            if (check) {
                this.alertModal('loading', 'กำลังลงทะเบียน กรุณารอสักครู่....')
                await callApi.regisClubStudent({ student_id: list.id_school, act_id: list.act_id }).then(res => {
                    if (res.code == 0) {
                        this.alertModal('success', 'สำเร็จ', 'ลงทะเบียนสำเร็จ')

                    } else if (res.code == 2) {
                        this.alertModal('warning', 'ไม่สำเร็จ', 'เคยลงทะเบียนชุมนุมอื่นไปแล้ว')

                    } else if (res.code == 3) {
                        this.alertModal('warning', 'ไม่สำเร็จ', 'ชุมนุมนี้มีจำนวนสมาชิกครบแล้ว')

                    } else {
                        this.alertModal('error', 'ไม่สำเร็จ', 'ลงทะเบียนไม่สำเร็จ')
                    }
                }).catch(err => {

                })

                await this.searchStudent()
            }
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

.input-width-student {
    width: 10rem;
}

.w-10 {
    width: 20% !important;
}
</style>