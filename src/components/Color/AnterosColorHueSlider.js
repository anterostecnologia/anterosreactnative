
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import {AnterosColorGradientSlider} from './AnterosColorGradientSlider';
import {AnterosColorHueGradient} from './AnterosColorHueGradient';
import tinycolor from 'tinycolor2';

export const AnterosColorHueSlider = ({ style, value, onValueChange, gradientSteps }) => {
  return (
    <AnterosColorGradientSlider
      gradient={<AnterosColorHueGradient gradientSteps={gradientSteps} />}
      style={style}
      step={1}
      maximumValue={359}
      value={value}
      thumbTintColor={tinycolor({ s: 1, l: 0.5, h: value }).toHslString()}
      onValueChange={onValueChange}
    />
  );
};


AnterosColorHueSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
  gradientSteps: PropTypes.number.isRequired
};