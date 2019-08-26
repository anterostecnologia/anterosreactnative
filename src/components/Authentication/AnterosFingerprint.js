
import React, { Component } from 'react';
import { AlertIOS, Text, Animated, Dimensions, StyleSheet, 
    TouchableOpacity, ViewPropTypes, Platform, View } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import PropTypes from 'prop-types';
import { AnterosText } from '../Text/AnterosText';
import {AnterosImage} from '../Image/AnterosImage';
const { width } = Dimensions.get('window');


export class AnterosFingerprint extends Component {

    constructor(props) {
      super(props);
      this.state = {
        errorMessage: undefined,
        popupShowed: false
      };
    }

    static propTypes = {
        onAuthenticated : PropTypes.func,
        onError : PropTypes.func,
        title: String,
        subTitle: String
    }
  
    handleFingerprintShowed = () => {
      this.setState({ popupShowed: true });
    };
  
    handleFingerprintDismissed = () => {
      this.setState({ popupShowed: false });
    };
  
    componentDidMount() {
      _this = this;
      FingerprintScanner
        .isSensorAvailable()
        .catch(function(error){
            if (_this.props.onError){
                _this.props.onError(error.message);
            } else 
                _this.setState({ errorMessage: error.message });
        });
    }
  
    render() {
      const { errorMessage, popupShowed } = this.state;

      let Popup;
      if (Platform.OS === 'ios')
          Popup = FingerprintPopupIOS
      else 
          Popup = FingerprintPopupAndroid;    
  
      return (
        <View style={[stylesFinger.container, this.props.style]}>  
          <AnterosText style={stylesFinger.heading}>
            {this.props.title}
          </AnterosText>  
          <View style={stylesFinger.fingerprint}>
            <TouchableOpacity            
                onPress={this.handleFingerprintShowed}
                disabled={!!errorMessage}            >
                <AnterosImage source={require('../../assets/images/finger_print.png')} />            
            </TouchableOpacity>
            <AnterosText style={stylesFinger.subheading}>{this.props.subTitle}</AnterosText>
          </View>
  
          {errorMessage && (
            <AnterosText style={stylesFinger.errorMessage}>
              {errorMessage}
            </AnterosText>
          )}
  
          {popupShowed && (
            <Popup
              style={stylesFinger.popup}
              handlePopupDismissed={this.handleFingerprintDismissed}
            />
          )}  
        </View>
      );
    }
  }



const stylesFinger = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00a4de'
  },
  heading: {
    color: '#ffffff',
    fontSize: 22,
    marginTop: 30,
    marginBottom: 5,
  },
  subheading: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 30,
  },
  fingerprint: {
    padding: 20,
    marginVertical: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: '#ea3d13',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 10,
    marginTop: 30,
  },
  popup: {
    width: width * 0.8,
  }
});



class FingerprintPopupAndroid extends Component {

  constructor(props) {
    super(props);
    this.state = { errorMessage: undefined };
  }

  static propTypes = {
    style: ViewPropTypes.style,
    handlePopupDismissed: PropTypes.func.isRequired,
    onAuthenticated : PropTypes.func,
    onError : PropTypes.func,
    title: String 
  }

  componentDidMount() {
    _this = this; 
    FingerprintScanner
      .authenticate({ onAttempt: this.handleAuthenticationAttempted })
      .then(() => {
        this.props.handlePopupDismissed();
        if (_this.props.onAuthenticated){
            _this.props.onAuthenticated();
        } else {
            Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
        }
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
        if (this.props.onError){
            this.props.onError(error.message);
        } else
            this.description.shake();
      });
  }

  componentWillUnmount() {
    //FingerprintScanner.release();
  }

  handleAuthenticationAttempted = (error) => {
    this.setState({ errorMessage: error.message });
    this.description.shake();
  };

  render() {
    const { errorMessage } = this.state;
    const { style, handlePopupDismissed } = this.props;

    return (
      <View style={stylesPopup.container}>
        <View style={[stylesPopup.contentContainer, style]}>
          <AnterosImage
            style={styles.logo}
            source={require('../../assets/images/finger_print.png')}
          />
          <AnterosText style={stylesPopup.heading}>
            {this.props.title}
          </AnterosText>
          <ShakingText
            ref={(instance) => { this.description = instance; }}
            style={stylesPopup.description(!!errorMessage)}>
            {errorMessage || 'Scan your fingerprint on the\ndevice scanner to continue'}
          </ShakingText>

          <TouchableOpacity
            style={stylesPopup.buttonContainer}
            onPress={handlePopupDismissed}
          >
            <AnterosText style={stylesPopup.buttonText}>
              BACK TO MAIN
            </AnterosText>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}



const stylesPopup = {
    container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 164, 222, 0.9)',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    logo: {
      marginVertical: 45,
    },
    heading: {
      textAlign: 'center',
      color: '#00a4de',
      fontSize: 21,
    },
    description: (error) => ({
      textAlign: 'center',
      color: error ? '#ea3d13' : '#a5a5a5',
      height: 65,
      fontSize: 18,
      marginVertical: 10,
      marginHorizontal: 20,
    }),
    buttonContainer: {
      padding: 20,
    },
    buttonText: {
      color: '#8fbc5a',
      fontSize: 15,
      fontWeight: 'bold',
    },
  };



class FingerprintPopupIOS extends Component {

    static propTypes = {
        handlePopupDismissed: PropTypes.func.isRequired,
        onAuthenticated : PropTypes.func,
        onError : PropTypes.func,
        title: String
    }

    componentDidMount() {
      FingerprintScanner
        .authenticate({ description: 'Scan your fingerprint on the device scanner to continue' })
        .then(() => {
          this.props.handlePopupDismissed();
          if (this.props.onAuthenticated){
              this.props.onAuthenticated();
          } else {
            AlertIOS.alert('Authenticated successfully');
          }
        })
        .catch((error) => {
          this.props.handlePopupDismissed();
          if (this.props.onError){
             this.props.onError(error.message); 
          } else {
            AlertIOS.alert(error.message);
          }
        });
    }
  
    render() {
      return false;
    }
  }
  
  

  class ShakingText extends Component {

    componentWillMount() {
      this.shakedValue = new Animated.Value(0);
    }
  
    get animatedStyle() {
      return {
        transform: [
          {
            translateY: this.shakedValue.interpolate({
              inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
              outputRange: [0, 10, -15, 12, -9, 18, -7, 10, -11, 5, 0],
            }),
          },
          {
            translateX: this.shakedValue.interpolate({
              inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
              outputRange: [0, 2, -3, 4, -4, 3, -3, 4, -5, 2, 0],
            }),
          },
        ],
      };
    }
  
    shake = () => {
      this.shakedValue.setValue(0);
      Animated.spring(this.shakedValue, {
        toValue: 1,
        friction: 3,
        tension: 10,
      }).start(() => this.shakedValue.setValue(0));
    };
  
    render() {
      return (
        <Animated.Text
          {...this.props}
          style={[this.animatedStyle, this.props.style]}
        />
      );
    }
  }
  
  ShakingText.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    style: Text.propTypes.style,
  };