import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';


export class AnterosTextArea extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  _onChangeText = (text) => {
    const { onChangeText, numberOfLines} = this.props;

    this.setState({ count: text.length });

    if (onChangeText) onChangeText(text);
  }

  _renderCount() {
    const { maxLength, } = this.props;
    const { count, } = this.state;

    if (!maxLength) return null;

    return (
      <Text style={styles.count}>
        {`${count}/${maxLength}`}
      </Text>
    );
  }

  render() {
    const { containerStyle, maxLength, ...rest } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <TextInput multiline {...rest} onChangeText={this._onChangeText} />
        {this._renderCount()}
      </View>
    );
  }
}

AnterosTextArea.propTypes = {
  containerStyle: PropTypes.style,
  maxLength: PropTypes.number,
  onChangeText: PropTypes.func
}

AnterosTextArea.defaultProps = {
    maxLength: 0
  }

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 170,
  },
  count: {
    position: 'absolute',
    bottom: 8,
    right: 2,
    fontSize: 14,
    color: '#ccc',
  }
});