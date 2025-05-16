<template>
  <div>
    <div align="center">
      <div class="block-main">
        <div class="block-bg-main">
          <div class="row">
            <div class="col">
              <div class="row align-items-center g-3">
                <div class="col-auto">
                  <h2 class="mb-2 d-flex align-items-center text-secondary">
                    <Icon name="carbon:data-view-alt" class="icon-status me-2" style="font-size: 2rem; margin-top: -2px;" />
                    ตารางสรุปผลการประเมิน EQ ระดับชั้นเรียน
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

              <!-- ตารางข้อมูล -->
              <div class="bg-light rounded p-4 mb-4">
                <div class="table-responsive">
                  <table class="table table-bordered mb-0">
                    <thead class="table-secondary">
                      <tr class="text-center">
                        <th colspan="2" class="fw-bold align-middle">สรุปผลการคัดกรองนักเรียน</th>
                        <th v-for="(room, index) in eqData.rooms || []" :key="index" style="width: 8%" class="fw-bold">
                          ห้อง{{ room }}
                        </th>
                        <th style="width: 8%" class="fw-bold">รวม</th>
                        <th style="width: 8%" class="fw-bold">ร้อยละ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <!-- เพศ -->
                      <tr class="highlight-row table-light">
                        <td rowspan="2" class="align-middle fw-semibold text-center type-column">เพศ</td>
                        <td class="ps-3">ชาย</td>
                        <td v-for="(room, index) in eqData.rooms || []" :key="index" class="text-center">
                          {{ (eqData.genderCount && eqData.genderCount.male && eqData.genderCount.male[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.genderCount?.totalMale || 0 }}</td>
                        <td class="text-center">{{ eqData.genderCount?.malePercent || 0 }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="ps-3">หญิง</td>
                        <td v-for="(room, index) in eqData.rooms || []" :key="index" class="text-center">
                          {{ (eqData.genderCount && eqData.genderCount.female && eqData.genderCount.female[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.genderCount?.totalFemale || 0 }}</td>
                        <td class="text-center">{{ eqData.genderCount?.femalePercent || 0 }}</td>
                      </tr>

                      <!-- ด้านดี -->
                      <tr class="highlight-row table-light">
                        <td rowspan="3" class="align-middle fw-semibold text-center type-column">1.ด้านดี</td>
                        <td class="ps-3">สูงกว่าปกติ</td>
                        <td v-for="(room, index) in eqData.rooms || []" :key="index" class="text-center">
                          {{ (eqData.summary && eqData.summary.good && eqData.summary.good.higher && eqData.summary.good.higher[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.summary?.good?.higherAll || 0 }}</td>
                        <td class="text-center">{{ eqData.summary?.good?.higherPercent || 0 }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="ps-3">เกณฑ์ปกติ</td>
                        <td v-for="(room, index) in eqData.rooms || []" :key="index" class="text-center">
                          {{ (eqData.summary && eqData.summary.good && eqData.summary.good.normal && eqData.summary.good.normal[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.summary?.good?.normalAll || 0 }}</td>
                        <td class="text-center">{{ eqData.summary?.good?.normalPercent || 0 }}</td>
                      </tr>
                      <tr class="highlight-row table-light">
                        <td class="ps-3">ต่ำกว่าปกติ</td>
                        <td v-for="(room, index) in eqData.rooms || []" :key="index" class="text-center">
                          {{ (eqData.summary && eqData.summary.good && eqData.summary.good.lower && eqData.summary.good.lower[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.summary?.good?.lowerAll || 0 }}</td>
                        <td class="text-center">{{ eqData.summary?.good?.lowerPercent || 0 }}</td>
                      </tr>

                      <!-- ด้านเก่ง -->
                      <tr class="highlight-row">
                        <td rowspan="3" class="align-middle fw-semibold text-center type-column">2.ด้านเก่ง</td>
                        <td class="ps-3">สูงกว่าปกติ</td>
                        <td v-for="(room, index) in eqData.rooms || []" :key="index" class="text-center">
                          {{ (eqData.summary && eqData.summary.smart && eqData.summary.smart.higher && eqData.summary.smart.higher[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.summary?.smart?.higherAll || 0 }}</td>
                        <td class="text-center">{{ eqData.summary?.smart?.higherPercent || 0 }}</td>
                      </tr>
                      <tr class="highlight-row table-light">
                        <td class="ps-3">เกณฑ์ปกติ</td>
                        <td v-for="(room, index) in eqData.rooms || []" :key="index" class="text-center">
                          {{ (eqData.summary && eqData.summary.smart && eqData.summary.smart.normal && eqData.summary.smart.normal[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.summary?.smart?.normalAll || 0 }}</td>
                        <td class="text-center">{{ eqData.summary?.smart?.normalPercent || 0 }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="ps-3">ต่ำกว่าปกติ</td>
                        <td v-for="(room, index) in eqData.rooms || []" :key="index" class="text-center">
                          {{ (eqData.summary && eqData.summary.smart && eqData.summary.smart.lower && eqData.summary.smart.lower[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.summary?.smart?.lowerAll || 0 }}</td>
                        <td class="text-center">{{ eqData.summary?.smart?.lowerPercent || 0 }}</td>
                      </tr>

                      <!-- ด้านสุข -->
                      <tr class="highlight-row table-light">
                        <td rowspan="3" class="align-middle fw-semibold text-center type-column">3.ด้านสุข</td>
                        <td class="ps-3">สูงกว่าปกติ</td>
                        <td v-for="(room, index) in eqData.rooms || []" :key="index" class="text-center">
                          {{ (eqData.summary && eqData.summary.happy && eqData.summary.happy.higher && eqData.summary.happy.higher[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.summary?.happy?.higherAll || 0 }}</td>
                        <td class="text-center">{{ eqData.summary?.happy?.higherPercent || 0 }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="ps-3">เกณฑ์ปกติ</td>
                        <td v-for="(room, index) in eqData.rooms || []" :key="index" class="text-center">
                          {{ (eqData.summary && eqData.summary.happy && eqData.summary.happy.normal && eqData.summary.happy.normal[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.summary?.happy?.normalAll || 0 }}</td>
                        <td class="text-center">{{ eqData.summary?.happy?.normalPercent || 0 }}</td>
                      </tr>
                      <tr class="highlight-row table-light">
                        <td class="ps-3">ต่ำกว่าปกติ</td>
                        <td v-for="(room, index) in eqData.rooms || []" :key="index" class="text-center">
                          {{ (eqData.summary && eqData.summary.happy && eqData.summary.happy.lower && eqData.summary.happy.lower[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.summary?.happy?.lowerAll || 0 }}</td>
                        <td class="text-center">{{ eqData.summary?.happy?.lowerPercent || 0 }}</td>
                      </tr>
                      
                      <!-- จำนวนคนประเมิน (เพิ่มแถวใหม่ล่างสุด) -->
                      <tr class="highlight-row fw-semibold">
                        <td colspan="2" class="ps-3 text-center">จำนวนคนประเมิน</td>
                        <td v-for="(room, index) in eqData.rooms || []" :key="index" class="text-center">
                          {{ (eqData.summary && eqData.summary.evaluatedStudents && eqData.summary.evaluatedStudents[index]) || 0 }}
                        </td>
                        <td class="text-center">{{ eqData.summary?.evaluatedStudentsAll || 0 }}</td>
                        <td class="text-center">{{ eqData.summary?.evaluatedPercent || 0 }}</td>
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
      selectedClass: '1',
      showHeader: true,
      currentYear: null,
      eqData: {}
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
        
        const res = await callApi.EqResultClass(req);
        
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

@media print {
  .block-main {
    background: white !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
}
</style>