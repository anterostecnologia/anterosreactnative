"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactNative, { Platform } from "react-native";
import { AnterosFormField } from "./AnterosFormField.js";
import {AnterosText} from '../../Text/AnterosText';

const { View, StyleSheet, TextInput, Text } = ReactNative;

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)) return true;
  return "Invalid email";
}

export class AnterosInputComponent extends Component {
  constructor(props) {
    super(props);

    this.triggerValidation = this.triggerValidation.bind(this);
    // this.validate = this.validate.bind(this)
    this.validate(props.value);
    this.validationErrors = [];
    this.state = {
      labelWidth: 0,
      value: props.value,
      minFieldHeight: props.height || 44,
      inputHeight: Math.max(props.height || 44)
      // isValid:
    };
    this.setValue = this.setValue.bind(this);
    this.focus = this.focus.bind(this);
    this.triggerValidation = this.triggerValidation.bind(this);
    this.validate = this.validate.bind(this);
    this.handleLayoutChange = this.handleLayoutChange.bind(this);
    this.handleLabelLayoutChange = this.handleLabelLayoutChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFieldPress = this.handleFieldPress.bind(this);
    this._scrollToInput = this._scrollToInput.bind(this);
  }

  setValue(value) {
    this.setState({ value: value });
    if (this.props.onChange) this.props.onChange(value);
    if (this.props.onValueChange) this.props.onValueChange(value);
  }
  focus() {
    this.refs.inputBox.focus();
  }
  triggerValidation() {
    this.setState({ isValid: this.validate(this.state.value) });
  }
  validate(value) {
    let validationResult;
    this.validationErrors = [];

    if (!!this.props.validationFunction) {
      if (this.props.validationFunction.constructor === Array) {
        /*
        validationFunction has to return an object in case of error,
          true in case of successful validation
         */
        this.props.validationFunction.map((valFn, i) => {
          let validationResult = valFn(value, this);
          if (validationResult === true) {
            this.valid = this.valid !== false ? validationResult : this.valid;
          } else {
            this.validationErrors.push(validationResult);
            this.valid = false;
          }
        });
      } else {
        let validationResult = this.props.validationFunction(value, this);
        if (validationResult === true) {
          this.valid = true;
        } else {
          this.validationErrors.push(validationResult);
          this.valid = false;
        }
      }
    } else if (this.props.keyboardType) {
      switch (this.props.keyboardType) {
        case "email-address":
          validationResult = validateEmail(value);
          break;
      }
      if (validationResult === true) {
        this.valid = true;
      } else {
        this.validationErrors.push(validationResult);
        this.valid = false;
      }
    }
    this.props.onValidation(this.valid, this.validationErrors);
    return this.valid;
  }
  handleLayoutChange(e) {
    if (Platform.OS === "ios") {
      let { x, y, width, height } = { ...e.nativeEvent.layout };

      this.setState(e.nativeEvent.layout);
    }
    // //e.nativeEvent.layout: {x, y, width, height}}}.
  }

  handleLabelLayoutChange(e) {
    if (Platform.OS === "ios") {
      let { x, y, width, height } = { ...e.nativeEvent.layout };

      this.setState({ labelWidth: width });
    }
    // //e.nativeEvent.layout: {x, y, width, height}}}.
  }
  handleChange(event) {
    const value = event.nativeEvent.text;

    this.validate(value);

    this.setState({
      value,
      inputHeight: Math.max(
        this.state.minFieldHeight,
        event.nativeEvent.contentSize && this.props.multiline
          ? event.nativeEvent.contentSize.height
          : 0
      )
    });
    //this.props.onChange(this.props.fieldRef, value);
    if (this.props.onChange) this.props.onChange(value, this.valid);
    if (this.props.onValueChange) this.props.onValueChange(value, this.valid);
  }

  _scrollToInput(event) {
    //debugger;
    if (this.props.onFocus) {
      let handle = ReactNative.findNodeHandle(this.refs.inputBox);
      this.props.onFocus(event, handle);
    }
  }
  handleFieldPress(event) {
    this.refs.inputBox.focus();
  }
  render() {
    // style={[formStyles.fieldContainer,
    //     formStyles.horizontalContainer,
    //     this.props.containerStyle,
    //     {height: this.state.inputHeight+1}
    //   ]}
    return (
      <AnterosFormField {...this.props}>
        <View
          onLayout={this.handleLayoutChange}
          style={[this.props.containerStyle]}
        >
          {this.props.iconLeft ? this.props.iconLeft : null}
          {this.props.label ? (
            <AnterosText
              style={this.props.labelStyle}
              onLayout={this.handleLabelLayoutChange}
              onPress={this.handleFieldPress}
              suppressHighlighting={true}
            >
              {this.props.label}
            </AnterosText>
          ) : null}
          <TextInput
            {...this.props}
            ref="inputBox"
            keyboardType={this.props.keyboardType}
            style={[this.props.inputStyle, { height: this.state.inputHeight }]}
            onChange={this.handleChange}
            onFocus={this._scrollToInput}
            placeholder={this.props.placeholder}
            value={this.state.value}
            width={
              this.state.width -
              this.state.labelWidth -
              (this.props.iconRight ? this.props.iconRight.props.size : 0) -
              (this.props.iconLeft ? this.props.iconLeft.props.size : 0)
            }
          />
          {this.props.iconRight ? this.props.iconRight : null}
        </View>
      </AnterosFormField>
    );
  }
}

// AnterosInputComponent.propTypes = {
//   multiline: PropTypes.bool,
//   placeholder:PropTypes.string,
// }

AnterosInputComponent.propTypes = {
  labelStyle: Text.propTypes.style,
  inputStyle: TextInput.propTypes.style,
  containerStyle: View.propTypes.style
};

