<template>
  <div>
    <div align="center">
      <div class="block-main">
        <div class="block-bg-main">
          <div class="row">
            <div class="col">
              <div class="row align-items-center g-3">
                <div class="col-auto">
                  <h2 class="mb-4 d-flex align-items-center text-secondary">
                    <Icon name="carbon:table" class="icon-status me-2" style="font-size: 2rem; margin-top: -2px;" />
                    ตารางสรุปผลการประเมิน SDQ ระดับโรงเรียน
                  </h2>
                </div>
              </div>


              <!-- ตารางสรุปผล -->
              <div class="bg-light rounded p-4 mb-4">
                <div class="table-responsive">
                  <table class="table table-bordered mb-0 sdq-summary-table">
                    <thead class="table-secondary">
                      <tr class="text-center">
                        <th colspan="2" class="fw-bold align-middle">สรุปผลการคัดกรองนักเรียน</th>
                        <th v-for="level in classLevels" :key="level" class="fw-bold level-column">
                          {{ level }}
                        </th>
                        <th class="fw-bold total-column">รวม</th>
                        <th class="fw-bold percent-column">ร้อยละ</th>
                      </tr>
                    </thead>
                    <tbody class="fm-IBM">
                      <!-- เพศ -->
                      <tr class="highlight-row table-light">
                        <td rowspan="2" class="align-middle fw-semibold text-center type-column">เพศ</td>
                        <td class="ps-3">ชาย</td>
                        <td v-for="(level, index) in classLevels" :key="index" class="text-center">
                          {{ (sdqData.genderCount && sdqData.genderCount.male && sdqData.genderCount.male[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.genderCount?.totalMale || 0 }}</td>
                        <td class="text-center">{{ formatPercent(sdqData.genderCount?.malePercent) }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="ps-3">หญิง</td>
                        <td v-for="(level, index) in classLevels" :key="index" class="text-center">
                          {{ (sdqData.genderCount && sdqData.genderCount.female && sdqData.genderCount.female[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.genderCount?.totalFemale || 0 }}</td>
                        <td class="text-center">{{ formatPercent(sdqData.genderCount?.femalePercent) }}</td>
                      </tr>

                      <!-- สุขภาพจิต / พฤติกรรม -->
                      <tr class="highlight-row table-light">
                        <td rowspan="3" class="align-middle fw-semibold text-center type-column">สุขภาพจิต / พฤติกรรม</td>
                        <td class="ps-3">ปกติ</td>
                        <td v-for="(level, index) in classLevels" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.mentalHealth && sdqData.summary.mentalHealth.normal && sdqData.summary.mentalHealth.normal[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.mentalHealth?.normalAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(sdqData.summary?.mentalHealth?.normalPercent) }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="ps-3">เสี่ยง</td>
                        <td v-for="(level, index) in classLevels" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.mentalHealth && sdqData.summary.mentalHealth.risk && sdqData.summary.mentalHealth.risk[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.mentalHealth?.riskAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(sdqData.summary?.mentalHealth?.riskPercent) }}</td>
                      </tr>
                      <tr class="highlight-row table-light">
                        <td class="ps-3">มีปัญหา</td>
                        <td v-for="(level, index) in classLevels" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.mentalHealth && sdqData.summary.mentalHealth.problem && sdqData.summary.mentalHealth.problem[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.mentalHealth?.problemAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(sdqData.summary?.mentalHealth?.problemPercent) }}</td>
                      </tr>

                      <!-- ความประพฤติ -->
                      <tr class="highlight-row">
                        <td rowspan="3" class="align-middle fw-semibold text-center type-column">ความประพฤติ</td>
                        <td class="ps-3">ปกติ</td>
                        <td v-for="(level, index) in classLevels" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.behavior && sdqData.summary.behavior.normal && sdqData.summary.behavior.normal[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.behavior?.normalAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(sdqData.summary?.behavior?.normalPercent) }}</td>
                      </tr>
                      <tr class="highlight-row table-light">
                        <td class="ps-3">เสี่ยง</td>
                        <td v-for="(level, index) in classLevels" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.behavior && sdqData.summary.behavior.risk && sdqData.summary.behavior.risk[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.behavior?.riskAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(sdqData.summary?.behavior?.riskPercent) }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="ps-3">มีปัญหา</td>
                        <td v-for="(level, index) in classLevels" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.behavior && sdqData.summary.behavior.problem && sdqData.summary.behavior.problem[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.behavior?.problemAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(sdqData.summary?.behavior?.problemPercent) }}</td>
                      </tr>

                      <!-- พฤติกรรมไม่อยู่นิ่ง -->
                      <tr class="highlight-row table-light">
                        <td rowspan="3" class="align-middle fw-semibold text-center type-column">พฤติกรรมไม่อยู่นิ่ง</td>
                        <td class="ps-3">ปกติ</td>
                        <td v-for="(level, index) in classLevels" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.adhd && sdqData.summary.adhd.normal && sdqData.summary.adhd.normal[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.adhd?.normalAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(sdqData.summary?.adhd?.normalPercent) }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="ps-3">เสี่ยง</td>
                        <td v-for="(level, index) in classLevels" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.adhd && sdqData.summary.adhd.risk && sdqData.summary.adhd.risk[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.adhd?.riskAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(sdqData.summary?.adhd?.riskPercent) }}</td>
                      </tr>
                      <tr class="highlight-row table-light">
                        <td class="ps-3">มีปัญหา</td>
                        <td v-for="(level, index) in classLevels" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.adhd && sdqData.summary.adhd.problem && sdqData.summary.adhd.problem[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.adhd?.problemAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(sdqData.summary?.adhd?.problemPercent) }}</td>
                      </tr>

                      <!-- ความสัมพันธ์กับเพื่อน -->
                      <tr class="highlight-row">
                        <td rowspan="3" class="align-middle fw-semibold text-center type-column">ความสัมพันธ์กับเพื่อน</td>
                        <td class="ps-3">ปกติ</td>
                        <td v-for="(level, index) in classLevels" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.relationship && sdqData.summary.relationship.normal && sdqData.summary.relationship.normal[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.relationship?.normalAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(sdqData.summary?.relationship?.normalPercent) }}</td>
                      </tr>
                      <tr class="highlight-row table-light">
                        <td class="ps-3">เสี่ยง</td>
                        <td v-for="(level, index) in classLevels" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.relationship && sdqData.summary.relationship.risk && sdqData.summary.relationship.risk[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.relationship?.riskAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(sdqData.summary?.relationship?.riskPercent) }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="ps-3">มีปัญหา</td>
                        <td v-for="(level, index) in classLevels" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.relationship && sdqData.summary.relationship.problem && sdqData.summary.relationship.problem[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.relationship?.problemAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(sdqData.summary?.relationship?.problemPercent) }}</td>
                      </tr>

                      <!-- สัมพันธภาพ -->
                      <tr class="highlight-row table-light">
                        <td rowspan="2" class="align-middle fw-semibold text-center type-column">สัมพันธภาพ</td>
                        <td class="ps-3">มีจุดแข็ง</td>
                        <td v-for="(level, index) in classLevels" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.socialSkills && sdqData.summary.socialSkills.hasStrength && sdqData.summary.socialSkills.hasStrength[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.socialSkills?.hasStrengthAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(sdqData.summary?.socialSkills?.hasStrengthPercent) }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="ps-3">ไม่มีจุดแข็ง</td>
                        <td v-for="(level, index) in classLevels" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.socialSkills && sdqData.summary.socialSkills.noStrength && sdqData.summary.socialSkills.noStrength[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.socialSkills?.noStrengthAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(sdqData.summary?.socialSkills?.noStrengthPercent) }}</td>
                      </tr>
                      
                      <!-- จำนวนคนประเมิน (เพิ่มแถวใหม่) -->
                      <tr class="highlight-row fw-semibold table-light">
                        <td colspan="2" class="text-center ps-3">จำนวนคนประเมิน</td>
                        <td v-for="(level, index) in classLevels" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.evaluatedStudents && sdqData.summary.evaluatedStudents[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.evaluatedStudentsAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(sdqData.summary?.evaluatedPercent) }}</td>
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
  data() {
    return {
      currentYear: null,
      sdqData: {},
      classLevels: ['ม.1', 'ม.2', 'ม.3', 'ม.4', 'ม.5', 'ม.6', 'ปวช.']
    };
  },

  async mounted() {
    await this.getYear();
    await this.loadSdqData();
  },

  methods: {
    // จัดรูปแบบเปอร์เซ็นต์ให้แสดงทศนิยม 1 ตำแหน่ง
    formatPercent(value) {
      if (value === undefined || value === null) return '0.0';
      return Number(value).toFixed(1);
    },
    
    async getYear() {
      try {
        const year_res = await callApi.getYear();
        if (!year_res.result || !year_res.result.length || !year_res.result[0].year) {
          console.error("ไม่สามารถดึงข้อมูลปีการศึกษาได้");
          return;
        }
        
        this.currentYear = year_res.result[0].year;
      } catch (err) {
        console.error("Error fetching year:", err);
      }
    },
    
    async loadSdqData() {
      if (!this.currentYear) {
        console.error("ไม่มีข้อมูลปีการศึกษา");
        return;
      }
      
      try {
        const req = {
          year: this.currentYear
        };
        
        const res = await callApi.GetSdqSchool(req);
        
        if (res.code === 0 && res.result) {
          this.sdqData = res.result;
        } else {
          console.error("ไม่สามารถดึงข้อมูล SDQ ได้:", res.message);
          this.sdqData = {};
        }
      } catch (err) {
        console.error("Error fetching SDQ data:", err);
        this.sdqData = {};
      }
    },

    getFullClassName() {
      return 'ข้อมูลสรุปผลการประเมิน SDQ ทุกระดับชั้น';
    },
    
    // ฟังก์ชันสำหรับเติมข้อมูลทดสอบ (ใช้ในกรณีที่ API ยังไม่พร้อมใช้งาน)
    handleTestData() {
      const testData = {
        "year": 2567,
        "classCount": 7,
        "classes": [
            "ม.1",
            "ม.2",
            "ม.3",
            "ม.4",
            "ม.5",
            "ม.6",
            "ปวช."
        ],
        "genderCount": {
            "male": [
                104,
                85,
                80,
                73,
                65,
                81,
                81
            ],
            "female": [
                115,
                98,
                77,
                117,
                114,
                117,
                0
            ],
            "totalMale": 569,
            "totalFemale": 638,
            "total": 1207,
            "malePercent": 47.1,
            "femalePercent": 52.9
        },
        "summary": {
            "mentalHealth": {
                "normal": [
                    3,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "risk": [
                    3,
                    0,
                    0,
                    0,
                    1,
                    2,
                    0
                ],
                "problem": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "normalAll": 3,
                "riskAll": 6,
                "problemAll": 0,
                "normalPercent": 33.3,
                "riskPercent": 66.7,
                "problemPercent": 0
            },
            "behavior": {
                "normal": [
                    4,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "risk": [
                    2,
                    0,
                    0,
                    0,
                    1,
                    2,
                    0
                ],
                "problem": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "normalAll": 4,
                "riskAll": 5,
                "problemAll": 0,
                "normalPercent": 44.4,
                "riskPercent": 55.6,
                "problemPercent": 0
            },
            "adhd": {
                "normal": [
                    5,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0
                ],
                "risk": [
                    1,
                    0,
                    0,
                    0,
                    0,
                    2,
                    0
                ],
                "problem": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "normalAll": 6,
                "riskAll": 3,
                "problemAll": 0,
                "normalPercent": 66.7,
                "riskPercent": 33.3,
                "problemPercent": 0
            },
            "relationship": {
                "normal": [
                    6,
                    0,
                    0,
                    0,
                    1,
                    1,
                    0
                ],
                "risk": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0
                ],
                "problem": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "normalAll": 8,
                "riskAll": 1,
                "problemAll": 0,
                "normalPercent": 88.9,
                "riskPercent": 11.1,
                "problemPercent": 0
            },
            "socialSkills": {
                "hasStrength": [
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "noStrength": [
                    5,
                    0,
                    0,
                    0,
                    1,
                    2,
                    0
                ],
                "hasStrengthAll": 1,
                "noStrengthAll": 8,
                "hasStrengthPercent": 11.1,
                "noStrengthPercent": 88.9
            },
            "evaluatedStudents": [
                6,
                0,
                0,
                0,
                1,
                2,
                0
            ],
            "evaluatedStudentsAll": 9,
            "evaluatedPercent": 0.7
        }
      };
      
      this.sdqData = testData;
      this.classLevels = testData.classes;
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
  width: 100%;
}

.block-bg-main {
  background: #f2f2f3 !important;
  border: 1px solid #e0e0e0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  border-radius: 0.25rem;
  margin-top: 4.8rem;
}

h2, h4, h5, h6 {
  color: #333;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.icon-status {
  color: #6c757d;
}

.bg-light {
  background-color: #f8f9fa !important;
}

.border {
  border: 1px solid #e5e5e5 !important;
}

.text-secondary-soft {
  color: #999;
}

/* ให้ตารางมีขนาดคงที่ */
.sdq-summary-table {
  width: 100%;
  table-layout: fixed;
  background-color: white;
}

/* กำหนดความกว้างคอลัมน์ */
.level-column {
  width: 8%;
}

.total-column, .percent-column {
  width: 8%;
}

.table td, .table th {
  vertical-align: middle;
  padding: 0.5rem;
}

.highlight-row:hover > *:not(.type-column) {
  background-color: rgba(108, 117, 125, 0.15) !important;
  cursor: pointer;
}

.type-column {
  background-color: white !important;
  width: 10%;
}

.fm-IBM {
  font-family: 'IBM Plex Sans Thai Looped', sans-serif;
}

/* ปรับสำหรับอุปกรณ์มือถือ */
@media (max-width: 767px) {
  .block-bg-main {
    padding: 1rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  .table-responsive {
    overflow-x: auto;
  }
  
  .sdq-summary-table {
    min-width: 800px; /* ให้ความกว้างขั้นต่ำเพื่อให้แสดงผลได้ดีบนมือถือ */
  }
}

@media print {
  .block-main {
    background: white !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
    max-width: 100%;
  }
  
  .block-bg-main {
    background: white !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
}
</style>