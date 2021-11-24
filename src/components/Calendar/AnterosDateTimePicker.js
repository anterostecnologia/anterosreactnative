import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Platform, DatePickerIOS, Text, TouchableHighlight, View, DatePickerAndroid, TimePickerAndroid, StyleSheet, Dimensions } from "react-native";
import {AnterosModal} from "../Modal/AnterosModal";
import {AnterosText} from '../Text/AnterosText';


class CustomDatePickerAndroid extends PureComponent {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(["date", "time", "datetime"]),
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onHideAfterConfirm: PropTypes.func,
    is24Hour: PropTypes.bool,
    isVisible: PropTypes.bool,
    datePickerModeAndroid: PropTypes.oneOf(["calendar", "spinner", "default"]),
    minimumDate: PropTypes.instanceOf(Date),
    maximumDate: PropTypes.instanceOf(Date)
  };

  static defaultProps = {
    date: new Date(),
    mode: "date",
    datePickerModeAndroid: "default",
    is24Hour: true,
    isVisible: false,
    onHideAfterConfirm: () => {}
  };

  componentDidUpdate = prevProps => {
    if (!prevProps.isVisible && this.props.isVisible) {
      if (this.props.mode === "date" || this.props.mode === "datetime") {
        this._showDatePickerAndroid();
      } else {
        this._showTimePickerAndroid();
      }
    }
  };

  componentDidMount = () => {
    if (this.props && this.props.isVisible) {
      if (this.props.mode === "date" || this.props.mode === "datetime") {
        this._showDatePickerAndroid();
      } else {
        this._showTimePickerAndroid();
      }
    }
  };

  _showDatePickerAndroid = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.props.date,
        minDate: this.props.minimumDate,
        maxDate: this.props.maximumDate,
        mode: this.props.datePickerModeAndroid
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        let date;
        if (this.props.date && !isNaN(this.props.date.getTime())) {
          let hour = this.props.date.getHours();
          let minute = this.props.date.getMinutes();
          date = new Date(year, month, day, hour, minute);
        } else {
          date = new Date(year, month, day);
        }

        if (this.props.mode === "datetime") {
          // Prepopulate and show time picker
          const timeOptions = {
            is24Hour: this.props.is24Hour,
            mode: this.props.datePickerModeAndroid
          };
          if (this.props.date) {
            timeOptions.hour = this.props.date.getHours();
            timeOptions.minute = this.props.date.getMinutes();
          }
          const {
            action: timeAction,
            hour,
            minute
          } = await TimePickerAndroid.open(timeOptions);
          if (timeAction !== TimePickerAndroid.dismissedAction) {
            const selectedDate = new Date(year, month, day, hour, minute);
            this.props.onConfirm(selectedDate);
            this.props.onHideAfterConfirm(selectedDate);
          } else {
            this.props.onCancel();
          }
        } else {
          this.props.onConfirm(date);
          this.props.onHideAfterConfirm(date);
        }
      } else {
        this.props.onCancel();
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  _showTimePickerAndroid = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: this.props.date.getHours(),
        minute: this.props.date.getMinutes(),
        is24Hour: this.props.is24Hour,
        mode: this.props.datePickerModeAndroid
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        let date;
        if (this.props.date) {
          // This prevents losing the Date elements, see issue #71
          const year = this.props.date.getFullYear();
          const month = this.props.date.getMonth();
          const day = this.props.date.getDate();
          date = new Date(year, month, day, hour, minute);
        } else {
          date = new Date().setHours(hour).setMinutes(minute);
        }
        this.props.onConfirm(date);
        this.props.onHideAfterConfirm(date);
      } else {
        this.props.onCancel();
      }
    } catch ({ code, message }) {
      console.warn("Cannot open time picker", message);
    }
  };

  render() {
    return null;
  }
}


