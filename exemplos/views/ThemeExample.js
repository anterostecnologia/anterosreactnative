// ThemeExample.js

'use strict';

import {Component} from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';

import {AnterosTheme, AnterosNavigationPage, AnterosListRow, AnterosPullPicker} from 'anteros-react-native';

export class ThemeExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Theme',
    showBackButton: true
  };

  changeTheme() {
    AnterosPullPicker.show('Select theme', Object.keys(AnterosTheme.themes), -1, (item, index) => {
      AnterosTheme.set(AnterosTheme.themes[item]);
      this
        .navigator
        .popToTop();
    });
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
          title='Select theme'
          onPress={() => this.changeTheme()}
          topSeparator='full'
          bottomSeparator='full'/>
      </ScrollView>
    );
  }

}
