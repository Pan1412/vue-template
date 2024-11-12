<template>
    <div>

        <Head>
            <Title>{{ titleWeb }}</Title>
        </Head>

        <div class="mt-4">
            <div align="center">
                <img src="../assets/image/color.png" alt="" class="img-logo">
                <h1 class="sriracha-font stroke text-white text-head-club">{{ title }}</h1>
                <h5 class="sriracha-font stroke text-white text-sub-font-club">{{ subTitle }}</h5>
            </div>

        </div>
        <div class="bg-admin" v-if="rollCheck == 'admin'"></div>
        <div class="container">
            <slot />
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
            titleWeb: 'PWKSs CLUB',
            footerWeb: '',
            checkLogin: false,
            checkPrint: false,
            title: 'ระบบจัดการข้อมูลสำหรับครู',
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

        if(this.getStore().setAuth()){
            console.log("asdasd");
            
            if (this.getStore().setAuth().roll == 'teacher') {
                this.title = 'ระบบจัดการข้อมูลสำหรับครู'
                this.subTitle = 'รายวิชาเพิ่มเติมและกิจกรรมชุมนุม'

            } else if (this.getStore().setAuth().roll == 'admin') {
                this.title = 'ระบบกิจกรรมชุมนุม'
                this.subTitle = 'สำหรับผู้ดูแลระบบ'
                this.rollCheck = this.getStore().setAuth().roll

            } else if (this.getStore().setAuth().roll == 'student') {
                this.title = 'ระบบลงทะเบียน'
                this.subTitle = 'รายวิชาเพิ่มเติมและกิจกรรมชุมนุม'
            }
        }


    },
    methods: {
        async getInfoUser(username, roll) {
            await callApi.getInfoClubUser({ username, roll }).then(res => {
                if (res.code == 0) {
                    let sortObj = {...res.result}
                    sortObj.roll = roll
                    this.getStore().setAuth(sortObj)

                    if (roll == 'student') {
                        window.location.href = this.$config.public.baseURL+'student/main'
                    } else if (roll == 'teacher') {
                        window.location.href = this.$config.public.baseURL+'teacher/main'
                    } else if (roll == 'admin') {
                        window.location.href = this.$config.public.baseURL+'admin/'
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
</style>