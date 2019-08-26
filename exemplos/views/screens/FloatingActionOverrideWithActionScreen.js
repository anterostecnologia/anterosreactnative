import React, { PureComponent } from 'react';
import { View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import {AnterosNavigationPage, AnterosFloatingAction} from 'anteros-react-native';
import Property from './Property';

export default class FloatingActionOverrideWithActionScreen extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'No list of actions',
    showBackButton: true
  };

  renderPage() {
    const actions = [{
      text: 'Accessibility',
      icon: require('../../images/ic_accessibility_white.png'),
      name: 'bt_accessibility',
      position: 1
    }];

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Property
            propertyName="overrideWithAction"
            propertyValue="true"
            defaultValue="false"
          />
          <AnterosFloatingAction
            actions={actions}
            overrideWithAction
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

