import axios from '../api/structure';

export default {
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
}