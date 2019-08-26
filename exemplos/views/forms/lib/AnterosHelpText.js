

'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import { View, StyleSheet, Text} from 'react-native';
import {AnterosText} from 'anteros-react-native';

export class AnterosHelpText extends React.Component{
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
