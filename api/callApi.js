import axios from '../api/structure';

export default {
    getInfoClubUser: data => {
        return axios.api.post('/auth/get-info-club', data).then(response => response.data);
    },

    getProfile: data => {
        return axios.api.post('/teacher/profile', data).then(response => response.data);
    },

    

    getAllStudent: (t_class, t_room, year)=>{
        return axios.api.get(`/sdq/teacher/getStudent?class=${t_class}&room=${t_room}&year=${year}`).then(response => response.data);
    },

    insertSdqTeacher: (data) => {
        return axios.api.post('/sdq/teacher/insert', data).then(response => response.data);
    },
    getStudent:(data)=>{
        return axios.api.post('/sdq/teacher/getStudentInfo', data).then(response => response.data);
    },
    insertSdqStudent: (data) => {
        return axios.api.post('/sdq/student/insert', data).then(response => response.data);
    },

    getDataTeacherSdq: (data)=>{
        return axios.api.post('/sdq/teacher/getSdqById', data).then(response => response.data);
    },

    updateSdq: (data)=>{
        return axios.api.post('/sdq/teacher/updateSdq', data).then(response => response.data);
    },

    insertEqStudent: (data) => {
        return axios.api.post('sdq/student/eq/insert', data).then(response => response.data);
    },

    checkStudentStatus: (data)=>{
        return axios.api.post('/sdq/student/checkStatus', data).then(response => response.data);
    },

    // statusSdqAll: (data)=>{
    //     return axios.api.post('/sdq/teacher/statusSdqAll', data).then(response => response.data);
    // },

    resultSdqById: (data)=>{
        return axios.api.post('/sdq/teacher/get-result-sdq', data).then(response => response.data);
    },

    deleteSdq: (data)=>{
        return axios.api.post('/sdq/teacher/deleteSdq', data).then(response => response.data);
    },

    insertSdqParents: (data) => {
        return axios.api.post('sdq/parent/insert', data).then(response => response.data);
    },

    getStudentSdq: (data) => {
        return axios.api.post('sdq/teacher/getScoreStudent', data).then(response => response.data);
    },

    getParentSdq: (data) => {
        return axios.api.post('sdq/teacher/getScoreParent', data).then(response => response.data);
    },

    getClass: (data) => {
        return axios.api.post('sdq/teacher/getClass', data).then(response => response.data);
    },

    // statusEqAll: (data) => {
    //     return axios.api.post('sdq/teacher/statusEqAll', data).then(response => response.data);
    // },

    getEqResult: (data) => {
        return axios.api.post('sdq/teacher/getEqResult', data).then(response => response.data);
    },

    deleteEq: (data) => {
        return axios.api.post('sdq/teacher/deleteEq', data).then(response => response.data);
    },

    getEqById: (data) => {
        return axios.api.post('sdq/teacher/getEqById', data).then(response => response.data);
    },

    checkStatusTP: (data) => {
        return axios.api.post('sdq/teacher/checkStatusTP', data).then(response => response.data);
    },

    getYear: ()=>{
        return axios.api.get('sdq/teacher/getYear').then(response => response.data);
    },

    statusEqAdmin: (data)=>{
        return axios.api.post('sdq/teacher/statusEqAdmin', data).then(response => response.data);
    },

    statusSdqAdmin: (data)=>{
        return axios.api.post('sdq/teacher/statusSdqAdmin', data).then(response => response.data);
    },

    SdqResultRoom: (data)=>{
        return axios.api.post('sdq/teacher/sdq-result-room', data).then(response => response.data);
    },

    EqResultRoom: (data)=>{
        return axios.api.post('sdq/teacher/eq-result-room', data).then(response => response.data);
    },

    SdqResultClass: (data)=>{
        return axios.api.post('sdq/teacher/sdq-result-class', data).then(response => response.data);
    },

    EqResultClass: (data)=>{
        return axios.api.post('sdq/teacher/eq-result-class', data).then(response => response.data);
    },

    GetStudentProblem: (data)=>{
        return axios.api.post('sdq/teacher/getStudentProblem', data).then(response => response.data);
    },
    
    UpdateStudentProblem: (data)=>{
        return axios.api.post('sdq/teacher/updateStudentProblem', data).then(response => response.data);
    },

    GetSexStudentRoom: (data)=>{
        return axios.api.post('sdq/teacher/getSexStudentRoom', data).then(response => response.data);
    },

    GetRoomTeacher: (data)=>{
        return axios.api.post('sdq/teacher/getRoomTeacher', data).then(response => response.data);
    },

    GetSdqClassAdmin: (data)=>{
        return axios.api.post('sdq/teacher/getSdqClassAdmin', data).then(response => response.data);
    },

    CheckSdqParentStatus: (data)=>{
        return axios.api.post('sdq/teacher/checkSdqParentStatus', data).then(response => response.data);
    },

    GetEqSchool: (data)=>{
        return axios.api.post('sdq/teacher/getEqSchool', data).then(response => response.data);
    },

    GetSdqSchool: (data)=>{
        return axios.api.post('sdq/teacher/getSdqSchool', data).then(response => response.data);
    },
}