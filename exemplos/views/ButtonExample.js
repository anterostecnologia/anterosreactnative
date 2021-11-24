// ButtonExample.js

'use strict';

import {Component} from 'react';
import {View, ScrollView, Text, Image, StyleSheet} from 'react-native';

import {AnterosNavigationPage, AnterosListRow, AnterosLabel, AnterosTheme,
  AnterosIcon, AnterosButton, AnterosButtonGroup} from 'anteros-react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import FloatingActionExample from './FloatingActionExample';


export class ButtonExample extends AnterosNavigationPage {

  static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Buttons',
      showBackButton: true
  };
  constructor(props) {
      super(props);
      this.modal1 = this
          .modal1
          .bind(this);          
      this.modal2 = this
          .modal2
          .bind(this);     
           
  }

  renderRow = (highlighted) => {
      if (Platform.OS !== 'android') {
          return <View
              style={[
              {
                  backgroundColor: '#f0f0f0',
                  height: 1
              },
              highlighted && {
                  marginLeft: 0
              }
          ]}/>;
      }

      return null;
  };

  modal1() {
      this
          .navigator
          .push({view: <ButtonExample1/>})
  }

  modal2() {
      this
          .navigator
          .push({view: <FloatingActionExample/>})
  }



  renderPage() {
      return (
          <ScrollView style={{
              flex: 1
          }}>
              <View style={{
                  height: 20
              }}/>
              <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                      iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='square' 
                      title='Buttons' onPress={this.modal1} topSeparator='full'/>
              <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                      iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='circle' 
                      title='Floating buttons' onPress={this.modal2} topSeparator='full'/>              
          </ScrollView>
      );
  }
}

const stylesList = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff'
  },
  row: {
      paddingHorizontal: 10,
      paddingVertical: 20
  }
});





