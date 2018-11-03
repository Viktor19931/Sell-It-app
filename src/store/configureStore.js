import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import promiseMiddleware from "redux-promise";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import articles from "./reducers/articles_reducer";

const rootReducer = combineReducers({
    user: userReducer,
    articles
});

let composeEnhansers = compose;

if (__DEV__) {
    composeEnhansers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(rootReducer, composeEnhansers(applyMiddleware(thunk)));
};

export default configureStore;

