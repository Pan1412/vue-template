<template>
    <div>
      <div align="center">
        <div class="block-main">
          <div class="block-bg-main">
            <div class="row">
              <div class="col bgbox2">
                <div>
                  <h3 class="text-left">บันทึกคะเเนนความประพฤติ</h3>
                </div>
                <form @submit.prevent="handleSubmit">
                  <!-- ค้นหาเลขประจำตัวนักเรียน -->
                  <div class="mb-3">
                    <label for="studentId" class="form-label">เลขประจำตัวนักเรียน</label>
                    <input
                      type="text"
                      class="form-control"
                      id="studentId"
                      v-model="studentId"
                      placeholder="กรอกเลขประจำตัวนักเรียน"
                    />
                    <button
                      type="button"
                      class="btn btn-primary mt-2"
                      @click="searchStudent"
                    >
                      ค้นหา
                    </button>
                  </div>
  
                  <div v-if="studentData" class="mb-3">
                    <h5>ข้อมูลนักเรียน:</h5>
                    <p>ชื่อ: {{ studentData.name }}</p>
                    <p>เลขประจำตัว: {{ studentData.id }}</p>
                  </div>
  
                  <!-- กรอกคะแนน -->
                  <div class="mb-3">
                    <label for="deductionScore" class="form-label">คะแนนที่จะทำการหัก</label>
                    <input
                      type="number"
                      class="form-control"
                      id="deductionScore"
                      v-model="deductionScore"
                      placeholder="ระบุคะแนนที่หัก"
                    />
                  </div>
  
                  <!-- บันทึกเหตุการณ์ -->
                  <div class="mb-3">
                    <label for="incidentNote" class="form-label">บันทึกเหตุการณ์</label>
                    <textarea
                      class="form-control"
                      id="incidentNote"
                      rows="4"
                      v-model="incidentNote"
                      placeholder="กรอกเหตุการณ์ที่ต้องการบันทึก"
                    ></textarea>
                  </div>
  
                  <!-- อัปโหลดรูปภาพ -->
                  <div class="mb-3">
                    <label class="form-label">อัปโหลดรูปภาพ (สูงสุด 5 รูป)</label>
                    <input
                      type="file"
                      class="form-control"
                      accept="image/*"
                      multiple
                      @change="handleFileUpload"
                    />
                    <div class="mt-3 row">
                      <div
                        class="col-md-3 mb-2"
                        v-for="(file, index) in previewImages"
                        :key="index"
                      >
                        <div class="preview-container">
                          <img
                            :src="file"
                            alt="Preview"
                            class="img-thumbnail"
                          />
                          <button
                            type="button"
                            class="btn btn-danger btn-sm mt-2 w-100"
                            @click="removeImage(index)"
                          >
                            ลบ
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <button type="submit" class="btn btn-success">
                    บันทึกข้อมูล
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
<script>
import callApi from '../api/callApi'
export default {
    setup() {
        const swal = getCurrentInstance().appContext.config.globalProperties;
        return { swal }
    },
    data() {
        return {
            classSearch: '',
            roomSearch: '',
            nameSearch: '',
            roomList: [1, 2, 3, 4, 5, 6],
            dataSearch: {
                class: '',
                room: '',
                name: '',
                tId: 0
            },

            listStudent: [],
            listTypeBehaviour: [],
            selectedBehavior: [],
            tId: 22,

            studentId: "",
            studentData: null,
            deductionScore: null,
            incidentNote: "",
            files: [],
            previewImages: []
        }
    },

    mounted() {
        let auth = this.getStore().setAuth()

        if (auth) {
            this.tId = auth.id
        }
    },

    methods: {
        vcCheck() {
            if (this.classSearch == 'vc') {
                this.vcGrade = true
                this.roomList = [1, 2, 3]
            } else {
                this.vcGrade = false
                this.roomList = [1, 2, 3, 4, 5, 6]
            }
        },

        searchStudent() {
            if (this.studentId === "12345") {
                this.studentData = { id: "12345", name: "สมชาย ใจดี" };
            } else {
                this.studentData = null;
                alert("ไม่พบนักเรียนที่มีเลขประจำตัวนี้");
            }
        },
        handleFileUpload(event) {
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
        removeImage(index) {
            this.files.splice(index, 1);
            this.previewImages.splice(index, 1);
        },
        handleSubmit() {
            if (!this.studentData) {
                alert("กรุณาค้นหานักเรียนก่อนบันทึกข้อมูล");
                return;
            }
            if (!this.deductionScore || !this.incidentNote) {
                alert("กรุณากรอกข้อมูลให้ครบถ้วน");
                return;
            }
            const formData = new FormData();
            formData.append("studentId", this.studentId);
            formData.append("deductionScore", this.deductionScore);
            formData.append("incidentNote", this.incidentNote);
            this.files.forEach((file, index) => {
                formData.append(`image_${index + 1}`, file);
            });

            console.log("Form data submitted:", formData);
            alert("บันทึกข้อมูลสำเร็จ!");
        },
    },
}
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
</style>