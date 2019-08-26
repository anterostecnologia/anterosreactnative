import React, { Component } from 'react';
import { AppRegistry, Text, ScrollView, StyleSheet } from 'react-native';
import {AnterosNavigationPage, AnterosText, AnterosRipple} from 'anteros-react-native';

let styles = {
  scroll: {
    padding: 4,
    paddingTop: 24,
    backgroundColor: '#F0F0F4',
  },

  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    minHeight: 56,
    margin: 4,
    borderRadius: 2,
    elevation: 2,
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  a: {
    backgroundColor: '#E64A19',
  },

  b: {
    backgroundColor: '#EF6C00',
  },

  c: {
    backgroundColor: '#673AB7',
  },

  d: {
    backgroundColor: '#388E3C',
  },

  e: {
    backgroundColor: '#0288D1',
  },

  f: {
    backgroundColor: '#263238',
  },

  g: {
    backgroundColor: '#5D4037',
  },

  z: {
    elevation: 0,
    shadowOpacity: 0,
  },

  text: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(255,255,255,.87)',
  },

  footnote: {
    fontSize: 15,
    fontWeight: '400',
    color: 'rgba(0,0,0,.54)',
  },
};

AnterosRipple.defaultProps.rippleContainerBorderRadius = styles.container.borderRadius;


export default class RippleExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Ripple efect',
      showBackButton: true
    };

    renderPage() {
      return (
        <ScrollView style={styles.scroll}>
          <AnterosRipple style={[styles.container, styles.a]}>
            <AnterosText style={styles.text}>default</AnterosText>
          </AnterosRipple>

          <AnterosRipple style={[styles.container, styles.b]} rippleSize={176} rippleDuration={600}>
            <AnterosText style={styles.text}>rippleSize=176{'\n'}rippleDuration=600</AnterosText>
          </AnterosRipple>

          <AnterosRipple style={[styles.container, styles.c]} rippleSize={244} rippleDuration={800}>
            <AnterosText style={styles.text}>rippleSize=244{'\n'}rippleDuration=800</AnterosText>
          </AnterosRipple>

          <AnterosRipple style={[styles.container, styles.d]} rippleColor='white' rippleOpacity={0.54}>
            <Text style={styles.text}>rippleColor=#FFFFFF{'\n'}rippleOpacity=0.54</Text>
          </AnterosRipple>

          <AnterosRipple style={[styles.container, styles.e]} rippleCentered rippleColor='white'>
            <AnterosText style={styles.text}>rippleColor=#FFFFFF{'\n'}rippleCentered=true</AnterosText>
          </AnterosRipple>

          <AnterosRipple style={[styles.container, styles.f]} rippleColor='#D500F9' rippleOpacity={0.87} rippleDuration={1200}>
            <AnterosText style={styles.text}>rippleColor=#D500F9{'\n'}rippleOpacity=0.87{'\n'}rippleDuration=1200</AnterosText>
          </AnterosRipple>

          <AnterosRipple style={[styles.container, styles.g]} rippleColor='#76FF03' rippleOpacity={0.87} rippleDuration={2400}>
            <AnterosText style={styles.text}>rippleColor=#76FF03{'\n'}rippleOpacity=0.87{'\n'}rippleDuration=2400</AnterosText>
          </AnterosRipple>

          <AnterosRipple disabled style={[styles.container, styles.z]}>
            <AnterosText style={styles.footnote}>Tap on any card to see surface reaction</AnterosText>
          </AnterosRipple>
        </ScrollView>
      );
    }
  }
