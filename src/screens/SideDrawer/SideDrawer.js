import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, AsyncStorage } from 'react-native';
import { connect } from "react-redux";

import { toLogin, removeTokens } from "../../utility/misc";
import Icon from "react-native-vector-icons/FontAwesome";

class SideDrawer extends Component {
    state = {
        buttons: [
            {
                value: "Home",
                iconName: "home",
                shouldGoTo: "App.HomeScreen",
                typeLink: "tab",
                index: 0,
                privacy: false
            },
            {
                value: "Sell",
                iconName: "dollar",
                shouldGoTo: "App.AddPostScreen",
                typeLink: "tab",
                index: 1,
                privacy: false
            },
            {
                value: "My posts",
                iconName: "th-list",
                shouldGoTo: "App.UserPostsScreen",
                typeLink: "view",
                index: null,
                privacy: true  // show if user loged in
            },
            {
                value: "Log out",
                iconName: "sign-out",
                shouldGoTo: "App.LoginScreen",
                typeLink: "view",
                index: null,
                privacy: false
            }
        ]
    };

    showButtons = (buttons) => (
        buttons.map(button => (
            !button.privacy ?
                this.button(button)
            :
                this.props.User.userData ?
                    this.button(button)
                    : null
        ))
    );

    button = (button) => (
        <Icon.Button
            key={button.value}
            name={button.iconName}
            backgroundColor="#474143"
            iconStyles={{width: 15}}
            color="#fff"
            size={18}
            onPress={() => {
                if (button.value === 'Log out')  {
                    removeTokens();
                    toLogin();
                } else {
                    this.props.navigator.handleDeepLink({
                        link: button.shouldGoTo,
                        payload: {
                            typeLink: button.typeLink,
                            indexLink: button.index
                        }
                    });
                }
            }}
        >
            <Text style={styles.btnText}>
                {button.value}
            </Text>
        </Icon.Button>
    );

    render() {
        const { btnContainer, safeArea } = styles;
        return (
            <SafeAreaView style={safeArea}>
            <View style={styles.container}>
               <View style={btnContainer}>
                   {this.showButtons(this.state.buttons)}
               </View>
            </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#474143"
    },
    container: {
        flex: 1,
        backgroundColor: "#474143",
        width: Dimensions.get("window").width * 0.8,
    },
    btnContainer: {
        padding: 10,
        marginTop: 20
    },
    btnText: {
        fontFamily: "Roboto-Regular",
        fontSize: 13,
        color: "#fff"
    }
});

const mapStateToProps = state => {
    return {
        User: state.user
    };
};

export default connect(mapStateToProps, null)(SideDrawer);
