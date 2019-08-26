import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes } from 'react-native';

import { DirectionProp } from '../../shared/props';
import { checkInsideGrid, warn } from '../../utils';


const styles = StyleSheet.create({
  horizontal: {
    alignItems: 'flex-start', // Required to support RN42+ due a bug with wrap
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  vertical: {
    alignItems: 'flex-start', // Required to support RN42+ due a bug with wrap
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  stretch: {
    flex: 1,
  },
});


/**
 * Component used to contain group of Blocks.
 *
 * @type {React.StatelessComponent<{stretch: boolean, style: any, children: any}>}
 */
class Section extends PureComponent {
  constructor(props,context){
    super(props);
  }
  render(){
    const { children, style, stretch, index } = this.props;
    if (process.env.NODE_ENV === 'development') {
      warn(
        !this.context.containerStretch && !!stretch,
        'Using `stretch` on `Section` without using `stretchable` on `Content` has no stretching effect because content itself won\'t be stretched and section will just collapse so it won\'t be visible.\nPlease make `Grid` stretchable as well.',
      );
    }

    return (
      <View key={index}
        style={[
          (this.context.contentDirection === 'vertical' ? styles.vertical : styles.horizontal),
          (stretch ? styles.stretch : null),
          style,
        ]}
      >
        {children}
      </View>
    );
  }
};


Section.contextTypes = {
  contentDirection: checkInsideGrid(DirectionProp),
  containerStretch: checkInsideGrid(PropTypes.bool),
};

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: ViewPropTypes.style,
  stretch: PropTypes.bool,
  index: PropTypes.number
};

Section.defaultProps = {
  style: {},
  stretch: false,
};

export default Section;
