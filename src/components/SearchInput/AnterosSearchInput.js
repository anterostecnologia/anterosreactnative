// SearchInput.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  LayoutAnimation,
  ViewPropTypes
} from 'react-native';
import shallowCompare from "react-addons-shallow-compare";
import {AnterosTheme} from '../../themes/AnterosTheme';

export class AnterosSearchInput extends Component {

  static propTypes = {
    ...TextInput.propTypes,
    style: ViewPropTypes.style,
    inputStyle: TextInput.propTypes.style,
    iconSize: PropTypes.number,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    ...TextInput.defaultProps,
    disabled: false,
    underlineColorAndroid: 'rgba(0, 0, 0, 0)'
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value === undefined
        ? props.defaultValue
        : props.value,
      editing: false,
      width: null,
      placeholderWidth: null,
      selectionColor: null
    };
  }

  UNSAFE_componentWillUpdate(props, state) {
    if (state.editing !== this.state.editing) {
      LayoutAnimation.configureNext({
        duration: 500,
        create: {
          duration: 300,
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity
        },
        update: {
          type: LayoutAnimation.Types.spring,
          springDamping: 200
        }
      });
    }
  }

  focus() {
    return this.refs.textInput && this
      .refs
      .textInput
      .focus();
  }

  blur() {
    return this.refs.textInput && this
      .refs
      .textInput
      .blur();
  }

  isFocused() {
    return this.refs.textInput && this
      .refs
      .textInput
      .isFocused();
  }

  clear() {
    return this.refs.textInput && this
      .refs
      .textInput
      .clear();
  }

  buildProps() {
    let {
      style,
      inputStyle,
      iconSize,
      disabled,
      placeholderTextColor,
      pointerEvents,
      ...others
    } = this.props;

    style = [
      {
        backgroundColor: AnterosTheme.siColor,
        borderColor: AnterosTheme.siBorderColor,
        borderWidth: AnterosTheme.siBorderWidth,
        borderRadius: AnterosTheme.siBorderRadius
      }
    ].concat(style);
    if (disabled) 
      style = style.concat({opacity: AnterosTheme.siDisabledOpacity})

    let height = StyleSheet
      .flatten(style)
      .height;
    inputStyle = [
      {
          color: AnterosTheme.siTextColor,
          fontSize: AnterosTheme.siFontSize,
          height: height
            ? height
            : AnterosTheme.siHeight,
          paddingVertical: AnterosTheme.siPaddingVertical,
          paddingHorizontal: AnterosTheme.siPaddingHorizontal
        }
      ]
      .concat(inputStyle)
      .concat({backgroundColor: 'rgba(0, 0, 0, 0)'});

    if (!iconSize && iconSize !== 0) 
      iconSize = AnterosTheme.siIconSize;
    
    if (!placeholderTextColor) 
      placeholderTextColor = AnterosTheme.siPlaceholderTextColor;
    
    if (disabled) 
      pointerEvents = 'none';
    
    return {
      style,
      inputStyle,
      iconSize,
      disabled,
      placeholderTextColor,
      pointerEvents,
      ...others
    };
  }

  onContainerLayout(e) {
    this.setState({width: e.nativeEvent.layout.width});
  }

  onPlaceholderLayout(e) {
    this.setState({placeholderWidth: e.nativeEvent.layout.width});
  }

  onInputFocus() {
    this.setState({editing: true, selectionColor: 'rgba(0, 0, 0, 0)'});
    this.props.onFocus && this
      .props
      .onFocus();
    setTimeout(() => this.setState({selectionColor: null}), 500);
  }

  onInputBlur() {
    this.setState({editing: false});
    this.props.onBlur && this
      .props
      .onBlur();
  }

  onChangeText(text) {
    this.setState({value: text});
    this.props.onChangeText && this
      .props
      .onChangeText(text);
  }

  shouldComponentUpdate=(nextProps, nextState) => {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const props = this.buildProps();

    let {
      style,
      value,
      inputStyle,
      iconSize,
      placeholder,
      placeholderTextColor,
      selectionColor,
      pointerEvents,
      onBlur,
      onFocus,
      onChangeText,
      ...others
    } = props;

    if (value === undefined) 
      value = this.state.value;
    
    let paddingSize;
    let fs = StyleSheet.flatten(inputStyle);
    if (fs.paddingLeft || fs.paddingLeft === 0) 
      paddingSize = fs.paddingLeft;
    else if (fs.paddingHorizontal || fs.paddingHorizontal === 0) 
      paddingSize = fs.paddingHorizontal;
    else if (fs.padding || fs.padding === 0) 
      paddingSize = fs.padding;
    else 
      paddingSize = 0;
    
    return (
      <View style={style} pointerEvents={pointerEvents}>
        <View style={styles.container} onLayout={e => this.onContainerLayout(e)}>
          <View
            style={this.state.editing || value
            ? {
              width: this.state.width
            }
            : null}>
            <View
              style={styles.placeholderContainer}
              onLayout={e => this.onPlaceholderLayout(e)}>
              <View
                style={{
                paddingLeft: iconSize * 0.5,
                alignItems: 'center'
              }}>
                <Image
                  style={{
                  width: iconSize,
                  height: iconSize,
                  tintColor: placeholderTextColor
                }}
                  source={require('../../assets/icons/search.png')}/>
              </View>
              <Text
                style={{
                paddingLeft: paddingSize,
                color: placeholderTextColor,
                fontSize: fs.fontSize
              }}>
                {value
                  ? null
                  : placeholder}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
          backgroundColor: 'rgba(0, 0, 0, 0)',
          paddingLeft: iconSize * 1.5
        }}>
          <TextInput
            style={inputStyle}
            value={value}
            onBlur={() => this.onInputBlur()}
            onFocus={() => this.onInputFocus()}
            onChangeText={text => this.onChangeText(text)}
            selectionColor={this.state.selectionColor
            ? this.state.selectionColor
            : selectionColor}
            {...others}
            ref='textInput'/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholderContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
