// AnterosTabButton.js

'use strict';

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, TouchableOpacity, ViewPropTypes} from 'react-native';
import shallowCompare from "react-addons-shallow-compare";
import {AnterosTheme} from '../../themes/AnterosTheme';
import {AnterosBadge} from '../Badge/AnterosBadge';

export class AnterosTabButton extends Component {

  static propTypes = {
    ...TouchableOpacity.propTypes,
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    titleStyle: Text.propTypes.style,
    activeTitleStyle: Text.propTypes.style,
    icon: PropTypes.oneOfType([
      PropTypes.element, PropTypes.shape({uri: PropTypes.string}),
      PropTypes.number
    ]),
    activeIcon: PropTypes.oneOfType([
      PropTypes.element, PropTypes.shape({uri: PropTypes.string}),
      PropTypes.number
    ]),
    active: PropTypes.bool,
    iconContainerStyle: ViewPropTypes.style,
    badge: PropTypes.oneOfType([PropTypes.element, PropTypes.number])
  };

  static defaultProps = {
    ...TouchableOpacity.defaultProps,
    active: false
  };

  buildProps() {
    let {
      style,
      title,
      titleStyle,
      activeTitleStyle,
      icon,
      activeIcon,
      active,
      badge,
      iconContainerStyle,
      ...others
    } = this.props;

    style = [
      {
        width: AnterosTheme.tvBarBtnWidth,
        overflow: 'visible',
        alignItems: 'center',
        justifyContent: 'center'
      }
    ].concat(style);

    if (!React.isValidElement(title) && (title || title === '' || title === 0)) {
      let textStyle;
      if (active) {
        textStyle = [
          {
              backgroundColor: 'rgba(0, 0, 0, 0)',
              color: AnterosTheme.tvBarBtnActiveTitleColor,
              fontSize: AnterosTheme.tvBarBtnActiveTextFontSize
            }
          ]
          .concat(titleStyle)
          .concat(activeTitleStyle);
      } else {
        textStyle = [
          {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            color: AnterosTheme.tvBarBtnTitleColor,
            fontSize: AnterosTheme.tvBarBtnTextFontSize
          }
        ].concat(titleStyle);
      }
      title = <Text style={textStyle} numberOfLines={1}>{title}</Text>;
    }

    if (!activeIcon && activeIcon !== 0) 
      activeIcon = icon;
    
    if (!React.isValidElement(icon) && (icon || icon === 0)) {
      let iconStyle = {
        width: AnterosTheme.tvBarBtnIconSize,
        height: AnterosTheme.tvBarBtnIconSize,
        tintColor: AnterosTheme.tvBarBtnIconTintColor
      };
      icon = <Image style={iconStyle} source={icon}/>
    }

    if (!React.isValidElement(activeIcon) && (activeIcon || activeIcon === 0)) {
      let iconStyle = {
        width: AnterosTheme.tvBarBtnIconSize,
        height: AnterosTheme.tvBarBtnIconSize,
        tintColor: AnterosTheme.tvBarBtnIconActiveTintColor
      };
      activeIcon = <Image style={iconStyle} source={activeIcon}/>
    }

    if (!React.isValidElement(badge) && badge) {
      let badgeStyle = {
        position: 'absolute',
        right: 0,
        top: 0
      };
      badge = <AnterosBadge style={badgeStyle} count={badge}/>;
    }

    iconContainerStyle = [
      {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }
    ].concat(iconContainerStyle);

    return {
      style,
      title,
      titleStyle,
      activeTitleStyle,
      icon,
      activeIcon,
      active,
      badge,
      iconContainerStyle,
      ...others
    };
  }

  shouldComponentUpdate=(nextProps, nextState) => {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const props = this.buildProps();

    let {
      title,
      icon,
      activeIcon,
      active,
      badge,
      iconContainerStyle,
      ...others
    } = props;
    let useIcon = active
      ? activeIcon
      : icon;
    return (
      <TouchableOpacity {...others}>
        {!useIcon
          ? null
          : <View style={iconContainerStyle}>
            {useIcon}
          </View>
}
        {title}
        {badge}
      </TouchableOpacity>
    );
  }
}
