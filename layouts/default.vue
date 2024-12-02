<template>
    <div>

        <Head>
            <Title>{{ titleWeb }}</Title>
        </Head>

        <!-- สำหรับนักเรียน -->
        <div v-if="rollCheck == 'student'">

            <nav class="navbar fixed-top bg-body-tertiary">
                <div class="container-fluid fm-kanit">
                    <div class="color_per fw-500">{{ hTitle }}</div>
                    <div><a class="color_per" href="#">
                            <Icon name="material-symbols:arrow-back-2" style="font-size: 1.4rem;" />กลับหน้าเมนูหลัก
                        </a></div>
                </div>
            </nav>

            <div class="" style="margin-top: 70px;">
                <div align="center">
                    <img src="../assets/image/header3.png" width="450" class="img-fluid">
                    <!-- <h1 class="sriracha-font stroke text-white text-head-club">{{ title }}</h1> -->
                </div>
            </div>

            <div class="container">
                <slot />
            </div>
        </div>

        <!-- สำหรับครูและแอดมิน -->
        <div v-if="rollCheck == 'admin' || rollCheck == 'teacher'">

            <NavBarHeader v-if="!checkPrint" />

            <div class="position-box-main">
                <div v-if="checkLogin && this.getStore().setCheckSideMenu() && !checkPrint">
                    <SubMenuNav />
                </div>

                <main class="main mg-t-body scroll-main">
                    <slot />
                    <!-- <footer v-if="checkLogin && !checkPrint">
                        <div align="center">
                            <div class="block-main" style="margin-top: unset !important">
                                <div class="block-bg-main box-footer mb-5"
                                    style="border-radius: 0 0 10px 10px !important;">
                                    <div style="padding-top: 3rem;">
                                        <div class="divider-solid" style="height: 1px; width: 95%;"></div>
                                    </div>

                                    <div class="p-4" v-html="footerWeb"> </div>
                                </div>
                            </div>
                        </div>
                    </footer> -->
                </main>
            </div>

        </div>
    </div>
</template>

<script>
import callApi from '../api/callApi';

export default {

    setup() {

        return {}
    },

    data() {
        return {
            titleWeb: 'PWKSs BEHAVIOR-SCORE',
            footerWeb: '',
            checkLogin: true,
            checkPrint: false,
            title: 'ระบบจัดการข้อมูลสำหรับครู',
            hTitle: 'คะแนนความประพฤติ',
            subTitle: '',
            rollCheck: '',
        }
    },

    created() {


    },

    async mounted() {
        let checkQuery = this.$route.query

        if (this.$route.name == 'index') {
            if (!checkQuery.username || !checkQuery.roll) {
                alert('ไม่พบผู้ใช้งาน กรุณาเข้าสู่ระบบ')
                return
            }

            let username = decodeURIComponent(escape(atob(checkQuery.username)));
            let roll = decodeURIComponent(escape(atob(checkQuery.roll)));

            await this.getInfoUser(username, roll)
        }

        if (this.getStore().setAuth()) {
            if (this.getStore().setAuth().roll == 'student') {

                this.title = 'ระบบคะเเนนความประพฤติ'
                this.subTitle = 'ตรวจสอบคะเเนนความประพฤติ'
            } else if (this.getStore().setAuth().roll == 'teacher') {
                this.title = 'ระบบจัดการข้อมูลสำหรับครู'
                this.subTitle = 'จัดการคะเเนนความประพฤติ'
            }

            this.rollCheck = this.getStore().setAuth().roll
        }


    },
    methods: {
        async getInfoUser(username, roll) {
            await callApi.getInfoClubUser({ username, roll }).then(res => {
                if (res.code == 0) {
                    let sortObj = { ...res.result }
                    sortObj.roll = roll
                    this.getStore().setAuth(sortObj)

                    if (roll == 'student') {
                        window.location.href = this.$config.public.baseURL + 'student/main'
                    } else if (roll == 'teacher') {
                        window.location.href = this.$config.public.baseURL + 'teacher/main'
                    } else if (roll == 'admin') {
                        window.location.href = this.$config.public.baseURL + 'admin/'
                    }
                } else {
                    alert('ไม่พบผู้ใช้งาน กรุณาเข้าสู่ระบบ')
                }
            }).catch(err => {

            })
        },

        async setFooter() {
            let getSetting = await callApi.getSetting()

            if (getSetting.length == 1) {
                let footerSplit = getSetting[0].footer.split('_')
                let text = '';
                let check = 0;

                for (const f of footerSplit) {
                    if (check == 0) {
                        text = text + f
                        check++
                    } else {
                        text = text + `<br/>${f}`
                    }

                }

                this.footerWeb = text
            }

        },

        checkPath() {
            let link = this.$route.path
            let splits = link.split("/");
            let check = false;

            for (let i = 0; i < splits.length; i++) {
                if (splits[i] == printStudent) {
                    check = true
                    break;
                }

            }

            return check;
        }
    },
}
</script>

