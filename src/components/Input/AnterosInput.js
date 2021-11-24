// AnterosInput.js

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import { AnterosLocalDatasource, AnterosRemoteDatasource, dataSourceEvents } from "../Datasource/AnterosDatasource";
import shallowCompare from "react-addons-shallow-compare";
import { AnterosTheme } from '../../themes/AnterosTheme';

class AnterosInput extends Component {

  constructor(props) {
    super(props);


    if (this.props.dataSource) {

      let value = this
        .props
        .dataSource
        .fieldByName(this.props.dataField);
      if (!value) {
        value = '';
      }
      this.state = {
        value: value
      };
    } else {
      this.state = {
        value: this.props.value
      };
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource) {
      let value = nextProps
        .dataSource
        .fieldByName(nextProps.dataField);
      if (!value) {
        value = '';
      }
      this.setState({ value: value });
    } else {
      this.setState({ value: nextProps.value });
    }
  }

  componentDidMount() {

    if (this.props.dataSource) {
      this
        .props
        .dataSource
        .addEventListener([
          dataSourceEvents.AFTER_CLOSE, dataSourceEvents.AFTER_OPEN, dataSourceEvents.AFTER_GOTO_PAGE, dataSourceEvents.AFTER_CANCEL, dataSourceEvents.AFTER_SCROLL
        ], this.onDatasourceEvent);
      this
        .props
        .dataSource
        .addEventListener(dataSourceEvents.DATA_FIELD_CHANGED, this.onDatasourceEvent, this.props.dataField);
    }
  }

  componentWillUnmount() {
    if ((this.props.dataSource)) {
      this
        .props
        .dataSource
        .removeEventListener([
          dataSourceEvents.AFTER_CLOSE, dataSourceEvents.AFTER_OPEN, dataSourceEvents.AFTER_GOTO_PAGE, dataSourceEvents.AFTER_CANCEL, dataSourceEvents.AFTER_SCROLL
        ], this.onDatasourceEvent);
      this
        .props
        .dataSource
        .removeEventListener(dataSourceEvents.DATA_FIELD_CHANGED, this.onDatasourceEvent, this.props.dataField);
    }
  }

  onDatasourceEvent = (event, error) => {
    let value = this
      .props
      .dataSource
      .fieldByName(this.props.dataField);
    if (!value) {
      value = '';
    }
    this.setState({ value: value });
  }

  handleChange = (valor) => {
    if (this.props.dataSource) {
      this
        .props
        .dataSource
        .setFieldByName(this.props.dataField, valor);
    } else {
      this.setState({ value: valor });
    }
  }


  buildProps() {
    let {
      style,
      size,
      disabled,
      placeholderTextColor,
      pointerEvents,
      opacity,
      ...others
    } = this.props;

    let borderRadius,
      fontSize,
      paddingVertical,
      paddingHorizontal,
      height;
    switch (size) {
      case 'lg':
        borderRadius = AnterosTheme.inputBorderRadiusLG;
        fontSize = AnterosTheme.inputFontSizeLG;
        paddingVertical = AnterosTheme.inputPaddingVerticalLG;
        paddingHorizontal = AnterosTheme.inputPaddingHorizontalLG;
        height = AnterosTheme.inputHeightLG;
        break;
      case 'sm':
        borderRadius = AnterosTheme.inputBorderRadiusSM;
        fontSize = AnterosTheme.inputFontSizeSM;
        paddingVertical = AnterosTheme.inputPaddingVerticalSM;
        paddingHorizontal = AnterosTheme.inputPaddingHorizontalSM;
        height = AnterosTheme.inputHeightSM;
        break;
      default:
        borderRadius = AnterosTheme.inputBorderRadiusMD;
        fontSize = AnterosTheme.inputFontSizeMD;
        paddingVertical = AnterosTheme.inputPaddingVerticalMD;
        paddingHorizontal = AnterosTheme.inputPaddingHorizontalMD;
        height = AnterosTheme.inputHeightMD;
    }
    style = [
      {
        backgroundColor: AnterosTheme.inputColor,
        color: AnterosTheme.inputTextColor,
        borderColor: AnterosTheme.inputBorderColor,
        borderWidth: AnterosTheme.inputBorderWidth,
        borderRadius: borderRadius,
        fontSize: fontSize,
        paddingVertical: paddingVertical,
        paddingHorizontal: paddingHorizontal,
        height: height
      }
    ].concat(style);

    if (!placeholderTextColor)
      placeholderTextColor = AnterosTheme.inputPlaceholderTextColor;
    if (disabled) {
      pointerEvents = 'none';
      opacity = AnterosTheme.inputDisabledOpacity;
    }

    //let onChange = this.handleChange
    let value = this.state.value

    return {
      style,
      size,
      disabled,
      placeholderTextColor,
      pointerEvents,
      opacity,
      onChangeText: this.handleChange,
      value,
      ...others
    };
  }

  shouldComponentUpdate=(nextProps, nextState) => {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const props = this.buildProps();
    return <TextInput {...props}/>;
  }

}



AnterosInput.propTypes = {
  ...TextInput.propTypes,
  dataSource: PropTypes.oneOfType([
    PropTypes.instanceOf(AnterosLocalDatasource),
    PropTypes.instanceOf(AnterosRemoteDatasource)
  ]),
  dataField: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'md', 'sm']),
  disabled: PropTypes.bool
};

AnterosInput.defaultProps = {
  ...TextInput.defaultProps,
  size: 'md',
  disabled: false,
  dataSource: '',
  underlineColorAndroid: 'rgba(0, 0, 0, 0)'
};


export { AnterosInput };