import React, { useEffect, useRef, useState, memo, Component } from "react";
import PropTypes from "prop-types";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Appearance,Dimensions, Platform, Animated,
  DeviceEventEmitter,
  Easing,
  Modal as ReactNativeModal,
  TouchableWithoutFeedback,
} from "react-native";


const MODAL_ANIM_DURATION = 300;
const MODAL_BACKDROP_OPACITY = 0.4;

class Modal extends Component {
  static propTypes = {
    onBackdropPress: PropTypes.func,
    onHide: PropTypes.func,
    isVisible: PropTypes.bool,
    contentStyle: PropTypes.any,
  };

  static defaultProps = {
    onBackdropPress: () => null,
    onHide: () => null,
    isVisible: false,
  };

  state = {
    isVisible: this.props.isVisible,
    deviceWidth: Dimensions.get("window").width,
    deviceHeight: Dimensions.get("window").height,
  };

  animVal = new Animated.Value(0);
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    if (this.state.isVisible) {
      this.show();
    }
    DeviceEventEmitter.addListener(
      "didUpdateDimensions",
      this.handleDimensionsUpdate
    );
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener(
      "didUpdateDimensions",
      this.handleDimensionsUpdate
    );
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.isVisible && !prevProps.isVisible) {
      this.show();
    } else if (!this.props.isVisible && prevProps.isVisible) {
      this.hide();
    }
  }

  handleDimensionsUpdate = (dimensionsUpdate) => {
    const deviceWidth = dimensionsUpdate.window.width;
    const deviceHeight = dimensionsUpdate.window.height;
    if (
      deviceWidth !== this.state.deviceWidth ||
      deviceHeight !== this.state.deviceHeight
    ) {
      this.setState({ deviceWidth, deviceHeight });
    }
  };

  show = () => {
    this.setState({ isVisible: true });
    Animated.timing(this.animVal, {
      easing: Easing.inOut(Easing.quad),
      // Using native driver in the modal makes the content flash
      useNativeDriver: false,
      duration: MODAL_ANIM_DURATION,
      toValue: 1,
    }).start();
  };

  hide = () => {
    Animated.timing(this.animVal, {
      easing: Easing.inOut(Easing.quad),
      // Using native driver in the modal makes the content flash
      useNativeDriver: false,
      duration: MODAL_ANIM_DURATION,
      toValue: 0,
    }).start(() => {
      if (this._isMounted) {
        this.setState({ isVisible: false }, this.props.onHide);
      }
    });
  };

  render() {
    const {
      children,
      onBackdropPress,
      contentStyle,
      ...otherProps
    } = this.props;
    const { deviceHeight, deviceWidth, isVisible } = this.state;
    const backdropAnimatedStyle = {
      opacity: this.animVal.interpolate({
        inputRange: [0, 1],
        outputRange: [0, MODAL_BACKDROP_OPACITY],
      }),
    };
    const contentAnimatedStyle = {
      transform: [
        {
          translateY: this.animVal.interpolate({
            inputRange: [0, 1],
            outputRange: [deviceHeight, 0],
            extrapolate: "clamp",
          }),
        },
      ],
    };
    return (
      <ReactNativeModal
        transparent
        animationType="none"
        visible={isVisible}
        {...otherProps}
      >
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <Animated.View
            style={[
              stylesModal.backdrop,
              backdropAnimatedStyle,
              { width: deviceWidth, height: deviceHeight },
            ]}
          />
        </TouchableWithoutFeedback>
        {isVisible && (
          <Animated.View
            style={[stylesModal.content, contentAnimatedStyle, contentStyle]}
            pointerEvents="box-none"
          >
            {children}
          </Animated.View>
        )}
      </ReactNativeModal>
    );
  }
}

const stylesModal = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    opacity: 0,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
  },
});


