import PropTypes from 'prop-types';
import React from 'react';
import {
  Platform,
  TouchableHighlight,
  View,
  StyleSheet,
  ViewPropTypes as RNViewPropTypes,
  Text as NativeText,
} from 'react-native';
import { Linejoin, Linecap, Svg, Path } from "react-native-svg";


import ZocialIcon from 'react-native-vector-icons/Zocial';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { AnterosText } from '../Text/AnterosText';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './versatil_fonts.json';

let Versatil = FontAwesome5Pro;

if (Platform.OS !== 'ios'){
  Versatil = createIconSetFromIcoMoon(icoMoonConfig);
}

const customIcons = {};

const registerCustomIconType = (id, customIcon) => {
  customIcons[id] = customIcon;
};

function getIconType(type, name) {
  switch (type) {
    case 'zocial':
      return ZocialIcon;
    case 'octicon':
      return OcticonIcon;
    case 'material':
      return MaterialIcon;
    case 'material-community':
      return MaterialCommunityIcon;
    case 'ionicon':
      return Ionicon;
    case 'foundation':
      return FoundationIcon;
    case 'evilicon':
      return EvilIcon;
    case 'entypo':
      return EntypoIcon;
    case 'font-awesome':
      return FontAwesome;
    case 'font-versatil':
        return Versatil;  
    case 'simple-line-icon':
      return SimpleLineIcon;
    case 'feather':
      return FeatherIcon;
    default:
      if (customIcons.hasOwnProperty(type)) {
        return customIcons[type];
      }
      return MaterialIcon;
  }
};

const ViewPropTypes = RNViewPropTypes || View.propTypes;





export const AnterosIcon = props => {
  const {
    type,
    name,
    size,
    color,
    iconStyle,
    component,
    underlayColor,
    reverse,
    raised,
    containerStyle,
    reverseColor,
    text,
    textStyle,
    FaStyle,
    onPress,
    ...attributes
  } = props;

  let Component = View;
  if (onPress) {
    Component = TouchableHighlight;
  }
  if (component) {
    Component = component;
  }
  let Icon;
  if (!type) {
    Icon = getIconType('material',name);
  } else {
    Icon = getIconType(type,name);
  }
  return (
    <Component
      {...attributes}
      underlayColor={reverse ? color : underlayColor || color}
      style={[
        (reverse || raised) && styles.button,
        (reverse || raised) && {
          borderRadius: size + 4,
          height: size * 2 + 4,
          width: size * 2 + 4,
        },
        raised && styles.raised,
        {
          backgroundColor: reverse ? color : raised ? 'white' : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        },
        containerStyle && containerStyle,
      ]}
      onPress={onPress}
    >
      <View style={{flexDirection:'row'}}>
        <Icon
          style={[{ backgroundColor: 'transparent' }, iconStyle && iconStyle]}
          size={size}
          name={name}
          light={FaStyle==="light"}
          solid={FaStyle==="solid"}
          brands={FaStyle==="brands"}
          duodone={FaStyle==="duodone"}
          color={reverse ? reverseColor : color}
        />
        {text?<AnterosText style={[{paddingLeft: 4},textStyle]}>{text}</AnterosText>:null}
        {props.children}
      </View>
    </Component>
  );
};

AnterosIcon.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  component: PropTypes.func,
  underlayColor: PropTypes.string,
  reverse: PropTypes.bool,
  raised: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
  iconStyle: NativeText.propTypes.style,
  onPress: PropTypes.func,
  reverseColor: PropTypes.string,
  FaStyle: PropTypes.string
};

AnterosIcon.defaultProps = {
  underlayColor: 'white',
  reverse: false,
  raised: false,
  size: 24,
  color: 'black',
  reverseColor: 'white',
  FaStyle: 'light'
};

const styles = StyleSheet.create({
  button: {
    margin: 7,
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
});

