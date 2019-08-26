'use strict';

import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {AnterosNavigationPage, AnterosModalIndicator, AnterosText,AnterosModalWalkThrough} from 'anteros-react-native';

export default class ModalWalkThroughExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Modal walkthrough',
    showBackButton: true,
  };

  renderPage(){
    return (<AnterosModalWalkThrough
                visible={true}>
                {['scene1', 'scene2'].map(scene => (
                <View>
                    <AnterosText>{scene}</AnterosText>
                </View>
                ))}
            </AnterosModalWalkThrough>);
  }
}
