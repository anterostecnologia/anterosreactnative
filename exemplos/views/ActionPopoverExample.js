// ActionPopoverExample.js

'use strict';

import {Component} from 'react';
import {View} from 'react-native';

import {AnterosNavigationPage, AnterosActionPopover, AnterosButton} from 'anteros-react-native';

export class ActionPopoverExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'ActionPopover',
    showBackButton: true,
  };

  show(view) {
    view.measure((x, y, width, height, pageX, pageY) => {
      let items = [
        {title: 'Copy', onPress: () => alert('Copy')},
        {title: 'Remove', onPress: () => alert('Remove')},
        {title: 'Share', onPress: () => alert('Share')},
      ];
      AnterosActionPopover.show({x: pageX, y: pageY, width, height}, items);
    });
  }

  renderPage() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AnterosButton title='Show' ref='apButton' onPress={() => this.show(this.refs['apButton'])}/>
      </View>
    );
  }

}
