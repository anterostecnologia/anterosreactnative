//https://github.com/dwicao/react-native-panel

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {AnterosNavigationPage, AnterosPanel} from 'anteros-react-native';

class PanelExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Panel',
      showBackButton: true,
    };

  renderFirstHeader() {
    return (
      <View style={styles.firstHeader}>
        <Text>This is Custom Header</Text>
      </View>
    );
  }

  renderPage() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <AnterosPanel
          style={styles.firstHeaderContainer}
          header={this.renderFirstHeader}
        >
          <Text style={styles.myDescription}>
            Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit.
          </Text>
        </AnterosPanel>
        <AnterosPanel
          header="With onPress, yeaahhhh!!! It's so f#cking amazing wooohoooo..."
          onPress={() => alert("It's awesome, right?")}
        >
          <Text style={styles.myDescription}>
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </Text>
        </AnterosPanel>
        <AnterosPanel
          style={styles.thirdHeaderContainer}
          header="Custom container style"
        >
          <Text style={styles.myDescription}>
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum dolore
            eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident.
          </Text>
        </AnterosPanel>
        <AnterosPanel header="Custom content style">
          <View style={styles.customContent}>
            <View style={styles.square} />
            <View style={styles.circle} />
            <View style={styles.square} />
          </View>
        </AnterosPanel>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 30,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  firstHeaderContainer: {
    backgroundColor: '#ccc',
  },
  firstHeader: {
    marginHorizontal: 10,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    height: 50,
  },
  thirdHeaderContainer: {
    margin: 15,
    backgroundColor: 'yellow',
  },
  myDescription: {
    padding: 10,
    paddingTop: 0,
  },
  customContent: {
    backgroundColor: '#bada55',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  square: {
    backgroundColor: 'yellow',
    width: 50,
    height: 50,
  },
  circle: {
    backgroundColor: 'blue',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default PanelExample;