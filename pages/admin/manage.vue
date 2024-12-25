<template>
  <div>
    <div align="center">
      <div class="block-main">
        <div class="block-bg-main">
          <div class="row">
            <div class="col bgbox2">

              <div class="section-header">
                <h4>บันทึกคดี/พิพาท</h4>
                <button class="btn btn-success btn-sm" @click="openModal('behavior')">เพิ่ม</button>
              </div>
              <div align="right">
                
              </div>
              <div class="mt-2">
                <div class="table-responsive mt-3">
                  <div v-if="listDetailTypeBehaviour.length > 0">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th style="text-align: left;">รายการความประพฤติ</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in listDetailTypeBehaviour" :key="item.id">
                          <td>{{ index + 1 }}</td>
                          <td>{{ item.details[0].name_beh }}</td>
                          <td>
                            <button class="btn btn-warning btn-sm"
                              @click="openModalForEdit(item)">รายละเอียด</button>
                          </td>
                          <td>
                            <button class="btn btn-danger btn-sm"
                              @click="deleteDeatilOneBehaviour(item.main_id)">ลบ</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div v-else>
                    <div class="text-center mt-3">
                      <p>ไม่พบรายการความประพฤติ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- สำหรับเพิ่มข้อมูลใหม่ -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-show">
        <h3 class="text-left">{{ isEditing ? 'รายละเอียดความประพฤติ' : 'บันทึกความประพฤติ' }}</h3>
        <form @submit.prevent="saveDetailBehaviorAndDeductBehaviorScore">

          <div class="mb-3">
            <label for="studentId" class="form-label">ชื่อความประพฤติ</label>
            <input type="text" class="form-control" placeholder="กรอกชื่อ" required
              v-model="form.details[0].name_beh" />
            <label for="studentId" class="form-label">วันที่</label>
            <input type="date" class="form-control" placeholder="กรอกชื่อ" required v-model="form.date" />
            <label for="studentId" class="form-label">เลขประจำตัวนักเรียน</label>
            <input type="text" class="form-control" id="studentId" v-model="studentId"
              placeholder="กรอกเลขประจำตัวนักเรียน" />
            <div v-if="isEditing">
              <button type="button" class="btn btn-primary mt-2 disabled" @click="searchStudent">ค้นหา</button>
            </div>
            <div v-if="!isEditing">
              <button type="button" class="btn btn-primary mt-2" @click="searchStudent">ค้นหา</button>
            </div>
          </div>
          <h5>รายการนักเรียนที่ค้นหาได้:</h5>
          <h5 v-if="isEditing" style="color: red;">***ไม่สามารถเปลี่ยนเเปลงข้อมูลส่วนนักเรียนได้***</h5>
          <div v-if="listStudents.length" class="mt-3 scrollable-table">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>รหัสประจำตัวนักเรียน</th>
                  <th>ชื่อ</th>
                  <th>นามสกุล</th>
                  <th>ชั้น</th>
                  <th>ห้อง</th>
                  <th>คะแนน</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(student, index) in listStudents" :key="student.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ student.id_school }}</td>
                  <td>{{ student.prefix_stu }} {{ student.name_stu }}</td>
                  <td>{{ student.surname_stu }}</td>
                  <td>{{ student.class }}</td>
                  <td>{{ student.room }}</td>
                  <td>{{ student.score }}</td>
                  <td>
                    <div v-if="isEditing">
                      <button class="btn btn-danger btn-sm disabled" @click="removeStudent(index)">ลบ</button>
                    </div>
                    <div v-if="!isEditing">
                      <button class="btn btn-danger btn-sm" @click="removeStudent(index)">ลบ</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mb-3">
            <label for="deductionScore" class="form-label">คะแนนที่จะทำการหัก</label>
            <input type="number" class="form-control" id="score" v-model="deductionScore" required />
          </div>
          <div class="mb-3">
            <label for="incidentNote" class="form-label">บันทึกเหตุการณ์</label>
            <textarea class="form-control" id="incidentNote" rows="4" v-model="incidentNote"
              placeholder="กรอกเหตุการณ์ที่ต้องการบันทึก"></textarea>
          </div>

          <div class="mb-3">
            <label class="form-label">อัปโหลดรูปภาพ (สูงสุด 5 รูป)</label>
            <input type="file" class="form-control" accept="image/*" multiple @change="addFilePhoto" />
            <div class="mt-3 row">
              <div class="col-md-3 mb-2" v-for="(file, index) in previewImages" :key="index">
                <div class="preview-container">
                  <img :src="file" alt="Preview" class="img-thumbnail" />
                  <button type="button" class="btn btn-danger btn-sm mt-2 w-100" @click="removePhoto(index)">
                    ลบ
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <div v-if="isEditing">
              <button type="submit" class="btn btn-success disabled">{{ isEditing ? 'บันทึกการแก้ไข' : 'บันทึกข้อมูล' }}</button>
            </div>
            <div v-if="!isEditing">
              <button type="submit" class="btn btn-success">{{ isEditing ? 'บันทึกการแก้ไข' : 'บันทึกข้อมูล' }}</button>
            </div>
            <button type="button" class="btn btn-secondary" @click="closeModal">ปิด</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import callApi from '../api/callApi';
