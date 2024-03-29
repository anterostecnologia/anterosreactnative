"use strict";

import React from "react";
import PropTypes from "prop-types";
import { AnterosHelpText } from "./AnterosHelpText";
let { View, StyleSheet, Text, TouchableHighlight } = require("react-native");
import React,{Component} from "react";
export class AnterosFormField extends Component {
  render() {
    let fieldHelpText =
      this.props.helpTextComponent ||
      (this.props.helpText ? (
        <AnterosHelpText text={this.props.helpText} />
      ) : null);

    if (this.props.onPress) {
      return (
        <TouchableHighlight onPress={this.props.onPress}>
          <View>
            {this.props.children}
            {fieldHelpText}
          </View>
        </TouchableHighlight>
      );
    }
    return (
      <View>
        {this.props.children}
        {fieldHelpText}
      </View>
    );
  }
}
AnterosFormField.propTypes = {
  helpTextComponent: PropTypes.element,
  helpText: PropTypes.string
};

let formStyles = StyleSheet.create({
  helpTextContainer: {
    marginTop: 9,
    marginBottom: 25,
    paddingLeft: 20,
    paddingRight: 20
  },
  helpText: {
    color: "#7a7a7a"
  }
});

