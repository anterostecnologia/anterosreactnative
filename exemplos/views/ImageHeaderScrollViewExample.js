import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {AnterosText, AnterosNavigationPage, AnterosImage, AnterosImageHeaderScrollView, AnterosTriggeringView} from 'anteros-react-native';

const tvShowContent = {
    title: 'Doctor Who',
    overview: `
      The Doctor looks and seems human. He's handsome, witty, and could be mistaken for just another man in the street.
      But he is a Time Lord: a 900 year old alien with 2 hearts, part of a gifted civilization who mastered time travel.
      The Doctor saves planets for a living – more of a hobby actually, and he's very, very good at it.
      He's saved us from alien menaces and evil from before time began – but just who is he?`,
    image: require('../images/doctorwho.jpg'),
    year: 2005,
    genres: ['Action & Adventure', 'Drama', 'Sci-Fi & Fantasy'],
    keywords: [
      'time travel',
      'time machine',
      'phone booth',
      'alien',
      'time traveler',
      'police box',
      'space and aliens',
    ],
  };

const MIN_HEIGHT = 50;
const MAX_HEIGHT = 250;

const styles = StyleSheet.create({
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  keywords: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  keywordContainer: {
    backgroundColor: '#999999',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  keyword: {
    fontSize: 16,
    color: 'white',
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    height: 600,
  },
});

export class ImageHeaderScrollViewExample extends AnterosNavigationPage {

  static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Image header scrollview',
      showBackButton: true
  };

  constructor() {
    super();
    this.state = { showNavTitle: false };
  }

  renderPage() {
    return (
      <View style={{ flex: 1 }}>
        <AnterosImageHeaderScrollView
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          maxOverlayOpacity={0.6}
          minOverlayOpacity={0.3}
          fadeOutForeground
          renderHeader={() => <AnterosImage source={tvShowContent.image} style={styles.image} />}
          renderFixedForeground={() => (
            <Animatable.View
              style={styles.navTitleView}
              ref={navTitleView => {
                this.navTitleView = navTitleView;
              }}
            >
              <AnterosText style={styles.navTitle}>
                {tvShowContent.title}, ({tvShowContent.year})
              </AnterosText>
            </Animatable.View>
          )}
          renderForeground={() => (
            <View style={styles.titleContainer}>
              <AnterosText style={styles.imageTitle}>{tvShowContent.title}</AnterosText>
            </View>
          )}
        >
          <AnterosTriggeringView
            style={styles.section}
            onHide={() => this.navTitleView.fadeInUp(200)}
            onDisplay={() => this.navTitleView.fadeOut(100)}
          >
            <AnterosText style={styles.title}>
              <AnterosText style={styles.name}>{tvShowContent.title}</AnterosText>, ({tvShowContent.year})
            </AnterosText>
          </AnterosTriggeringView>
          <View style={styles.section}>
            <AnterosText style={styles.sectionTitle}>Overview</AnterosText>
            <AnterosText style={styles.sectionContent}>{tvShowContent.overview}</AnterosText>
          </View>
          <View style={[styles.section, styles.sectionLarge]}>
            <AnterosText style={styles.sectionTitle}>Keywords</AnterosText>
            <View style={styles.keywords}>
              {tvShowContent.keywords.map(keyword => (
                <View style={styles.keywordContainer} key={keyword}>
                  <AnterosText style={styles.keyword}>{keyword}</AnterosText>
                </View>
              ))}
            </View>
          </View>
        </AnterosImageHeaderScrollView>
      </View>
    );
  }
}


