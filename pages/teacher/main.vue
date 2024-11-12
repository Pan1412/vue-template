<template>
    <div>
        <div class="row">
            <div class="col bgbox2">

                <div align="left">
                    <button class="btn btn-danger btn-sm" @click="gotoPage('/teacher/main')">
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

                        <input v-model="nameSearch" type="text" class="form-control input-width-student ms-3 w-50"
                            placeholder="กรอกชื่อนักเรียน" aria-label="Username" aria-describedby="basic-addon1">

                        <button class="btn btn-primary btn-sm ms-3 w-50" @click="searchStudent">
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
                                    <th class="thead-bg"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(student, index) in students" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ student.prefix_stu }}{{ student.name_stu }} {{ student.surname_stu }}</td>
                                    <td>
                                        <label v-if="student.class == 'vc'">ปวช.{{ student.room }}</label>
                                        <label v-else>ม.{{ student.class }}/{{ student.room }}</label>
                                    </td>
                                    <td>{{ student.student_num }}</td>
                                    <td>
                                        <select class="form-select form-select-sm w-100">
                                            <option value="" disabled selected>เลือกการหักคะแนน</option>
                                            <option value="มาสาย">มาสาย</option>
                                            <option value="ไม่ส่งงาน">ไม่ส่งงาน</option>
                                            <option value="ทะเลาะวิวาท">ทะเลาะวิวาท</option>
                                            <option value="ขาดเรียน">ขาดเรียน</option>
                                            <option value="ใช้วาจาไม่สุภาพ">ใช้วาจาไม่สุภาพ</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="text-center mt-3">
                    <button type="button" class="btn btn-success" data-bs-toggle="popover" data-bs-trigger="focus"
                        title="ผลการบันทึก" data-bs-content="ทำการบันทึกเรียบร้อย" @click="showPopover">
                        บันทึกการหักคะแนน
                    </button>
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
            tId: 22,
            students: [
                { id_school: 1, prefix_stu: 'นาย', name_stu: 'สมชาย', surname_stu: 'ใจดี', class: '1', room: '1', student_num: '10', act_name: '' },
                { id_school: 2, prefix_stu: 'นางสาว', name_stu: 'สุดา', surname_stu: 'มีสุข', class: '2', room: '2', student_num: '12', act_name: 'วาดภาพ' },
                { id_school: 3, prefix_stu: 'นาย', name_stu: 'ณรงค์', surname_stu: 'กล้าหาญ', class: '3', room: '3', student_num: '15', act_name: 'ฟุตบอล' },
                { id_school: 4, prefix_stu: 'นางสาว', name_stu: 'ชลลดา', surname_stu: 'สดใส', class: '4', room: '1', student_num: '8', act_name: 'ร้องเพลง' },
                { id_school: 5, prefix_stu: 'นาย', name_stu: 'ศักดิ์', surname_stu: 'พัฒน์ดี', class: '5', room: '2', student_num: '20', act_name: '' },
                { id_school: 6, prefix_stu: 'นางสาว', name_stu: 'พิมพ์', surname_stu: 'สวยงาม', class: '6', room: '1', student_num: '2', act_name: 'ดนตรี' },
                { id_school: 7, prefix_stu: 'นาย', name_stu: 'เอกชัย', surname_stu: 'อัศวิน', class: 'vc', room: '1', student_num: '5', act_name: 'การถ่ายภาพ' },
                { id_school: 8, prefix_stu: 'นางสาว', name_stu: 'สุนิสา', surname_stu: 'แก้วมณี', class: '1', room: '3', student_num: '22', act_name: '' },
                { id_school: 9, prefix_stu: 'นาย', name_stu: 'เก่ง', surname_stu: 'ดวงดี', class: '2', room: '1', student_num: '11', act_name: 'ฟุตซอล' },
                { id_school: 10, prefix_stu: 'นางสาว', name_stu: 'ดารา', surname_stu: 'เพชรแท้', class: '3', room: '2', student_num: '9', act_name: '' }
            ]
        }
    },

    mounted() {
        let auth = this.getStore().setAuth()

        if (auth) {
            this.tId = auth.id
        }
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
            if (this.classSearch == '' && this.roomSearch == '' && this.nameSearch == '') {
                return
            }

            this.dataSearch.class = this.classSearch
            this.dataSearch.room = this.roomSearch
            this.dataSearch.name = this.nameSearch
            this.dataSearch.tId = this.tId

            await callApi.getStudentForRegis({ ...this.dataSearch }).then(res => {
                this.listStudent = res.result
            }).catch(err => {

            })
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