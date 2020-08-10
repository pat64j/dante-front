import axios from 'axios';

// let user = JSON.parse(localStorage.getItem('user'));
const api = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL + '/api/v1/'
});

api.defaults.headers.post['Content-Type'] = 'multipart/form-data'
api.defaults.headers.put['Content-Type'] = 'multipart/form-data'

api.interceptors.request.use(
    (config) => {
        let user = JSON.parse(localStorage.getItem('user'));
        if (config.url !== 'auth/login' && config.url !== 'auth/signup') {
            if (user && user.token) {
                config.headers.Authorization = 'Bearer ' + user.token
            }
        }
        if (config.url === 'auth/token-api' && config.method === 'post') {
            console.log("***********  setting bearer to refresh token.  *************");
            if (user && user.token) {
                config.headers.Authorization = 'Bearer ' + user.refresh_token
            }
        }

        return config;
    },
    (error) => {
        console.log("##### LOGGING FROM INTERCEPTOR ERROR  #######");
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => { return response },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 422 && originalRequest.url === 'auth/token' && originalRequest.method === 'post') {
            localStorage.removeItem('user');
            localStorage.removeItem('acc');
            return Promise.reject(error);
        }

        if ((error.response.status === 422 || error.response.status === 401) && !originalRequest._retry) {
            originalRequest._retry = true;
            const res = await api.post('auth/token-api');
            if (res.status === 201) {
                let user = JSON.parse(localStorage.getItem('user'));
                user.token = res.data.data.access_token;
                localStorage.removeItem('user');
                localStorage.setItem('user', JSON.stringify(user));
                api.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.data.access_token;

                return api(originalRequest);
            }
        }
        // return Error object with Promise
        return Promise.reject(error);
    }
);

export default api;