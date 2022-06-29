import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    SET_MESSAGE,

} from '../const/action.const.js';
import AuthService from "../services/auth.service.js";
import * as Utils from "../utils";

// register action
export const register = (username, password, email) => {
    return async (dispatch) => {
        try {
            const response = await AuthService.signup(username, password, email);
            dispatch( {
                type: REGISTER_SUCCESS,
            });
            dispatch( {
                type: SET_MESSAGE,
                payload: response.data.message,
            })

        }
        catch (error) {
            dispatch({
                type: REGISTER_FAILURE
            });
            const message = Utils.getErrorMessage(error)

            dispatch ({
                type: SET_MESSAGE,
                payload: message,
            })    
        }     
    }
}

// login action
export const login = (username, password) => {
    return async (dispatch) => {
        try {
            const data = await AuthService.login(username, password);
            dispatch( {
                type: LOGIN_SUCCESS,
                payload: {user: data}
            })
        }
        catch (error) {
            dispatch({
                type: LOGIN_FAILURE
            })
            const message = Utils.getErrorMessage(error);
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            })
        }
    }
}

// logout action
export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch( {
        type: LOGOUT,
    })
}
