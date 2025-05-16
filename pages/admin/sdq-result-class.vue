<template>
  <div>
    <div align="center">
      <div class="">
        <div class="block-bg-main">
          <div class="row">
            <div class="col">
              <div class="row align-items-center g-3">
                <div class="col-auto">
                  <h2 class="mb-2 d-flex align-items-center text-secondary">
                    <Icon name="carbon:table" class="icon-status me-2" style="font-size: 2rem; margin-top: -2px;" />
                    ตารางสรุปผลการประเมิน SDQ ระดับชั้นเรียน
                  </h2>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <!-- ตัวเลือกเพิ่มเติม -->
                  <div class="row align-items-center g-3 mb-3 ms-3">
                    <div class="col-auto">
                      <label class="col-form-label" for="">เลือกระดับชั้น</label>
                      </div>
                    <div class="col-auto">
                      <select 
                      id="classSelector" 
                      class="form-select" 
                      v-model="selectedClass" 
                      @change="loadClassData"
                      >
                        <option value="1">ม.1</option>
                        <option value="2">ม.2</option>
                        <option value="3">ม.3</option>
                        <option value="4">ม.4</option>
                        <option value="5">ม.5</option>
                        <option value="6">ม.6</option>
                        <option value="vc">ปวช</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col text-end " style="padding-top: 0rem;"><div class="fs-5">{{ getFullClassName() }}</div></div>
              </div>

              <!-- ตารางสรุปผล -->
              <div class="bg-light rounded p-4 mb-4">
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <thead class="table-secondary">
                      <tr class="text-center">
                        <th colspan="2" class="align-middle fw-bold">สรุปผลการคัดกรองนักเรียน</th>
                        <th v-for="(room, index) in sdqData.rooms || []" :key="index" class="align-middle fw-bold">
                          ห้อง{{ room }}
                        </th>
                        <th class="align-middle fw-bold">รวม</th>
                        <th class="align-middle fw-bold">ร้อยละ</th>
                      </tr>
                    </thead>
                    <tbody class="fm-IBM">
                      <!-- เพศ -->
                      <tr class="highlight-row table-light">
                        <td rowspan="2" class="align-middle fw-semibold text-center type-column">เพศ</td>
                        <td class="ps-3">ชาย</td>
                        <td v-for="(room, index) in sdqData.rooms || []" :key="index" class="text-center">
                          {{ (sdqData.genderCount && sdqData.genderCount.male && sdqData.genderCount.male[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.genderCount?.totalMale || 0 }}</td>
                        <td class="text-center">{{ sdqData.genderCount?.malePercent || 0 }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="ps-3">หญิง</td>
                        <td v-for="(room, index) in sdqData.rooms || []" :key="index" class="text-center">
                          {{ (sdqData.genderCount && sdqData.genderCount.female && sdqData.genderCount.female[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.genderCount?.totalFemale || 0 }}</td>
                        <td class="text-center">{{ sdqData.genderCount?.femalePercent || 0 }}</td>
                      </tr>

                      <!-- สุขภาพจิต / พฤติกรรม -->
                      <tr class="highlight-row table-light">
                        <td rowspan="3" class="align-middle fw-semibold text-center type-column">สุขภาพจิต / พฤติกรรม</td>
                        <td class="ps-3">ปกติ</td>
                        <td v-for="(room, index) in sdqData.rooms || []" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.mentalHealth && sdqData.summary.mentalHealth.normal && sdqData.summary.mentalHealth.normal[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.mentalHealth?.normalAll || 0 }}</td>
                        <td class="text-center">{{ sdqData.summary?.mentalHealth?.normalPercent || 0 }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="ps-3">เสี่ยง</td>
                        <td v-for="(room, index) in sdqData.rooms || []" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.mentalHealth && sdqData.summary.mentalHealth.risk && sdqData.summary.mentalHealth.risk[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.mentalHealth?.riskAll || 0 }}</td>
                        <td class="text-center">{{ sdqData.summary?.mentalHealth?.riskPercent || 0 }}</td>
                      </tr>
                      <tr class="highlight-row table-light">
                        <td class="ps-3">มีปัญหา</td>
                        <td v-for="(room, index) in sdqData.rooms || []" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.mentalHealth && sdqData.summary.mentalHealth.problem && sdqData.summary.mentalHealth.problem[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.mentalHealth?.problemAll || 0 }}</td>
                        <td class="text-center">{{ sdqData.summary?.mentalHealth?.problemPercent || 0 }}</td>
                      </tr>

                      <!-- ความประพฤติ -->
                      <tr class="highlight-row">
                        <td rowspan="3" class="align-middle fw-semibold text-center type-column">ความประพฤติ</td>
                        <td class="ps-3">ปกติ</td>
                        <td v-for="(room, index) in sdqData.rooms || []" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.behavior && sdqData.summary.behavior.normal && sdqData.summary.behavior.normal[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.behavior?.normalAll || 0 }}</td>
                        <td class="text-center">{{ sdqData.summary?.behavior?.normalPercent || 0 }}</td>
                      </tr>
                      <tr class="highlight-row table-light">
                        <td class="ps-3">เสี่ยง</td>
                        <td v-for="(room, index) in sdqData.rooms || []" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.behavior && sdqData.summary.behavior.risk && sdqData.summary.behavior.risk[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.behavior?.riskAll || 0 }}</td>
                        <td class="text-center">{{ sdqData.summary?.behavior?.riskPercent || 0 }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="ps-3">มีปัญหา</td>
                        <td v-for="(room, index) in sdqData.rooms || []" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.behavior && sdqData.summary.behavior.problem && sdqData.summary.behavior.problem[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.behavior?.problemAll || 0 }}</td>
                        <td class="text-center">{{ sdqData.summary?.behavior?.problemPercent || 0 }}</td>
                      </tr>

                      <!-- พฤติกรรมไม่อยู่นิ่ง -->
                      <tr class="highlight-row table-light">
                        <td rowspan="3" class="align-middle fw-semibold text-center type-column">พฤติกรรมไม่อยู่นิ่ง</td>
                        <td class="ps-3">ปกติ</td>
                        <td v-for="(room, index) in sdqData.rooms || []" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.adhd && sdqData.summary.adhd.normal && sdqData.summary.adhd.normal[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.adhd?.normalAll || 0 }}</td>
                        <td class="text-center">{{ sdqData.summary?.adhd?.normalPercent || 0 }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="ps-3">เสี่ยง</td>
                        <td v-for="(room, index) in sdqData.rooms || []" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.adhd && sdqData.summary.adhd.risk && sdqData.summary.adhd.risk[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.adhd?.riskAll || 0 }}</td>
                        <td class="text-center">{{ sdqData.summary?.adhd?.riskPercent || 0 }}</td>
                      </tr>
                      <tr class="highlight-row table-light">
                        <td class="ps-3">มีปัญหา</td>
                        <td v-for="(room, index) in sdqData.rooms || []" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.adhd && sdqData.summary.adhd.problem && sdqData.summary.adhd.problem[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.adhd?.problemAll || 0 }}</td>
                        <td class="text-center">{{ sdqData.summary?.adhd?.problemPercent || 0 }}</td>
                      </tr>

                      <!-- ความสัมพันธ์กับเพื่อน -->
                      <tr class="highlight-row">
                        <td rowspan="3" class="align-middle fw-semibold text-center type-column">ความสัมพันธ์กับเพื่อน</td>
                        <td class="ps-3">ปกติ</td>
                        <td v-for="(room, index) in sdqData.rooms || []" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.relationship && sdqData.summary.relationship.normal && sdqData.summary.relationship.normal[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.relationship?.normalAll || 0 }}</td>
                        <td class="text-center">{{ sdqData.summary?.relationship?.normalPercent || 0 }}</td>
                      </tr>
                      <tr class="highlight-row table-light">
                        <td class="ps-3">เสี่ยง</td>
                        <td v-for="(room, index) in sdqData.rooms || []" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.relationship && sdqData.summary.relationship.risk && sdqData.summary.relationship.risk[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.relationship?.riskAll || 0 }}</td>
                        <td class="text-center">{{ sdqData.summary?.relationship?.riskPercent || 0 }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="ps-3">มีปัญหา</td>
                        <td v-for="(room, index) in sdqData.rooms || []" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.relationship && sdqData.summary.relationship.problem && sdqData.summary.relationship.problem[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.relationship?.problemAll || 0 }}</td>
                        <td class="text-center">{{ sdqData.summary?.relationship?.problemPercent || 0 }}</td>
                      </tr>

                      <!-- สัมพันธภาพ -->
                      <tr class="highlight-row table-light">
                        <td rowspan="2" class="align-middle fw-semibold text-center type-column">สัมพันธภาพ</td>
                        <td class="ps-3">มีจุดแข็ง</td>
                        <td v-for="(room, index) in sdqData.rooms || []" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.socialSkills && sdqData.summary.socialSkills.hasStrength && sdqData.summary.socialSkills.hasStrength[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.socialSkills?.hasStrengthAll || 0 }}</td>
                        <td class="text-center">{{ sdqData.summary?.socialSkills?.hasStrengthPercent || 0 }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="ps-3">ไม่มีจุดแข็ง</td>
                        <td v-for="(room, index) in sdqData.rooms || []" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.socialSkills && sdqData.summary.socialSkills.noStrength && sdqData.summary.socialSkills.noStrength[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.socialSkills?.noStrengthAll || 0 }}</td>
                        <td class="text-center">{{ sdqData.summary?.socialSkills?.noStrengthPercent || 0 }}</td>
                      </tr>
                      
                      <!-- จำนวนคนประเมิน (เพิ่มแถวใหม่) -->
                      <tr class="highlight-row fw-semibold table-light">
                        <td colspan="2" class="text-center ps-3">จำนวนคนประเมิน</td>
                        <td v-for="(room, index) in sdqData.rooms || []" :key="index" class="text-center">
                          {{ (sdqData.summary && sdqData.summary.evaluatedStudents && sdqData.summary.evaluatedStudents[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ sdqData.summary?.evaluatedStudentsAll || 0 }}</td>
                        <td class="text-center">{{ sdqData.summary?.evaluatedPercent || 0 }}</td>
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
      selectedClass: '1',
      showHeader: true,
      currentYear: null,
      sdqData: {},
      classDisplayName: ''
    };
  },

  async mounted() {
    await this.getYear();
    await this.loadClassData();
  },

  methods: {
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
    
    async loadClassData() {
      if (!this.currentYear) {
        console.error("ไม่มีข้อมูลปีการศึกษา");
        return;
      }
      
      try {
        const req = {
          class: this.selectedClass,
          year: this.currentYear
        };
        
        // ตั้งชื่อแสดงผล
        this.classDisplayName = this.selectedClass === 'vc' ? 'ปวช.' : `ม.${this.selectedClass}`;
        
        const res = await callApi.SdqResultClass(req);
        
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
      if (this.selectedClass === 'vc') {
        return 'ระดับชั้น ปวช.';
      } else {
        return `ระดับชั้น มัธยมศึกษาปีที่ ${this.selectedClass}`;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@300;400;500;600;700&display=swap');
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css');

.block-main {
  font-family: 'IBM Plex Sans Thai Looped', sans-serif;
  margin: 2rem auto;
  max-width: 1100px;
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

.table {
  background-color: white;
}

.table td {
  vertical-align: middle;
}

.btn-secondary {
  border-radius: 6px;
  font-weight: 500;
  padding: 8px 18px;
  font-size: 0.9rem;
}


.highlight-row:hover > *:not(.type-column) {
  background-color: rgba(108, 117, 125, 0.15) !important;
  cursor: pointer;
}
  
.type-column {
  background-color: white !important;
}

.fm-IBM {
  font-family: 'IBM Plex Sans Thai Looped', sans-serif;
}
</style>