import React from 'react';
import {AnterosNavigationPage, AnterosPulseLoader} from 'anteros-react-native';

import { Dimensions } from "react-native";

export default class PulseLoaderExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Pulse loader',
      showBackButton: true
    }; 

  renderPage() {
    const { height, width } = Dimensions.get('window');
    const top = (height/2)-30;
    return (
      <AnterosPulseLoader
        avatar={'https://randomuser.me/api/portraits/women/60.jpg'} top={top}
      />
    );
  }
}