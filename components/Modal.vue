<template>
    <div class="container">
        <div class="bg-modal" v-if="isOpen">

            <div class="bg-modal-main" align="center">
                <div v-if="typeModal == 'regis'">
                    <h3 class="sriracha-font">ลงทะเบียนชุมนุม</h3>

                    <div  >
                        <div class="grid-regis mt-2" align="right">
                            <p>เลขที่ : </p>
                            <div align="left">
                                <span>{{ student.id_school }}</span>
                            </div>
                        </div>
                        <div class="grid-regis mt-2" align="right">
                            <p>ชื่อผู้สมัคร : </p>
                            <div align="left">
                                <span>{{ student.prefix_stu }}{{ student.name_stu }} {{ student.surname_stu }}</span>
                            </div>
                        </div>

                        <div class="grid-regis mt-2" align="right">
                            <p>ชุมนุม : </p>
                            <select class="form-select form-select-sm w-75" aria-label="Small select example" v-model="actId" @change="changeDetail()">
                                <option v-for="list in listClub" :value="list.act_id">{{ list.act_name }}</option>
                            </select>
                        </div>

                        <div class="grid-regis mt-2" align="right">
                            <p>รายละเอียด : </p>
                            <div align="left">
                                <span>{{ detail.act_explan }}</span>
                            </div>
                            
                        </div>

                        <div class="grid-regis mt-2" align="right">
                            <p>สถานที่ : </p>
                            <div align="left">
                                <span>{{ detail.act_addr }}</span>
                            </div>
                            
                        </div>

                        <div class="grid-regis mt-2" align="right">
                            <p>จำนวนสมาชิก : </p>
                            <div align="left">
                                <span>{{ detail.total }}/{{ detail.act_limit }}</span>
                            </div>
                            
                        </div>

                        <div class="grid-regis mt-2" align="right">
                            <p>ระดับชั้น : </p>
                            <div align="left">
                                <span v-if="detail.act_class == 1" > ม.ต้น</span>
                                <span v-else-if="detail.act_class == 2"> ม.ปลาย</span>
                                <span v-else-if="detail.act_class == 3"> ทุกระดับชั้น</span>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-center mt-4" align="center">
                    <button class="btn btn-success btn-sm w-25" @click="submitModal(detail)" >{{ optionModal.confirmTextBtn }}</button>
                    <button class="btn btn-outline-danger btn-sm w-25 ms-3" @click="closeModal">{{ optionModal.cancelTextBtn }}</button>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        closeModal: {
            type: Function
        },
        submitModal: {
            type: Function
        },
        typeModal: {
            type: String,
            default: ''
        },
        listClub: {
            type: Array,
            default: []
        },
        student: {
            type: Object,
        },
        optionModal: {
            type: Object,
            default: {
                confirmTextBtn: 'บันทึก',
                confirmBtn: true,
                cancelTextBtn: 'ยกเลิก',
                cancelBtn: true,
            }
        }
    },

    data() {
        return {
            detail: {
                act_explan: '',
                act_addr: '',
                act_class: 0,
                act_limit: 0,
                total: 0
            },
            actId: 0
        }
    },

    methods: {
        changeDetail() {
            let getDetail = this.listClub.filter( e => e.act_id == this.actId)
            
            if(getDetail.length == 1){
                this.detail = getDetail[0]
            }
        }
    },
}
</script>

<style lang="css" scoped>
.bg-modal {
    background-color: rgba(0, 0, 0, 0.254);
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 10;
}

.bg-modal-main {
    background-color: white;
    opacity: 1;
    width: 30rem;
    height: auto;
    position: fixed;
    z-index: 99;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    padding: 1rem;
}

.grid-regis {
    display: grid; 
    grid-template-columns: 30% 70%;
    justify-content: end;
    gap: 1rem;
}
</style>