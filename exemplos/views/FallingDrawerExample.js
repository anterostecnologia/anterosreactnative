import React, { Component } from 'react';
import {
  Text
} from 'react-native'
import View from 'react-native-view'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import {AnterosNavigationPage, AnterosFallingDrawer} from 'anteros-react-native';

const renderScreen = (text) => <View flex vcenter hcenter><Text>{text}</Text></View>

const getScreen = (key, name, color, titleColor, hamburgerColor, iconName) => ({
  key,
  name,
  color,
  titleColor,
  hamburgerColor,
  render: () => renderScreen(name),
  customHeader: () => (
    <View row flex vcenter hcenter mdpt>
      <MAIcon name={iconName} size={30} color={titleColor} />
      <View mdpl />
      <Text style={{ color: titleColor, fontSize: 18 }}>{name}</Text>
    </View>
  )
})

const SCREENS = [
  getScreen("help", "Help", "#345979", "#fff", "#fff", "help"),
  getScreen("settings", "Settings", "#695876", "#fff", "#fff", "settings"),
  getScreen("history", "History", "#BA697F", "#fff", "#fff", "history"),
  getScreen("map", "Map", "#EE6D7C", "#fff", "#fff", "map"),
  getScreen("profile", "Profile", "#F7AE90", "#fff", "#fff", "person"),
]

export class FallingDrawerExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Falling drawer',
      showBackButton: true,
    };

  renderPage() {
    return (
      <View flex>
        <AnterosFallingDrawer screens={SCREENS} />
      </View>
    );
  }
}