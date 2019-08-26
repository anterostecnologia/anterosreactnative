import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {AnterosNavigationPage, AnterosLabel, AnterosAvatar, AnterosBounceable} from 'anteros-react-native';

export default class BigSliderExample extends AnterosNavigationPage {
    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: "Bounceable",
      showBackButton: true
    };

    constructor() {
        super()
        this.state = { valA: 64, valB: 23 }
    }

    renderPage () {
        return (<View style={{flex:1, justifyContent:'space-around', alignItems:'center'}}>
                    <AnterosBounceable
                        onPress={()=>console.log("Pressed!")}
                        level={1.1} scale={2}>
                        <AnterosLabel text='Click Me!' size='lg'></AnterosLabel>
                    </AnterosBounceable>
                    <AnterosBounceable scale={3}>
                        <AnterosAvatar
                            large
                            rounded
                            source={{
                            uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
                        }}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}/>
                    </AnterosBounceable>
                </View>    
        )
    }
}