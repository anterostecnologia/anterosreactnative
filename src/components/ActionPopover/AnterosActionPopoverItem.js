// ActionPopoverItem.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import shallowCompare from "react-addons-shallow-compare";
import {AnterosTheme} from '../../themes/AnterosTheme';

export class AnterosActionPopoverItem extends Component {

  static propTypes = {
    ...TouchableOpacity.propTypes,
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    leftSeparator: PropTypes.bool,
    rightSeparator: PropTypes.bool
  };

  static defaultProps = {
    ...TouchableOpacity.defaultProps
  };

  buildProps() {
    let {
      style,
      title,
      leftSeparator,
      rightSeparator,
      ...others
    } = this.props;

    style = [
      {
        paddingVertical: AnterosTheme.apItemPaddingVertical,
        paddingHorizontal: AnterosTheme.apItemPaddingHorizontal,
        borderColor: AnterosTheme.apSeparatorColor,
        borderLeftWidth: leftSeparator
          ? AnterosTheme.apSeparatorWidth
          : 0,
        borderRightWidth: rightSeparator
          ? AnterosTheme.apSeparatorWidth
          : 0
      }
    ].concat(style);

    if ((title || title === '' || title === 0) && !React.isValidElement(title)) {
      let textStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: AnterosTheme.apItemTitleColor,
        fontSize: AnterosTheme.apItemFontSize
      };
      title = <Text style={textStyle} numberOfLines={1}>{title}</Text>;
    }

    return {
      style,
      title,
      leftSeparator,
      rightSeparator,
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
      ...others
    } = props;
    return (
      <TouchableOpacity {...others}>
        {title}
      </TouchableOpacity>
    );
  }

}
