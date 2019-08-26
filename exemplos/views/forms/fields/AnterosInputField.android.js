'use strict';

import React from 'react';
import ReactNative from 'react-native';
import {InputComponent} from '../lib/InputComponent';

const {StyleSheet} = ReactNative;

export class AnterosInputField extends React.Component{

  handleValidation(isValid, validationErrors){
    this.valid = isValid;
    this.validationErrors = validationErrors;
  }
  setValue(value){
    this.refs.fieldComponent.setValue(value)
  }
  focus(){
    this.refs.fieldComponent.focus()
  }
  render(){
    return(<AnterosInputComponent
      {...this.props}
      ref='fieldComponent'
      onValidation={this.handleValidation.bind(this)}
      //onChange={this.handleChange.bind(this)}
      //ref={this.props.fieldRef}
      />
    );
  }
}
