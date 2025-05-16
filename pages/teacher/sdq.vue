<template>
  <div>
    <div align="center" >
      <div class="" >
        <div class="block-bg-main">
          <div class="row">
            <div class="col">
              <h2 class=" d-flex align-items-center text-secondary"> 
                <Icon name="carbon:result" class="icon-status me-1" style="font-size: 2rem; margin-top: -2px;" /> 
                ผลการประเมินรายบุคคล(SDQ)</h2>
              
              <div class="text-center mt-1 mb-4 text-secondary" >
                <div v-if="TeacherClass.class?.toLowerCase() === 'vc' " class="mb-3 fs-5 ms-4 text-start ">ประกาศนียบัตรวิชาชีพ ชั้นปีที่ {{ TeacherClass.room }}  <span class="mb-3 fs-5 ms-2 text-start ">ปีการศึกษา {{year}}</span></div>
                <div v-else class="mb-3 fs-5 ms-4 text-start ">ชั้นมัธยมศึกษาปีที่ {{ TeacherClass.class }}/{{ TeacherClass.room }}  <span class="mb-3 fs-5 ms-2 text-start ">ปีการศึกษา {{year}}</span></div>
              </div>
              
              <div class="table-responsive">
                <table class="table table-hover table-bordered" >
                  <thead class="table-secondary fm-kanit">
                    <tr>
                      <th style="width: 120px;" class="text-center" rowspan="3">รหัสนักเรียน</th>
                      <th style="width: 250px;" class="ps-3" rowspan="3">ชื่อ-นามสกุล</th>
                      <th style="width: 60px;" class="text-center" rowspan="3">เลขที่</th>
                      <th colspan="5" class="text-center">1.ผลการประเมินของครู</th>
                      <th colspan="5" class="text-center">2. ผลการประเมินของนักเรียน</th>
                      <th colspan="5" class="text-center">3. ผลการประเมินของผู้ปกครอง</th>
                      <th style="width: 70px;" class="text-center" rowspan="3">รายละเอียด</th>
                    </tr>
                    <tr>
                      <th class="align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">ด้านอารมณ์</th>
                      <th class="align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">ด้านพฤติกรรมเกเร</th>
                      <th class="align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">ด้านพฤติกรรมไม่อยู่นิ่ง</th>
                      <th class="align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">ด้านความสัมพันธ์กับเพื่อน</th>
                      <th class="align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">ด้านสัมพันธภาพทางสังคม</th>
                      <th class="align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">ด้านอารมณ์</th>
                      <th class="align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">ด้านพฤติกรรมเกเร</th>
                      <th class="align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">ด้านพฤติกรรมไม่อยู่นิ่ง</th>
                      <th class="align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">ด้านความสัมพันธ์กับเพื่อน</th>
                      <th class="align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">ด้านสัมพันธภาพทางสังคม</th>
                      <th class="align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">ด้านอารมณ์</th>
                      <th class="align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">ด้านพฤติกรรมเกเร</th>
                      <th class="align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">ด้านพฤติกรรมไม่อยู่นิ่ง</th>
                      <th class="align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">ด้านความสัมพันธ์กับเพื่อน</th>
                      <th class="align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">ด้านสัมพันธภาพทางสังคม</th>
                    </tr>
                  </thead>
                  <tbody class="fm-IBM">
                    <tr v-for="(stu, index) in oneStudent" :key="index" v-if="oneStudent && oneStudent.length > 0" 
                      :class="index % 2 === 0 ? 'table-light' : ''">

                      <td class="text-center align-middle">{{ stu.id_school }}</td>
                      <td class="text-start ps-3 align-middle">{{ stu.prefix_stu }} {{ stu.name_stu }} {{ stu.surname_stu }}</td>
                      <td class="text-center align-middle">{{ stu.student_num }}</td>
                      
                      <!-- ครูประเมิน (teacher_R1-R5) -->
                      <!-- R1 - ด้านอารมณ์ -->
                      <td class="text-center align-middle">
                        <span v-if="stu.teacher_R1 === 0 || stu.teacher_R1 === 3">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.teacher_R1 === 1">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.teacher_R1 === 2 || stu.teacher_R1 === 4">
                          <Icon name="material-symbols:check-circle-rounded" style="color: red; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      
                      <!-- R2 - ด้านพฤติกรรมเกเร -->
                      <td class="text-center align-middle">
                        <span v-if="stu.teacher_R2 === 0 || stu.teacher_R2 === 3">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.teacher_R2 === 1">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.teacher_R2 === 2 || stu.teacher_R2 === 4">
                          <Icon name="material-symbols:check-circle-rounded" style="color: red; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      
                      <!-- R3 - ด้านพฤติกรรมไม่อยู่นิ่ง -->
                      <td class="text-center align-middle">
                        <span v-if="stu.teacher_R3 === 0 || stu.teacher_R3 === 3">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.teacher_R3 === 1">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.teacher_R3 === 2 || stu.teacher_R3 === 4">
                          <Icon name="material-symbols:check-circle-rounded" style="color: red; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      
                      <!-- R4 - ด้านความสัมพันธ์กับเพื่อน -->
                      <td class="text-center align-middle">
                        <span v-if="stu.teacher_R4 === 0 || stu.teacher_R4 === 3">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.teacher_R4 === 1">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.teacher_R4 === 2 || stu.teacher_R4 === 4">
                          <Icon name="material-symbols:check-circle-rounded" style="color: red; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      
                      <!-- R5 - ด้านสัมพันธภาพทางสังคม -->
                      <td class="text-center align-middle">
                        <span v-if="stu.teacher_R5 === 0 || stu.teacher_R5 === 3">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.teacher_R5 === 1">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.teacher_R5 === 2 || stu.teacher_R5 === 4">
                          <Icon name="material-symbols:check-circle-rounded" style="color: red; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      
                      <!-- นักเรียนประเมิน (student_R1-R5) -->
                      <!-- R1 - ด้านอารมณ์ -->
                      <td class="text-center align-middle">
                        <span v-if="stu.student_R1 === 0 || stu.student_R1 === 3">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.student_R1 === 1">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.student_R1 === 2 || stu.student_R1 === 4">
                          <Icon name="material-symbols:check-circle-rounded" style="color: red; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      
                      <!-- R2 - ด้านพฤติกรรมเกเร -->
                      <td class="text-center align-middle">
                        <span v-if="stu.student_R2 === 0 || stu.student_R2 === 3">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.student_R2 === 1">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.student_R2 === 2 || stu.student_R2 === 4">
                          <Icon name="material-symbols:check-circle-rounded" style="color: red; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      
                      <!-- R3 - ด้านพฤติกรรมไม่อยู่นิ่ง -->
                      <td class="text-center align-middle">
                        <span v-if="stu.student_R3 === 0 || stu.student_R3 === 3">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.student_R3 === 1">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.student_R3 === 2 || stu.student_R3 === 4">
                          <Icon name="material-symbols:check-circle-rounded" style="color: red; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      
                      <!-- R4 - ด้านความสัมพันธ์กับเพื่อน -->
                      <td class="text-center align-middle">
                        <span v-if="stu.student_R4 === 0 || stu.student_R4 === 3">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.student_R4 === 1">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.student_R4 === 2 || stu.student_R4 === 4">
                          <Icon name="material-symbols:check-circle-rounded" style="color: red; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      
                      <!-- R5 - ด้านสัมพันธภาพทางสังคม -->
                      <td class="text-center align-middle">
                        <span v-if="stu.student_R5 === 0 || stu.student_R5 === 3">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.student_R5 === 1">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.student_R5 === 2 || stu.student_R5 === 4">
                          <Icon name="material-symbols:check-circle-rounded" style="color: red; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      
                      <!-- ผู้ปกครองประเมิน (parent_R1-R5) -->
                      <!-- R1 - ด้านอารมณ์ -->
                      <td class="text-center align-middle">
                        <span v-if="stu.parent_R1 === 0 || stu.parent_R1 === 3">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.parent_R1 === 1">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.parent_R1 === 2 || stu.parent_R1 === 4">
                          <Icon name="material-symbols:check-circle-rounded" style="color: red; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      
                      <!-- R2 - ด้านพฤติกรรมเกเร -->
                      <td class="text-center align-middle">
                        <span v-if="stu.parent_R2 === 0 || stu.parent_R2 === 3">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.parent_R2 === 1">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.parent_R2 === 2 || stu.parent_R2 === 4">
                          <Icon name="material-symbols:check-circle-rounded" style="color: red; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      
                      <!-- R3 - ด้านพฤติกรรมไม่อยู่นิ่ง -->
                      <td class="text-center align-middle">
                        <span v-if="stu.parent_R3 === 0 || stu.parent_R3 === 3">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.parent_R3 === 1">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.parent_R3 === 2 || stu.parent_R3 === 4">
                          <Icon name="material-symbols:check-circle-rounded" style="color: red; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      
                      <!-- R4 - ด้านความสัมพันธ์กับเพื่อน -->
                      <td class="text-center align-middle">
                        <span v-if="stu.parent_R4 === 0 || stu.parent_R4 === 3">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.parent_R4 === 1">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.parent_R4 === 2 || stu.parent_R4 === 4">
                          <Icon name="material-symbols:check-circle-rounded" style="color: red; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      
                      <!-- R5 - ด้านสัมพันธภาพทางสังคม -->
                      <td class="text-center align-middle">
                        <span v-if="stu.parent_R5 === 0 || stu.parent_R5 === 3">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.parent_R5 === 1">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.parent_R5 === 2 || stu.parent_R5 === 4">
                          <Icon name="material-symbols:check-circle-rounded" style="color: red; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      
                      <!-- ปุ่มรายละเอียด -->
                      <td class="text-center align-middle">
                        <button class="btn btn-outline-secondary btn-sm" @click="moreInfo(stu.id_school)">
                          <Icon name="gg:details-more" class="icon-status" style="font-size: 1rem; margin-top: -2px;" /></button>
                      </td>
                    </tr>
                    <!-- แสดงเมื่อไม่มีข้อมูล -->
                    <tr v-if="!oneStudent || oneStudent.length === 0">
                      <td colspan="17" class="text-center py-4">ไม่พบข้อมูล</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- คำอธิบาย -->
              <div class="mt-3 mb-4">
                <div class="row justify-content-center">
                  <div class="col-auto">
                    <div class="d-flex align-items-center me-4">
                      <span class="me-2">
                        <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                      </span>
                      <span>ปกติ หรือ มีจุดแข็ง</span>
                    </div>
                  </div>
                  <div class="col-auto">
                    <div class="d-flex align-items-center me-4">
                      <span class="me-2">
                        <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                      </span>
                      <span>เสี่ยง</span>
                    </div>
                  </div>
                  <div class="col-auto">
                    <div class="d-flex align-items-center me-4">
                      <span class=" me-2">
                        <Icon name="material-symbols:check-circle-rounded" style="color: red; font-size: 1.6rem;" />
                      </span>
                      <span>มีปัญหา หรือ ไม่มีจุดแข็ง</span>
                    </div>
                  </div>
                  <div class="col-auto">
                    <div class="d-flex align-items-center">
                      <span class="badge bg-light text-secondary border rounded-circle me-2">
                        <Icon name="mdi:minus" />
                      </span>
                      <span>ไม่มีข้อมูล</span>
                    </div>
                  </div>
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
        <br /><br /><br />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import callApi from "../../api/callApi";
