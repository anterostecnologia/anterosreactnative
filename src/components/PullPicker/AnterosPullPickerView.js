// AnterosPullPickerView.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {View, ScrollView} from 'react-native';

import AnterosTheme from '../../themes/AnterosTheme';
import AnterosOverlay from '../Overlay/AnterosOverlay';
import AnterosLabel from '../Label/AnterosLabel';
import AnterosPullPickerItem from './AnterosPullPickerItem';

export default class AnterosPullPickerView extends AnterosOverlay.PullView {

  static propTypes = {
    ...AnterosOverlay.PullView.propTypes,
    title: PropTypes.string,
    items: PropTypes.array.isRequired,
    selectedIndex: PropTypes.number,
    getItemText: PropTypes.func, //(item, index) return display text of item, item=items[index], use item when it's null
    onSelected: PropTypes.func, //(item, index)
  };

  static Item = AnterosPullPickerItem;

  onItemPress(itemIndex) {
    let {items, onSelected} = this.props;
    this.close(false);
    onSelected && onSelected(items[itemIndex], itemIndex);
  }

  buildProps() {
    super.buildProps();

    let {
      title,
      items,
      selectedIndex,
      getItemText,
      children,
      ...others
    } = this.props;

    let headerRowStyle = {
      backgroundColor: AnterosTheme.pupHeaderColor,
      paddingLeft: AnterosTheme.pupHeaderPaddingLeft,
      paddingRight: AnterosTheme.pupHeaderPaddingRight,
      paddingTop: AnterosTheme.pupHeaderPaddingTop,
      paddingBottom: AnterosTheme.pupHeaderPaddingBottom
    };
    let headerTextStyle = {
      color: AnterosTheme.pupHeaderTitleColor,
      fontSize: AnterosTheme.pupHeaderFontSize,
      fontWeight: AnterosTheme.pupHeaderFontWeight
    }
    let headerSeparatorStyle = {
      backgroundColor: AnterosTheme.pupHeaderSeparatorColor,
      height: AnterosTheme.pupHeaderSeparatorHeight
    }
    let {left: leftInset, right: rightInset} = AnterosTheme.screenInset;
    children = (
      <View
        style={{
        backgroundColor: AnterosTheme.pupColor,
        maxHeight: AnterosTheme.pupMaxHeight,
        paddingLeft: leftInset,
        paddingRight: rightInset
      }}>
        {!title
          ? null
          : <View style={headerRowStyle}>
            <AnterosLabel style={headerTextStyle} text={title}/>
          </View>
}
        {!title
          ? null
          : <View style={headerSeparatorStyle}/>}
        <ScrollView
          style={{
          backgroundColor: AnterosTheme.pupColor,
          flexGrow: 1
        }}>
          {items && items.map((item, index) => (
            <this.constructor.Item
              key={'item' + index}
              style={{
              backgroundColor: AnterosTheme.pupItemColor
            }}
              title={getItemText
              ? getItemText(item, index)
              : item}
              selected={index === selectedIndex}
              bottomSeparator={< View style = {{backgroundColor: AnterosTheme.pupSeparatorColor, height: AnterosTheme.rowSeparatorLineWidth}}/>}
              onPress={() => this.onItemPress(index)}/>
          ))}
          <View
            style={{
            height: AnterosTheme.screenInset.bottom
          }}/>
        </ScrollView>
      </View>
    );

    this.props = {
      title,
      items,
      selectedIndex,
      getItemText,
      children,
      ...others
    };
  }

}
