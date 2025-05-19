<template>
  <div class="container mt-4 p-4 mb-5 bg-white shadow rounded">
    <h2 class="text-center fs-3">แบบประเมินจุดแข็งและจุดอ่อน</h2>
    <h5 class="text-center fs-4">Strengths and Difficulties Questionnaire (SDQ)</h5>
    <p class="text-center fs-6">
      เลือกคำตอบ ไม่จริง จริงบ้าง จริงแน่นอน เพียงตัวเลือกเดียวในแต่ละข้อคำถาม
      กรุณาตอบทุกข้อให้ใกล้เคียงความเป็นจริงที่เกิดขึ้นในช่วง 6 เดือนที่ผ่านมา หรือในช่วงปีการศึกษานี้
    </p>
    
    <div class="text-center mt-4 mb-4" style="color: purple;">
        <h4 class="d-inline me-3">{{ studentInfo.prefix_stu }} {{ studentInfo.name_stu }} {{ studentInfo.surname_stu }}</h4>
        <h4 v-if="studentInfo.class?.toLowerCase() === 'vc'" class="d-inline me-3">ระดับชั้น: ปวช.{{ studentInfo.room }}</h4>
        <h4 v-else class="d-inline me-3">ระดับชั้น: ม.{{ studentInfo.class }}/{{ studentInfo.room }}</h4>
        <h4 class="d-inline me-3 ">  เลขที่: {{ studentInfo.student_num }}</h4>
        <h4 class="d-inline me-3">รหัสนักเรียน: {{ studentInfo.id_school }}</h4>
        </div>
  


    <div class="table-responsive">
      <table class="table table-bordered table-striped table-hover table-fixed-header">
        <thead class="table-light text-center fm-kanit">
          <tr>
            <th class=" fs-5">คำถาม</th>
            <th class="fs-5">ไม่จริง</th>
            <th class="fs-5">จริงบ้าง</th>
            <th class="fs-5">จริงแน่นอน</th>
          </tr>
        </thead>
        <tbody class="fm-IBM">
          <tr v-for="q in questions" :key="q.id">
            <td class="text-start fs-5">{{ q.id }}. {{ q.text }}</td>
            <td class="text-center centerButton" >
              <label class="container2 ">
              <input type="radio" :name="'q' + q.id" :value="q.values[0]" v-model="q.value">
              <span class="checkmark"></span>
              </label>
            </td>
            <td class="text-center centerButton">
              <label class="container2 ">
              <input type="radio" :name="'q' + q.id" :value="q.values[1]" v-model="q.value">
              <span class="checkmark"></span>
              </label>
            </td>
            <td class="text-center centerButton">
              <label class="container2 ">
              <input type="radio" :name="'q' + q.id" :value="q.values[2]" v-model="q.value">
              <span class="checkmark"></span>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mb-3">
      <label for="additionalComment" class="form-label fs-5">โปรดกรอกเพิ่มเติมถ้าคุณมีความคิดเห็นอื่น:</label>
      <textarea id="additionalComment" v-model="additionalComment" class="form-control" rows="3" placeholder="กรอกความคิดเห็นของคุณที่นี่(ถ้ามี)"></textarea>
    </div>

    <div class="d-flex justify-content-center gap-3">
      <button class="btn btn-primary fs-5" @click="submitForm">ส่งคำตอบ</button>
      <button class="btn btn-secondary fs-5" @click="cancelForm">ยกเลิก</button>
      
    </div>

    <div v-if="formSubmitted" class="alert alert-success mt-3 text-center">
      <h3 class="fs-4">บันทึกสำเร็จ</h3>
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
    questions : [
  { id: 1, text: "ฉันพยายามทำดีต่อผู้อื่น ฉันใส่ใจความรู้สึกของผู้อื่น", values: [0, 1, 2], value: null },
  { id: 2, text: "ฉันอยู่ไม่สุข ฉันไม่สามารถอยู่นิ่งได้นาน", values: [0, 1, 2], value: null },
  { id: 3, text: "ฉันปวดศีรษะ ปวดท้องหรือคลื่นไส้บ่อยๆ", values: [0, 1, 2], value: null },
  { id: 4, text: "โดยปกติแล้ว ฉันแบ่งปันกับผู้อื่น (อาหาร เกม ปากกา ฯลฯ)", values: [0, 1, 2], value: null },
  { id: 5, text: "ฉันโกรธรุนแรงและมักควบคุมอารมณ์ไม่ได้", values: [0, 1, 2], value: null },
  { id: 6, text: "ฉันมักอยู่กับตัวเอง ฉันมักเล่นคนเดียวหรืออยู่ตามลำพัง", values: [0, 1, 2], value: null },
  { id: 7, text: "โดยปกติแล้ว ฉันทำตามที่คนอื่นบอก", values: [2, 1, 0], value: null },
  { id: 8, text: "ฉันกังวลมาก", values: [0, 1, 2], value: null },
  { id: 9, text: "ฉันช่วยเหลือ ถ้ามีใครบาดเจ็บ ไม่สบาย หรือเจ็บป่วย", values: [0, 1, 2], value: null },
  { id: 10, text: "ฉันหยุกหยิก หรือดิ้นไปดิ้นมาตลอดเวลา", values: [0, 1, 2], value: null },
  { id: 11, text: "ฉันมีเพื่อนสนิทอย่างน้อยคนนึง", values: [2, 1, 0], value: null },
  { id: 12, text: "ฉันมีเรื่องต่อสู้บ่อยๆ ฉันบังคับให้ผู้อื่นทำตามที่ฉันต้องการได้", values: [0, 1, 2], value: null },
  { id: 13, text: "ฉันมักไม่มีความสุข เศร้าหรือร้องให้บ่อย", values: [0, 1, 2], value: null },
  { id: 14, text: "คนอื่นในวัยเดียวกับฉันมักชอบฉัน", values: [2, 1, 0], value: null },
  { id: 15, text: "ฉันวอกแวกง่าย ฉันมีความลำบากที่จะใช้สมาธิ", values: [0, 1, 2], value: null },
  { id: 16, text: "ฉันวิตกกังวลเมื่ออยู่ในสถานการณ์ใหม่ๆ ฉันเสียความมั่นใจง่าย", values: [0, 1, 2], value: null },
  { id: 17, text: "ฉันใจดีกับเด็กที่อายุน้อยกว่า", values: [0, 1, 2], value: null },
  { id: 18, text: "ฉันถูกกล่าวหาว่า พูดปดหรือขี้โกงบ่อยๆ", values: [0, 1, 2], value: null },
  { id: 19, text: "เด็กคนอื่นๆ แกล้งหรือรังแกฉัน", values: [0, 1, 2], value: null },
  { id: 20, text: "ฉันมักอาสาช่วยเหลือผู้อื่น (พ่อแม่ ครู เด็ก)", values: [0, 1, 2], value: null },
  { id: 21, text: "ฉันคิดก่อนทำ", values: [2, 1, 0], value: null },
  { id: 22, text: "ฉันเอาของที่ไม่ใช่ของฉันออกไปจากบ้าน โรงเรียนหรือที่อื่น", values: [0, 1, 2], value: null },
  { id: 23, text: "ฉันเข้ากับผู้ใหญ่ได้ดีกว่าเข้ากับเด็กวัยเดียวกัน", values: [0, 1, 2], value: null },
  { id: 24, text: "ฉันมีความกลัวหลายอย่าง ฉันหวาดกลัวง่าย", values: [0, 1, 2], value: null },
  { id: 25, text: "ฉันทำงานที่ทำอยู่ได้เสร็จ ฉันมีสมาธิดี", values: [2, 1, 0], value: null },
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
          // console.log(student_id)
          if (res.code == 0) {
            this.studentInfo = res.result[0];
            // console.log(this.studentInfo.class)
          } 
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async cancelForm(){
      this.$router.push({
        path: "/student/main"
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
        const res = await callApi.checkStudentStatus(req)
        if(res.result[0].sdq_status){
          alert("ท่านได้ทำแบบประเมินนี้แล้ว");
          return;
        }
      const unanswered = this.questions.some(q => q.value === null);

      if (unanswered) {
        alert("กรุณาตอบคำถามให้ครบทุกข้อ");
        return;
      }

      

      const payload = {
        s_id: id_s,
        additional_comments: this.additionalComment,
        year: year,
      };

      this.questions.forEach((q, index) => {
        payload[`Q${index + 1}`] = q.value;
      });

    try {
        await callApi
        .insertSdqStudent(payload)
        .then((res) => {
          if (res.code == 0) {
            console.log("ส่งสำเร็จ:", res.data);
            this.formSubmitted = true;
            alert("บันทึกสำเร็จ");
            this.$router.push("/student/main");
          }
        })

        // window.location.href = "teacher";
      } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
        alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
      }
    }
  }

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@300;400;500;600;700&display=swap');

.container {
    max-width: 1100px;
    margin: auto;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }

  .table-responsive {
  /* ไม่กำหนด max-height เพื่อให้ตารางมีความสูงตามเนื้อหา */
  overflow: visible; /* ให้เนื้อหาที่ล้นออกมาแสดงผลได้ (จำเป็นสำหรับ sticky header) */
}
  
  .sticky-header {
  position: sticky;
  top: 0; /* ติดอยู่ที่ด้านบนของหน้าจอ */
  background-color: #f8f9fa; /* ใช้สี table-light จาก Bootstrap */
  z-index: 1000;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}

.container2 {
  display: inline-block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
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
  height: 25px;
  width: 25px;
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
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}
</style>