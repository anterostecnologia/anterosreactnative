// AnterosInput.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TextInput} from 'react-native';

import AnterosTheme from '../../themes/AnterosTheme';

export default class AnterosInput extends TextInput {

  static propTypes = {
    ...TextInput.propTypes,
    size: PropTypes.oneOf(['lg', 'md', 'sm']),
    disabled: PropTypes.bool
  };

  static defaultProps = {
    ...TextInput.defaultProps,
    size: 'md',
    disabled: false,
    underlineColorAndroid: 'rgba(0, 0, 0, 0)'
  };

  buildProps() {
    let {
      style,
      size,
      disabled,
      placeholderTextColor,
      pointerEvents,
      opacity,
      ...others
    } = this.props;

    let borderRadius,
      fontSize,
      paddingVertical,
      paddingHorizontal,
      height;
    switch (size) {
      case 'lg':
        borderRadius = AnterosTheme.inputBorderRadiusLG;
        fontSize = AnterosTheme.inputFontSizeLG;
        paddingVertical = AnterosTheme.inputPaddingVerticalLG;
        paddingHorizontal = AnterosTheme.inputPaddingHorizontalLG;
        height = AnterosTheme.inputHeightLG;
        break;
      case 'sm':
        borderRadius = AnterosTheme.inputBorderRadiusSM;
        fontSize = AnterosTheme.inputFontSizeSM;
        paddingVertical = AnterosTheme.inputPaddingVerticalSM;
        paddingHorizontal = AnterosTheme.inputPaddingHorizontalSM;
        height = AnterosTheme.inputHeightSM;
        break;
      default:
        borderRadius = AnterosTheme.inputBorderRadiusMD;
        fontSize = AnterosTheme.inputFontSizeMD;
        paddingVertical = AnterosTheme.inputPaddingVerticalMD;
        paddingHorizontal = AnterosTheme.inputPaddingHorizontalMD;
        height = AnterosTheme.inputHeightMD;
    }
    style = [
      {
        backgroundColor: AnterosTheme.inputColor,
        color: AnterosTheme.inputTextColor,
        borderColor: AnterosTheme.inputBorderColor,
        borderWidth: AnterosTheme.inputBorderWidth,
        borderRadius: borderRadius,
        fontSize: fontSize,
        paddingVertical: paddingVertical,
        paddingHorizontal: paddingHorizontal,
        height: height
      }
    ].concat(style);

    if (!placeholderTextColor) 
      placeholderTextColor = AnterosTheme.inputPlaceholderTextColor;
    if (disabled) {
      pointerEvents = 'none';
      opacity = AnterosTheme.inputDisabledOpacity;
    }

    this.props = {
      style,
      size,
      disabled,
      placeholderTextColor,
      pointerEvents,
      opacity,
      ...others
    };
  }

  render() {
    this.buildProps();
    return super.render();
  }

}
