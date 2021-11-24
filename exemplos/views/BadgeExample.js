// BadgeExample.js

"use strict";

import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";

import {
  AnterosNavigationPage,
  AnterosListRow,
  AnterosBadge
} from "anteros-react-native";


export class BadgeExample extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Badge",
    showBackButton: true
  };

  renderPage() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <AnterosListRow title='Type capsule' detail={
          <View style={{flexDirection: 'row'}}>
            <AnterosBadge count={6} />
            <View style={{width: 4}} />
            <AnterosBadge count={68} />
            <View style={{width: 4}} />
            <AnterosBadge count={689} />
            <View style={{width: 4}} />
            <AnterosBadge count='new' />
          </View>
        } topSeparator='full' />
        <AnterosListRow title='Type square' detail={
          <View style={{flexDirection: 'row'}}>
            <AnterosBadge type='square' count={6} />
            <View style={{width: 4}} />
            <AnterosBadge type='square' count={68} />
            <View style={{width: 4}} />
            <AnterosBadge type='square' count={689} />
            <View style={{width: 4}} />
            <AnterosBadge type='square' count='new' />
          </View>
        } />
        <AnterosListRow title='Type dot' detail={<AnterosBadge type='dot' />} bottomSeparator='full' />
        <View style={{height: 20}} />
        <AnterosListRow title='Custom' detail={
          <View style={{flexDirection: 'row'}}>
            <AnterosBadge style={{backgroundColor: '#5bc0de'}} type='square' count=' ' />
            <View style={{width: 4}} />
            <AnterosBadge style={{backgroundColor: '#777', paddingLeft: 0, paddingRight: 0}}>
              <Text style={{color: '#fff'}}>$</Text>
            </AnterosBadge>
          </View>
        } topSeparator='full' bottomSeparator='full' />

      </ScrollView>
    );
  }
}

