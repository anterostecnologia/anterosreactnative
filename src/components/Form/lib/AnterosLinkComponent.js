"use strict";

import React from "react";
let { View, StyleSheet, Text } = require("react-native");
import { AnterosFormField } from "./AnterosFormField";
import {AnterosText} from '../../Text/AnterosText';

export class AnterosLinkComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleLayoutChange(e) {
    let { x, y, width, height } = { ...e.nativeEvent.layout };

    this.setState(e.nativeEvent.layout);
    //e.nativeEvent.layout: {x, y, width, height}}}.
  }

  render() {
    return (
      <AnterosFormField {...this.props}>
        <View
          style={this.props.containerStyle}
          onLayout={this.handleLayoutChange.bind(this)}
        >
          {this.props.iconLeft ? this.props.iconLeft : null}
          <AnterosText style={this.props.labelStyle}>
            {this.props.label}
          </AnterosText>

          {this.props.iconRight ? this.props.iconRight : null}
        </View>
      </AnterosFormField>
    );
  }
}

AnterosLinkComponent.propTypes = {
  labelStyle: Text.propTypes.style,
  containerStyle: View.propTypes.style
};

