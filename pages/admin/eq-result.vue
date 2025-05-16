<template>
  <div class="container rounded p-5 my-5 block-main" style="max-width: 1100px">
    <h2 class="mb-4 d-flex align-items-center">
      <Icon name="carbon:result" class="icon-status me-2" style="font-size: 2rem" />
      ผลการประเมินรายบุคคล (EQ)
    </h2>

    <!-- ข้อมูลนักเรียน -->
    <div class="student-info text-center my-4">
      <div class="student-name mb-1">{{ studentInfo.prefix_stu }} {{ studentInfo.name_stu }} {{ studentInfo.surname_stu }}</div>
      <div class="student-details">
        <span v-if="studentInfo.class?.toLowerCase() === 'vc'">ระดับชั้น: ปวช.{{ studentInfo.room }}</span>
        <span v-else>ระดับชั้น: ม.{{ studentInfo.class }}/{{ studentInfo.room }}</span>
        | เลขที่: {{ studentInfo.student_num }}
        | รหัสนักเรียน: {{ studentInfo.id_school }}
      </div>
    </div>

    <!-- รวมคะแนน -->
    <section class="mb-4">
      <div class="total-score-card">
        <h4 class="fw-semibold text-center mb-3">คะแนน EQ รวม</h4>
        <div class="text-center fs-5 fw-bold" :class="EqResults && EqResults.R_sum ? getResultColor(EqResults.R_sum) : 'text-secondary-soft'">
          {{ EqResults && EqResults.R_sum ? getResultLabel(EqResults.R_sum, EqResults.score_sum) : '- ( - )' }}
        </div>
      </div>
    </section>

    <!-- Template ซ้ำสำหรับแต่ละหมวด -->
    <section v-for="(section, index) in [
      {
        title: '1. องค์ประกอบ ด้านดี',
        description: 'ด้านดี หมายถึงความสามารถในการควบคุมอารมณ์และความต้องการของตนเอง รู้จักเห็นใจผู้อื่นและ มีความรับผิดชอบต่อส่วนรวม',
        group: EqResults ? EqResults.R_g1 : null,
        groupScore: EqResults ? EqResults.score_g1 : null,
        subs: [
          { label: '1.1 ควบคุมอารมณ์', result: EqResults ? EqResults.R1 : null, score: EqResults ? EqResults.score_1 : null },
          { label: '1.2 เห็นใจผู้อื่น', result: EqResults ? EqResults.R2 : null, score: EqResults ? EqResults.score_2 : null },
          { label: '1.3 รับผิดชอบ', result: EqResults ? EqResults.R3 : null, score: EqResults ? EqResults.score_3 : null }
        ]
      },
      {
        title: '2. องค์ประกอบ ด้านเก่ง',
        description: 'ด้านเก่ง หมายถึงความสามารถในการรู้จักตนเอง มีแรงจูงใจ สามารถตัดสินใจแก้ปัญหาและแสดงออกได้อย่างมีประสิทธิภาพ รวมทั้งมีสัมพันธภาพที่ดีกับผู้อื่น',
        group: EqResults ? EqResults.R_g2 : null,
        groupScore: EqResults ? EqResults.score_g2 : null,
        subs: [
          { label: '2.1 มีแรงจูงใจ', result: EqResults ? EqResults.R4 : null, score: EqResults ? EqResults.score_4 : null },
          { label: '2.2 ตัดสินใจและแก้ไขปัญหา', result: EqResults ? EqResults.R5 : null, score: EqResults ? EqResults.score_5 : null },
          { label: '2.3 สัมพันธภาพกับผู้อื่น', result: EqResults ? EqResults.R6 : null, score: EqResults ? EqResults.score_6 : null }
        ]
      },
      {
        title: '3. องค์ประกอบ ด้านสุข',
        description: 'ด้านสุข หมายถึงความสามารถในการดำเนินชีวิตอย่างเป็นสุข',
        group: EqResults ? EqResults.R_g3 : null,
        groupScore: EqResults ? EqResults.score_g3 : null,
        subs: [
          { label: '3.1 ภูมิใจในตนเอง', result: EqResults ? EqResults.R7 : null, score: EqResults ? EqResults.score_7 : null },
          { label: '3.2 พึงพอใจในชีวิต', result: EqResults ? EqResults.R8 : null, score: EqResults ? EqResults.score_8 : null },
          { label: '3.3 สงบสุขทางใจ', result: EqResults ? EqResults.R9 : null, score: EqResults ? EqResults.score_9 : null }
        ]
      }
    ]" :key="index" class="mb-4">
      <div class="category-card">
        <h5 class="fw-semibold mb-2">{{ section.title }}</h5>
        <p class="text-muted description mb-3">{{ section.description }}</p>
        <p class="mb-3">
          <span class="fw-bold">ผลการประเมินโดยรวม:</span>
          <span class="fw-bold ms-2" :class="section.group ? getResultColor(section.group) : 'text-secondary-soft'">
            {{ section.group ? getResultLabel(section.group, section.groupScore) : '- ( - )' }}
          </span>
        </p>
        <div class="row g-3">
          <div class="col-md-4" v-for="(item, idx) in section.subs" :key="idx">
            <div class="score-card">
              <div class="score-label mb-2">{{ item.label }}</div>
              <div class="score-value fw-bold" :class="item.result ? getResultColor(item.result) : 'text-secondary-soft'">
                {{ item.result ? getResultLabel(item.result, item.score) : 'ไม่มีข้อมูล' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ปุ่มด้านล่าง -->
    <div class="d-flex justify-content-between align-items-center mt-4">
      <div v-if="EqResults && Object.keys(EqResults).length > 0">
        <button class="btn btn-outline-danger me-2" @click="confirmDelete(EqResults.year)">
          <Icon name="mdi:delete-outline" class="me-1" /> ลบคำตอบ
        </button>
        <button class="btn btn-outline-secondary" @click="showResultEq(studentId)">
          <Icon name="mdi:eye-outline" class="me-1" /> ดูคำตอบ
        </button>
      </div>

      <a href="https://necam.go.th/wp-content/uploads/2020/08/11.-%E0%B9%81%E0%B8%9B%E0%B8%A5%E0%B8%9C%E0%B8%A5-SDQ.pdf" target="_blank" class="btn btn-primary">
         <Icon name="mdi:file-pdf-box" class="me-1" /> เกณฑ์การแปรผล EQ
      </a>
    </div>
  </div>
</template>
  
<script>
import dayjs from "dayjs";
import callApi from "../../api/callApi";
import moment from "moment";
export default {
  data() {
    return {
      studentId: '',
      studentInfo: [],
      EqResults: null,
    };
  },

  async mounted() {
    try {
      this.studentId = this.$route.query.studentId;
      await this.getStudentInfo();
      await this.resultEq();
      console.log("EqResults loaded:", this.EqResults);
    } catch (error) {
      console.error("Error in mounted:", error);
    }
  },

  methods: {
    async reloadPage() {
      window.location.reload();
    },
    
    async getStudentInfo() {
      try {
        const student_id = this.$route.query.studentId;
        const res = await callApi.getStudent({student_id});
        console.log("Student info response:", res);
        
        if (res.code == 0 && res.result && res.result.length > 0) {
          this.studentInfo = res.result[0];
        } else {
          console.warn("No student info found or invalid response");
        }
      } catch (err) {
        console.error("Error getting student info:", err);
      }
    },

    async resultEq() {
      try {
        const year_res = await callApi.getYear();
        console.log("Year response:", year_res);
        
        if (!year_res.result || !year_res.result.length || !year_res.result[0].year) {
          console.error("Invalid year data returned");
          return;
        }
        
        const year = year_res.result[0].year;
        const s_id = this.$route.query.studentId;
        
        console.log("Fetching EQ results for student:", s_id, "year:", year);
        
        const req = {
          s_id: s_id,
          year: year,
        };
        
        const res = await callApi.getEqResult(req);
        console.log("EQ result response:", res);
        
        if (res && res.result) {
          this.EqResults = res.result;
        } else {
          console.warn("No EQ results found or invalid response");
          this.EqResults = null;
        }
      } catch (err) {
        console.error("Error fetching EQ results:", err);
        this.EqResults = null;
      }
    },

    getResultLabel(scoreLabel, score) {
      if (!scoreLabel || scoreLabel === null || scoreLabel === undefined) {
        return '- ( - )';
      }
      
      if (score === null || score === undefined) {
        score = '-';
      }
      
      return `${scoreLabel} ( ${score} )`;
    },

    getResultColor(scoreLabel) {
      if (!scoreLabel || scoreLabel === null || scoreLabel === undefined) {
        return 'text-secondary-soft';
      }

      if (scoreLabel.includes("ต่ำกว่าปกติ")) return "text-danger";
      if (scoreLabel.includes("สูงกว่าปกติ")) return "text-success";
      if (scoreLabel.includes("เกณฑ์ปกติ")) return "text-success";

      return "text-secondary-soft";
    },

    showResultEq(studentId) {
      this.$router.push({
        path: "/admin/eq-student/",
        query: { studentId },
      });
    },

    confirmDelete(year) {
      if (!year) {
        console.warn("Cannot delete: no year data available");
        window.alert("ไม่สามารถลบข้อมูลได้: ไม่พบข้อมูลปีการศึกษา");
        return;
      }
      
      const confirm = window.confirm("ยืนยันการลบคำตอบ?");
      if (confirm) {
        this.deleteAnswer(year);
      }
    },

    async deleteAnswer(year) {
      try {
        const s_id = this.$route.query.studentId;
        
        if (!s_id || !year) {
          window.alert("ไม่สามารถลบข้อมูลได้: ข้อมูลไม่ครบถ้วน");
          return;
        }
        
        const req = {
          s_id: s_id,
          year: year,
        };
        
        console.log("Deleting EQ answer:", req);
        
        const res = await callApi.deleteEq(req);
        console.log("Delete response:", res);
        
        if (res.code === 0) {
          window.alert("ลบสำเร็จ");
          window.location.reload();
        } else {
          window.alert("ลบไม่สำเร็จ: " + (res.message || "เกิดข้อผิดพลาด"));
        }
      } catch (err) {
        console.error("Error deleting answer:", err);
        window.alert("เกิดข้อผิดพลาดในการลบข้อมูล");
      }
    },
  },
};
</script>
  
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&display=swap');

.block-main {
  font-family: 'IBM Plex Sans Thai', sans-serif;
  background: #ffffff !important;
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border-radius: 16px !important;
}

h2 {
  color: #333;
  font-weight: 600;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

h4, h5 {
  color: #444;
  font-weight: 600;
}

.icon-status {
  color: #4a6cf7;
}

.student-info {
  padding: 1rem;
  border-radius: 12px;
  background-color: #f8f9fa;
  margin-bottom: 2rem;
}

.student-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
}

.student-details {
  color: #666;
  font-size: 1rem;
}

.total-score-card {
  background-color: #f0f7ff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  border-left: 5px solid #4a6cf7;
}

.category-card {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s;
}

.category-card:hover {
  transform: translateY(-3px);
}

.description {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
}

.score-card {
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 1rem;
  background-color: #ffffff;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.score-card:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
  border-color: #ccc;
}

.score-label {
  font-size: 0.95rem;
  color: #555;
  text-align: center;
}

.score-value {
  font-size: 1.1rem;
}

.text-success {
  color: #10b981 !important;
}

.text-danger {
  color: #ef4444 !important;
}

.text-secondary-soft {
  color: #94a3b8;
}

.btn {
  border-radius: 8px;
  font-weight: 500;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s ease;
}

.btn-outline-danger {
  border-color: #ef4444;
  color: #ef4444;
}

.btn-outline-danger:hover {
  background-color: #ef4444;
  color: white;
}

.btn-outline-secondary {
  border-color: #64748b;
  color: #64748b;
}

.btn-outline-secondary:hover {
  background-color: #64748b;
  color: white;
}

.btn-primary {
  background-color: #4a6cf7;
  border-color: #4a6cf7;
  color: white;
}

.btn-primary:hover {
  background-color: #3a5ce4;
  border-color: #3a5ce4;
  box-shadow: 0 5px 15px rgba(74, 108, 247, 0.3);
}

.row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 1.5rem;
}
</style>