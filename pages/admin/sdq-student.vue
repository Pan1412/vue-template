<template>
    <div class="container mt-4 p-4 mb-5 bg-white shadow rounded">
      <h2 class="text-center fs-3">แบบประเมินจุดแข็งและจุดอ่อน</h2>
      <h5 class="text-center fs-4">Strengths and Difficulties Questionnaire (SDQ) (นักเรียน)</h5>
  
      <div class="text-center mt-4 mb-4" style="color: purple;">
        <h4 class="d-inline me-3">{{ studentInfo.prefix_stu }} {{ studentInfo.name_stu }} {{ studentInfo.surname_stu }}</h4>
        <h4 v-if="studentInfo.class?.toLowerCase() === 'vc'" class="d-inline me-3">ปวช. {{ studentInfo.room }}</h4>
        <h4 v-else class="d-inline me-3">ห้อง: {{ studentInfo.class }}/{{ studentInfo.room }}</h4>
        <h4 class="d-inline me-3 ">  เลขที่: {{ studentInfo.student_num }}</h4>
        <h4 class="d-inline me-3">รหัสนักเรียน: {{ studentInfo.id_school }}</h4>
        </div>
  
      <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
          <thead class="table-light text-center sticky-header">
            <tr>
              <th class="fs-5">คำถาม</th>
              <th class="fs-5">ไม่จริง</th>
              <th class="fs-5">จริงบ้าง</th>
              <th class="fs-5">จริงแน่นอน</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="q in questions" :key="q.id">
              <td class="text-start fs-5">{{ q.id }}. {{ q.text }}</td>
              <td class="text-center centerButton">
                <label class="container2">
                  <input
                    type="radio"
                    :name="'q' + q.id"
                    :value="q.values[0]"
                    v-model="q.value"
                    :disabled="isReadonly"
                  />
                  <span class="checkmark"></span>
                </label>
              </td>
              <td class="text-center centerButton">
                <label class="container2">
                  <input
                    type="radio"
                    :name="'q' + q.id"
                    :value="q.values[1]"
                    v-model="q.value"
                    :disabled="isReadonly"
                  />
                  <span class="checkmark"></span>
                </label>
              </td>
              <td class="text-center centerButton">
                <label class="container2">
                  <input
                    type="radio"
                    :name="'q' + q.id"
                    :value="q.values[2]"
                    v-model="q.value"
                    :disabled="isReadonly"
                  />
                  <span class="checkmark"></span>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="mb-3">
        <label for="additionalComment" class="form-label fs-5">ความคิดเห็นเพิ่มเติม</label>
        <textarea
          id="additionalComment"
          v-model="additionalComment"
          class="form-control"
          rows="3"
          :readonly="isReadonly"
        ></textarea>
      </div>
  
      <div class="d-flex">
        <button class="btn btn-secondary fs-4" @click="moreInfo(studentId)">ย้อนกลับ</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import callApi from "../api/callApi";
  
  export default {
    setup() {
      const additionalComment = ref("");
      const formSubmitted = ref(false);
      return {
        studentId: "",
        additionalComment,
        formSubmitted,
      };
    },
  
    data() {
      return {
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
      studentInfo:[],
      isReadonly: true,
      }
      
    },
  
    async mounted() {
      this.getStudentInfo();
      this.studentId = this.$route.query.studentId;
      this.StandardScore();
    },
    
    methods: {
      async getStudentInfo(){
        const student_id = this.$route.query.studentId;
        await callApi
          .getStudent({student_id})
          .then((res) => {
            // console.log(res,student_id);
            if (res.code == 0) {
              this.studentInfo = res.result[0];
            } 
          })
          .catch((err) => {
            console.log(err);
          });
      },
  
      async StandardScore(){
        const year_res = await callApi.getYear()
        if(!year_res.result || !year_res.result.length || !year_res.result[0].year){
          alert("เกิดข้อผิดพลาด");
          return;
        }
        const year = year_res.result[0].year;
        const req = {
          s_id: this.studentId,
          year: year,
        };
        try {
          const response = await callApi.getStudentSdq(req);
          if (response.result) {
            const result = response.result;
            this.questions.forEach((q) => {
              q.value = result[`Q${q.id}`];
            });
            this.additionalComment = result.additional_comments;
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      },
  
    moreInfo(studentId) {
        this.$router.push({
        path: "/admin/sdq-result",
        query: { studentId },
      });
  },
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