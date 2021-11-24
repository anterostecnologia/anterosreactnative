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
    ActivityIndicator,
    Animated,
    Easing,
    Image,
    TextInput,
    Dimensions,
    View
} from 'react-native';

import PropTypes from 'prop-types';

const {height, width} = Dimensions.get('window');

const DEVICE_WIDTH = Dimensions
    .get('window')
    .width;
const DEVICE_HEIGHT = Dimensions
    .get('window')
    .height;
const w = percent => (width * percent) / 100;
const h = percent => (height * percent) / 100;
const totalSize = num => (Math.sqrt((height * height) + (width * width)) * num) / 100;

import {AnterosWallpaper} from '../Wallpaper/AnterosWallpaper';
import {AnterosText} from '../Text/AnterosText';
import {AnterosImage} from '../Image/AnterosImage';


export class AnterosLogin extends Component {

    static propTypes = {
        styleLogo: View.style,
        styleInputUser: View.style,
        styleInputPassword: View.style,
        styleSubmitButton: View.style,
        styleSubmitTitle: View.style,
        styleSignup: View.style,
        wallPaper: PropTypes.any.isRequired,
        logoImage: PropTypes.any.isRequired,
        title: PropTypes.string,
        imageIconEmail: PropTypes.any.isRequired,
        imageIconPassword: PropTypes.any.isRequired,
        imageIconShowPassword: PropTypes.any.isRequired,
        placeholderEmail: PropTypes.string.isRequired,
        placeholderPassword: PropTypes.string.isRequired,
        titleSubmit: PropTypes.string.isRequired,
        titleCreateAccount: PropTypes.string.isRequired,
        titleForgotPassword: PropTypes.string.isRequired,
        onSubmit: PropTypes.func,
        onForgotPassword: PropTypes.func,
        onCreateAccount: PropTypes.func
    };

    static defaultProps = {
        styleLogo: {},
        styleInputUser: {},
        styleInputPassword: {},
        styleSubmitButton: {},
        styleSubmitTitle: {},
        styleSignup: {},
        imageIconEmail: require('../../assets/images/username.png'),
        imageIconPassword: require('../../assets/images/password.png'),
        imageIconShowPassword: require('../../assets/images/eye_black.png'),
        placeholderEmail: 'User',
        placeholderPassword: 'Password',
        titleSubmit: 'LOGIN',
        titleCreateAccount: 'Create Account',
        titleForgotPassword: 'Forgot Password?'
    };

    constructor(props) {
        super(props);
        const {width, height} = Dimensions.get("window");
        this.state = {
            showPass: true,
            press: false,
            width: width,
            height: height
        };
        this.onPressShowPassword = this
            .onPressShowPassword
            .bind(this);

    }

    onLayout = (e) => {
        const {width, height} = Dimensions.get("window");
        this.setState({
            ...this.state,
            width: width,
            height: height
        })
    }

    onPressShowPassword() {
        this.state.press === false
            ? this.setState({
                ...this.state,
                showPass: false,
                press: true
            })
            : this.setState({
                ...this.state,
                showPass: true,
                press: false
            });
    }

    getStarted = () => {
        const email = this
            .email
            .getInputValue();
        const password = this
            .password
            .getInputValue();

        this.setState({
            isEmailCorrect: email === '',
            isPasswordCorrect: password === ''
        }, () => {
            if (email !== '' && password !== '') {
                this.login(email, password);
            } else {
                console.warn('Fill up all fields')
            }
        });
    };


    login = (email, password) => {
        if (this.props.onSubmit) {
            this
                .props
                .onSubmit(email, password);
        }
    };

