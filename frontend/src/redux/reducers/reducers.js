
import {LOGIN, LOGOUT, RESET_TEXT, ADD_TEXT} from 'redux/actions/actionTypes';

export const token = (state = "", action) => {
    switch(action.type) {
        case LOGIN:
            return action.payload;

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
                action.payload
            ];

        default:
            break;
    }
    return state;
}
