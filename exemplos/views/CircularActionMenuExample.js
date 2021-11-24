import {Component} from 'react'
import {View} from 'react-native'
import {AnterosNavigationPage, AnterosIcon, AnterosCircularActionMenu} from 'anteros-react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = {
  container: {
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    flex: 1,
    justifyContent: 'center'
  },
  actionButtonIcon: {
    color: 'white',
    fontSize: 20,
    height: 30
  }
};

export class CircularActionMenuExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Circular action menu',
    showBackButton: true
  };

  renderPage() {
    return <View style={styles.container}>
                <AnterosCircularActionMenu buttonColor="rgba(231,76,60,1)">
                    <AnterosCircularActionMenu.Item size={53} buttonColor='#9b59b6'  onPress={() => console.log("notes tapped!")}>
                        <AnterosIcon name="ios-briefcase-outline" type='ionicon' size={30} color='white' />
                    </AnterosCircularActionMenu.Item>
                    <AnterosCircularActionMenu.Item size={53} buttonColor='#3498db' onPress={() => {}}>
                        <AnterosIcon name="ios-chatbubbles-outline" type='ionicon' size={30} color='white' />
                    </AnterosCircularActionMenu.Item>
                    <AnterosCircularActionMenu.Item size={53} buttonColor='#1abc9c'  onPress={() => {}}>
                        <AnterosIcon name="ios-clock-outline" type='ionicon' size={30} color='white' />
                    </AnterosCircularActionMenu.Item>
                    <AnterosCircularActionMenu.Item size={53} buttonColor='#FDD835'  onPress={() => {}}>
                        <AnterosIcon name="ios-cloud-done-outline" type='ionicon' size={30} color='white' />
                    </AnterosCircularActionMenu.Item>
                    <AnterosCircularActionMenu.Item size={53} buttonColor='#9C27B0'  onPress={() => {}}>
                        <AnterosIcon name="ios-lock-outline" type='ionicon' size={30} color='white' />
                    </AnterosCircularActionMenu.Item>                    
                </AnterosCircularActionMenu>
            </View>
  }
}