<template>
    <div>
        <div align="center">
            <div class="block-main">
                <div class="block-bg-main">
                    <div class="row">
                        <div class="col bgbox2">

                            <div align="right">
                                <button class="btn btn-success btn-sm" @click="openModal('behavior')">
                                    เพิ่ม
                                </button>
                            </div>

                            <div align="left">รายการความประพฤติ</div>

                            <div class="mt-2">
                                <div class="table-responsive mt-3">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th class="thead-bg" style="width: 5%;">#</th>
                                                <th class="thead-bg" style="text-align: left; width: 200rem;">
                                                    รายการตักเตือน</th>
                                                <th class="thead-bg">คะแนน</th>
                                                <th class="thead-bg" style="width: 10%;">แก้ไข</th>
                                                <th class="thead-bg" style="width: 10%;">ลบ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in filteredTypeBehaviour" :key="item.id">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ item.name_beh }}</td>
                                                <td>{{ item.score }}</td>
                                                <td><button class="btn btn-warning btn-sm" @click="editBehavior(item.id)">แก้ไข</button></td>
                                                <td><button class="btn btn-danger btn-sm">ลบ</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div align="right">
                                <button class="btn btn-success btn-sm" @click="openModal('virtue')">
                                    เพิ่ม
                                </button>
                            </div>

                            <div align="left">
                                รายการคุณธรรม
                            </div>

                            <div class="mt-2">
                                <div class="table-responsive mt-3">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th class="thead-bg" style="width: 5%;">#</th>
                                                <th class="thead-bg" style="text-align: left; width: 200rem;">
                                                    รายการคุณธรรม</th>
                                                <th class="thead-bg">จำนวน</th>
                                                <th class="thead-bg" style="width: 10%;">แก้ไข</th>
                                                <th class="thead-bg" style="width: 10%;">ลบ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in filteredTypeVirtue" :key="item.id">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ item.name_beh }}</td>
                                                <td>{{ item.score }}</td>
                                                <td><button class="btn btn-warning btn-sm"
                                                        @click="editBehavior(item.id)">แก้ไข</button></td>
                                                <td><button class="btn btn-danger btn-sm">ลบ</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div v-if="isModalOpen" class="modal-overlay">
                                <div class="modal-show">
                                    <h5 v-if="formType === 'behavior'">เพิ่มรายการความประพฤติ</h5>
                                    <h5 v-if="formType === 'virtue'">เพิ่มรายการคุณธรรมใหม่</h5>

                                    <form @submit.prevent="formType === 'behavior' ? saveBehavior() : saveVirtue()">
                                        <div class="form-group">
                                            <label>ชื่อ{{ formType === 'behavior' ? 'ความประพฤติ' : 'คุณธรรม' }}</label>
                                            <input v-model="form.name" type="text" class="form-control"
                                                placeholder="กรอกชื่อ" required />
                                        </div>
                                        <div class="form-group">
                                            <label>จำนวนคะเเนน</label>
                                            <input v-model="form.score" type="number" class="form-control"
                                                placeholder="กรอกจำนวนคะเเนน" required />
                                        </div>
                                        <div style="padding-top: 2rem;">
                                            <button type="submit" class="btn btn-primary btn-sm">บันทึก</button>
                                            <button type="button" @click="closeModal" style="margin-left: 2rem"
                                                class="btn btn-secondary btn-sm">ยกเลิก</button>
                                        </div>

                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import callApi from '../api/callApi'
export default {
    setup() {
        const swal = getCurrentInstance().appContext.config.globalProperties;
        return { swal }
    },
    data() {
        return {
            classSearch: '',
            roomSearch: '',
            nameSearch: '',
            roomList: [1, 2, 3, 4, 5, 6],
            dataSearch: {
                class: '',
                room: '',
                name: '',
                tId: 0
            },

            listStudent: [],
            listTypeBehaviour: [],
            selectedBehavior: [],
            tId: 22,
            isModalOpen: false,
            form: {
                name: '',
                score: '',
            },
            formType: '',
            filteredTypeBehaviour: [],
            filteredTypeVirtue: [],
        }
    },

    mounted() {
        let auth = this.getStore().setAuth()

        if (auth) {
            this.tId = auth.id
        }
        this.getDaTaTypeBehaviour()
    },

    methods: {
        vcCheck() {
            if (this.classSearch == 'vc') {
                this.vcGrade = true
                this.roomList = [1, 2, 3]
            } else {
                this.vcGrade = false
                this.roomList = [1, 2, 3, 4, 5, 6]
            }
        },

        async getDaTaTypeBehaviour() {
            await callApi.gettypeBehaviorStudent().then(res => {
                if (res.code == 0) {
                    this.listTypeBehaviour = res.result
                } else {
                    this.listTypeBehaviour = res.result
                    console.log(this.listTypeBehaviour);
                }
                this.filteredTypeBehaviour = this.listTypeBehaviour.filter(item => item.type === 1);
                this.filteredTypeVirtue = this.listTypeBehaviour.filter(item => item.type === 2);
            }).catch(err => {
                console.log(err);
            })
        },

        openModal(type) {
            this.formType = type;
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.resetForm();
        },
        resetForm() {
            this.form = {
                name: '',
                score: '',
            };
        },
        async saveBehavior() {
            try {
                const response = await callApi.saveBehavior({
                    name: this.form.name,
                    type: 1,
                    score: this.form.score
                });
                if (response.code === 0) {
                    alert("เพิ่มความประพฤติสำเร็จ");
                    this.getDaTaTypeBehaviour()
                    this.closeModal();
                } else {
                    alert(response.message || "เกิดข้อผิดพลาด");
                }
            } catch (error) {
                console.error(error);
                alert("ไม่สามารถเพิ่มข้อมูลได้");
            }
        },

        async saveVirtue() {
            try {
                const response = await callApi.saveVirtue({
                    name: this.form.name,
                    type: 2,
                    score: this.form.score
                });
                if (response.code === 0) {
                    alert("เพิ่มคุณธรรมสำเร็จ");
                    this.getDaTaTypeBehaviour()
                    this.closeModal();
                } else {
                    alert(response.message || "เกิดข้อผิดพลาด");
                }
            } catch (error) {
                console.error(error);
                alert("ไม่สามารถเพิ่มข้อมูลได้");
            }
        },

        async editBehavior(id) {
            try {
                const response = await callApi.editBehavior(id);
                console.log(response);
                if (response.code === 0) {
                    this.form = {
                        id: response.data.id,
                        name: response.data.name_beh,
                        score: response.data.score
                    };
                    this.isModalOpen = true;
                } else {
                    alert("ไม่สามารถดึงข้อมูลได้");
                }
            } catch (error) {
                console.error(error);
                alert("เกิดข้อผิดพลาดในการดึงข้อมูล");
            }
        },

        async editVirtue() {
            try {
                const response = await callApi.editVirtue({
                    name: this.form.name,
                    type: 2,
                    score: this.form.score
                });
                if (response.code === 0) {
                    alert("เพิ่มคุณธรรมสำเร็จ");
                    this.getDaTaTypeBehaviour()
                    this.closeModal();
                } else {
                    alert(response.message || "เกิดข้อผิดพลาด");
                }
            } catch (error) {
                console.error(error);
                alert("ไม่สามารถเพิ่มข้อมูลได้");
            }
        }

    },
}
</script>

<style lang="scss" scoped>
.thead-bg {
    background-color: #e9ecef;
    color: #495057;
    border-color: #dee2e6;
    min-width: 120px;
}

.input-width-student {
    width: 10rem;
}

.w-10 {
    width: 20% !important;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-show {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
</style>