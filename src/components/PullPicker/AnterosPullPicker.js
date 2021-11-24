// PullPicker.js

'use strict';

import React,{Component} from "react";
import {View} from 'react-native';

import {AnterosOverlay} from '../Overlay/AnterosOverlay';
import {AnterosPullPickerView} from './AnterosPullPickerView';

export class AnterosPullPicker extends AnterosOverlay {

  constructor(props){
    super(props);
  }

  static PullPickerView = AnterosPullPickerView;

  // items: array of string
  static show(title, items, selectedIndex, onSelected, options = {}, pickerTitleStyle,popupHeight) {
    return super.show(
      <this.PullPickerView
        popupHeight={popupHeight}
        pickerTitleStyle={pickerTitleStyle}
        title={title}
        items={items}
        selectedIndex={selectedIndex}
        onSelected={onSelected}
        {...options}
        />
    );
  }
}