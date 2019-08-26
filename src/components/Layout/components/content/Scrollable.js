import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView } from 'react-native';
import {AnterosKeyboardScrollView} from '../../../ScrollView/AnterosKeyboardScrollView';

const styles = StyleSheet.create({
  stretch: {
    flexGrow: 1,
  },
});


/* eslint-disable */
/**
 * Component for wrapping scrollable content.
 *
 * @type {React.StatelessComponent<{stretch: boolean, horizontal: boolean, children: any}>}
 */
/* eslint-enable */
const Scrollable = ({ children, stretch, horizontal }) => (
  <AnterosKeyboardScrollView
    horizontal={horizontal}
    contentContainerStyle={stretch ? styles.stretch : null}
  >
    {children}
  </AnterosKeyboardScrollView>
);


Scrollable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  stretch: PropTypes.bool,
  horizontal: PropTypes.bool,
};

Scrollable.defaultProps = {
  stretch: false,
  horizontal: false,
};

export default Scrollable;
