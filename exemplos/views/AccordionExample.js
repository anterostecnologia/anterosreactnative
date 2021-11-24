import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';

import * as Animatable from 'react-native-animatable';
import {AnterosText, AnterosNavigationPage, AnterosImage, AnterosCollapsible, AnterosAccordion} from 'anteros-react-native';


const StatusBarBackground = (props) => {
  const { style } = props;
  return (
    <View style={[stylesBar.statusBarBackground, style || {}]} />
  );
};

const SubMenu = () => (
  <AnterosImage source={require('../images/tweetbot-submenu.png')} />
);

StatusBarBackground.propTypes = {
  style: PropTypes.object,
};

const stylesBar = StyleSheet.create({
  statusBarBackground: {
    height: 20,
    backgroundColor: 'gray'
  }
});

const FakeTweet = (props) => {
  const { image } = props;
  return (
    <AnterosImage style={{flex:1}} resizeMode="stretch" source={image} />
  );
};

const fake_tweets = [
  { id: 0, easing: 'bounce', collapsed: false, img: require('../images/tweetbot0.png') },
  { id: 1, easing: 'easeOutSin', collapsed: true, img: require('../images/tweetbot1.png') },
  { id: 2, easing: 'cubic', collapsed: true, img: require('../images/tweetbot2.png') },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
});

export class AccordionExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Accordion/Collapsible',
    showBackButton: true
  };

  state = {
    
  };

  constructor(props){
    super(props);
    this._handleChange = this._handleChange.bind(this);

    this.state = { activeSection: false,
                   collapsed: true
                 };
  }

  _toggleExpanded = () => {
    this.setState({...this.state, collapsed: !this.state.collapsed });
  }

  _setSection(section) {
    this.setState({...this.state, activeSection: section });
  }

  _handleChange(id) {
    console.log('Changed happened on Item:', id);
  }



  renderPage() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this._toggleExpanded}>
          <View style={styles.header}>
            <AnterosText style={styles.headerText}>Single Collapsible</AnterosText>
          </View>
        </TouchableHighlight>
        <AnterosCollapsible collapsed={this.state.collapsed} align="center">
          <View style={styles.content}>
            <AnterosText>Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs</AnterosText>
          </View>
        </AnterosCollapsible>
        <View style={styles.container}>
          <StatusBarBackground />
          <ScrollView>
            {fake_tweets.map((tweet) =>
              <AnterosAccordion
                key={tweet.id}
                renderHeader={() => <FakeTweet image={tweet.img} />}
                easing={tweet.easing}
                onChange={() => this._handleChange(tweet.id)}
                collapsed={tweet.collapsed}
              >
                <SubMenu/>
              </AnterosAccordion>
            )}
          </ScrollView>
      </View>
      </View>
    );
  }
}