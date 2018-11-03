import { REGISTER_USER, SIGNIN_USER, AUTO_SIGNIN, GET_USER_POSTS } from "../types";
import { SIGNUP, SIGNIN, REFRESH_TOKEN, FIREBASE_URL } from "../../utility/misc";
import axios from "axios";

export const signUp = authData => {
    return dispatch => {
        // fetch(SIGNUP, {
        //     method: "POST",
        //     body: JSON.stringify({
        //         email: authData.email,
        //         password: authData.password,
        //         returnSecureToken: true
        //     }),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        // .then(res => res.json())
        // .then(parsedRes => {
        //     console.log(parsedRes);
        //     if (parsedRes.error) {
        //         alert("Authentication failed, please try again !")
        //     } else {
        //         dispatch(authSetUser(parsedRes));
        //     }
        // })
        // .catch(e => console.log(e))
        return axios({
            method: "POST",
            url: SIGNUP,
            data: {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            },
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => {
            dispatch(authSetUser(res.data));
            return res.data;
        }).catch(e => {
            console.log(e);
        })
    };
};

export const signIn = authData => {
    return dispatch => {
        return axios({
            method: "POST",
            url: SIGNIN,
            data: {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            dispatch(signInUser(res.data));
            return res.data;
        }).catch(e => {
            console.log('Error ' + e);
        })
    }
};

export const signInUser = data => {
    return {
        type: SIGNIN_USER,
        payload: data
    }
};

export const authSetUser = data => {
    return {
        type: REGISTER_USER,
        payload: data
    }
};

export const autoSignIn = (refToken) => {
    return dispatch => {
        return axios({
            method: "POST",
            url: REFRESH_TOKEN,
            data: "grant_type=refresh_token&refresh_token=" + refToken,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            dispatch(getRefToken(res.data));
            return res.data;
        }).catch(e => {
            console.log('Error '+e);
        })
    }
};

export const getRefToken = (refToken) => {
    return {
        type: AUTO_SIGNIN,
        payload: refToken
    };
};

export const getUserPosts = (UID) => {
    console.log(UID);
    return dispatch => {
        return axios(`${FIREBASE_URL}/articles.json?orderBy=\"uid\"&equalTo=\"${UID}\"`)
            .then(response => {
                console.log(response.data);
                const articles = [];

                for (let key in response.data) {
                    articles.push({
                        ...response.data[key],
                        id: key
                    });
                }

                dispatch({
                    type: GET_USER_POSTS,
                    payload: articles
                });
                return articles;
            })
    };
};
