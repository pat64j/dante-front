import api from '../axios';
import authHeader from './auth-header';


class UserService {
    getGroups(){
        return api.get('groups',{headers: authHeader()})
    }

}

export default new UserService()