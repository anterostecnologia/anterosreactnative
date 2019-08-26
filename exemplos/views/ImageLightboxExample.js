import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {AnterosCarousel, AnterosText, AnterosNavigationPage, AnterosImage, AnterosLightbox} from 'anteros-react-native';
const WINDOW_WIDTH = Dimensions.get('window').width;
const BASE_PADDING = 10;


const renderCarousel = () => (
  <AnterosCarousel style={{ width: WINDOW_WIDTH, height: WINDOW_WIDTH }}>
    <AnterosImage
      style={{ flex: 1 }}
      resizeMode="contain"
      source={{uri:'https://source.unsplash.com/Z_Rh6USNt1c/400x300'}}
    />
    <View style={{ backgroundColor: '#6C7A89', flex: 1 }}/>
    <View style={{ backgroundColor: '#019875', flex: 1 }}/>
    <View style={{ backgroundColor: '#E67E22', flex: 1 }}/>
  </AnterosCarousel>
)
export default class LightboxExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Light box',
        showBackButton: true
    };
    
    renderPage(){
        return (<ScrollView style={styles.container}>
                    <View style={styles.text}><Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text></View>
                    <AnterosLightbox underlayColor="blue">
                    <AnterosImage
                        style={styles.contain}
                        resizeMode="contain"
                        source={{uri:'https://source.unsplash.com/Z_Rh6USNt1c/400x300'}}
                    />
                    </AnterosLightbox>
                    <View style={styles.text}><Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text></View>
                    <AnterosLightbox springConfig={{tension: 15, friction: 7}} swipeToDismiss={false} renderContent={renderCarousel}>
                    <AnterosImage
                        style={styles.carousel}
                        resizeMode="contain"
                        source={{uri:'https://source.unsplash.com/tzl1UCXg5Es/400x300'}}
                    />
                    </AnterosLightbox>
                    <View style={styles.text}><Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text></View>
                    <AnterosLightbox
                    renderHeader={close => (
                        <TouchableOpacity onPress={close}>
                        <AnterosText style={styles.closeButton}>Close</AnterosText>
                        </TouchableOpacity>
                    )}>
                    <View style={styles.customHeaderBox}>
                        <AnterosText>I have a custom header</AnterosText>
                    </View>
                    </AnterosLightbox>
                    <View style={styles.text}><AnterosText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </AnterosText></View>
                    <View style={styles.row}>
                    <AnterosLightbox style={styles.col}>
                        <View style={[styles.square, styles.squareFirst]}><AnterosText style={styles.squareText}>I'm a square</AnterosText></View>
                    </AnterosLightbox>
                    <AnterosLightbox style={styles.col}>
                        <View style={[styles.square, styles.squareSecond]}><AnterosText style={styles.squareText}>I'm a square</AnterosText></View>
                    </AnterosLightbox>
                    </View>
                    <View style={styles.text}><AnterosText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </AnterosText></View>
                </ScrollView>);
    }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: BASE_PADDING,
  },
  closeButton: {
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    padding: 8,
    borderRadius: 3,
    textAlign: 'center',
    margin: 10,
    alignSelf: 'flex-end',
  },
  customHeaderBox: {
    height: 150,
    backgroundColor: '#6C7A89',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginLeft: -BASE_PADDING,
    marginRight: -BASE_PADDING,
  },
  col: {
    flex: 1,
  },
  square: {
    width: WINDOW_WIDTH / 2,
    height: WINDOW_WIDTH / 2,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  squareFirst: {
    backgroundColor: '#C0392B',
  },
  squareSecond: {
    backgroundColor: '#019875',
  },
  squareText: {
    textAlign: 'center',
    color: 'white',
  },
  carousel: {
    height: WINDOW_WIDTH - BASE_PADDING * 2,
    width: WINDOW_WIDTH - BASE_PADDING * 2,
    backgroundColor: 'white',
  },
  contain: {
    flex: 1,
    height: 150,
  },
  text: {
    marginVertical: BASE_PADDING * 2,
  },
});