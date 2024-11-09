import axios from 'axios';
import baseConfig from '../config/endpoint'

let api = {
    api: null,
    context: null
}

export const createStructure = () => {
    let link = '';
    const msgError = ''

    const instance = axios.create({
        baseURL: baseConfig.ENDPOINT_URL
    })

    instance.interceptors.request.use(config => {
        // if (store.setAuth().access_token) {
        //     config.headers.Authorization = `Beraer ${store.setAuth().access_token}`
        // }
        link = config.url;
        return config
    })

    instance.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            console.log(error.response);
            return false
        }
    )

    api.api = instance

}

export default api
