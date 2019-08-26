import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {AnterosNavigationPage, AnterosHyperlink, AnterosDivider, AnterosGrid} from 'anteros-react-native';

export default class HyperlinkExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Hyperlink',
    showBackButton: true,
  };

  renderPage() {
      return ( 
            <View>
                <AnterosHyperlink linkDefault={ true } linkStyle={{color: '#2980b9', fontSize: 16 }}>
                    <Text style={ { fontSize: 15 } } >
                    This text will be parsed to check for clickable strings like https://github.com/obipawan/hyperlink and made clickable.
                    </Text>
                </AnterosHyperlink>
                <AnterosDivider/>
                <AnterosHyperlink onLongPress={ (url, text) => alert(url + ", " + text) } linkStyle={ { color: '#2980b9', fontSize: 16 }}>
                    <Text style={ { fontSize: 15 } }>
                        This text will be parsed to check for clickable strings like https://github.com/obipawan/hyperlink and made clickable for long click.
                    </Text>
                </AnterosHyperlink>
                <AnterosDivider/>
                <AnterosHyperlink onPress={ (url, text) => alert(url + ", " + text) } linkStyle={ { color: '#2980b9', fontSize: 16 }}>
                    <View>
                        <Text style={ { fontSize: 15 } }>
                            A nested Text component https://facebook.github.io/react-native/docs/text.html works equally well <Text>with https://github.com/obipawan/hyperlink</Text>
                        </Text>
                    </View>
                </AnterosHyperlink>
                <AnterosDivider/>
                <AnterosHyperlink linkStyle={ { color: '#2980b9', fontSize: 16 } }>
                    <Text style={ { fontSize: 15 } }>
                        Make clickable strings like https://github.com/obipawan/hyperlink stylable
                    </Text>
                </AnterosHyperlink>
                <AnterosDivider/>
                <AnterosHyperlink linkStyle={ { color: '#2980b9', fontSize: 16 } } linkText={ url => url === 'https://github.com/obipawan/hyperlink' ? 'Hyperlink' : url }>
                    <Text style={ { fontSize: 15 } }>
                        Make clickable strings cleaner with https://github.com/obipawan/hyperlink
                    </Text>
                </AnterosHyperlink>
            </View>
      );
    }
}
