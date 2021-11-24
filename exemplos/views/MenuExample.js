// MenuExample.js

'use strict';

import {Component} from 'react';
import {View} from 'react-native';

import {AnterosNavigationPage, AnterosMenu, AnterosButton, AnterosTheme} from 'anteros-react-native';

export class MenuExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Menu',
    showBackButton: true
  };

  show(view, align) {
    view.measure((x, y, width, height, pageX, pageY) => {
      let items = [
        {
          title: 'Search',
          icon: require('../icons/search.png'),
          onPress: () => alert('Search')
        }, {
          title: 'Edit',
          icon: require('../icons/edit.png'),
          onPress: () => alert('Edit')
        }, {
          title: 'Remove',
          icon: require('../icons/trash.png'),
          onPress: () => alert('Remove')
        }
      ];
      AnterosMenu.show({
        x: pageX,
        y: pageY,
        width,
        height
      }, items, {align});
    });
  }

  renderPage() {
    return (
      <View
        style={{
        flex: 1,
        justifyContent: 'space-between'
      }}>
        <View
          style={{
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}>
          <AnterosButton
            title='Start'
            ref='btn1'
            onPress={() => this.show(this.refs['btn1'], 'start')}/>
          <AnterosButton
            title='Center'
            ref='btn2'
            onPress={() => this.show(this.refs['btn2'], 'center')}/>
          <AnterosButton
            title='End'
            ref='btn3'
            onPress={() => this.show(this.refs['btn3'], 'end')}/>
        </View>
        <View style={{
          flex: 1
        }}/>
        <View
          style={{
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}>
          <AnterosButton
            title='Start'
            ref='btn4'
            onPress={() => this.show(this.refs['btn4'], 'start')}/>
          <AnterosButton
            title='Center'
            ref='btn5'
            onPress={() => this.show(this.refs['btn5'], 'center')}/>
          <AnterosButton
            title='End'
            ref='btn6'
            onPress={() => this.show(this.refs['btn6'], 'end')}/>
        </View>
        <View style={{
          height: AnterosTheme.screenInset.bottom
        }}/>
      </View>
    );
  }

}
