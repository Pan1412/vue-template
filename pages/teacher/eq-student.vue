<template>
    <div class="container mt-4 p-4 mb-5 bg-white shadow rounded">
      <h1 class="text-center fs-2">แบบประเมินความฉลาดทางอารมณ์ (EQ) (อายุ 12 - 17 ปี )</h1>
      <!-- <h5 class="text-center fs-4">Strengths and Difficulties Questionnaire (SDQ)</h5> -->
      
      
      <div class="text-center mt-4 mb-4" style="color: purple;">
        <h4 class="d-inline me-3">{{ studentInfo.prefix_stu }} {{ studentInfo.name_stu }} {{ studentInfo.surname_stu }}</h4>
        <h4 v-if="studentInfo.class?.toLowerCase() === 'vc'" class="d-inline me-3">ปวช. {{ studentInfo.room }}</h4>
        <h4 v-else class="d-inline me-3">ห้อง: {{ studentInfo.class }}/{{ studentInfo.room }}</h4>
        <h4 class="d-inline me-3 ">  เลขที่: {{ studentInfo.student_num }}</h4>
        <h4 class="d-inline me-3">รหัสนักเรียน: {{ studentInfo.id_school }}</h4>
        </div>
  
  
      <div class="mt-4">
        <table class="table table-bordered table-striped table-hover">
          <thead class="table-light text-center sticky-header">
            <tr>
              <th class=" fs-5">คำถาม</th>
              <th class="fs-5">ไม่จริง</th>
              <th class="fs-5">จริงบางครั้ง</th>
              <th class="fs-5">ค่อนข้างจริง</th>
              <th class="fs-5">จริงมาก</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="q in questions" :key="q.id">
              <td class="text-start fs-5">{{ q.id }}. {{ q.text }}</td>
              <td class="text-center centerButton">
                <label class="container2 ">
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
                <label class="container2 ">
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
                <label class="container2 ">
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
                <td class="text-center centerButton">
                <label class="container2 ">
                    <input
                    type="radio"
                    :name="'q' + q.id"
                    :value="q.values[3]"
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
  
  
      <div class="d-flex">
        <button class="btn btn-secondary fs-4" @click="moreInfo(studentId)">ย้อนกลับ</button>
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
      const formSubmitted = ref(false);
      return {
        formSubmitted,
        studentId: "",
      };
    },
  
    data() {
      return {
      questions : [
        { id: 1, text: "เวลาโกรธหรือไม่สบาย ฉันรับรู้ได้ว่าเกิดอะไรขึ้นกับฉัน", values: [1, 2, 3, 4], value: null },
        { id: 2, text: "ฉันบอกไม่ได้ว่าอะไรทำให้ฉันรู้สึกกลัว", values: [4, 3, 2, 1], value: null },
        { id: 3, text: "เมื่อถูกขัดใจฉันมักรู้สึกหงุดหงิดจนควบคุมอารมณ์ไม่ได้", values: [4, 3, 2, 1], value: null },
        { id: 4, text: "ฉันสามารถคอยเพื่อนให้บรรลุเป้าหมายที่พอใจ", values: [1, 2, 3, 4], value: null },
        { id: 5, text: "ฉันมักมีปฏิกิริยาโต้ตอบรุนแรงต่อปัญหาเพียงเล็กน้อย", values: [4, 3, 2, 1], value: null },
        { id: 6, text: "เมื่อถูกบังคับให้ทำในสิ่งที่ไม่ชอบ ฉันอธิบายเหตุผลจนผู้อื่นยอมรับไม่ได้", values: [1, 2, 3, 4], value: null },
        { id: 7, text: "ฉันสังเกตได้ เมื่อคนใกล้ชิดมีอารมณ์เปลี่ยนแปลง", values: [1, 2, 3, 4], value: null },
        { id: 8, text: "ฉันไม่สนใจกับความทุกข์ของคนอื่นที่ฉันไม่รู้จัก", values: [4, 3, 2, 1], value: null },
        { id: 9, text: "ฉันไม่ยอมรับในสิ่งที่ผู้อื่นทำต่างจากที่ฉันคิด", values: [4, 3, 2, 1], value: null },
        { id: 10, text: "ฉันยอมรับได้ว่าผู้อื่นก็อาจมีเหตุผลที่จะไม่พอใจการกระทำของฉัน", values: [1, 2, 3, 4], value: null },
        { id: 11, text: "ฉันรู้สึกว่าผู้อื่นชอบเรียกร้องความสนใจมากเกินไป", values: [4, 3, 2, 1], value: null },
        { id: 12, text: "แม้จะมีภาระที่ต้องทำ ฉันก็ยินดีรับฟังความทุกข์ของผู้อื่นที่ต้องการความช่วยเหลือ", values: [1, 2, 3, 4], value: null },
        { id: 13, text: "เป็นเรื่องธรรมดาที่จะเอาเปรียบผู้อื่นเมื่อมีโอกาส", values: [4, 3, 2, 1], value: null },
        { id: 14, text: "ฉันเห็นคุณค่าในน้ำใจที่ผู้อื่นมีต่อฉัน", values: [1, 2, 3, 4], value: null },
        { id: 15, text: "เมื่อทำผิดฉันสามารถกล่าวคำ ขอโทษ ผู้อื่นได้", values: [1, 2, 3, 4], value: null },
        { id: 16, text: "ฉันยอมรับข้อผิดพลาดของคนอื่นได้ยาก", values: [4, 3, 2, 1], value: null },
        { id: 17, text: "ถึงแม้จะเสียประโยชน์ส่วนตัวไปบ้าง ฉันก็ยินดีที่จะทำเพื่อส่วนรวม", values: [1, 2, 3, 4], value: null },
        { id: 18, text: "ฉันรู้สึกลำบากใจในการทำสิ่งใดสิ่งหนึ่งเพื่อผู้อื่น", values: [4, 3, 2, 1], value: null },
        { id: 19, text: "ฉันไม่รู้ว่าฉันเก่งเรื่องอะไร", values: [4, 3, 2, 1], value: null },
        { id: 20, text: "แม้จะเป็นงานยากฉันก็มั่นใจว่าสามารถทำได้", values: [1, 2, 3, 4], value: null },
        { id: 21, text: "เมื่อทำสิ่งใดไม่สำเร็จฉันรู้สึกหมดกำลังใจ", values: [4, 3, 2, 1], value: null },
        { id: 22, text: "ฉันรู้สึกมีคุณค่าเมื่อได้ทำสิ่งต่างๆ อย่างเต็มความสามารถ", values: [1, 2, 3, 4], value: null },
        { id: 23, text: "เมื่อต้องเผชิญกับอุปสรรคและความผิดหวัง ฉันก็จะไม่ยอมแพ้", values: [1, 2, 3, 4], value: null },
        { id: 24, text: "เมื่อเริ่มทำสิ่งหนึ่งสิ่งใด ฉันมักทำต่อไปไม่สำเร็จ", values: [4, 3, 2, 1], value: null },
        { id: 25, text: "ฉันพยายามหาสาเหตุที่แท้จริงของปัญหาโดยไม่คิดเอาเองตามใจชอบ", values: [1, 2, 3, 4], value: null },
        { id: 26, text: "บ่อยครั้งที่ฉันไม่รู้ว่าอะไรทำให้ฉันไม่มีความสุข", values: [4, 3, 2, 1], value: null },
        { id: 27, text: "ฉันรู้สึกว่าการตัดสินใจแก้ปัญหาเป็นเรื่องยากสำหรับฉัน", values: [4, 3, 2, 1], value: null },
        { id: 28, text: "เมื่อต้องทำอะไรบางอย่างในเวลาเดียวกันฉันตัดสินใจได้ว่าจะทำอะไรก่อนหลัง", values: [1, 2, 3, 4], value: null },
        { id: 29, text: "ฉันลำบากใจเมื่อต้องอยู่กับคนแปลกหน้าหรือคนที่ไม่คุ้นเคย", values: [4, 3, 2, 1], value: null },
        { id: 30, text: "ฉันทนไม่ได้เมื่อต้องอยู่ในสังคมที่มีกฎระเบียบขัดกับความเคยชินกับฉัน", values: [4, 3, 2, 1], value: null },
        { id: 31, text: "ฉันทำความรู้จักผู้อื่นได้ง่าย", values: [1, 2, 3, 4], value: null },
        { id: 32, text: "ฉันมีเพื่อนสนิทหลายคนที่คบกันมานาน", values: [1, 2, 3, 4], value: null },
        { id: 33, text: "ฉันไม่กล้าบอกความต้องการของฉันให้ผู้อื่นรับรู้", values: [4, 3, 2, 1], value: null },
        { id: 34, text: "ฉันทำในสิ่งที่ต้องการโดยไม่ทำให้ผู้อื่นเดือดร้อน", values: [1, 2, 3, 4], value: null },
        { id: 35, text: "เป็นการยากสำหรับฉันที่จะโต้แย้งกับผู้อื่น แม้จะมีเหตุผลเพียงพอ", values: [4, 3, 2, 1], value: null },
        { id: 36, text: "เมื่อไม่เห็นด้วยกับผู้อื่นฉันสามารถอธิบายเหตุผลที่เขายอมรับได้", values: [1, 2, 3, 4], value: null },
        { id: 37, text: "ฉันรู้สึกว่าด้อยกว่าคนอื่น", values: [4, 3, 2, 1], value: null },
        { id: 38, text: "ฉันทำหน้าที่ได้ดี ไม่ว่าจะอยู่ในบทบาทใด", values: [1, 2, 3, 4], value: null },
        { id: 39, text: "ฉันสามารถทำงานที่ได้รับมอบหมายได้ดีที่สุด", values: [1, 2, 3, 4], value: null },
        { id: 40, text: "ฉันไม่มั่นใจในการทำงานที่ยากลำบาก", values: [4, 3, 2, 1], value: null },
        { id: 41, text: "แม้สถานการณ์จะเลวร้าย ฉันก็มีความหวังว่าจะดีขึ้น", values: [1, 2, 3, 4], value: null },
        { id: 42, text: "ทุกปัญหามักมีทางออกเสมอ", values: [1, 2, 3, 4], value: null },
        { id: 43, text: "เมื่อมีเรื่องทำให้เครียด ฉันมักปรับเปลี่ยนให้เป็นเรื่องผ่อนคลาย หรือสนุกสนาน", values: [1, 2, 3, 4], value: null },
        { id: 44, text: "ฉันสนุกสนานทุกครั้งกับกิจกรรมในวันสุดสัปดาห์และวันหยุดพักผ่อน", values: [1, 2, 3, 4], value: null },
        { id: 45, text: "ฉันรู้สึกไม่พอใจที่ผู้อื่นได้รับสิ่งดีๆ มากกว่าฉัน", values: [4, 3, 2, 1], value: null },
        { id: 46, text: "ฉันพอใจกับสิ่งที่ฉันเป็นอยู่", values: [1, 2, 3, 4], value: null },
        { id: 47, text: "ฉันไม่รู้ว่าจะหาอะไรทำ เมื่อรู้สึกเบื่อหน่าย", values: [4, 3, 2, 1], value: null },
        { id: 48, text: "เมื่อวันว่างจากภาระหน้าที่ ฉันจะทำในสิ่งที่ฉันชอบ", values: [1, 2, 3, 4], value: null },
        { id: 49, text: "เมื่อรู้สึกไม่สบายใจ ฉันมีวิธีผ่อนคลายอารมณ์ได้", values: [1, 2, 3, 4], value: null },
        { id: 50, text: "ฉันสามารถผ่อนคลายตนเองได้ แม้จะเหน็ดเหนื่อยจากภาระหน้าที่", values: [1, 2, 3, 4], value: null },
        { id: 51, text: "ฉันไม่สามารถทำใจให้เป็นสุขได้จนกว่าจะได้ทุกสิ่งที่ต้องการ", values: [4, 3, 2, 1], value: null },
        { id: 52, text: "ฉันทุกข์ร้อนกับเรื่องเล็กๆ น้อยๆ ที่เกิดขึ้นเสมอ", values: [4, 3, 2, 1], value: null },

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
          const response = await callApi.getEqById(req); 
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
          path: "/teacher/eq-result",
          query: { studentId },
        });
    },
  
      
    }
  
    
  
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@300;400;500;600;700&display=swap');
  
  .container {
    max-width: 1300px;
    margin: auto;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  .table th, .table td {
    vertical-align: middle;
    font-family: 'IBM Plex Sans Thai Looped', sans-serif;
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
.sticky-header th {
  position: sticky;
  top: 0;
  background-color: #f8f9fa; /* สีพื้นหลังให้ตรงกับ .table-light */
  z-index: 1;
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

  
  /* Hide the browser's default radio button */
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