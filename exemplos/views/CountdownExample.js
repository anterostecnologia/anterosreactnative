
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ViewPropTypes,
  Platform
} from 'react-native';

import {AnterosNavigationPage, AnterosCountdown, AnterosSeparator} from 'anteros-react-native';

export default class CountdownExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Countdown',
    showBackButton: true
  };

  renderPage(){
      return (<View style={{flex:1, alignItems:'center', justifyContent:'space-around'}}>
                <AnterosCountdown
                    until={10}
                    onFinish={() => alert('finished')}
                    onPress={() => alert('hello')}
                    size={20}
                />
              <AnterosSeparator/>
              <AnterosCountdown.Circle
                    seconds={10}
                    radius={30}
                    borderWidth={8}
                    color="#ff003f"
                    bgColor="#fff"
                    textStyle={{ fontSize: 20 }}
                    onTimeElapsed={() => console.log('Elapsed!')}
                />
                <AnterosSeparator/>
                <AnterosCountdown.Timer
                  date="2018-11-28T00:00:00+00:00"
                  days={{plural: ' Days ',singular: ' day '}}
                  hours=':'
                  mins=':'
                  secs=''

                  daysStyle={styles.time}
                  hoursStyle={styles.time}
                  minsStyle={styles.time}
                  secsStyle={styles.time}
                  firstColonStyle={styles.colon}
                  secondColonStyle={styles.colon}
              />
      </View>);
  }
}


const styles = StyleSheet.create({

  cardItemTimeRemainTxt: {
    fontSize: 20,
    color: '#ee394b'
  },
  container: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    marginTop:20
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  },
  time: {
    paddingHorizontal: 3,
    backgroundColor: '#CDDC39',
    fontSize: 28,
    color: '#9C27B0',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  colon: {
    fontSize: 28, color: 'rgba(85, 85, 85, 1)'
  },
  cardItemMask:{
    position: 'absolute',
    top: 15,
    right:10,
    backgroundColor: 'transparent'
  },
  cardItemTimer:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardItemTimerIcon: {
    width:11,
    height: 11,
  },
  cardItem: {
    flexDirection: 'column',
    backgroundColor:'red',
    marginTop:20,
    width: 370,
    height: 370 * 0.65625,
  },
  cardItemMainPic: {
     width: 370,
    height: 370 * 0.65625,
  },
});