// AnterosCheckbox.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {AnterosLocalDatasource, AnterosRemoteDatasource, dataSourceEvents} from "../Datasource/AnterosDatasource";

import AnterosTheme from '../../themes/AnterosTheme';

export class AnterosCheckbox extends TouchableOpacity {

  static propTypes = {
    ...TouchableOpacity.propTypes,
    dataSource: PropTypes.oneOfType([
      PropTypes.instanceOf(AnterosLocalDatasource),
      PropTypes.instanceOf(AnterosRemoteDatasource)
    ]),
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    size: PropTypes.oneOf(['lg', 'md', 'sm']),
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    titleStyle: Text.propTypes.style,
    checkedIcon: PropTypes.oneOfType([
      PropTypes.element, PropTypes.shape({uri: PropTypes.string}),
      PropTypes.number
    ]),
    checkedIconStyle: Image.propTypes.style,
    uncheckedIcon: PropTypes.oneOfType([
      PropTypes.element, PropTypes.shape({uri: PropTypes.string}),
      PropTypes.number
    ]),
    uncheckedIconStyle: Image.propTypes.style,
    onChange: PropTypes.func
  };

  static defaultProps = {
    ...TouchableOpacity.defaultProps,
    defaultChecked: false,
    size: 'md',
    checkedIcon: require('../../assets/icons/checked.png'),
    uncheckedIcon: require('../../assets/icons/unchecked.png'),
    hitSlop: {
      top: 8,
      bottom: 8,
      left: 8,
      right: 8
    }
  };

  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, {
      checked: props.checked === true || props.checked === false
        ? props.checked
        : props.defaultChecked
    });

    if(this.props.dataSource){
      this.state.checked = this.props.dataSource.fieldByName(this.props.dataField)
      if(!this.props.dataSource.fieldByName(this.props.dataField)){
        this.props.dataSource.setFieldByName(this.props.dataField,false)
    }
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked === true || nextProps.checked === false) {
      if (nextProps.checked != this.state.checked) {
        this.setState({checked: nextProps.checked});
      }
    }
  }

  onChangeChecked = (checked) => {
    
    if(this.props.dataSource){
      this.props.dataSource.setFieldByName(this.props.dataField,checked)
    }

    this.setState({checked})

  }

  buildProps() {
    let {
      style,
      size,
      title,
      checkedIcon,
      uncheckedIcon,
      titleStyle,
      checkedIconStyle,
      uncheckedIconStyle,
      children,
      onPress,
      onChange,
      ...others
    } = this.props;
    let {checked} = this.state;

    

    let iconSize,
      textFontSize,
      textPaddingLeft;
    switch (size) {
      case 'lg':
        iconSize = AnterosTheme.cbIconSizeLG;
        textFontSize = AnterosTheme.cbFontSizeLG;
        textPaddingLeft = AnterosTheme.cbTitlePaddingLeftLG;
        break;
      case 'sm':
        iconSize = AnterosTheme.cbIconSizeSM;
        textFontSize = AnterosTheme.cbFontSizeSM;
        textPaddingLeft = AnterosTheme.cbTitlePaddingLeftSM;
        break;
      default:
        iconSize = AnterosTheme.cbIconSizeMD;
        textFontSize = AnterosTheme.cbFontSizeMD;
        textPaddingLeft = AnterosTheme.cbTitlePaddingLeftMD;
    }

    style = [
      {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center'
      }
    ].concat(style);
    let iconStyle = [
      {
        tintColor: checked
          ? AnterosTheme.cbCheckedTintColor
          : AnterosTheme.cbUncheckedTintColor,
        width: iconSize,
        height: iconSize
      }
    ].concat(checked
      ? checkedIconStyle
      : uncheckedIconStyle);
    let textStyle = [
      {
        color: AnterosTheme.cbTitleColor,
        fontSize: textFontSize,
        overflow: 'hidden',
        paddingLeft: textPaddingLeft
      }
    ].concat(titleStyle);

    if (React.isValidElement(checkedIcon)) {
      checkedIcon = React.cloneElement(checkedIcon, {key: 'icon'});
    } else if (checkedIcon || checkedIcon === 0) {
      checkedIcon = <Image key='icon' style={iconStyle} source={checkedIcon}/>;
    }
    if (React.isValidElement(uncheckedIcon)) {
      uncheckedIcon = React.cloneElement(uncheckedIcon, {key: 'icon'});
    } else if (uncheckedIcon || uncheckedIcon === 0) {
      uncheckedIcon = <Image key='icon' style={iconStyle} source={uncheckedIcon}/>;
    }
    if (React.isValidElement(title)) {
      title = React.cloneElement(title, {key: 'title'});
    } else if ((title || title === '' || title === 0)) {
      title = (
        <Text key='title' style={textStyle} numberOfLines={1}>
          {title}
        </Text>
      );
    }

    children = [
      checked
        ? checkedIcon
        : uncheckedIcon,
      title
        ? title
        : null
    ];

    onPress = () => {
      this.setState({
        checked: !checked
      });
      onChange && onChange(!checked);
    };

    onChange = this.props.onChange ? this.props.onChange : this.onChangeChecked

    this.props = {
      style,
      size,
      title,
      checkedIcon,
      uncheckedIcon,
      titleStyle,
      checkedIconStyle,
      uncheckedIconStyle,
      children,
      onPress,
      onChange,
      ...others
    };
  }

  render() {
    this.buildProps();

    if (this.props.disabled) {
      return (
        <View style={{
          opacity: AnterosTheme.cbDisabledOpacity
        }}>
          {super.render()}
        </View>
      );
    } else {
      return super.render();
    }
  }
}
