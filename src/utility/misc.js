import { Dimensions, Platform, AsyncStorage } from 'react-native';
import { Navigation } from "react-native-navigation";

export const FIREBASE_URL = `https://auth-react-cbf3e.firebaseio.com`;
export const API_KEY = 'AIzaSyBji7T71j-E3grXhFRQlGQnz2eSU6EF3aE';
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
export const SIGNIN = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
export const REFRESH_TOKEN = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;

export const toLogin = () => {
    Navigation.startSingleScreenApp({
        screen: {
            screen: "App.LoginScreen",
            title: "Login",
            navigatorStyle: {
                navBarHidden: true
            }
        }
    })
};

export const getOrientation = value => {
    return Dimensions.get("window").height > value ? "portrait" : "landscape";
};

export const setOrientationListener = (callBack) => {
    return Dimensions.addEventListener("change", callBack)
};

export const removeOrientationListener = () => {
    return Dimensions.removeEventListener("change");
};

export const getPlatform = () => {
    if (Platform.OS === "ios") return "ios";
    else return "android";

};

export const navigatorDrawer = (event, $this) => {
    if  (event.type === "NavBarButtonPress" && event.id === "DrawerButton") {
        $this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true
        });
    }
};

export const gridTwoColumns = (list) => {
    let newArticles = [];
    let articles = list.articles;

    let id = 0;
    let count = 1;
    let vessel = {};

    if  (articles) {
        articles.forEach((el, i) => {
            if (count === 1) {
                vessel["blockOne"] = el;
                vessel.id = id;
                id++;
                count++;
                if (articles.length === i+1) {
                    newArticles.push(vessel);
                }
            } else {
                vessel["blockTwo"] = el;
                newArticles.push(vessel);
                count = 1;
                vessel = {};
            }
        })
    }
    return newArticles;
};

export const navigatorDeepLink = (event, $this) => {
    if (event.type === 'DeepLink') {
        $this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true
        });

        if  (event.payload.typeLink === 'tab') {
            $this.props.navigator.switchToTab({
                tabIndex: event.payload.indexLink
            })
        } else {
            $this.props.navigator.showModal({
                screen: event.link,
                animationType: "slide-horizontal",
                navigatorStyle: {
                    navBarBackgroundColor: "#00ADA9",
                    screenBackgroundColor: "#fff",
                    navBarButtonColor: '#fff'
                },
                backButtonHidden: false
            });
        }
    }

};

export const getTokens = cb => {
    AsyncStorage.multiGet([
        '@sellitApp@token',
        '@sellitApp@refreshToken',
        '@sellitApp@expireToken',
        '@sellitApp@uid'
    ]).then((values) => {
        cb(values);
    })
};

export const removeTokens = () => {
    AsyncStorage.multiRemove([
        '@sellitApp@token',
        '@sellitApp@refreshToken',
        '@sellitApp@expireToken',
        '@sellitApp@uid'
    ]);
};

export const setTokens = (data, cb) => {
    console.log(data);
    const time = new Date();
    const expiration = time.getTime() + (3600 * 1000);

    AsyncStorage.multiSet([
        ['@sellitApp@token', data.token],
        ['@sellitApp@refreshToken', data.refToken],
        ['@sellitApp@expireToken', expiration.toString()],
        ['@sellitApp@uid', data.uid],
    ]).then(() => {
        cb();
    })
};