class ButtonExample1 extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Buttons',
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      selectedIndexes: [0, 2, 3]
    };
  }

  renderPage() {
   let linearProps = {};
   linearProps.start={x: 0.0, y: 0.25};
   linearProps.end={x: 0.5, y: 1.0};
   linearProps.locations=[0,0.5,0.6];
   linearProps.colors=['#4FC3F7', '#0288D1', '#0277BD'];

    return (
      <ScrollView style={styles.container}>
        <View style={styles.contentView}>
          <View style={{alignItems: 'center'}}>
            <AnterosButton
              title='LOG IN'
              buttonStyle={{backgroundColor: '#AB47BC', borderWidth: 2, borderColor: 'white', borderRadius: 30}}
              containerStyle={{marginVertical: 10, height: 50, width: 250 }}
              titleStyle={{fontWeight: 'bold'}}
            />
            <AnterosButton
              title='Log in'
              loading={false}
              loadingProps={{size: 'small', color: 'white'}}
              buttonStyle={{backgroundColor: 'rgba(111, 202, 186, 1)', borderRadius: 5}}
              titleStyle={{fontWeight: 'bold', fontSize: 23}}
              containerStyle={{marginVertical: 10, height: 50, width: 230}}
              onPress={() => console.log('aye')}
              underlayColor="transparent"
            />
            {<AnterosButton
              title="Add to Cart"
              titleStyle={{fontWeight: 'bold', fontSize: 18}}
              linearGradientProps={linearProps}
              buttonStyle={{borderWidth: 0, borderColor: 'transparent', borderRadius: 20}}
              containerStyle={{marginVertical: 10, height: 40, width: 200}}
              icon={
                <AnterosIcon
                  name='arrow-right'
                  type='font-awesome'
                  size={15}
                  color='white'
                />
              }
              iconRight
              iconContainerStyle={{marginLeft: 5}}
            />}
            <AnterosButton
              title="Request an agent"
              titleStyle={{fontWeight: '500'}}
              buttonStyle={{backgroundColor: 'rgba(199, 43, 98, 1)', borderColor: 'transparent', borderWidth: 0}}
              containerStyle={{marginTop: 10, width: 275, height: 45}}
            />
            <AnterosButton
              title="SIGN UP"
              disabled={true}
              titleStyle={{fontWeight: '700'}}
              buttonStyle={{backgroundColor: '#FFB300', borderColor: 'transparent', borderWidth: 0, borderRadius: 5}}
              containerStyle={{marginTop: 20, width: 300, height: 45}}
            />
            <AnterosButton
              title="SIGN UP"
              loading={true}
              loadingProps={{size: 'large', color: 'rgba(111, 202, 186, 1)'}}
              titleStyle={{fontWeight: '700'}}
              buttonStyle={{backgroundColor: 'rgba(92, 99,216, 1)', borderColor: 'transparent', borderWidth: 0, borderRadius: 5, paddingVertical: 10}}
              containerStyle={{marginTop: 20, width: 300, height: 45}}
            />
            <View style={styles.buttonsContainer}>
              <AnterosButton
                title="HOME"
                icon={
                  <AnterosIcon
                    name='home'
                    type='font-awesome'
                    size={15}
                    color='white'
                  />
                }
                iconContainerStyle={{marginRight: 10}}
                titleStyle={{fontWeight: '700'}}
                buttonStyle={{backgroundColor: 'rgba(90, 154, 230, 1)', borderColor: 'transparent', borderWidth: 0, borderRadius: 30}}
                containerStyle={{width: 130}}
              />
              <AnterosButton
                title="PROFILE"
                icon={
                  <AnterosIcon
                    name='user'
                    type='font-awesome'
                    size={15}
                    color='white'
                  />
                }
                iconRight
                iconContainerStyle={{marginLeft: 10}}
                titleStyle={{fontWeight: '700'}}
                buttonStyle={{backgroundColor: 'rgba(199, 43, 98, 1)', borderColor: 'transparent', borderWidth: 0, borderRadius: 30}}
                containerStyle={{width: 150}}
              />
            </View>
            <View style={styles.buttonsContainer}>
              <AnterosButton
                title="Basic Button"
                buttonStyle={{backgroundColor: 'rgba(78, 116, 289, 1)', borderRadius: 3}}
              />
              <AnterosButton
                title="Outline Button"
                buttonStyle={{backgroundColor: 'white', borderColor: 'rgba(78, 116, 289, 1)', borderWidth: 1}}
                titleStyle={{color: 'rgba(78, 116, 289, 1)'}}
              />
            </View>
            <View style={styles.buttonsContainer}>
              <AnterosButton
                title="HOME"
                loading
                titleStyle={{fontWeight: '700'}}
                buttonStyle={{backgroundColor: '#CDDC39', borderColor: 'transparent', borderWidth: 0, borderRadius: 30, paddingVertical: 10}}
                containerStyle={{width: 100, height: 40}}
              />
              <AnterosButton
                title="Clear Button"
                clear
                titleStyle={{color: 'rgba(78, 116, 289, 1)'}}
              />
            </View>
            <View style={styles.buttonsContainer}>
              <AnterosButton
                title="Light"
                buttonStyle={{backgroundColor: 'rgba(244, 244, 244, 1)', borderRadius: 3}}
                containerStyle={{height: 40}}
                titleStyle={{marginHorizontal: 20, color: 'black'}}
              />
              <AnterosButton
                title="Dark"
                buttonStyle={{backgroundColor: 'rgba(39, 39, 39, 1)'}}
                containerStyle={{height: 40}}
                titleStyle={{color: 'white', marginHorizontal: 20}}
              />
              <AnterosButton
                title="Default"
                containerStyle={{height: 40}}
                buttonStyle={{backgroundColor: 'rgba(78, 116, 289, 1)'}}
                titleStyle={{color: 'white', marginHorizontal: 20}}
              />
            </View>
            <View style={[styles.buttonsContainer, { marginBottom: 20 }]}>
              <AnterosButton
                title="Secondary"
                buttonStyle={{backgroundColor: 'rgba(127, 220, 103, 1)'}}
                containerStyle={{height: 40}}
                titleStyle={{color: 'white', marginHorizontal: 20}}
              />
              <AnterosButton
                title="Danger"
                buttonStyle={{backgroundColor: 'rgba(214, 61, 57, 1)'}}
                containerStyle={{height: 40}}
                titleStyle={{color: 'white', marginHorizontal: 20}}
              />
            </View>
          </View>
          <AnterosButtonGroup
            buttons={['SIMPLE', 'BUTTON', 'GROUP']}
            selectedIndex={this.state.selectedIndex}
            onPress={selectedIndex => {
              this.setState({ selectedIndex });
            }}
            containerStyle={{ marginBottom: 20 }}
          />
          <AnterosButtonGroup
            buttons={['Multiple', 'Select', 'Button', 'Group']}
            selectMultiple
            selectedIndexes={this.state.selectedIndexes}
            onPress={selectedIndexes => {
              this.setState({ selectedIndexes });
            }}
            containerStyle={{ marginBottom: 20 }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  contentView: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },  
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold'
  },
});
