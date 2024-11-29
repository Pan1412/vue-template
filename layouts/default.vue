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
                    <div><a class="color_per" href="#"><Icon name="material-symbols:arrow-back-2" style="font-size: 1.4rem;" />กลับหน้าเมนูหลัก</a></div>
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

                    <div class="position-box-main">
                    <div v-if="checkLogin && this.getStore().setCheckSideMenu() && !checkPrint">
                        <SubMenuNav :openSubMenu="openSubMenu" :clickOpenSubMenu="clickOpenSubMenu"  />
                    </div>

                    <main class="main mg-t-body scroll-main">
                        <slot />
                        <footer v-if="checkLogin && !checkPrint">
                            <div align="center">
                                <div class="block-main" style="margin-top: unset !important">
                                    <div class="block-bg-main box-footer mb-5" style="border-radius: 0 0 10px 10px !important;">
                                        <div style="padding-top: 3rem;">
                                            <div class="divider-solid" style="height: 1px; width: 95%;"></div>
                                        </div>

                                        <!--!อันนี้เดวดึงค่ามาจาก setting-->
                                        <div class="p-4" v-html="footerWeb"> </div>
                                    </div>
                                </div>
                            </div>
                        </footer>
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
            checkLogin: false,
            checkPrint: false,
            title: 'ระบบจัดการข้อมูลสำหรับครู',
            hTitle: 'คะแนนความประพฤติ',
            subTitle: '',
            rollCheck: ''
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