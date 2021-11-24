// SearchInputExample.js

'use strict';

import {Component} from 'react';
import {View, ScrollView} from 'react-native';

import {AnterosNavigationPage, AnterosListRow, AnterosSearchInput} from 'anteros-react-native';

export class SearchInputExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'SearchInput',
    showBackButton: true
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {valueCustom: null});
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
          detail={<AnterosSearchInput style = {{width: 200}}placeholder = 'Enter text' clearButtonMode = 'while-editing' />}
          topSeparator='full'
          bottomSeparator='full'/>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Readonly'
          detail={<AnterosSearchInput style = {{width: 200}}placeholder = 'Enter text' clearButtonMode = 'while-editing' value = 'Readonly' editable = {
          false
        } />}
          topSeparator='full'/>
        <AnterosListRow
          title='Disabled'
          detail={<AnterosSearchInput style = {{width: 200}}placeholder = 'Enter text' clearButtonMode = 'while-editing' value = 'Disabled' disabled = {
          true
        } />}
          bottomSeparator='full'/>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Custom'
          detail={<AnterosSearchInput style = {{width: 200, height: 40, backgroundColor: '#rgba(238, 169, 91, 0.1)', borderColor: '#8a6d3b'}}inputStyle = {{color: '#8a6d3b', fontSize: 18}}iconSize = {
          15
        }
        value = {
          this.state.valueCustom
        }
        placeholder = 'Custom' placeholderTextColor = '#aaa' onChangeText = {
          text => this.setState({valueCustom: text})
        } />}
          topSeparator='full'
          bottomSeparator='full'/>
      </ScrollView>
    );
  }

}
