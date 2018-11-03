import { FIREBASE_URL } from "../../utility/misc";
import { GET_ARTICLES, ADD_ARTICLE } from "../types";
import axios from "axios";


export const getArticles = (category) => {
    let URL = `${FIREBASE_URL}/articles.json`;

    if  (category !== 'All') {
        URL = `${URL}/?orderBy=\"category\"&equalTo=\"${category}\"`
    }

    return dispatch => {
        return axios(URL)
            .then(response => {
                const articles = [];

                for (let key in response.data) {
                    articles.push({
                        ...response.data[key],
                        id: key
                    });
                }

                dispatch(dispatchArticles(articles));
            });
    };
};

export const dispatchArticles = articles => {
    return {
        type: GET_ARTICLES,
        payload: articles
    };
};

export const addArticle = (data, token) => {
    return dispatch => {
        return axios({
            method: "POST",
            url: `${FIREBASE_URL}/articles.json?auth=${token}`,
            data
        }).then(responce => {
            dispatch({
                type: ADD_ARTICLE,
                payload: data
            });
            return responce.data;
        })
    };
}
