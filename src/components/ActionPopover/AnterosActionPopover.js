// AnterosActionPopover.js

'use strict';

import React,{Component} from "react";

import {AnterosOverlay} from '../Overlay/AnterosOverlay';
import {AnterosActionPopoverView} from './AnterosActionPopoverView';

export class AnterosActionPopover extends AnterosOverlay {

  static ActionPopoverView = AnterosActionPopoverView;

  // fromBounds shape: x, y, width, height items shape   title:
  // PropTypes.string.isRequired,   onPress: PropTypes.func,
  static show(fromBounds, items, options = {}) {
    return super.show(<AnterosActionPopover.ActionPopoverView
      fromBounds={fromBounds}
      items={items}
      {...options}/>);
  }

}
