import React from 'react';
import { StyleSheet, TextInput, Picker } from 'react-native';

const inputs = (props) => {
    let template = null;
    switch (props.type) {
        case "textinput":
            template =
                <TextInput
                    underlineColorAndroid="transparent"
                    {...props}
                    style={[styles.input, props.overrideStyle]}
                />;
        break;
        case "picker":
            template =
                <Picker
                    selectedValue={props.value}
                    {...props}

                >
                    {
                        props.options.map((el, i) => (
                            <Picker.Item
                                key={i}
                                label={el}
                                value={el}
                            />
                        ))
                    }
                </Picker>;
            break;
        default:
            return template;
    }
    return template;
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: "#eaeaea",
        fontSize: 18,
        padding: 5,
        marginTop: 10
    }
});

export default inputs;
