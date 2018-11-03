import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Modal, SafeAreaView } from 'react-native';
import { connect } from "react-redux";

import { navigatorDrawer, getTokens, setTokens } from "../../../utility/misc";
import validate from "../../../utility/form/validation";
import Input from "../../../utility/form/inputs";
import { addArticle } from "../../../store/actions/articles_actions"
import { autoSignIn } from "../../../store/actions/user_actions"

class AddPost extends Component {
    constructor(props) {
        super(props);

        this.props.navigator.setOnNavigatorEvent((event) => {
            navigatorDrawer(event, this)
        });
    }

    state = {
        loading: false,
        hasErrors: false,
        errorsArray: [],
        modalVisible: false,
        modalSuccess: false,
        form: {
            category: {
                value: "",
                name: "category",
                valid: false,
                type: "picker",
                options: ['Select a category', 'Sports', 'Music', 'Clothing', 'Electronics'],
                rules: {
                    notEmpty: true,
                },
                touched: false,
                errorMsg: "You need to select  category"
            },
            title: {
                value: "",
                name: "title",
                valid: false,
                type: "textinput",
                rules: {
                    notEmpty: true,
                    maxLength: 50
                },
                touched: false,
                errorMsg: "You need to enter a title, max of 50 char"
            },
            description: {
                value: "",
                name: "description",
                valid: false,
                type: "textinput",
                rules: {
                    notEmpty: true,
                    maxLength: 200
                },
                touched: false,
                errorMsg: "You need to enter a description, max of 200 char"
            },
            price: {
                value: "",
                name: "price",
                valid: false,
                type: "textinput",
                rules: {
                    notEmpty: true,
                    maxLength: 6
                },
                touched: false,
                errorMsg: "You need to enter a price, max of 6"
            },
            email: {
                value: "",
                name: "email",
                valid: false,
                type: "textinput",
                rules: {
                    notEmpty: true,
                    isEmail: true
                },
                touched: false,
                errorMsg: "You need to enter an email, make it a valid email"
            },
        }
    };

    updateInput = (key, value) => {
        this.setState(prevState => {
            return {
                hasErrors: false,
                form: {
                    ...prevState.form,
                    [key]: {
                        ...prevState.form[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.form[key].rules
                        ),
                        touched: true
                    },
                }
            }
        });
    };

    submitFormHandler = () => {
        let isFormValid = true;
        const result = {};

        const form = this.state.form;

        for (let key in form) {
                if  (key !== "confirmPassword") {
                isFormValid = isFormValid && form[key].valid;
                result[key] = form[key].value
            }
        }

        if (isFormValid) {
            this.setState(prevState => {
                return {
                    ...prevState,
                    loading: false,
                    form: {
                        ...prevState.form,
                        category: {
                            ...prevState.form.category,
                            value: ''
                        },
                        title: {
                            ...prevState.form.title,
                            value: ''
                        },
                        description: {
                            ...prevState.form.description,
                            value: ''
                        },
                        price: {
                            ...prevState.form.price,
                            value: ''
                        },
                        email: {
                            ...prevState.form.price,
                            value: ''
                        }
                    }
                }
            });

            getTokens((val) => {
                const dateNow = new Date();
                const expiration = dateNow.getTime();
                const form = {
                    ...result,
                    uid: val[3][1]
                };

                if  (expiration > val[2][1]) {
                    // console.log(this.props.User.userData.token);
                    this.props.autoSignIn(val[1][1]).then(() => {
                        setTokens(!this.props.User.userData, () => {
                            this.props.addArticle(form, this.props.User.userData.token).then(() => {
                                this.setState({
                                    loading: false
                                });
                                this.props.navigator.switchToTab({
                                    tabIndex: 0
                                })
                            })
                        })
                    })
                } else {
                    // console.log(val[0][1]);
                    this.props.addArticle(form, val[0][1]).then(() => {
                        this.props.navigator.switchToTab({
                            tabIndex: 0
                        })
                    })
                }
            })
        } else {
            let errorsArray = [];

            for (let key in form) {
                if  (!form[key].valid) {
                    errorsArray.push(form[key].errorMsg)
                }
            }

            this.setState({
                loading: false,
                hasErrors: true,
                modalVisible: true,
                errorsArray
            });
        }
    };

