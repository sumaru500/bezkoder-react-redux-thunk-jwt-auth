import axios from 'axios';
import authHeader from './auth-header.js';
import * as UserConfig from './user.const.js';

class UserService {
    // not needed authenticated
    getPublicContent() {
        return axios.get(UserConfig.API_URL + UserConfig.ALL_URI)
    }

    getUserBoard() {
        return axios.get(UserConfig.API_URL + UserConfig.USER_URI, {headers: authHeader()})
    }
    
    getModeratorBoard() {
        return axios.get(UserConfig.API_URL + UserConfig.MODERATOR_URI, {headers: authHeader()})        
    }
    
    getAdminBoard() {
        return axios.get(UserConfig.API_URL + UserConfig.ADMIN_URI, {headers: authHeader()})
    }
}

export default new UserService();
