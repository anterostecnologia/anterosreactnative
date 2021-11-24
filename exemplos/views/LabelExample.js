// LabelExample.js

'use strict';

import {Component} from 'react';
import {View, ScrollView} from 'react-native';

import {AnterosNavigationPage, AnterosListRow, AnterosLabel} from 'anteros-react-native';

export class LabelExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Label',
    showBackButton: true
  };

  renderPage() {
    return (
      <ScrollView style={{
        flex: 1
      }}>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Type default'
          detail={<AnterosLabel text = 'Label' />}
          topSeparator='full'/>
        <AnterosListRow
          title='Type title'
          detail={<AnterosLabel text = 'Label' type = 'title' />}/>
        <AnterosListRow
          title='Type detail'
          detail={<AnterosLabel text = 'Label' type = 'detail' />}/>
        <AnterosListRow
          title='Type danger'
          detail={<AnterosLabel text = 'Label' type = 'danger' />}
          bottomSeparator='full'/>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Size xs'
          detail={<AnterosLabel text = 'Label' size = 'xs' />}
          topSeparator='full'/>
        <AnterosListRow title='Size sm' detail={<AnterosLabel text = 'Label' size = 'sm' />}/>
        <AnterosListRow title='Size md' detail={<AnterosLabel text = 'Label' size = 'md' />}/>
        <AnterosListRow title='Size lg' detail={<AnterosLabel text = 'Label' size = 'lg' />}/>
        <AnterosListRow
          title='Size xl'
          detail={<AnterosLabel text = 'Label' size = 'xl' />}
          bottomSeparator='full'/>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Custom'
          detail={<AnterosLabel style = {{color: '#8a6d3b', fontSize: 16}} text = 'Custom' />}
          topSeparator='full'
          bottomSeparator='full'/>        
      </ScrollView>
    );
  }

}
