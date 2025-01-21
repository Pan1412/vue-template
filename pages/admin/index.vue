<template>
  <div>
    <div align="center">
      <div class="block-main">
        <div class="block-bg-main">
          <div class="row">
            <div class="col">
              <!-- <div align="left">
                                <button class="btn btn-danger btn-sm" @click="gotoPage('')">
                                    <Icon name="ep:refresh-left" style="padding: 0 0; margin: 0 0; font-size: 1rem;"
                                        class="fm-kanit" />
                                    กลับหน้าก่อน
                                </button>
                            </div> -->

              <div class="row align-items-center g-3">
                <div class="col-auto">
                  <label class="col-form-label" for="date">วันที่</label>
                </div>
                <div class="col-auto">
                  <input
                    type="date"
                    id="date"
                    name="date"
                    class="form-control"
                    v-model="dateSearch"
                  />
                </div>
                <div class="col-auto">
                  <label class="col-form-label" for="">ชั้นเรียน</label>
                </div>
                <div class="col-auto">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    v-model="classSearch"
                    @change="vcCheck()"
                  >
                    <option value=""></option>
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
                    v-model="roomSearch"
                    @change="getStudent"
                  >
                    <option :value="room" v-for="room in roomList">{{ room }}</option>
                  </select>
                  <!-- <input v-model="nameSearch" type="text" class="form-control input-width-student ms-3 w-50"
                                        placeholder="กรอกชื่อนักเรียน" aria-label="Username" aria-describedby="basic-addon1"> -->
                </div>
                <div class="col-auto">
                  <button
                    class="btn btn-primary fm-kanit"
                    @click="searchStudent"
                  > <Icon name="mingcute:search-2-line" class="icon-status" />
                    ค้นหา
                  </button>
                </div>

              </div>

              <div class="mt-2">
                <div class="table-responsive mt-3 fm-IBM">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th class="thead-bg" style="width: 2%">#</th>
                        <th class="thead-bg" style="text-align: left">ชื่อ-นามสกุล</th>
                        <th class="thead-bg d-none d-sm-table-cell">ห้องเรียน</th>
                        <th class="thead-bg d-none d-sm-table-cell">เลขที่</th>
                        <th class="thead-bg">คะเเนน</th>
                        <th class="thead-bg" style="width: 10rem">ประวัติ</th>
                        <th class="thead-bg"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="listStudent.length > 0"
                        v-for="list in listStudent"
                        :key="list.id_school"
                      >
                        <td>{{ list.id_school }}</td>
                        <td>
                          {{ list.prefix_stu }}{{ list.name_stu }} {{ list.surname_stu }}
                        </td>
                        <td class="d-none d-sm-table-cell">
                          <label v-if="list.class === 'vc'">ปวช.{{ list.room }}</label>
                          <label v-else>ม.{{ list.class }}/{{ list.room }}</label>
                        </td>
                        <td class="d-none d-sm-table-cell">{{ list.student_num }}</td>
                        <td>{{ list.student_score }}</td>
                        <td>
                          <div 
                            v-for="(behavior, index) in list.detail_behaviors"
                            :key="behavior.detail_beh_id"
                            :style="{
                              display: 'flex',
                              alignItems: 'center',
                              padding: behavior.name_beh ? '0.5rem 1rem' : '0',
                              borderRadius: '50px',
                              backgroundColor: behavior.name_beh
                                ? behavior.type === 1
                                  ? '#e84e40'
                                  : behavior.type === 2
                                  ? 'green'
                                  : behavior.type === 3
                                  ? 'purple'
                                  : 'gray'
                                : 'transparent',
                              color: behavior.name_beh ? 'white' : 'black',
                              fontSize: '0.9rem',
                              marginTop: '0.5rem'
                            }"
                          >
                            {{ behavior.name_beh ? behavior.name_beh : "" }}
                            <div
                              style="padding-left: 1rem; cursor: pointer"
                              v-if="behavior.name_beh"
                              @click="deleteBehaviorInList(behavior.detail_beh_id)"
                            >
                              <img
                                src="/assets/image/remove.png"
                                alt="Remove"
                                style="width: 15px; height: 15px"
                              />
                            </div>
                          </div>
                        </td>

                        <td>
                          <select
                            class="form-select form-select-sm w-100"
                            v-model="list.selectedBehavior"
                          >
                            <option value="" disabled selected>เลือกการหักคะแนน</option>
                            <optgroup label="ความประพฤติลบ">
                              <option
                                v-for="item in listTypeBehaviour.filter(
                                  (item) => item.type === 1
                                )"
                                :key="item.id"
                                :value="item"
                              >
                                {{ item.name_beh }}
                              </option>
                            </optgroup>
                            <optgroup label="ความประพฤติบวก">
                              <option
                                v-for="item in listTypeBehaviour.filter(
                                  (item) => item.type === 2
                                )"
                                :key="item.id"
                                :value="item"
                              >
                                {{ item.name_beh }}
                              </option>
                            </optgroup>
                          </select>
                        </td>
                      </tr>
                      <tr v-if="listStudent.length === 0" align="center">
                        <td colspan="7">ไม่พบข้อมูล</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div v-if="listStudent.length > 0" class="text-center mt-3">
                <button type="button" class="btn btn-success" @click="deductScore">
                  บันทึกการหักคะแนน
                </button>
              </div>
            </div>
          </div>
        </div>
        <br><br><br>
      </div>
    </div>
  </div>
