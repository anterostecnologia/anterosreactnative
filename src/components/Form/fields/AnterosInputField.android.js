'use strict';


import ReactNative from 'react-native';
import {InputComponent} from '../lib/InputComponent';
import React,{Component} from "react";

const {StyleSheet} = ReactNative;

export class AnterosInputField extends Component{

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
