<template>
  <div>
    <div align="center">
      <div class="block-main">
        <div class="block-bg-main">
          <!-- เนื้อหาภายในกรอบ -->
          <div class="row">
            <div class="col">
              <h2 class="mb-3 d-flex align-items-center text-secondary">
                <Icon name="carbon:data-view-alt" class="icon-status me-2" style="font-size: 2rem; margin-top: -2px;" />
                สรุปผลการคัดกรองนักเรียน EQ ระดับห้องเรียน
              </h2>


              <div class="row">
                <div class="col">
                  <!-- เพิ่มปุ่มเลือกชั้นเรียน -->
                  <div class="row align-items-center g-3 mb-2 ms-3">
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
                      <button class="btn btn-outline-success fm-kanit" @click="EqResult_room">
                        <i class="bi bi-search me-1"></i>
                        ค้นหา
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col text-end " style="padding-top: 0.3rem;"><div class="fs-5">จำนวนนักเรียน {{ totalStudents }} คน</div></div>
              </div>


              <!-- ตารางข้อมูล -->
              <div class="bg-white rounded p-4 mb-4 mt-3 shadow-sm">
                <div class="table-responsive">
                  <table class="table table-bordered mb-0">
                    <thead class="table-secondary">
                      <tr class="text-center">
                        <th style="width: 30%" class="fw-bold">ประเภท</th>
                        <th style="width: 25%" class="fw-bold">ผลการคัดกรอง</th>
                        <th style="width: 20%" class="text-center fw-bold">จำนวน (คน)</th>
                        <th style="width: 25%" class="text-center fw-bold">ร้อยละ</th>
                      </tr>
                    </thead>
                    <tbody>
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

                      <!-- ด้านดี -->
                      <tr class="highlight-row">
                        <td rowspan="3" class="align-middle fw-semibold text-center type-column">ด้านดี</td>
                        <td>สูงกว่าปกติ</td>
                        <td class="text-center">{{ goodData.higher.count }}</td>
                        <td class="text-center">{{ goodData.higher.percentage }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="table-light">เกณฑ์ปกติ</td>
                        <td class="text-center table-light">{{ goodData.normal.count }}</td>
                        <td class="text-center table-light">{{ goodData.normal.percentage }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td>ต่ำกว่าปกติ</td>
                        <td class="text-center">{{ goodData.lower.count }}</td>
                        <td class="text-center">{{ goodData.lower.percentage }}</td>
                      </tr>

                      <!-- ด้านเก่ง -->
                      <tr class="highlight-row">
                        <td rowspan="3" class="align-middle fw-semibold text-center type-column">ด้านเก่ง</td>
                        <td class="table-light">สูงกว่าปกติ</td>
                        <td class="text-center table-light">{{ smartData.higher.count }}</td>
                        <td class="text-center table-light">{{ smartData.higher.percentage }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td>เกณฑ์ปกติ</td>
                        <td class="text-center">{{ smartData.normal.count }}</td>
                        <td class="text-center">{{ smartData.normal.percentage }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="table-light">ต่ำกว่าปกติ</td>
                        <td class="text-center table-light">{{ smartData.lower.count }}</td>
                        <td class="text-center table-light">{{ smartData.lower.percentage }}</td>
                      </tr>

                      <!-- ด้านสุข -->
                      <tr class="highlight-row">
                        <td rowspan="3" class="align-middle fw-semibold text-center type-column">ด้านสุข</td>
                        <td>สูงกว่าปกติ</td>
                        <td class="text-center">{{ happyData.higher.count }}</td>
                        <td class="text-center">{{ happyData.higher.percentage }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td class="table-light">เกณฑ์ปกติ</td>
                        <td class="text-center table-light">{{ happyData.normal.count }}</td>
                        <td class="text-center table-light">{{ happyData.normal.percentage }}</td>
                      </tr>
                      <tr class="highlight-row">
                        <td>ต่ำกว่าปกติ</td>
                        <td class="text-center">{{ happyData.lower.count }}</td>
                        <td class="text-center">{{ happyData.lower.percentage }}</td>
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
  name: 'EqScreeningReportTable',
  head() {
    return {
      script: []
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
      
      // เพิ่มตัวแปรสำหรับการเลือกชั้นเรียน
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
      
      // ข้อมูลด้านดี
      goodData: {
        higher: {
          count: 0,
          percentage: 0
        },
        normal: {
          count: 0,
          percentage: 0
        },
        lower: {
          count: 0,
          percentage: 0
        }
      },
      
      // ข้อมูลด้านเก่ง
      smartData: {
        higher: {
          count: 0,
          percentage: 0
        },
        normal: {
          count: 0,
          percentage: 0
        },
        lower: {
          count: 0,
          percentage: 0
        }
      },
      
      // ข้อมูลด้านสุข
      happyData: {
        higher: {
          count: 0,
          percentage: 0
        },
        normal: {
          count: 0,
          percentage: 0
        },
        lower: {
          count: 0,
          percentage: 0
        }
      },
      
      charts: {}
    };
  },
  async mounted() {
    await this.EqResult_room();
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
    
    async EqResult_room() {
      try {
        const year_res = await callApi.getYear();
        if (!year_res.result || !year_res.result.length || !year_res.result[0].year) {
          alert("เกิดข้อผิดพลาด");
          return;
        }
        
        const year = year_res.result[0].year;
        
        // ใช้ค่า selectedClass และ selectedRoom แทนค่าจาก API
        const classValue = this.selectedClass;
        const room = this.selectedRoom;

        const req_eq = {
          class: classValue,
          room: room,
          year: year,
        };
        const res = await callApi.EqResultRoom(req_eq);
        
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
          
          // ถ้า API ไม่ส่งข้อมูลกลับมา แสดงข้อมูลว่าง
          this.useExampleData();
          alert("ไม่พบข้อมูล EQ ของห้องเรียนนี้");
          this.$nextTick(() => {
            if (typeof Chart !== 'undefined') {
              this.initCharts();
            } else {
              setTimeout(() => {
                this.initCharts();
              }, 1000);
            }
          });
        }
      } catch (err) {
        console.error("Error:", err);
        
        // ในกรณีเกิด error แสดงข้อมูลว่าง
        this.useExampleData();
        alert("เกิดข้อผิดพลาดในการดึงข้อมูล EQ");
        this.$nextTick(() => {
          if (typeof Chart !== 'undefined') {
            this.initCharts();
          } else {
            setTimeout(() => {
              this.initCharts();
            }, 1000);
          }
        });
      }
    },

    async getSexStudentRoom() {
      try {
        const year_res = await callApi.getYear();
        if (!year_res.result || !year_res.result.length || !year_res.result[0].year) {
          alert("เกิดข้อผิดพลาด");
          return;
        }
        
        const year = year_res.result[0].year;
        
        // ใช้ค่า selectedClass และ selectedRoom แทนค่าจาก API
        const classValue = this.selectedClass;
        const room = this.selectedRoom;
        
        const req = {
          class: classValue,
          room: room,
        };
        
        const res = await callApi.GetSexStudentRoom(req);
        console.log(res);
        
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
      
      // ตั้งค่าข้อมูลเพศเป็น 0 (จะถูกอัพเดทจากการเรียก getSexStudentRoom)
      this.genderData.male.count = 0;
      this.genderData.female.count = 0;
      this.genderData.male.percentage = 0;
      this.genderData.female.percentage = 0;
      
      // Process good data (ด้านดี)
      if (data.categories && data.categories.good) {
        this.goodData.higher.count = data.categories.good.higher || 0;
        this.goodData.normal.count = data.categories.good.normal || 0;
        this.goodData.lower.count = data.categories.good.lower || 0;
        
        // ใช้ค่าเปอร์เซ็นต์จาก API โดยตรง
        this.goodData.higher.percentage = data.categories.good.higherPercent || 0;
        this.goodData.normal.percentage = data.categories.good.normalPercent || 0;
        this.goodData.lower.percentage = data.categories.good.lowerPercent || 0;
      }
      
      // Process smart data (ด้านเก่ง)
      if (data.categories && data.categories.smart) {
        this.smartData.higher.count = data.categories.smart.higher || 0;
        this.smartData.normal.count = data.categories.smart.normal || 0;
        this.smartData.lower.count = data.categories.smart.lower || 0;
        
        // ใช้ค่าเปอร์เซ็นต์จาก API โดยตรง
        this.smartData.higher.percentage = data.categories.smart.higherPercent || 0;
        this.smartData.normal.percentage = data.categories.smart.normalPercent || 0;
        this.smartData.lower.percentage = data.categories.smart.lowerPercent || 0;
      }
      
      // Process happy data (ด้านสุข)
      if (data.categories && data.categories.happy) {
        this.happyData.higher.count = data.categories.happy.higher || 0;
        this.happyData.normal.count = data.categories.happy.normal || 0;
        this.happyData.lower.count = data.categories.happy.lower || 0;
        
        // ใช้ค่าเปอร์เซ็นต์จาก API โดยตรง
        this.happyData.higher.percentage = data.categories.happy.higherPercent || 0;
        this.happyData.normal.percentage = data.categories.happy.normalPercent || 0;
        this.happyData.lower.percentage = data.categories.happy.lowerPercent || 0;
      }
    },
    
    // เมื่อข้อมูลจาก API ไม่ถูกต้อง ให้แสดงข้อมูลว่าง (ไม่ใช้ข้อมูล mockup)
    useExampleData() {
      // แสดงว่าไม่มีข้อมูล
      this.totalStudents = 0;
      this.evaluatedStudents = 0;
      this.roomInfo.name = 'ไม่พบข้อมูล';
      
      // ด้านดี
      this.goodData.higher.count = 0;
      this.goodData.normal.count = 0;
      this.goodData.lower.count = 0;
      this.goodData.higher.percentage = 0;
      this.goodData.normal.percentage = 0;
      this.goodData.lower.percentage = 0;
      
      // ด้านเก่ง
      this.smartData.higher.count = 0;
      this.smartData.normal.count = 0;
      this.smartData.lower.count = 0;
      this.smartData.higher.percentage = 0;
      this.smartData.normal.percentage = 0;
      this.smartData.lower.percentage = 0;
      
      // ด้านสุข
      this.happyData.higher.count = 0;
      this.happyData.normal.count = 0;
      this.happyData.lower.count = 0;
      this.happyData.higher.percentage = 0;
      this.happyData.normal.percentage = 0;
      this.happyData.lower.percentage = 0;
    },
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@300;400;500;600;700&display=swap');
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css');

/* ปรับโครงสร้าง CSS ให้เหมือนกับไฟล์ที่สอง */
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

.bg-white {
  background-color: white !important;
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

@media print {
  .block-main {
    background: white !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
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

.fm-kanit {
  font-family: 'Kanit', sans-serif;
}
</style>