    showErrorsArray = (errors) => (
        errors ?
            errors.map((el, i) => (
                <Text
                    key={i}
                    style={styles.errorItem}
                >
                    - {el}
                </Text>
            ))
        : null
    );

    closeModal = () => {
        this.setState({
            hasErrors: false,
            errorsArray: [],
            modalVisible: false,
        });
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.titleContainer}>
                        <Text style={styles.mainTitle}>Sell you things</Text>
                    </View>

                    <View style={styles.mainContent}>
                        <View style={{flex: 1}}>
                            <Text style={{fontSize: 18}}>Select a category</Text>
                        </View>

                        <View style={{flex: 1}}>
                            <Input
                                placeholder="Select a category"
                                type={this.state.form.category.type}
                                value={this.state.form.category.value}
                                onValueChange={val => this.updateInput('category', val)}
                                options={this.state.form.category.options}
                            />
                        </View>

                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.secondTitle}>Describe what are you selling</Text>
                    </View>

                    <View>
                        <Text>Please add the title,be descriptive</Text>
                        <Input
                            placeholder="Enter a title"
                            type={this.state.form.title.type}
                            value={this.state.form.title.value}
                            onChangeText={val => this.updateInput('title', val)}
                            overrideStyle={styles.inputText}
                        />
                    </View>

                    <View>
                        <Input
                            placeholder="Enter the description"
                            type={this.state.form.description.type}
                            value={this.state.form.description.value}
                            onChangeText={val => this.updateInput('description', val)}
                            multiline={true}
                            numberOfLines={4}
                            overrideStyle={styles.inputTextMultiline}
                        />
                    </View>

                    <View>
                        <Text style={{marginVertical: 20}}>Add here how much you want for the item</Text>
                        <Input
                            placeholder="Enter a price"
                            type={this.state.form.price.type}
                            value={this.state.form.price.value}
                            onChangeText={val => this.updateInput('price', val)}
                            overrideStyle={styles.inputText}
                            keyboardType={'numeric'}
                        />
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.secondTitle}>Add you contact data</Text>
                    </View>

                    <View>
                        <Text>Please enter email when user can contact you</Text>
                        <Input
                            placeholder="Enter an email"
                            type={this.state.form.email.type}
                            value={this.state.form.email.value}
                            onChangeText={val => this.updateInput('email', val)}
                            overrideStyle={styles.inputText}
                            autoCapitalize={'none'}
                            keyboardType={'email-address'}
                        />
                    </View>

                    {
                        !this.state.loading ?
                            <Button
                                title={'Sell it'}
                                color={'lightgrey'}
                                onPress={this.submitFormHandler}
                            />
                        : null
                    }

                    <Modal
                        animationType="slide"
                        visible={this.state.modalVisible}
                        onRequestClose={() => {}}
                    >
                        <SafeAreaView>
                            <View style={{padding: 20}}>
                                {this.showErrorsArray(this.state.errorsArray)}
                            </View>

                            <Button
                                title={'Go back'}
                                onPress={this.closeModal}
                            />
                        </SafeAreaView>

                    </Modal>

                    <Modal
                        animationType="slide"
                        visible={this.state.modalSuccess}
                        onRequestClose={() => {}}
                    >

                    </Modal>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        padding: 20
    },
    titleContainer: {
        flex: 1,
        alignItems: "center"
    },
    mainTitle: {
        fontFamily: "Roboto-Black",
        fontSize: 30,
        color: "#00ada9"
    },
    mainContent: {
        flexDirection: "row",
        alignItems: "center"
    },
    secondTitle: {
        fontFamily: "Roboto-Black",
        fontSize: 20,
        color: "#00ada9",
        marginVertical: 30
    },
    inputText: {
        backgroundColor: "#f2f2f2",
        borderBottomWidth: 0,
        padding: 10
    },
    inputTextMultiline: {
        backgroundColor: "#f2f2f2",
        borderBottomWidth: 0,
        padding: 10,
        minHeight: 100
    },
    errorItem: {
        fontFamily: "Roboto-Black",
        fontSize: 16,
        color: "red",
        marginBottom: 10
    }
});

const mapStateToProps = state => {
    return {
        Articles: state.articles,
        User: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addArticle: (data, token) => dispatch(addArticle(data, token)),
        autiSignIn: () => dispatch(autoSignIn(this.props.User.userData.refToken))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
