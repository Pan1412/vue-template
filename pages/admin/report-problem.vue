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
                      <i class="bi bi-exclamation-triangle-fill me-2" style="font-size: 2rem; margin-top: -2px;"></i>
                      รายงานปัญหานักเรียน
                    </h2>
                  </div>
                </div>
  
                <!-- ตัวเลือกชั้นเรียนและห้อง -->
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
                    <button class="btn btn-outline-success fm-kanit" @click="fetchData">
                      <i class="bi bi-search me-1"></i>
                      ค้นหา
                    </button>
                  </div>
                </div>

                <!-- เพิ่มส่วนแสดงรายงานนักเรียนที่มีปัญหา -->
                <div class="bg-white rounded p-4 mb-4 shadow-sm">
                  
                  <div v-if="studentProblems.length > 0">
                    <div v-for="(student, index) in studentProblems" :key="index" class="card mb-3 border">
                      <div class="card-header bg-light d-flex align-items-center">
                        <strong class="fs-5 fw-semibold">{{ student.s_id }} {{ student.prefix }} {{ student.name }} {{ student.surname }}</strong>
                      </div>
                      <div class="card-body">
                        <div class="row g-3 justify-content-center">
                          <template v-for="i in 5" :key="`problem-${i}`">
                            <div v-if="student[`type_problem_${i}`]" class="col-md-4 col-xl-2">
                              <div class="d-flex flex-column h-100 border rounded">
                                <div class="text-center p-2 border-bottom bg-light fw-medium small">
                                  {{ student[`type_problem_${i}`] }}
                                </div>
                                <div class="d-flex align-items-center justify-content-center flex-grow-1 p-3">
                                  <span class="badge rounded-pill" :class="getProblemBadgeClass(student[`problem_level_${i}`])">
                                    {{ getProblemLevelText(student[`problem_level_${i}`]) }}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </template>
                        </div>
                        
                        <div v-if="student.solve_problem && student.solve_problem.trim()" class="mt-3">
                          <div class="fw-semibold mb-1 text-start">แนวทางการแก้ไข:</div>
                          <div class="p-3 border rounded bg-light text-start">
                            <ul class="list-unstyled mb-0">
                              <li v-for="(line, lineIndex) in student.solve_problem.split('\n')" :key="lineIndex" class="mb-1">
                                <i class="bi bi-dot"></i> {{ line }}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="card-footer bg-white">
                        <div class="d-flex align-items-center">
                          <span class="badge" :class="getStatusBadgeClass(student.p_status)">
                            {{ getStatusDisplayText(student.p_status) }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div v-else class="alert alert-info py-3">
                    <div class="d-flex align-items-center">
                      <i class="bi bi-info-circle-fill me-2 fs-5"></i>
                      <div>ไม่พบข้อมูลนักเรียนที่มีความเสี่ยงหรือมีปัญหา</div>
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
  name: 'StudentProblemReport',
  head() {
    return {
      script: [
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
      roomInfo: {
        name: '',
        class: '',
        room: ''
      },
      
      // ตัวเลือกสำหรับชั้นเรียนและห้อง - กำหนดค่าเริ่มต้นเป็น ม.1 ห้อง 1
      selectedClass: '1',
      selectedRoom: '1',
      availableRooms: ['1', '2', '3', '4', '5', '6'],
      
      // ข้อมูลนักเรียนที่มีปัญหา
      studentProblems: [],
    };
  },
  async mounted() {
    // ดึงข้อมูลครั้งแรกด้วยค่าเริ่มต้น ม.1 ห้อง 1
    await this.fetchData();
  },
  methods: {
    // เปลี่ยนชั้นเรียน ปรับตัวเลือกห้องตามชั้น
    onClassChange() {
      if (this.selectedClass === 'vc') {
        this.availableRooms = ['1', '2', '3'];
      } else {
        this.availableRooms = ['1', '2', '3', '4', '5', '6'];
      }
      
      // กำหนดค่าห้องเริ่มต้นเป็นห้อง 1
      this.selectedRoom = '1';
    },
    
    // ฟังก์ชันดึงข้อมูลตามชั้นและห้องที่เลือก
    async fetchData() {
      // ตั้งค่าชื่อห้องเรียน
      if (this.selectedClass === 'vc') {
        this.roomInfo.name = `ปวช.${this.selectedRoom}`;
      } else {
        this.roomInfo.name = `ชั้น ม.${this.selectedClass}/${this.selectedRoom}`;
      }
      
      this.roomInfo.class = this.selectedClass;
      this.roomInfo.room = this.selectedRoom;
      
      // ดึงข้อมูลนักเรียนที่มีปัญหา
      await this.studentProblem();
      
      // ดึงข้อมูลจำนวนนักเรียนในห้อง
      await this.getSexStudentRoom();
    },
    
    // ดึงข้อมูลเพศของนักเรียนในห้อง
    async getSexStudentRoom() {
      try {
        const req = {
          class: this.selectedClass,
          room: parseInt(this.selectedRoom),
        };
        
        const res = await callApi.GetSexStudentRoom(req);
        
        if (res && res.code === 0 && res.result) {
          // อัพเดทจำนวนนักเรียนทั้งหมด
          this.totalStudents = res.result.total;
        } else {
          console.error("API returned invalid data:", res);
          this.totalStudents = 0;
        }
      } catch (err) {
        console.error("Error fetching gender data:", err);
        this.totalStudents = 0;
      }
    },

    // ดึงข้อมูลนักเรียนที่มีปัญหา
    async studentProblem() {
      try {
        const year_res = await callApi.getYear();
        if (!year_res.result || !year_res.result.length || !year_res.result[0].year) {
          alert("เกิดข้อผิดพลาด");
          return;
        }
        
        const year = year_res.result[0].year;
        
        // ส่งชั้นเรียนและห้องที่เลือก
        const req = {
          class: this.selectedClass,
          room: parseInt(this.selectedRoom),
          year: year,
        };
        
        // const res = await callApi.GetStudentProblem(req);
        
        // if (res && res.code === 0 && res.result) {
        //   this.studentProblems = res.result;
        // } else {
        //   console.error("API returned invalid data:", res);
        //   this.studentProblems = [];
        // }
      } catch (err) {
        console.error("Error:", err);
        this.studentProblems = [];
      }
    },
    
    // แสดงสถานะเป็นข้อความ
    getStatusDisplayText(status) {
      if (!status) {
        return 'ยังไม่ได้เลือกแนวทางแก้ไข';
      } else if (status === 'มีการปรับปรุงการประเมิน โปรดเลือกแนวทางการแก้ไขอีกครั้ง') {
        return 'ยังไม่ได้เลือกแนวทางแก้ไข';
      } else {
        return status;
      }
    },
    
    // กำหนดสีของแบดจ์ตามสถานะ
    getStatusBadgeClass(status) {
      if (!status || status === 'ยังไม่ได้เลือกแนวทางแก้ไข' || status === 'มีการปรับปรุงการประเมิน โปรดเลือกแนวทางการแก้ไขอีกครั้ง') {
        return 'bg-secondary text-white';
      } else if (status === 'เลือกแนวทางแก้ไขแล้ว') {
        return 'bg-success text-white';
      } else {
        return 'bg-secondary text-white';
      }
    },
    
    // ฟังก์ชันสำหรับกำหนดสีแบดจ์ตามระดับปัญหา
    getProblemBadgeClass(level) {
      switch (level) {
        case 'risk':
          return 'bg-warning text-dark';
        case 'problem':
          return 'bg-danger text-white';
        case 'normal':
          return 'bg-success text-white';
        case 'noStrength':
          return 'bg-secondary text-white';
        case 'hasStrength':
          return 'bg-primary text-white';
        default:
          return 'bg-info text-white';
      }
    },
    
    // ฟังก์ชันสำหรับแปลงระดับปัญหาเป็นข้อความภาษาไทย
    getProblemLevelText(level) {
      switch (level) {
        case 'risk':
          return 'เสี่ยง';
        case 'problem':
          return 'มีปัญหา';
        case 'normal':
          return 'ปกติ';
        case 'noStrength':
          return 'ไม่มีจุดแข็ง';
        case 'hasStrength':
          return 'มีจุดแข็ง';
        default:
          return level || '';
      }
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

.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1) !important;
}

.badge {
  padding: 0.5rem 0.75rem;
  font-weight: 500;
  font-size: 0.875rem;
}

/* สไตล์สำหรับรายการในแนวทางการแก้ไข */
ul.list-unstyled li {
  position: relative;
  padding-left: 1.2rem;
  margin-bottom: 0.5rem;
}

ul.list-unstyled li i.bi-dot {
  position: absolute;
  left: 0;
  top: 0.2rem;
  font-size: 1.2rem;
}

/* สไตล์สำหรับส่วนตัวเลือกชั้นเรียนและห้อง */
.form-select {
  min-width: 100px;
  background-color: #fff;
  border: 1px solid #ced4da;
}

.form-select:focus {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

// .btn-outline-success {
//   color: #198754;
//   border-color: #198754;
//   font-weight: 500;
// }

.btn-outline-success:hover {
  color: #fff;
  background-color: #198754;
  border-color: #198754;
}

.fm-kanit {
  font-family: 'IBM Plex Sans Thai Looped', sans-serif;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .block-bg-main {
    padding: 1rem;
    margin-top: 1rem;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .form-select {
    width: 100%;
  }
  
  .row.mb-4 > div {
    margin-bottom: 0.5rem;
  }
}
</style>