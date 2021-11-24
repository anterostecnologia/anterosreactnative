'use strict';



import {
  StyleSheet,
  View,
  Text,
  Slider,
  Image,
  Platform,
} from 'react-native';
import React,{Component} from "react";

import {AnterosText, AnterosNavigationPage, AnterosMultiSlider, AnterosImage} from 'anteros-react-native';

class CustomMarker extends Component {
    render() {
      return (
        <AnterosImage
          style={stylesCustom.image}
          source={this.props.pressed ? require('../images/ruby.png') : require('../images/diamond.png')}
          resizeMode='contain'
        />
      );
    }
  }
  
  const stylesCustom = StyleSheet.create({
    image: {
      height: 40,
      width: 40
    }
  });

export class MultiSliderExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Multi slider',
      showBackButton: true,
    };

  state = {
    sliderOneChanging: false,
    sliderOneValue: [5],
    multiSliderValue: [3, 7],
  };

  sliderOneValuesChangeStart = () => {
    this.setState({
      sliderOneChanging: true,
    });
  }

  sliderOneValuesChange = (values) => {
    let newValues = [0];
    newValues[0] = values[0];
    this.setState({
      sliderOneValue: newValues,
    });
  }

  sliderOneValuesChangeFinish = () => {
    this.setState({
      sliderOneChanging: false,
    });
  }

  multiSliderValuesChange = (values) => {
    this.setState({
      multiSliderValue: values,
    });
  }

  renderPage() {
    return (
      <View style={styles.container}>
        <AnterosText style={styles.title}>Sliders</AnterosText>
         <View style={styles.sliders}> 
          <View style={styles.sliderOne}>
            <AnterosText style={styles.text}>One Marker with callback example:</AnterosText>
            <AnterosText style={[styles.text, this.state.sliderOneChanging && {color: 'red' }]}>{this.state.sliderOneValue}</AnterosText>
          </View>
          <AnterosMultiSlider
            values={this.state.sliderOneValue}
            sliderLength={280}
            onValuesChangeStart={this.sliderOneValuesChangeStart}
            onValuesChange={this.sliderOneValuesChange}
            onValuesChangeFinish={this.sliderOneValuesChangeFinish}
          />
          <View style={styles.sliderOne}>
            <AnterosText style={styles.text}>Two Markers:</AnterosText>
            <AnterosText style={styles.text}>{this.state.multiSliderValue[0]} </AnterosText>
            <AnterosText style={styles.text}>{this.state.multiSliderValue[1]}</AnterosText>
          </View>
          <AnterosMultiSlider
            values={[this.state.multiSliderValue[0], this.state.multiSliderValue[1]]}
            sliderLength={280}
            onValuesChange={this.multiSliderValuesChange}
            min={0}
            max={10}
            step={1}
            allowOverlap
            snapped
          />
        </View>
        <AnterosText style={styles.text}>Native RCT Slider</AnterosText>
        <Slider style={{width: 280,}}/>
        <AnterosText style={styles.text}>Custom Marker</AnterosText>
        <AnterosMultiSlider
          selectedStyle={{
            backgroundColor: 'gold',
          }}
          unselectedStyle={{
            backgroundColor: 'silver',
          }}
          values={[5]}
          containerStyle={{
            height:40,
          }}
          trackStyle={{
            height:10,
            backgroundColor: 'red',
          }}
          touchDimensions={{
            height: 40,
            width: 40,
            borderRadius: 20,
            slipDisplacement: 40,
          }}
          customMarker={CustomMarker}
          sliderLength={280}
        /> 
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliders: {
    margin: 20,
    width: 280,
  },
  text: {
    alignSelf: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
  },
  sliderOne: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});