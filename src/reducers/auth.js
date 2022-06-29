import {
    REGISTER_SUCCESS,
    REGISTER_FAILURE, 
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
} from '../const/action.const.js';
import {USER_KEY} from '../const/localStorage.key'

const user = JSON.parse(localStorage.getItem(USER_KEY))
const isLogged = user? true : false;
const initialState = {isLogged, user};

export default function reducer(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLogged : false,
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                isLogged : false,
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                isLogged: true,
                user: payload.user,
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLogged: false,
                user: null,
            }
        case LOGOUT:
            return {
                ...state,
                isLogged : false,
                user: null,
            }
        default:
                return state;
    }
}