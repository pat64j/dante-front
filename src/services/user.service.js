import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:5000/api/v1/'

class UserService {
    getGroups(){
        return axios.get(API_URL + 'groups',{headers: authHeader()})
    }

}

export default new UserService()