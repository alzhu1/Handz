import {createStore, combineReducers} from "redux";

const token = (state = "", action) => {
    switch(action.type) {
        case "LOGIN":
            return action.payload;

        case "LOGOUT":
            return "";

        default:
            break;
    }
    return state;
}

const texts = (state = [], action) => {
    switch(action.type) {
        case "RESET_TEXT":
            return [];

        case "ADD_TEXT":
            return [
                ...state,
                action.payload
            ];

        default:
            break;
    }
    return state;
}

export const store = createStore(combineReducers({token, texts}), {token: "", texts: []});
