// CheckboxExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Image} from 'react-native';

import {AnterosNavigationPage, AnterosListRow, AnterosCheckbox, AnterosLabel} from 'anteros-react-native';

export default class CheckboxExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Checkbox',
    showBackButton: true
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {
      checkedSM: false,
      checkedMD: false,
      checkedLG: false,
      checkedEmpty: false,
      checkedDisable: true,
      checkedCustom: false
    });
  }

  renderPage() {
    return (
      <ScrollView style={{
        flex: 1
      }}>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Size sm'
          detail={< AnterosCheckbox title = 'Checkbox' size = 'sm' checked = {
          this.state.checkedSM
        }
        onChange = {
          value => this.setState({checkedSM: value})
        } />}
          topSeparator='full'/>
        <AnterosListRow
          title='Size md'
          detail={< AnterosCheckbox title = 'Checkbox' size = 'md' checked = {
          this.state.checkedMD
        }
        onChange = {
          value => this.setState({checkedMD: value})
        } />}/>
        <AnterosListRow
          title='Size lg'
          detail={< AnterosCheckbox title = 'Checkbox' size = 'lg' checked = {
          this.state.checkedLG
        }
        onChange = {
          value => this.setState({checkedLG: value})
        } />}
          bottomSeparator='full'/>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Empty title'
          detail={< AnterosCheckbox checked = {
          this.state.checkedEmpty
        }
        onChange = {
          value => this.setState({checkedEmpty: value})
        } />}
          topSeparator='full'/>
        <AnterosListRow
          title='Disabled'
          detail={< AnterosCheckbox title = 'Checkbox' disabled = {
          true
        }
        checked = {
          this.state.checkedDisable
        }
        onChange = {
          value => this.setState({checkedDisable: value})
        } />}
          bottomSeparator='full'/>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Custom'
          detail={< AnterosCheckbox title = 'Custom' titleStyle = {{color: '#8a6d3b', paddingLeft: 4}}checkedIcon = { < Image style = {{width: 15, height: 15, tintColor: '#8a6d3b'}}source = {
            require('../icons/checkbox_checked.png')
          } />
        }
        uncheckedIcon = { < Image style = {{width: 15, height: 15, tintColor: '#8a6d3b'}}source = {
            require('../icons/checkbox_unchecked.png')
          } />
        }
        checked = {
          this.state.checkedCustom
        }
        onChange = {
          value => this.setState({checkedCustom: value})
        } />}
          topSeparator='full'
          bottomSeparator='full'/>
      </ScrollView>
    );
  }

}
