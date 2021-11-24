// AnterosBasePage.js


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactNative, {Platform, View, ViewPropTypes} from 'react-native';
import shallowCompare from "react-addons-shallow-compare";
import {AnterosTheme} from '../../themes/AnterosTheme';
import {AnterosNavigator} from '../Navigator/AnterosNavigator';
import {AnterosKeyboardSpace} from '../KeyboardSpace/AnterosKeyboardSpace';

export class AnterosBasePage extends Component {

  

  constructor(props) {
    super(props);
    this.didMount = false;
    this.state = {
      isFocused: false
    };
  }

  UNSAFE_componentWillMount() {
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
    return {
      style,
      ...others
    };
  }

  renderPage() {
    return null;
  }

  shouldComponentUpdate=(nextProps, nextState) => {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const props = this.buildProps();
    let {
      autoKeyboardInsets,
      keyboardTopInsets,
      ...others
    } = props;
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


AnterosBasePage.propTypes = {
  ...ViewPropTypes,
  scene: PropTypes.object,
  autoKeyboardInsets: PropTypes.bool,
  keyboardTopInsets: PropTypes.number
};

AnterosBasePage.defaultProps = {
   ...View.defaultProps,
  // scene: AnterosNavigator.SceneConfigs.Replace,
  autoKeyboardInsets: Platform.OS === 'ios',
  keyboardTopInsets: 0
};

AnterosBasePage.contextTypes = {
  navigator: PropTypes.func
};
