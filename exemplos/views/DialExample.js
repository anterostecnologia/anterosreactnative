import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View
} from 'react-native';
import {AnterosNavigationPage, AnterosDial} from 'anteros-react-native';

export class DialExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Dial',
      showBackButton: true,
    };

  renderPage() {
    const borderRadius = Dimensions.get('window').width * 0.5
    return (
      <View style={{flex: 1}}>
        <AnterosDial
        //   responderStyle={[styles.responderStyle, { borderRadius }]}
        //   wrapperStyle={styles.wheelWrapper}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  responderStyle: {
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: 'rgba(0,0,0,.7)',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  wheelWrapper: {
    borderRadius: 120,
    elevation: 5,
    padding: 0,
    shadowColor: 'rgba(0,0,0,.7)',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    zIndex: 1,
  },
})