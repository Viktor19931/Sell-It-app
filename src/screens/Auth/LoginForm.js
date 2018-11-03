import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { connect } from "react-redux";

import Input from "../../utility/form/inputs";
import validate from "../../utility/form/validation";
import startTabs from "../../screens/Tabs/Tabs";
import { signUp, signIn } from "../../store/actions/user_actions";
import { setTokens } from "../../utility/misc";

class LoginForm extends Component {
    state = {
        type: "Login",
        action: "Login",
        actionMode: "Not a User, Register",
        hasErrors: false,
        form: {
            email: {
                value: "",
                valid: false,
                type: "textinput",
                rules: {
                    notEmpty: true,
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                type: "textinput",
                rules: {
                    notEmpty: true,
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: "",
                valid: false,
                type: "textinput",
                rules: {
                    equalTo: 'password'
                },
                touched: false
            }
        }
    };

    updateInput = (key, value) => {
        let connectedValue = {};
        if (this.state.form[key].rules.equalTo) {
            const equalControl = this.state.form[key].rules.equalTo;
            const equalValue = this.state.form[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }
        if (key === 'password') {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }
        this.setState(prevState => {
            return {
                hasErrors: false,
                form: {
                    ...prevState.form,
                    confirmPassword: {
                        ...prevState.form.confirmPassword,
                        valid: key === 'password'
                            ? validate(
                                prevState.form.confirmPassword.value,
                                prevState.form.confirmPassword.rules,
                                connectedValue
                            )
                            : prevState.form.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.form[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.form[key].rules,
                            connectedValue
                        ),
                        touched: true
                    },
                },
            };
        });
    };

    changeFormType = () => {
        const type = this.state.type;
        this.setState({
            type: type === "Login" ? "Register" : "Login",
            action: type === "Login" ? "Register" : "Login",
            actionMode: type === "Login" ? "Already registered, Login" : "Not a User, Register",
        });
    };

    confirmPassword = () => (
        this.state.type !== "Login" ?
            <Input
                placeholder="Confirm Password"
                type={this.state.form.confirmPassword.type}
                value={this.state.form.confirmPassword.value}
                onChangeText={val => this.updateInput('confirmPassword', val)}
                secureTextEntry
            />
        : null
    );

    formHasError = () => (
       this.state.hasErrors ?
           <View style={styles.errorContainer}>
               <Text style={styles.errorLabel}>Oops, please check your info !</Text>
           </View>
       : null
    );

    submitUser = () => {
        let isFormValid = true;
        const result = {
            email: this.state.form.email.value,
            password: this.state.form.password.value
        };

        const form = this.state.form;

        for (let key in form) {
            if  (this.state.type === "Login") {
                if  (key !== "confirmPassword") {
                    isFormValid = isFormValid && form[key].valid;
                }
            } else {
                isFormValid = isFormValid && form[key].valid
            }
        }

        if (isFormValid) {
            if  (this.state.type === "Login") {
                this.props.signIn(result).then(() => {
                    this.manageAccess();
                });
            } else {
                this.props.signUp(result).then(() => {
                    this.manageAccess();
                });
            }
        }else{
            this.setState({
                hasErrors: true
            });
        }
    };

    manageAccess = () => {
        if (!this.props.User.userData.uid) {
            this.setState({ hasErrors: true });
        } else {
            setTokens(this.props.User.userData, () => {
                this.setState({hasErrors: false});
                startTabs(true);
            })
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Input
                    placeholder="Enter your email"
                    type={this.state.form.email.type}
                    value={this.state.form.email.value}
                    onChangeText={val => this.updateInput('email', val)}
                    autoCapitalize={'none'}
                    keyboardType={'email-address'}
                />
                <Input
                    placeholder="Password"
                    type={this.state.form.password.type}
                    value={this.state.form.password.value}
                    onChangeText={val => this.updateInput('password', val)}
                    secureTextEntry
                />
                {this.confirmPassword()}
                {this.formHasError()}
                <View style={
                    this.props.platform === "ios"
                    ? styles.btnStylesIos
                    : styles.btnStylesAndroid
                }>
                    <Button
                        title={this.state.action}
                        color="#fd9727"
                        onPress={this.submitUser}

                    />
                </View>

                <View style={
                   this.props.platform === "ios"
                       ? styles.btnStylesIos
                       : styles.btnStylesAndroid
                }>
                    <Button
                        title={this.state.actionMode}
                        color="lightgrey"
                        onPress={this.changeFormType}
                    />
                </View>

                <View>
                    <Button
                        title="I will to it later"
                        color="lightgrey"
                        onPress={() => startTabs(false)}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        minHeight: 400
    },
    btnStylesAndroid: {
        marginVertical: 10
    },
    btnStylesIos: {
        marginVertical: 10

    },
    errorContainer: {
        marginBottom: 20,
        marginTop: 10
    },
    errorLabel: {
        color: "red",
        fontFamily: "Roboto-Black"
    }
});

const mapStateToProps = state => {
    console.log(state);
    return {
        User: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signUp: (data) => dispatch(signUp(data)),
        signIn: (data) => dispatch(signIn(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
