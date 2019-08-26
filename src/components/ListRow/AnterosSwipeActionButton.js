// AnterosSwipeActionButton.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native';

import AnterosTheme from '../../themes/AnterosTheme';

export default class AnterosSwipeActionButton extends TouchableOpacity {

  static propTypes = {
    ...TouchableOpacity.propTypes,
    type: PropTypes.oneOf(['default', 'danger']),
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    titleStyle: Text.propTypes.style
  };

  static defaultProps = {
    ...TouchableOpacity.defaultProps,
    type: 'default'
  };

  buildProps() {
    let {
      style,
      type,
      title,
      titleStyle,
      children,
      ...others
    } = this.props;

    let backgroundColor,
      paddingHorizontal,
      textColor;
    switch (type) {
      case 'danger':
        backgroundColor = AnterosTheme.rowActionButtonDangerColor;
        textColor = AnterosTheme.rowActionButtonDangerTitleColor;
        break;
      default:
        backgroundColor = AnterosTheme.rowActionButtonColor;
        textColor = AnterosTheme.rowActionButtonTitleColor;
    }

    style = [
      {
        backgroundColor,
        paddingHorizontal: AnterosTheme.rowActionButtonPaddingHorizontal,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
      }
    ].concat(style);

    if (!React.isValidElement(title) && (title || title === '' || title === 0)) {
      titleStyle = [
        {
          color: textColor,
          fontSize: AnterosTheme.rowActionButtonTitleFontSize,
          overflow: 'hidden'
        }
      ].concat(titleStyle);
      title = <Text style={titleStyle} numberOfLines={1}>{title}</Text>;
    }
    if (title) 
      children = title;
    
    this.props = {
      style,
      type,
      title,
      titleStyle,
      children,
      ...others
    };
  }

  render() {
    this.buildProps();
    return super.render();
  }
}
