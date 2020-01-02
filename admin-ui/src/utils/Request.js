import axios from 'axios'
import { SystemConfig } from '../config'

class Request {
    config = {
        baseURL: SystemConfig.baseURL
    }

    get = (url, params) => {
        return axios.get(url, {
            ...this.config,
            params
        })
    }

    post = (url, params) => {
        return axios.post(url, {
            ...this.config,
            params
        })
    }

    put = (url, params) => {
        return axios.put(url, {
            ...this.config,
            params
        })
    }

    delete = (url, params) => {
        return axios.delete(url, {
            ...this.config,
            params
        })
    }

    head = (url, params) => {
        return axios.head(url, {
            ...this.config,
            params
        })
    }

    options = (url, params) => {
        return axios.options(url, {
            ...this.config,
            params
        })
    }

    patch = (url, params) => {
        return axios.patch(url, {
            ...this.config,
            params
        })
    }
}

const Http = new Request()
export default Http

