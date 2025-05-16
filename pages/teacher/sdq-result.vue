<template>
    <div>
      <div align="center">
        <div class="block-main">
          <div class="row">
            <div class="col">
              <h2 class="mb-4 d-flex align-items-center">
                <Icon name="carbon:result" class="icon-status me-2" style="font-size: 2rem" />
                ผลการประเมินรายบุคคล (SDQ)
              </h2>
  
              <!-- ข้อมูลนักเรียน -->
              <div class="student-info text-center my-4">
                <div class="student-name mb-1">{{ studentInfo.prefix_stu }}{{ studentInfo.name_stu }} {{ studentInfo.surname_stu }}</div>
                <div class="student-details">
                  <span v-if="studentInfo.class?.toLowerCase() === 'vc'">ระดับชั้น: ปวช. {{ studentInfo.room }}</span>
                  <span v-else>ระดับชั้น: ม.{{ studentInfo.class }}/{{ studentInfo.room }}</span>
                  | เลขที่: {{ studentInfo.student_num }}
                  | รหัสนักเรียน: {{ studentInfo.id_school }}
                </div>
              </div>
  
              <!-- ผลการประเมินของครู -->
              <section class="mb-4">
                <div class="section-card teacher-card">
                  <h5 class="fw-semibold mb-3">ผลการประเมินของครู</h5>
                  <div class="status-indicator mb-3">
                    <span class="fw-bold">สถานะ : </span>
                    <span v-if="sdqResults.teacher === null" class="text-danger">ยังไม่ได้ทำแบบประเมิน </span>
                    <span v-else class="text-success">ทำแบบประเมินแล้ว </span>
                  </div>
                  <div class="row g-3 mb-3">
                    <div class="col-md-4">
                      <div class="score-card">
                        <div class="score-label mb-2">พฤติกรรมด้านอารมณ์</div>
                        <div class="score-value fw-bold" :class="getResultColor(sdqResults.teacher?.R1)">
                          {{ getResultLabelWithScore(sdqResults.teacher?.R1, sdqResults.teacher?.score_1) }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="score-card">
                        <div class="score-label mb-2">ด้านพฤติกรรมเกเร</div>
                        <div class="score-value fw-bold" :class="getResultColor(sdqResults.teacher?.R2)">
                          {{ getResultLabelWithScore(sdqResults.teacher?.R2, sdqResults.teacher?.score_2) }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="score-card">
                        <div class="score-label mb-2">ด้านพฤติกรรมไม่อยู่นิ่ง</div>
                        <div class="score-value fw-bold" :class="getResultColor(sdqResults.teacher?.R3)">
                          {{ getResultLabelWithScore(sdqResults.teacher?.R3, sdqResults.teacher?.score_3) }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="score-card">
                        <div class="score-label mb-2">พฤติกรรมด้านความสัมพันธ์กับเพื่อน</div>
                        <div class="score-value fw-bold" :class="getResultColor(sdqResults.teacher?.R4)">
                          {{ getResultLabelWithScore(sdqResults.teacher?.R4, sdqResults.teacher?.score_4) }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="score-card">
                        <div class="score-label mb-2">พฤติกรรมด้านสัมพันธภาพทางสังคม</div>
                        <div class="score-value fw-bold" :class="getResultColor(sdqResults.teacher?.R5)">
                          {{ getResultLabelWithScore(sdqResults.teacher?.R5, sdqResults.teacher?.score_5) }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="comment-box mb-3">
                    <div class="comment-label">ความคิดเห็นเพิ่มเติม</div>
                    <div class="comment-content">{{sdqResults.teacher?.additional_comments || 'ไม่มีความคิดเห็นเพิ่มเติม'}}</div>
                  </div>
                  <div class="d-flex justify-content-end">
                    <button v-if="sdqResults.teacher != null" class="btn btn-outline-secondary" @click="editQuestion(studentId)">
                      <Icon name="mdi:eye-outline" class="me-1" /> ดูคำตอบ
                    </button>
                  </div>
                </div>
              </section>
  
              <!-- ผลการประเมินของนักเรียน -->
              <section class="mb-4">
                <div class="section-card student-card">
                  <h5 class="fw-semibold mb-3">ผลการประเมินของนักเรียน</h5>
                  <div class="status-indicator mb-3">
                    <span class="fw-bold">สถานะ : </span>
                    <span v-if="sdqResults.student === null" class="text-danger">ยังไม่ได้ทำแบบประเมิน </span>
                    <span v-else class="text-success">ทำแบบประเมินแล้ว </span>
                  </div>
                  <div class="row g-3 mb-3">
                    <div class="col-md-4">
                      <div class="score-card">
                        <div class="score-label mb-2">พฤติกรรมด้านอารมณ์</div>
                        <div class="score-value fw-bold" :class="getResultColor(sdqResults.student?.R1)">
                          {{ getResultLabelWithScore(sdqResults.student?.R1, sdqResults.student?.score_1) }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="score-card">
                        <div class="score-label mb-2">ด้านพฤติกรรมเกเร</div>
                        <div class="score-value fw-bold" :class="getResultColor(sdqResults.student?.R2)">
                          {{ getResultLabelWithScore(sdqResults.student?.R2, sdqResults.student?.score_2) }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="score-card">
                        <div class="score-label mb-2">ด้านพฤติกรรมไม่อยู่นิ่ง</div>
                        <div class="score-value fw-bold" :class="getResultColor(sdqResults.student?.R3)">
                          {{ getResultLabelWithScore(sdqResults.student?.R3, sdqResults.student?.score_3) }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="score-card">
                        <div class="score-label mb-2">พฤติกรรมด้านความสัมพันธ์กับเพื่อน</div>
                        <div class="score-value fw-bold" :class="getResultColor(sdqResults.student?.R4)">
                          {{ getResultLabelWithScore(sdqResults.student?.R4, sdqResults.student?.score_4) }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="score-card">
                        <div class="score-label mb-2">พฤติกรรมด้านสัมพันธภาพทางสังคม</div>
                        <div class="score-value fw-bold" :class="getResultColor(sdqResults.student?.R5)">
                          {{ getResultLabelWithScore(sdqResults.student?.R5, sdqResults.student?.score_5) }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="comment-box mb-3">
                    <div class="comment-label">ความคิดเห็นเพิ่มเติม</div>
                    <div class="comment-content">{{sdqResults.student?.additional_comments || 'ไม่มีความคิดเห็นเพิ่มเติม'}}</div>
                  </div>
                  <div class="d-flex justify-content-end gap-2">
                    <button v-if="sdqResults.student != null" class="btn btn-outline-danger" @click="confirmDelete('student', sdqResults.student.year)">
                      <Icon name="mdi:delete-outline" class="me-1" /> ลบคำตอบ
                    </button>
                    <button v-if="sdqResults.student != null" class="btn btn-outline-secondary" @click="showResultStudent(studentId)">
                      <Icon name="mdi:eye-outline" class="me-1" /> ดูคำตอบ
                    </button>
                  </div>
                </div>
              </section>
  
              <!-- ผลการประเมินของผู้ปกครอง -->
              <section class="mb-4">
                <div class="section-card parent-card">
                  <h5 class="fw-semibold mb-3">ผลการประเมินของผู้ปกครอง</h5>
                  <div class="status-indicator mb-3">
                    <span class="fw-bold">สถานะ : </span>
                    <span v-if="sdqResults.parent === null" class="text-danger">ยังไม่ได้ทำแบบประเมิน </span>
                    <span v-else class="text-success">ทำแบบประเมินแล้ว </span>
                  </div>
                  <div class="row g-3 mb-3">
                    <div class="col-md-4">
                      <div class="score-card">
                        <div class="score-label mb-2">พฤติกรรมด้านอารมณ์</div>
                        <div class="score-value fw-bold" :class="getResultColor(sdqResults.parent?.R1)">
                          {{ getResultLabelWithScore(sdqResults.parent?.R1, sdqResults.parent?.score_1) }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="score-card">
                        <div class="score-label mb-2">ด้านพฤติกรรมเกเร</div>
                        <div class="score-value fw-bold" :class="getResultColor(sdqResults.parent?.R2)">
                          {{ getResultLabelWithScore(sdqResults.parent?.R2, sdqResults.parent?.score_2) }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="score-card">
                        <div class="score-label mb-2">ด้านพฤติกรรมไม่อยู่นิ่ง</div>
                        <div class="score-value fw-bold" :class="getResultColor(sdqResults.parent?.R3)">
                          {{ getResultLabelWithScore(sdqResults.parent?.R3, sdqResults.parent?.score_3) }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="score-card">
                        <div class="score-label mb-2">พฤติกรรมด้านความสัมพันธ์กับเพื่อน</div>
                        <div class="score-value fw-bold" :class="getResultColor(sdqResults.parent?.R4)">
                          {{ getResultLabelWithScore(sdqResults.parent?.R4, sdqResults.parent?.score_4) }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="score-card">
                        <div class="score-label mb-2">พฤติกรรมด้านสัมพันธภาพทางสังคม</div>
                        <div class="score-value fw-bold" :class="getResultColor(sdqResults.parent?.R5)">
                          {{ getResultLabelWithScore(sdqResults.parent?.R5, sdqResults.parent?.score_5) }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="comment-box mb-3">
                    <div class="comment-label">ความคิดเห็นเพิ่มเติม</div>
                    <div class="comment-content">{{sdqResults.parent?.additional_comments || 'ไม่มีความคิดเห็นเพิ่มเติม'}}</div>
                  </div>
                  <div class="d-flex justify-content-end gap-2">
                    <button v-if="sdqResults.parent != null" class="btn btn-outline-danger" @click="confirmDelete('parent', sdqResults.parent.year)">
                      <Icon name="mdi:delete-outline" class="me-1" /> ลบคำตอบ
                    </button>
                    <button v-if="sdqResults.parent != null" class="btn btn-outline-secondary" @click="showResultParent(studentId)">
                      <Icon name="mdi:eye-outline" class="me-1" /> ดูคำตอบ
                    </button>
                  </div>
                </div>
              </section>
  
              <!-- ปุ่มด้านล่าง -->
              <div class="d-flex justify-content-center mt-4">
                <a href="https://necam.go.th/wp-content/uploads/2020/08/11.-%E0%B9%81%E0%B8%9B%E0%B8%A5%E0%B8%9C%E0%B8%A5-SDQ.pdf" target="_blank" class="btn btn-primary">
                  <Icon name="mdi:file-pdf-box" class="me-1" /> เกณฑ์การแปรผล SDQ
                </a>
              </div>
            </div>
          </div>
        </div>
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
      sdqResults: {
        teacher: null,
        student: null,
        parent: null,
      },
    };
  },

  async mounted() {
    try {
      this.studentId = this.$route.query.studentId;
      await this.resultSdq();
      await this.getStudentInfo();
      console.log("SDQ Results loaded:", this.sdqResults);
    } catch (error) {
      console.error("Error in mounted:", error);
    }
  },

  methods: {
    async getStudentInfo() {
      try {
        const student_id = this.$route.query.studentId;
        const res = await callApi.getStudent({ student_id });
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

    async resultSdq() {
      try {
        const year_res = await callApi.getYear();
        console.log("Year response:", year_res);
        
        if (!year_res.result || !year_res.result.length || !year_res.result[0].year) {
          console.error("Invalid year data returned");
          return;
        }
        
        const year = year_res.result[0].year;
        const s_id = this.$route.query.studentId;
        
        console.log("Fetching SDQ results for student:", s_id, "year:", year);
        
        const req = {
          s_id: s_id,
          year: year,
        };
        
        const res = await callApi.resultSdqById(req);
        console.log("SDQ result response:", res);
        
        if (res.code === 0 && res.result) {
          const data = res.result;
          this.sdqResults.teacher = data.find(item => item.role === 'teacher') || null;
          this.sdqResults.student = data.find(item => item.role === 'student') || null;
          this.sdqResults.parent = data.find(item => item.role === 'parent') || null;
        } else {
          console.warn("No SDQ results found or invalid response");
        }
      } catch (err) {
        console.error("Error fetching SDQ results:", err);
      }
    },

    getResultLabel(resultCode) {
      // แปลงค่า resultCode จากตัวเลขเป็นข้อความ
      if (resultCode === undefined || resultCode === null) return "ไม่มีข้อมูล";
      
      // สำหรับ R1-R4 (ด้านปัญหา)
      if (resultCode === 0) return "ปกติ";
      else if (resultCode === 1) return "เสี่ยง";
      else if (resultCode === 2) return "มีปัญหา";
      
      // สำหรับ R5 (ด้านจุดแข็ง)
      else if (resultCode === 3) return "มีจุดแข็ง";
      else if (resultCode === 4) return "ไม่มีจุดแข็ง";
      
      return "ไม่มีข้อมูล";
    },
    
    getResultLabelWithScore(resultCode, score) {
      const label = this.getResultLabel(resultCode);
      const scoreValue = (score === null || score === undefined) ? "-" : score;
      return `${label} ( ${scoreValue} )`;
    },

    getResultColor(resultCode) {
      if (resultCode === undefined || resultCode === null) return 'text-secondary-soft';
      
      // สำหรับด้านปัญหา (R1-R4)
      if (resultCode === 0) return "text-success"; // ปกติ
      if (resultCode === 1) return "text-warning"; // เสี่ยง
      if (resultCode === 2) return "text-danger";  // มีปัญหา
      
      // สำหรับด้านจุดแข็ง (R5)
      if (resultCode === 3) return "text-success"; // มีจุดแข็ง
      if (resultCode === 4) return "text-danger"; // ไม่มีจุดแข็ง
      
      return "text-secondary-soft"; // fallback
    },

    goToSurvey(studentId) {
      this.$router.push({
        path: "/teacher/question/",
        query: { studentId },
      });
    },

    editQuestion(studentId) {
      this.$router.push({
        path: "/teacher/question-edit/",
        query: { studentId },
      });
    },

    showResultStudent(studentId) {
      this.$router.push({
        path: "/teacher/sdq-student/",
        query: { studentId },
      });
    },

    showResultParent(studentId) {
      this.$router.push({
        path: "/teacher/sdq-parent/",
        query: { studentId },
      });
    },

    confirmDelete(role, year) {
      if (!year) {
        console.warn("Cannot delete: no year data available");
        window.alert("ไม่สามารถลบข้อมูลได้: ไม่พบข้อมูลปีการศึกษา");
        return;
      }
      
      const confirm = window.confirm("ยืนยันการลบคำตอบ?");
      if (confirm) {
        this.deleteAnswer(role, year);
      }
    },

    async deleteAnswer(role, year) {
      try {
        const s_id = this.$route.query.studentId;
        
        if (!s_id || !year) {
          window.alert("ไม่สามารถลบข้อมูลได้: ข้อมูลไม่ครบถ้วน");
          return;
        }
        
        const req = {
          s_id: s_id,
          role: role,
          year: year,
        };
        
        console.log("Deleting SDQ answer:", req);
        
        const res = await callApi.deleteSdq(req);
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
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  padding: 2.5rem;
  margin: 2rem auto;
  max-width: 1100px;
}

h2 {
  color: #333;
  font-weight: 600;
  font-size: 1.8rem;
}

h5 {
  color: #444;
  font-weight: 600;
  font-size: 1.25rem;
}

.icon-status {
  color: #4a6cf7;
}

/* ส่วนข้อมูลนักเรียน */
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

/* การ์ดแต่ละส่วน */
.section-card {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s;
  margin-bottom: 1.5rem;
}

.section-card:hover {
  transform: translateY(-3px);
}

.teacher-card {
  border-left: 5px solid #4a6cf7;
}

.student-card {
  border-left: 5px solid #10b981;
}

.parent-card {
  border-left: 5px solid #f59e0b;
}

.status-indicator {
  padding: 0.5rem 0;
  margin-bottom: 1rem;
}

.text-success {
  color: #10b981 !important;
}

.text-danger {
  color: #ef4444 !important;
}

.text-warning {
  color: #f59e0b !important;
}

.text-secondary-soft {
  color: #94a3b8;
}

/* การ์ดคะแนน */
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

/* กล่องความคิดเห็น */
.comment-box {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid #e5e5e5;
}

.comment-label {
  color: #888;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.comment-content {
  color: #333;
  min-height: 30px;
}

/* ปุ่ม */
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

.gap-2 {
  gap: 0.5rem;
}
</style>