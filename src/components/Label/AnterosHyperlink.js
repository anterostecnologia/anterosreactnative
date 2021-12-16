import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Linking,
  Text,
  StyleSheet
} from 'react-native';

export class AnterosHyperlink extends Component {

  constructor(){
      super();
      this._goToURL = this._goToURL.bind(this);
  }

  static propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }

  render() {

    const { title} = this.props;

    return(
      <Text style={styles.title} onPress={this._goToURL}>
         {title}
      </Text>
    );
  }

  _goToURL() {
    const { url } = this.props;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.url);
      } else {
        console.log('Não sei como abrir URI: ' + this.props.url);
      }
    });
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#acacac',
    fontWeight: 'bold'
  }
});