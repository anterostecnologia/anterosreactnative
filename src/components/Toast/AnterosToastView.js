// ToastView.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {View, Image, Text} from 'react-native';

import AnterosTheme from '../../themes/AnterosTheme';
import AnterosOverlay from '../Overlay/AnterosOverlay';

export default class AnterosToastView extends AnterosOverlay.View {

  static propTypes = {
    ...AnterosOverlay.View.propTypes,
    text: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    icon: PropTypes.oneOfType([
      PropTypes.element, PropTypes.shape({uri: PropTypes.string}), //{uri: 'http://...'}
      PropTypes.number, //require('path/to/image')
      PropTypes.oneOf([
        'none',
        'success',
        'fail',
        'smile',
        'sad',
        'info',
        'stop'
      ])
    ]),
    position: PropTypes.oneOf(['top', 'bottom', 'center'])
  };

  static defaultProps = {
    ...AnterosOverlay.View.defaultProps,
    overlayOpacity: 0,
    overlayPointerEvents: 'none',
    position: 'center'
  };

  buildProps() {
    super.buildProps();

    let {
      style,
      contentStyle,
      text,
      icon,
      position,
      ...others
    } = this.props;

    style = [
      {
        paddingLeft: AnterosTheme.toastScreenPaddingLeft,
        paddingRight: AnterosTheme.toastScreenPaddingRight,
        paddingTop: AnterosTheme.toastScreenPaddingTop,
        paddingBottom: AnterosTheme.toastScreenPaddingBottom,
        justifyContent: position === 'top'
          ? 'flex-start'
          : (position === 'bottom'
            ? 'flex-end'
            : 'center'),
        alignItems: 'center'
      }
    ].concat(style);

    contentStyle = {
      backgroundColor: AnterosTheme.toastColor,
      paddingLeft: AnterosTheme.toastPaddingLeft,
      paddingRight: AnterosTheme.toastPaddingRight,
      paddingTop: AnterosTheme.toastPaddingTop,
      paddingBottom: AnterosTheme.toastPaddingBottom,
      borderRadius: AnterosTheme.toastBorderRadius,
      alignItems: 'center'
    };

    if (typeof text === 'string' || typeof text === 'number') {
      text = (
        <Text
          style={{
          color: AnterosTheme.toastTextColor,
          fontSize: AnterosTheme.toastFontSize
        }}>{text}</Text>
      );
    }

    if (icon || icon === 0) {
      let image;
      if (!React.isValidElement(icon)) {
        let imageSource;
        if (typeof icon === 'string') {
          switch (icon) {
            case 'success':
              imageSource = require('../../assets/icons/success.png');
              break;
            case 'fail':
              imageSource = require('../../assets/icons/fail.png');
              break;
            case 'smile':
              imageSource = require('../../assets/icons/smile.png');
              break;
            case 'sad':
              imageSource = require('../../assets/icons/sad.png');
              break;
            case 'info':
              imageSource = require('../../assets/icons/info.png');
              break;
            case 'stop':
              imageSource = require('../../assets/icons/stop.png');
              break;
            default:
              imageSource = null;
              break;
          }
        } else {
          imageSource = icon;
        }
        image = (<Image
          style={{
          width: AnterosTheme.toastIconWidth,
          height: AnterosTheme.toastIconHeight,
          tintColor: AnterosTheme.toastIconTintColor
        }}
          source={imageSource}/>);
      } else {
        image = icon;
      }
      icon = (
        <View
          style={{
          paddingTop: AnterosTheme.toastIconPaddingTop,
          paddingBottom: AnterosTheme.toastIconPaddingBottom
        }}>
          {image}
        </View>
      );
    }

    this.props = {
      style,
      contentStyle,
      text,
      icon,
      position,
      ...others
    };
  }

  renderContent() {
    let {contentStyle, text, icon} = this.props;
    return (
      <View style={contentStyle}>
        {icon}
        {text}
      </View>
    );
  }

}
