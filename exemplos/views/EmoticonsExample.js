import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View
} from 'react-native';
import {AnterosNavigationPage, AnterosEmoticons} from 'anteros-react-native';

export class EmoticonsExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Emoticons',
    showBackButton: true,
  };

  constructor(props){
      super(props);
      this._onEmoticonPress = this._onEmoticonPress.bind(this);
      this._onBackspacePress = this._onBackspacePress.bind(this);
      this.state = {showEmoticons: true};
  }
  
  _onBackspacePress(){

  }
  _onEmoticonPress(){

  }

  renderPage() {
    const borderRadius = Dimensions.get('window').width * 0.5
    return (
      <View style={{flex: 1}}>
        <AnterosEmoticons
            onEmoticonPress={this._onEmoticonPress.bind(this)}
            onBackspacePress={this._onBackspacePress.bind(this)}
            show={this.state.showEmoticons}
            concise={true}
            showHistoryBar={true}
            showPlusBar={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  responderStyle: {
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: 'rgba(0,0,0,.7)',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  wheelWrapper: {
    borderRadius: 120,
    elevation: 5,
    padding: 0,
    shadowColor: 'rgba(0,0,0,.7)',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    zIndex: 1,
  },
})