import moment from "moment";
export default {
  setup() {
    const swal = getCurrentInstance().appContext.config.globalProperties;
    return { swal };
  },
  data() {
    return {
      idSchool: "",
      nameStudent: "",
      surnameStudent: "",
      oneStudent: [],
      TeacherClass: [],
      classTeacher: "",
      roomTeacher: "",
      year: ''
    };
  },

  async mounted() {
    await this.getClass();  
    await this.getStatusSdqAll();
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

    async getStatusSdqAll(){
      if (this.classTeacher === "" || this.roomTeacher === "") {
        setTimeout(() => {
          this.alertModal(
            "error",
            "ข้อผิดพลาด",
            "กรุณาระบุ ระดับชั้น และห้องให้ครบถ้วน",
            true
          );
        }, 500);
        return;
      }
      const year_res = await callApi.getYear()
      if(!year_res.result || !year_res.result.length || !year_res.result[0].year){
        alert("เกิดข้อผิดพลาด");
        return;
      }
      const year = year_res.result[0].year;
      try {
        const req = {
          class: this.classTeacher,
          room: this.roomTeacher,
          year: year,
        };

        const res = await callApi.statusSdqAdmin(req);
        
        if (res.code === 0) {
          this.oneStudent = res.result;
        }

      } catch (err) {
        console.error("Error:", err);
      }
    },

    moreInfo(studentId) {
      this.$router.push({
        path: "/teacher/sdq-result",
        query: { studentId },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@300;400;500;600;700&display=swap');

/* ทำให้เนื้อหาตารางใช้พื้นที่ได้มากขึ้น */
.block-bg-main {
  margin-top: 4.8rem;
  width: 80% !important;
}

/* ปรับให้ table responsive ใช้พื้นที่ได้เต็มที่ */
.table-responsive {
  max-width: 100%;
  overflow-x: auto;
}

.badge {
  font-size: 0.9rem;
  padding: 6px;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.rounded-circle {
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.text-secondary-soft {
  color: rgba(108, 117, 125, 0.5);
}

</style>