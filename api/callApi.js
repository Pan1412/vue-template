import axios from '../api/structure';

export default {
    getInfoClubUser: data => {
        return axios.api.post('/auth/get-info-club', data).then(response => response.data);
    },

    getProfile: data => {
        return axios.api.post('/teacher/profile', data).then(response => response.data);
    },

    gettypeBehaviorStudent: () => {
        return axios.api.get('/behavior/get-type-behavior').then(response => response.data);
    },

    getScoreBehaviorStudent: () => {
        return axios.api.get('/behavior/get-score-behavior').then(response => response.data);
    },

    getStudentForBehaviorScore: data => {
        return axios.api.post('/behavior/get-student-for-behavior', data).then(response => response.data);
    },

    deductBehaviorScore: data => {
        return axios.api.post('/behavior/get-deduction-score-behavior', data).then(response => response.data);
    },

    insertDetailsTypeBehaviorScore: data => {
        return axios.api.post('/behavior/get-details-score-behavior', data).then(response => response.data);
    },

    getScoreBehaviorOneStudent: (data) => {
        return axios.api.post('/behavior/get-score-one-student', data).then(response => response.data);
    },

    getTypeDetailBehaviorStudent: (data) => {
        return axios.api.post('/behavior/get-type-behavior-one-student', data).then(response => response.data);
    },

    saveBehavior: data => {
        return axios.api.post('/behavior/add-type-behavior', data).then(response => response.data);
    },

    saveVirtue: data => {
        return axios.api.post('/behavior/add-type-virtue', data).then(response => response.data);
    },

    updateBehavior: (data) => {
        return axios.api.post('/behavior/update-behavior', data).then((response) => response.data);
    },

    updateVirtue: (data) => {
        return axios.api.post('/behavior/update-virtue', data).then((response) => response.data);
    },

    deleteBehavior: (data) => {
        return axios.api.post('/behavior/remove-behavior', data).then((response) => response.data);
    },

    deleteVirtue: (data) => {
        return axios.api.post('/behavior/remove-virtue', data).then((response) => response.data);
    },

    getMainBehaviour: () => {
        return axios.api.get('/behavior/get-Main-behavior').then(response => response.data);
    },

    updateDeatilBehaviour: (data) => {
        return axios.api.post('/behavior/update-detail-behavior', data).then((response) => response.data);
    },

    getDeatilOneBehaviour: (data) => {
        return axios.api.post('/behavior/get-deatil-one-behavior', data).then(response => response.data);
    },

    deleteDeatilOneBehaviour: (data) => {
        return axios.api.post('/behavior/remove-detailOneBehaviour', data).then((response) => response.data);
    },

    searchStudent: (data) => {
        return axios.api.post('/behavior/get-search-student', data).then(response => response.data);
    },

    saveDetailBehaviorAndDeductBehaviorScore: data => {
        return axios.api.post('/behavior/get-insert-and-deduction-behavior-score', data).then(response => response.data);
    },
    deleteBehaviorInList: (data) => {
        return axios.api.post('/behavior/remove-behavior-in-list', data).then((response) => response.data);
    },
    // uploadPhotoFiles: (data) => {
    //     return axios.post('http://localhost:8000/api/v1/upload/upload-file', data).then((response) => response.data);
    // }

    searchOneStudent: (data) => {
        return axios.api.post('/behavior/get-search-one-student', data).then(response => response.data);
    },
}