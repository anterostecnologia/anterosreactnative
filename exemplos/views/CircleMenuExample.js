import {Component} from 'react'
import {View} from 'react-native'
import {AnterosNavigationPage, AnterosCircleMenu} from 'anteros-react-native';

const styles = {
  container: {
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    flex: 1,
    justifyContent: 'center'
  },
  actionButtonIcon: {
    color: '#FFF',
    fontSize: 20,
    height: 22
  }
};

export class CircleMenuExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Circle menu',
    showBackButton: true
  };

  items = [
    {
      name: 'md-home',
      color: '#298CFF',
    },
    {
      name: 'md-search',
      color: '#30A400',
    },
    {
      name: 'md-time',
      color: '#FF4B32',
    },
    {
      name: 'md-settings',
      color: '#8A39FF',
    },
    {
      name: 'md-navigate',
      color: '#FF6A00',
    },
  ];

  onPress = index => console.warn(`${this.items[index].name} icon pressed!`);

  renderPage() {
    return <View style={styles.container}>
      <AnterosCircleMenu
        bgColor="#0E1329"
        items={this.items}
        onPress={this.onPress}
      />
    </View>
  }
}