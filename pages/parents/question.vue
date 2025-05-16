<template>
  <div class="container mb-5 mt-5 bg-white shadow rounded">
    <h2 class="text-center fs-1">แบบประเมินจุดแข็งและจุดอ่อน</h2>
    <h5 class="text-center fs-2">Strengths and Difficulties Questionnaire (SDQ)</h5>
    <p class="text-center fs-5">
      เลือกคำตอบ ไม่จริง จริงบ้าง จริงแน่นอน เพียงตัวเลือกเดียวในแต่ละข้อคำถาม
      กรุณาตอบทุกข้อให้ใกล้เคียงความเป็นจริงที่เกิดขึ้นในช่วง 6 เดือนที่ผ่านมา หรือในช่วงปีการศึกษานี้
    </p>
    
    <!-- ข้อมูลนักเรียน -->
    <div class="text-center mt-4 mb-4" style="color: purple;">
        <h4 class="d-inline me-3 fs-3">{{ studentInfo.prefix_stu }}{{ studentInfo.name_stu }} {{ studentInfo.surname_stu }}</h4>
        <h4 v-if="studentInfo.class?.toLowerCase() === 'vc'" class="d-inline me-3 fs-3">ระดับชั้น: ปวช.{{ studentInfo.room }}</h4>
        <h4 v-else class="d-inline me-3 fs-3">ระดับชั้น: ม. {{ studentInfo.class }}/{{ studentInfo.room }}</h4>
        <h4 class="d-inline me-3 fs-3">เลขที่: {{ studentInfo.student_num }}</h4>
        <h4 class="d-inline me-3 fs-3">รหัสนักเรียน: {{ studentInfo.id_school }}</h4>
    </div>
    
    <!-- ย้ายส่วนกรอกข้อมูลผู้ปกครองมาไว้ด้านล่างข้อมูลนักเรียน -->
    <div class="fs-3 row mb-4 fm-kanit">

      <div class="col-md-6">
        <div class="form-group">
          <label for="parentName" class="form-label fs-4">ชื่อ-สกุล ผู้ปกครอง</label>
          <input type="text" id="parentName" v-model="parentName" class="form-control fs-4" placeholder="กรอกชื่อและนามสกุลของผู้ปกครอง">
        </div>
      </div>
      <div class="col-md-4">
      </div>
    </div>
    

    <div class="table-responsive">
  <table class="table table-bordered table-striped table-hover">
    <thead class="table-light text-center sticky-header fm-kanit" style="font-size: 14pt;">
      <tr>
        <th class="">คำถาม</th>
        <th class="">ไม่จริง</th>
        <th class="">จริงบ้าง</th>
        <th class="">จริงแน่นอน</th>
      </tr>
    </thead>
    <tbody class="fm-IBM">
      <tr v-for="q in questions" :key="q.id">
        <td class="text-start " style="font-size: 18pt;">{{ q.id }}. {{ q.text }}</td>
        <td class="text-center centerButton align-middle">
          <label class="container2 big-radio">
            <input type="radio" :name="'q' + q.id" :value="q.values[0]" v-model="q.value">
            <span class="checkmark"></span>
          </label>
        </td>
        <td class="text-center centerButton align-middle">
          <label class="container2 big-radio">
            <input type="radio" :name="'q' + q.id" :value="q.values[1]" v-model="q.value">
            <span class="checkmark"></span>
          </label>
        </td>
        <td class="text-center centerButton align-middle">
          <label class="container2 big-radio">
            <input type="radio" :name="'q' + q.id" :value="q.values[2]" v-model="q.value">
            <span class="checkmark"></span>
          </label>
        </td>
      </tr>
    </tbody>
  </table>
