// AnterosActionPopoverView.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {View, ScrollView} from 'react-native';

import AnterosTheme from '../../themes/AnterosTheme';
import AnterosOverlay from '../Overlay/AnterosOverlay';
import AnterosActionPopoverItem from './AnterosActionPopoverItem';

export default class AnterosActionPopoverView extends AnterosOverlay.PopoverView {

  static propTypes = {
    ...AnterosOverlay.PopoverView.propTypes,
    items: PropTypes
      .arrayOf(PropTypes.shape({title: PropTypes.string, onPress: PropTypes.func}))
      .isRequired
  };

  static defaultProps = {
    ...AnterosOverlay.PopoverView.defaultProps,
    direction: 'up',
    align: 'center',
    showArrow: true
  };

  static Item = AnterosActionPopoverItem;

  onItemPress(item) {
    this.close(false);
    item.onPress && item.onPress();
  }

  buildProps() {
    let {
      popoverStyle,
      directionInsets,
      items,
      children,
      ...others
    } = this.props;

    popoverStyle = [
      {
        backgroundColor: AnterosTheme.apColor,
        paddingVertical: AnterosTheme.apPaddingVertical,
        paddingHorizontal: AnterosTheme.apPaddingHorizontal,
        borderRadius: AnterosTheme.apBorderRadius,
        flexDirection: 'row'
      }
    ].concat(popoverStyle);

    if (!directionInsets && directionInsets !== 0) {
      directionInsets = AnterosTheme.apDirectionInsets;
    }

    children = [];
    for (let i = 0; items && i < items.length; ++i) {
      let item = items[i];
      children.push(<this.constructor.Item
        key={'item' + i}
        title={item.title}
        leftSeparator={i !== 0}
        onPress={() => this.onItemPress(item)}/>);
    }

    this.props = {
      popoverStyle,
      directionInsets,
      items,
      children,
      ...others
    };

    super.buildProps();
  }
}
