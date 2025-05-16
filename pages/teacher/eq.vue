<template>
  <div>
    <div align="center">
      <div class="block-main">
        <div class="block-bg-main px-6 px-sm-3">
          <div class="row">
            <div class="col">
              <h2 class="mb-2 d-flex align-items-center text-secondary">
                <Icon name="carbon:result" class="icon-status me-1" style="font-size: 2rem; margin-top: -2px;" />
                ผลการประเมินรายบุคคล(EQ)
              </h2>

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
                      <th colspan="3" class="text-center">1. องค์ประกอบ ด้านดี</th>
                      <th colspan="3" class="text-center">2. องค์ประกอบ ด้านเก่ง</th>
                      <th colspan="3" class="text-center">3. องค์ประกอบ ด้านสุข</th>
                      <th style="width: 130px;" class="text-center" rowspan="3">รายละเอียด</th>
                    </tr>
                    <tr>
                      <th class="  align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 20%; font-size: 1rem; vertical-align: middle;">1.1 ควบคุมอารมณ์</th>
                      <th class="  align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">1.2 เห็นใจผู้อื่น</th>
                      <th class="  align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">1.3 รับผิดชอบ</th>
                      <th class="  align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">2.1 มีแรงจูงใจ</th>
                      <th class="  align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">2.2 ตัดสินใจและแก้ไขปัญหา</th>
                      <th class="  align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">2.3 สัมพันธภาพกับผู้อื่น</th>
                      <th class="  align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">3.1 ภูมิใจในตนเอง</th>
                      <th class="  align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">3.2 พึงพอใจในชีวิต</th>
                      <th class="  align-middle" style="width: 50px; writing-mode: vertical-rl; transform: rotate(180deg); height: 200px; font-size: 1rem; vertical-align: middle;">3.3 สงบสุขทางใจ</th>
                    </tr>
                  </thead>
                  <tbody class="fm-IBM">
                    <tr v-for="(stu, index) in oneStudent" :key="index" v-if="oneStudent && oneStudent.length > 0">
                      <td class="text-center align-middle">{{ stu.id_school }}</td>
                      <td class="text-start ps-3 align-middle">{{ stu.prefix_stu }} {{ stu.name_stu }} {{ stu.surname_stu }}</td>
                      <td class="text-center align-middle">{{ stu.student_num }}</td>
                      <!-- R1 - ควบคุมอารมณ์ -->
                      <td class="text-center align-middle">
                        <span v-if="stu.R1 === 'เกณฑ์ปกติ'">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.R1 === 'ต่ำกว่าปกติ'">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.R1 === 'สูงกว่าปกติ'">
                          <Icon name="material-symbols:check-box" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      <!-- R2 - เห็นใจผู้อื่น -->
                      <td class="text-center align-middle">
                        <span v-if="stu.R2 === 'เกณฑ์ปกติ'">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.R2 === 'ต่ำกว่าปกติ'">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.R2 === 'สูงกว่าปกติ'">
                          <Icon name="material-symbols:check-box" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      <!-- R3 - รับผิดชอบ -->
                      <td class="text-center align-middle">
                        <span v-if="stu.R3 === 'เกณฑ์ปกติ'">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.R3 === 'ต่ำกว่าปกติ'">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.R3 === 'สูงกว่าปกติ'">
                          <Icon name="material-symbols:check-box" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      <!-- R4 - มีแรงจูงใจ -->
                      <td class="text-center align-middle">
                        <span v-if="stu.R4 === 'เกณฑ์ปกติ'">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.R4 === 'ต่ำกว่าปกติ'">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.R4 === 'สูงกว่าปกติ'">
                          <Icon name="material-symbols:check-box" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      <!-- R5 - ตัดสินใจและแก้ไขปัญหา -->
                      <td class="text-center align-middle">
                        <span v-if="stu.R5 === 'เกณฑ์ปกติ'">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.R5 === 'ต่ำกว่าปกติ'">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.R5 === 'สูงกว่าปกติ'">
                          <Icon name="material-symbols:check-box" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      <!-- R6 - สัมพันธภาพกับผู้อื่น -->
                      <td class="text-center align-middle">
                        <span v-if="stu.R6 === 'เกณฑ์ปกติ'">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.R6 === 'ต่ำกว่าปกติ'">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.R6 === 'สูงกว่าปกติ'">
                          <Icon name="material-symbols:check-box" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      <!-- R7 - ภูมิใจในตนเอง -->
                      <td class="text-center align-middle">
                        <span v-if="stu.R7 === 'เกณฑ์ปกติ'">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.R7 === 'ต่ำกว่าปกติ'">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.R7 === 'สูงกว่าปกติ'">
                          <Icon name="material-symbols:check-box" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      <!-- R8 - พึงพอใจในชีวิต -->
                      <td class="text-center align-middle">
                        <span v-if="stu.R8 === 'เกณฑ์ปกติ'">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.R8 === 'ต่ำกว่าปกติ'">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.R8 === 'สูงกว่าปกติ'">
                          <Icon name="material-symbols:check-box" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      <!-- R9 - สงบสุขทางใจ -->
                      <td class="text-center align-middle">
                        <span v-if="stu.R9 === 'เกณฑ์ปกติ'">
                          <Icon name="material-symbols:check-circle-rounded" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.R9 === 'ต่ำกว่าปกติ'">
                          <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                        </span>
                        <span v-else-if="stu.R9 === 'สูงกว่าปกติ'">
                          <Icon name="material-symbols:check-box" style="color: green; font-size: 1.6rem;" />
                        </span>
                        <span v-else class="badge bg-light text-secondary border rounded-circle">
                          <Icon name="mdi:minus" />
                        </span>
                      </td>
                      <td class="text-center align-middle">
                        <button class="btn btn-outline-secondary btn-sm" @click="moreInfo(stu.id_school)">
                          <Icon name="gg:details-more" class="icon-status" style="font-size: 1rem; margin-top: -2px;" /> รายละเอียด</button>
                      </td>
                    </tr>
                    <!-- แสดงเมื่อไม่มีข้อมูล -->
                    <tr v-if="!oneStudent || oneStudent.length === 0">
                      <td colspan="13" class="text-center py-4">ไม่พบข้อมูล</td>
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
                      <span>เกณฑ์ปกติ</span>
                    </div>
                  </div>
                  <div class="col-auto">
                    <div class="d-flex align-items-center me-4">
                      <span class="me-2">
                        <Icon name="material-symbols:check-circle-rounded" style="color: orange; font-size: 1.6rem;" />
                      </span>
                      <span>ต่ำกว่าปกติ</span>
                    </div>
                  </div>
                  <div class="col-auto">
                    <div class="d-flex align-items-center me-4">
                      <span class="me-2">
                        <Icon name="material-symbols:check-box" style="color: green; font-size: 1.6rem;" />
                      </span>
                      <span>สูงกว่าปกติ</span>
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
      TeacherClass:[],
      classTeacher:"",
      roomTeacher:"",
      year:''
    };
  },

  async mounted() {
    await this.getClass();  
    await this.getStatusEqAll();
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

    async getStatusEqAll(){
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

        const res = await callApi.statusEqAdmin(req);
        console.log(res);
        
        if (res.code === 0) {
          this.oneStudent = res.result;
        }
      } catch (err) {
        console.error("Error:", err);
      }
    },

    moreInfo(studentId) {
      this.$router.push({
        path: "/teacher/eq-result",
        query: { studentId },
      });
    },
  },
};
</script>

<style lang="scss" scoped>



/* ทำให้เนื้อหาตารางใช้พื้นที่ได้มากขึ้น */
.block-bg-main {
  margin-top: 4.8rem;
  width: 75% !important;
}

.table-responsive {
  max-width: 100%;
  overflow-x: auto;
}

.badge {
  font-size: 0.7rem;
  padding: 6px;
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