</template>

<script>
import callApi from "../api/callApi";
import moment from "moment";
export default {
  setup() {
    const swal = getCurrentInstance().appContext.config.globalProperties;
    return { swal };
  },
  data() {
    return {
      classSearch: "",
      roomSearch: "",
      nameSearch: "",
      roomList: [1, 2, 3, 4, 5, 6],
      dataSearch: {
        class: "",
        room: "",
        name: "",
        date: "",
        tId: 0,
      },
      params: {},

      listStudent: [],
      listTypeBehaviour: [],
      selectedBehavior: [],
      tId: 22,
    };
  },

  async mounted() {
    let auth = this.getStore().setAuth();

    if (auth) {
      this.tId = auth.id;
    }

    const today = new Date().toISOString().split("T")[0];
    this.dateSearch = today;

    const params = new URLSearchParams(window.location.search);
    this.classSearch = params.get("classSearch") || "1";
    this.roomSearch = params.get("roomSearch") || "1";

    this.dataSearch = {
      class: this.classSearch,
      room: this.roomSearch,
      name: "",
      date: this.dateSearch,
      tId: this.tId,
    };

    await this.searchStudent();

    await this.getDaTaTypeBehaviour();
    await this.getTypeDetailBehaviorStudent();
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

    async searchStudent() {
      if (this.classSearch === "" || this.roomSearch === "" || !this.dateSearch) {
        setTimeout(() => {
          this.alertModal(
            "error",
            "ข้อผิดพลาด",
            "กรุณาระบุวันที่ ระดับชั้น และห้องให้ครบถ้วน",
            true
          );
        }, 500);
        return;
      }
      this.dataSearch.class = this.classSearch;
      this.dataSearch.room = this.roomSearch;
      this.dataSearch.date = this.dateSearch;
      this.dataSearch.name = this.nameSearch || "";
      this.dataSearch.tId = this.tId;
      try {
        const res = await callApi.getStudentForBehaviorScore({ ...this.dataSearch });
        this.listStudent = res.result.map((student) => ({
          ...student,
          selectedBehavior: "",
        }));
      } catch (err) {
        console.error("Error:", err);
      }
    },

    async getDaTaTypeBehaviour() {
      await callApi
        .gettypeBehaviorStudent()
        .then((res) => {
          if (res.code == 0) {
            this.listTypeBehaviour = res.result;
          } else {
            this.listTypeBehaviour = res.result;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async deductScore() {
      const deductionRequests = [];
      const formattedDate = moment(this.dateSearch).format("YYYY-MM-DD");

      this.listStudent.forEach((student) => {
        if (student.selectedBehavior) {
          const selectedBehavior = student.selectedBehavior;

          const requestData = {
            id_school: student.id_school,
            type_beh_id: selectedBehavior.id,
            name_beh: selectedBehavior.name_beh,
            score: selectedBehavior.score,
            type: selectedBehavior.type,
            date: formattedDate,
          };
          deductionRequests.push(requestData);
        }
      });

      if (deductionRequests.length === 0) {
        setTimeout(() => {
          this.alertModal(
            "error",
            "ข้อผิดพลาด",
            "กรุณาเลือกการหักคะแนนอย่างน้อยหนึ่งรายการ",
            true
          );
        }, 500);
        return;
      }

      try {
        const res = await callApi.deductBehaviorScore(deductionRequests);

        if (res.code === 0) {
          deductionRequests.forEach((request) => {
            const studentToUpdate = this.listStudent.find(
              (student) => student.id_school === request.id_school
            );
            if (studentToUpdate && studentToUpdate.selectedBehavior) {
              const scoreToDeduct = studentToUpdate.selectedBehavior.score;
              studentToUpdate.score -= scoreToDeduct;
            }
          });

          try {
            const data = {
              t_id: this.getStore().setAuth().id,
              student: deductionRequests,
            };

            const result = await callApi.insertDetailsTypeBehaviorScore(data);

            if (result.code === 0) {
              setTimeout(() => {
                this.alertModal(
                  "success",
                  "สำเร็จ",
                  "ทำการบันทึกคะเเนนความประพฤติสำเร็จ",
                  true
                );
                const queryString = `/admin/?classSearch=${this.dataSearch.class}&roomSearch=${this.dataSearch.room}`;
                window.location.href = queryString;
              }, 500);
            } else {
              throw new Error("Failed to insert behavior details");
            }
          } catch (error) {
            console.error("Error inserting behavior details:", error);
            alert("เกิดข้อผิดพลาดในการบันทึกเเก้ไขคะเเนนความประพฤติ");
          }
        } else {
          setTimeout(() => {
            this.alertModal(
              "error",
              "ไม่สำเร็จ",
              "ไม่สามารถเเก้ไขคะเเนนความประพฤติสำเร็จได้"
            );
          }, 500);
        }
      } catch (error) {
        console.error("Error deducting score:", error);
        alert("เกิดข้อผิดพลาดในการบันทึก");
      }
    },

    async deleteBehaviorInList(id) {
      if (!id) {
        this.alertModal("error", "ข้อผิดพลาด", "ไม่มีรายการลบ", true);
        return;
      }

      try {
        this.alertModal("loading", "กรุณารอสักครู่....");
        const res = await callApi.deleteBehaviorInList({ id });

        if (res.code === 0) {
          setTimeout(() => {
            this.alertModal("success", "สำเร็จ", "ลบข้อมูลรายการความประพฤติสำเร็จ", true);
          }, 500);
        } else {
          this.alertModal("error", "ข้อผิดพลาด", res.message || "เกิดข้อผิดพลาด", true);
        }
      } catch (err) {
        console.error(err);
        this.alertModal("error", "ข้อผิดพลาด", "ไม่สามารถลบข้อมูลพฤติกรรมได้", true);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  font-family: "__font_pwks_kanit";
  background-image: url("assets/img/bg_school.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  /* background-color: #ececec; */
}

.thead-bg {
  background-color: #e9ecef;
  color: #495057;
  border-color: #dee2e6;
  min-width: 60px;
}

.input-width-student {
  width: 10rem;
}

.w-10 {
  width: 20% !important;
}

@media (max-width: 768px) {
  /* สำหรับหน้าจอที่มีขนาดเล็กกว่า 768px (มือถือ, แท็บเล็ต) */
  .w-10 {
    width: 25% !important; /* เปลี่ยนความกว้างของ label */
  }

  .form-control,
  .form-select {
    width: 100% !important; /* ทำให้ input และ select ขยายเต็มความกว้าง */
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
