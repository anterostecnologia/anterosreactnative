// ActionSheet.js

'use strict';

import React, {Component} from "react";
import {View} from 'react-native';

import AnterosOverlay from '../Overlay/AnterosOverlay';
import AnterosActionSheetView from './AnterosActionSheetView';

export default class AnterosActionSheet extends AnterosOverlay {

  static ActionSheetView = AnterosActionSheetView;

  // items and cancelItem shape   title: PropTypes.string.isRequired,   onPress:
  // PropTypes.func,   disabled: PropTypes.bool,
  static show(items, cancelItem, options = {}) {
    return super.show(<AnterosActionSheet.ActionSheetView
      items={items}
      cancelItem={cancelItem}
      {...options}/>);
  }

}
