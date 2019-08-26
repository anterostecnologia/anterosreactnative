// ModalIndicatorExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';

import {AnterosNavigationPage, AnterosListRow, AnterosModalIndicator} from 'anteros-react-native';

export default class ModalIndicatorExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'ModalIndicator',
    showBackButton: true,
  };

  show() {
    let secs = 5;
    AnterosModalIndicator.show(`Close after ${secs} sec(s)`);
    let timer = setInterval(() => {
      secs--;
      AnterosModalIndicator.show(`Close after ${secs} sec(s)`);
      if (secs < 0) {
        clearInterval(timer);
        AnterosModalIndicator.hide();
      }
    }, 1000);
  }

  renderPage() {
    let img = require('../images/faircup.jpg');
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}}/>
        <AnterosListRow title='Show' onPress={() => this.show()} topSeparator='full' bottomSeparator='full'/>
      </ScrollView>
    );
  }

}
