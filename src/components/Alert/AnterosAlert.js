import React, { Component } from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  BackAndroid,
  BackHandler, Dimensions, StyleSheet
} from 'react-native';

import {AnterosText} from '../Text/AnterosText';
import PropTypes from 'prop-types';
const HwBackHandler = BackHandler || BackAndroid;
const HW_BACK_EVENT = 'hardwareBackPress';

const { height, width } = Dimensions.get('window');

const config = {
    "alert": {
        "cancelText": "Cancel",
        "confirmText": "Confirm",
    },
    "colors": {
        "title": "#626262",
        "msg": "#7b7b7b",
        "cancel": "#D0D0D0",
        "confirm": "#AEDEF4",
        "confirmWarning": "#DD6B55",
    },
    "size": {
        "title": 18,
        "msg": 14,
        "actionButtonBorderRadius": 5,
        "actionButtonFontSize": 13
    },
    "spacing": {
        "alertContainerPadding": 10,
        "alertContentPadding": 5,
        "titlePadding": 5,
        "titlePaddingSides": 15,
        "msgPadding": 5,
        "msgPaddingSides": 10,
        "actionButtonPaddingHorizontal": 10,
        "actionButtonPaddingVertical": 7,
        "actionButtonMargin": 5,
        "actionButtonMarginTop": 5
    },
    "types": {
        "progress": "Progress",
        "warning": "Warning",
        "error": "error",
        "action": "Action",
    }
}

export class AnterosAlert extends Component {

  constructor(props) {
    super(props);
    const { show } = this.props;
    this.springValue = new Animated.Value(0.3);

    this.state = {
      showSelf: false
    };

    if (show) this._springShow(true);
  };

  componentDidMount() {
    HwBackHandler.addEventListener(HW_BACK_EVENT, this._handleHwBackEvent);
  };

  _springShow = (fromConstructor) => {
    this._toggleAlert(fromConstructor);
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        bounciness: 10
      }
    ).start();
  };

  _springHide = () => {
    if (this.state.showSelf === true) {
      Animated.spring(
        this.springValue,
        {
          toValue: 0,
          tension: 10
        }
      ).start();

      setTimeout(() => {
        this._toggleAlert();
        this._onDismiss();
      }, 70);
    }
  };

  _toggleAlert = (fromConstructor) => {
    if (fromConstructor) this.state = { showSelf: true };
    else this.setState({ showSelf: !this.state.showSelf });
  };

  _handleHwBackEvent = () => {
    if (this.state.showSelf) {
      this._springHide();
      return true;
    }

    return false;
  };

  _onTapOutside = () => {
    const { closeOnTouchOutside } = this.props;
    if (closeOnTouchOutside) this._springHide();
  };

  _onDismiss = () => {
    const { onDismiss } = this.props;
    onDismiss && onDismiss();
  };

  _renderButton = (data) => {
    const { text, backgroundColor, buttonStyle, buttonTextStyle, onPress } = data;

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.button, { backgroundColor }, buttonStyle]}>
          <AnterosText style={[styles.buttonText, buttonTextStyle]}>{text}</AnterosText>
        </View>
      </TouchableOpacity>
    );
  };

  _renderAlert = () => {
    const animation = { transform: [{ scale: this.springValue }] };

    const { showProgress } = this.props;
    const { title, message } = this.props;

    const { showCancelButton, cancelText, cancelButtonColor, cancelButtonStyle,
      cancelButtonTextStyle, onCancelPressed } = this.props;
    const { showConfirmButton, confirmText, confirmButtonColor, confirmButtonStyle,
      confirmButtonTextStyle, onConfirmPressed } = this.props;

    const { alertContainerStyle, overlayStyle, progressSize, progressColor,
      contentContainerStyle, titleStyle, messageStyle } = this.props;

    const cancelButtonData = {
      text: cancelText,
      backgroundColor: cancelButtonColor,
      buttonStyle: cancelButtonStyle,
      buttonTextStyle: cancelButtonTextStyle,
      onPress: onCancelPressed
    };

    const confirmButtonData = {
      text: confirmText,
      backgroundColor: confirmButtonColor,
      buttonStyle: confirmButtonStyle,
      buttonTextStyle: confirmButtonTextStyle,
      onPress: onConfirmPressed
    };

    return (
      <View style={[styles.container, alertContainerStyle]}>
        <TouchableWithoutFeedback onPress={this._onTapOutside} >
          <View style={[styles.overlay, overlayStyle]} />
        </TouchableWithoutFeedback>
        <Animated.View useNativeDriver={true}   style={[styles.contentContainer, animation, contentContainerStyle]}>
          <View style={styles.content}>
            {showProgress && <ActivityIndicator size={progressSize} color={progressColor} />}
            {title && <AnterosText style={[styles.title, titleStyle]}>{title}</AnterosText>}
            {message && <AnterosText style={[styles.message, messageStyle]}>{message}</AnterosText>}
          </View>
          <View style={styles.action}>
            {showCancelButton && this._renderButton(cancelButtonData)}
            {showConfirmButton && this._renderButton(confirmButtonData)}
          </View>
          {this.props.children}
        </Animated.View>
      </View>
    );
  }

  render() {
    const { showSelf } = this.state;

    if (showSelf)
      return this._renderAlert();

    return null;
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { show } = nextProps;

    if (show)
      this._springShow();
    else
      this._springHide();
  };

  componentWillUnmount() {
    HwBackHandler.removeEventListener(HW_BACK_EVENT);
  }

};

AnterosAlert.propTypes = {
  show: PropTypes.bool,
  showProgress: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  closeOnTouchOutside: PropTypes.bool,
  closeOnHardwareBackPress: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  cancelButtonColor: PropTypes.string,
  confirmButtonColor: PropTypes.string,
  onCancelPressed: PropTypes.func,
  onConfirmPressed: PropTypes.func,
};

AnterosAlert.defaultProps = {
  show: false,
  showProgress: false,
  closeOnTouchOutside: true,
  closeOnHardwareBackPress: true,
  showCancelButton: false,
  showConfirmButton: false,
  cancelText: config.alert.cancelText,
  confirmText: config.alert.confirmText,
  cancelButtonColor: config.colors.cancel,
  confirmButtonColor: config.colors.confirm,
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  overlay: {
    width: width,
    height: height,
    position: 'absolute',
    backgroundColor: 'rgba(52,52,52,0.5)',
  },
  contentContainer: {
    maxWidth: "80%",
    borderRadius: 5,
    backgroundColor: 'white',
    padding: config.spacing.alertContainerPadding
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: config.spacing.alertContentPadding
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: config.spacing.actionButtonMarginTop
  },
  title: {
    paddingVertical: config.spacing.titlePadding,
    paddingHorizontal: config.spacing.titlePaddingSides,
    color: config.colors.title,
    fontSize: config.size.title
  },
  message: {
    paddingTop: config.spacing.msgPadding,
    color: config.colors.msg,
    fontSize: config.size.msg
  },
  button: {
    paddingHorizontal: config.spacing.actionButtonPaddingHorizontal,
    paddingVertical: config.spacing.actionButtonPaddingVertical,
    margin: config.spacing.actionButtonMargin,
    borderRadius: config.size.actionButtonBorderRadius,
  },
  buttonText: {
    color: '#fff',
    fontSize: config.size.actionButtonFontSize
  }
});


