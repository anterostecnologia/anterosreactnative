// PopoverPickerExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';

import {AnterosNavigationPage, AnterosListRow, AnterosPopoverPicker} from 'anteros-react-native';

export default class PopoverPickerExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'PopoverPicker',
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

  show(view) {
    view.measure((x, y, width, height, pageX, pageY) => {
      AnterosPopoverPicker.show({
        x: pageX,
        y: pageY,
        width,
        height
      }, this.items, this.state.selectedIndex, (item, index) => this.setState({selectedIndex: index}));
    });
  }

  showModal(view) {
    view.measure((x, y, width, height, pageX, pageY) => {
      AnterosPopoverPicker.show({
        x: pageX,
        y: pageY,
        width,
        height
      }, this.items, this.state.modalSelectedIndex, (item, index) => this.setState({modalSelectedIndex: index}), {modal: true});
    });
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
          ref='defaultRow'
          onPress={() => this.show(this.refs['defaultRow'])}
          topSeparator='full'/>
        <AnterosListRow
          title='Modal'
          detail={modalSelected}
          ref='modalRow'
          onPress={() => this.showModal(this.refs['modalRow'])}
          bottomSeparator='full'/>
      </ScrollView>
    );
  }

}
