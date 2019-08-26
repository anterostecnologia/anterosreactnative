import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';

import {AnterosNavigationPage, AnterosConfirmationCodeInput} from 'anteros-react-native';

export default class ConfirmationCodeInputexample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Confirmation code',
    showBackButton: true
  };

  constructor(props) {
    super(props);
    
    this.state = {
      code: ''
    };
  }
  
  _onFulfill(code) {
    // TODO: call API to check code here
    // If code does not match, clear input with: this.refs.codeInputRef1.clear()
    if (code == 'Q234E') {
      Alert.alert(
        'Confirmation Code',
        'Successful!',
        [{text: 'OK'}],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        'Confirmation Code',
        'Code not match!',
        [{text: 'OK'}],
        { cancelable: false }
      );
      
      this.refs.codeInputRef1.clear();
    }
  }
  
  _onFinishCheckingCode1(isValid) {
    console.log(isValid);
    if (!isValid) {
      Alert.alert(
        'Confirmation Code',
        'Code not match!',
        [{text: 'OK'}],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        'Confirmation Code',
        'Successful!',
        [{text: 'OK'}],
        { cancelable: false }
      );
    }
  }
  
  _onFinishCheckingCode2(isValid, code) {
    console.log(isValid);
    if (!isValid) {
      Alert.alert(
        'Confirmation Code',
        'Code not match!',
        [{text: 'OK'}],
        { cancelable: false }
      );
    } else {
      this.setState({ code });
      Alert.alert(
        'Confirmation Code',
        'Successful!',
        [{text: 'OK'}],
        { cancelable: false }
      );
    }
  }
  
  renderPage() {
    
    return (
      <View style={styles.container}>
        <ScrollView style={styles.wrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>CODE INPUT DEMO</Text>
          </View>
          
          <View style={styles.inputWrapper1}>
            <Text style={styles.inputLabel1}>UNDERLINE CONFIRMATION CODE</Text>
            <AnterosConfirmationCodeInput
              ref="codeInputRef1"
              secureTextEntry
              className={'border-b'}
              space={5}
              size={30}
              inputPosition='left'
              onFulfill={(code) => this._onFulfill(code)}
            />
          </View>
  
          <View style={styles.inputWrapper2}>
            <Text style={styles.inputLabel2}>BOX CONFIRMATION CODE</Text>
            <AnterosConfirmationCodeInput
              ref="codeInputRef2"
              secureTextEntry
              compareWithCode='AsDW2'
              activeColor='#FDD835'
              inactiveColor='#FFF59D'
              autoFocus={false}
              ignoreCase={true}
              inputPosition='center'
              size={50}
              onFulfill={(isValid) => this._onFinishCheckingCode1(isValid)}
              containerStyle={{ marginTop: 30 }}
              codeInputStyle={{ borderWidth: 1.5 }}
            />
          </View>
  
          <View style={styles.inputWrapper3}>
            <Text style={styles.inputLabel3}>CIRCLE CONFIRMATION CODE</Text>
            <AnterosConfirmationCodeInput
              ref="codeInputRef2"
              keyboardType="numeric"
              codeLength={5}
              className={'border-circle'}
              compareWithCode='12345'
              autoFocus={false}
              codeInputStyle={{ fontWeight: '800' }}
              onFulfill={(isValid, code) => this._onFinishCheckingCode2(isValid, code)}
            />
          </View>
        </ScrollView> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD'
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    color: '#0D47A1',
    fontSize: 16,
    fontWeight: '800',
    paddingVertical: 20
  },
  wrapper: {
    marginTop: 30
  },
  inputWrapper1: {
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: '#1976D2'
  },
  inputWrapper2: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: '#1565C0'
  },
  inputWrapper3: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: '#0D47A1'
  },
  inputLabel1: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800'
  },
  inputLabel2: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center'
  },
  inputLabel3: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center'
  }
});