export const isIphoneX = () => {
  const { height, width } = Dimensions.get("window");

  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 780 ||
      width === 780 ||
      height === 812 ||
      width === 812 ||
      height === 844 ||
      width === 844 ||
      height === 896 ||
      width === 896 ||
      height === 926 ||
      width === 926)
  );
};

export const BACKGROUND_COLOR_LIGHT = "white";
export const BACKGROUND_COLOR_DARK = "#0E0E0E";
export const BORDER_COLOR = "#d5d5d5";
export const BORDER_COLOR_DARK = "#272729";
export const BORDER_RADIUS = 13;
export const BUTTON_FONT_WEIGHT = "normal";
export const BUTTON_FONT_COLOR = "#007ff9";
export const BUTTON_FONT_SIZE = 20;
export const HIGHLIGHT_COLOR_DARK = "#444444";
export const HIGHLIGHT_COLOR_LIGHT = "#ebebeb";
export const TITLE_FONT_SIZE = 20;
export const TITLE_COLOR = "#8f8f8f";


const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.isVisible === nextProps.isVisible &&
    prevProps.date.getTime() === nextProps.date.getTime()
  );
};

const DateTimePickerModalAndroid = memo(
  ({ date, mode, isVisible, onCancel, onConfirm, onHide, ...otherProps }) => {
    const currentDateRef = useRef(date);
    const [currentMode, setCurrentMode] = useState(null);

    useEffect(() => {
      if (isVisible && currentMode === null) {
        setCurrentMode(mode === "time" ? "time" : "date");
      } else if (!isVisible) {
        setCurrentMode(null);
      }
    }, [isVisible, currentMode, mode]);

    if (!isVisible || !currentMode) return null;

    const handleChange = (event, date) => {
      if (event.type === "dismissed") {
        onCancel();
        onHide(false);
        return;
      }
      let nextDate = date;
      if (mode === "datetime") {
        if (currentMode === "date") {
          setCurrentMode("time");
          currentDateRef.current = new Date(date);
          return;
        } else if (currentMode === "time") {
          const year = currentDateRef.current.getFullYear();
          const month = currentDateRef.current.getMonth();
          const day = currentDateRef.current.getDate();
          const hours = date.getHours();
          const minutes = date.getMinutes();
          nextDate = new Date(year, month, day, hours, minutes);
        }
      }
      onConfirm(nextDate);
      onHide(true, nextDate);
    };

    return (
      <DateTimePicker
        {...otherProps}
        mode={currentMode}
        value={date}
        onChange={handleChange}
      />
    );
  },
  areEqual
);

DateTimePickerModalAndroid.propTypes = {
  date: PropTypes.instanceOf(Date),
  isVisible: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onHide: PropTypes.func,
  maximumDate: PropTypes.instanceOf(Date),
  minimumDate: PropTypes.instanceOf(Date),
};

DateTimePickerModalAndroid.defaultProps = {
  date: new Date(),
  isVisible: false,
  onHide: () => {},
};




class DateTimePickerModalIOS extends React.PureComponent {
  static propTypes = {
    cancelTextIOS: PropTypes.string,
    confirmTextIOS: PropTypes.string,
    customCancelButtonIOS: PropTypes.elementType,
    customConfirmButtonIOS: PropTypes.elementType,
    customHeaderIOS: PropTypes.elementType,
    customPickerIOS: PropTypes.elementType,
    date: PropTypes.instanceOf(Date),
    headerTextIOS: PropTypes.string,
    modalPropsIOS: PropTypes.any,
    modalStyleIOS: PropTypes.any,
    isDarkModeEnabled: PropTypes.bool,
    isHeaderVisibleIOS: PropTypes.bool,
    isVisible: PropTypes.bool,
    pickerContainerStyleIOS: PropTypes.any,
    pickerStyleIOS: PropTypes.any,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    onHide: PropTypes.func,
    maximumDate: PropTypes.instanceOf(Date),
    minimumDate: PropTypes.instanceOf(Date),
  };

