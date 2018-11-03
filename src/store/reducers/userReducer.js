import {REGISTER_USER, SIGNIN_USER, AUTO_SIGNIN, GET_USER_POSTS} from "../types";

const INITIAL_STATE = {
    userData: {}
};

const reducer = (state = INITIAL_STATE, action) => {
    console.log(action.type);
    console.log(state);
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                userData: {
                    uid: action.payload.localId || false,
                    token: action.payload.idToken || false,
                    refToken: action.payload.refreshToken || false
                }
            };
        break;
        case SIGNIN_USER:
            return {
                ...state,
                userData: {
                    uid: action.payload.localId || false,
                    token: action.payload.idToken || false,
                    refToken: action.payload.refreshToken || false
                }
            };
        break;
        case AUTO_SIGNIN:
            return {
                ...state,
                userData: {
                    uid: action.payload.user_id || false,
                    token: action.payload.id_token || false,
                    refToken: action.payload.refresh_token || false
                }
            };
        break;
        case GET_USER_POSTS:
            return {
                ...state,
                articles: action.payload
            };
            break;
        default:
            return state;
    }
};

export default reducer;
