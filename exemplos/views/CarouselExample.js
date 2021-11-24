// CarouselExample.js

'use strict';

import {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';

import {AnterosNavigationPage, AnterosListRow, AnterosCarousel, AnterosPullPicker} from 'anteros-react-native';

export class CarouselExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Carousel',
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.items = ['none', 'default', 'custom'];
    Object.assign(this.state, {
      width: Dimensions
        .get('window')
        .width,
      control: 'none'
    });
  }

  selectControl() {
    AnterosPullPicker.show('Control', this.items, this.items.indexOf(this.state.control), (item, index) => this.setState({control: item}));
  }

  renderControl() {
    let {control} = this.state;
    if (control === 'default') {
      return <AnterosCarousel.Control/>;
    } else if (control === 'custom') {
      return (<AnterosCarousel.Control
        style={{
        alignItems: 'flex-end'
      }}
        dot={<Text style = {{backgroundColor: 'rgba(0, 0, 0, 0)', color: '#5bc0de', padding: 4}} > □ </Text>}
        activeDot={<Text style = {{backgroundColor: 'rgba(0, 0, 0, 0)', color: '#5bc0de', padding: 4}} > ■ </Text>}/>);
    }
  }

  renderPage() {
    let {width} = this.state;
    return (
      <ScrollView style={{
        flex: 1
      }}>
        <AnterosCarousel
          style={{
          height: 238
        }}
          control={this.renderControl()}
          onLayout={e => this.setState({width: e.nativeEvent.layout.width})}>
          <Image
            style={{
            width,
            height: 238
          }}
            resizeMode='cover'
            source={require('../images/teaset1.jpg')}/>
          <Image
            style={{
            width,
            height: 238
          }}
            resizeMode='cover'
            source={require('../images/teaset2.jpg')}/>
          <Image
            style={{
            width,
            height: 238
          }}
            resizeMode='cover'
            source={require('../images/teaset3.jpg')}/>
        </AnterosCarousel>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Control'
          detail={this.state.control}
          onPress={() => this.selectControl()}
          topSeparator='full'
          bottomSeparator='full'/>
      </ScrollView>
    );
  }

}
