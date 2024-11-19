import axios from '../api/structure';

export default {

    getInfoClubUser: data => {
        return axios.api.post('/auth/get-info-club', data).then(response => response.data);
    },

    getOpenClub: () => {
        return axios.api.get('/club/get-open-club').then(response => response.data);
    },

    getSetting: () => {
        return axios.api.get('/club/get-setting').then(response => response.data);
    },

    changeSettingClub: data => {
        return axios.api.post('/club/change-setting', data).then(response => response.data);
    },

    getClubRegisted: data => {
        return axios.api.post('/club/get-club-student', data).then(response => response.data);
    },

    getClubRegistedTeacher: data => {
        return axios.api.post('/club/get-club-teacher', data).then(response => response.data);
    },

    getListMember: data => {
        return axios.api.post('/club/get-list-club-member', data).then(response => response.data);
    },

    getClub: data => {
        return axios.api.post('/club/get-club-regis', data).then(response => response.data);
    },

    regisClubStudent: data => {
        return axios.api.post('/club/regis-club-member', data).then(response => response.data);
    },

    getStudentForRegis: data => {
        return axios.api.post('/club/get-student-for-regis', data).then(response => response.data);
    },

    getStudentNoClub: () => {
        return axios.api.get('/club/get-student-no-club').then(response => response.data);
    },
    getOsjStudent: data => {
        return axios.api.post('/club/get-osj-student', data).then(response => response.data);
    },

    getOsj: data => {
        return axios.api.post('/club/get-osj-list', data).then(response => response.data);
    },

    getOsjMember: data => {
        return axios.api.post('/club/get-osj-member', data).then(response => response.data);
    },

    regisOsjStudent: data => {
        return axios.api.post('/club/regis-osj-member', data).then(response => response.data);
    },

    getClubAdmin: data => {
        return axios.api.post('/club/get-club-regis-admin', data).then(response => response.data);
    },

    removeClub: data => {
        return axios.api.post('/club/remove-club', data).then(response => response.data);
    },

    insertClub: data => {
        return axios.api.post('/club/insert-club', data).then(response => response.data);
    },

    editClub: data => {
        return axios.api.post('/club/edit-club', data).then(response => response.data);
    },

    getClubById: data => {
        return axios.api.post('/club/get-club-id', data).then(response => response.data);
    },

    getTeacherList: () => {
        return axios.api.get('/club/get-teacher').then(response => response.data);
    },

    removeStudentClub: data => {
        return axios.api.post('/club/remove-club-student', data).then(response => response.data);
    },

    getListClubAdminRegis: () => {
        return axios.api.get('/club/get-list-club').then(response => response.data);
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

    deductBehaviorScore: data=> {
        return axios.api.post('/behavior/get-deduction-score-behavior', data).then(response => response.data);
    }
}