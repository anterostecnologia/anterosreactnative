import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {AnterosNavigationPage, AnterosSwitchSelector, AnterosDivider} from 'anteros-react-native';

const options = [
    { label: '01:00', value: '1' },
    { label: '01:30', value: '1.5' },
    { label: '02:00', value: '2' }
];

const optionsSex = [
    { label: 'Male', value: '0' },
    { label: 'Female', value: '1' },
    { label: 'None', value: '2' }
];

export default class SwitchSelectorExample extends AnterosNavigationPage {
    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: "Switch selector",
        showBackButton: true
    };

    renderPage() {
        return (<View style={styles.container}>
                    <AnterosSwitchSelector
                        options={options}
                        initial={0}
                        onPress={value => console.log(`Call onPress with value: ${value}`)}/>
                     <AnterosDivider/>
                     <AnterosSwitchSelector
                        options={optionsSex}
                        selectedColor='white'
                        backgroundColor='#ccddff'
                        borderColor='white'
                        buttonColor='#6699ff'
                        initial={0}
                        onPress={value => console.log(`Call onPress with value: ${value}`)}/>   
            </View>);
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      paddingTop:20,
      backgroundColor:'white'
    }    
  });