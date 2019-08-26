import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import {AnterosColorGradient} from './AnterosColorGradient';

export class AnterosColorHueGradient extends PureComponent {
  getStepColor = i => tinycolor({ s: 1, l: 0.5, h: i }).toHslString();

  render() {
    const { style, gradientSteps } = this.props;
    return (
      <AnterosColorGradient
        style={style}
        gradientSteps={gradientSteps}
        getStepColor={this.getStepColor}
        maximumValue={359}
      />
    );
  }
}


AnterosColorHueGradient.propTypes = {
  gradientSteps: PropTypes.number.isRequired
};