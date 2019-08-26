import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';

import {AnterosNavigationPage, AnterosFingerprint} from 'anteros-react-native';

export default class FingerprintExample extends AnterosNavigationPage {
  static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Fingerprint',
      showBackButton: true
  };

  constructor(props) {
    super(props);
    this.onAuthenticated = this.onAuthenticated.bind(this);
    this.onError = this.onError.bind(this);
  }

  onAuthenticated(){
    Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
  }

  onError(error){
    Alert.alert('Fingerprint Authentication', error);
  }
 
  renderPage() {
      return (<AnterosFingerprint 
        title="Fingerprint authentication" 
        subTitle="touch here to start"
        onError={this.onError}/>);
  }
}