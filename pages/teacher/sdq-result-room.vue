<template>
  <div>
    <div align="center">
      <div class="block-main">
        <div class="block-bg-main">
          <div class="row">
            <div class="col">
              <div class="row align-items-center g-3">
                <div class="col-auto">
                  <h2 class=" d-flex align-items-center text-secondary">
                    <i class="bi bi-clipboard-data me-2" style="font-size: 2rem; margin-top: -2px;"></i>
                    สรุปผลการคัดกรองนักเรียน SDQ ระดับห้องเรียน
                  </h2>
                </div>
              </div>

              <!-- ข้อมูลห้องเรียน -->
              <div class="text-center mb-3 mt-3 text-muted fs-5">
                <div>{{ roomInfo.name}}</div>
                <div>จำนวนนักเรียน {{ totalStudents }} คน</div>
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
              
              
              <!-- เพิ่มส่วนแสดงรายงานนักเรียนที่มีปัญหา -->
              <div class="bg-white rounded p-4 mb-4 shadow-sm">
                <div class="d-flex align-items-center mb-3">
                  <div class="me-2 ">
                    <i class="bi bi-exclamation-triangle-fill text-secondary" style="font-size: 1.5rem;"></i>
                  </div>
                  <h4 class="mb-0 text-secondary fw-semibold">
                    รายงานปัญหานักเรียน
                  </h4>
                </div>
                
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
                      <div class="d-flex justify-content-between align-items-center">
                        <div>
                          <span class="badge" :class="getStatusBadgeClass(student.p_status)">{{ student.p_status || 'ยังไม่ได้เลือกแนวทางแก้ไข' }}</span>
                        </div>
                        <div>
                          <button 
                            v-if="student.p_status === 'เลือกแนวทางแก้ไขแล้ว'" 
                            class="btn btn-sm btn-outline-primary" 
                            @click="openSolutionPopup(student.s_id)">
                            <i class="bi bi-pencil-square me-1"></i>
                            แก้ไข
                          </button>
                          <button 
                            v-else
                            class="btn btn-sm btn-outline-primary" 
                            @click="openSolutionPopup(student.s_id)">
                            <i class="bi bi-pencil-square me-1"></i>
                            เลือกทำแนวทางแก้ไข
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div v-else class="alert alert-warning py-3">
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
    
    <!-- Modal สำหรับเลือกแนวทางแก้ไข -->
    <div class="modal fade" id="solutionModal" tabindex="-1" aria-labelledby="solutionModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="solutionModalLabel">เลือกแนวทางการแก้ไข</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-check mb-2" v-for="(option, index) in solutionOptions" :key="index">
              <input 
                class="form-check-input" 
                type="checkbox" 
                :value="option.value" 
                :id="'solution-' + index"
                v-model="selectedSolutions"
              >
              <label class="form-check-label" :for="'solution-' + index">
                {{ option.label }}
              </label>
              <div v-if="option.value === 'other' && selectedSolutions.includes('other')" class="mt-2">
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="otherSolutionText" 
                  placeholder="ระบุแนวทางการแก้ไขอื่นๆ"
                >
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
            <button type="button" class="btn btn-primary" @click="saveSolutions">บันทึก</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Toast แจ้งเตือนเมื่อบันทึกสำเร็จ -->
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div id="successToast" class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            <i class="bi bi-check-circle me-2"></i> บันทึกสำเร็จ
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
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
      },
      
      // ข้อมูลนักเรียนที่มีปัญหา
      studentProblems: [],
      
      // ข้อมูลแนวทางการแก้ไข
      currentStudentId: null,
      selectedSolutions: [],
      otherSolutionText: '',
      solutionOptions: [
        { value: 'counseling', label: 'ให้คำปรึกษา' },
        { value: 'warning', label: 'ว่ากล่าวตักเตือน/ทำทัณฑ์บน' },
        { value: 'classActivity', label: 'จัดกิจกรรมในชั้นเรียน' },
        { value: 'remedial', label: 'จัดกิจกรรมซ่อมเสริม' },
        { value: 'enrichment', label: 'จัดกิจกรรมเสริมหลักสูตร' },
        { value: 'coordination', label: 'ติดต่อประสานงาน' },
        { value: 'homeVisit', label: 'ออกเยี่ยมบ้านนักเรียน' },
        { value: 'internal', label: 'ส่งต่อภายใน' },
        { value: 'external', label: 'ส่งต่อภายนอก' },
        { value: 'other', label: 'อื่นๆ: ' },
      ]
    };
  },
  async mounted() {
    
    await this.SdqResult_room();
    
  },
  methods: {
    async SdqResult_room() {
    try {
      const year_res = await callApi.getYear();
      if (!year_res.result || !year_res.result.length || !year_res.result[0].year) {
        alert("เกิดข้อผิดพลาด");
        return;
      }
      
      const year = year_res.result[0].year;
      const t_id = this.getStore().setAuth().id;
      
      const req = {
        t_id: t_id,
        year: year,
      };
      
      const res = await callApi.SdqResultRoom(req);
      
      if (res && res.code === 0 && res.result) {
        this.processApiData(res.result);
        
        // เรียกดึงข้อมูลเพศของนักเรียนในห้อง
        await this.getSexStudentRoom();
        
        // เรียกดึงข้อมูลนักเรียนที่มีปัญหาหลังจากได้ข้อมูลห้องเรียน
        await this.studentProblem();
        
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
      }
    } catch (err) {
      console.error("Error:", err);
    }
  },

    async getSexStudentRoom() {
    try {
      // ใช้ข้อมูลห้องเรียนที่ได้จาก SdqResult_room
      const req = {
        class: this.roomInfo.class,
        room: parseInt(this.roomInfo.room),
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

    async studentProblem() {
      try {
        const year_res = await callApi.getYear();
        if (!year_res.result || !year_res.result.length || !year_res.result[0].year) {
          alert("เกิดข้อผิดพลาด");
          return;
        }
        
        const year = year_res.result[0].year;
        
        // ใช้ข้อมูลห้องเรียนที่ได้จาก SdqResult_room
        const req = {
          class: this.roomInfo.class,
          room: parseInt(this.roomInfo.room),
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

    async updatedProblems(studentId, solveProblem) {
      try {
        const year_res = await callApi.getYear();
        if (!year_res.result || !year_res.result.length || !year_res.result[0].year) {
          alert("เกิดข้อผิดพลาด");
          return false;
        }
        const year = year_res.result[0].year;

        const req = {
          s_id: studentId,
          year: year,
          solve_problem: solveProblem,
          p_status: "เลือกแนวทางแก้ไขแล้ว",
        };
        
        const response = await callApi.UpdateStudentProblem(req);
        
        if (response && response.code === 0) {
          window.alert("บันทึกสำเร็จ");
          window.location.reload();

          
          
          
          // อัพเดทข้อมูลในหน้าเว็บ
          // const studentIndex = this.studentProblems.findIndex(s => s.s_id === studentId);
          // if (studentIndex !== -1) {
          //   // ทำสำเนาอาร์เรย์เพื่อให้ Vue รับรู้การเปลี่ยนแปลง
          //   const updatedProblems = [...this.studentProblems];
          //   updatedProblems[studentIndex] = {
          //     ...updatedProblems[studentIndex],
          //     solve_problem: solveProblem,
          //     p_status: 'เลือกแนวทางแก้ไขแล้ว'
          //   };
          //   this.studentProblems = updatedProblems;
          // }
          
          return true;
        } else {
          console.error("API error:", response);
          alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
          return false;
        }
      } catch (error) {
        console.error("Error updating problems:", error);
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        return false;
      }
    },
    
    processApiData(data) {
      // Set room info
      this.roomInfo.class = data.class;
      this.roomInfo.room = data.room;
      
      // Check if class is "vc" for vocational students
      if (data.class === "vc") {
        this.roomInfo.name = `ประกาศนียบัตรวิชาชีพ ชั้นปีที่ ${data.room}`;
      } else {
        this.roomInfo.name = `ชั้นมัธยมศึกษาปีที่${data.class}/${data.room}`;
      }
      
      // Set total students and evaluated students
      this.totalStudents = data.totalStudents;
      this.evaluatedStudents = data.evaluatedStudents;
      
      // Calculate gender data (need to get this from elsewhere as it's not in the SDQ API)
      // For now, we'll leave the gender data at default values
      
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
    
    // เพิ่มฟังก์ชันสำหรับเลือกทำแนวทางแก้ไข
    goToSurvey(studentId) {
      this.$router.push({
        path: "/teacher/eq-result",
        query: { studentId },
      });
    },
    
    // เพิ่มฟังก์ชันเกี่ยวกับแนวทางการแก้ไข
    getStatusBadgeClass(status) {
      if (!status || status === 'ยังไม่ได้เลือกแนวทางแก้ไข') {
        return 'bg-secondary text-white';
      } else if(status === 'มีการปรับปรุงการประเมิน โปรดเลือกแนวทางการแก้ไขอีกครั้ง'){
        return 'bg-warning text-dark';
      } else if (status === 'เลือกแนวทางแก้ไขแล้ว') {
        return 'bg-success text-white';
      } else {
        return 'bg-secondary text-white';
      }
    },
    
    openSolutionPopup(studentId) {
      this.currentStudentId = studentId;
      this.selectedSolutions = [];
      this.otherSolutionText = '';
      
      // ถ้านักเรียนคนนี้มีแนวทางการแก้ไขอยู่แล้ว ให้โหลดข้อมูลเดิมเพื่อแสดงในฟอร์ม
      const student = this.studentProblems.find(s => s.s_id === studentId);
      if (student && student.solve_problem) {
        // แยกข้อมูลที่เก็บเป็นบรรทัด
        const solutionLines = student.solve_problem.split('\n');
        
        // วนลูปตรวจสอบแต่ละบรรทัดว่าตรงกับตัวเลือกใด
        solutionLines.forEach(line => {
          // ตรวจสอบกับแต่ละตัวเลือก
          this.solutionOptions.forEach(option => {
            if (line.includes(option.label) && option.value !== 'other') {
              this.selectedSolutions.push(option.value);
            }
          });
          
          // ตรวจสอบกรณี "อื่นๆ"
          if (line.includes('อื่นๆ:')) {
            this.selectedSolutions.push('other');
            this.otherSolutionText = line.split('อื่นๆ:')[1].trim();
          }
        });
      }
      
      // ใช้ Bootstrap 5 Modal API เพื่อเปิด modal
      const myModal = new bootstrap.Modal(document.getElementById('solutionModal'));
      myModal.show();
    },
    
    async saveSolutions() {
      // สร้างข้อความสำหรับแนวทางการแก้ไข
      let solutionText = '';
      
      // วนลูปเพื่อสร้างข้อความแต่ละบรรทัด
      this.selectedSolutions.forEach(value => {
        const option = this.solutionOptions.find(opt => opt.value === value);
        if (option) {
          if (value === 'other' && this.otherSolutionText.trim()) {
            solutionText += `อื่นๆ:${this.otherSolutionText.trim()}\n`;
          } else if (value !== 'other') {
            solutionText += `${option.label}\n`;
          }
        }
      });
      
      // ตัดเครื่องหมาย \n ตัวสุดท้ายออก
      solutionText = solutionText.trim();
      
      // บันทึกข้อมูลผ่าน API
      const success = await this.updatedProblems(this.currentStudentId, solutionText);
      
      if (success) {
        // ปิด modal
        const myModalEl = document.getElementById('solutionModal');
        const modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();
      }
    },
    
    // เพิ่มฟังก์ชันสำหรับกำหนดสีแบดจ์ตามระดับปัญหา
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
    
    // เพิ่มฟังก์ชันสำหรับแปลงระดับปัญหาเป็นข้อความภาษาไทย
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
  font-family: 'IBM Plex Sans Thai Looped', sans-serif;
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

.btn-outline-primary {
  font-weight: 500;
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

/* แสดงผล Toast */
.toast {
  font-weight: 500;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .block-bg-main {
    padding: 1rem;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .card-header .ms-auto {
    margin-left: 0 !important;
    margin-top: 0.5rem;
  }
}
</style>