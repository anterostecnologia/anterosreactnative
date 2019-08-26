import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import {AnterosColorGradient} from './AnterosColorGradient';

export class AnterosColorSaturationGradient extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color.h !== nextProps.color.h) {
      return true;
    }
    if (this.props.color.l !== nextProps.color.l) {
      return true;
    }
    return false;
  }

  getStepColor = i => tinycolor({ ...this.props.color, s: i }).toHslString();

  render() {
    const { style, color, gradientSteps } = this.props;
    return (
      <AnterosColorGradient
        style={style}
        gradientSteps={gradientSteps}
        getStepColor={this.getStepColor}
        maximumValue={1}
      />
    );
  }
}


AnterosColorSaturationGradient.propTypes = {
  color: PropTypes.shape({
    h: PropTypes.number.isRequired,
    s: PropTypes.number.isRequired,
    l: PropTypes.number.isRequired
  }).isRequired,
  gradientSteps: PropTypes.number.isRequired
};