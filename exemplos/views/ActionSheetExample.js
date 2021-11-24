// ActionSheetExample.js

'use strict';

import {Component} from 'react';
import {View, ScrollView} from 'react-native';

import {AnterosNavigationPage, AnterosListRow, AnterosActionSheet, AnterosLabel} from 'anteros-react-native';

export class ActionSheetExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'ActionSheet',
    showBackButton: true
  };

  show(modal) {
    let items = [
      {
        title: 'Say hello',
        onPress: () => alert('Hello')
      }, {
        title: 'Do nothing'
      }, {
        title: 'Disabled',
        disabled: true
      }
    ];
    let cancelItem = {
      title: 'Cancel'
    };
    AnterosActionSheet.show(items, cancelItem, {modal});
  }

  renderPage() {
    return (
      <ScrollView style={{
        flex: 1
      }}>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Default'
          onPress={() => this.show(false)}
          topSeparator='full'/>
        <AnterosListRow
          title='Modal'
          onPress={() => this.show(true)}
          bottomSeparator='full'/>
      </ScrollView>
    );
  }

}
