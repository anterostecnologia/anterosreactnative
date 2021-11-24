// AnterosListRow.js

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image } from 'react-native';

import { AnterosTheme } from '../../themes/AnterosTheme';
import { AnterosLabel } from '../Label/AnterosLabel';
import { AnterosSwipeTouchableOpacity } from './AnterosSwipeTouchableOpacity';
import { AnterosSwipeActionButton } from './AnterosSwipeActionButton';
import { AnterosIcon } from '../Icon/AnterosIcon';

export class AnterosListRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      swipeSts: 'none',
      swipeWidth: 0,
    }
  }


  static propTypes = {
    ...AnterosSwipeTouchableOpacity.propTypes,
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    detail: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    titleStyle: Text.propTypes.style,
    detailStyle: Text.propTypes.style,
    detailMultiLine: PropTypes.bool,
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({ uri: PropTypes.string }), PropTypes.number]),
    accessory: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({ uri: PropTypes.string }), PropTypes.number, PropTypes.oneOf(['none', 'auto', 'empty', 'check', 'indicator'])]),
    topSeparator: PropTypes.oneOfType([PropTypes.element, PropTypes.oneOf(['none', 'full', 'indent'])]),
    bottomSeparator: PropTypes.oneOfType([PropTypes.element, PropTypes.oneOf(['none', 'full', 'indent'])]),
    titlePlace: PropTypes.oneOf(['none', 'left', 'top']),
    swipeActions: PropTypes.arrayOf(PropTypes.element),
  };

  static defaultProps = {
    ...AnterosSwipeTouchableOpacity.defaultProps,
    activeOpacity: null,
    accessory: 'auto',
    topSeparator: 'none',
    bottomSeparator: 'indent',
    titlePlace: 'left',
  };

  static SwipeActionButton = AnterosSwipeActionButton;

  
  measureInWindow(callback) {
    this.refs.containerView && this.refs.containerView.measureInWindow(callback);
  }

  measure(callback) {
    this.refs.containerView && this.refs.containerView.measure(callback);
  }

  closeSwipeActions() {
    this.refs.containerView && this.refs.containerView.timingClose();
  }

  buildStyle() {
    let { style } = this.props;

    style = [{
      backgroundColor: AnterosTheme.rowColor,
      paddingLeft: AnterosTheme.rowPaddingLeft,
      paddingRight: AnterosTheme.rowPaddingRight,
      paddingTop: AnterosTheme.rowPaddingTop,
      paddingBottom: AnterosTheme.rowPaddingBottom,
      minHeight: AnterosTheme.rowMinHeight,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
    }].concat(style);

    return style;
  }

  renderSeparator(type) {
    let separatorStyle = {
      backgroundColor: AnterosTheme.rowSeparatorColor,
      height: AnterosTheme.rowSeparatorLineWidth,
    };
    let indentViewStyle = {
      backgroundColor: 'rgba(0,0,0,0)',
      paddingLeft: AnterosTheme.rowPaddingLeft,
    }
    switch (type) {
      case 'full': return <View style={separatorStyle} />;
      case 'indent': return <View style={indentViewStyle}><View style={separatorStyle} /></View>;
      default: return null;
    }
  }

  renderSwipeActionView() {
    let { swipeActions } = this.props;
    if (!(swipeActions instanceof Array) || swipeActions.length == 0) return null;

    let { swipeSts } = this.state;
    let swipeActionViewStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      opacity: swipeSts === 'none' ? 0 : 1,
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'flex-end',
    }
    return (
      <View
        style={swipeActionViewStyle}
        onLayout={e => this.setState({ swipeWidth: e.nativeEvent.layout.width })}
      >
        {swipeActions.map((item, index) => React.cloneElement(item, {
          key: item.key ? item.key : 'action' + index,
          onPress: () => {
            this.refs.containerView && this.refs.containerView.timingClose();
            item.props.onPress && item.props.onPress();
          }
        }))}
      </View>
    );
  }

  renderIcon() {
    let { icon, iconStyle, iconType, iconName, iconColor, iconSize} = this.props;

    if (iconName != undefined && iconType != undefined){
      icon = <AnterosIcon  iconStyle={iconStyle} type={iconType} name={iconName} color={iconColor} size={iconSize}/>;
    }

    if (icon === null || icon === undefined || React.isValidElement(icon)) return icon;
    return (
      <View style={{ paddingRight: AnterosTheme.rowIconPaddingRight }}>
        <Image style={{ width: AnterosTheme.rowIconWidth, height: TheAnterosThememe.rowIconHeight }} source={icon} />
      </View>
    );
  }

  renderAccessory(accessory = null) {
    if (!accessory) accessory = this.props.accessory;
    if (React.isValidElement(accessory)) return accessory;
    if (accessory === 'none' || (accessory === 'auto' && !this.props.onPress)) return null;

    let imageSource, tintColor;
    switch (accessory) {
      case 'empty':
        imageSource = require('../../assets/icons/empty.png');
        break;
      case 'check':
        imageSource = require('../../assets/icons/check.png');
        tintColor = AnterosTheme.rowAccessoryCheckColor;
        break;
      case 'indicator':
      case 'auto':
        imageSource = require('../../assets/icons/indicator.png');
        tintColor = AnterosTheme.rowAccessoryIndicatorColor;
        break;
      default: imageSource = accessory;
    }
    let imageStyle = {
      width: AnterosTheme.rowAccessoryWidth,
      height: AnterosTheme.rowAccessoryHeight,
      tintColor,
    };
    return (
      <View style={{ paddingLeft: AnterosTheme.rowAccessoryPaddingLeft }}>
        <Image style={imageStyle} source={imageSource} />
      </View>
    );
  }

  renderTitle() {
    let { title, detail, titleStyle, titlePlace } = this.props;
    if (titlePlace === 'none') return null;
    if (typeof title === 'string' || typeof title === 'number') {
      let textStyle = (!detail && titlePlace === 'left') ? { flexGrow: 1, flexShrink: 1 } : null;
      return <AnterosLabel style={[textStyle, titleStyle]} type='title' text={title} />;
    }
    return title;
  }

  renderDetail() {
    let { title, detail, detailStyle, detailMultiLine, titlePlace } = this.props;
    if (typeof detail === 'string' || typeof detail === 'number') {
      let textStyle = titlePlace === 'top' ? { lineHeight: AnterosTheme.rowDetailLineHeight, color: AnterosTheme.labelTextColor } : { flexGrow: 1, flexShrink: 1, textAlign: 'right' };
      if (title) {
        if (titlePlace === 'left') textStyle.paddingLeft = AnterosTheme.rowPaddingTitleDetail;
        else textStyle.paddingTop = AnterosTheme.rowPaddingTitleDetail;
      }
      if (!detailMultiLine && detailMultiLine !== false) {
        detailMultiLine = titlePlace === 'top';
      }
      return <AnterosLabel style={[textStyle, detailStyle]} type='detail' text={detail} numberOfLines={detailMultiLine ? 0 : 1} />;
    }
    return detail;
  }

  renderContent() {
    let { titlePlace, children } = this.props;
    let title = this.renderTitle();
    let detail = this.renderDetail();
    if (!title && !detail) return children;

    let contentStyle = {
      flex: 1,
      overflow: 'hidden',
      flexDirection: titlePlace === 'top' ? 'column' : 'row',
      alignItems: titlePlace === 'top' ? 'stretch' : 'center',
      justifyContent: 'space-between',
    };
    return (
      <View style={contentStyle}>
        {title}
        {detail}
      </View>
    );
  }

  render() {
    let { style, children, title, detail, titleStyle, detailStyle, detailMultiLine, icon, accessory, topSeparator, bottomSeparator, titlePlace, swipeActions, activeOpacity, onLayout, onPress, ...others } = this.props;
      
    return (
      <View onLayout={onLayout}>
        {this.renderSeparator(topSeparator)}
        {this.renderSwipeActionView()}
        <AnterosSwipeTouchableOpacity
          {...others}
          style={this.buildStyle()}
          activeOpacity={(!activeOpacity && activeOpacity !== 0) ? (onPress ? 0.2 : 1) : activeOpacity}
          swipeable={swipeActions instanceof Array && swipeActions.length > 0}
          swipeWidth={this.state.swipeWidth}
          onPress={onPress}
          onSwipeStsChange={swipeSts => this.setState({ swipeSts })}
          ref='containerView'
        >
          {this.renderIcon()}
          {this.renderContent()}
          {this.renderAccessory()}
        </AnterosSwipeTouchableOpacity>
        {this.renderSeparator(bottomSeparator)}
      </View>
    );
  }

}