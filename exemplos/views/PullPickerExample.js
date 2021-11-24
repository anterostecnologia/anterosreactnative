// PullPickerExample.js

'use strict';

import {Component} from 'react';
import {View, ScrollView} from 'react-native';

import {AnterosNavigationPage, AnterosListRow, AnterosPullPicker} from 'anteros-react-native';

export class PullPickerExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'PullPicker',
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.items = [
      'Apple',
      'Banana',
      'Cherry',
      'Durian',
      'Filbert',
      'Grape',
      'Hickory',
      'Lemon',
      'Mango'
    ];
    Object.assign(this.state, {
      selectedIndex: null,
      modalSelectedIndex: null
    });
  }

  show() {
    AnterosPullPicker.show('Select item', this.items, this.state.selectedIndex, (item, index) => this.setState({selectedIndex: index}));
  }

  showModal() {
    AnterosPullPicker.show('Select item', this.items, this.state.modalSelectedIndex, (item, index) => this.setState({modalSelectedIndex: index}), {modal: true});
  }

  renderPage() {
    let {selectedIndex, modalSelectedIndex} = this.state;
    let selected = (selectedIndex || selectedIndex === 0)
      ? this.items[selectedIndex]
      : null;
    let modalSelected = (modalSelectedIndex || modalSelectedIndex === 0)
      ? this.items[modalSelectedIndex]
      : null;
    return (
      <ScrollView style={{
        flex: 1
      }}>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Default'
          detail={selected}
          onPress={() => this.show()}
          topSeparator='full'/>
        <AnterosListRow
          title='Modal'
          detail={modalSelected}
          onPress={() => this.showModal()}
          bottomSeparator='full'/>
      </ScrollView>
    );
  }

}
