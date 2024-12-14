<template>
    <div>
        <div class="d-flex justify-content-center mg-t-nav " style="height: 100vh; overflow-y: auto;" >
            <div class="sub-main-box scroll-select-menu" id="box-menu-nav" align="center">
                <div class="box-main-sub-nav-menu ">
                    <div class="box-profile-nav mt-3">
                        <img :src="profile.picTea" v-if="profile.picTea != ''" alt="user" class="box-img-profile-nav">
                        <img src="/assets/image/user-img/profile-defalut.png" v-if="profile.picTea == ''" alt="user"
                            class="box-img-profile-nav ms-2">
                        <div class="mt-2 ms-3" align="left">
                            <h4 class="h4-pwks fw-500" style="margin-bottom: 0; padding-bottom: 1rem;">
                                {{ profile.prefixTea }}{{ profile.firstName }} <br />{{ profile.lastName }}
                            </h4>
                        </div>
                    </div>

                    <div>
                        <p class="p-pwks"
                            style="margin-bottom: 0; padding-bottom: 0; opacity: 0.5; margin-top: -10px;"
                            v-if="profile.groupName == 'ไม่ระบุ'">
                            <span>
                                <Icon name="clarity:group-solid" style="font-size: 1rem; margin-top: -2px;" />
                            </span>
                            ผู้บริหาร
                        </p>
                        <p class="p-pwks fm-kanit"
                            style="margin-bottom: 0; padding-bottom: 0; opacity: 0.5; margin-top: -10px;" v-else>
                            <span>
                                <Icon name="clarity:group-solid" style="font-size: 1rem; margin-top: -2px;" />
                            </span>
                            {{ profile.groupName }}
                        </p>
                    </div>

                    <div v-for="mainMenus in menu" class="mt-3">
                        <div class="box-head-menu fm-kanit">
                            <p class="font-head-menu">{{ mainMenus.headName }}</p>
                            <div class="divider-solid mt-3"></div>
                        </div>

                        <div class="grid-nav-sub-menu grid-column-sub-menu mt-1">
                            <div v-for="subMenu in mainMenus.subMenu">

                                <div v-if="!subMenu.multi">
                                    <div class="box-menu" style="margin-top: 5%;"
                                        v-if="subMenu.permission == profile.roll">

                                        <div class="d-flex cursor-main size-menu" @click="nextPage(subMenu.link)">
                                            <Icon :name="subMenu.icon" style="font-size: 1.3rem;" class="ms-3" />
                                            <h6 class="h5-pwks fw-500 ms-1 mt-1"
                                                style="font-size: 0.9rem; margin: 0; padding: 0;">{{ subMenu.subMenuName
                                                }}</h6>
                                        </div>

                                    </div>

                                    <div class="box-menu" style="margin-top: 5%;" v-if="subMenu.permission == ''">

                                        <div class="d-flex cursor-main size-menu" @click="nextPage(subMenu.link)">
                                            <Icon :name="subMenu.icon" style="font-size: 1.3rem;" class="ms-3" />
                                            <h6 class="h5-pwks fw-500 ms-1 mt-1"
                                                style="font-size: 0.9rem; margin: 0; padding: 0;">{{ subMenu.subMenuName
                                                }}</h6>
                                        </div>

                                    </div>
                                </div>

                                <div v-if="subMenu.multi"
                                    style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.2rem;">
                                    <div v-for="multi in subMenu.multi">
                                        <div class="box-menu-multi" style="margin-top: 5%;"
                                            v-if="multi.permission == profile.roll">

                                            <div class="d-flex cursor-main size-menu" @click="nextPage(multi.link)">
                                                <Icon :name="multi.icon" style="font-size: 1.3rem;" class="ms-3" />
                                                <h6 class="h5-pwks fw-500 ms-1 mt-1"
                                                    style="font-size: 0.9rem; margin: 0; padding: 0;">{{
                            multi.subMenuName
                        }}</h6>
                                            </div>

                                        </div>

                                        <div class="box-menu-multi" style="margin-top: 5%;"
                                            v-if="multi.permission == ''">

                                            <div class="d-flex cursor-main size-menu" @click="nextPage(multi.link)">
                                                <Icon :name="multi.icon" style="font-size: 1.3rem;" class="ms-3" />
                                                <h6 class="h5-pwks fw-500 ms-1 mt-1"
                                                    style="font-size: 0.9rem; margin: 0; padding: 0;">{{
                            multi.subMenuName
                        }}</h6>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    <!-- <div class="d-flex justify-content-center mt-4 cursor-main" style="color: rgb(125, 52, 243)"
                        @click="logout()">
                        <Icon name="material-symbols:door-open-outline" style="font-size: 2rem;" class="ms-3" />
                        <h4 class="h3-pwks fw-500 ms-1">ออกจากระบบ</h4>
                    </div> -->

                </div>
            </div>
            <!-- <div class="bg-sub-nav" id="box-shadow-nav" @click="clickOpenSubMenu(false)"></div> -->
        </div>
    </div>

    <!-- <Modal v-if="isModal" :closeModal="closeModal" :type="typeModal" /> -->
