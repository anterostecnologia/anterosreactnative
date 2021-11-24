// Badge.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ViewPropTypes} from 'react-native';
import shallowCompare from "react-addons-shallow-compare";
import {AnterosTheme} from '../../themes/AnterosTheme';

export class AnterosBadge extends Component {

  static propTypes = {
    ...ViewPropTypes,
    type: PropTypes.oneOf(['capsule', 'square', 'dot']),
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    countStyle: Text.propTypes.style,
    maxCount: PropTypes.number
  };

  static defaultProps = {
    ...View.defaultProps,
    type: 'capsule',
    maxCount: 99
  };

  buildProps() {
    let {
      style,
      type,
      count,
      countStyle,
      maxCount,
      children,
      ...others
    } = this.props;

    let width,
      height,
      minWidth,
      borderRadius,
      borderWidth,
      padding;
    switch (type) {
      case 'capsule':
        height = AnterosTheme.badgeSize;
        minWidth = AnterosTheme.badgeSize;
        borderRadius = AnterosTheme.badgeSize / 2;
        borderWidth = AnterosTheme.badgeBorderWidth;
        padding = (count + '').length === 1
          ? 0
          : AnterosTheme.badgePadding;
        break;
      case 'square':
        height = AnterosTheme.badgeSize;
        minWidth = AnterosTheme.badgeSize;
        borderRadius = 2;
        borderWidth = AnterosTheme.badgeBorderWidth;
        padding = (count + '').length === 1
          ? 0
          : AnterosTheme.badgePadding;
        break;
      case 'dot':
        width = AnterosTheme.badgeDotSize;
        height = AnterosTheme.badgeDotSize;
        borderRadius = AnterosTheme.badgeDotSize / 2;
        borderWidth = 0;
        padding = 0;
        break;
    }

    style = [
      {
        backgroundColor: AnterosTheme.badgeColor,
        width: width,
        height: height,
        minWidth: minWidth,
        borderRadius: borderRadius,
        borderColor: AnterosTheme.badgeBorderColor,
        borderWidth: borderWidth,
        paddingLeft: padding,
        paddingRight: padding,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
      }
    ].concat(style);

    if (type === 'dot') 
      children = null;
    else if (count || count === 0) {
      countStyle = [
        {
          color: AnterosTheme.badgeTextColor,
          fontSize: AnterosTheme.badgeFontSize
        }
      ].concat(countStyle);
      children = (
        <Text style={countStyle} allowFontScaling={false} numberOfLines={1}>
          {count > maxCount
            ? maxCount + '+'
            : count}
        </Text>
      );
    }

    return {
      style,
      type,
      count,
      countStyle,
      maxCount,
      children,
      ...others
    };
  }

  shouldComponentUpdate=(nextProps, nextState) => {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const props = this.buildProps();
    return <View {...props}/>;
  }

}
