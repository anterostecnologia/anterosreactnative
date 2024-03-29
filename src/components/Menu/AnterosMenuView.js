// MenuView.js

'use strict';

import React,{Component} from "react";
import PropTypes from 'prop-types';
import {View, ScrollView} from 'react-native';

import {AnterosTheme} from '../../themes/AnterosTheme';
import {AnterosOverlay} from '../Overlay/AnterosOverlay';
import {AnterosMenuItem} from './AnterosMenuItem';

export class AnterosMenuView extends AnterosOverlay.PopoverView {

  static propTypes = {
    ...AnterosOverlay.PopoverView.propTypes,
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      icon: PropTypes.oneOfType([
        PropTypes.element, PropTypes.shape({uri: PropTypes.string}),
        PropTypes.number,
        PropTypes.oneOf(['none', 'empty'])
      ]),
      onPress: PropTypes.func
    })).isRequired,
    shadow: PropTypes.bool
  };

  static defaultProps = {
    ...AnterosOverlay.PopoverView.defaultProps,
    direction: 'down',
    align: 'center',
    showArrow: false,
    shadow: true
  };

  static Item = AnterosMenuItem;

  onItemPress(item) {
    this.close(false);
    item.onPress && item.onPress();
  }

  buildProps() {
    let {
      popoverStyle,
      directionInsets,
      shadow,
      items,
      children,
      ...others
    } = this.props;

    let menuStyle = {
      backgroundColor: AnterosTheme.menuColor
    };
    if (shadow) {
      Object.assign(menuStyle, {
        shadowColor: AnterosTheme.menuShadowColor,
        shadowOffset: {
          width: 1,
          height: 1
        },
        shadowOpacity: 0.5,
        shadowRadius: 2
      });
    }
    popoverStyle = [menuStyle].concat(popoverStyle);

    if (!directionInsets && directionInsets !== 0) {
      directionInsets = AnterosTheme.menuDirectionInsets;
    }

    let iconDefault = 'none';
    for (let item of items) {
      if (item.icon) {
        iconDefault = 'empty';
        break;
      }
    }
    children = [];
    for (let i = 0; items && i < items.length; ++i) {
      let item = items[i];
      let {title, icon} = item;
      let style = i === 0
        ? {
          borderTopWidth: 0
        }
        : null;
      children.push(<this.constructor.Item
        key={'item' + i}
        style={style}
        title={title}
        icon={icon
        ? icon
        : iconDefault}
        onPress={() => this.onItemPress(item)}/>);
    }

    this.props = {
      popoverStyle,
      directionInsets,
      shadow,
      items,
      children,
      ...others
    };

    super.buildProps();
  }

}
