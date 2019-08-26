// ModalIndicatorView.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {View, Text, ActivityIndicator} from 'react-native';

import AnterosTheme from '../../themes/AnterosTheme';
import AnterosOverlay from '../Overlay/AnterosOverlay';

export default class AnterosModalIndicatorView extends AnterosOverlay.View {

  static propTypes = {
    ...AnterosOverlay.View.propTypes,
    text: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    position: PropTypes.oneOf(['top', 'bottom', 'center']),
    size: ActivityIndicator.size,
    color: ActivityIndicator.color
  };

  static defaultProps = {
    ...AnterosOverlay.View.defaultProps,
    modal: true,
    position: 'center',
    size: 'large'
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {text: props.text});
  }

  get text() {
    return this.state.text;
  }

  set text(value) {
    this.setState({text: value});
  }

  buildProps() {
    super.buildProps();

    let {style, contentStyle, position, color, ...others} = this.props;

    style = [{
      paddingLeft: AnterosTheme.miScreenPaddingLeft,
      paddingRight: AnterosTheme.miScreenPaddingRight,
      paddingTop: AnterosTheme.miScreenPaddingTop,
      paddingBottom: AnterosTheme.miScreenPaddingBottom,
      justifyContent: position === 'top' ? 'flex-start' : (position === 'bottom' ? 'flex-end' : 'center'),
      alignItems: 'center',
    }].concat(style);

    contentStyle = {
      alignItems: 'center',
    };

    if (!color) color = AnterosTheme.miIndicatorColor;

    this.props = {style, contentStyle, position, color, ...others};
  }

  renderContent() {
    let {contentStyle, size, color} = this.props;
    let {text} = this.state;
    return (
      <View style={contentStyle}>
        <ActivityIndicator size={size} color={color} />
        {React.isValidElement(text) ? text :
          <Text style={{color: AnterosTheme.miTextColor, fontSize: AnterosTheme.miFontSize, paddingTop: AnterosTheme.miTextPaddingTop}}>
            {text}
          </Text>
        }
      </View>
    );
  }

}
