import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, AsyncStorage } from 'react-native';
import { connect } from "react-redux";

import { getUserPosts } from "../../../store/actions/user_actions";

class UserPosts extends Component {
    static navigatorButtons = {
        leftButtons: Platform.OS === 'ios' ?
            [
                {
                    title: 'Go back',
                    id: 'goBack'
                }
            ]
            : null
    };

    constructor(props) {
        super(props);

        if (Platform.OS === "ios") {
           this.props.navigator.setOnNavigatorEvent(event => {
               if (event.id === 'goBack') {
                   this.props.navigator.dismissAllModals({
                       animationType: 'slide-down'
                   })
               }
           })
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    componentDidMount() {
        AsyncStorage.getItem('@sellitApp@uid').then(uid => {
            this.props.getUserPosts(uid).then(data => {
                this.setState({
                    articles: data
                });
            });

        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>UserPosts created !</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const mapStateToProps = state => {
    return {
        User: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserPosts: (UID) => dispatch(getUserPosts(UID))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
