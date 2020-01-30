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
class Scrollable extends React.Component{


scrollToPosition = (x, y, animated = true) => {
        this.keyboardRef.scrollToPosition(x,y,animated);
    }

  render(){
    return(
      <AnterosKeyboardScrollView
    horizontal={this.props.horizontal}
    contentContainerStyle={this.props.stretch ? styles.stretch : null}
    ref={ref => this.keyboardRef = ref}
  >
    {this.props.children}
  </AnterosKeyboardScrollView>
      )
  }
  
}


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