    render() {
        return <AnterosWallpaper
            backgroundSource={this.props.wallPaper}
            height={this.state.height}
            width={this.state.width}
            onLayout={this.onLayout}>
            <View >
                <AnterosLogo logoImage={this.props.logoImage} title={this.props.title}/>
                <KeyboardAvoidingView behavior="padding" style={stylesLogin.container}>
                    <AnterosLoginInputField
                        imageIcon={this.props.imageIconEmail}
                        placeholder={this.props.placeholderEmail}
                        autoCapitalize={'none'}
                        error={this.state.isEmailCorrect}
                        width={this.state.width - 40}
                        ref={ref => this.email = ref}
                        autoCorrect={false}
                        style={[
                        {
                            marginVertical: 4
                        },
                        this.props.styleInputUser
                    ]}/>
                    <AnterosLoginInputField
                        imageIcon={this.props.imageIconPassword}
                        secureTextEntry={this.state.showPass}
                        placeholder='Password'
                        error={this.state.isPasswordCorrect}
                        returnKeyType='done'
                        autoCapitalize='none'
                        width={this.state.width - 40}
                        ref={ref => this.password = ref}
                        imgPassword={this.props.imageIconShowPassword}
                        autoCorrect={false}
                        style={[
                        {
                            marginVertical: 4
                        },
                        this.props.styleInputPassword
                    ]}
                        onPressShowPassword={this.onPressShowPassword}/>
                </KeyboardAvoidingView>

                <AnterosLoginSubmit
                    width={this.state.width - 40}
                    onSubmit={this.getStarted}
                    title={this.props.titleSubmit}
                    styleSubmitButton={this.props.styleSubmitButton}
                    styleSubmitTitle={this.props.styleSubmitTitle}
                    style={[
                    {
                        flex: 1
                    }
                ]}/>

                <View
                    style={[
                    stylesLogin.containerSignup, {
                        width: this.state.width
                    }
                ]}>
                    <TouchableOpacity onPress={this.props.onCreateAccount}>
                        <AnterosText style={[stylesLogin.textSignup, this.props.styleSignup]}>{this.props.titleCreateAccount}</AnterosText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.onForgotPassword}>
                        <AnterosText style={[stylesLogin.textSignup, this.props.styleSignup]}>{this.props.titleForgotPassword}</AnterosText>
                    </TouchableOpacity>
                </View>

                {this.props.children?this.props.children:<View style={{flex:1}}></View>}
            </View>
        </AnterosWallpaper>
    }
}

const stylesLogin = StyleSheet.create({
    container: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-start'

    },
    btnEye: {
        position: 'absolute',
        top: 75,
        right: 28
    },
    iconEye: {
        width: 25,
        height: 25

    },
    containerSignup: {
        top: 0,
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textSignup: {
        color: 'white',
        backgroundColor: 'transparent'
    },
    socialContainer : {
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'center', 
        flex:1.5
    }
});

class AnterosLoginSocialIcons extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return <View style={stylesLogin.socialContainer}>
            {this.props.children}
        </View>
    }
}

AnterosLogin.socialIcons = AnterosLoginSocialIcons;

export class AnterosLoginInputField extends Component {

    static propTypes = {
        imageIcon: PropTypes.any.isRequired,
        placeholder: PropTypes.string.isRequired,
        secureTextEntry: PropTypes.bool,
        autoCorrect: PropTypes.bool,
        autoCapitalize: PropTypes.string,
        returnKeyType: PropTypes.string,
        style: View.style,
        error: PropTypes.bool,
        blurOnSubmit: PropTypes.bool,
        keyboardType: TextInput.propTypes.keyboardType
    };

    static defaultProps = {
        focus: () => {},
        blurOnSubmit: true,
        error: false,
        keyboardType: null,
        secureTextEntry: false,
        autoCapitalize: "none"
    };

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    getInputValue = () => this.state.text;

    render() {
        return (
            <View style={[this.props.style]}>
                <AnterosImage source={this.props.imageIcon} style={stylesInputUser.inlineImg}/>
                <TextInput
                    style={[
                    stylesInputUser.input, {
                        width: this.props.width
                    },
                    this.props.error
                        ? stylesInputUser.containerError
                        : {}
                ]}
                    placeholder={this.props.placeholder}
                    selectionColor="white"
                    ref={ref => this.input = ref}
                    blurOnSubmit={this.props.blurOnSubmit}
                    secureTextEntry={this.props.secureTextEntry}
                    autoCorrect={this.props.autoCorrect}
                    autoCapitalize={this.props.autoCapitalize}
                    keyboardType={this.props.keyboardType}
                    onSubmitEditing={this
                    .props
                    .focus(this.props.placeholder)}
                    returnKeyType={this.props.returnKeyType}
                    placeholderTextColor="#ffffffDD"
                    onChangeText={(text) => this.setState({text})}
                    underlineColorAndroid="transparent"/>
                    {this.props.imgPassword != undefined
                    ? <TouchableOpacity
                            style={stylesInputUser.inlineEye}
                            activeOpacity={0.7}
                            onPress={this.props.onPressShowPassword}>
                            <AnterosImage
                                style={stylesInputUser.inlineEye}
                                source={this.props.imgPassword}/>
                        </TouchableOpacity>
                    : null}
            </View>
        );
    }
}

