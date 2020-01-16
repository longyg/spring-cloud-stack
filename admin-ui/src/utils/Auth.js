import Cookies from 'js-cookie'
import Http from './Request'

const ACCESS_TOKEN = 'accessToken'

export const authentication = {
    authenticated: true,
    user: undefined
}

export const getToken = () => {
    return Cookies.get(ACCESS_TOKEN)
}

export const setToken = (token) => {
    Cookies.set(ACCESS_TOKEN, token)
}

export const removeToken = () => {
    Cookies.remove(ACCESS_TOKEN)
}

export const getLoginUser = () => {
    Http.get('/authservice/user/me').then(res => {
        console.log('current login user: ' + res.data)
        authentication.authenticated = true
        authentication.user = res.data
    }).catch(err => {
        console.log(err.response)
        authentication.authenticated = false
    })
}