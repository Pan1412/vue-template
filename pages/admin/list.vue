<template>
    <div>
        <div align="center">
            <div class="block-main">
                <div class="block-bg-main">
                    <div class="row">
                        <div class="col bgbox2">
                            <div align="right">
                                <button class="btn btn-success btn-sm" @click="openModal('behavior')">เพิ่ม</button>
                            </div>
                            <div align="left">รายการความประพฤติ</div>
                            <div class="mt-2">
                                <div class="table-responsive mt-3">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th style="text-align: left;">รายการความประพฤติ</th>
                                                <th>คะแนน</th>
                                                <th>แก้ไข</th>
                                                <th>ลบ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in filteredTypeBehaviour" :key="item.id">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ item.name_beh }}</td>
                                                <td>{{ item.score }}</td>
                                                <td>
                                                    <button class="btn btn-warning btn-sm"
                                                        @click="editItem(item, 'behavior')">แก้ไข</button>
                                                </td>
                                                <td>
                                                    <button class="btn btn-danger btn-sm"
                                                        @click="deleteBehavior(item.id)">ลบ</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div align="right">
                                <button class="btn btn-success btn-sm" @click="openModal('virtue')">เพิ่ม</button>
                            </div>
                            <div align="left">รายการคุณธรรม</div>
                            <div class="mt-2">
                                <div class="table-responsive mt-3">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th style="text-align: left;">รายการคุณธรรม</th>
                                                <th>คะแนน</th>
                                                <th>แก้ไข</th>
                                                <th>ลบ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in filteredTypeVirtue" :key="item.id">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ item.name_beh }}</td>
                                                <td>{{ item.score }}</td>
                                                <td>
                                                    <button class="btn btn-warning btn-sm"
                                                        @click="editItem(item, 'virtue')">แก้ไข</button>
                                                </td>
                                                <td>
                                                    <button class="btn btn-danger btn-sm"
                                                        @click="deleteVirtue(item.id)">ลบ</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <!-- Modal -->
                            <div v-if="isModalOpen" class="modal-overlay">
                                <div class="modal-show">
                                    <h5>{{ isEditing ? `แก้ไข${modalTitle}` : `เพิ่ม${modalTitle}` }}</h5>
                                    <form @submit.prevent="saveItem">
                                        <div class="form-group">
                                            <label>ชื่อ{{ modalTitle }}</label>
                                            <input v-model="form.name_beh" type="text" class="form-control"
                                                placeholder="กรอกชื่อ" required />
                                        </div>
                                        <div class="form-group">
                                            <label>จำนวนคะแนน</label>
                                            <input v-model="form.score" type="number" class="form-control"
                                                placeholder="กรอกจำนวนคะแนน" required />
                                        </div>
                                        <div class="form-actions">
                                            <button type="submit" class="btn btn-primary btn-sm">{{ isEditing ?
                                                'บันทึกการแก้ไข' : 'บันทึก' }}</button>
                                            <button type="button" @click="closeModal"
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
import callApi from '../api/callApi';

export default {
    data() {
        return {
            classSearch: '',
            roomSearch: '',
            nameSearch: '',
            roomList: [1, 2, 3, 4, 5, 6],
            dataSearch: {
                class: '',
                room: '',
                name_beh: '',
                tId: 0
            },
            listTypeBehaviour: [],
            filteredTypeBehaviour: [],
            filteredTypeVirtue: [],
            isModalOpen: false,
            isEditing: false,
            formType: '',
            modalTitle: '',
            form: {
                id: null,
                name_beh: '',
                score: '',
            },
        };
    },
    setup() {
        const swal = getCurrentInstance().appContext.config.globalProperties;
        return { swal }
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
                }
                this.filteredTypeBehaviour = this.listTypeBehaviour.filter(item => item.type === 1);
                this.filteredTypeVirtue = this.listTypeBehaviour.filter(item => item.type === 2);
            }).catch(err => {
                console.log(err);
            })
        },
        openModal(type) {
            this.formType = type;
            this.modalTitle = type === 'behavior' ? 'ความประพฤติ' : 'คุณธรรม';
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.isEditing = false;
            this.form = { id: null, name_beh: '', score: '' };
        },
        editItem(item, type) {
            this.isEditing = true;
            this.isModalOpen = true;
            this.form = { ...item };
            this.formType = type;
            this.modalTitle = type === 'behavior' ? 'ความประพฤติ' : 'คุณธรรม';
        },

        async saveItem() {
            try {
                const apiMethod = this.isEditing
                    ? (this.formType === 'behavior' ? callApi.updateBehavior : callApi.updateVirtue)
                    : (this.formType === 'behavior' ? callApi.saveBehavior : callApi.saveVirtue);

                const payload = {
                    id: this.form.id,
                    name: this.form.name_beh,
                    type: this.formType === 'behavior' ? 1 : 2,
                    score: this.form.score
                };
                this.alertModal('loading', 'กรุณารอสักครู่....')
                const response = await apiMethod(payload);

                if (response && response.code === 0) {
                    this.closeModal();
                    setTimeout(() => {
                        this.alertModal(
                            'success',
                            'สำเร็จ',
                            this.isEditing ? 'ทำการแก้ไขคะแนนความประพฤติสำเร็จ' : 'เพิ่มคะแนนความประพฤติสำเร็จ',
                            true
                        );
                    }, 500);
                    return this.getDaTaTypeBehaviour()
                } else {
                    setTimeout(() => {
                        this.alertModal(
                            'error',
                            'ข้อผิดพลาด',
                            response?.message || 'เกิดข้อผิดพลาด',
                            false
                        );
                    }, 500);
                    this.closeModal();
                }
            } catch (error) {
                console.error('Error occurred:', error);
                alert('ไม่สามารถบันทึกข้อมูลได้');
                this.closeModal();
            }
        },

        async deleteBehavior(id) {
            await callApi.deleteBehavior({ id }).then(res => {
                this.alertModal('loading', 'กรุณารอสักครู่....')
                if (res.code === 0) {
                    setTimeout(() => {
                        this.alertModal(
                            'success',
                            'สำเร็จ',
                            'ลบข้อมูลรายการความประพฤติสำเร็จ',
                            true
                        );
                    }, 500);
                    this.getDaTaTypeBehaviour();
                } else {
                    alert(res.message || 'เกิดข้อผิดพลาด');
                }
            })
                .catch(err => {
                    console.error(err);
                    alert('ไม่สามารถลบข้อมูลพฤติกรรมได้');
                });
        },

        async deleteVirtue(id) {
            await callApi.deleteVirtue({ id }).then(res => {
                this.alertModal('loading', 'กรุณารอสักครู่....')
                if (res.code === 0) {
                    setTimeout(() => {
                        this.alertModal(
                            'success',
                            'สำเร็จ',
                            'ลบข้อมูลรายการคุณธรรมสำเร็จ',
                            true
                        );
                    }, 500);
                    this.getDaTaTypeBehaviour();
                } else {
                    alert(res.message || 'เกิดข้อผิดพลาด');
                }
            })
                .catch(err => {
                    console.error(err);
                    alert('ไม่สามารถลบข้อมูลคุณธรรมได้');
                });
        }

    },
};
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