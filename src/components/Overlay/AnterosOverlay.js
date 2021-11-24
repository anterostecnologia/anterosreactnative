// AnterosOverlay.js

'use strict';

import React,{Component} from "react";
import {View} from 'react-native';

import {AnterosTopView} from './AnterosTopView';
import {AnterosOverlayView} from './AnterosOverlayView';
import {AnterosOverlayPullView} from './AnterosOverlayPullView';
import {AnterosOverlayPopView} from './AnterosOverlayPopView';
import {AnterosOverlayPopoverView} from './AnterosOverlayPopoverView';

export class AnterosOverlay {

  static View = AnterosOverlayView;
  static PullView = AnterosOverlayPullView;
  static PopView = AnterosOverlayPopView;
  static PopoverView = AnterosOverlayPopoverView;


  static show(overlayView) {
    let key;
    let onDisappearCompletedSave = overlayView.props.onDisappearCompleted;
    let element = React.cloneElement(overlayView, {
      onDisappearCompleted: () => {
        AnterosTopView.remove(key);
        onDisappearCompletedSave && onDisappearCompletedSave();
      }
    });
    key = AnterosTopView.add(element);
    return key;
  }

  static hide(key) {
    AnterosTopView.remove(key);
  }

  static transformRoot(transform, animated, animatesOnly = null) {
    AnterosTopView.transform(transform, animated, animatesOnly);
  }

  static restoreRoot(animated, animatesOnly = null) {
    TopView.restore(animated, animatesOnly);
  }

}