<template>
  <div>
    <div align="center">
      <div class="block-main">
        <div class="block-bg-main">
          <div class="row">
            <div class="col bgbox2">
              <div align="right">
                <button class="btn btn-success btn-sm" @click="openModal('behavior')">เพิ่ม</button>
              </div>
              <div class="mt-2">
                <div class="table-responsive mt-3">
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
                        <td>{{ item.name_beh }}</td>
                        <td>
                          <button class="btn btn-warning btn-sm"
                            @click="updateDeatilBehaviour(item.id)">รายละเอียด&แก้ไข</button>
                        </td>
                        <td>
                          <button class="btn btn-danger btn-sm" @click="deleteDeatilOneBehaviour(item.id)">ลบ</button>
                        </td>
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


    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-show">
        <h3 class="text-left">บันทึกคะเเนนความประพฤติ</h3>
        <form @submit.prevent="saveDetailBehaviorAndDeductBehaviorScore">

          <div class="mb-3">
            <label for="studentId" class="form-label">ชื่อความประพฤติ</label>
            <input type="text" class="form-control" placeholder="กรอกชื่อ" required />
            <label for="studentId" class="form-label">เลขประจำตัวนักเรียน</label>
            <input type="text" class="form-control" id="studentId" v-model="studentId"
              placeholder="กรอกเลขประจำตัวนักเรียน" />
            <button type="button" class="btn btn-primary mt-2" @click="searchStudent">ค้นหา</button>
          </div>
          <div v-if="listStudents.length" class="mt-3">
            <h5>รายการนักเรียนที่ค้นหาได้:</h5>
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
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mb-3">
            <label for="deductionScore" class="form-label">คะแนนที่จะทำการหัก</label>
            <input type="number" class="form-control" id="deductionScore" v-model="deductionScore"
              placeholder="ระบุคะแนนที่หัก" />
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
            <button type="submit" class="btn btn-success">บันทึกข้อมูล</button>
            <button type="button" class="btn btn-secondary" @click="closeModal">ปิด</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import callApi from '../api/callApi';
export default {
  data() {
    return {
      isModalOpen: false,
      studentId: "",
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
  mounted() {
    let auth = this.getStore().setAuth()

    if (auth) {
      this.tId = auth.id
    }
    this.getDeatilBehaviour();

  },
  methods: {
    async getDeatilBehaviour() {
      await callApi.getDeatilBehaviour().then(res => {
        if (res.code == 0) {
          this.listDetailTypeBehaviour = res.result
        } else {
          this.listDetailTypeBehaviour = res.result
        }
      }).catch(err => {
        console.log(err);
      })
    },

    // async updateDeatilBehaviour(id) {
    //   const data = {
    //     id: this.form.id,
    //     id_school: this.form.id_school,
    //     evant: this.form.evant,
    //     name: this.form.name_beh,
    //     t_id: this.form.t_id,
    //     score: this.form.score,
    //     pic_1: this.form.Pic_1,
    //     pic_2: this.form.Pic_2,
    //     pic_3: this.form.Pic_3,
    //     pic_4: this.form.Pic_4,
    //     pic_5: this.form.Pic_5,
    //     time: this.form.created_at,
    //   };
    //   await callApi.updateDeatilBehaviour({ id }).then(res => {

    //     if (res.code == 0) {
    //       this.listDetailTypeBehaviour = res.result
    //     }
    //   }).catch(err => {
    //     console.log(err);
    //   })
    // },

    async getDeatilOneBehaviour(id) {
      console.log(id);

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
      console.log(id);
      await callApi.deleteDeatilOneBehaviour({ id }).then(res => {
        console.log(res);

        if (res.code === 0) {
          setTimeout(() => {
            this.alertModal(
              'success',
              'สำเร็จ',
              'ลบข้อมูลรายการคุณธรรมสำเร็จ',
              true
            );
          }, 500);
          return this.getDeatilBehaviour();
        } else {
          alert(res.message || 'เกิดข้อผิดพลาด');
        }
      })
        .catch(err => {
          console.error(err);
          alert('ไม่สามารถลบข้อมูลได้');
        });
    },

    openModal() {
      this.isModalOpen = true;
    },

    closeModal() {
      this.listStudents = [];
      this.studentId = '';
      this.deductionScore = null;
      this.incidentNote = '';
      this.files = [];
      this.isModalOpen = false;
    },

    async searchStudent() {
      const data = {
        id_school: this.studentId
      };
      await callApi.searchStudent(data).then(res => {
        if (res.code === 0) {
          if (!this.listStudents) this.listStudents = [];
          this.listStudents = [...this.listStudents, ...res.data];
          console.log(this.listStudents);
          return
        }
      }).catch(err => {
        console.log(err);
      })
    },

    addFilePhoto(event) {
      const selectedFiles = Array.from(event.target.files);
      if (this.files.length + selectedFiles.length > 5) {
        alert("สามารถอัปโหลดรูปภาพได้สูงสุด 5 รูป");
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
      if (!this.listStudents || this.listStudents.length === 0) {
        alert("กรุณาค้นหานักเรียนก่อนบันทึกข้อมูล");
        return;
      }

      if (!this.deductionScore || !this.incidentNote) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
      }

      const formData = new FormData();
      formData.append("t_id", this.getStore().setAuth().id);
      formData.append("evant", this.incidentNote);
      formData.append("deductionScore", this.deductionScore);

      this.listStudents.forEach((student, index) => {
        formData.append(`students[${index}][id]`, student.id);
        formData.append(`students[${index}][name]`, student.name_stu);
        formData.append(`students[${index}][id_school]`, student.id_school);
      });

      if (this.files && this.files.length > 0) {
        this.files.forEach((file, index) => {
          formData.append(`images[${index + 1}]`, file);
        });
      }
      
      console.log([...formData.entries()]);
      console.log(formData);

      await callApi.saveDetailBehaviorAndDeductBehaviorScore(formData).then(res => {
        console.log("API Response:", res);
        if (res && res.code === 0) {
          alert("บันทึกข้อมูลสำเร็จ!");
          this.closeModal();
          return this.getDeatilBehaviour();
        } else {
          alert(res.message || "เกิดข้อผิดพลาด");
        }
      }).catch(err => {
        console.error("Error saving behavior:", err);
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      });
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
}
</style>