</div>

    <div class="mb-3">
      <label for="additionalComment" class="form-label fs-4">โปรดกรอกเพิ่มเติมถ้าคุณมีความคิดเห็นอื่น:</label>
      <textarea id="additionalComment" v-model="additionalComment" class="form-control fs-4" rows="3" placeholder="กรอกความคิดเห็นของคุณที่นี่(ถ้ามี)"></textarea>
    </div>

    <div class="d-flex justify-content-center gap-3">
      <button class="btn btn-primary fs-4" @click="submitForm" :disabled="isSubmitting">
        <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        {{ isSubmitting ? 'กำลังบันทึก...' : 'ส่งคำตอบ' }}
      </button>
      <button class="btn btn-secondary fs-4" @click="cancelForm" :disabled="isSubmitting">ยกเลิก</button>
    </div>

    <!-- Modal แจ้งบันทึกสำเร็จ -->
    <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title fs-3" id="successModalLabel">แจ้งเตือน</h5>
            <button type="button" class="btn-close btn-close-white" @click="redirectAfterSuccess"></button>
          </div>
          <div class="modal-body text-center py-4">
            <i class="bi bi-check-circle-fill text-success fs-1 mb-3 d-block"></i>
            <h3 class="fs-3 mb-3">บันทึกสำเร็จ</h3>
            <p class="fs-5">ข้อมูลของท่านได้ถูกบันทึกเรียบร้อยแล้ว</p>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-success fs-4 px-4" @click="redirectAfterSuccess">ตกลง</button>
          </div>
        </div>
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
  setup() {
    const additionalComment = ref("");
    const formSubmitted = ref(false);
    return {
      additionalComment,
      formSubmitted,
    };
  },


  data() {
    return {
      parentPrefix: "",
      parentName: "",
      questions : [
        { id: 1, text: "ใส่ใจความรู้สึกของผู้อื่น", values: [0, 1, 2], value: null },
        { id: 2, text: "อยู่ไม่สุข เคลื่อนไหวมาก ไม่สามารถอยู่นิ่งได้นาน", values: [0, 1, 2], value: null },
        { id: 3, text: "บ่นปวดศีรษะ ปวดท้องหรือคลื่นไส้บ่อยๆ", values: [0, 1, 2], value: null },
        { id: 4, text: "เต็มใจแบ่งปันกับผู้อื่น(ขนม ของเล่น ดินสอ ฯลฯ)", values: [0, 1, 2], value: null },
        { id: 5, text: "แผลงฤทธิ์บ่อย หรืออารมณ์ร้อน", values: [0, 1, 2], value: null },
        { id: 6, text: "ค่อนข้างอยู่โดดเดี่ยว มักเล่นตามลำพัง", values: [0, 1, 2], value: null },
        { id: 7, text: "โดยปกติแล้ว เชื่อฟัง ทำตามที่ผู้ใหญ่บอก", values: [2, 1, 0], value: null },
        { id: 8, text: "มีความกังวลหลายเรื่อง ดูเหมือนกังวลบ่อย", values: [0, 1, 2], value: null },
        { id: 9, text: "ช่วยเหลือถ้ามีใครบาดเจ็บ ไม่สบายใจ หรือเจ็บป่วย", values: [0, 1, 2], value: null },
        { id: 10, text: "หยุกหยิก หรือดิ้นไปดิ้นมาตลอดเวลา", values: [0, 1, 2], value: null },
        { id: 11, text: "มีเพื่อนสนิทอย่างน้อยคนนึง", values: [2, 1, 0], value: null },
        { id: 12, text: "มีเรื่องต่อสู้หรือรังแกเด็กอื่นบ่อยๆ", values: [0, 1, 2], value: null },
        { id: 13, text: "ไม่มีความสุข เศร้าหรือร้องให้บ่อย", values: [0, 1, 2], value: null },
        { id: 14, text: "โดยทั่วไปเป็นที่ชอบพอของเด็กอื่น", values: [2, 1, 0], value: null },
        { id: 15, text: "วอกแวกง่าย ไม่มีสมาธิ", values: [0, 1, 2], value: null },
        { id: 16, text: "วิตกกังวลหรือติดแจเมื่ออยู่ในสถานการณ์ใหม่ เสียความมั่นใจง่าย", values: [0, 1, 2], value: null },
        { id: 17, text: "ใจดีกับเด็กที่อายุน้อยกว่า", values: [0, 1, 2], value: null },
        { id: 18, text: "พูดปดหรือขี้โกงบ่อยๆ", values: [0, 1, 2], value: null },
        { id: 19, text: "ถูกเด็กคนอื่นแกล้งหรือรังแก", values: [0, 1, 2], value: null },
        { id: 20, text: "มักอาสาช่วยเหลือผู้อื่น (พ่อแม่ ครู เด็กอื่น)", values: [0, 1, 2], value: null },
        { id: 21, text: "คิดก่อนทำ", values: [2, 1, 0], value: null },
        { id: 22, text: "ขโมยของที่บ้าน ที่โรงเรียน หรือที่อื่น", values: [0, 1, 2], value: null },
        { id: 23, text: "เข้ากับผู้ใหญ่ได้ดีกว่าเข้ากับเด็กอื่น", values: [0, 1, 2], value: null },
        { id: 24, text: "มีความกลัวหลายเรื่อง หวาดกลัวง่าย", values: [0, 1, 2], value: null },
        { id: 25, text: "มีสมาธิในการติดตามทำงานจนเสร็จ", values: [2, 1, 0], value: null },
      ],
      studentInfo:[]
    }
    
  },

  async mounted() {
    this.getStudentInfo();
  },
  
  methods: {
    async getStudentInfo(){
      const student_id = this.$route.query.studentId;
      await callApi
        .getStudent({student_id})
        .then((res) => {
          if (res.code == 0) {
            this.studentInfo = res.result[0];
            console.log(this.studentInfo)
          } 
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async cancelForm(){
      this.$router.push({
        path: "/parents/Login-sdq"
      });
    },

    async submitForm() {
      const year_res = await callApi.getYear()
      if(!year_res.result || !year_res.result.length || !year_res.result[0].year){
        alert("เกิดข้อผิดพลาด");
        return;
      }
      const year = year_res.result[0].year;
      const id_s = this.$route.query.studentId;
      const req ={
        s_id: id_s,
        year: year
      }
      const res = await callApi.checkStatusTP(req)
      if(res.result[0].parent_status){
        alert("ท่านได้ทำแบบประเมินนี้แล้ว");
        return;
      }
      const unanswered = this.questions.some(q => q.value === null);
    
      if (unanswered) {
        alert("กรุณาตอบคำถามให้ครบทุกข้อ");
        return;
      }
      
      let fullParentName = "";
      if (this.parentPrefix || this.parentName) {
        fullParentName = (this.parentPrefix ? this.parentPrefix + " " : "") + this.parentName;
      }
     
      const payload = {
        p_name: fullParentName || "",
        s_id: id_s,
        additional_comments: this.additionalComment,
        year: year,
      };

      this.questions.forEach((q, index) => {
        payload[`Q${index + 1}`] = q.value;
      });

      try {
        await callApi
        .insertSdqParents(payload)
        .then((res) => {
          if (res.code == 0) {
            console.log("ส่งสำเร็จ:", res.data);
            this.formSubmitted = true;
            alert("บันทึกสำเร็จ");
            this.$router.push("/parents/Login-sdq");
          }
        })
      } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
        alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
      }
    }
  }
}
</script>

<style scoped>


.container {
  max-width: 1300px;
  min-width: 400px;
  margin: auto;
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
}

/* ปรับปรุงสำหรับอุปกรณ์มือถือ */


/* เพิ่มสไตล์สำหรับคอลัมน์ในตาราง */
.question-column {
  width: 55%;
}

.choice-column {
  width: 15%;
  white-space: nowrap;
}

/* เพิ่มสไตล์สำหรับการจัดตำแหน่งข้อความในหัวตาราง */
.table thead th {
  vertical-align: middle !important; /* ให้ข้อความอยู่กึ่งกลางแนวตั้ง */
  text-align: center !important;    /* ให้ข้อความอยู่กึ่งกลางแนวนอน */
  padding: 12px;                    /* เพิ่ม padding เพื่อให้มีพื้นที่มากขึ้น */
  font-weight: bold;                /* ตัวหนา */
  height: 60px;                     /* กำหนดความสูงขั้นต่ำเพื่อให้มีพื้นที่พอสำหรับข้อความ */
}

  .table-responsive {
  overflow: visible;
}
  
  .sticky-header {
  position: sticky;
  top: 0;
  background-color: #f8f9fa;
  z-index: 1000;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}

.container2 {
  display: inline-block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 24px; /* เพิ่มขนาดจาก 22px เป็น 24px */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.container2 input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 30px; /* เพิ่มขนาดจาก 25px เป็น 30px */
  width: 30px; /* เพิ่มขนาดจาก 25px เป็น 30px */
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container2:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.container2 input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.container2 input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.container2 .checkmark:after {
  top: 10px; /* ปรับตำแหน่งตามขนาดที่เพิ่มขึ้น */
  left: 10px; /* ปรับตำแหน่งตามขนาดที่เพิ่มขึ้น */
  width: 10px; /* เพิ่มขนาดจาก 8px เป็น 10px */
  height: 10px; /* เพิ่มขนาดจาก 8px เป็น 10px */
  border-radius: 50%;
  background: white;
}

/* สไตล์สำหรับฟอร์มข้อมูลผู้ปกครอง */
.form-group {
  margin-bottom: 20px; /* เพิ่มจาก 15px เป็น 20px */
}

.form-label {
  font-weight: 500;
  color: #333;
  margin-bottom: 8px; /* เพิ่มจาก 5px เป็น 8px */
  display: block;
}

.form-control, .form-select {
  border-radius: 5px;
  border: 1px solid #ced4da;
  padding: 10px 12px; /* เพิ่มจาก 8px 12px เป็น 10px 12px */
  width: 100%;
}

.form-select:focus, .form-control:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25); /* เพิ่มจาก 0.2rem เป็น 0.25rem */
}

/* เพิ่มสไตล์เพื่อให้ปุ่มใหญ่ขึ้น */
.btn {
  padding: 12px 24px; /* เพิ่มขนาดปุ่ม */
  font-weight: 500;
}


</style>