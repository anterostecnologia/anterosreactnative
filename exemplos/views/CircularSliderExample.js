import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {AnterosNavigationPage, AnterosCircularSlider} from 'anteros-react-native';

export class CircularSliderExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Circular slider',
    showBackButton: true
  };

  constructor(props){
    super(props)
    this.state = {
      slider1: 270,
      slider2: 180
    }
  }
  renderPage() {
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={styles.slider1}>
            <AnterosCircularSlider width={200} height={200} meterColor='#0cd' textColor='red'
              value={this.state.slider1} onValueChange={(value)=>this.setState({slider1:value})}/>
          </View>
          <View style={styles.slider2}>
            <AnterosCircularSlider width={150} height={150} meterColor='#ffa' textColor='red'
              value={this.state.slider2} onValueChange={(value)=>this.setState({slider2:value})}/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#01579B',
  },
  container: {
    position: 'relative',
    width: 200,
    height: 200
  },
  slider1: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  slider2: {
    position: 'absolute',
    top: 25,
    left: 25
  }
});
