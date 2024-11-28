<template>
    <div>
        <div class="nav-head nav-item">
            <div class="d-flex justify-content-center box-title-nav cursor-main" @click="clickOpenSubMenu()" >
                <Icon name="material-symbols-light:view-list-sharp" class="img-logo-pwks-nav" />
                <h2 class="f-nav fw-400" style="color: var(--color-school);">PWKSs</h2>
            </div>
            <div class="box-sub-nav-icon">
                <p class="navbar-brand color_per text-back-nav" @click="goBack()">
                    <Icon name="material-symbols:arrow-back-2" style="font-size: 1.4rem; margin-right: -3%; margin-top: -2%;" />
                    กลับหน้าเมนูหลัก
                </p>
            </div>
            <!-- <div class="box-sub-nav-icon" v-if="this.getStore().setCheckLogin()" >
                <button type="button" class="btn btn-danger" @click="logout('/')">ออกจากระบบ</button>
            </div>
            <div class="box-sub-nav-icon" v-else-if="!this.getStore().setCheckLogin()" >
                <button type="button" class="btn btn-main" @click="this.gotoPage('/')">เข้าสู่ระบบ</button>
            </div> -->
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

        }
    },
    methods: {
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
}

.nav-head {
    height: 50px;
    width: 100%;
    background-color: var(--color-white);
    box-shadow: 0 4px 12px 0 rgba(1, 27, 42, .14);
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
}

.img-logo-pwks-nav {
    font-size: 32px;
    margin-top: 8%;
    color: var(--color-school);
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
        margin-top: 11%;
        color: var(--color-school);
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
        margin-top: 11%;
        color: var(--color-school);
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
        margin-top: 11%;
        color: var(--color-school);
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
        margin-top: 11%;
        color: var(--color-school);
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
        margin-top: 11%;
        color: var(--color-school);
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
    margin-top: 11%;
    color: var(--color-school);
}
}
</style>