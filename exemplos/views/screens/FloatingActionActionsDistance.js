import React, { PureComponent } from 'react';
import { View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import {AnterosNavigationPage, AnterosFloatingAction} from 'anteros-react-native';
import Property from './Property';

export class FloatingActionRightScreen extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Change Actions Distance',
    showBackButton: true
  };


  renderPage() {
    const actions = [{
      text: 'Accessibility',
      icon: require('../../images/ic_accessibility_white.png'),
      name: 'bt_accessibility',
      position: 2
    }, {
      text: 'Language',
      icon: require('../../images/ic_language_white.png'),
      name: 'bt_language',
      position: 1
    }, {
      text: 'Location',
      icon: require('../../images/ic_room_white.png'),
      name: 'bt_room',
      position: 3
    }, {
      text: 'Video',
      icon: require('../../images/ic_videocam_white.png'),
      name: 'bt_videocam',
      position: 4
    }];

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Property
            propertyName="actionsPaddingTopBottom"
            propertyValue="18"
            defaultValue="8"
          />
          <AnterosFloatingAction
            actions={actions}
            actionsPaddingTopBottom={18}
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

