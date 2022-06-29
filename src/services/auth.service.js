import axios from "axios";
import * as AuthConfig from "./auth.const.js";
import * as LocalStorageKey from '../const/localStorage.key.js';

class AuthService {
    // send username, password, return user information with JWT token
    // signin{username, password}
    login(username, password) {
        return axios
        .get(AuthConfig.API_URL + AuthConfig.SIGNIN_URI, {username, password})
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem(LocalStorageKey.USER_KEY, JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    // remove user info
    logout() {
        localStorage.removeItem(LocalStorageKey.USER_KEY)
    }

    signup(username, password, email) {
        return axios
        .post(AuthConfig.API_URL + AuthConfig.SIGNUP_URI, {username, password, email});
    }
}

export default new AuthService();