const stylesInputUser = StyleSheet.create({
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: DEVICE_WIDTH - 40,
        height: 40,
        marginHorizontal: 20,
        paddingLeft: 45,
        borderRadius: 20,
        color: '#ffffff'
    },
    containerError: {
        backgroundColor: '#EF9A9A88',
        borderWidth: 1,
        borderColor: '#E57373'
    },
    iconError: {
        width: w(7),
        height: w(7),
        marginRight: w(3)
    },
    inlineImg: {
        position: 'absolute',
        zIndex: 99,
        width: 22,
        height: 22,
        left: 35,
        top: 9
    },
    inlineEye: {
        position: 'absolute',
        zIndex: 99,
        width: 22,
        height: 22,
        right: 17,
        top: 5
    }
});

const MARGIN = 40;



export class AnterosLoginSubmit extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: false
        };

        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
        this._onPress = this
            ._onPress
            .bind(this);
    }

    _onPress() {
        if (this.props.onSubmit) {
            this
                .props
                .onSubmit();
        }
    }

    _onGrow() {
        Animated
            .timing(this.growAnimated, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear
        })
            .start();
    }

    render() {
        const changeWidth = this
            .buttonAnimated
            .interpolate({
                inputRange: [
                    0, 1
                ],
                outputRange: [
                    (this.props.width != undefined
                        ? this.props.width
                        : DEVICE_WIDTH - MARGIN),
                    MARGIN
                ]
            });
        const changeScale = this
            .growAnimated
            .interpolate({
                inputRange: [
                    0, 1
                ],
                outputRange: [1, MARGIN]
            });

        return (
            <View style={[stylesSubmit.container, this.props.style]}>
                <Animated.View useNativeDriver={true}
                    style={{
                    width: changeWidth
                }}>
                    <TouchableOpacity
                        style={[stylesSubmit.button, this.props.styleSubmitButton]}
                        onPress={this._onPress}
                        activeOpacity={1}>
                        {this.state.isLoading
                            ? (<Image source={require('../../assets/images/loading.gif')} style={stylesSubmit.image}/>)
                            : (
                                <Text style={[stylesSubmit.text, this.props.styleSubmitTitle]}>{this.props.title}</Text>
                            )}
                    </TouchableOpacity>
                    <Animated.View useNativeDriver={true}
                        style={[
                        stylesSubmit.circle, {
                            transform: [
                                {
                                    scale: changeScale
                                }
                            ]
                        }
                    ]}/>
                </Animated.View>
            </View>
        );
    }
}

const stylesSubmit = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F035E0',
        height: MARGIN,
        borderRadius: 20,
        zIndex: 100
    },
    circle: {
        height: MARGIN,
        width: MARGIN,
        marginTop: -MARGIN,
        borderWidth: 1,
        borderColor: '#F035E0',
        borderRadius: 100,
        alignSelf: 'center',
        zIndex: 99,
        backgroundColor: '#F035E0'
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent'
    },
    image: {
        width: 24,
        height: 24
    }
});

export class AnterosLogo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <View style={[stylesLogo.container, this.props.style]}>
            <Image source={this.props.logoImage} style={stylesLogo.image}/>
            <Text style={stylesLogo.text}>{this.props.title}</Text>
        </View>
    }
}

const stylesLogo = StyleSheet.create({
    container: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 140,
        height: 100
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        backgroundColor: 'transparent',
        marginTop: 0
    }
});

const email = require('../../assets/images/email.png');
const password = require('../../assets/images/password.png');
const repeat = require('../../assets/images/repeat.png');
const person = require('../../assets/images/person.png');

export class AnterosLoginRegister extends Component {
    constructor(props) {
        super(props);
        const {width, height} = Dimensions.get("window");

        this.state = {
            isNameCorrect: false,
            isEmailCorrect: false,
            isPasswordCorrect: false,
            isRepeatCorrect: false,
            isCreatingAccount: false,
            width: width,
            height: height
        };

        this.onClose = this
            .onClose
            .bind(this);
    }

    static propTypes = {
        change: PropTypes.func,
        onClose: PropTypes.func,
        onSubmit: PropTypes.func,
        titleSubmit: PropTypes.string,
        styleSubmitButton: View.style,
        styleSubmitTitle: View.style,
    }

