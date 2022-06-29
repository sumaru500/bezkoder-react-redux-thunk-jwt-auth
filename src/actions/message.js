import {SET_MESSAGE, CLEAR_MESSAGE} from "../const/action.const.js";

// actions related to messages (notifications) from APIs
export const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message,
})
export const clearMessage = () => ({
    type: CLEAR_MESSAGE,
})