import axios from "axios"
import ENV from '../env'

const API = {

    loginWithFacebook: async (fbToken, userId) => {

        const res = await axios.request({
            url: ENV.API_HOST + '/users/authenticate-with-fb' + '?fb_user_id=' + userId,
            headers: { Authorization: fbToken }
        })

        return {
            token: res.data.jwt,
            userName: res.data.user.fullName
        }
    },

    createLink: async ({ originUrl, expire, optionalKey, userToken }) => {
        const config = {
            url: ENV.API_HOST + '/short-link',
            method: 'post',
            data: {
                originUrl,
                expire,
                optionalKey
            }
        }
        if (userToken)
            config.headers = { Authorization: 'Bearer ' + userToken }
        const res = await axios.request(config)

        return res.data
    }
}

export default API