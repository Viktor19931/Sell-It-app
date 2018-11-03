import React, { Component } from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";

import { navigatorDrawer, navigatorDeepLink, gridTwoColumns } from "../../utility/misc";
import HorizontalScroll from "./HorizontalScroll";
import { getArticles } from "../../store/actions/articles_actions";
import BlockItem from "../../components/BlockItem/BlockItem";


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: ['All', 'Sports', 'Music', 'Clothing', 'Electronics'],
            categorySelected: 'All',
            articles: [],
            isLoading: true
        };

        this.props.navigator.setOnNavigatorEvent((event) => {
            navigatorDeepLink(event, this);
            navigatorDrawer(event, this);
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.Articles.articles);
        setTimeout(() => {console.log(this.state)}, 2000);
        this.spitArticles(nextProps.Articles);
    }

    componentWillMount() {
        this.fetchArticles('All');
    }

    spitArticles = (articles) => {
        console.log(articles);
        const newArticles = gridTwoColumns(articles);


        this.setState({
            isLoading: false,
            articles: newArticles
        });
    };

    fetchArticles = (name) => {
        this.props.getArticles(name).then(() => {
            this.spitArticles(this.props.Articles);
        });
    };

    updateCategoryHandler = (name) => {
        this.setState({
            isLoading: true,
            categorySelected: name,
            articles: []
        });

        this.fetchArticles(name);
    };

    goToArticleHandler = (article) => {
        this.props.navigator.push({
            screen: "App.ArticleScreen",
            animationType: "slide-horizontal",
            passProps: {
                ArticleData: article
            },
            backButtonTitle: "Back to home",
            navigatorStyle: {
                navBarTextFontSize: 20,
                navBarTextColor: "#fff",
                navBarButtonColor: "#fff",
                navBarTextFontFamily: "Roboto-Bold",
                navBarBackgroundColor: "#00ada9",
                screenBackgroundColor: "#fff"
            }
        });
    };

    showArticles = () => {
        return (
            this.state.articles.map((item, index) => (
                <BlockItem
                    key={item.id.toString()}
                    item={item}
                    iteration={index}
                    toArticleDetails={this.goToArticleHandler}
                />
            ))
        );
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <HorizontalScroll
                        categories={this.state.categories}
                        categorySelected={this.state.categorySelected}
                        updateCategoryHandler={this.updateCategoryHandler}
                    />
                    {
                        this.state.isLoading ?
                            <View style={styles.isLoading}>
                                <Icon
                                    name="gears"
                                    size={30}
                                    color="lightgrey"
                                />
                                <Text style={{color: "lightgrey"}}>Loading...</Text>
                            </View>
                        : null
                    }
                    <View style={styles.articleContainer}>
                        <View style={{flex: 1}}>
                            {this.showArticles()}
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
       marginTop: 5,
    },
    isLoading: {
        flex: 1,
        alignItems: "center",
        marginTop: 50
    },
    articleContainer: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

const mapStateToProps = state => {
    return {
        Articles: state.articles
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getArticles: (category) => dispatch(getArticles(category))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
