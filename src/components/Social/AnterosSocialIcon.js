import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableHighlight,
  ActivityIndicator,
  Text as NativeText,
  ViewPropTypes as RNViewPropTypes
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AnterosText} from '../Text/AnterosText';
const ViewPropTypes = RNViewPropTypes || View.propTypes;

const log = () => {
  console.log('please attach method to this component'); // eslint-disable-line no-console
};

const fonts = {
    ios: {},
    android: {
      regular: {
        fontFamily: 'sans-serif',
      },
      light: {
        fontFamily: 'sans-serif-light',
      },
      condensed: {
        fontFamily: 'sans-serif-condensed',
      },
      condensed_light: {
        fontFamily: 'sans-serif-condensed',
        fontWeight: 'light',
      },
      black: {
        // note(brentvatne): sans-serif-black is only supported on Android 5+,
        // we can detect that here and use it in that case at some point.
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
      },
      thin: {
        fontFamily: 'sans-serif-thin',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
      },
      bold: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
      },
    },
  };

const colors = {
  ['github-alt']: '#000000',
  ['google-plus-official']: '#dd4b39',
  ['reddit-alien']: '#fc461e',
  ['stack-overflow']: '#f27f33',
  angellist: '#1c4082',
  codepen: '#000000',
  envelope: '#000000',
  etsy: '#f2581e',
  facebook: '#3b5998',
  foursquare: '#0072b1',
  github: '#000000',
  gitlab: '#e14329',
  instagram: '#517fa4',
  linkedin: '#007bb6',
  medium: '#02b875',
  pinterest: '#cb2027',
  quora: '#a82400',
  soundcloud: '#f50',
  steam: '#c6c3c1',
  stumbleupon: '#EB4823',
  tumblr: '#32506d',
  twitch: '#6441A5',
  twitter: '#00aced',
  vimeo: '#aad450',
  wordpress: '#21759b',
  youtube: '#bb0000',
};

export const AnterosSocialIcon = props => {
  const {
    activityIndicatorStyle,
    button,
    component,
    disabled,
    fontFamily,
    fontStyle,
    fontWeight,
    iconColor,
    iconSize,
    iconStyle,
    light,
    loading,
    onLongPress,
    onPress,
    raised,
    small,
    style,
    title,
    type,
    underlayColor,
    ...attributes
  } = props;

  const Component =
    onPress || onLongPress ? component || TouchableHighlight : View;
  let loadingElement;
  if (loading) {
    loadingElement = (
      <ActivityIndicator
        animating={true}
        style={[styles.activityIndicatorStyle, activityIndicatorStyle]}
        color={iconColor || 'white'}
        size={(small && 'small') || 'large'}
      />
    );
  }
  return (
    <Component
      {...attributes}
      underlayColor={light ? 'white' : underlayColor || colors[type]}
      onLongPress={disabled ? null : onLongPress || log}
      onPress={(!disabled || log) && (onPress || log)}
      disabled={disabled || false}
      style={[
        raised && styles.raised,
        styles.container,
        button && styles.button,
        !button && raised && styles.icon,
        !button &&
          !light &&
          !raised && {
            width: iconSize * 2 + 4,
            height: iconSize * 2 + 4,
            borderRadius: iconSize * 2,
          },
        { backgroundColor: colors[type] },
        light && { backgroundColor: 'white' },
        style && style,
      ]}
    >
      <View style={styles.wrapper}>
        <Icon
          style={[iconStyle && iconStyle]}
          color={light ? colors[type] : iconColor}
          name={type}
          size={iconSize}
        />
        {button &&
          title && (
            <AnterosText
              style={[
                styles.title,
                light && { color: colors[type] },
                fontFamily && { fontFamily },
                fontWeight && { fontWeight },
                fontStyle && fontStyle,
              ]}
            >
              {title}
            </AnterosText>
          )}
        {loading && loadingElement}
      </View>
    </Component>
  );
};

AnterosSocialIcon.propTypes = {
  component: PropTypes.func,
  type: PropTypes.string,
  button: PropTypes.bool,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  iconStyle: ViewPropTypes.style,
  style: ViewPropTypes.style,
  iconColor: PropTypes.string,
  underlayColor: PropTypes.string,
  title: PropTypes.string,
  raised: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  activityIndicatorStyle: ViewPropTypes.style,
  small: PropTypes.string,
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  light: PropTypes.bool,
  fontWeight: PropTypes.string,
  fontStyle: NativeText.propTypes.style,
  fontFamily: PropTypes.string,
};

AnterosSocialIcon.defaultProps = {
  raised: true,
  iconColor: 'white',
  iconSize: 24,
  button: false,
};

const styles = StyleSheet.create({
  container: {
    margin: 7,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingTop: 14,
    paddingBottom: 14,
  },
  raised: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    marginLeft: 15,
    ...Platform.select({
      ios: {
        fontWeight: 'bold',
      },
      android: {
        ...fonts.android.black,
      },
    }),
  },
  icon: {
    height: 52,
    width: 52,
  },
  activityIndicatorStyle: {
    marginHorizontal: 10,
    height: 0,
  },
});
