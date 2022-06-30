import * as LocalStorageKey from '../const/localStorage.key.js';
import {CURRENT_BACKEND, SPRING_BACKEND, NODE_BACKEND} from '../config/index'
// a helper function to create header info
// build header from localStorage/user
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem(LocalStorageKey.USER_KEY));
    if (user && user.accessToken) {
        const headers = CURRENT_BACKEND === SPRING_BACKEND ? 
        // SpringBoot
        {Authorization: 'Bearer ' + user.accessToken} :
        // Nodejs express
        {'x-access-token': user.accessToken};

        return headers;
    }
    else  {
        return {}
    }
}