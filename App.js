import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";

import LoginScreen from "./src/screens/Auth/Login";
import HomeScreen from "./src/screens/Home/Home";
import AddPostScreen from "./src/screens/Admin/AddPost/AddPost";
import NotAllowScreen from "./src/screens/Admin/AddPost/NotAllow";
import UserPostsScreen from "./src/screens/Admin/UserPosts/UserPosts";
import SideDrawerScreen from "./src/screens/SideDrawer/SideDrawer";
import ArticleScreen from "./src/screens/Article/Article";
import configureStore from './src/store/configureStore';

const store = configureStore();

Navigation.registerComponent(
    "App.LoginScreen",
    () => LoginScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "App.HomeScreen",
    () => HomeScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "App.AddPostScreen",
    () => AddPostScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "App.SideDrawerScreen",
    () => SideDrawerScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "App.UserPostsScreen",
    () => UserPostsScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "App.ArticleScreen",
    () => ArticleScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "App.NotAllowScreen",
    () => NotAllowScreen,
    store,
    Provider
);


Navigation.startSingleScreenApp({
    screen: {
        screen: "App.LoginScreen",
        title: "Login",
        navigatorStyle: {
            navBarHidden: true
        }
    }
});

