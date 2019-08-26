// ModalIndicator.js

'use strict';

import React, {Component} from "react";
import {View} from 'react-native';

import AnterosOverlay from '../Overlay/AnterosOverlay';
import AnterosModalIndicatorView from './AnterosModalIndicatorView';

let miKey = null;
let miOverlay = null;

export default class AnterosModalIndicator extends AnterosOverlay {

  static IndicatorView = AnterosModalIndicatorView;

  static show(text) {
    if (miOverlay) {
      miOverlay.text = text;
      return;
    }
    miKey = super.show(
      <AnterosModalIndicator.IndicatorView text={text} ref={v => miOverlay = v}/>
    );
  }

  static hide() {
    if (miKey) {
      super.hide(miKey);
      miKey = null;
      miOverlay = null;
    }
  }

}