    static defaultProps = {
        titleSubmit: 'CONTINUE'
    }

    onLayout = (e) => {
        const {width, height} = Dimensions.get("window");
        this.setState({
            ...this.state,
            width: width,
            height: height
        })
    }

    createUserAccount = () => {
        const name = this
            .name
            .getInputValue();
        const email = this
            .email
            .getInputValue();
        const password = this
            .password
            .getInputValue();
        const repeat = this
            .repeat
            .getInputValue();

        this.setState({
            isNameCorrect: name === '',
            isEmailCorrect: email === '',
            isPasswordCorrect: password === '',
            isRepeatCorrect: repeat === '' || repeat !== password
        }, () => {
            if (name !== '' && email !== '' && password !== '' && (repeat !== '' && repeat === password)) {
                this.createAccount(name, email, password);
            } else {
                console.warn('Fill up all fields correctly');
            }
        })
    };

    createAccount = (name, email, password) => {
        this.setState({isCreatingAccount: true});
        if (this.props.onSubmit) {
            this
                .props
                .onSubmit(name, email, password);
        }
    };

    changeInputFocus = name => () => {
        switch (name) {
            case 'Name':
                this.setState({
                    isNameCorrect: this
                        .name
                        .getInputValue() === ''
                });
                this
                    .email
                    .input
                    .focus();
                break;
            case 'Email':
                this.setState({
                    isEmailCorrect: this
                        .email
                        .getInputValue() === ''
                });
                this
                    .password
                    .input
                    .focus();
                break;
            case 'Password':
                this.setState({
                    isPasswordCorrect: this
                        .password
                        .getInputValue() === '',
                    isRepeatCorrect: (this.repeat.getInputValue() !== '' && this.repeat.getInputValue() !== this.password.getInputValue())
                });
                this
                    .repeat
                    .input
                    .focus();
                break;
            default:
                this.setState({
                    isRepeatCorrect: (this.repeat.getInputValue() === '' || this.repeat.getInputValue() !== this.password.getInputValue())
                });
        }
    };

    onClose() {
        if (this.props.onClose) {
            this
                .props
                .onClose();
        }
    }

    render() {
        return (
            <AnterosWallpaper
                backgroundSource={this.props.wallPaper}
                height={this.state.height}
                width={this.state.width}
                onLayout={this.onLayout}>
                <View>
                    <KeyboardAvoidingView behavior="padding" style={stylesRegister.container}>
                        <Text style={stylesRegister.create}>CREATE ACCOUNT</Text>
                        <AnterosLoginInputField
                            placeholder="Name"
                            autoCapitalize="words"
                            error={this.state.isNameCorrect}
                            style={stylesRegister.input}
                            width={this.state.width - 40}
                            focus={this.changeInputFocus}
                            ref={ref => this.name = ref}
                            imageIcon={person}/>
                        <AnterosLoginInputField
                            placeholder="Email"
                            keyboardType="email-address"
                            error={this.state.isEmailCorrect}
                            style={stylesRegister.input}
                            width={this.state.width - 40}
                            focus={this.changeInputFocus}
                            ref={ref => this.email = ref}
                            imageIcon={email}/>
                        <AnterosLoginInputField
                            placeholder="Password"
                            error={this.state.isPasswordCorrect}
                            style={stylesRegister.input}
                            width={this.state.width - 40}
                            focus={this.changeInputFocus}
                            ref={ref => this.password = ref}
                            secureTextEntry={true}
                            imageIcon={password}/>
                        <AnterosLoginInputField
                            placeholder="Repeat Password"
                            error={this.state.isRepeatCorrect}
                            style={stylesRegister.input}
                            width={this.state.width - 40}
                            secureTextEntry={true}
                            returnKeyType="done"
                            blurOnSubmit={true}
                            focus={this.changeInputFocus}
                            ref={ref => this.repeat = ref}
                            imageIcon={repeat}/>
                    </KeyboardAvoidingView>
                    <AnterosLoginSubmit
                        width={this.state.width - 40}
                        onSubmit={this.createUserAccount}
                        styleSubmitButton={this.props.styleSubmitButton}
                        styleSubmitTitle={this.props.styleSubmitTitle}
                        title={this.props.titleSubmit}
                        style={[
                        {
                            flex: 1
                        },
                        this.props.styleSubmit
                    ]}/>
                    <TouchableOpacity onPress={this.onClose} style={stylesRegister.touchable}>
                        <Text style={stylesRegister.signIn}>{'<'}
                            Sign In</Text>
                    </TouchableOpacity>
                </View>
            </AnterosWallpaper>
        )
    }
}