const isIphoneX = () => {
    const { height, width } = Dimensions.get("window");
  
    return (
      Platform.OS === "ios" &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      (height === 812 || width === 812)
    );
  };
  
  const BORDER_RADIUS = 13;
  const BACKGROUND_COLOR = "white";
  const BORDER_COLOR = "#d5d5d5";
  const TITLE_FONT_SIZE = 13;
  const TITLE_COLOR = "#8f8f8f";
  const BUTTON_FONT_WEIGHT = "normal";
  const BUTTON_FONT_COLOR = "#007ff9";
  const BUTTON_FONT_SIZE = 20;
  
  const styles = StyleSheet.create({
    contentContainer: {
      justifyContent: "flex-end",
      margin: 10
    },
    datepickerContainer: {
      backgroundColor: BACKGROUND_COLOR,
      borderRadius: BORDER_RADIUS,
      marginBottom: 8,
      overflow: "hidden"
    },
    titleContainer: {
      borderBottomColor: BORDER_COLOR,
      borderBottomWidth: StyleSheet.hairlineWidth,
      padding: 14,
      backgroundColor: "transparent"
    },
    title: {
      textAlign: "center",
      color: TITLE_COLOR,
      fontSize: TITLE_FONT_SIZE
    },
    confirmButton: {
      borderColor: BORDER_COLOR,
      borderTopWidth: StyleSheet.hairlineWidth,
      backgroundColor: "transparent",
      height: 57,
      justifyContent: "center"
    },
    confirmText: {
      textAlign: "center",
      color: BUTTON_FONT_COLOR,
      fontSize: BUTTON_FONT_SIZE,
      fontWeight: BUTTON_FONT_WEIGHT,
      backgroundColor: "transparent"
    },
    cancelButton: {
      backgroundColor: BACKGROUND_COLOR,
      borderRadius: BORDER_RADIUS,
      height: 57,
      marginBottom: isIphoneX() ? 20 : 0,
      justifyContent: "center"
    },
    cancelText: {
      padding: 10,
      textAlign: "center",
      color: BUTTON_FONT_COLOR,
      fontSize: BUTTON_FONT_SIZE,
      fontWeight: "600",
      backgroundColor: "transparent"
    }
  });

class CustomDatePickerIOS extends PureComponent {
  static propTypes = {
    cancelTextIOS: PropTypes.string,
    confirmTextIOS: PropTypes.string,
    customCancelButtonIOS: PropTypes.node,
    customConfirmButtonIOS: PropTypes.node,
    neverDisableConfirmIOS: PropTypes.bool,
    customConfirmButtonWhileInteractingIOS: PropTypes.node,
    customTitleContainerIOS: PropTypes.node,
    customDatePickerIOS: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    contentContainerStyleIOS: PropTypes.any,
    datePickerContainerStyleIOS: PropTypes.any,
    date: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(["date", "time", "datetime"]),
    onConfirm: PropTypes.func.isRequired,
    onHideAfterConfirm: PropTypes.func,
    pickerRefCb: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
    titleIOS: PropTypes.string,
    isVisible: PropTypes.bool,
    reactNativeModalPropsIOS: PropTypes.any,
    titleStyle: PropTypes.any,
    confirmTextStyle: PropTypes.any,
    cancelTextStyle: PropTypes.any,
    onDateChange: PropTypes.func
  };

  static defaultProps = {
    neverDisableConfirmIOS: false,
    cancelTextIOS: "Cancel",
    confirmTextIOS: "Confirm",
    date: new Date(),
    mode: "date",
    titleIOS: "Pick a date",
    isVisible: false,
    onHideAfterConfirm: () => {},
    reactNativeModalPropsIOS: {},
    onDateChange: () => {},
  };

