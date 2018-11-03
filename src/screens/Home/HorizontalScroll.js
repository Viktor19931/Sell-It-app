import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import Icon from "react-native-vector-icons/FontAwesome";

const categoriesIcons = (val) => {
    let name = '';


    switch (val) {
        case 'All':
            name = 'circle-o-notch';
            break;
        case 'Sports':
            name = 'soccer-ball-o';
            break;
        case 'Music':
            name = 'music';
            break;
        case 'Clothing':
            name = 'shopping-bag';
            break;
        case 'Electronics':
            name = 'tv';
            break;
        default:
            name = '';
    }

    return name;
};


class HorizontalScroll extends Component {
    generateIcon = (categories) => (
        categories ?
            categories.map(item => (
                <View style={{marginRight: 15}} key={item}>
                    <Icon.Button
                        name={categoriesIcons(item)}
                        iconStyle={{marginRight: 10, marginLeft: 3}}
                        backgroundColor={
                            this.props.categorySelected !== item ? "#c1c1c1" : "#FF6444"
                        }
                        size={20}
                        borderRadius={200}
                        onPress={() => this.props.updateCategoryHandler(item)}
                    >
                        <Text style={{color: '#fff', marginRight: 5}}>{item}</Text>
                    </Icon.Button>
                </View>
            ))
        : null
    );

    render() {
        return (
            <ScrollView
                horizontal={true}
                decelerationRate={0}
                snapToInterval={200}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.scrollContainer}>
                    {this.generateIcon(this.props.categories)}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        width: '100%'
    }
});

export default HorizontalScroll;
