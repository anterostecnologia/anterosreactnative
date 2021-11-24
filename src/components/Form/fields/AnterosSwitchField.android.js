'use strict';


let { View, StyleSheet, Text, Switch} = require('react-native');
import React,{Component} from "react";
import {AnterosSwitchComponent} from '../lib/AnterosSwitchComponent';

export class AnterosSwitchField extends Component{
  setValue(value){
    this.refs.fieldComponent.setValue(value)
  }
  render(){

    return(<AnterosSwitchComponent
      {...this.props}
      ref='fieldComponent'
      containerStyle={[
        formStyles.fieldContainer,
        formStyles.horizontalContainer,
        this.props.containerStyle
      ]}

      labelStyle = {[
        formStyles.fieldText,
        this.props.labelStyle
      ]}
      switchStyle={[
        {marginTop: 7, position:'absolute', right: 10},
        this.props.switchStyle
      ]}
      />

    )
  }

}



  let formStyles = StyleSheet.create({
    fieldContainer:{
      borderBottomWidth: 1,
      borderBottomColor: '#C8C7CC',
      backgroundColor: 'white',
      justifyContent: 'center',
      height: 45
    },
    horizontalContainer:{
      flexDirection: 'row',

      justifyContent: 'flex-start'
    },

  });
