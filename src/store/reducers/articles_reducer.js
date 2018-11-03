import { GET_ARTICLES, ADD_ARTICLE } from "../types";

const INITIAL_STATE = {
    articles: [],
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ARTICLES:
            return {
                ...state,
                articles: action.payload
            };
            break;
        case ADD_ARTICLE:
            return {
                ...state,
                articles: [
                    ...state.articles,
                    action.payload
                ]
            };
            break;
        default:
            return state;
    }
};

export default reducer;
