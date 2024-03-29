'use strict';


import ReactNative from 'react-native';
const {
  AppRegistry,
  StyleSheet,
  View,
  Linking,
  Alert,
} = ReactNative;
import {AnterosParsedText, AnterosNavigationPage} from 'anteros-react-native';

export class ParsedTextExample extends AnterosNavigationPage {

  static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Parsed text',
      showBackButton: true,
  };

  handleUrlPress(url) {
    Linking.openURL(url);
  }

  handlePhonePress(phone) {
    Alert.alert(`${phone} has been pressed!`);
  }

  handleNamePress(name) {
    Alert.alert(`Hello ${name}`);
  }

  handleEmailPress(email) {
    Alert.alert(`send email to ${email}`);
  }

  renderText(matchingString, matches) {
    // matches => ["[@michel:5455345]", "@michel", "5455345"]
    let pattern = /\[(@[^:]+):([^\]]+)\]/i;
    let match = matchingString.match(pattern);
    return `^^${match[1]}^^`;
  }

  renderPage() {
    return (
      <View style={styles.container}>
        <AnterosParsedText
          style={styles.text}
          parse={
            [
              {type: 'url',                       style: styles.url, onPress: this.handleUrlPress},
              {type: 'phone',                     style: styles.phone, onPress: this.handlePhonePress},
              {type: 'email',                     style: styles.email, onPress: this.handleEmailPress},
              {pattern: /Bob|David/,              style: styles.name, onPress: this.handleNamePress},
              {pattern: /\[(@[^:]+):([^\]]+)\]/i, style: styles.username, onPress: this.handleNamePress, renderText: this.renderText},
              {pattern: /42/,                     style: styles.magicNumber},
              {pattern: /#(\w+)/,                 style: styles.hashTag},
            ]
          }
        >
          Hello this is an example of the AnterosParsedText, links like http://www.google.com or http://www.facebook.com are clickable and phone number 444-555-6666 can call too.
          But you can also do more with this package, for example Bob will change style and David too. You should mention [@michel:5455345] about that. foo@gmail.com
          And the magic number is 42!
          #react #react-native
        </AnterosParsedText>
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

  url: {
    color: 'red',
    textDecorationLine: 'underline',
  },

  email: {
    textDecorationLine: 'underline',
  },

  text: {
    color: 'black',
    fontSize: 15,
  },

  phone: {
    color: 'blue',
    textDecorationLine: 'underline',
  },

  name: {
    color: 'red',
  },

  username: {
    color: 'green',
    fontWeight: 'bold',
  },

  magicNumber: {
    fontSize: 42,
    color: 'pink',
  },

  hashTag: {
    fontStyle: 'italic',
  },

});