import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AnterosTheme from '../../themes/AnterosTheme';
import LinearGradient from 'react-native-linear-gradient';

import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  ActivityIndicator,
  ViewPropTypes as RNViewPropTypes,
  Platform,
} from 'react-native';
const colors = {
  primary: AnterosTheme.primaryColor,
  secondary: AnterosTheme.secondaryColor,
  grey0: '#393e42',
  grey1: '#43484d',
  grey2: '#5e6977',
  grey3: '#86939e',
  grey4: '#bdc6cf',
  grey5: '#e1e8ee',
  greyOutline: '#bbb',
  searchBg: '#303337',
  error: '#ff190c',
};

const ViewPropTypes = RNViewPropTypes || View.propTypes;

const log = () => {
  /* eslint-disable no-console */
  console.log('Please attach a method to this component');
};

export default class AnterosButton extends Component {
  constructor(props){
    super(props);
    this.measure = this.measure.bind(this);
  }
  componentDidMount() {
    const { linearGradientProps, ViewComponent } = this.props;    
  }

  measure(m){
    this._view.measure(m);
  }

  render() {
    const {
      TouchableComponent,
      containerStyle,
      onPress,
      buttonStyle,
      clear,
      loading,
      loadingStyle,
      loadingProps,
      title,
      titleProps,
      titleStyle,
      icon,
      iconContainerStyle,
      iconRight,
      disabled,
      disabledStyle,
      disabledTitleStyle,
      linearGradientProps,
      ViewComponent = linearGradientProps != undefined
        ? LinearGradient
        : View,
      ...attributes
    } = this.props;

    return (
      <View style={containerStyle}>
        <TouchableComponent
          {...attributes}
          onPress={onPress}
          ref={(c) => this._view = c}
          underlayColor={clear ? 'transparent' : undefined}
          activeOpacity={clear ? 0 : undefined}
          disabled={disabled}
        >
          <ViewComponent
            {...linearGradientProps}
            style={[
              styles.button,
              disabled && styles.disabled,
              clear && { backgroundColor: 'transparent', elevation: 0 },
              buttonStyle,
              disabled && disabledStyle,
              linearGradientProps && { backgroundColor: 'transparent' },
            ]}
          >
            {loading && (
              <ActivityIndicator
                animating={true}
                style={[styles.loading, loadingStyle]}
                color={loadingProps.color}
                size={loadingProps.size}
                {...loadingProps}
              />
            )}
            {!loading &&
              icon &&
              !iconRight && (
                <View style={[styles.iconContainer, iconContainerStyle]}>
                  {icon}
                </View>
              )}
            {!loading &&
              !!title && (
                <Text
                  style={[
                    styles.title,
                    titleStyle,
                    disabled && styles.disabledTitle,
                    disabled && disabledTitleStyle,
                  ]}
                  {...titleProps}
                >
                  {title}
                </Text>
              )}
            {!loading &&
              icon &&
              iconRight && (
                <View style={[styles.iconContainer, iconContainerStyle]}>
                  {icon}
                </View>
              )}
          </ViewComponent>
        </TouchableComponent>
      </View>
    );
  }
}

AnterosButton.propTypes = {
  title: PropTypes.string,
  titleStyle: Text.propTypes.style,
  titleProps: PropTypes.object,
  buttonStyle: ViewPropTypes.style,
  clear: PropTypes.bool,
  loading: PropTypes.bool,
  loadingStyle: ViewPropTypes.style,
  loadingProps: PropTypes.object,
  onPress: PropTypes.any,
  containerStyle: ViewPropTypes.style,
  icon: PropTypes.element,
  iconContainerStyle: ViewPropTypes.style,
  iconRight: PropTypes.bool,
  linearGradientProps: PropTypes.object,
  TouchableComponent: PropTypes.any,
  ViewComponent: PropTypes.any,
  disabled: PropTypes.bool,
  disabledStyle: ViewPropTypes.style,
  disabledTitleStyle: Text.propTypes.style,
};

AnterosButton.defaultProps = {
  title: '',
  iconRight: false,
  TouchableComponent:
    Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback,
  onPress: log,
  clear: false,
  loadingProps: {
    color: 'white',
    size: 'small',
  },
  buttonStyle: {
    borderRadius: 3,
  },
  disabled: false,
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: colors.primary,
    ...Platform.select({
      android: {
        elevation: 4,
        borderRadius: 2,
      },
    }),
  },
  disabled: {
    // grey from designmodo.github.io/Flat-UI/
    backgroundColor: '#D1D5D8',
    ...Platform.select({
      android: {
        //no elevation
        borderRadius: 2,
      },
    }),
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    padding: 8,
    ...Platform.select({
      ios: {
        fontSize: 18,
      },
      android: {
        fontWeight: '500',
      },
    }),
  },
  disabledTitle: {
    color: '#F3F4F5',
  },
  iconContainer: {
    marginHorizontal: 5,
  },
});



