<template>
  <div>
    <div align="center">
      <div class="block-main">
        <div class="block-bg-main">
          <div class="row">
            <div class="col">
              <div class="row align-items-center g-3">
                <div class="col-auto">
                  
                  <h2 class="mb-2 d-flex align-items-center text-secondary">
                    <Icon name="material-symbols:list-alt-check-sharp" class="icon-status me-2" style="font-size: 2rem; margin-top: -2px;" /> แบบประเมินจุดแข็งและจุดอ่อน(SDQ)</h2>
                </div>
              </div>
              <div class="mt-2">
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead class="table-secondary">
                      <tr>
                        <th class="thead-bg" >รหัสนักเรียน</th>
                        <th class="thead-bg" >ชื่อ-นามสกุล</th>
                        <th class="thead-bg d-none d-sm-table-cell" >ห้องเรียน</th>
                        <th class="thead-bg d-none d-sm-table-cell" >เลขที่</th>
                        <th class="thead-bg" ></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="listStudent.length > 0" v-for="list in listStudent" :key="list.id_school">
                        <td>{{ list.id_school }}</td>
                        <td>{{ list.prefix_stu }} {{ list.name_stu }} {{ list.surname_stu }}</td>
                        <td class="d-none d-sm-table-cell">
                          <label v-if="list.class === 'vc'">ปวช.{{ list.room }}</label>
                          <label v-else>ม.{{ list.class }}/{{ list.room }}</label>
                        </td>
                        <td class="d-none d-sm-table-cell">{{ list.student_num }}</td>
                        <td >
                          <button v-if="list.status == 1" class="btn btn-outline-success btn-sm w-100 text-nowrap d-flex justify-content-center align-items-center gap-1" @click="editQuestion(list.id_school)">
                            <Icon name="ix:document-success"  style="font-size: 1.06rem; margin-top: -2px;" />
                            <span class="d-flex align-items-center">
                              บันทึกสำเร็จ
                              <span class="dot-status bg-success ms-2"></span>
                            </span>
                          </button>
                          <button v-else class="btn btn-outline-secondary btn-sm w-100 text-nowrap" @click="goToSurvey(list.id_school)"> 
                            <Icon name="hugeicons:pencil-edit-02" class="icon-status" style="font-size: 1rem; margin-top: -2px;" /> ทำแบบสอบถาม</button>
                        </td>
                      </tr>
                      <tr v-if="listStudent.length === 0" align="center">
                        <td colspan="5" style="color: red;">ไม่พบข้อมูล</td>
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
  </div>
</template>

<script>
import callApi from "../api/callApi";
import dayjs from "dayjs";
export default {
  data() {
    return {
      classSearch: "1",
      roomSearch: "1",
      listStudent: [],
      classTeacher:"",
      roomTeacher:"",
      year:''
    };
  },
  async mounted() {
    await this.getClass();
    await this.searchStudent();
  },
  methods: {
    async getClass(){
      const year_res = await callApi.getYear()
      if(!year_res.result || !year_res.result.length || !year_res.result[0].year){
        alert("เกิดข้อผิดพลาด");
        return;
      }
      this.year = year_res.result[0].year;
      const teacher_id = this.getStore().setAuth().id;
      const req = {
        t_id: teacher_id,
        year: this.year,
        };
      const res = await callApi.getClass(req);
      this.TeacherClass = res.result
      this.roomTeacher = this.TeacherClass.room;
      this.classTeacher = this.TeacherClass.class;
          
      },
    async searchStudent() {

      try {
        const res = await callApi.getAllStudent(this.classTeacher, this.roomTeacher, this.year)
        this.listStudent = res.result.map(student => ({
          ...student,
          survey_completed: student.survey_completed || false
        }));
      } catch (err) {
        console.error("Error:", err);
      }
    },
    goToSurvey(studentId) {
      this.$router.push({
        path: "/teacher/question/",
        query: { studentId },
      });
    },
    editQuestion(studentId){
      this.$router.push({
        path: "/teacher/question-edit/",
        query: { studentId },
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.dot-status {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}


.thead-bg {
  background-color: #e9ecef;
  color: #495057;
  border-color: #dee2e6;
}
</style>