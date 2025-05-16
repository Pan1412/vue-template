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
                    <Icon name="carbon:data-view-alt" class="icon-status me-2" style="font-size: 2rem; margin-top: -2px;" />
                    ตารางสรุปผลการประเมิน EQ ระดับโรงเรียน
                  </h2>
                </div>
              </div>

              <!-- ตารางข้อมูล -->
              <div class="bg-light rounded p-4 mb-4">
                <div class="table-responsive">
                  <table class="table table-bordered mb-0 eq-summary-table">
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
                    <tbody>
                      <!-- เพศ -->
                      <tr class="highlight-row table-light">
                        <td rowspan="2" class="align-middle fw-semibold text-center type-column">เพศ</td>
                        <td class="ps-3">ชาย</td>
                        <td v-for="(level, index) in classLevels" :key="level" class="text-center">
                          {{ (eqData.genderCount && eqData.genderCount.male && eqData.genderCount.male[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.genderCount?.totalMale || 0 }}</td>
                        <td class="text-center">{{ formatPercent(eqData.genderCount?.malePercent) }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="ps-3">หญิง</td>
                        <td v-for="(level, index) in classLevels" :key="level" class="text-center">
                          {{ (eqData.genderCount && eqData.genderCount.female && eqData.genderCount.female[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.genderCount?.totalFemale || 0 }}</td>
                        <td class="text-center">{{ formatPercent(eqData.genderCount?.femalePercent) }}</td>
                      </tr>

                      <!-- ด้านดี -->
                      <tr class="highlight-row table-light">
                        <td rowspan="3" class="align-middle fw-semibold text-center type-column">1.ด้านดี</td>
                        <td class="ps-3">สูงกว่าปกติ</td>
                        <td v-for="(level, index) in classLevels" :key="level" class="text-center">
                          {{ (eqData.summary && eqData.summary.good && eqData.summary.good.higher && eqData.summary.good.higher[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.summary?.good?.higherAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(eqData.summary?.good?.higherPercent) }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="ps-3">เกณฑ์ปกติ</td>
                        <td v-for="(level, index) in classLevels" :key="level" class="text-center">
                          {{ (eqData.summary && eqData.summary.good && eqData.summary.good.normal && eqData.summary.good.normal[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.summary?.good?.normalAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(eqData.summary?.good?.normalPercent) }}</td>
                      </tr>
                      <tr class="highlight-row table-light">
                        <td class="ps-3">ต่ำกว่าปกติ</td>
                        <td v-for="(level, index) in classLevels" :key="level" class="text-center">
                          {{ (eqData.summary && eqData.summary.good && eqData.summary.good.lower && eqData.summary.good.lower[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.summary?.good?.lowerAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(eqData.summary?.good?.lowerPercent) }}</td>
                      </tr>

                      <!-- ด้านเก่ง -->
                      <tr class="highlight-row">
                        <td rowspan="3" class="align-middle fw-semibold text-center type-column">2.ด้านเก่ง</td>
                        <td class="ps-3">สูงกว่าปกติ</td>
                        <td v-for="(level, index) in classLevels" :key="level" class="text-center">
                          {{ (eqData.summary && eqData.summary.smart && eqData.summary.smart.higher && eqData.summary.smart.higher[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.summary?.smart?.higherAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(eqData.summary?.smart?.higherPercent) }}</td>
                      </tr>
                      <tr class="highlight-row table-light">
                        <td class="ps-3">เกณฑ์ปกติ</td>
                        <td v-for="(level, index) in classLevels" :key="level" class="text-center">
                          {{ (eqData.summary && eqData.summary.smart && eqData.summary.smart.normal && eqData.summary.smart.normal[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.summary?.smart?.normalAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(eqData.summary?.smart?.normalPercent) }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="ps-3">ต่ำกว่าปกติ</td>
                        <td v-for="(level, index) in classLevels" :key="level" class="text-center">
                          {{ (eqData.summary && eqData.summary.smart && eqData.summary.smart.lower && eqData.summary.smart.lower[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.summary?.smart?.lowerAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(eqData.summary?.smart?.lowerPercent) }}</td>
                      </tr>

                      <!-- ด้านสุข -->
                      <tr class="highlight-row table-light">
                        <td rowspan="3" class="align-middle fw-semibold text-center type-column">3.ด้านสุข</td>
                        <td class="ps-3">สูงกว่าปกติ</td>
                        <td v-for="(level, index) in classLevels" :key="level" class="text-center">
                          {{ (eqData.summary && eqData.summary.happy && eqData.summary.happy.higher && eqData.summary.happy.higher[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.summary?.happy?.higherAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(eqData.summary?.happy?.higherPercent) }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="ps-3">เกณฑ์ปกติ</td>
                        <td v-for="(level, index) in classLevels" :key="level" class="text-center">
                          {{ (eqData.summary && eqData.summary.happy && eqData.summary.happy.normal && eqData.summary.happy.normal[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.summary?.happy?.normalAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(eqData.summary?.happy?.normalPercent) }}</td>
                      </tr>
                      <tr class="highlight-row table-light">
                        <td class="ps-3">ต่ำกว่าปกติ</td>
                        <td v-for="(level, index) in classLevels" :key="level" class="text-center">
                          {{ (eqData.summary && eqData.summary.happy && eqData.summary.happy.lower && eqData.summary.happy.lower[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.summary?.happy?.lowerAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(eqData.summary?.happy?.lowerPercent) }}</td>
                      </tr>
                      
                      <!-- จำนวนคนประเมิน (เพิ่มแถวใหม่ล่างสุด) -->
                      <tr class="highlight-row fw-semibold">
                        <td colspan="2" class="ps-3 text-center">จำนวนคนประเมิน</td>
                        <td v-for="(level, index) in classLevels" :key="level" class="text-center">
                          {{ (eqData.summary && eqData.summary.evaluatedStudents && eqData.summary.evaluatedStudents[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.summary?.evaluatedStudentsAll || 0 }}</td>
                        <td class="text-center">{{ formatPercent(eqData.summary?.evaluatedPercent) }}</td>
                      </tr>
                    </tbody>
                  </table>
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
  name: 'StudentEQReport',
  data() {
    return {
      currentYear: null,
      eqData: {},
      classLevels: ['ม.1', 'ม.2', 'ม.3', 'ม.4', 'ม.5', 'ม.6', 'ปวช.']
    };
  },

  async mounted() {
    await this.getYear();
    await this.loadData();
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
    
    async loadData() {
      if (!this.currentYear) {
        console.error("ไม่มีข้อมูลปีการศึกษา");
        return;
      }
      
      try {
        const req = {
          year: this.currentYear
        };
        
        const res = await callApi.GetEqSchool(req);
        if (res.code === 0 && res.result) {
          this.eqData = res.result;
        } else {
          console.error("ไม่สามารถดึงข้อมูล EQ ได้:", res.message);
          this.eqData = {};
        }
      } catch (err) {
        console.error("Error fetching EQ data:", err);
        this.eqData = {};
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
  width: 100%;
}

.block-bg-main {
  background: #f2f2f3 !important;
  border: 1px solid #e0e0e0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  border-radius: 0.25rem;
  margin-top: 1rem;
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
.eq-summary-table {
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
  
  .eq-summary-table {
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