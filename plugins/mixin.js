import { store } from '~/store/manageStore'

const globalMixin = {
    setup() {
        const swal = getCurrentInstance().appContext.config.globalProperties;
        return { swal }
    },
    methods: {
        checkDevice() {
            if (process.client) {
                var isMobile = /iPhone|iPod|Android/i.test(navigator.userAgent)
                var isIpad = /iPad/i.test(navigator.userAgent)

                if (isMobile) {
                    return 'mobile'
                } else if (isIpad) {
                    return 'ipad'
                } else {
                    return 'desktop'
                }
            }

        },

        getStore() {
            return store
        },

        showAlert(title, type, position) {
            if (type == 'success') {
                useNuxtApp().$toast.success(title)
            }
            else if (type == 'warning') {
                useNuxtApp().$toast.warning(title)
            }
            else if (type == 'info') {
                useNuxtApp().$toast.info(title)
            }
            else if (type == 'error') {
                useNuxtApp().$toast.error(title)
            }

        },

        copyToClipboard(text) {
            navigator.clipboard.writeText(text)
            this.showAlert('คัดลอกสำเร็จ', 'success')
        },

        gotoPage(namePage = '/', query = {}) {

            const router = useRouter()

            router.push({ path: namePage, query: { ...query } })

        },

        formatNumberToLocal(num) {
            const number = parseFloat(num)
            const options = {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
            const formatted = Number(number).toLocaleString('en');

            return formatted
        },

        alertModal(type, title, content = '', timer = false, confirm = false, redirected = false, reload = true) {
            
            let color = ''

            if (type == 'success') {
                color = '#338309'

            } else if (type == 'warning') {
                color = '#fbce02'

            } else if (type == 'error') {
                color = '#bc0000'

            }

            if (timer) {
                let result = this.swal.$swal.fire({
                    icon: type,
                    title: title,
                    text: content,
                    showConfirmButton: false,
                    // confirmButtonText: 'ปิด',
                    // confirmButtonColor: color,
                    timer: 1000
                }).then(res => {
                    if (res && type == 'success') {
                        if (redirected) {
                            let params = {}

                            if (redirected.params) params = redirected.params

                            this.gotoPage(redirected.route, { ...params })
                        } else {
                            window.location.reload()
                        }

                        return true
                    }
                })

                return result
            } else if (confirm) {
                let result = this.swal.$swal.fire({
                    icon: type,
                    title: title,
                    text: content,
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก',
                    confirmButtonText: 'ยืนยัน',
                    confirmButtonColor: color,
                    cancelButtonColor: '#b1b7ba'
                }).then(res => {
                    if (res.isConfirmed) {
                        return true
                    } else {
                        return false
                    }
                })

                return result
            }else if (type == 'loading'){
                let result = this.swal.$swal.fire({
                    title: title,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false
                    // confirmButtonText: 'ปิด',
                    // confirmButtonColor: color,
                }).then(res => {
                })

                return result
            } else {
                this.swal.$swal.fire({
                    icon: type,
                    title: title,
                    text: content,
                    confirmButtonText: 'ปิด',
                    confirmButtonColor: color,
                }).then(res => {
                    if (res && type == 'success' && reload) {
                        if (redirected) {
                            let params = {}

                            if (redirected.params) params = redirected.params

                            this.gotoPage(redirected.route, { ...params })
                        } else {
                            window.location.reload()
                        }

                    }
                })
            }

        },

        formatDate(dateNow, type = 'normal') {
            const date = new Date(dateNow);

            const year = date.getFullYear();
            const month = date.toLocaleString("default", { month: "2-digit" });
            const day = date.toLocaleString("default", { day: 'numeric' });

            const arrayMonth = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
            const arrayMonthShort = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

            if (type == 'getMain') {
                return `${year}-${month}-${day < 10 ? '0' + day : day}`;

            } else if (type == 'th-format') {
                return `${day < 10 ? "0" + day : day}/${month}/${year}`;

            } else if (type == 'th-format-short') {
                return `${day} ${arrayMonthShort[date.getUTCMonth()]}`
            }

            return `${day} เดือน${arrayMonth[date.getUTCMonth()]} พ.ศ. ${parseInt(year) + 543}`;
        },

        encodeToken(data) {
            const json = JSON.stringify(data);
            return btoa(unescape(encodeURIComponent(json)));
        },

        decodeToken(token) {
            const json = decodeURIComponent(escape(atob(token)));
            return JSON.parse(json);
        },

        logoutExpire() {
            this.$cookies.removeCookie('access_login')
            let logout = this.getStore().resetAuth()

            if (logout) {

                setTimeout(() => {
                    // window.location.href = '/pwks-ui/login'
                    window.location.href = `${this.$config.public.baseURL}`
                }, 500);

            }
        },

        logout(url) {

            let logout = this.getStore().resetAuth()

            if (logout) {

                setTimeout(() => {
                    // window.location.href = '/pwks-ui/login'
                    window.close()
                }, 500);

            }
        },

        goBack(){
            let roll = this.getStore().setAuth().roll
            // console.log(`${this.$config.public.baseMainURL}${roll == 'student' ? roll : 'teacher'}`);
            window.location.href = `${this.$config.public.baseMainURL}${roll == 'student' ? roll : 'teacher'}/menu`
        }

    }
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.mixin(globalMixin)
})