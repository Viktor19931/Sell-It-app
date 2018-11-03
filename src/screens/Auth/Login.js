import React, {Component} from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { connect } from "react-redux";

import startTabs from "../Tabs/Tabs"
import Logo from "../../components/Logo/Logo";
import {
    getOrientation,
    setOrientationListener,
    removeOrientationListener,
    getPlatform,
    getTokens,
    setTokens
} from "../../utility/misc";
import LoginPanel from "./LoginPanel";
import { autoSignIn } from "../../store/actions/user_actions";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orientation: getOrientation(500),
            platform: getPlatform(),
            logoAnimation: false,
            loading: true
        };

        setOrientationListener(this.changeOrientation);
    }

    changeOrientation = () => {
        this.setState({
            orientation: getOrientation(500)
        })
    };

    componentWillUnmount() {
        removeOrientationListener();
    }

    showLogin = () => {
        this.setState({
            logoAnimation: true
        });
    };

    componentDidMount() {
        getTokens(value => {
            console.log(value);
            if  (value[0][1] === null) {
                console.log('! null');
                this.setState({ loading: false })
            } else {
                console.log('not null');
                this.props.autoSignIn(value[1][1]).then(() => {
                    if  (!this.props.User.userData.token) {
                        this.setState({ loading: false })
                    } else {
                        setTokens(this.props.User.userData, () => {
                            startTabs(true);
                        })
                    }
                });
            }
        })

    }

    render() {

        if (this.state.loading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size="large"/>
                </View>
            );
        } else {
            return (
                <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                    <ScrollView>
                        <View style={styles.container}>
                            <Logo
                                orientation={this.state.orientation}
                                showLogin={this.showLogin}
                            />
                            <LoginPanel
                                orientation={this.state.orientation}
                                show={this.state.logoAnimation}
                                platform={this.state.platform}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});

const mapStateToProps = state => {
    return {
        User: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        autoSignIn: (refToken) => dispatch(autoSignIn(refToken))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
