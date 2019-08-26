

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ViewPropTypes,
  Platform
} from 'react-native';

import {AnterosNavigationPage, AnterosDateHistoryPicker, AnterosSeparator} from 'anteros-react-native';

export default class DatehistoryPickerExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Date history picker',
    showBackButton: true
  };

  renderPage(){
    return (<ScrollView>        
              <View style={{flex:1, justifyContent:'space-around', alignItems:'center'}}>
                <AnterosDateHistoryPicker style={{margin: 20}} historyDay={15} highlightColor={'#6A1B9A'}/>
                <AnterosSeparator/>
                <AnterosDateHistoryPicker style={{margin: 20}} daySize={75} historyDay={15} highlightColor={'#1976D2'}/>
              </View>
           </ScrollView>);
  }
}