<style lang="scss" scoped>
.img-logo {
    width: 200px;
    height: 92px;
}

.text-head-club {
    font-size: 2.5rem;
}

.text-sub-font-club {
    font-size: 1.25rem;
}

.mg-t-body {
    padding-top: 50px;
    flex-grow: 1;
}

.position-box-main {
    display: flex;
    margin: 0;
    height: 100vh;
    overflow: hidden;
}

.scroll-main {
    overflow-y: auto;
    overflow-x: auto;
}

.main {
  height: 100%;
  min-height: calc(100vh - 352px);
  width: 100%;
}

.box-tab-nav {
    width: 270px;
    background-color: #bababa;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-radius: 5px;
}

.box-label-btn {
    padding: 2px;
    cursor: pointer;
}

.box-label-btn-active {
    background-color: rgb(125, 52, 243);
    color: white;
    border-radius: inherit;
}

.mg-t-nav {
    margin-top: 50px;
}

.sub-main-box {
    background-color: white;
    width: 320px;
}

.bg-sub-nav {
    background-color: rgb(106, 106, 106);
    width: 100%;
    opacity: 0.5;

}

.box-main-sub-nav-menu {
    width: 300px;
    min-height: 200vh;
    overflow-y: auto;
    display: block;
}

.box-profile-nav {
    display: flex;
    justify-content: center;
}

.box-img-profile-nav {
    width: 64px;
    height: 64px;
    border-radius: 50px;
    border: 3px solid var(--color-primary);
}

.divider-solid {
    height: 1px;
}

.grid-nav-sub-menu {
    display: grid;
    justify-items: center;
}

.grid-column-sub-menu {
    grid-template-columns: 1fr;
}

.box-menu {
    width: 250px;
    height: auto;
    background-color: rgb(125, 52, 243);
    border-radius: 5px;
    box-shadow: 5px 5px 12px 0 rgb(175, 175, 175);
}

.box-menu-multi {
    width: 124px;
    height: auto;
    background-color: rgb(125, 52, 243);
    border-radius: 5px;
    box-shadow: 5px 5px 12px 0 rgb(175, 175, 175);
}

.box-not-allow {
    background-color: #a4a4a4 !important;
    box-shadow: unset !important;
    width: 250px;
    height: auto;
    border-radius: 5px;
    cursor: not-allowed !important;
}

.box-head-menu {
    width: 300px;
    display: grid;
    grid-template-columns: 25% 75%;
}

.font-head-menu {
    margin-top: 7%;
    font-size: 13px;
    margin-bottom: 0 !important;
    color: #909294;
}

.scroll-select-menu {
    overflow-y: scroll;
    overflow-x: hidden;
}

.size-menu {
    padding: 0.5rem;
    color: white;
}

@media screen and (min-width: 320px) and (max-width: 589px) {
    .mg-t-nav {
        margin-top: 36px;
    }
}

a:link {
    text-decoration: none;
}

a:visited {
    text-decoration: none;
}

a:hover {
    text-decoration: none;
}

a:active {
    text-decoration: none;
}
</style>