import moment from 'moment';
export default {
  data() {
    return {
      isModalOpen: false,
      studentId: [],
      listStudents: [],
      deductionScore: null,
      incidentNote: "",
      files: [],
      previewImages: [],
      listDetailTypeBehaviour: [],
      form: {
        id: null,
        id_school: null,
        t_id: null,
        details: [{ name_beh: '' }],
        name_beh: '',
        score: '',
        evant: '',
        pic_1: '',
        pic_2: '',
        pic_3: '',
        pic_4: '',
        pic_5: '',
        created_at: '',
      },
    };
  },
  setup() {
    const swal = getCurrentInstance().appContext.config.globalProperties;
    return { swal }
  },
  mounted() {
    let auth = this.getStore().setAuth()

    if (auth) {
      this.tId = auth.id
    }
    this.getMainBehaviour();

  },
  methods: {
    async getMainBehaviour() {
      await callApi.getMainBehaviour().then(res => {
        if (res.code == 0) {
          this.listDetailTypeBehaviour = res.result
        } else {
          this.listDetailTypeBehaviour = res.result
        }
        console.log(this.listDetailTypeBehaviour);

      }).catch(err => {
        console.log(err);
      })
    },

    async getDeatilOneBehaviour(id) {
      await callApi.getDeatilOneBehaviour({ id }).then(res => {
        if (res.code == 0) {
          this.listDetailTypeBehaviour = res.result
        } else {
          this.listDetailTypeBehaviour = res.result;
        }
      }).catch(err => {
        console.log(err);
      })
    },

    async deleteDeatilOneBehaviour(id) {
      await callApi.deleteDeatilOneBehaviour({ id }).then(res => {
        if (res.code === 0) {
          this.alertModal('loading', 'กำลังลบข้อมูล กรุณารอสักครู่....')
          setTimeout(() => {
            this.alertModal(
              'success',
              'สำเร็จ',
              'ลบข้อมูลสำเร็จ',
              true
            );
          }, 500);
          this.getMainBehaviour();
          return
        }
      })
        .catch(err => {
          console.error(err);
          setTimeout(() => {
            this.alertModal(
              'error',
              'ข้อผิดพลาด',
              `ไม่สามารถลบข้อมูลได้`,
              false
            );
          }, 500);
        });
    },

    openModal() {
      this.isEditing = false;
      this.resetForm();
      this.isModalOpen = true;
    },

    openModalForEdit(item) {
      this.isEditing = true;
      this.form = { ...item };
      this.studentId = Array.isArray(item.id_schools) ? item.id_schools : [item.id_schools];
      this.form.date = item.date || '';
      this.form.id_schools = [...this.studentId];

      if (this.studentId && this.studentId.length) {
        this.searchStudent();
      }

      this.deductionScore = item.details[0].score;
      this.incidentNote = item.details[0].evant;
      this.previewImages = [];

      for (let i = 1; i <= 5; i++) {
        if (item[`pic_${i}`]) {
          this.previewImages.push(item[`pic_${i}`]);
        }
      }

      this.isModalOpen = true;
    },

    closeModal() {
      this.resetForm();
      this.isModalOpen = false;
    },

    resetForm() {
      this.form = {
        id: null,
        id_school: null,
        t_id: null,
        details: [{ name_beh: '' }],
        score: '',
        evant: '',
        pic_1: '',
        pic_2: '',
        pic_3: '',
        pic_4: '',
        pic_5: '',
        created_at: '',
      };
      this.studentId = null;
      this.listStudents = [];
      this.deductionScore = null;
      this.incidentNote = '';
      this.previewImages = [];
      this.files = [];
      this.isEditing = false;
    },

    async searchStudent() {
      if (!this.studentId || (Array.isArray(this.studentId) && this.studentId.length === 0)) {
        setTimeout(() => {
          this.alertModal(
            'error',
            'ข้อผิดพลาด',
            `กรุณากรอกเลขประจำตัวนักเรียนให้ถูกต้อง`,
            false
          );
        }, 500);
        return;
      }

      const studentIds = Array.isArray(this.studentId) ? this.studentId : [this.studentId];

      this.listStudents = this.listStudents.filter(
        student => !studentIds.includes(String(student.id_school))
      );

      for (let id of studentIds) {
        const alreadyExists = this.listStudents.some(
          student => String(student.id_school) === String(id)
        );

        if (alreadyExists) {
          setTimeout(() => {
            this.alertModal(
              'error',
              'ข้อผิดพลาด',
              `มีรหัสประจำตัวของ ${id} อยู่ในรายการแล้ว`,
              false
            );
          }, 500);
          continue;
        }

        const data = { id_school: id };

        console.log(data);
        console.log('id', this.studentId)
        try {
          const res = await callApi.searchStudent({ id_school: id });
          if (res.code === 0 && res.data.length) {
            this.listStudents = [...this.listStudents, ...res.data];
            this.studentId = this.listStudents.map(student => student.id_school);
            this.form.id_schools = [...this.studentId];
          } else {
            setTimeout(() => {
              this.alertModal(
                'info',
                'ข้อมูล',
                `ไม่พบข้อมูลนักเรียนสำหรับรหัส ${id}`,
                false
              );
            }, 500);
          } ""
        } catch (err) {
          console.error(`Error fetching student ${id}:`, err);
          setTimeout(() => {
            this.alertModal(
              'error',
              'ข้อผิดพลาด',
              `เกิดข้อผิดพลาดในการค้นหาข้อมูลสำหรับรหัส ${id}`,
              false
            );
          }, 500);
        }
      }
    },

    async removeStudent(index) {
      this.listStudents.splice(index, 1);
    },

    addFilePhoto(event) {
      const selectedFiles = Array.from(event.target.files);
      if (this.files.length + selectedFiles.length > 5) {
        setTimeout(() => {
          this.alertModal(
            'error',
            'ข้อผิดพลาด',
            `สามารถอัปโหลดรูปภาพได้สูงสุด 5 รูป`,
            false
          );
        }, 500);
        return;
      }
      selectedFiles.forEach((file) => {
        this.files.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImages.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    },

    removePhoto(index) {
      this.files.splice(index, 1);
      this.previewImages.splice(index, 1);
    },

    async saveDetailBehaviorAndDeductBehaviorScore() {
      console.log(this.form);

      if (!this.form.details[0].name_beh) {
        this.alertModal('error', 'ข้อผิดพลาด', 'กรุณากรอกชื่อความประพฤติ', true);
        return;
      }

      if (!this.listStudents || this.listStudents.length === 0) {
        setTimeout(() => {
          this.alertModal(
            'error',
            'ข้อผิดพลาด',
            'กรุณาค้นหานักเรียนก่อนบันทึกข้อมูล',
            true
          );
        }, 500);
        return;
      }
      if (!this.deductionScore || !this.incidentNote) {
        setTimeout(() => {
          this.alertModal(
            'error',
            'ข้อผิดพลาด',
            'กรุณากรอกข้อมูลให้ครบถ้วน',
            true
          );
        }, 500);
        return;
      }

      try {
        let res;
        if (this.isEditing) {
          const payload = {
            id: this.form.main_id,
            name_beh: this.form.details[0].name_beh,
            score: this.deductionScore,
            t_id: this.form.details[0].t_id,
            evant: this.incidentNote,
            Pic_1: this.previewImages[0] || null,
            Pic_2: this.previewImages[1] || null,
            Pic_3: this.previewImages[2] || null,
            Pic_4: this.previewImages[3] || null,
            Pic_5: this.previewImages[4] || null,
            id_school: this.studentId,
            date: this.form.date
          };
          console.log('id', this.studentId)
          console.log('Payload:', payload);
          res = await callApi.updateDeatilBehaviour({ behaviors: payload });
        } else {
          const formData = new FormData();
          formData.append("t_id", this.getStore().setAuth().id);
          formData.append("evant", this.incidentNote);
          formData.append("deductionScore", this.deductionScore);
          formData.append("name_beh", this.form.details[0].name_beh);
          formData.append("date", this.form.date);

          const students = this.listStudents.map(student => ({
            id: student.id,
            name: student.name_stu,
            id_school: student.id_school,
          }));
          formData.append("students", JSON.stringify(students));

          if (this.files && this.files.length > 0) {
            this.files.forEach((file, index) => {
              formData.append(`images[${index + 1}]`, file);
            });
          }
          res = await callApi.saveDetailBehaviorAndDeductBehaviorScore(formData);
        }

        if (res.code === 0) {
          if (this.isEditing) {
            this.alertModal('loading', 'กำลังเเก้ไขข้อมูล กรุณารอสักครู่....')
            setTimeout(() => {
              this.alertModal(
                'success',
                'สำเร็จ',
                'เเก้ไขข้อมูลสำเร็จ',
                true
              );
            }, 500);
          } else {
            this.alertModal('loading', 'กำลังบันทึกข้อมูล กรุณารอสักครู่....')
            setTimeout(() => {
              this.alertModal(
                'success',
                'สำเร็จ',
                'บันทึกข้อมูลสำเร็จ',
                true
              );
            }, 500);
          }
          this.closeModal();
          this.getMainBehaviour();
        } else {
          alert(res.message || "เกิดข้อผิดพลาด");
        }
      } catch (err) {
        console.error("Error saving behavior:", err);
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    }

  }
};
</script>

<style lang="scss" scoped>
.thead-bg {
  background-color: #e9ecef;
  color: #495057;
  border-color: #dee2e6;
  min-width: 120px;
}

.input-width-student {
  width: 10rem;
}

.w-10 {
  width: 20% !important;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-show {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 70rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  margin-top: 2rem;
}

.scrollable-table {
  max-height: 200px;
  overflow-y: auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
</style>