import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Animated } from 'react-native';

class AsyncImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            imageOpacity: new Animated.Value(0.0)
        }
    }

    onLoad = () => {
        const { imageOpacity } = this.state;

        Animated.sequence([
            Animated.parallel([
                Animated.timing(imageOpacity, {
                    toValue: 1.0,
                    delay: 200,
                    duration: 300,
                    useNativeDriver: true
                })
            ])
        ]).start(() => {
            this.setState(() => ({ loaded: true }))
        })
    };

    render() {
        const { style, source } = this.props;
        const { imageOpacity, loaded } = this.state;

        return (
            <View
                style={style}>
                <Animated.Image
                    source={source}
                    resizeMode={'contain'}
                    style={[
                        style,
                        {
                            opacity: imageOpacity,
                            position: 'absolute',
                            resizeMode: 'cover'
                        }
                    ]}
                    onLoad={this.onLoad} />
                {!loaded &&
                <View style={styles.indicator}>
                    <ActivityIndicator
                        size={this.props.loadingSize || 'large'}
                    />
                </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    indicator: {
        position: 'absolute',
        width: "100%",
        height: 250,
        justifyContent: "center"
    }
});

export default AsyncImage;
