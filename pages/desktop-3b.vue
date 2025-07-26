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
              <!-- เรียกใช้ showCurrentViewModal เมื่อคลิกปุ่ม View -->
              <button @click="showCurrentViewModal" class="btn btn-dark btn-sm rounded me-2">View</button>
              <button @click="showHelpAlert" class="btn btn-light btn-sm rounded">Help</button>

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
                <!-- เปลี่ยนเป็นปุ่มจริงที่เรียกใช้ dropdown -->
                <div class="dropdown">
                  <button 
                    @click="toggleStudentCodeDropdown"
                    class="btn btn-outline-secondary btn-sm w-100 text-start dropdown-toggle"
                    type="button"
                  >
                    {{ selectedStudentCode ? 'นักศึกษารหัส ' + selectedStudentCode : 'เลือกรุ่นรหัสนักศึกษา' }}
                    <i class="fas fa-chevron-down float-end mt-1"></i>
                  </button>
                  <div class="dropdown-menu w-100" :class="{ show: showStudentCodeDropdown }">
                    <a class="dropdown-item" href="#" @click.prevent="selectStudentCode('')">ทั้งหมด</a>
                    <a class="dropdown-item" href="#" @click.prevent="selectStudentCode('62')">รหัส 62</a>
                    <a class="dropdown-item" href="#" @click.prevent="selectStudentCode('63')">รหัส 63</a>
                    <a class="dropdown-item" href="#" @click.prevent="selectStudentCode('64')">รหัส 64</a>
                    <a class="dropdown-item" href="#" @click.prevent="selectStudentCode('65')">รหัส 65</a>
                    <a class="dropdown-item" href="#" @click.prevent="selectStudentCode('66')">รหัส 66</a>
                    <a class="dropdown-item" href="#" @click.prevent="selectStudentCode('67')">รหัส 67</a>
                  </div>
                </div>
              </div>
              <div class="filter-select flex-grow-1">
                <!-- เปลี่ยนเป็นปุ่มจริงที่เรียกใช้ dropdown -->
                <div class="dropdown">
                  <button 
                    @click="toggleEducationLevelDropdown"
                    class="btn btn-outline-secondary btn-sm w-100 text-start dropdown-toggle"
                    type="button"
                  >
                    {{ selectedEducationLevel ? 'นักศึกษา' + selectedEducationLevel : 'เลือกระดับการศึกษา' }}
                    <i class="fas fa-chevron-down float-end mt-1"></i>
                  </button>
                  <div class="dropdown-menu w-100" :class="{ show: showEducationLevelDropdown }">
                    <a class="dropdown-item" href="#" @click.prevent="selectEducationLevel('')">ทั้งหมด</a>
                    <a class="dropdown-item" href="#" @click.prevent="selectEducationLevel('ป.ตรี')">ป.ตรี</a>
                    <a class="dropdown-item" href="#" @click.prevent="selectEducationLevel('ป.โท')">ป.โท</a>
                    <a class="dropdown-item" href="#" @click.prevent="selectEducationLevel('ป.เอก')">ป.เอก</a>
                  </div>
                </div>
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

    <!-- Modal Component -->
    <div v-if="showModal" class="modal-overlay" @click="closeModalOnOverlayClick">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h5 class="modal-title">ข้อมูลที่แสดงปัจจุบัน</h5>
          <button @click="showModal = false" class="modal-close">&times;</button>
        </div>
        <div class="modal-divider"></div>
        <div class="modal-body">
          <p class="text-center">สถิติการออกรหัสนักศึกษา และการละสิทธิ์เป็นนักศึกษา</p>
          <h2 class="text-center text-primary mb-2">{{ currentViewText }}</h2>
          <p class="text-center">ปีการศึกษา 2567</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Modal state
const showModal = ref(false)

// Filter selections
const selectedStudentCode = ref('')
const selectedEducationLevel = ref('')

// Dropdown toggles
const showStudentCodeDropdown = ref(false)
const showEducationLevelDropdown = ref(false)

// Toggle dropdowns
const toggleStudentCodeDropdown = () => {
  showStudentCodeDropdown.value = !showStudentCodeDropdown.value
  if (showStudentCodeDropdown.value) {
    showEducationLevelDropdown.value = false
  }
}

const toggleEducationLevelDropdown = () => {
  showEducationLevelDropdown.value = !showEducationLevelDropdown.value
  if (showEducationLevelDropdown.value) {
    showStudentCodeDropdown.value = false
  }
}

// Select options
const selectStudentCode = (code) => {
  selectedStudentCode.value = code
  showStudentCodeDropdown.value = false
}

const selectEducationLevel = (level) => {
  selectedEducationLevel.value = level
  showEducationLevelDropdown.value = false
}

// Close dropdowns when clicking outside
const closeDropdowns = (e) => {
  if (!e.target.closest('.dropdown')) {
    showStudentCodeDropdown.value = false
    showEducationLevelDropdown.value = false
  }
}

// Event listeners for clicking outside
onMounted(() => {
  document.addEventListener('click', closeDropdowns)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropdowns)
})

// Close modal when clicking on overlay
const closeModalOnOverlayClick = (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    showModal.value = false
  }
}

// Show modal with current view text
const showCurrentViewModal = () => {
  showModal.value = true
}

const showHelpAlert = () => {
  alert('คุณสามารถเลือกกรองรุ่นรหัสนักศึกษาและเลือกระดับการศึกษาได้ด้วย')
}

// Compute current view text based on selections
const currentViewText = computed(() => {
  if (selectedStudentCode.value && selectedEducationLevel.value) {
    return `นักศึกษา${selectedEducationLevel.value} รหัส ${selectedStudentCode.value}`
  } else if (selectedStudentCode.value) {
    return `นักศึกษารหัส ${selectedStudentCode.value}`
  } else if (selectedEducationLevel.value) {
    return `นักศึกษา${selectedEducationLevel.value}`
  } else {
    return 'นักศึกษาระดับปริญญาตรี'
  }
})

// Sample data for the table
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
    position: relative;
    
    .dropdown-toggle {
      background-color: #fff;
      border-color: #ddd;
      font-size: 0.85rem;
      padding: 0.5rem;
      color: #555;
      border-radius: 0.2rem;
      text-align: left;
      
      &:hover {
        background-color: #f8f8f8;
      }
      
      &::after {
        display: none;
      }
      
      i {
        font-size: 0.75rem;
      }
    }
    
    .dropdown-menu {
      padding: 0.5rem 0;
      margin-top: 0.25rem;
      border: 1px solid #ddd;
      border-radius: 0.2rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      display: none;
      
      &.show {
        display: block;
      }
    }
    
    .dropdown-item {
      font-size: 0.85rem;
      padding: 0.4rem 0.75rem;
      color: #555;
      
      &:hover {
        background-color: #f5f5f5;
      }
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

// Modal styles
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  width: 90%;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.modal-title {
  font-size: 1.25rem;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
}

.modal-divider {
  height: 1px;
  background-color: #eee;
  margin: 0.5rem -1.5rem 1.5rem;
}

.modal-body {
  h2 {
    color: #6558d3;
    font-size: 1.75rem;
    font-weight: 500;
  }
  
  p {
    color: #666;
    margin-bottom: 0.5rem;
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