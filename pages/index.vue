<template>
  <div class="login-wrapper fm-kanit">
    <div class="login-form-container">
      <h2 class="login-title">เข้าสู่ระบบ</h2>
      <p class="login-subtitle mt-2">ระบบประเมินจุดแข็งและจุดอ่อน (SDQ)</p>
      
      <div class="alert alert-danger" v-if="errorMessage">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        {{ errorMessage }}
      </div>
      
      <form @submit.prevent="checkStudent" class="login-form">
        <div class="form-group">
          <label for="studentId">รหัสนักเรียน</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-person-fill"></i></span>
            <input 
              type="text" 
              id="studentId" 
              v-model="studentId" 
              class="form-control" 
              placeholder="กรอกรหัสนักเรียน"
              required
              autofocus
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          class="btn btn-primary w-100 login-btn" 
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          {{ isLoading ? 'กำลังตรวจสอบข้อมูล...' : 'ตรวจสอบข้อมูล' }}
        </button>
      </form> 
    </div>
  </div>

  <!-- Modal Popup -->
  <div class="modal fm-kanit" v-if="showModal" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>ข้อมูลนักเรียน</h3>
        <span class="close-btn" @click="closeModal">&times;</span>
      </div>
      <div class="modal-body">
        <!-- แสดงเมื่อไม่พบข้อมูลนักเรียน -->
        <div v-if="!studentInfo" class="student-info-not-found">
          <div class="text-center mb-3">
            <i class="bi bi-exclamation-circle text-danger" style="font-size: 3rem;"></i>
          </div>
          <p class="text-center fs-5 fw-bold text-danger">ไม่พบข้อมูลนักเรียน</p>
          <p class="text-center text-secondary">กรุณาตรวจสอบรหัสนักเรียนอีกครั้ง หรือติดต่อครูที่ปรึกษา</p>
        </div>
        
        <!-- แสดงเมื่อพบข้อมูลนักเรียน -->
        <div v-else class="student-info">
          <p class="student-name">ชื่อนักเรียน: {{ studentInfo.prefix_stu }}{{ studentInfo.name_stu }} {{ studentInfo.surname_stu }}</p>
          <p v-if="studentInfo.class?.toLowerCase() === 'vc'" class="student-detail">ประกาศนียบัตรวิชาชีพ ชั้นปีที่ {{ studentInfo.room }}</p>
          <p v-else="student-detail">ระดับชั้นมัธยมศึกษาปีที่ {{ studentInfo.class }}/{{ studentInfo.room }}</p>
          <p class="student-detail">รหัสนักเรียน: {{ studentInfo.id_school }}</p>
          
          
          <div class="status-container">
            <p class="status-label">สถานะ:</p>
            <p class="status" :class="{ 'completed': sdqExists }">
              {{ sdqExists ?'ทำแบบประเมินแล้ว' :'ยังไม่ได้ทำแบบประเมิน' }}
            </p>
          </div>
          
          <p v-if="sdqExists" class="status-note">
            หากต้องการทำแบบสอบถามอีกครั้ง โปรดติดต่อครูที่ปรึกษาของนักเรียน
          </p>
        </div>
      </div>
      <div class="modal-footer">
        <button v-if="studentInfo && !sdqExists" @click="startAssessment" class="btn btn-primary">
          <Icon name="material-symbols:search" class="icon-status " style="font-size: 1rem; margin-top: -2px;" />ทำแบบประเมิน</button>
        <button @click="closeModal" class="btn" :class="studentInfo && sdqExists ? 'btn-primary' : 'btn-secondary'">
          {{ studentInfo && sdqExists ? 'ปิด' : 'ยกเลิก' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import callApi from "../api/callApi";

export default {
  name: 'LoginPage',
  data() {
    return {
      studentId: '',
      isLoading: false,
      errorMessage: '',
      showModal: false,
      sdqExists: false,
      studentInfo: null,
      isFirstLoad: true
    };
  },
  mounted() {
    // เช็คว่าหน้านี้เคยโหลดมาก่อนหรือไม่ และถ้าเป็นการกลับมา (จาก navigation) ให้รีเฟรชหน้า
    if (window.performance) {
      // ใช้ navigation type เพื่อตรวจสอบว่าเป็นการกลับมา (back/forward) หรือไม่
      if (window.performance.navigation && window.performance.navigation.type === 2) {
        window.location.reload();
      } else if (window.performance.getEntriesByType && window.performance.getEntriesByType("navigation")) {
        // สำหรับ modern browsers ที่ใช้ Navigation Timing API Level 2
        const navigationEntries = window.performance.getEntriesByType("navigation");
        if (navigationEntries.length > 0 && navigationEntries[0].type === 'back_forward') {
          window.location.reload();
        }
      }
    }
    
    // ตรวจสอบจาก sessionStorage
    if (sessionStorage.getItem('needsRefresh') === 'true') {
      sessionStorage.removeItem('needsRefresh');
      window.location.reload();
    }
  },
  methods: {
    async checkStudent() {
      if (!this.studentId) {
        this.errorMessage = 'กรุณากรอกรหัสนักเรียน';
        return;
      }

      this.isLoading = true;
      this.errorMessage = '';

      try {
        await this.checkStatus(this.studentId);
      } catch (error) {
        this.errorMessage = 'เกิดข้อผิดพลาดในการตรวจสอบข้อมูล กรุณาลองใหม่อีกครั้ง';
        console.error('Error:', error);
      } finally {
        this.isLoading = false;
      }
    },
    
    async checkStatus(studentId) {
      try {
        // ดึงข้อมูลปีการศึกษา
        const year_res = await callApi.getYear();
        if (!year_res.result || !year_res.result.length || !year_res.result[0].year) {
          this.errorMessage = "เกิดข้อผิดพลาดในการดึงข้อมูลปีการศึกษา";
          return;
        }
        
        const year = year_res.result[0].year;
        const req = {
          s_id: studentId,
          year: year
        }
        
        // เรียก API เพื่อตรวจสอบสถานะ
        const res = await callApi.CheckSdqParentStatus(req);
        
        if (res.code === 0) {
          // บันทึกข้อมูลที่ได้รับจาก API
          this.sdqExists = res.sdqExists;
          
          // ตรวจสอบว่าข้อมูลนักเรียนเป็น null หรือไม่
          if (res.studentInfo === null) {
            this.studentInfo = null;
          } else {
            this.studentInfo = res.studentInfo;
          }
          
          // แสดง Modal
          this.showModal = true;
        } else {
          this.errorMessage = "ไม่สามารถตรวจสอบข้อมูลได้ กรุณาลองใหม่อีกครั้ง";
        }
      } catch (error) {
        this.errorMessage = "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง";
        console.error("Error checking status:", error);
      }
    },
    
    startAssessment() {
      if (this.studentInfo && this.studentInfo.id_school) {
        // ตั้งค่า sessionStorage เพื่อให้รู้ว่าจะต้อง refresh เมื่อกลับมา
        sessionStorage.setItem('needsRefresh', 'true');
        
        this.$router.push({
          path: "/parents/question/",
          query: { studentId: this.studentInfo.id_school },
        });
      } else {
        this.errorMessage = "ไม่สามารถทำแบบประเมินได้เนื่องจากไม่พบข้อมูลนักเรียน";
        this.closeModal();
      }
    },
    
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@300;400;500;600;700&display=swap');
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css');

.login-wrapper {
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  
  padding-top: 100px;
}

.login-form-container {
  width: 100%;
  max-width: 500px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  text-align: center;
}

.login-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
  font-size: 1.75rem;
}

.login-subtitle {
  color: #6c757d;
  font-size: 1rem;
  margin-bottom: 25px;
}

.login-form {
  text-align: left;
  
  .form-group {
    margin-bottom: 20px;
    
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #495057;
    }
  }
  
  .input-group-text {
    background-color: #f8f9fa;
    border-right: none;
    
    i {
      color: #6c757d;
    }
  }
  
  .form-control {
    border-left: none;
    font-size: 1rem;
    padding: 10px 15px;
    
    &:focus {
      box-shadow: none;
      border-color: #ced4da;
    }
  }
}

.login-btn {
  padding: 10px;
  font-weight: 500;
  font-size: 1rem;
  background-color: #0d6efd;
  border-color: #0d6efd;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background-color: #0b5ed7;
    border-color: #0a58ca;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.alert {
  margin-bottom: 20px;
  padding: 10px 15px;
  font-size: 0.9rem;
  border-radius: 5px;
}

/* Modal Styles */
.modal {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  
}

.modal-content {
  position: relative;
  background-color: #fff;
  margin: 10% auto;
  padding: 0;
  width: 90%;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  animation: modalFadeIn 0.3s;
}

@keyframes modalFadeIn {
  from {opacity: 0; transform: translateY(-20px);}
  to {opacity: 1; transform: translateY(0);}
}

.modal-header {
  padding: 15px 20px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    margin: 0;
    font-weight: 600;
    color: #333;
  }
  
  .close-btn {
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 1;
    color: #aaa;
    cursor: pointer;
    
    &:hover {
      color: #333;
    }
  }
}

.modal-body {
  padding: 20px;
}

.student-info-not-found {
  padding: 20px 0;
  
  i {
    display: block;
    margin-bottom: 15px;
  }
  
  p {
    margin-bottom: 10px;
  }
}

.student-info {
  .student-name {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #333;
  }
  
  .student-detail {
    margin-bottom: 5px;
    color: #555;
  }
  
  .status-container {
    display: flex;
    align-items: center;
    margin: 15px 0;
    
    .status-label {
      font-weight: 500;
      margin-right: 10px;
      margin-bottom: 0;
    }
    
    .status {
      font-weight: 600;
      color: #dc3545;
      margin-bottom: 0;
      
      &.completed {
        color: #198754;
      }
    }
  }
  
  .status-note {
    font-size: 0.9rem;
    color: #6c757d;
    font-style: italic;
    margin-top: 10px;
  }
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  
  .btn {
    padding: 8px 20px;
    font-weight: 500;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &.btn-primary {
      background-color: #0d6efd;
      border-color: #0d6efd;
      color: #fff;
      
      &:hover {
        background-color: #0b5ed7;
      }
    }
    
    &.btn-secondary {
      background-color: #6c757d;
      border-color: #6c757d;
      color: #fff;
      
      &:hover {
        background-color: #5c636a;
      }
    }
  }
}
</style>