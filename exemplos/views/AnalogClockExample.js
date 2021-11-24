
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {AnterosNavigationPage, AnterosAnalogClock} from 'anteros-react-native';

export class AnalogClockExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Analog clock',
      showBackButton: true
    };

    renderPage() {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>  
          <AnterosAnalogClock
            minuteHandLength={110}
          />  
        </View>
      )
    }
  }