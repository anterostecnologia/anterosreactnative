'use strict';

import {Component} from 'react';
import {Platform, View,Text} from 'react-native';


import {AnterosNavigator, AnterosTheme} from 'anteros-react-native';

console.log(AnterosTheme);
import NewHome from './views/NewHome';



AnterosTheme.set({fitIPhoneX: true});

Platform.select({
  ios: { fontFamily: 'Arial', }, 
  android: { fontFamily: 'Roboto' }
})

export class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    //console.log(AnterosTheme);
    console.disableYellowBox = true;
    //return <View style={{backgroundColor: '#fff', flex:1}}><Text style={{marginTop: 50, fontSize: 50}}>Tela Principal</Text></View>
    return <AnterosNavigator rootView={< NewHome />}/>;
  }
}

// intalar dependencia  --> "lottie-react-native": "^3.1.0" e "lottie-ios": "3.0.3",
// intalar dependencia  --> "react-native-vector-icons": "^6.6.0"
// criar arquivo react-native.config.js e adicionar codigo abaixo
// module.exports = {
//   assets:["./assets/fonts/"]
// }
// usar comando --> react-native link

//Erros nao resolvidos 

// ListView no react-native está depreciado
//WebView

