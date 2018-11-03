import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { toLogin } from "../../../utility/misc"

import Icon from "react-native-vector-icons/FontAwesome";
import { navigatorDrawer } from "../../../utility/misc";

class NotAllow extends Component {
    constructor(props) {
        super(props);

        this.props.navigator.setOnNavigatorEvent((event) => {
            navigatorDrawer(event, this)
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Icon
                    name="frown-o"
                    size={60}
                    color={'#f44336'}
                />
                <Text>
                    You need to log in or register to sell !
                </Text>
                <Button
                    title="LOGIN / REGISTER"
                    color="#FD9727"
                    onPress={toLogin}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default NotAllow;
