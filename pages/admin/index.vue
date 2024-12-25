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

              <div class="mt-3">
                <div class="d-flex">
                  <label for="" class="mt-2 w-10" style="margin-right: -1%">วันที่</label>
                  <input
                    type="date"
                    id="date"
                    class="form-control w-50"
                    v-model="dateSearch"
                  />
                  <label for="" class="mt-2 w-10" style="margin-right: -1%"
                    >ชั้นเรียน</label
                  >
                  <select
                    class="form-select w-50"
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

                  <label for="" class="mt-2 w-10 ms-3" style="margin-right: 0%"
                    >ห้อง/ปี</label
                  >
                  <select
                    class="form-select w-50"
                    aria-label="Default select example"
                    v-model="roomSearch"
                    @change="getStudent"
                  >
                    <option :value="room" v-for="room in roomList">{{ room }}</option>
                  </select>

                  <!-- <input v-model="nameSearch" type="text" class="form-control input-width-student ms-3 w-50"
                                        placeholder="กรอกชื่อนักเรียน" aria-label="Username" aria-describedby="basic-addon1"> -->

                  <button
                    class="btn btn-primary btn-sm ms-3 w-50 fm-kanit"
                    @click="searchStudent"
                  >
                    ค้นหา
                  </button>
                </div>
              </div>

              <div class="mt-2">
                <div class="table-responsive mt-3">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th class="thead-bg" style="width: 2%">#</th>
                        <th class="thead-bg" style="text-align: left">ชื่อ-นามสกุล</th>
                        <th class="thead-bg">ห้องเรียน</th>
                        <th class="thead-bg">เลขที่</th>
                        <th class="thead-bg">คะเเนนความประพฤติ</th>
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
                        <td>
                          <label v-if="list.class === 'vc'">ปวช.{{ list.room }}</label>
                          <label v-else>ม.{{ list.class }}/{{ list.room }}</label>
                        </td>
                        <td>{{ list.student_num }}</td>
                        <td>{{ list.student_score }}</td>
                        <td>
                          <div
                            v-for="(behavior, index) in list.detail_behaviors"
                            :key="behavior.detail_beh_id"
                            style="color: red; display: flex; align-items: center"
                          >
                            {{ behavior.name_beh ? behavior.name_beh : "-" }}
                            <div
                              style="padding-left: 1rem; cursor: pointer"
                              @click="deleteBehaviorInList(behavior.detail_beh_id)"
                            >
                              <div >
                                <img
                                  v-if="index == 0"
                                  src="/assets/image/remove.png"
                                  alt="Remove"
                                  style="width: 15px; height: 15px"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <select
                            class="form-select form-select-sm w-100"
                            v-model="list.selectedBehavior"
                          >
                            <option value="" disabled selected>เลือกการหักคะแนน</option>
                            <optgroup label="ความประพฤติ">
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
                            <optgroup label="คุณธรรม">
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

      console.log(this.dataSearch);

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

          console.log(requestData);
          console.log("selectedBehavior", selectedBehavior);
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
              console.log(result);
              setTimeout(() => {
                this.alertModal(
                  "success",
                  "สำเร็จ",
                  "ทำการบันทึกคะเเนนความประพฤติสำเร็จ",
                  true
                );
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
</style>
