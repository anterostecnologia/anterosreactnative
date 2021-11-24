// NavigationIconButton.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-native';

import {AnterosTheme} from '../../themes/AnterosTheme';
import {AnterosNavigationButton} from './AnterosNavigationButton';

export class AnterosNavigationIconButton extends AnterosNavigationButton {

  static propTypes = {
    ...AnterosNavigationButton.propTypes,
    icon: Image.propTypes.source
  }

  buildProps() {
    super.buildProps();

    let {
      icon,
      children,
      ...others
    } = this.props;

    if (icon) {
      let iconStyle = {
        tintColor: this.context.tintColor,
        width: 20,
        height: 20
      };
      children = <Image style={iconStyle} source={icon}/>;
    }

    this.props = {
      icon,
      children,
      ...others
    };
  }

}
