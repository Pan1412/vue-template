<template>
  <div class="container py-4">
    <div class="card shadow-sm border-0 rounded-4 big-card mt-5">
      <div class="card-body p-4">

        <h2 class="mb-2 ms-4 mt-4 text-start" style="color: #515a5a;"> 
          <Icon name="material-symbols:checkbook-outline" class="icon-status" style="font-size: 2rem; margin-top: -2px;" /> 
          การประเมินจุดแข็งและจุดอ่อน และความฉลาดทางอารมณ์
        </h2>
        <div class="justify-content-end mb-3 text-secondary ms-4">

          <p class="d-inline me-2 fs-5">{{ studentInfo.prefix_stu }}{{ studentInfo.name_stu }} {{ studentInfo.surname_stu }}</p>
          <p v-if="studentInfo.class?.toLowerCase() === 'vc'" class="d-inline me-2 fs-5">ประกาศนียบัตรวิชาชีพ ชั้นปีที่ {{ studentInfo.room }}</p>
          <p v-else class="d-inline me-2 fs-5">ระดับชั้นมัธยมศึกษาปีที่ {{ studentInfo.class }}/{{ studentInfo.room }}</p>
          <p class="d-inline me-2 fs-5 ">  เลขที่: {{ studentInfo.student_num }}</p>
          <p class="d-inline me- fs-5">รหัสนักเรียน: {{ studentInfo.id_school }}</p>
        </div>
      
        <div class="row align-items-stretch justify-content-center">  
          <!-- แบบประเมิน SDQ -->
          <div class="col-md-5 mb-4">
            <div class="bg-white border rounded-4 p-4 shadow-sm h-100">
              <h5 class="text-secondary mb-3" style="color: purple;"> 
                <Icon name="material-symbols:fact-check-outline" class="icon-status" style="font-size: 1.5rem; margin-top: -2px;" /> 
                แบบประเมินจุดแข็งและจุดอ่อน (SDQ)
              </h5>
              <div class="d-flex align-items-center">
                <template v-if="sdq_status == 0">
                  <button class="btn btn-primary btn-lg btn-sm fs-5 fw-bold px-7 py-2 rounded-5" style="padding: 3rem;" @click="goToSdq(studentId)">
                    <Icon name="material-symbols:table-edit-rounded" class="icon-status me-2" style="font-size: 1.5rem; margin-top: -2px;" />ทำแบบประเมิน</button>
                </template>
                <template v-else-if="sdq_status === 1">
                  <span class="btn-sm fs-5 fw-bold px-7 py-2" style="color: green;">
                    <Icon name="ep:success-filled" class="icon-status " style="font-size: 1.5rem; margin-top: -2px;" /> ทำแบบประเมินแล้ว</span>
                </template>
              </div>
            </div>
          </div>

          <!-- แบบประเมิน EQ -->
          <div class="col-md-5 mb-4">
            <div class="bg-white border rounded-4 p-4 shadow-sm h-100">
              <h5 class="text-secondary mb-3" style="color: purple;"> 
                <Icon name="material-symbols:fact-check-outline" class="icon-status" style="font-size: 1.5rem; margin-top: -2px;" /> 
                แบบประเมินความฉลาดทางอารมณ์ (EQ)
              </h5>
              <div class="d-flex align-items-center">
                <template v-if="eq_status === 0">
                  <button class="btn btn-primary btn-lg btn-sm fs-5 fw-bold px-7 py-2 rounded-5" style="padding: 3rem;" @click="goToEq(studentId)">
                    <Icon name="material-symbols:table-edit-rounded" class="icon-status me-2" style="font-size: 1.5rem; margin-top: -2px;" />ทำแบบประเมิน</button>
                </template>
                <template v-else-if="eq_status === 1">
                  <span class="btn-sm fs-5 fw-bold px-7 py-2" style="color: green;">
                    <Icon name="ep:success-filled" class="icon-status " style="font-size: 1.5rem; margin-top: -2px;" /> ทำแบบประเมินแล้ว</span>
                </template>
              </div>
            </div>
          </div>
        </div>
        
        <h5 class=" mb-4 mt-4 text-center" style="color: #c0392b;"><Icon name="ic:outline-warning" class="icon-status " style="font-size: 2rem; margin-top: -2px;" />  หากต้องการทำแบบประเมินอีกครั้งโปรดแจ้งครูที่ปรึกษา</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";
import callApi from "../api/callApi";

export default {
data() {
  return {
    studentId: '',
    fullName: '',
    term: '',
    year: '',
    score: '',
    sdq_status: null,
    eq_status: null,
    studentInfo: []
  }
},

async mounted() {
  this.studentId = this.getStore().setAuth().id_school;
  this.getStudentInfo();
  await this.checkStatus();
},

methods: {
  async getStudentInfo() {
    let student_id = String(this.studentId);
    try {
      const res = await callApi.getStudent({ student_id });
      if (res.code == 0) {
        this.studentInfo = res.result[0];
      }
    } catch (err) {
      console.log(err);
    }
  },

  async checkStatus() {
    try {
      const year_res = await callApi.getYear();
      if (!year_res.result || !year_res.result.length || !year_res.result[0].year) {
        alert("เกิดข้อผิดพลาด");
        return;
      }
      const year = year_res.result[0].year;

      const info = {
        s_id: this.studentId,
        year: year,
      };
      
      const res = await callApi.checkStudentStatus(info);
      this.sdq_status = res.result[0].sdq_status;
      this.eq_status = res.result[0].eq_status;
    } catch (err) {
      console.error("Error:", err);
    }
  },

  truncateText(text, length) {
    if (text.length > length) {
      return text.substring(0, length) + "\n" + text.substring(length);
    }
    return text;
  },

  goToSdq(studentId) {
    this.$router.push({
      path: "/student/sdq/",
      query: { studentId },
    });
  },

  goToEq(studentId) {
    this.$router.push({
      path: "/student/eq/",
      query: { studentId },
    });
  },
}
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@300;400;500;600;700&display=swap');



.container {
max-width: 1100px; /* ปรับความกว้างของ container ให้พอดี */
margin: 0 auto;
}

.card {
max-width: 100%;
margin: 0 auto;
}

.big-card {
max-width: 1100px; /* ปรับความกว้างของการ์ดหลัก */
margin: 0 auto;
}

/* จัดให้กรอบอยู่ตรงกลาง */
.row.align-items-stretch {
margin: 0 -10px; /* ปรับระยะห่างระหว่างการ์ด */
}

.col-md-5 {
padding: 0 10px; /* ปรับ padding ของคอลัมน์ */
}

/* ปรับขนาดของกรอบให้พอดีกับขอบ */
@media (min-width: 768px) {
.col-md-5 {
  flex: 0 0 48%; /* ปรับขนาดให้พอดีกับขอบ */
  max-width: 48%;
}

.row.align-items-stretch {
  justify-content: space-between;
}
}

.fw-semibold {
font-weight: 600;
}

/* ปรับการแสดงผลบนมือถือ */
@media (max-width: 767px) {
.justify-content-end {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.justify-content-end p {
  display: block !important;
  margin-bottom: 5px;
}

.col-md-5 {
  width: 100%;
  margin-bottom: 15px;
}

.big-card {
  margin: 10px;
  width: calc(100% - 20px);
}
}

/* ปรับปุ่มทำแบบประเมิน */
.btn-outline-success {
border-width: 2px;
transition: all 0.3s;
}

.btn-outline-success:hover {
background-color: #28a745;
color: white;
}
</style>