// TransformViewExample.js

'use strict';

import React, {Component} from 'react';
import {View, Image} from 'react-native';

import {AnterosTheme, AnterosNavigationPage, AnterosTransformView} from 'anteros-react-native';

export default class TransformViewExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: ' TransformView',
    showBackButton: true
  };

  renderPage() {
    return (
      <AnterosTransformView
        style={{
        backgroundColor: AnterosTheme.pageColor,
        flex: 1
      }}
        minScale={0.5}
        maxScale={2.5}>
        <Image
          style={{
          width: 375,
          height: 300
        }}
          resizeMode='cover'
          source={require('../images/teaset1.jpg')}/>
      </AnterosTransformView>
    );
  }

}
