

'use strict';


import PropTypes from 'prop-types';
import React,{Component} from "react";
import { View, StyleSheet, Text} from 'react-native';
import {AnterosText} from '../../Text/AnterosText';

export class AnterosHelpText extends Component{
  render(){
    if(!this.props.text) return null;
    return (
      <View style={formStyles.helpTextContainer}>
        <AnterosText style={formStyles.helpText}>{this.props.text}</AnterosText>
    </View>);
  }
}

AnterosHelpText.propTypes = {
  text: PropTypes.string
}


let formStyles = StyleSheet.create({

  helpTextContainer:{
    marginTop:9,
    marginBottom: 25,
    paddingLeft: 20,
    paddingRight: 20,

  },
  helpText:{
    color: '#7a7a7a'
  }
});
