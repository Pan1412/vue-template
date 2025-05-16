<template>
    <div>
        <div class="nav-head nav-item">
            <div class="d-flex justify-content-center box-title-nav cursor-main" @click="toggleSidebar()">
                <Icon name="material-symbols-light:view-list-sharp" class="img-logo-pwks-nav" style="font-size: 1.8rem; margin-top: 7px;" />
                <h4 class="f-nav fw-400 fm-kanit">Questionnaire</h4>
            </div>
            <div class="box-sub-nav-icon">
                <p class="navbar-brand text-back-nav fm-kanit" @click="goBack()">
                    <Icon name="material-symbols:arrow-back-2" style="font-size: 1.4rem; margin-right: -3%; margin-top: -2%;" />
                    กลับหน้าเมนูหลัก
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup() {
        return {}
    },
    data() {
        return {
            isMobile: false
        }
    },
    mounted() {
        // ตรวจสอบขนาดหน้าจอเมื่อโหลดหน้า
        this.checkScreenSize();
        // เพิ่ม event listener สำหรับการเปลี่ยนขนาดหน้าจอ
        window.addEventListener('resize', this.checkScreenSize);
    },
    beforeDestroy() {
        // ลบ event listener เมื่อ component ถูกทำลาย
        window.removeEventListener('resize', this.checkScreenSize);
    },
    methods: {
        // เปิด/ปิด sidebar
        toggleSidebar() {
            let currentState = this.getStore().setCheckSideMenu();
            this.getStore().setCheckSideMenu(!currentState);
        },
        
        // ตรวจสอบขนาดหน้าจอและกำหนดค่า isMobile
        checkScreenSize() {
            this.isMobile = window.innerWidth < 768; // 768px เป็นขนาด md ของ Bootstrap
            
            // ถ้าไม่ใช่มือถือ ให้แสดง sidebar เสมอ
            if (!this.isMobile) {
                this.getStore().setCheckSideMenu(true);
            } else {
                // ถ้าเป็นมือถือ เริ่มต้นให้ซ่อน sidebar
                this.getStore().setCheckSideMenu(false);
            }
        },
        
        clickOpenSubMenu() {
            let check = this.getStore().setCheckSideMenu()

            if(check){
                this.getStore().setCheckSideMenu(false)
            }else{
                this.getStore().setCheckSideMenu(true)
            }
        },

        gotoIndex(){
            this.gotoPage('/main')
        },

        logout() {
            this.isModal = true
            this.typeModal = 'loading'

            this.$cookies.removeCookie('access_login')
            let logout = this.getStore().resetAuth()

            if (logout) {
                this.isModal = false
                this.typeModal = ''

                setTimeout(() => {
                    // window.location.href = '/pwks-ui/login'
                    window.location.href = `${this.$config.public.baseURL}`
                }, 500);
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.text-back-nav {
    margin: unset;
    padding: unset;
    cursor: pointer;
    color: white; /* เปลี่ยนสีข้อความเป็นสีขาว */
}

.nav-head {
    height: 50px;
    width: 100%;
    background-color: #222; /* เปลี่ยนพื้นหลังเป็นสีดำ */
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, .2);
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
}

.nav-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.box-title-nav {
    margin-left: 2rem;
}

.box-sub-nav-icon {
    margin-right: 2rem;
}

.f-nav {
    margin-top: 0.4rem;
    color: white; /* เปลี่ยนสีข้อความเป็นสีขาว */
}

.img-logo-pwks-nav {
    font-size: 32px;
    margin-top: 10px;
    color: white; /* เปลี่ยนสีไอคอนเป็นสีขาว */
}

@media screen and (min-width: 320px) and (max-width: 360px) {
    .nav-head {
        height: 36px;
    }

    .box-title-nav {
        margin-left: 1rem;
    }

    .box-sub-nav-icon {
        margin-right: 1rem;
    }

    .f-nav {
        font-size: 1.2rem;
    }

    .img-logo-pwks-nav {
        font-size: 1.3rem;
        margin-top: 5px;
        color: white; /* เปลี่ยนสีไอคอนเป็นสีขาว */
    }
}

@media screen and (min-width: 360px) and (max-width: 375px) {
    .nav-head {
        height: 36px;
    }

    .box-title-nav {
        margin-left: 1rem;
    }

    .box-sub-nav-icon {
        margin-right: 1rem;
    }

    .f-nav {
        font-size: 1.2rem;
    }

    .img-logo-pwks-nav {
        font-size: 1.3rem;
        margin-top: 8px;
        color: white; /* เปลี่ยนสีไอคอนเป็นสีขาว */
    }
}

@media screen and (min-width: 375px) and (max-width: 390px) {
    .nav-head {
        height: 36px;
    }

    .box-title-nav {
        margin-left: 1rem;
    }

    .box-sub-nav-icon {
        margin-right: 1rem;
    }

    .f-nav {
        font-size: 1.2rem;
    }

    .img-logo-pwks-nav {
        font-size: 1.3rem;
        margin-top: 8px;
        color: white; /* เปลี่ยนสีไอคอนเป็นสีขาว */
    }
}

@media screen and (min-width: 390px) and (max-width: 420px) {
    .nav-head {
        height: 36px;
    }

    .box-title-nav {
        margin-left: 1rem;
    }

    .box-sub-nav-icon {
        margin-right: 1rem;
    }

    .f-nav {
        font-size: 1.2rem;
    }

    .img-logo-pwks-nav {
        font-size: 1.3rem;
        margin-top: 8px;
        color: white; /* เปลี่ยนสีไอคอนเป็นสีขาว */
    }
}

@media screen and (min-width: 420px) and (max-width: 490px) {
    .nav-head {
        height: 36px;
    }

    .box-title-nav {
        margin-left: 1rem;
    }

    .box-sub-nav-icon {
        margin-right: 1rem;
    }

    .f-nav {
        font-size: 1.2rem;
    }

    .img-logo-pwks-nav {
        font-size: 1.3rem;
        margin-top: 8px;
        color: white; /* เปลี่ยนสีไอคอนเป็นสีขาว */
    }
}

@media screen and (min-width: 490px) and (max-width: 589px) {
    .nav-head {
        height: 36px;
    }

    .box-title-nav {
        margin-left: 1rem;
    }

    .box-sub-nav-icon {
        margin-right: 1rem;
    }

    .f-nav {
        font-size: 1.2rem;
    }

    .img-logo-pwks-nav {
        font-size: 1.3rem;
        margin-top: 7px;
        color: white; /* เปลี่ยนสีไอคอนเป็นสีขาว */
    }
}
</style>