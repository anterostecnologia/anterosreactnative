// DrawerExample.js

'use strict';

import {Component} from 'react';
import {View, ScrollView, Image} from 'react-native';

import {
  AnterosTheme,
  AnterosNavigationPage,
  AnterosListRow,
  AnterosDrawer,
  AnterosButton,
  AnterosLabel
} from 'anteros-react-native';
import SelectRow from './SelectRow';

export class DrawerExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Drawer',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {
      rootTransform: 'none',
    });
  }

  show(side) {
    let {rootTransform} = this.state;
    if (side == 'left' || side == 'right') {
      this.drawer = AnterosDrawer.open(this.renderDrawerMenu(), side, rootTransform);
    } else {
      this.drawer = AnterosDrawer.open(this.renderDrawerBox(side), side, rootTransform, {containerStyle: {backgroundColor: 'rgba(0, 0, 0, 0)'}});
    }
  }

  renderDrawerMenu() {
    return (
      <View style={{backgroundColor: AnterosTheme.defaultColor, width: 260, flex: 1}}>
        <View style={{height: 60}} />
        <AnterosListRow
          icon={
            <View style={{paddingRight: 12}}>
              <Image style={{width: 30, height: 30, tintColor: AnterosTheme.primaryColor}} source={require('../icons/me_active.png')} />
            </View>
          }
          title='User name'
          />
        <AnterosListRow
          icon={require('../icons/home_active.png')}
          title='Home'
          />
        <AnterosListRow
          icon={require('../icons/store_active.png')}
          title='Store'
          bottomSeparator='none'
          />
        <View style={{flex: 1}} />
        <AnterosButton type='link' size='sm' title='Hide' onPress={() => this.drawer && this.drawer.close()} />
      </View>
    );
  }

  renderDrawerBox(side) {
    //Overflow is not supported on Android, then use a higher container view to implement this functionality
    return (
      <View style={{
        height: 290,
        justifyContent: side == 'top' ? 'flex-start' : 'flex-end',
      }}>
        <View style={{backgroundColor: AnterosTheme.defaultColor, height: 260}}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <AnterosLabel type='detail' size='xl' text='Drawer' />
          </View>
        </View>
        <Image
          style={{
            position: 'absolute',
            top: side == 'bottom' ? 0 : undefined,
            bottom: side == 'top' ? 0 : undefined,
            left: 12,
            width: 60,
            height: 60,
            borderRadius: 30
          }}
          source={require('../images/faircup.jpg')}
          />
      </View>
    );
  }

  renderPage() {
    let {rootTransform} = this.state;
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <AnterosListRow title='Left side' onPress={() => this.show('left')} topSeparator='full' />
        <AnterosListRow title='Right side' onPress={() => this.show('right')} />
        <AnterosListRow title='Top side' onPress={() => this.show('top')} />
        <AnterosListRow title='Bottom side' onPress={() => this.show('bottom')} bottomSeparator='full'/>
        <View style={{height: 20}} />
        <SelectRow
          title='Root transform'
          value={rootTransform}
          items={['none', 'translate', 'scale']}
          onSelected={(item, index) => this.setState({rootTransform: item})}
          topSeparator='full'
          bottomSeparator='full'
          />
      </ScrollView>
    );
  }

}