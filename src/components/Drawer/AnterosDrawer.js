// AnterosDrawer.js

'use strict';

import React, {Component} from "react";
import {View} from 'react-native';

import AnterosOverlay from '../Overlay/AnterosOverlay';

export default class AnterosDrawer extends AnterosOverlay {

  static DrawerView = AnterosOverlay.PullView;

  static open(view, side = 'left', rootTransform = 'none', options = {}) {
    let drawer;
    let key = super.show(
      <AnterosDrawer.DrawerView
        side={side}
        rootTransform={rootTransform}
        {...options}
        ref={v => drawer = v}>
        {view}
      </AnterosDrawer.DrawerView>
    );
    return {
      key: key,
      close: function (animated) {
        drawer && drawer.close(animated);
      }
    };
  }

}
