import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncImage from "../AsyncImage/AsyncImage";

const BlockItem = ({item, iteration, toArticleDetails}) => {
    const itemImage = () => (
        <View>
            <AsyncImage
                resizeMode="cover"
                style={styles.itemImage}
                source={{uri: 'https://loremflickr.com/400/400/girl,brazil,dog'}}
                loadingSize={"small"}
            />
        </View>
    );

    const itemText = (item) => (
        <View style={styles.itemTextContainer}>
            <Text style={styles.itemTextTitle}>
                {item.title}
            </Text>
            <Text style={styles.itemTextPrice}>
                $ {item.price}
            </Text>
        </View>
    );

    const block = () => (
        <View style={styles.blockRow}>
            <TouchableOpacity
                style={{flex: 2}}
                onPress={() => {
                    toArticleDetails(item.blockOne)
                }}
            >
                <View style={[
                    styles.blockGreedStyle,
                    styles.blockGreedStyleLeft
                ]}>
                    {itemImage()}
                    {itemText(item.blockOne)}
                </View>
            </TouchableOpacity>
            <View style={{flex: 2}}>
                { item.blockTwo ?
                    <TouchableOpacity
                        style={{flex: 1}}
                        onPress={() => {
                            toArticleDetails(item.blockTwo)
                        }}
                    >
                        <View style={[
                            styles.blockGreedStyle,
                            styles.blockGreedStyleRight
                        ]}>
                            {itemImage()}
                            {itemText(item.blockTwo)}
                        </View>
                    </TouchableOpacity>
                    : null
                }
            </View>
        </View>
    );

    return (
        <View>
            {block()}
        </View>
    );
};

const styles = StyleSheet.create({
    blockRow: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'space-between'
    },
    itemImage: {
        width: '100%',
        height: 200
    },
    itemTextContainer: {
        padding: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#FF6444'
    },
    itemTextTitle: {
        fontFamily: 'Roboto-Black',
        color: '#4C4C4C',
        marginBottom: 5
    },
    itemTextPrice: {
        fontFamily: 'Roboto-Black',
        color: '#00ada9',
        marginBottom: 5
    },
    blockGreedStyle: {
        backgroundColor: '#F1F1F1'
    },
    blockGreedStyleLeft: {
        marginRight: 2.5
    },
    blockGreedStyleRight: {
        marginLeft: 2.5
    }
});

export default BlockItem;
