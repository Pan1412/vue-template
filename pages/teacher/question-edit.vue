<template>
  <div class="container mt-4 p-4 mb-5 bg-white shadow rounded">
    <h2 class="text-center fs-3">แบบประเมินจุดแข็งและจุดอ่อน</h2>
    <h5 class="text-center fs-4">Strengths and Difficulties Questionnaire (SDQ)</h5>
    <p class="text-center fs-6">
      เลือกคำตอบ ไม่จริง จริงบ้าง จริงแน่นอน เพียงตัวเลือกเดียวในแต่ละข้อคำถาม
      กรุณาตอบทุกข้อให้ใกล้เคียงความเป็นจริงที่เกิดขึ้นในช่วง 6 เดือนที่ผ่านมา หรือในช่วงปีการศึกษานี้
    </p>

    <div class="text-center mt-3 mb-4" style="color: purple;">
        <h4 class="d-inline me-3">{{ studentInfo.prefix_stu }}{{ studentInfo.name_stu }} {{ studentInfo.surname_stu }}</h4>
        <h4 v-if="studentInfo.class?.toLowerCase() === 'vc'" class="d-inline me-3">ระดับชั้น: ปวช.{{ studentInfo.room }}</h4>
        <h4 v-else class="d-inline me-3">ระดับชั้น: ม.{{ studentInfo.class }}/{{ studentInfo.room }}</h4>
        <h4 class="d-inline me-3 ">  เลขที่: {{ studentInfo.student_num }}</h4>
        <h4 class="d-inline me-3">รหัสนักเรียน: {{ studentInfo.id_school }}</h4>
        </div>
        
    <div class="d-flex justify-content-end mb-2">
      <button class="btn btn-outline-success btn-sm px-6 py-6" @click="StandardScore">
      <Icon name="mdi:numeric-1-box-multiple" class="icon-status" style="font-size: 1.5rem; margin-top: -2px;" /> คะแนนพื้นฐาน
      </button>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered table-striped table-hover ">
        <thead class="table-light text-center sticky-header fm-kanit">
          <tr class="">
            <th class="fs-5">คำถาม</th>
            <th class="fs-5">ไม่จริง</th>
            <th class="fs-5">จริงบ้าง</th>
            <th class="fs-5">จริงแน่นอน</th>
          </tr>
        </thead>
        <tbody class="fm-IBM">
          <tr v-for="q in questions" :key="q.id">
            <td class="text-start fs-5 ">{{ q.id }}. {{ q.text }}</td>
            <td class="text-center centerButton" >
              <label class="container2 ">
                <input type="radio" :name="'q' + q.id" :value="0" v-model="q.value" class="form-check-input" />
                <span class="checkmark"></span>
              </label>
            </td>
            <td class="text-center centerButton">
              <label class="container2 ">
                <input type="radio" :name="'q' + q.id" :value="1" v-model="q.value" class="form-check-input" />
                <span class="checkmark"></span>
              </label>
              
            </td>
            <td class="text-center centerButton">
              <label class="container2 ">
                <input type="radio" :name="'q' + q.id" :value="2" v-model="q.value" class="form-check-input" />
                <span class="checkmark"></span>
              </label>
              
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mb-3">
      <label for="additionalComment" class="form-label fs-5">โปรดกรอกเพิ่มเติมถ้าคุณมีความคิดเห็นอื่น:</label>
      <textarea id="additionalComment" v-model="additionalComment" class="form-control" rows="3"></textarea>
    </div>

    <div class="d-flex justify-content-center gap-3">
      <button class="btn btn-primary fs-5" @click="submitForm">บันทึก</button>
      <button class="btn btn-secondary fs-5" @click="cancelForm">ยกเลิก</button>
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

  const swal = getCurrentInstance().appContext.config.globalProperties;
  

  const route = useRoute();
  const router = useRouter();
  const additionalComment = ref("");
  const specialQuestions = [7, 11, 14, 21, 25];

  const questions = ref([
      { id: 1, text: "ใส่ใจความรู้สึกของผู้อื่น", value: null },
      { id: 2, text: "อยู่ไม่สุข เคลื่อนไหวมาก ไม่สามารถอยู่นิ่งได้นาน", value: null },
      { id: 3, text: "บ่นปวดศีรษะ ปวดท้องหรือคลื่นไส้บ่อยๆ", value: null },
      { id: 4, text: "เต็มใจแบ่งปันกับผู้อื่น(ขนม ของเล่น ดินสอ ฯลฯ)", value: null },
      { id: 5, text: "แผลงฤทธิ์บ่อย หรืออารมณ์ร้อน", value: null },
      { id: 6, text: "ค่อนข้างอยู่โดดเดี่ยว มักเล่นตามลำพัง", value: null },
      { id: 7, text: "โดยปกติแล้ว เชื่อฟัง ทำตามที่ผู้ใหญ่บอก", value: null },
      { id: 8, text: "มีความกังวลหลายเรื่อง ดูเหมือนกังวลบ่อย", value: null },
      { id: 9, text: "ช่วยเหลือถ้ามีใครบาดเจ็บ ไม่สบายใจ หรือเจ็บป่วย", value: null },
      { id: 10, text: "หยุกหยิก หรือดิ้นไปดิ้นมาตลอดเวลา", value: null },
      { id: 11, text: "มีเพื่อนสนิทอย่างน้อยคนนึง", value: null },
      { id: 12, text: "มีเรื่องต่อสู้หรือรังแกเด็กอื่นบ่อยๆ", value: null },
      { id: 13, text: "ไม่มีความสุข เศร้าหรือร้องให้บ่อย", value: null },
      { id: 14, text: "โดยทั่วไปเป็นที่ชอบพอของเด็กอื่น", value: null },
      { id: 15, text: "วอกแวกง่าย ไม่มีสมาธิ", value: null },
      { id: 16, text: "วิตกกังวลหรือติดแจเมื่ออยู่ในสถานการณ์ใหม่ เสียความมั่นใจง่าย", value: null },
      { id: 17, text: "ใจดีกับเด็กที่อายุน้อยกว่า", value: null },
      { id: 18, text: "พูดปดหรือขี้โกงบ่อยๆ", value: null },
      { id: 19, text: "ถูกเด็กคนอื่นแกล้งหรือรังแก", value: null },
      { id: 20, text: "มักอาสาช่วยเหลือผู้อื่น (พ่อแม่ ครู เด็กอื่น)", value: null },
      { id: 21, text: "คิดก่อนทำ", value: null },
      { id: 22, text: "ขโมยของที่บ้าน ที่โรงเรียน หรือที่อื่น", value: null },
      { id: 23, text: "เข้ากับผู้ใหญ่ได้ดีกว่าเข้ากับเด็กอื่น", value: null },
      { id: 24, text: "มีความกลัวหลายเรื่อง หวาดกลัวง่าย", value: null },
      { id: 25, text: "มีสมาธิในการติดตามทำงานจนเสร็จ", value: null },
      ]);


      const studentInfo = ref({}); // เพิ่มตัวแปรนี้ใน setup()

  const getStudentInfo = async () => {
      const student_id = route.query.studentId;
      try {
        const res = await callApi.getStudent({ student_id });
        if (res.code === 0) {
          studentInfo.value = res.result[0];
        }
      } catch (err) {
        console.log(err);
      }
};
  onMounted(getStudentInfo);

  
  const fetchData = async () => {
    const year_res = await callApi.getYear()
    if(!year_res.result || !year_res.result.length || !year_res.result[0].year){
      alert("เกิดข้อผิดพลาด");
      return;
    }
    const year = year_res.result[0].year;
    const s_id = route.query.studentId;
    const req = {
    s_id: s_id,
    year: year,
    };
    try {
      // const response = await axios.post("http://localhost:8000/api/v1/sdq/teacher/getById", { s_id });
      const response = await callApi.getDataTeacherSdq(req);
      if (response.result) {
        const result = response.result;
        questions.value.forEach(q => {
          const originalValue = result[`Q${q.id}`];
          q.value = specialQuestions.includes(q.id) ? (2 - originalValue) : originalValue;
        });
        additionalComment.value = result.additional_comments;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const cancelForm = () => {
  router.push({ path: "/teacher" });
};

  const submitForm = async () => {
    const year_res = await callApi.getYear()
    if(!year_res.result || !year_res.result.length || !year_res.result[0].year){
      alert("เกิดข้อผิดพลาด");
      return;
    }
    const year = year_res.result[0].year;
    const s_id = route.query.studentId;
    const payload = {
    s_id,
    year: year,
    additional_comments: additionalComment.value,
  };
    questions.value.forEach(q => {
      payload[`Q${q.id}`] = specialQuestions.includes(q.id) ? (2 - q.value) : q.value;
    });

      await callApi
      .updateSdq(payload)
      
      .then((res) => {
        // console.log(res)
        if (res.result == 'True') {
          console.log("ส่งสำเร็จ:");
          alert("บันทึกสำเร็จ");
          // this.$router.push("/teacher/");

          window.location.href="/teacher/";
          
        }
      })
  };

  const StandardScore = async () => {
  const specialQuestions = [7, 11, 14, 21, 25]; // ข้อที่มีการคิดคะแนนกลับกัน
  const req = {
    s_id: 0,
    year: 2567,
  };
  try {
    const response = await callApi.getDataTeacherSdq(req);
    if (response.result) {
      console.log(response);
      const result = response.result;
      questions.value.forEach(q => {
        // ตรวจสอบว่าเป็นข้อพิเศษหรือไม่ เพื่อกำหนดค่าให้ถูกต้อง
        if (specialQuestions.includes(q.id)) {
          // สำหรับข้อพิเศษ (7, 11, 14, 21, 25)
          q.value = 2 - result[`Q${q.id}`];
        } else {
          // สำหรับข้อปกติ
          q.value = result[`Q${q.id}`];
        }
      });
      additionalComment.value = result.additional_comments;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

  onMounted(fetchData);

  return { questions, additionalComment, submitForm, swal, studentInfo, cancelForm, StandardScore };
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

.table th, .table td {
vertical-align: middle;

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