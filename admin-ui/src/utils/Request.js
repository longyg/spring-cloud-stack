import axios from 'axios'
import { SystemConfig } from '../config'

const instance = axios.create({
    baseURL: SystemConfig.backendUrl,
    timeout: 10000
})

export default instance

