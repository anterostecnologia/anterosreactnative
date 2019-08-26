// ListRowExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Image, Text} from 'react-native';

import {AnterosNavigationPage, AnterosListRow, AnterosLabel} from 'anteros-react-native';

export default class ListRowExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: ' ListRow',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
  }

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <AnterosListRow title='Title' detail='Detail' topSeparator='full' />
        <AnterosListRow title={<AnterosLabel style={{fontSize: 18, color: '#31708f'}} text='Custom title' />} />
        <AnterosListRow title='Custom detail' detail={
          <View style={{backgroundColor: '#5bc0de', width: 60, height: 24, borderRadius: 4}} />
        } />
        <AnterosListRow title='Long detail' detail={
          'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React.'
        } />
        <AnterosListRow title='Title place top' detail={
          'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React.'
        } titlePlace='top' />
        <AnterosListRow title='Icon' icon={require('../icons/config.png')} />
        <AnterosListRow title='Accessory indicator' accessory='indicator' />
        <AnterosListRow title='Custom accessory' accessory={<Image source={require('../icons/location.png')} />} />
        <AnterosListRow title='Press able' onPress={() => alert('Press!')} />
        <AnterosListRow
          title='Swipe able'
          detail='Swipe to show action buttons'
          swipeActions={[
            <AnterosListRow.SwipeActionButton title='Cancel' />,
            <AnterosListRow.SwipeActionButton title='Remove' type='danger' onPress={() => alert('Remove')}/>,          
          ]}
          bottomSeparator='full'
          />
      </ScrollView>
    );
  }

}
