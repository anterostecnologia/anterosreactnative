// PopoverPickerItem.js

'use strict';

import React,{Component} from "react";
import PropTypes from 'prop-types';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import shallowCompare from "react-addons-shallow-compare";
import {AnterosTheme} from '../../themes/AnterosTheme';

export class AnterosPopoverPickerItem extends Component {

  static propTypes = {
    ...TouchableOpacity.propTypes,
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    selected: PropTypes.bool
  };

  buildProps() {
    let {
      style,
      title,
      accessory,
      selected,
      ...others
    } = this.props;

    style = [
      {
        backgroundColor: AnterosTheme.poppItemColor,
        paddingLeft: AnterosTheme.poppItemPaddingLeft,
        paddingRight: AnterosTheme.poppItemPaddingRight,
        paddingTop: AnterosTheme.poppItemPaddingTop,
        paddingBottom: AnterosTheme.poppItemPaddingBottom,
        borderColor: AnterosTheme.poppItemSeparatorColor,
        borderBottomWidth: AnterosTheme.poppItemSeparatorWidth,
        flexDirection: 'row',
        alignItems: 'center'
      }
    ].concat(style);
    let imageStyle = {
      width: AnterosTheme.poppAccessoryWidth,
      height: AnterosTheme.poppAccessoryHeight,
      tintColor: AnterosTheme.poppAccessoryCheckColor
    };
    accessory = (
      <View
        style={{
        paddingLeft: AnterosTheme.poppAccessoryPaddingLeft
      }}>
        <Image
          style={imageStyle}
          source={selected
          ? require('../../assets/icons/check.png')
          : null}/>
      </View>
    );
    if (typeof title === 'string' || typeof title === 'number') {
      let titleStyle = {
        color: AnterosTheme.poppItemTitleColor,
        fontSize: AnterosTheme.poppItemFontSize,
        overflow: 'hidden',
        flexGrow: 1,
        flexShrink: 1
      };
      title = <Text style={titleStyle} numberOfLines={1}>{title}</Text>
    }

    return {
      style,
      title,
      accessory,
      selected,
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
      accessory,
      ...others
    } = props;
    return (
      <TouchableOpacity {...others}>
        {title}
        {accessory}
      </TouchableOpacity>
    );
  }
}
