
import {LOGIN, LOGOUT, RESET_TEXT, ADD_TEXT, GET_USERNAME} from 'redux/actions/actionTypes';

export const token = (state = "", action) => {
    switch(action.type) {
        case LOGIN:
            return action.token;

        case LOGOUT:
            return "";

        default:
            break;
    }
    return state;
}

export const texts = (state = [], action) => {
    switch(action.type) {
        case RESET_TEXT:
            return [];

        case ADD_TEXT:
            return [
                ...state,
                action.text
            ];

        default:
            break;
    }
    return state;
}

export const username = (state = '', action) => {
    switch(action.type) {
        case GET_USERNAME:
            return action.username;
        default:
            break;
    }
    return state;
}
