import api from '../axios';

class AuthService {
    async login(user){
        const response = await api
            .post('auth/login', user);
        if (response.status == 200 && response.data.data) {
            localStorage.setItem('user', JSON.stringify(response.data.data));
            localStorage.setItem('acc', JSON.stringify(response.data.owner));
            return {user: response.data.data, account: response.data.owner};
        }
        return response.data.error;
    }
    async logout(){
        await api
            .delete('auth/token-api').then(
                ()=>{
                    localStorage.removeItem('user');
                    localStorage.removeItem('acc');
                },
                ()=>{
                    localStorage.removeItem('user');
                    localStorage.removeItem('acc');
                }
            );
    }
    async register(user){
        const response = await api
            .post('auth/signup',{
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: user.password
            })
        console.log(response.data)
    }
    async updateAccount(user){
        const response = await api.put('user',user)
        if(response.status == 200){
            localStorage.removeItem('acc');
            localStorage.setItem('acc', JSON.stringify(response.data.data));
            return response.data;
        }
        return false;
    }
}

export default new AuthService();