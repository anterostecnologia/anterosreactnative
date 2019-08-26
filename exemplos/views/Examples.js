import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    FlatList,
    Alert,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Actions,
    SafeAreaView,
    Platform,
    ImageBackground,
    ViewPropTypes,
    Animated,
    StatusBar,
    Easing,
    Image,
    TextInput,
    Dimensions,
    View
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {AnterosButton, AnterosSwiper, AnterosNavigationPage,  
    AnterosImage, AnterosLabel, AnterosListRow, AnterosText, AnterosTheme} from 'anteros-react-native';
import ArticlesExamples from './ArticlesExample';
import ChatExample from './examples/ChatExample';
import ECommerceExample from './ECommerceExample';
import NewsFeedExample from './examples/NewsFeedExample';
import TimelineExample from './examples/TimelineExample';
import NotificationsExample from './examples/NotificationsExample';



export default class Examples extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Examples',
        showBackButton: true
    };
    constructor(props) {
        super(props);
        this.ex1 = this
            .ex1
            .bind(this);          
        this.ex2 = this
            .ex2
            .bind(this);     
        this.ex3 = this
            .ex3
            .bind(this);     
        this.ex4 = this
            .ex4
            .bind(this);      
        this.ex5 = this
            .ex5
            .bind(this);       
        this.ex6 = this
            .ex6
            .bind(this); 
        this.ex7 = this
            .ex7
            .bind(this);     
    }

    renderRow = (highlighted) => {
        if (Platform.OS !== 'android') {
            return <View
                style={[
                {
                    backgroundColor: '#f0f0f0',
                    height: 1
                },
                highlighted && {
                    marginLeft: 0
                }
            ]}/>;
        }

        return null;
    };

    ex1() {
        this
            .navigator
            .push({view: <ArticlesExamples/>})
    }

    ex2() {
        this
            .navigator
            .push({view: <ECommerceExample/>})
    }

    ex3() {
        this
            .navigator
            .push({view: <DialogExample/>})
    }
    ex4() {
        this
            .navigator
            .push({view: <NewsFeedExample/>})
    }

    ex5() {
        this
            .navigator
            .push({view: <TimelineExample/>})
    }

    ex6() {
        this
            .navigator
            .push({view: <NotificationsExample/>})
    }

    ex7() {
        this
            .navigator
            .push({view: <ChatExample/>})
    }


    renderPage() {
        return (
            <ScrollView style={{
                flex: 1
            }}>
                <View style={{
                    height: 20
                }}/>
                <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                        iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='file-text-o' 
                        title='Articles' onPress={this.modal1} topSeparator='full'/>
                <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                        iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='lock' 
                        title='Authentication'  topSeparator='full'/>
                <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                        iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='comment-o'  
                        title='Chat' onPress={this.ex7} topSeparator='full'/>
                <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                        iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='comments-o' 
                        title='Comments'  topSeparator='full'/>
                <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                        iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='pie-chart' 
                        title='Dashboard'  topSeparator='full'/>
                <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                        iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='list-alt' 
                        title='Discovery'  topSeparator='full'/>
                <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                        iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='shopping-cart'
                        title='Ecommerce' onPress={this.modal2} topSeparator='full'/>
                <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                        iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='calendar-o'
                        title='Events'  topSeparator='full'/>        
                <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                        iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='home'
                        title='Home'  topSeparator='full'/>
                <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                        iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='location-arrow'
                        title='Navigations'  topSeparator='full'/>
                <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                        iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='newspaper-o'
                        title='News'  topSeparator='full' onPress={this.ex4}/>
                <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                        iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='bell'
                        title='Notifications' onPress={this.ex6} topSeparator='full'/>
                <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                        iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='users' 
                        title='People'  topSeparator='full'/>
                <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                        iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='user-md'
                        title='Profile'  topSeparator='full'/>
                <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                        iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='user-md'
                        title='Reviews'  topSeparator='full'/>
                <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                        iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='clock-o'
                        title='Timeline'  onPress={this.ex5}  topSeparator='full'/>
                <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                        iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='ellipsis-h'
                title='Walkthrough'  topSeparator='full'/>
            </ScrollView>
        );
    }
}

const stylesList = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    row: {
        paddingHorizontal: 10,
        paddingVertical: 20
    }
});

