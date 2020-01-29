import Http from './Request'
import axios from 'axios'
import { SystemConfig } from '../config'

export const ACCESS_TOKEN = 'accessToken'
export const REFRESH_TOKEN = 'refreshToken'
export const LOGIN_USER = 'loginUser'

export const getLoginUser = () => {
    return Http.get('/authservice/user/me').then(res => {
        localStorage.setItem(LOGIN_USER, res.data)
        return Promise.resolve({
            status: 'success',
            user: res.data
        })
    }).catch(err => {
        localStorage.removeItem(LOGIN_USER)
        return Promise.reject({
            status: err.response.status,
            message: 'Unable to fetch login user info',
            response: err.response.data
        })
    })
}

export const login = (username, password) => {
    return axios.post(SystemConfig.backendUrl + '/authservice/oauth/token',
        'grant_type=password&scope=all&username=' + username + '&password=' + password,
        {
            headers: {
                'Authorization': 'Basic ZGVtby1jbGllbnQ6ZGVtby1jbGllbnQ='
            }
        }
    ).then(res => {
        localStorage.setItem(ACCESS_TOKEN, res.data.access_token)
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh_token)
        return getLoginUser()
    }).catch(err => {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
        return Promise.reject({
            status: err.response.status,
            message: 'Unable to login',
            response: err.response.data
        })
    })
}

export const logout = () => {
    return new Promise((resolve) => {
        localStorage.clear()

        resolve({
            status: 'success'
        })
    })
}