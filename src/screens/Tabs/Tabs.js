import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

const navStyle = {
    navBarTextFontSize: 20,
    navBarTextColor: "#fff",
    navBarTextFontFamily: "Roboto-Bold",
    navBarTitleTextCentered: true,
    navBarBackgroundColor: "#00ADA9"// Android only
};

const navLeftButton = (sources) => {
    return {
        title: "Drawer",
        id: "DrawerButton",
        icon: sources[0],
        disableIconTint: true,
        buttonColor: "#fff"
    };
};

const startTabs = (allow) => {
    Promise.all([
        Icon.getImageSource('bars', 20, 'white'),
        Icon.getImageSource('dollar', 20, 'white'),
        Icon.getImageSource('search', 20, 'white')
    ]).then((sources) => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "App.HomeScreen",
                    title: "Home",
                    label: "Home",
                    icon: sources[2],
                    navigatorStyle: navStyle,
                    navigatorButtons: {
                        leftButtons: [navLeftButton(sources)]
                    }
                },
                {
                    screen: allow ? "App.AddPostScreen" : "App.NotAllowScreen",
                    label: "Sell it",
                    title: "Sell it",
                    icon: sources[1],
                    navigatorStyle: navStyle,
                    navigatorButtons: {
                        leftButtons: [navLeftButton(sources)]
                    }
                }
            ],
            tabsStyle: { // for ios
                tabBarButtonColor: "grey",
                tabBarSelectedButtonColor: "#FFC636",
                tabBarTextFontFamily: "Roboto-Bold",
                tabBarBackgroundColor: "#fff",
                tabBarTranslucent: false
            },
            appStyle: { // for sndroid
                tabBarButtonColor: "grey",
                tabBarSelectedButtonColor: "#FFC636",
                tabBarTextFontFamily: "Roboto-Bold",
                tabBarBackgroundColor: "#fff",

                navBarButtonColor: "grey", // button styles when push screens
                keepStyleAcrossPush: true
            },
            drawer: {
                left: {
                    screen: "App.SideDrawerScreen",
                }
            }
        });
    });
};

export default startTabs;
