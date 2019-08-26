import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    Alert,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Actions,
    Platform,
    ImageBackground,
    ViewPropTypes,
    Animated,
    Easing,
    Image,
    TextInput,
    Dimensions,
    View
} from 'react-native';

import PropTypes from 'prop-types';
import moment from 'moment';
import {AnterosButton, AnterosNavigationPage, AnterosListRow, AnterosText, AnterosImage} from 'anteros-react-native';
import {AnterosLogin, AnterosLoginRegister, AnterosForgotPassword, AnterosSocialIcon} from 'anteros-react-native';
import GesturePasswordExample from './GesturePasswordExample';
import ConfirmationCodeInputExample from './ConfirmationCodeInputExample';
import FingerprintExample from './FingerprintExample';

const timer = require('react-native-timer');

const DEVICE_WIDTH = Dimensions
    .get('window')
    .width;
const DEVICE_HEIGHT = Dimensions
    .get('window')
    .height;

export default class AuthenticationExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Authentication',
        showBackButton: true
    };
    constructor(props) {
        super(props);
        this.login1 = this
            .login1
            .bind(this);
        this.login2 = this
            .login2
            .bind(this);        
        this.login3 = this
            .login3
            .bind(this);    
        this.login4 = this
            .login4
            .bind(this);     
        this.login5 = this
            .login5
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

    login1() {
        this
            .navigator
            .push({view: <LoginExample1 navigator={this.navigator}/>})
    }

    login2() {
        this
            .navigator
            .push({view: <LoginExample2 navigator={this.navigator}/>})
    }

    login3() {
        this
            .navigator
            .push({view: <GesturePasswordExample/>})
    }

    login4() {
        this
            .navigator
            .push({view: <ConfirmationCodeInputExample/>})
    }
    login5() {
        this
            .navigator
            .push({view: <FingerprintExample/>})
    }

    renderPage() {
        return (
            <ScrollView style={{
                flex: 1
            }}>
                <View style={{
                    height: 20
                }}/>
                <AnterosListRow title='Login 1' onPress={this.login1} topSeparator='full'/>
                <AnterosListRow title='Login 2' onPress={this.login2}  topSeparator='full'/>
                <AnterosListRow title='Gesture password' onPress={this.login3}  topSeparator='full'/>
                <AnterosListRow title='Confirmation code' onPress={this.login4}  topSeparator='full'/>
                <AnterosListRow title='Fingerprint authentication' onPress={this.login5}  topSeparator='full'/>
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

class LoginExample1 extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this
            .onSubmit
            .bind(this);
        this.back = this
            .back
            .bind(this);
        this.onForgotPassword = this
            .onForgotPassword
            .bind(this);
        this.onCreateAccount = this
            .onCreateAccount
            .bind(this);
        this.onCloseRegister = this
            .onCloseRegister
            .bind(this);
        this.onSubmitRegister = this
            .onSubmitRegister
            .bind(this);
    }

    back() {
        if (this.props.navigator.getCurrentRoutes().length > 1) {
            this
                .props
                .navigator
                .pop();
        }
    }

    onSubmit(username, password) {
        timer.setTimeout(this, 'continue', () => this.back(), 1000);
    }

    onForgotPassword() {
        this
            .props
            .navigator
            .push({view: <AnterosForgotPassword
                onClose={this.onCloseRegister}
                onSubmit={this.onSubmitRegister}
                wallPaper={require('../images/wallpaper.png')}/>})
    }

    onCloseRegister() {
        this.back();
    }

    onSubmitRegister() {
        timer.setTimeout(this, 'submit', () => this.back(), 1000);
    }

    onCreateAccount() {
        this
            .props
            .navigator
            .push({view: <AnterosLoginRegister
                onClose={this.onCloseRegister}
                onSubmit={this.onSubmitRegister}
                wallPaper={require('../images/wallpaper.png')}/>})
    }

    render() {
        return <AnterosLogin
            wallPaper={require('../images/wallpaper.png')}
            logoImage={require('../images/logo.png')}
            title='Anteros Tecnologia'
            onForgotPassword={this.onForgotPassword}
            onCreateAccount={this.onCreateAccount}
            onSubmit={this.onSubmit}>
        </AnterosLogin>
    }

}

class LoginExample2 extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this
            .onSubmit
            .bind(this);
        this.back = this
            .back
            .bind(this);
        this.onForgotPassword = this
            .onForgotPassword
            .bind(this);
        this.onCreateAccount = this
            .onCreateAccount
            .bind(this);
        this.onCloseRegister = this
            .onCloseRegister
            .bind(this);
        this.onSubmitRegister = this
            .onSubmitRegister
            .bind(this);
    }

    back() {
        if (this.props.navigator.getCurrentRoutes().length > 1) {
            this
                .props
                .navigator
                .pop();
        }
    }

    onSubmit(username, password) {
        timer.setTimeout(this, 'continue', () => this.back(), 1000);
    }

    onForgotPassword() {
        this
            .props
            .navigator
            .push({view: <AnterosForgotPassword
                onClose={this.onCloseRegister}
                styleSubmitButton={stylesLogin2.submitButton}
                onSubmit={this.onSubmitRegister}
                wallPaper={require('../images/images-12.jpg')}/>})
    }

    onCloseRegister() {
        this.back();
    }

    onSubmitRegister() {
        timer.setTimeout(this, 'submit', () => this.back(), 1000);
    }

    onCreateAccount() {
        this
            .props
            .navigator
            .push({view: <AnterosLoginRegister
                onClose={this.onCloseRegister}
                styleSubmitButton={stylesLogin2.submitButton}
                onSubmit={this.onSubmitRegister}
                wallPaper={require('../images/images-12.jpg')}/>})
    }

    render() {
        return <AnterosLogin
            wallPaper={require('../images/images-12.jpg')}
            logoImage={require('../images/logo.png')}
            title='Anteros Tecnologia'
            styleSubmitButton={stylesLogin2.submitButton}
            onForgotPassword={this.onForgotPassword}
            onCreateAccount={this.onCreateAccount}
            onSubmit={this.onSubmit}>
            <AnterosLogin.socialIcons>
                <AnterosSocialIcon type='twitter'/>
                <AnterosSocialIcon type='facebook'/>
                <AnterosSocialIcon type='google-plus-official'/>
            </AnterosLogin.socialIcons>
        </AnterosLogin>
    }

}

const stylesLogin2 = {
    submitButton: {
        backgroundColor:'#4CAF50' 
    }
}
