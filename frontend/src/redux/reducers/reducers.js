import * as a from 'redux/actions/actionTypes';

export const token = (state = "", action) => {
    switch(action.type) {
        case a.GET_TOKEN:
            return action.token;
        default:
            break;
    }
    return state;
}

export const username = (state = '', action) => {
    switch(action.type) {
        case a.GET_USERNAME:
            return action.username;
        default:
            break;
    }
    return state;
}

export const chats = (state = [], action) => {
    switch(action.type) {
        case a.CHAT_MESSAGE:
            let chat = action.username + ': ' + action.message
            return [...state, chat];
        default:
            break;
    }
    return state;
}

export const is_logged_in = (state = false, action) => {
    switch(action.type) {
        case a.IS_LOGGED_IN:
            return action.bool;
        default:
            break;
    }
    return state;
}

export const userlist = (state = [], action) => {
    switch(action.type) {
        case a.MODIFY_USER_LIST:
            switch(action.is_logged_in) {
                case true:
                    return [...state,action.username];
                case false:
                    let temp = state;
                    temp.splice(temp.indexOf(action.username),1);
                    return temp;
                default:
                    break;
            }
        default:
            break;
    }
    return state;
}
