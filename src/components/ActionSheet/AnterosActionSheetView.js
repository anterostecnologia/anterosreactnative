// ActionSheetView.js

'use strict';

import React,{Component} from "react";
import PropTypes from 'prop-types';
import {View} from 'react-native';

import {AnterosTheme} from '../../themes/AnterosTheme';
import {AnterosOverlay} from '../Overlay/AnterosOverlay';
import {AnterosActionSheetItem} from './AnterosActionSheetItem';

export class AnterosActionSheetView extends AnterosOverlay.PullView {

  static propTypes = {
    ...AnterosOverlay.PullView.propTypes,
    items: PropTypes.arrayOf(PropTypes.shape({title: PropTypes.string.isRequired, onPress: PropTypes.func, disabled: PropTypes.bool})),
    cancelItem: PropTypes.shape({title: PropTypes.string.isRequired, onPress: PropTypes.func, disabled: PropTypes.bool})
  };

  static Item = AnterosActionSheetItem;

  disappearCompleted() {
    super.disappearCompleted();
    this.pressItem && this.pressItem.onPress && this
      .pressItem
      .onPress();
  }

  onItemPress(item) {
    if (item && item.disabled) 
      return;
    this.pressItem = item;
    this.close(false);
  }

  onCancelItemPress() {
    let {cancelItem} = this.props;
    if (cancelItem && cancelItem.disabled) 
      return;
    this.pressItem = cancelItem;
    this.close(true);
  }

  buildProps() {
    super.buildProps();

    let {
      items,
      cancelItem,
      children,
      ...others
    } = this.props;

    children = [];
    for (let i = 0; items && i < items.length; ++i) {
      let item = items[i];
      children.push(<this.constructor.Item
        key={'item' + i}
        title={item.title}
        topSeparator={i === 0
        ? 'none'
        : 'full'}
        disabled={item.disabled}
        onPress={() => this.onItemPress(item)}/>);
    }
    if (cancelItem) {
      children.push(<this.constructor.Item
        key={'cancelItem'}
        type='cancel'
        title={cancelItem.title}
        topSeparator='full'
        disabled={cancelItem.disabled}
        onPress={() => this.onCancelItemPress()}/>);
    }
    children.push(<View
      style={{
      backgroundColor: cancelItem
        ? AnterosTheme.asCancelItemColor
        : AnterosTheme.asItemColor,
      height: AnterosTheme.screenInset.bottom
    }}
      key={'bottomSpace'}/>);

    this.props = {
      items,
      cancelItem,
      children,
      ...others
    };
  }

}