</template>

<script>

import callApi from '../api/callApi';

export default {
    setup() {


        return {}
    },
    props: {
        clickOpenSubMenu: {
            type: Function
        },
        clickCloseSubMenu: {
            type: Function
        },
        openSubMenu: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            menu: [],
            listMenuCheck: [
                {
                    headName: 'เมนูหลัก',
                    subMenu: [
                        { subMenuName: 'รายชื่อนักเรียน', link: '/admin', icon: 'material-symbols:list-alt-check-outline', permission: '' },
                        { subMenuName: 'บันทึกคดี/พิพาท', link: '/admin/manage', icon: 'hugeicons:justice-scale-01', permission: '' },
                        { subMenuName: 'รายการพฤติกรรม', link: '/admin/list', icon: 'uis:layer-group', permission: '' },
                    ]
                },
                {
                    headName: 'รายงาน',
                    subMenu: [
                        { subMenuName: 'พฤติกรรมรายบุคคล', link: '/', icon: 'mdi:file', permission: '' },
                        { subMenuName: 'ลำดับคะแนน', link: '/', icon: 'mdi:file', permission: '' },
                    ]
                },

            ],
            isModal: false,
            typeModal: '',
            name: '',
            profile: {
                idCard: '',
                prefixTea: 'นาย',
                firstName: 'หงษ์ไทย',
                lastName: 'หอมสดชื่น',
                positionKey: '',
                groupKey: '',
                groupName: 'วิทยาศาสตร์อาหารและยา',
                picTea: '',
                roll: 'admin'
            },
        }
    },

    // watch: {
    //     openSubMenu: {
    //         async handler(newVal) {
    //             await this.getImgProfile()
    //         }
    //     }
    // },

    async mounted() {
        this.menu = this.listMenuCheck
        // this.profile.prefixTea = this.getStore().setAuth().prefix_name
        // this.profile.firstName = this.getStore().setAuth().first_name
        // this.profile.lastName = this.getStore().setAuth().last_name
        // this.profile.groupName = this.getStore().setAuth().group_name
        // this.profile.roll = this.getStore().setAuth().roll

        // await this.getImgProfile()
        // this.switchTab('check', 0)
    },
    methods: {
        tranformNavSlideOpen() {
            // let shadow = document.getElementById('box-shadow-nav')
            // shadow.style.width = 'calc(100vw + 320px)'
            // shadow.style.opacity = 0

            let menu = document.getElementById('box-menu-nav')
            menu.style.transform = 'translateX(0px)'
            menu.style.opacity = 0

            let pixel = 0
            // let opacityShadow = 0
            let opacityMenu = 0

            let interval = setInterval(() => {

                // shadow.style.transform = `translateX(-${pixel}px)`;
                // shadow.style.opacity = opacityShadow

                menu.style.transform = `translateX(-${pixel}px)`
                menu.style.opacity = opacityMenu

                pixel += 32;
                // opacityShadow += 0.05
                opacityMenu += 0.1

                if (pixel == 352) {
                    this.stopInterval(interval)
                }
            }, 10);
        },
        tranformNavSlideClose() {
            // let shadow = document.getElementById('box-shadow-nav')
            // shadow.style.width = 'calc(100vw + 320px)'
            // shadow.style.opacity = 0

            let menu = document.getElementById('box-menu-nav')
            menu.style.transform = 'translateX(0px)'
            menu.style.opacity = 0

            let pixel = 360
            // let opacityShadow = 0.5
            let opacityMenu = 1

            let interval = setInterval(() => {

                // shadow.style.transform = `translateX(-${pixel}px)`;
                // shadow.style.opacity = opacityShadow

                menu.style.transform = `translateX(-${pixel}px)`
                menu.style.opacity = opacityMenu

                pixel -= 32;
                // opacityShadow -= 0.05
                opacityMenu -= 0.1

                if (pixel < 0) {
                    this.stopInterval(interval)
                }
            }, 10);
        },
        stopInterval(interval) {
            clearInterval(interval)
        },
        nextPage(link) {
            this.gotoPage(link)
            this.clickCloseSubMenu()
        },

        closeModal() {
            this.isModal = false
            this.typeModal = ''
        },

        async getImgProfile() {
            await callApi.getProfile({ t_id: this.getStore().setAuth().id }).then((res) => {
                this.profile.picTea = res.result.pic_tea

            })
        },

        switchTab(type, arr, status = true) {
            this.menu = this.listMenuCheck
            return
            if(!status) return

            let getTab = document.querySelectorAll('#tab-menu')

            for (const tab of getTab) {
                tab.classList.remove('box-label-btn-active')
            }

            getTab[arr].classList.add('box-label-btn-active')

            if(type == 'check'){
                this.menu = this.listMenuCheck

            } else if (type == 'education'){
                this.menu = this.listMenuEducation

            } else if (type == 'affair'){
                this.menu = this.listMenuAffair

            }

        }

    },
}
</script>

<style lang="scss" scoped>
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
</style>