const stylesRegister = StyleSheet.create({
    container: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    create: {
        color: 'white',
        fontSize: totalSize(2.4),
        marginTop: h(2),
        marginBottom: h(2),
        fontWeight: '700'
    },
    signIn: {
        color: '#ffffffEE',
        fontSize: totalSize(2),
        fontWeight: '700'
    },
    touchable: {
        flex: 1,
        alignSelf: 'flex-start',
        marginLeft: w(8)
    },
    input: {
        marginVertical: 4
    }
});

export class AnterosForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.onClose = this
            .onClose
            .bind(this);
        this.onLayout = this
            .onLayout
            .bind(this);
        const {width, height} = Dimensions.get("window");

        this.state = {
            isEmailCorrect: false,
            isSendingEmail: false,
            width,
            height
        };
    }

    static propTypes = {
        titleSubmit: PropTypes.string,
        styleSubmitButton: View.style,
        styleSubmitTitle: View.style,
    }

    static defaultProps = {
        titleSubmit: 'SEND EMAIL'
    }

    sendEmail = () => {
        const email = this
            .email
            .getInputValue();
        this.setState({
            isEmailCorrect: email === ''
        }, () => {
            if (email !== '') {
                this.sendEmailWithPassword(email);
            } else {
                console.warn('Enter correct e-mail address');
            }
        });
    };

    sendEmailWithPassword = (email) => {
        this.setState({
            ...this.state,
            isSendingEmail: true
        })
        if (this.props.onSubmit) {
            this
                .props
                .onSubmit(email);
        }
    };

    onFocusChanged = () => {
        this.setState({
            isEmailCorrect: this
                .email
                .getInputValue() === ''
        });
    };

    onClose() {
        if (this.props.onClose) {
            this
                .props
                .onClose();
        }
    }

    onLayout = (e) => {
        const {width, height} = Dimensions.get("window");
        this.setState({
            ...this.state,
            width: width,
            height: height
        })
    }

    render() {
        return (
            <AnterosWallpaper
                backgroundSource={this.props.wallPaper}
                height={this.state.height}
                width={this.state.width}
                onLayout={this.onLayout}>
                <View>
                    <View style={{
                        flex: 2
                    }}/>
                    <View
                        style={{
                        flex: 1
                    }}
                        style={stylesForgot.container}>
                        <Text style={stylesForgot.forgot}>Forgot Your Password?</Text>
                        <AnterosLoginInputField
                            placeholder="Email"
                            keyboardType="email-address"
                            error={this.state.isEmailCorrect}
                            returnKeyType="done"
                            blurOnSubmit={true}
                            width={this.state.width - 40}
                            focus={this.changeInputFocus}
                            ref={ref => this.email = ref}
                            imageIcon={email}/>
                    </View>
                    <AnterosLoginSubmit
                        width={this.state.width - 40}
                        onSubmit={this.sendEmail}
                        styleSubmitButton={this.props.styleSubmitButton}
                        styleSubmitTitle={this.props.styleSubmitTitle}
                        title={this.props.titleSubmit}
                        style={[
                        {
                            flex: 1
                        },
                        this.props.styleSubmit
                    ]}/>
                    <TouchableOpacity onPress={this.onClose} style={stylesForgot.touchable}>
                        <Text style={stylesForgot.login}>{'<'}
                            Back To Login</Text>
                    </TouchableOpacity>
                </View>
            </AnterosWallpaper>
        )
    }
}

const stylesForgot = StyleSheet.create({
    container: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    forgot: {
        color: 'white',
        fontSize: totalSize(2.5),
        marginBottom: h(2),
        fontWeight: '700'
    },
    button: {
        width: w(85),
        marginTop: h(6),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        paddingVertical: w(1.8),
        borderRadius: w(25),
        borderColor: '#E0E0E0',
        borderWidth: 1
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        paddingVertical: h(1),
        fontSize: totalSize(2)
    },
    login: {
        color: '#ffffffEE',
        fontSize: totalSize(2),
        fontWeight: '700'
    },
    touchable: {
        flex: 3,
        alignSelf: 'flex-start',
        marginLeft: w(8),
        marginTop: h(4)
    }
});
