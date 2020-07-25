import axios from 'axios';
import authHeader from './auth-header'

const API_URL = 'http://127.0.0.1:5000/api/v1/auth/'

class AuthService {
    async login(user){
        const response = await axios
            .post(API_URL + 'login', {
                email: user.email,
                password: user.password
            });
        if (response.status == 200 && response.data.data) {
            localStorage.setItem('user', JSON.stringify(response.data.data));
            return true;
        }
        return response.data.error;
    }
    async logout(){
        const response = await axios
            .delete(API_URL + 'token-api',{
                headers: authHeader()
            });
        if(response.status == 200){
            localStorage.removeItem('user')
        }
    }
    async register(user){
        const response = await axios
            .post(API_URL + 'signup',{
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: user.password
            })
        console.log(response.data)
    }
}

export default new AuthService();