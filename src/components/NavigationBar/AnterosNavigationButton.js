// AnterosNavigationButton.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import shallowCompare from "react-addons-shallow-compare";

export class AnterosNavigationButton extends TouchableOpacity {

  static propTypes = {
    ...TouchableOpacity.propTypes,
  };

  static defaultProps = {
    ...TouchableOpacity.defaultProps,
    hitSlop: {top: 12, bottom: 12, left: 8, right: 8},
  };

  static contextTypes = {
    tintColor: PropTypes.string,
  };

  buildProps() {
    let {style, ...others} = this.props;

    style = [{
      backgroundColor: 'rgba(0, 0, 0, 0)',
      paddingLeft: 6,
      paddingRight: 6,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
    }].concat(style);

    this.props = {style, ...others};
  }

  shouldComponentUpdate=(nextProps, nextState) => {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    this.buildProps();
    return super.render();
  }

}
