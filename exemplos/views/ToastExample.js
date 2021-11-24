// ToastExample.js

'use strict';

import {Component} from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';

import {AnterosNavigationPage, AnterosListRow, AnterosToast, AnterosTheme} from 'anteros-react-native';

export class ToastExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Toast',
    showBackButton: true
  };

  static customKey = null;

  showCustom() {
    if (ToastExample.customKey) 
      return;
    ToastExample.customKey = AnterosToast.show({
      text: 'Toast custom', icon: <ActivityIndicator size='large' color={AnterosTheme.toastIconTintColor}/>,
      position: 'top',
      duration: 1000000
    });
  }

  hideCustom() {
    if (!ToastExample.customKey) 
      return;
    AnterosToast.hide(ToastExample.customKey);
    ToastExample.customKey = null;
  }

  renderPage() {
    let img = require('../images/faircup.jpg');
    return (
      <ScrollView style={{
        flex: 1
      }}>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Message'
          onPress={() => AnterosToast.message('Toast message')}
          topSeparator='full'/>
        <AnterosListRow
          title='Success'
          onPress={() => AnterosToast.success('Toast success')}/>
        <AnterosListRow title='Fail' onPress={() => AnterosToast.fail('Toast fail')}/>
        <AnterosListRow
          title='Smile'
          onPress={() => AnterosToast.smile('Toast smile')}/>
        <AnterosListRow title='Sad' onPress={() => AnterosToast.sad('Toast sad')}/>
        <AnterosListRow title='Info' onPress={() => AnterosToast.info('Toast info')}/>
        <AnterosListRow
          title='Stop'
          onPress={() => AnterosToast.stop('Toast stop')}
          bottomSeparator='full'/>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Show custom'
          onPress={() => this.showCustom()}
          topSeparator='full'/>
        <AnterosListRow
          title='Hide custom'
          onPress={() => this.hideCustom()}
          bottomSeparator='full'/>
      </ScrollView>
    );
  }

}
