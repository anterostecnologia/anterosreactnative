import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';
import ListView from 'deprecated-react-native-listview'
import {AnterosNavigationPage, AnterosListRow} from 'anteros-react-native';

export default class ChatExample extends AnterosNavigationPage {
    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: "Chat",
      showBackButton: true
    };
    constructor(props) {
      super(props);
      this.chat1 = this.chat1.bind(this);
      this.chat2 = this.chat2.bind(this);
      this.chat3 = this.chat3.bind(this);
    }
  
    renderRow = highlighted => {
      if (Platform.OS !== "android") {
        return (
          <View
            style={[
              {
                backgroundColor: "#f0f0f0",
                height: 1
              },
              highlighted && {
                marginLeft: 0
              }
            ]}
          />
        );
      }
  
      return null;
    };
  
    chat1() {
      this.navigator.push({view: <ContactsExample />});
    }
  
    chat2() {
      
    }
  
    chat3() {
  
    }
  
    renderPage() {
      return (
        <ScrollView
          style={{
            flex: 1
          }}>
          <View
            style={{
              height: 20
            }}
          />
          <AnterosListRow title="Contacts" onPress={this.chat1} topSeparator="full" />
          <AnterosListRow title="Chat head" onPress={this.chat2} topSeparator="full" />
        </ScrollView>
      );
    }
  }
  
  const stylesList = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
    row: {
      paddingHorizontal: 10,
      paddingVertical: 20
    }
  });


const image1 = require('../../images/geasy.jpg')
const image2 = require('../../images/eminem.jpg')
const image3 = require('../../images/kyle.jpg')
const image4 = require('../../images/devon.jpg')
const dataExample = [{
  "id": 1,
  "first_name": "G Eazy",
  "message": "I just need to be alone",
  "image": image1
}, {
  "id": 2,
  "first_name": "Eminem",
  "message": "Fuck off",
  "image": image2
}, {
  "id": 2,
  "first_name": "Kyle",
  "message": "Lame NI**As hide your girls",
  "image": image3
}, {
  "id": 2,
  "first_name": "Devon Baldwin",
  "message": "Where the Avacados at tho?",
  "image": image4
}]
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class ContactsExample extends AnterosNavigationPage {
    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: "Contacts",
      showBackButton: true
    };

    constructor(props){
    super(props)

    this.state = {
      dataSource: ds.cloneWithRows(dataExample),
    }
  }


  renderPage() {
    return (
      <View style={{ flex:1 }}>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});