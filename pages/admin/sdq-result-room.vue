<template>
  <div>
    <div align="center">
      <div class="block-main">
        <div class="block-bg-main">
          <div class="row">
            <div class="col">
              <div class="row align-items-center g-3">
                <div class="col-auto">
                  <h2 class="mb-3 d-flex align-items-center text-secondary">
                    <i class="bi bi-clipboard-data me-2" style="font-size: 2rem; margin-top: -2px;"></i>
                    สรุปผลการคัดกรองนักเรียน SDQ ระดับห้องเรียน
                  </h2>
                </div>
              </div>


              <div class="row">
                  <div class="col">
                    <!-- เพิ่มปุ่มเลือกชั้นเรียน -->
                    <div class="row align-items-center g-3 mb-3 ms-3">
                      <div class="col-auto">
                        <label class="col-form-label" for="">ชั้นเรียน</label>
                      </div>
                      <div class="col-auto">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          v-model="selectedClass"
                          @change="onClassChange"
                        >
                          <option value="1">ม.1</option>
                          <option value="2">ม.2</option>
                          <option value="3">ม.3</option>
                          <option value="4">ม.4</option>
                          <option value="5">ม.5</option>
                          <option value="6">ม.6</option>
                          <option value="vc">ปวช.</option>
                        </select>
                      </div>
                      <div class="col-auto">
                        <label class="col-form-label" for="">ห้อง/ปี</label>
                      </div>
                      <div class="col-auto">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          v-model="selectedRoom"
                        >
                          <option :value="room" v-for="room in availableRooms" :key="room">{{ room }}</option>
                        </select>
                      </div>
                      <div class="col-auto">
                        <button class="btn btn-outline-success fm-kanit" @click="SdqResult_room">
                          <i class="bi bi-search me-1"></i>
                          ค้นหา
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col text-end " style="padding-top: 0.3rem;"><div class="fs-5">จำนวนนักเรียน {{ totalStudents }} คน</div></div>
                </div>

              <!-- ตารางข้อมูล -->
              <div class="bg-white rounded p-4 mb-4 shadow-sm">
                <div class="table-responsive">
                  <table class="table table-bordered mb-0">
                    <thead class="table-secondary">
                      <tr class="text-center">
                        <th style="width: 30%" class="fw-semibold">ประเภท</th>
                        <th style="width: 25%" class="fw-semibold">ผลการคัดกรอง</th>
                        <th style="width: 20%" class="text-center fw-semibold">จำนวน (คน)</th>
                        <th style="width: 25%" class="text-center fw-semibold">ร้อยละ</th>
                      </tr>
                    </thead>
                    <tbody class="fm-IBM">
                      <!-- เพศ -->
                      <tr class="highlight-row">
                        <td rowspan="2" class="align-middle fw-semibold text-center type-column">เพศ</td>
                        <td class="table-light">ชาย</td>
                        <td class="text-center table-light">{{ genderData.male.count }}</td>
                        <td class="text-center table-light">{{ genderData.male.percentage }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td>หญิง</td>
                        <td class="text-center">{{ genderData.female.count }}</td>
                        <td class="text-center">{{ genderData.female.percentage }}</td>
                      </tr>

                      <!-- สุขภาพจิต/พฤติกรรม -->
                      <tr class="highlight-row">
                        <td rowspan="3" class="align-middle fw-semibold text-center type-column">สุขภาพจิต / พฤติกรรม</td>
                        <td class="table-light">ปกติ</td>
                        <td class="text-center table-light">{{ mentalHealthData.normal.count }}</td>
                        <td class="text-center table-light">{{ mentalHealthData.normal.percentage }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td>เสี่ยง</td>
                        <td class="text-center">{{ mentalHealthData.risk.count }}</td>
                        <td class="text-center">{{ mentalHealthData.risk.percentage }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="table-light">มีปัญหา</td>
                        <td class="text-center table-light">{{ mentalHealthData.problem.count }}</td>
                        <td class="text-center table-light">{{ mentalHealthData.problem.percentage }}</td>
                      </tr>

                      <!-- ความประพฤติ -->
                      <tr class="highlight-row">
                        <td rowspan="3" class="align-middle fw-semibold text-center type-column">ความประพฤติ</td>
                        <td>ปกติ</td>
                        <td class="text-center">{{ behaviorData.normal.count }}</td>
                        <td class="text-center">{{ behaviorData.normal.percentage }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="table-light">เสี่ยง</td>
                        <td class="text-center table-light">{{ behaviorData.risk.count }}</td>
                        <td class="text-center table-light">{{ behaviorData.risk.percentage }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td>มีปัญหา</td>
                        <td class="text-center">{{ behaviorData.problem.count }}</td>
                        <td class="text-center">{{ behaviorData.problem.percentage }}</td>
                      </tr>

                      <!-- พฤติกรรมไม่อยู่นิ่ง -->
                      <tr class="highlight-row">
                        <td rowspan="3" class="align-middle fw-semibold text-center type-column">พฤติกรรมไม่อยู่นิ่ง</td>
                        <td class="table-light">ปกติ</td>
                        <td class="text-center table-light">{{ hyperactivityData.normal.count }}</td>
                        <td class="text-center table-light">{{ hyperactivityData.normal.percentage }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td>เสี่ยง</td>
                        <td class="text-center">{{ hyperactivityData.risk.count }}</td>
                        <td class="text-center">{{ hyperactivityData.risk.percentage }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="table-light">มีปัญหา</td>
                        <td class="text-center table-light">{{ hyperactivityData.problem.count }}</td>
                        <td class="text-center table-light">{{ hyperactivityData.problem.percentage }}</td>
                      </tr>

                      <!-- ความสัมพันธ์กับเพื่อน -->
                      <tr class="highlight-row">
                        <td rowspan="3" class="align-middle fw-semibold text-center type-column">ความสัมพันธ์กับเพื่อน</td>
                        <td>ปกติ</td>
                        <td class="text-center">{{ relationshipData.normal.count }}</td>
                        <td class="text-center">{{ relationshipData.normal.percentage }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="table-light">เสี่ยง</td>
                        <td class="text-center table-light">{{ relationshipData.risk.count }}</td>
                        <td class="text-center table-light">{{ relationshipData.risk.percentage }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td>มีปัญหา</td>
                        <td class="text-center">{{ relationshipData.problem.count }}</td>
                        <td class="text-center">{{ relationshipData.problem.percentage }}</td>
                      </tr>

                      <!-- สัมพันธภาพ -->
                      <tr class="highlight-row">
                        <td rowspan="2" class="align-middle fw-semibold text-center type-column">สัมพันธภาพ</td>
                        <td class="table-light">มีจุดแข็ง</td>
                        <td class="text-center table-light">{{ strengthData.has.count }}</td>
                        <td class="text-center table-light">{{ strengthData.has.percentage }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td>ไม่มีจุดแข็ง</td>
                        <td class="text-center">{{ strengthData.none.count }}</td>
                        <td class="text-center">{{ strengthData.none.percentage }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="alert alert-primary py-3 mt-2">
                      <div class="d-flex align-items-center">
                      <i class="bi bi-info-circle-fill me-2 fs-5"></i>
                      <div>ผลการประเมินในตารางจะแสดงค่าที่ถูกต้องเมื่อได้รับข้อมูลครบทั้ง <u><b>3 ส่วน</b></u> คือ ครู นักเรียน และผู้ปกครอง</div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import callApi from "../api/callApi";

export default {
  name: 'SdqScreeningReportWithStudentProblems',
  head() {
    return {
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js',
          body: true
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
          body: true
        }
      ]
    }
  },
  data() {
    return {
      totalStudents: 0,
      evaluatedStudents: 0,
      roomInfo: {
        name: '',
        class: '',
        room: ''
      },
      
      // ตัวแปรสำหรับเลือกชั้นเรียน
      selectedClass: '1',
      selectedRoom: '1',
      availableRooms: ['1', '2', '3', '4', '5', '6'],
      
      // ข้อมูลเพศ
      genderData: {
        male: {
          count: 0,
          percentage: 0
        },
        female: {
          count: 0,
          percentage: 0
        }
      },
      
      // ข้อมูลสุขภาพจิต/พฤติกรรม
      mentalHealthData: {
        normal: {
          count: 0,
          percentage: 0
        },
        risk: {
          count: 0,
          percentage: 0
        },
        problem: {
          count: 0,
          percentage: 0
        }
      },
      
      // ข้อมูลความประพฤติ
      behaviorData: {
        normal: {
          count: 0,
          percentage: 0
        },
        risk: {
          count: 0,
          percentage: 0
        },
        problem: {
          count: 0,
          percentage: 0
        }
      },
      
      // ข้อมูลพฤติกรรมไม่อยู่นิ่ง (adhd)
      hyperactivityData: {
        normal: {
          count: 0,
          percentage: 0
        },
        risk: {
          count: 0,
          percentage: 0
        },
        problem: {
          count: 0,
          percentage: 0
        }
      },
      
      // ข้อมูลความสัมพันธ์กับเพื่อน
      relationshipData: {
        normal: {
          count: 0,
          percentage: 0
        },
        risk: {
          count: 0,
          percentage: 0
        },
        problem: {
          count: 0,
          percentage: 0
        }
      },
      
      // ข้อมูลสัมพันธภาพ (socialSkills)
      strengthData: {
        has: {
          count: 0,
          percentage: 0
        },
        none: {
          count: 0,
          percentage: 0
        }
      },
      
      charts: {
        gender: null,
        mental: null,
        hyperactivity: null,
        strength: null
      }
    };
  },
  async mounted() {
    await this.SdqResult_room();
  },
  methods: {
    // เพิ่มฟังก์ชันเมื่อเปลี่ยนชั้นเรียน
    onClassChange() {
      if (this.selectedClass === 'vc') {
        this.availableRooms = ['1', '2', '3'];
      } else {
        this.availableRooms = ['1', '2', '3', '4', '5', '6'];
      }
      
      // กำหนดค่าห้องเริ่มต้นเป็นห้อง 1
      this.selectedRoom = '1';
    },
    
    async SdqResult_room() {
      try {
        const year_res = await callApi.getYear();
        if (!year_res.result || !year_res.result.length || !year_res.result[0].year) {
          alert("เกิดข้อผิดพลาด");
          return;
        }
        
        const year = year_res.result[0].year;
        
        // ใช้ค่าที่เลือกจาก dropdown แทนค่าคงที่
        const req = {
          class: this.selectedClass,
          room: this.selectedRoom,
          year: year,
        };
        
        const res = await callApi.GetSdqClassAdmin(req);
        
        if (res && res.code === 0 && res.result) {
          this.processApiData(res.result);
          
          // เรียกดึงข้อมูลเพศของนักเรียนในห้อง
          await this.getSexStudentRoom();
          
          this.$nextTick(() => {
            if (typeof Chart !== 'undefined') {
              this.initCharts();
            } else {
              setTimeout(() => {
                this.initCharts();
              }, 1000);
            }
          });
        } else {
          console.error("API returned invalid data:", res);
          alert("ไม่พบข้อมูล SDQ ของห้องเรียนนี้");
        }
      } catch (err) {
        console.error("Error:", err);
        alert("เกิดข้อผิดพลาดในการดึงข้อมูล SDQ");
      }
    },

    async getSexStudentRoom() {
      try {
        // ใช้ค่าที่เลือกจาก dropdown แทนค่าคงที่
        const req = {
          class: this.selectedClass,
          room: this.selectedRoom,
        };
        
        const res = await callApi.GetSexStudentRoom(req);
        
        if (res && res.code === 0 && res.result) {
          // นำข้อมูลที่ได้ไปใส่ในตัวแปร genderData
          this.genderData.male.count = res.result.male;
          this.genderData.female.count = res.result.female;
          this.genderData.male.percentage = res.result.malePercent;
          this.genderData.female.percentage = res.result.femalePercent;
          
          // อัพเดท totalStudents หากจำเป็น (หากยังไม่มีค่า)
          if (!this.totalStudents) {
            this.totalStudents = res.result.total;
          }
        } else {
          console.error("API returned invalid data:", res);
        }
      } catch (err) {
        console.error("Error fetching gender data:", err);
      }
    },
    
    processApiData(data) {
      // Set room info
      this.roomInfo.class = data.class;
      this.roomInfo.room = data.room;
      
      // Check if class is "vc" for vocational students
      if (data.class === "vc") {
        this.roomInfo.name = `ปวช.${data.room}`;
      } else {
        this.roomInfo.name = `ชั้น ม.${data.class}/${data.room}`;
      }
      
      // Set total students and evaluated students
      this.totalStudents = data.totalStudents;
      this.evaluatedStudents = data.evaluatedStudents;
      
      // Process mental health data
      this.mentalHealthData.normal.count = data.mentalHealth.normal;
      this.mentalHealthData.risk.count = data.mentalHealth.risk;
      this.mentalHealthData.problem.count = data.mentalHealth.problem;
      
      this.mentalHealthData.normal.percentage = data.mentalHealthPercent?.normal || 0;
      this.mentalHealthData.risk.percentage = data.mentalHealthPercent?.risk || 0;
      this.mentalHealthData.problem.percentage = data.mentalHealthPercent?.problem || 0;
      
      // Process behavior data
      this.behaviorData.normal.count = data.behavior.normal;
      this.behaviorData.risk.count = data.behavior.risk;
      this.behaviorData.problem.count = data.behavior.problem;
      
      this.behaviorData.normal.percentage = data.behaviorPercent?.normal || 0;
      this.behaviorData.risk.percentage = data.behaviorPercent?.risk || 0;
      this.behaviorData.problem.percentage = data.behaviorPercent?.problem || 0;
      
      // Process ADHD data (hyperactivity)
      this.hyperactivityData.normal.count = data.adhd.normal;
      this.hyperactivityData.risk.count = data.adhd.risk;
      this.hyperactivityData.problem.count = data.adhd.problem;
      
      this.hyperactivityData.normal.percentage = data.adhdPercent?.normal || 0;
      this.hyperactivityData.risk.percentage = data.adhdPercent?.risk || 0;
      this.hyperactivityData.problem.percentage = data.adhdPercent?.problem || 0;
      
      // Process relationship data
      this.relationshipData.normal.count = data.relationship.normal;
      this.relationshipData.risk.count = data.relationship.risk;
      this.relationshipData.problem.count = data.relationship.problem;
      
      this.relationshipData.normal.percentage = data.relationshipPercent?.normal || 0;
      this.relationshipData.risk.percentage = data.relationshipPercent?.risk || 0;
      this.relationshipData.problem.percentage = data.relationshipPercent?.problem || 0;
      
      // Process social skills data (strength)
      this.strengthData.has.count = data.socialSkills.hasStrength;
      this.strengthData.none.count = data.socialSkills.noStrength;
      
      this.strengthData.has.percentage = data.socialSkillsPercent?.hasStrength || 0;
      this.strengthData.none.percentage = data.socialSkillsPercent?.noStrength || 0;
    },

    // คำนวณร้อยละ
    calculatePercentage(value, total) {
      if (total === 0) return 0;
      return ((value / total) * 100).toFixed(1);
    },
    
    // สร้างกราฟ
    initCharts() {
      // ตัดฟังก์ชันการสร้างกราฟออกตามที่ต้องการ
    }
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@300;400;500;600;700&display=swap');
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css');

.block-main {
  
  margin: 2rem auto;
  max-width: 1100px;
}

.block-bg-main {
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  border-radius: 0.375rem;
  margin-top: 4.8rem;
}

h2, h4, h5, h6 {
  color: #333;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

.highlight-row:hover > *:not(.type-column) {
  background-color: rgba(108, 117, 125, 0.15) !important;
  cursor: pointer;
}

.type-column {
  background-color: white !important;
}

.fm-kanit {
  font-family: 'Kanit', sans-serif;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .block-bg-main {
    padding: 1rem;
  }
}
</style>