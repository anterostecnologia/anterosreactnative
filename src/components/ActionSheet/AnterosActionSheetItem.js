// ActionSheetItem.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import AnterosTheme from '../../themes/AnterosTheme';

export default class AnterosActionSheetItem extends Component {

  static propTypes = {
    ...TouchableOpacity.propTypes,
    type: PropTypes.oneOf(['default', 'cancel']),
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    topSeparator: PropTypes.oneOfType([
      PropTypes.element, PropTypes.oneOf(['none', 'full', 'indent'])
    ]),
    bottomSeparator: PropTypes.oneOfType([
      PropTypes.element, PropTypes.oneOf(['none', 'full', 'indent'])
    ]),
    disabled: PropTypes.bool
  };

  static defaultProps = {
    ...TouchableOpacity.defaultProps,
    type: 'default',
    topSeparator: 'none',
    bottomSeparator: 'none',
    disabled: false
  };

  buildProps() {
    let {
      style,
      type,
      title,
      topSeparator,
      bottomSeparator,
      disabled,
      activeOpacity,
      onPress,
      ...others
    } = this.props;

    style = [
      {
        backgroundColor: type === 'cancel'
          ? AnterosTheme.asCancelItemColor
          : AnterosTheme.asItemColor,
        paddingLeft: AnterosTheme.asItemPaddingLeft,
        paddingRight: AnterosTheme.asItemPaddingRight,
        paddingTop: AnterosTheme.asItemPaddingTop,
        paddingBottom: AnterosTheme.asItemPaddingBottom,
        minHeight: AnterosTheme.asItemMinHeight,
        overflow: 'hidden',
        justifyContent: 'center'
      }
    ].concat(style);

    let textStyle,
      separatorStyle;
    if (type === 'cancel') {
      textStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: AnterosTheme.asCancelItemTitleColor,
        fontSize: AnterosTheme.asCancelItemFontSize,
        textAlign: AnterosTheme.asCancelItemTitleAlign,
        opacity: disabled
          ? AnterosTheme.asItemDisabledOpacity
          : 1,
        overflow: 'hidden'
      };
      separatorStyle = {
        backgroundColor: AnterosTheme.asCancelItemSeparatorColor,
        height: AnterosTheme.asCancelItemSeparatorLineWidth
      }
    } else {
      textStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: AnterosTheme.asItemTitleColor,
        fontSize: AnterosTheme.asItemFontSize,
        textAlign: AnterosTheme.asItemTitleAlign,
        opacity: disabled
          ? AnterosTheme.asItemDisabledOpacity
          : 1,
        overflow: 'hidden'
      };
      separatorStyle = {
        backgroundColor: AnterosTheme.asItemSeparatorColor,
        height: AnterosTheme.asItemSeparatorLineWidth
      }
    }

    if ((title || title === '' || title === 0) && !React.isValidElement(title)) {
      title = <Text style={textStyle} numberOfLines={1}>{title}</Text>;
    }

    let indentViewStyle = {
      backgroundColor: StyleSheet
        .flatten(style)
        .backgroundColor,
      paddingLeft: AnterosTheme.asItemPaddingLeft
    }
    switch (topSeparator) {
      case 'none':
        topSeparator = null;
        break;
      case 'full':
        topSeparator = <View style={separatorStyle}/>;
        break;
      case 'indent':
        topSeparator = (
          <View style={indentViewStyle}>
            <View style={separatorStyle}/>
          </View>
        );
        break;
    }
    switch (bottomSeparator) {
      case 'none':
        bottomSeparator = null;
        break;
      case 'full':
        bottomSeparator = <View style={separatorStyle}/>;
        break;
      case 'indent':
        bottomSeparator = (
          <View style={indentViewStyle}>
            <View style={separatorStyle}/>
          </View>
        );
        break;
    }

    if (disabled) 
      activeOpacity = 1;
    
    this.props = {
      style,
      type,
      title,
      topSeparator,
      bottomSeparator,
      disabled,
      activeOpacity,
      onPress,
      ...others
    };
  }

  render() {
    this.buildProps();

    let {
      style,
      title,
      topSeparator,
      bottomSeparator,
      ...others
    } = this.props;
    return (
      <View style={{
        backgroundColor: 'rgba(0, 0, 0, 0)'
      }}>
        {topSeparator}
        <TouchableOpacity style={style} {...others}>
          {title}
        </TouchableOpacity>
        {bottomSeparator}
      </View>
    );
  }

}
