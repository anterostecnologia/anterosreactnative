// AnterosNavigationPage.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Platform, View, Dimensions} from 'react-native';

import AnterosTheme from '../../themes/AnterosTheme';
import AnterosNavigator from '../Navigator/AnterosNavigator';
import AnterosBasePage from '../BasePage/AnterosBasePage';
import AnterosNavigationBar from '../NavigationBar/AnterosNavigationBar';
import {AnterosKeyboardSpace} from '../KeyboardSpace/AnterosKeyboardSpace';

export default class AnterosNavigationPage extends AnterosBasePage {

  static propTypes = {
    ...AnterosBasePage.propTypes,
    title: PropTypes.string,
    showBackButton: PropTypes.bool,
    navigationBarInsets: PropTypes.bool
  };

  static defaultProps = {
    ...AnterosBasePage.defaultProps,
    scene: AnterosNavigator.SceneConfigs.PushFromRight,
    title: null,
    showBackButton: false,
    navigationBarInsets: true
  };

  constructor(props) {
    super(props);
    this.screenWidth = Dimensions
      .get('window')
      .width;
  }

  buildProps() {
    let {
      navigationBarInsets,
      ...others
    } = super.buildProps();
    let {left: paddingLeft, right: paddingRight} = AnterosTheme.screenInset;
    let pageContainerStyle = [
      {
        flex: 1,
        paddingLeft,
        paddingRight,
        marginTop: navigationBarInsets
          ? (AnterosTheme.navBarContentHeight + AnterosTheme.statusBarHeight)
          : 0
      }
    ];
    return ({
      navigationBarInsets,
      pageContainerStyle,
      ...others
    });
  }

  onLayout(e) {
    let {width} = Dimensions.get('window');
    if (width != this.screenWidth) {
      this.screenWidth = width;
      this.forceUpdate();
    }
    this.props.onLayout && this
      .props
      .onLayout(e);
  }

  renderNavigationBody() {
    return this.props.title;
  }

  renderNavigationLeftView() {
    if (!this.props.showBackButton) 
      return null;
    return (<AnterosNavigationBar.BackButton
      title={AnterosTheme.backButtonTitle}
      onPress={() => this.navigator.pop()}/>);
  }

  renderNavigationRightView() {
    return null;
  }

  renderNavigationBar() {
    return (<AnterosNavigationBar
      title={this.renderNavigationBody()}
      leftView={this.renderNavigationLeftView()}
      rightView={this.renderNavigationRightView()}/>);
  }

  renderPage() {
    return null;
  }

  render() {
    let {
      autoKeyboardInsets,
      keyboardTopInsets,
      pageContainerStyle,
      onLayout,
      ...others
    } = this.buildProps();
    return (
      <View onLayout={e => this.onLayout(e)} {...others}>
        <View style={{
          flex: 1
        }}>
          <View style={pageContainerStyle}>
            {this.renderPage()}
          </View>
          {this.renderNavigationBar()}
        </View>
        {autoKeyboardInsets
          ? <AnterosKeyboardSpace topInsets={keyboardTopInsets}/>
          : null}
      </View>
    );
  }

}
