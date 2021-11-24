// AnterosNavigationTitle.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import shallowCompare from "react-addons-shallow-compare";
import {AnterosTheme} from '../../themes/AnterosTheme';

export class AnterosNavigationTitle extends Text {

  static propTypes = {
    ...Text.propTypes,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  static defaultProps = {
    ...Text.defaultProps,
    numberOfLines: 1,
    allowFontScaling: false
  };

  static contextTypes = {
    tintColor: PropTypes.string
  };

  buildProps() {
    let {
      style,
      text,
      children,
      ...others
    } = this.props;

    style = [
      {
        flex: 1,
        paddingLeft: 4,
        paddingRight: 4,
        textAlign: 'center',
        overflow: 'hidden',
        color: this.context.tintColor,
        fontSize: AnterosTheme.navTitleFontSize
      }
    ].concat(style);

    if (text || text === '' || text === 0) 
      children = text;
    
    this.props = {
      style,
      text,
      children,
      ...others
    };
  }

  shouldComponentUpdate=(nextProps, nextState) => {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    this.buildProps();
    return super.render();
  }

}
