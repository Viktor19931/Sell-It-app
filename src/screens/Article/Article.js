import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, Linking } from 'react-native';
import AsyncImage from "../../components/AsyncImage/AsyncImage";

import Icon from "react-native-vector-icons/FontAwesome";

class Article extends Component {
    state = {
        loaded: false
    };

    onLoad = () => {
        console.log('loaded');
        this.setState({loaded: true});
    };

    articleImage = () => (
        <View style={styles.articleContainer}>
            <AsyncImage
                resizeMode={'cover'}
                source={{uri: 'https://loremflickr.com/400/400/girl,brazil,dog'}}
                style={styles.articleImage}
                onLoad={this.onLoad}
            />
            <Text
                style={styles.priceStyle}
            >
                $ {this.props.ArticleData.price}
            </Text>
        </View>
    );

    articleText = () => (
        <View>
            <Text style={styles.articleTitle}>
                {this.props.ArticleData.title}
            </Text>
            <Text style={styles.articleDescription}>
                {this.props.ArticleData.description}
            </Text>
        </View>
    );

    ownerInfo = () => (
        <View style={styles.ownerInfoStyles}>
            <Text>Contact the owner of this article to the following email:</Text>
            <Icon.Button
                name="envelope-o"
                color="#00ada9"
                backgroundColor={'white'}
                onPress={() => this.openEmail()}
            >
                <Text
                    style={{fontSize: 20}}
                >
                    {this.props.ArticleData.email}
                </Text>
            </Icon.Button>
        </View>
    );

    openEmail = () => {
        console.log(this.props.ArticleData.email);
        Linking.openURL(`mailto://${this.props.ArticleData.email}`);
    };

    render()  {
            return (
                <View style={styles.container}>
                    <ScrollView>
                        {this.articleImage()}
                        {this.articleText()}
                        {this.ownerInfo()}
                    </ScrollView>
                </View>
            );
        }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        position: 'relative'
    },
    articleContainer: {
        position: 'relative',
        backgroundColor: '#c8c8c8'
    },
    articleImage: {
        width: '100%',
        height: 300
    },
    priceStyle: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "#FF6444",
        padding: 10,
        color: "#fff",
        fontSize: 20,
        fontFamily: "Roboto-Black"
    },
    indicator: {
        height: 250,
        width: "100%",
        position: "absolute",
        justifyContent: "center"
    },
    articleTitle: {
        fontSize: 30,
        color: "#474143",
        fontFamily: "Roboto-Black",
        marginTop: 20
    },
    articleDescription: {
        marginTop: 20,
        fontSize: 18
    },
    ownerInfoStyles: {
        marginTop: 30,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: "lightgrey"
    }
});

export default Article;
