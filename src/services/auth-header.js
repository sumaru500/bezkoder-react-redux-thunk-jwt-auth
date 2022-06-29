import * as LocalStorageKey from '../const/localStorage.key.js';
// a helper function to create header info
// build header from localStorage/user
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem(LocalStorageKey.USER_KEY));
    if (user && user.accessToken) {
        // SpringBoot
        return {Authorization: 'Bearer ' + user.accessToken};
        // Nodejs express
        // return {'x-access-token': user.accessToken};
    }
    else  {
        return {}
    }
}