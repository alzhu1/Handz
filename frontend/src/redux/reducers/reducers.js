import {createStore, combineReducers} from "redux";
import {LOGIN, LOGOUT, RESET_TEXT, ADD_TEXT} from 'redux/actions/actionTypes';

const token = (state = "", action) => {
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

const texts = (state = [], action) => {
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

const allReducers = combineReducers({token, texts});

const initialState = {token: "", texts: []} ;

export const store = createStore(allReducers, initialState);
