import axios from  './axios'

const TOKEN = '@token'

export const isAuthenticated = () => {
    const token = localStorage.getItem(TOKEN)
    if(token && token.length >= 60){
        const validToken = axios.post('/validateToken', { token })
            .then(resp => resp.data.message )

        if(validToken) {
            return true
        }
    } else {
        return false
    }
}