// ProjectorExample.js

'use strict';

import {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';

import {
  AnterosNavigationPage,
  AnterosListRow,
  AnterosProjector,
  AnterosButton,
  AnterosLabel,
  AnterosInput
} from 'anteros-react-native';

export class ProjectorExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Projector',
    showBackButton: true
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {index: 0});
  }

  renderSlide(color) {
    return (
      <View
        style={{
        backgroundColor: color,
        padding: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <AnterosLabel text='Enter something'/>
        <View style={{
          height: 12
        }}/>
        <View><AnterosInput
          style={{
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        width: 200
      }}/></View>
      </View>
    );
  }

  renderButton(i) {
    return (<AnterosButton
      title={i}
      type={this.state.index == i
      ? 'primary'
      : 'default'}
      onPress={() => this.setState({index: i})}/>);
  }

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <AnterosProjector style={{height: 238}} index={this.state.index}>
          {this.renderSlide('rgba(170, 240, 141, 0.1)')}
          {this.renderSlide('rgba(123, 207, 249, 0.1)')}
          {this.renderSlide('rgba(250, 231, 133, 0.1)')}
          {this.renderSlide('rgba(244, 131, 131, 0.1)')}
        </AnterosProjector>
        <View style={{height: 20}} />
        <AnterosListRow
          title='Slide no'
          detail={
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
              {this.renderButton(0)}
              {this.renderButton(1)}
              {this.renderButton(2)}
              {this.renderButton(3)}
            </View>
          }
          topSeparator='full'
          bottomSeparator='full'
          />
      </ScrollView>
    );
  }

}
