import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {AnterosNavigationPage, AnterosBigSlider} from 'anteros-react-native';

export class BigSliderExample extends AnterosNavigationPage {
    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: "Big slider",
      showBackButton: true
    };

  constructor() {
    super()
    this.state = { valA: 64, valB: 23 }
  }
  renderPage () {
    return (
      <View style={styles.container}>
        <View padding={20} />
        <AnterosBigSlider minimumValue={-50}
          label={`${this.state.valA | 0}º`}
          value={this.state.valA} onValueChange={valA => {
            this.setState({ valA })
          }} />
        <View padding={20} flexDirection="row" flex={1}>
          <View flex={1}>
            <AnterosBigSlider
              ref={el => {this.slider = el}}
              horizontal
              maximumValue={120}
              style={{ width: 140 }}
              onSlidingComplete={() => {
                this.slider.slideTo(80)
              }}
              value={this.state.valB}
              minimumValue={-120} />
          </View>
          <View flex={1}>
            <AnterosBigSlider
              maximumValue={120}
              style={{ backgroundColor: 'rgba(0,0,0,.7)' }}
              trackStyle={{ backgroundColor: 'rgba(194, 61, 85, 1)' }}
              label="friction"
              minimumValue={-120} />
          </View>
        </View>
        <View padding={20} flexDirection="row" flex={1}>
          <View flex={1}>
            <AnterosBigSlider
              style={{ width: 80 }}
              renderLabel={() => <Text style={{textAlign:'center', padding: 20}}>
                Brightness
              </Text>}
              trackStyle={{ backgroundColor: 'rgba(143, 255, 160, .7)' }}
              maximumValue={30}
              minimumValue={-120}
              value={this.state.valB} />
          </View>
          <View flex={1}>
            <AnterosBigSlider
              style={{ width: 110 }}
              trackStyle={{ backgroundColor: 'rgb(255, 166, 102)' }}
              maximumValue={30}
              minimumValue={-120}
              value={this.state.valB} />
          </View>
          <View padding={20} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});