  static defaultProps = {
    cancelTextIOS: "Cancela",
    confirmTextIOS: "Confirma",
    modalPropsIOS: {},
    date: new Date(),
    isDarkModeEnabled: undefined,
    isHeaderVisibleIOS: false,
    isVisible: false,
    pickerContainerStyleIOS: {},
    pickerStyleIOS: {},
    display:"inline"
  };

  state = {
    currentDate: this.props.date,
    isPickerVisible: this.props.isVisible,
  };

  didPressConfirm = false;

  static getDerivedStateFromProps(props, state) {
    if (props.isVisible && !state.isPickerVisible) {
      return { currentDate: props.date, isPickerVisible: true };
    }
    return null;
  }

  componentDidMount() {
    if (this.props.isHeaderVisibleIOS) {
      console.warn(
        `Observe que o cabeçalho iOS integrado não terá mais suporte no futuro. Se ainda estiver planejando mostrar um cabeçalho, é recomendável fornecer sua própria implementação de cabeçalho usando "customHeaderIOS" (que continuará a ser compatível).`
      );
    }
  }

  handleCancel = () => {
    this.didPressConfirm = false;
    this.props.onCancel();
  };

  handleConfirm = () => {
    this.didPressConfirm = true;
    this.props.onConfirm(this.state.currentDate);
  };

  handleHide = () => {
    const { onHide } = this.props;
    if (onHide) {
      onHide(this.didPressConfirm, this.state.currentDate);
    }
    this.setState({ isPickerVisible: false });
  };

  handleChange = (event, date) => {
    if (this.props.onChange) {
      this.props.onChange(date);
    }
    this.setState({ currentDate: date });
  };

  render() {
    const {
      cancelTextIOS,
      confirmTextIOS,
      customCancelButtonIOS,
      customConfirmButtonIOS,
      customHeaderIOS,
      customPickerIOS,
      date,
      display,
      headerTextIOS,
      isDarkModeEnabled,
      isHeaderVisibleIOS,
      isVisible,
      modalStyleIOS,
      modalPropsIOS,
      pickerContainerStyleIOS,
      pickerStyleIOS,
      onCancel,
      onConfirm,
      onChange,
      onHide,
      ...otherProps
    } = this.props;
    const isAppearanceModuleAvailable = !!(
      Appearance && Appearance.getColorScheme
    );
    const _isDarkModeEnabled =
      isDarkModeEnabled === undefined && isAppearanceModuleAvailable
        ? Appearance.getColorScheme() === "dark"
        : isDarkModeEnabled || false;

    const ConfirmButtonComponent = customConfirmButtonIOS || ConfirmButton;
    const CancelButtonComponent = customCancelButtonIOS || CancelButton;
    const HeaderComponent = customHeaderIOS || Header;
    const PickerComponent = customPickerIOS || DateTimePicker;

    const themedContainerStyle = _isDarkModeEnabled
      ? pickerStyles.containerDark
      : pickerStyles.containerLight;

    const headerText =
      headerTextIOS ||
      (this.props.mode === "time" ? "Selecione uma hora" : "Selecione uma data");

    return (
      <Modal
        isVisible={isVisible}
        contentStyle={[pickerStyles.modal, modalStyleIOS]}
        onBackdropPress={this.handleCancel}
        onHide={this.handleHide}
        {...modalPropsIOS}
      >
        <View
          style={[
            pickerStyles.container,
            themedContainerStyle,
            pickerContainerStyleIOS,
          ]}
        >
          {isHeaderVisibleIOS && <HeaderComponent label={headerText} />}
          {!isHeaderVisibleIOS && display === "inline" && (
            <View style={pickerStyles.headerFiller} />
          )}
          <View
            style={[
              display === "inline"
                ? pickerStyles.pickerInline
                : pickerStyles.pickerSpinner,
              pickerStyleIOS,
            ]}
          >
            <PickerComponent
              display={display || "spinner"}
              {...otherProps}
              themeVariant={_isDarkModeEnabled?"dark":"light"}
              textColor={_isDarkModeEnabled?"dark":"light"}
              value={this.state.currentDate}
              onChange={this.handleChange}
            />
          </View>
          <ConfirmButtonComponent
            isDarkModeEnabled={_isDarkModeEnabled}
            onPress={this.handleConfirm}
            label={confirmTextIOS}
          />
        </View>
        <CancelButtonComponent
          isDarkModeEnabled={_isDarkModeEnabled}
          onPress={this.handleCancel}
          label={cancelTextIOS}
        />
      </Modal>
    );
  }
}

