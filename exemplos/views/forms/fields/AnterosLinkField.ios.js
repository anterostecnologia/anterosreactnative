'use strict';


let { View, StyleSheet, TextInput, Text} = require('react-native');
import {AnterosLinkComponent} from '../lib/AnterosLinkComponent';
import React,{Component} from "react";

export class AnterosLinkField extends Component{
  render(){
    return(<AnterosLinkComponent
       {...this.props}
       labelStyle={[formStyles.fieldText, this.props.labelStyle]}

       containerStyle={[
           formStyles.fieldContainer,
           formStyles.horizontalContainer,
           this.props.containerStyle]}
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
  fieldText:{
    fontSize: 34/2,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    lineHeight: 32,
    flex:2
  },
});
