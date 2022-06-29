import {SET_MESSAGE, CLEAR_MESSAGE} from '../const/action.const.js';

const initialState = {};
export default function reducer(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case SET_MESSAGE:
            return {message: payload};
        case CLEAR_MESSAGE:
            return {message: ''};
        default:
            return state;
    }
}

