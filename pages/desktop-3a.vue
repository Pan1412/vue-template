<template>
  <div>
    <div class="breadcrumb-wrapper bg-light py-3 px-4">
      <div class="d-flex">
        <a href="#" class="me-2"><img src="~/assets/image/CMU.png" alt="หน้าแรก" class="home-icon" /></a>
        <a href="#" class="me-2"> > หน้าแรก</a>
        <a href="#" class="me-2"> > สถิติข้อมูลนักศึกษา</a>
        <span class="text-muted"> > ออกรหัสและละสิทธิ์</span>
      </div>
    </div>

    <!-- Main content area with light background and subtle pattern -->
    <div class="main-content-area">
      <div class="statistics-container">
        <!-- Left side - Title section -->
        <div class="d-flex justify-content-between align-items-start mb-5">
          <div>
            <p class="mb-0 text-secondary small">Student Statistics</p>
            <p class="registration-title">Registration Office</p>
          </div>
          
          <!-- Right side - Description and buttons -->
          <div class="text-end">
            <p class="thai-description mb-2">
              สถิติการออกรหัสนักศึกษา และการละสิทธิ์เป็นนักศึกษามหาวิทยาลัยเชียงใหม่ ปีการศึกษา 2567
            </p>
            <div class="action-buttons">
              <button class="btn btn-dark btn-sm rounded me-2">View</button>
              <button class="btn btn-light btn-sm rounded">Help</button>
            </div>
          </div>
        </div>

        <!-- Filter selection section -->
        <div class="filter-section mb-3">
          <div class="d-flex">
            <div class="filter-label me-3">
              <span class="text-muted">ตัวกรองจำนวนสถิติ</span>
            </div>
            <div class="d-flex flex-grow-1">
              <div class="filter-select me-2 flex-grow-1">
                <select class="form-select form-select-sm" v-model="selectedFaculty">
                  <option value="" disabled selected>เลือกรูปแบบนักศึกษา</option>
                  <option v-for="faculty in faculties" :key="faculty">{{ faculty }}</option>
                </select>
              </div>
              <div class="filter-select flex-grow-1">
                <select class="form-select form-select-sm" v-model="selectedEducationSystem">
                  <option value="" disabled selected>เลือกกระบวนการศึกษา</option>
                  <option v-for="system in educationSystems" :key="system">{{ system }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Statistics Table -->
        <div class="statistics-table-wrapper">
          <table class="table table-bordered statistics-table">
            <thead class="table-light">
              <tr>
                <th rowspan="2" class="text-center align-middle">นักศึกษาจากคณะ</th>
                <th colspan="3" class="text-center">ออกรหัสทั้งสิ้น</th>
                <th colspan="3" class="text-center">ละสิทธิ์</th>
                <th colspan="3" class="text-center">คงเหลือนักศึกษา</th>
              </tr>
              <tr>
                <th class="text-center">ชาย</th>
                <th class="text-center">หญิง</th>
                <th class="text-center">รวม</th>
                <th class="text-center">ชาย</th>
                <th class="text-center">หญิง</th>
                <th class="text-center">รวม</th>
                <th class="text-center">ชาย</th>
                <th class="text-center">หญิง</th>
                <th class="text-center">รวม</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(faculty, index) in facultyData" :key="index">
                <td>{{ faculty.name }}</td>
                <td class="text-center">{{ faculty.registered.male }}</td>
                <td class="text-center">{{ faculty.registered.female }}</td>
                <td class="text-center">{{ faculty.registered.total }}</td>
                <td class="text-center">{{ faculty.withdrawn.male }}</td>
                <td class="text-center">{{ faculty.withdrawn.female }}</td>
                <td class="text-center">{{ faculty.withdrawn.total }}</td>
                <td class="text-center">{{ faculty.remaining.male }}</td>
                <td class="text-center">{{ faculty.remaining.female }}</td>
                <td class="text-center">{{ faculty.remaining.total }}</td>
              </tr>
              <tr class="total-row">
                <td class="fw-bold">รวมทั้งหมด</td>
                <td class="text-center">{{ totals.registered.male }}</td>
                <td class="text-center">{{ totals.registered.female }}</td>
                <td class="text-center">{{ totals.registered.total }}</td>
                <td class="text-center">{{ totals.withdrawn.male }}</td>
                <td class="text-center">{{ totals.withdrawn.female }}</td>
                <td class="text-center">{{ totals.withdrawn.total }}</td>
                <td class="text-center">{{ totals.remaining.male }}</td>
                <td class="text-center">{{ totals.remaining.female }}</td>
                <td class="text-center">{{ totals.remaining.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer-wrapper mt-5 pt-3 border-top">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <span class="small text-muted">© 2024 Chiang Mai University. All rights reserved.</span>
          <a href="#" class="small text-dark text-decoration-none ms-3">Privacy Policy</a>
          <a href="#" class="small text-dark text-decoration-none ms-3">Terms of Service</a>
          <a href="#" class="small text-dark text-decoration-none ms-3">Cookies Settings</a>
        </div>
        <div class="social-icons">
          <a href="#" class="me-2"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="me-2"><i class="fab fa-instagram"></i></a>
          <a href="#" class="me-2"><i class="fab fa-twitter"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Filter selections
const selectedFaculty = ref('')
const selectedEducationSystem = ref('')

// Dummy data for dropdowns
const faculties = ref([
  'คณะวิศวกรรมศาสตร์',
  'คณะวิทยาศาสตร์',
  'คณะแพทยศาสตร์',
  'คณะมนุษยศาสตร์',
  'คณะสังคมศาสตร์'
])

const educationSystems = ref([
  'ภาคปกติ',
  'ภาคพิเศษ',
  'นานาชาติ',
  'ทวิภาค'
])

// Sample data for the table - matching exactly what's in the image
const facultyData = ref([
  {
    name: 'ชื่อคณะต่างๆ',
    registered: { male: 'เลขจำนวน', female: 'เลขจำนวน', total: 'เลขจำนวน' },
    withdrawn: { male: 'เลขจำนวน', female: 'เลขจำนวน', total: 'เลขจำนวน' },
    remaining: { male: 'เลขจำนวน', female: 'เลขจำนวน', total: 'เลขจำนวน' }
  },
  {
    name: 'ชื่อคณะต่างๆ',
    registered: { male: 'เลขจำนวน', female: 'เลขจำนวน', total: 'เลขจำนวน' },
    withdrawn: { male: 'เลขจำนวน', female: 'เลขจำนวน', total: 'เลขจำนวน' },
    remaining: { male: 'เลขจำนวน', female: 'เลขจำนวน', total: 'เลขจำนวน' }
  },
  {
    name: 'ชื่อคณะต่างๆ',
    registered: { male: 'เลขจำนวน', female: 'เลขจำนวน', total: 'เลขจำนวน' },
    withdrawn: { male: 'เลขจำนวน', female: 'เลขจำนวน', total: 'เลขจำนวน' },
    remaining: { male: 'เลขจำนวน', female: 'เลขจำนวน', total: 'เลขจำนวน' }
  },
  {
    name: 'ชื่อคณะต่างๆ',
    registered: { male: 'เลขจำนวน', female: 'เลขจำนวน', total: 'เลขจำนวน' },
    withdrawn: { male: 'เลขจำนวน', female: 'เลขจำนวน', total: 'เลขจำนวน' },
    remaining: { male: 'เลขจำนวน', female: 'เลขจำนวน', total: 'เลขจำนวน' }
  },
  {
    name: 'ชื่อคณะต่างๆ',
    registered: { male: 'เลขจำนวน', female: 'เลขจำนวน', total: 'เลขจำนวน' },
    withdrawn: { male: 'เลขจำนวน', female: 'เลขจำนวน', total: 'เลขจำนวน' },
    remaining: { male: 'เลขจำนวน', female: 'เลขจำนวน', total: 'เลขจำนวน' }
  }
])

// Computed totals
const totals = computed(() => {
  return {
    registered: { male: 'เลขจำนวน', female: 'เลขจำนวน', total: 'เลขจำนวน' },
    withdrawn: { male: 'เลขจำนวน', female: 'เลขจำนวน', total: 'เลขจำนวน' },
    remaining: { male: 'เลขจำนวน', female: 'เลขจำนวน', total: 'เลขจำนวน' }
  }
})
</script>

<style lang="scss" scoped>
// Main container styles
:deep(.home-icon) {
  width: 18px;
  height: 18px;
}

.breadcrumb-wrapper {
  font-size: 0.85rem;
  
  a {
    color: purple;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.main-content-area {
  background-color: #f9f9fc;
  background-image: linear-gradient(to bottom right, rgba(255,255,255,0.7) 0%, rgba(240,240,252,0.8) 100%);
  min-height: 75vh;
  padding: 2rem;
}

.statistics-container {
  max-width: 1200px;
  margin: 0 auto;
}

// Title and header section
.registration-title {
  font-size: 3rem;
  font-weight: 400;
  margin-top: 0rem;
  margin-bottom: 0;
  color: black;
}

.thai-description {
  font-size: 0.9rem;
  color: #555;
  max-width: 400px;
  margin-left: auto;
}

.action-buttons {
  .btn {
    font-size: 0.8rem;
    padding: 0.25rem 1rem;
    
    &.btn-dark {
      background-color: #333;
      border: none;
    }
    
    &.btn-light {
      background-color: #f0f0f0;
      border: 1px solid #ddd;
      color: #333;
    }
  }
}

// Filter section
.filter-section {
  margin-top: 3rem;
  
  .filter-label {
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    width: 130px;
  }
  
  .filter-select {
    .form-select {
      border-radius: 0.2rem;
      border-color: #ddd;
      font-size: 0.85rem;
      padding: 0.5rem;
      color: #555;
    }
  }
}

// Statistics table styles
.statistics-table-wrapper {
  margin-top: 1rem;
  
  .statistics-table {
    border: 1px solid #e9e9e9;
    font-size: 0.85rem;
    
    th, td {
      padding: 0.6rem;
      vertical-align: middle;
      border-color: #e9e9e9;
    }
    
    thead {
      background-color: #f8f9fa;
      
      th {
        font-weight: 600;
        color: #444;
      }
    }
    
    tbody {
      tr:nth-child(even) {
        background-color: #fafafa;
      }
      
      td {
        color: #555;
      }
    }
  }
  
  .total-row {
    background-color: #f5f5f5 !important;
    font-weight: 600;
  }
}

// Footer styles
.footer-wrapper {
  padding: 1rem 2rem;
  border-color: #eee;
  margin-top: 2rem;
  
  a {
    color: #555;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  .social-icons {
    a {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background-color: #f5f5f5;
      color: #555;
      
      &:hover {
        background-color: #ececec;
      }
    }
  }
}

// Responsive styles
@media (max-width: 768px) {
  .main-content-area {
    padding: 1rem;
  }
  
  .d-flex {
    flex-direction: column;
    
    &.justify-content-between {
      align-items: flex-start;
    }
  }
  
  .thai-description {
    margin-left: 0;
    margin-top: 1rem;
    max-width: 100%;
  }
  
  .filter-section .d-flex {
    flex-direction: column;
    
    .filter-select {
      margin-top: 0.5rem;
      width: 100%;
    }
  }
}
</style>