import axios from 'axios'
import { SystemConfig } from '../config'
import { ACCESS_TOKEN } from './Auth'

const instance = axios.create({
    baseURL: SystemConfig.backendUrl,
    timeout: 10000,
})

instance.interceptors.request.use(config => {
    let token = localStorage.getItem(ACCESS_TOKEN)
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
}, error => {
    console.log(error)
    Promise.reject(error) 
})

// instance.interceptors.response.use(
//     response => {
//     /**
//     * code为非200是抛错 可结合自己业务进行修改
//     */
//       const res = response.data
//       if (res.code !== 200) {
//         Message({
//           message: res.message,
//           type: 'error',
//           duration: 3 * 1000
//         })
  
//         // 401:未登录;
//         if (res.code === 401||res.code === 403) {
//           MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
//             confirmButtonText: '重新登录',
//             cancelButtonText: '取消',
//             type: 'warning'
//           }).then(() => {
//             store.dispatch('FedLogOut').then(() => {
//               location.reload()// 为了重新实例化vue-router对象 避免bug
//             })
//           })
//         }
//         return Promise.reject('error')
//       } else {
//         return response.data
//       }
//     },
//     error => {
//       console.log('err' + error)// for debug
//       Message({
//         message: error.message,
//         type: 'error',
//         duration: 3 * 1000
//       })
//       return Promise.reject(error)
//     }
//   )

export default instance

