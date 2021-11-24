import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import {AnterosText, AnterosNavigationPage, AnterosBreadCrumb, AnterosSeparator} from 'anteros-react-native';

export class BreadCrumbExample extends AnterosNavigationPage {
    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: "Breadcrumb example",
      showBackButton: true
    };

  constructor() {
    super();

    this.state = {
      index: 0,
      content: ''
    }
    this.handlePress1 = this.handlePress1.bind(this);
    this.handlePress2 = this.handlePress2.bind(this);
  }

  handlePress1(index) {
    this.setState({...this.state, content1: `Tab ${index + 1} selected !!!`, index1:index});
  }

  handlePress2(index) {
    this.setState({...this.state, content2: `Tab ${index + 1} selected !!!`, index2:index});
  }

  renderPage() {
    return (
      <View style={styles.container}>
        <AnterosBreadCrumb
            entities={['My Tab 1', 'My Tab 2', 'My Tab 3']}
            isTouchable={true}
            flowDepth={this.state.index1}
            height={30}
            onCrumbPress={this.handlePress1}
            borderRadius={5}
        />
        <View style={{ marginTop: 20, marginBottom: -50}}>
            <AnterosText style={styles.tab}>{this.state.content1}</AnterosText>
        </View>
        <AnterosSeparator/>     

        <AnterosBreadCrumb
            entities={['My Tab 1', 'My Tab 2', 'My Tab 3']}
            isTouchable={true}
            flowDepth={this.state.index2}
            height={30}
            activeCrumbStyle={{backgroundColor:'#FFC107'}}
            triangleTailStyle={{borderTopColor: '#FFC107',
                borderBottomColor: '#FFC107'}}
            triangleHeadStyle={{borderColor: '#FFC107'}}    
            onCrumbPress={this.handlePress2}
            borderRadius={5}
        />
        <View style={{ marginTop: 20, marginBottom: -50}}>
            <AnterosText style={styles.tab}>{this.state.content2}</AnterosText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 50,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: -200,
    marginBottom: 60
  },
  info: {
    fontSize: 14,
    fontWeight: '500',
    color: 'grey',
    padding: 5
  },
  tab: {
    padding: 30,
    alignSelf: 'center'
  }  
});