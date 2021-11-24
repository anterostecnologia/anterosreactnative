
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import {AnterosColorGradientSlider} from './AnterosColorGradientSlider';
import {AnterosColorLightnessGradient} from './AnterosColorLightnessGradient';
import tinycolor from 'tinycolor2';

export const AnterosColorLightnessSlider = ({
  style,
  value,
  color,
  onValueChange,
  gradientSteps
}) => {
  return (
    <AnterosColorGradientSlider
      gradient={
        <AnterosColorLightnessGradient color={color} gradientSteps={gradientSteps} />
      }
      style={style}
      step={0.01}
      maximumValue={1}
      value={value}
      thumbTintColor={tinycolor({ ...color, l: value }).toHslString()}
      onValueChange={onValueChange}
    />
  );
};


AnterosColorLightnessSlider.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.shape({
    h: PropTypes.number.isRequired,
    s: PropTypes.number.isRequired,
    l: PropTypes.number.isRequired
  }).isRequired,
  onValueChange: PropTypes.func.isRequired,
  gradientSteps: PropTypes.number.isRequired
};