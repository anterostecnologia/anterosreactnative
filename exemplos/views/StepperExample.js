// StepperExample.js

"use strict";

import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";

import {
  AnterosNavigationPage,
  AnterosListRow,
  AnterosStepper
} from "anteros-react-native";

export class StepperExample extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Stepper",
    showBackButton: true
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, { valueCustom: 1 });
  }

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <AnterosListRow title='Default' detail={<AnterosStepper />} topSeparator='full' />
        <AnterosListRow title='Min & max' detail={<AnterosStepper defaultValue={1} min={1} max={10} />} />
        <AnterosListRow title='Step' detail={<AnterosStepper defaultValue={0.8} step={0.005} valueFormat={v => (v * 100).toFixed(1) + '%'} valueStyle={{minWidth: 60}} />} bottomSeparator='full' />
        <View style={{height: 20}} />
        <AnterosListRow title='Readonly' detail={<AnterosStepper editable={false} />} topSeparator='full' />
        <AnterosListRow title='Disabled' detail={<AnterosStepper disabled={true} />} bottomSeparator='full' />
        <View style={{height: 20}} />
        <AnterosListRow title='Custom' detail={
          <AnterosStepper
            style={{borderWidth: 0}}
            value={this.state.valueCustom}
            valueStyle={{color: '#8a6d3b'}}
            min={0}
            max={100}
            subButton={
              <View style={{backgroundColor: '#rgba(238, 169, 91, 0.1)', borderColor: '#8a6d3b', borderWidth: 1, borderRadius:4, width: 20, height: 20, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: '#8a6d3b'}}>－</Text>
              </View>
            }
            addButton={
              <View style={{backgroundColor: '#rgba(238, 169, 91, 0.1)', borderColor: '#8a6d3b', borderWidth: 1, borderRadius:4, width: 20, height: 20, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: '#8a6d3b'}}>＋</Text>
              </View>
            }
            showSeparator={false}
            onChange={v => this.setState({valueCustom: v})}
            />
        } topSeparator='full' bottomSeparator='full' />
      </ScrollView>
    );
  }
}

