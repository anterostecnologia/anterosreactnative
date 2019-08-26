// AnterosBasePage.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactNative, {Platform, View, ViewPropTypes} from 'react-native';

import AnterosTheme from '../../themes/AnterosTheme';
import AnterosNavigator from '../Navigator/AnterosNavigator';
import AnterosKeyboardSpace from '../KeyboardSpace/AnterosKeyboardSpace';

export default class AnterosBasePage extends Component {

  static propTypes = {
    ...ViewPropTypes,
    scene: PropTypes.object,
    autoKeyboardInsets: PropTypes.bool,
    keyboardTopInsets: PropTypes.number
  };

  static defaultProps = {
    ...View.defaultProps,
    scene: AnterosNavigator.SceneConfigs.Replace,
    autoKeyboardInsets: Platform.OS === 'ios',
    keyboardTopInsets: 0
  };

  static contextTypes = {
    navigator: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.didMount = false;
    this.state = {
      isFocused: false
    };
  }

  componentWillMount() {
    if (!this.backListener && Platform.OS === 'android') {
      let BackHandler = ReactNative.BackHandler
        ? ReactNative.BackHandler
        : ReactNative.BackAndroid;
      this.backListener = BackHandler.addEventListener('hardwareBackPress', () => this.onHardwareBackPress());
    }
  }

  componentDidMount() {
    this.didMount = true;
  }

  componentWillUnmount() {
    if (this.backListener) {
      this
        .backListener
        .remove();
      this.backListener = null;
    }
    this.didMount = false;
  }

  get navigator() {
    if (!this.context.navigator) {
      console.error('The root component is NOT AnterosNavigator, then you can not use BasePage.naviga' +
          'tor.');
      return null;
    }
    return this
      .context
      .navigator();
  }

  //Call after the scene transition by Navigator.onDidFocus
  onDidFocus() {
    if (!this.state.isFocused) 
      this.setState({isFocused: true});
    }
  
  //Call before the scene transition by Navigator.onWillFocus
  onWillFocus() {}

  //Android hardware back key handler, default is pop to prev page
  onHardwareBackPress() {
    if (!this.context.navigator) 
      return false;
    let navigator = this
      .context
      .navigator();
    if (!navigator) 
      return false;
    if (navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }
    return false;
  }

  buildProps() {
    let {
      style,
      ...others
    } = this.props;
    style = [
      {
        flex: 1,
        backgroundColor: AnterosTheme.pageColor
      }
    ].concat(style);
    return ({
      style,
      ...others
    });
  }

  renderPage() {
    return null;
  }

  render() {
    let {
      autoKeyboardInsets,
      keyboardTopInsets,
      ...others
    } = this.buildProps();
    return (
      <View {...others}>
        {this.renderPage()}
        {autoKeyboardInsets
          ? <AnterosKeyboardSpace topInsets={keyboardTopInsets}/>
          : null}
      </View>
    );
  }
}
