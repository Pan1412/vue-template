<template>
  <div>
    <div align="center">
      <div class="block-main">
        <div class="block-bg-main">
          <div class="row">
            <div class="col">
              <div class="row align-items-center g-3">
                <div class="col-auto">
                  <label class="col-form-label" for="">รหัสประจำตัวนักเรียน</label>
                </div>
                <div class="col-auto">
                  <input
                    v-model="idSchool"
                    type="text"
                    class="form-control input-width-student ms-3"
                    placeholder="กรอกรหัสประจำตัวนักเรียน"
                    aria-label="Student ID"
                  />
                </div>
                <div class="col-auto">
                  <label class="col-form-label" for="">ชื่อ-นามสกุล</label>
                </div>
                <div class="col-auto">
                  <input
                    v-model="nameStudent"
                    type="text"
                    class="form-control input-width-student ms-3"
                    placeholder="กรอกชื่อ-นามสกุลของนักเรียน"
                    aria-label="Student Name"
                  />
                </div>
                <div class="col-auto">
                  <button class="btn btn-primary fm-kanit" @click="searchOneStudent">
                    <Icon name="mingcute:search-2-line" class="icon-status" />
                    ค้นหา
                  </button>
                </div>
              </div>

              <div class="row align-items-center g-3 noti-search">
                *สามารถใช้ช่องการค้นหาใดก็ได้
              </div>

              <!-- ฟอร์มแสดงข้อมูลพฤติกรรมของนักเรียน -->
              <div v-if="showStudentDetails">
                <div class="student-behavior-card mt-4">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title" style="text-align: left">
                        ข้อมูลพฤติกรรมนักเรียน
                      </h5>
                      <div class="student-info mt-2" style="text-align: left">
                        <div style="display: flex">
                          <p>
                            <strong>ชื่อ-นามสกุล:</strong> {{ oneStudent.prefix_stu }}
                            {{ oneStudent.name_stu }} {{ oneStudent.surname_stu }}
                          </p>
                          <p style="margin-left: 2rem">
                            <strong>รหัสประจำตัวนักเรียน:</strong>
                            {{ oneStudent.id_school }}
                          </p>
                          <p style="margin-left: 2rem">
                            <strong>คะเเนนความประพฤติ:</strong> {{ oneStudent.score }}
                          </p>
                        </div>

                        <div style="display: flex">
                          <p><strong>เลขที่:</strong> {{ oneStudent.student_num }}</p>
                          <p style="margin-left: 2rem">
                            <strong>ชั้นเรียน:</strong> มัธยมศึกษาปีที่
                            {{ oneStudent.class }} ห้อง {{ oneStudent.room }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <br />

                <h5 class="card-title" style="text-align: left">รายละเอียดความพฤติ</h5>
                <div class="mt-2">
                  <div class="table-responsive mt-3 fm-IBM">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th class="thead-bg" style="width: 10%">ลำดับ</th>
                          <th class="thead-bg" style="text-align: left">วันที่</th>
                          <th class="thead-bg" style="text-align: left">รายการ</th>
                          <th class="thead-bg" style="width: 20%; text-align: center">
                            จำนวนคะแนน
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(detail, index) in behaviorDetails" :key="detail.id">
                          <td>{{ index + 1 }}</td>
                          <td>{{ formatDate(detail.date) }}</td>
                          <td>{{ detail.name_beh }}</td>
                          <td style="text-align: center">{{ detail.score }}</td>
                        </tr>
                        <tr v-if="behaviorDetails.length === 0" align="center">
                          <td colspan="4">ไม่พบข้อมูล</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="no-student-data">ไม่พบข้อมูลนักเรียนที่ทำการค้นหา</div>
              </div>

              <br />
            </div>
          </div>
        </div>
        <br /><br /><br />
      </div>
    </div>
  </div>
</template>

<script>
import callApi from "../../api/callApi";
import moment from "moment";
export default {
  setup() {
    const swal = getCurrentInstance().appContext.config.globalProperties;
    return { swal };
  },
  data() {
    return {
      idSchool: "",
      nameStudent: "",
      surnameStudent: "",
      oneStudent: [],
      behaviorDetails: [],
      params: {},
      showStudentDetails: false,
    };
  },

  computed: {
    firstName() {
      const parts = this.nameStudent.trim().split(/\s+/);
      console.log(parts);
      return parts.slice(0, -1).join(" ") || this.nameStudent;
    },
    lastName() {
      const parts = this.nameStudent.trim().split(/\s+/);
      return parts.length > 1 ? parts[parts.length - 1] : "";
    },
  },

  async mounted() {
    this.nameStudent = "";
    let auth = this.getStore().setAuth();

    if (auth) {
      this.tId = auth.id;
    }

    const today = new Date().toISOString().split("T")[0];
    this.dateSearch = today;
  },

  methods: {
    vcCheck() {
      if (this.classSearch == "vc") {
        this.vcGrade = true;
        this.roomList = [1, 2, 3];
      } else {
        this.vcGrade = false;
        this.roomList = [1, 2, 3, 4, 5, 6];
      }
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(-2);
      return `${day}/${month}/${year}`;
    },

    async searchOneStudent() {
      this.oneStudent = [];
      if (!this.idSchool && !this.nameStudent) {
        setTimeout(() => {
          this.alertModal(
            "error",
            "ข้อผิดพลาด",
            "กรุณากรอกรหัสประจำตัวนักเรียนหรือชื่อ-นามสกุลนักเรียน",
            true
          );
        }, 500);
        return;
      }

      const thaiRegex = /^[ก-๙\s]+$/;
      if (
        this.nameStudent &&
        (this.nameStudent.length < 10 || !thaiRegex.test(this.nameStudent))
      ) {
        setTimeout(() => {
          this.alertModal(
            "error",
            "ข้อผิดพลาด",
            "กรุณากรอกชื่อ-นามสกุลนักเรียนให้ถูกต้อง",
            true
          );
        }, 500);
        this.showStudentDetails = false;
        return;
      }

      const data = {
        id_school: this.idSchool || null,
        name: this.firstName || null,
        surname: this.lastName || null,
      };

      await callApi
        .searchOneStudent(data)
        .then((res) => {
          if (res.code === 0) {
            this.oneStudent = res.students[0];
            this.behaviorDetails = res.behaviors;
            this.showStudentDetails = true;
          } else {
            this.alertModal(
              "warning",
              "ไม่พบข้อมูล",
              "ไม่พบข้อมูลนักเรียนที่ค้นหา",
              true
            );
          }
        })
        .catch((err) => {
          console.error("เกิดข้อผิดพลาดไม่สามารถแสดงข้อมูลได้:", err);
          this.alertModal("error", "ข้อผิดพลาด", "ไม่สามารถแสดงข้อมูลได้", true);
        });
    },

    async getTypeDetailBehaviorStudent(data) {
      console.log("getTypeDetailBehaviorStudent", data);
      try {
        const res = await callApi.getTypeDetailBehaviorStudent(data);
        this.behaviorDetails = [];
        if (res.code === 0) {
          this.behaviorDetails = res.data;
        } else {
          console.log("ไม่พบข้อมูล", res);
        }
      } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.thead-bg {
  background-color: #e9ecef;
  color: #495057;
  border-color: #dee2e6;
  min-width: 60px;
}

th.thead-bg:last-child {
  width: 11rem;
}

.input-width-student {
  width: 15.5rem;
}

.w-10 {
  width: 20% !important;
}

.noti-search {
  color: red;
  margin-top: 1rem;
}

.no-student-data {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #ff0000;
  background-color: #ffecec;
  padding: 15px;
  border: 1px solid #ffb3b3;
  border-radius: 8px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .w-10 {
    width: 25% !important;
  }

  .form-control,
  .form-select {
    width: 100% !important;
  }

  .btn {
    width: 100% !important;
    margin-bottom: 10px;
  }

  .table-responsive {
    margin-top: 20px;
  }

  .table {
    font-size: 0.9rem;
  }

  .thead-bg {
    font-size: 0.9rem;
  }

  .d-flex {
    flex-direction: column;
    align-items: flex-start;
  }

  .form-select,
  .form-control {
    margin-bottom: 10px;
  }
}

@media (max-width: 576px) {
  .w-10 {
    width: 20% !important;
  }

  .d-flex {
    align-items: flex-start;
  }

  .form-control,
  .form-select {
    width: 100% !important;
  }

  .table-responsive {
    margin-top: 10px;
  }

  .btn {
    width: 100% !important;
  }

  .ms-3 {
    margin-left: 0rem !important;
  }
}
</style>
