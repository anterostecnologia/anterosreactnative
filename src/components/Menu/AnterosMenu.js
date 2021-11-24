// Menu.js

'use strict';

import React,{Component} from "react";
import {View} from 'react-native';

import {AnterosOverlay} from '../Overlay/AnterosOverlay';
import {AnterosMenuView} from './AnterosMenuView';

export class AnterosMenu extends AnterosOverlay {

  static MenuView = AnterosMenuView;

  // fromBounds shape: x, y, width, height
  // items shape
  //   title: PropTypes.string,
  //   icon: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({uri: PropTypes.string}), PropTypes.number, PropTypes.oneOf(['none', 'empty'])]),
  //   onPress: PropTypes.func,
  static show(fromBounds, items, options = {}) {
    return super.show(
      <AnterosMenu.MenuView fromBounds={fromBounds} items={items} {...options} />
    );
  }

}

