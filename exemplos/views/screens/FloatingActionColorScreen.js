import React, { PureComponent } from 'react';
import { View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import {AnterosNavigationPage, AnterosFloatingAction} from 'anteros-react-native';
import Property from './Property';

export class FloatingActionColorScreen extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Right screen',
    showBackButton: true
  };

  renderPage() {
    const actions = [{
      color: '#FF4B4B',
      text: 'Accessibility',
      icon: require('../../images/ic_accessibility_white.png'),
      name: 'bt_accessibility',
      position: 2
    }, {
      color: '#FF4B4B',
      text: 'Language',
      icon: require('../../images/ic_language_white.png'),
      name: 'bt_language',
      position: 1
    }, {
      color: '#FF4B4B',
      text: 'Location',
      icon: require('../../images/ic_room_white.png'),
      name: 'bt_room',
      position: 3
    }, {
      color: '#FF4B4B',
      text: 'Video',
      icon: require('../../images/ic_videocam_white.png'),
      name: 'bt_videocam',
      position: 4
    }];

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Property
            propertyName="buttonColor (main action)"
            propertyValue="#FF4B4B"
            defaultValue="#1253bc"
          />
          <Property
            propertyName="color (sub actions)"
            propertyValue="#FF4B4B"
            defaultValue="#1253bc"
          />
          <AnterosFloatingAction
            buttonColor="#FF4B4B"
            actions={actions}
            position="right"
            onPressItem={
              (name) => {
                Alert.alert('Icon pressed', `the icon ${name} was pressed`);
              }
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});


