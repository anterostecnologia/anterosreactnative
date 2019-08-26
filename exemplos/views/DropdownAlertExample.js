import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, FlatList, Image, StatusBar, View } from 'react-native';
import {AnterosNavigationPage, AnterosDropdownAlert} from 'anteros-react-native';
const MAIN_INFO_COLOR = '#2B73B6';
const MAIN_WARN_COLOR = '#cd853f';
const MAIN_ERROR_COLOR = '#cc3232';
const MAIN_SUCCESS_COLOR = '#32A54A';
const MAIN_CUSTOM_COLOR = '#6441A4';
const MAIN_DISMISS_COLOR = '#748182';
const items = [
  {
    backgroundColor: MAIN_INFO_COLOR,
    type: 'info',
    message: "System is going down at 12 AM tonight for routine maintenance. We'll notify you when the system is back online.",
  },
  {
    backgroundColor: MAIN_WARN_COLOR,
    type: 'warn',
    message: 'Your cloud drive is about to reach capacity. Please consider upgrading to premium plan.',
  },
  {
    backgroundColor: MAIN_ERROR_COLOR,
    type: 'error',
    message: "Sorry, we're having some technical difficulties. Our team will get this fixed for you ASAP.",
  },
  {
    backgroundColor: MAIN_SUCCESS_COLOR,
    type: 'success',
    message: "Thank you for your order. We will email and charge you when it's on it's way.",
  },
  {
    backgroundColor: MAIN_CUSTOM_COLOR,
    type: 'custom',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  { backgroundColor: MAIN_DISMISS_COLOR, type: 'close', title: 'close' },
];

export default class DropdownAlertExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Dropdown alert',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
  }
  itemAction(item) {
    switch (item.type) {
      case 'close':
        this.closeAction();
        break;
      default:
        const random = Math.floor(Math.random() * 1000 + 1);
        const title = item.type + ' #' + random;
        this.dropdown.alertWithType(item.type, title, item.message);
    }
  }
  closeAction() {
    this.dropdown.close();
  }
  handleClose(data) {
    console.log(data);
  }
  handleCancel(data) {
    console.log(data);
  }
  renderItem({ item, index }) {
    return (
      <TouchableOpacity style={[styles.button, { borderColor: item.backgroundColor }]} onPress={() => this.itemAction(item)}>
        <Text style={[styles.text, { color: item.backgroundColor }]}>{item.type}</Text>
      </TouchableOpacity>
    );
  }
  renderImage(props) {
    return (
      <Image style={props.imageStyle} source={{ uri: props.imageSrc }} />
    );
  }
  renderPage() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.listContainer} keyExtractor={item => item.type} data={items} renderItem={({ item, index }) => this.renderItem({ item, index })} />
        <AnterosDropdownAlert
          ref={ref => this.dropdown = ref}
          containerStyle={{
            backgroundColor: MAIN_CUSTOM_COLOR,
          }}
          showCancel={true}
          onClose={data => this.handleClose(data)}
          onCancel={data => this.handleCancel(data)}
          imageSrc={'https://facebook.github.io/react-native/docs/assets/favicon.png'}
          renderImage={(props) => this.renderImage(props)}
          renderCancel={(props) => this.renderImage(props)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContainer: {
    paddingTop: 22,
  },
  button: {
    padding: 8,
    alignItems: 'center',
    borderRadius: 8,
    margin: 8,
    borderWidth: 1,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});