// PopoverPicker.js

'use strict';

import React,{Component} from "react";
import {View} from 'react-native';

import {AnterosOverlay} from '../Overlay/AnterosOverlay';
import {AnterosPopoverPickerView} from './AnterosPopoverPickerView';

export class AnterosPopoverPicker extends AnterosOverlay {

  static PopoverPickerView = AnterosPopoverPickerView;

  // fromBounds shape: x, y, width, height
  // items: array of string
  static show(fromBounds, items, selectedIndex, onSelected, options = {}) {
    return super.show(
      <this.PopoverPickerView
        fromBounds={fromBounds}
        items={items}
        selectedIndex={selectedIndex}
        onSelected={onSelected}
        {...options}
        />
    );
  }

}

