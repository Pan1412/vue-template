import { useLocalStorage } from '@vueuse/core'

const optionsState = {
    auth: null,
    checkLogin: false,
    checkSideMenu: true

}

const state = useLocalStorage('PWKSsCLUB', { main: optionsState })

export const store = {
    setAuth(payload) {
        if(payload !== undefined){
            state.value.main.auth = payload
        }

        return state.value.main.auth
    },

    resetAuth(){
        state.value.main.auth = null

        state.value.main.checkLogin = false

        return true
    },

    setCheckLogin(payload) {
        if(payload !== undefined){
            state.value.main.checkLogin = payload
        }

        return state.value.main.checkLogin
    },

    setCheckSideMenu(payload) {
        if(payload !== undefined){
            state.value.main.checkSideMenu = payload
        }

        return state.value.main.checkSideMenu
    },
}