  state = {
    date: this.props.date,
    userIsInteractingWithPicker: false,
    minuteInterval: 1
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) {
      this.setState({
        date: nextProps.date
      });
    }
  }

  _handleCancel = () => {
    this.confirmed = false;
    this.props.onCancel();
  };

  _handleConfirm = () => {
    this.confirmed = true;
    this.props.onConfirm(this.state.date);
  };

  _handleOnModalHide = () => {
    if (this.confirmed) {
      this.props.onHideAfterConfirm(this.state.date);
    }
  };

  _handleDateChange = date => {
    this.setState({
      date,
      userIsInteractingWithPicker: false
    });
    this.props.onDateChange(date);
  };

  _handleUserTouchInit = () => {
    // custom date picker shouldn't change this param
    if (!this.props.customDatePickerIOS) {
      this.setState({
        userIsInteractingWithPicker: true
      });
    }
    return false;
  };

  render() {
    const {
      isVisible,
      mode,
      titleIOS,
      confirmTextIOS,
      cancelTextIOS,
      customCancelButtonIOS,
      customConfirmButtonIOS,
      neverDisableConfirmIOS,
      customConfirmButtonWhileInteractingIOS,
      customDatePickerIOS,
      contentContainerStyleIOS,
      customTitleContainerIOS,
      datePickerContainerStyleIOS,
      reactNativeModalPropsIOS,
      titleStyle,
      confirmTextStyle,
      cancelTextStyle,
      pickerRefCb,
      minuteInterval,
      ...otherProps
    } = this.props;

    const titleContainer = (
      <View style={styles.titleContainer}>
        <AnterosText style={[styles.title, titleStyle]}>{titleIOS}</AnterosText>
      </View>
    );
    let confirmButton;

    // Interested PR: https://github.com/mmazzarolo/react-native-modal-datetime-picker/pull/40
    // Issue on React-Native: https://github.com/facebook/react-native/issues/8169
    // Up until now when the user interacted with the picker, if he tapped on the confirm button,
    // the state was not yet changed and thus the picked value would be old and miss-leading.
    // DatePickerIOS does not update on the fly, and before it even manages to dispatch an update,
    // our component is unmounted and thus the state is lost.
    // We no longer allow our user to tap the confirm button unless the picker is still.
    // They can always tap the cancel button anyway.
    if (customConfirmButtonIOS) {
      if (
        customConfirmButtonWhileInteractingIOS &&
        this.state.userIsInteractingWithPicker
      ) {
        confirmButton = customConfirmButtonWhileInteractingIOS;
      } else {
        confirmButton = customConfirmButtonIOS;
      }
    } else {
      confirmButton = (
        <AnterosText style={[styles.confirmText, confirmTextStyle]}>
          {confirmTextIOS}
        </AnterosText>
      );
    }
    const cancelButton = (
      <AnterosText style={[styles.cancelText, cancelTextStyle]}>{cancelTextIOS}</AnterosText>
    );
    const DatePickerComponent = customDatePickerIOS || DatePickerIOS;

    return (
      <AnterosModal
        isVisible={isVisible}
        style={[styles.contentContainer, contentContainerStyleIOS]}
        onModalHide={this._handleOnModalHide}
        onModalShow={() => {
          this.setState({
            minuteInterval
          });
        }}
        backdropOpacity={0.4}
        {...reactNativeModalPropsIOS}
      >
        <View style={[styles.datepickerContainer, datePickerContainerStyleIOS]}>
          {customTitleContainerIOS || titleContainer}
          <View
            onStartShouldSetResponderCapture={
              neverDisableConfirmIOS !== true ? this._handleUserTouchInit : null
            }
          >
            <DatePickerComponent
              ref={pickerRefCb}
              mode={mode}
              minuteInterval={this.state.minuteInterval}
              {...otherProps}
              date={this.state.date}
              onDateChange={this._handleDateChange}
            />
          </View>
          <TouchableHighlight
            style={styles.confirmButton}
            underlayColor="#ebebeb"
            onPress={this._handleConfirm}
            disabled={
              !neverDisableConfirmIOS && this.state.userIsInteractingWithPicker
            }
          >
            {confirmButton}
          </TouchableHighlight>
        </View>

        <TouchableHighlight
          style={styles.cancelButton}
          underlayColor="#ebebeb"
          onPress={this._handleCancel}
        >
          {customCancelButtonIOS || cancelButton}
        </TouchableHighlight>
      </AnterosModal>
    );
  }
}


const IS_ANDROID = Platform.OS === "android";

export default (IS_ANDROID ? CustomDatePickerAndroid : CustomDatePickerIOS);