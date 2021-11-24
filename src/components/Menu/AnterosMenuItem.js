// AnterosMenuItem.js

'use strict';

import React,{Component} from "react";
import PropTypes from 'prop-types';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import shallowCompare from "react-addons-shallow-compare";
import {AnterosTheme} from '../../themes/AnterosTheme';

export class AnterosMenuItem extends Component {

  static propTypes = {
    ...TouchableOpacity.propTypes,
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    icon: PropTypes.oneOfType([
      PropTypes.element, PropTypes.shape({uri: PropTypes.string}),
      PropTypes.number,
      PropTypes.oneOf(['none', 'empty'])
    ])
  };

  static defaultProps = {
    ...TouchableOpacity.defaultProps,
    icon: 'none'
  };

  buildProps() {
    let {
      style,
      title,
      icon,
      ...others
    } = this.props;

    style = [
      {
        backgroundColor: AnterosTheme.menuItemColor,
        paddingLeft: AnterosTheme.menuItemPaddingLeft,
        paddingRight: AnterosTheme.menuItemPaddingRight,
        paddingTop: AnterosTheme.menuItemPaddingTop,
        paddingBottom: AnterosTheme.menuItemPaddingBottom,
        borderColor: AnterosTheme.menuItemSeparatorColor,
        borderTopWidth: AnterosTheme.menuItemSeparatorWidth,
        flexDirection: 'row',
        alignItems: 'center'
      }
    ].concat(style);

    if (icon === 'none') 
      icon = null;
    if (icon && !React.isValidElement(icon)) {
      let imageStyle = {
        width: AnterosTheme.menuItemIconWidth,
        height: AnterosTheme.menuItemIconHeight,
        tintColor: AnterosTheme.menuItemIconColor
      };
      icon = (
        <View
          style={{
          paddingRight: AnterosTheme.menuItemIconPaddingRight
        }}>
          <Image
            style={imageStyle}
            source={icon === 'empty'
            ? null
            : icon}/>
        </View>
      );
    }

    if (typeof title === 'string' || typeof title === 'number') {
      let titleStyle = {
        color: AnterosTheme.menuItemTitleColor,
        fontSize: AnterosTheme.menuItemFontSize,
        overflow: 'hidden',
        flexGrow: 1,
        flexShrink: 1
      };
      title = <Text style={titleStyle} numberOfLines={1}>{title}</Text>
    }

    this.props = {
      style,
      title,
      icon,
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
      icon,
      ...others
    } = props;
    return (
      <TouchableOpacity {...others}>
        {icon}
        {title}
      </TouchableOpacity>
    );
  }
}
