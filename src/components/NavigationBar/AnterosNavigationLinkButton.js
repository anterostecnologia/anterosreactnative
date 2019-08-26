// AnterosNavigationLinkButton.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';

import AnterosTheme from '../../themes/AnterosTheme';
import AnterosNavigationButton from './AnterosNavigationButton';

export default class AnterosNavigationLinkButton extends AnterosNavigationButton {

  static propTypes = {
    ...AnterosNavigationButton.propTypes,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  buildProps() {
    super.buildProps();

    let {
      title,
      children,
      ...others
    } = this.props;

    if (title || title === '' || title === 0) {
      let textStyle = {
        color: this.context.tintColor,
        fontSize: AnterosTheme.navButtonFontSize,
        overflow: 'hidden'
      };
      children = <Text style={textStyle} numberOfLines={1} allowFontScaling={false}>{title}</Text>;
    }

    this.props = {
      title,
      children,
      ...others
    };
  }

}