const pickerStyles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 10,
  },
  container: {
    borderRadius: BORDER_RADIUS,
    marginBottom: 8,
    overflow: "hidden",
  },
  pickerSpinner: {
    marginBottom: 8,
  },
  pickerInline: {
    paddingHorizontal: 12,
    paddingTop: 14,
  },
  containerLight: {
    backgroundColor: BACKGROUND_COLOR_LIGHT,
  },
  containerDark: {
    backgroundColor: BACKGROUND_COLOR_DARK,
  },
});

export const Header = ({ label, style = headerStyles }) => {
  return (
    <View style={style.root}>
      <Text style={style.text}>{label}</Text>
    </View>
  );
};

export const headerStyles = StyleSheet.create({
  root: {
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 14,
    backgroundColor: "transparent",
  },
  text: {
    textAlign: "center",
    color: TITLE_COLOR,
    fontSize: TITLE_FONT_SIZE,
  },
});

export const ConfirmButton = ({
  isDarkModeEnabled,
  onPress,
  label,
  style = confirmButtonStyles,
}) => {
  const themedButtonStyle = isDarkModeEnabled
    ? confirmButtonStyles.buttonDark
    : confirmButtonStyles.buttonLight;

  const underlayColor = isDarkModeEnabled
    ? HIGHLIGHT_COLOR_DARK
    : HIGHLIGHT_COLOR_LIGHT;
  return (
    <TouchableHighlight
      style={[themedButtonStyle, style.button]}
      underlayColor={underlayColor}
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={style.text}>{label}</Text>
    </TouchableHighlight>
  );
};

export const confirmButtonStyles = StyleSheet.create({
  button: {
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: "transparent",
    height: 57,
    justifyContent: "center",
  },
  buttonLight: {
    borderColor: BORDER_COLOR,
  },
  buttonDark: {
    borderColor: BORDER_COLOR_DARK,
  },
  text: {
    textAlign: "center",
    color: BUTTON_FONT_COLOR,
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: BUTTON_FONT_WEIGHT,
    backgroundColor: "transparent",
  },
});

export const CancelButton = ({
  isDarkModeEnabled,
  onPress,
  label,
  style = cancelButtonStyles,
}) => {
  const themedButtonStyle = isDarkModeEnabled
    ? cancelButtonStyles.buttonDark
    : cancelButtonStyles.buttonLight;
  const underlayColor = isDarkModeEnabled
    ? HIGHLIGHT_COLOR_DARK
    : HIGHLIGHT_COLOR_LIGHT;
  return (
    <TouchableHighlight
      style={[style.button, themedButtonStyle]}
      underlayColor={underlayColor}
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={style.text}>{label}</Text>
    </TouchableHighlight>
  );
};

export const cancelButtonStyles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS,
    height: 57,
    marginBottom: isIphoneX() ? 20 : 0,
    justifyContent: "center",
  },
  buttonLight: {
    backgroundColor: BACKGROUND_COLOR_LIGHT,
  },
  buttonDark: {
    backgroundColor: BACKGROUND_COLOR_DARK,
  },
  text: {
    padding: 10,
    textAlign: "center",
    color: BUTTON_FONT_COLOR,
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: "600",
    backgroundColor: "transparent",
  },
});




const IS_ANDROID = Platform.OS === "android";

export default (IS_ANDROID ? DateTimePickerModalAndroid : DateTimePickerModalIOS);