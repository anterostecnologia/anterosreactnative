import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import {AnterosNavigationPage, AnterosButton, AnterosAlert} from 'anteros-react-native';

const config = {
    "alert": {
        "cancelText": "Cancel",
        "confirmText": "Confirm",
    },
    "colors": {
        "title": "#626262",
        "msg": "#7b7b7b",
        "cancel": "#D0D0D0",
        "confirm": "#AEDEF4",
        "confirmWarning": "#DD6B55",
    },
    "size": {
        "title": 18,
        "msg": 14,
        "actionButtonBorderRadius": 5,
        "actionButtonFontSize": 13
    },
    "spacing": {
        "alertContainerPadding": 10,
        "alertContentPadding": 5,
        "titlePadding": 5,
        "titlePaddingSides": 15,
        "msgPadding": 5,
        "msgPaddingSides": 10,
        "actionButtonPaddingHorizontal": 10,
        "actionButtonPaddingVertical": 7,
        "actionButtonMargin": 5,
        "actionButtonMarginTop": 5
    },
    "type": {
        "progress": "Progress",
        "warning": "Warning",
        "error": "error",
        "action": "Action",
    }
}


export class AlertExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Alert',
      showBackButton: true
    };

  constructor(props) {
    super(props);
    this.state = { show: false, type: config.type.basic };
  };

  showAlert = (type) => {
    this.setState({
      show: true,
      type
    });
  };

  hideAlert = () => {
    this.setState({
      show: false
    });
  };

  getProps = () => {
    const { type } = this.state;
    let alertProps = {};

    switch (type) {
      case config.type.progress:
        alertProps = {
          showProgress: true,
          title: "Loading...",
          closeOnHardwareBackPress: false,
          progressSize: 'small',
          progressColor: 'gray'
        }
        break;
      case config.type.basic:
        alertProps = {
          title: "BasicAlert",
          message: "I have a message for you!",
          showConfirmButton: true,
          confirmText: "View",
          confirmButtonColor: config.colors.confirm,
          onConfirmPressed: () => {
            this.hideAlert();
          },
          overlayStyle: {
            backgroundColor: 'rgba(152,152,152,0.5)'
          },
          contentContainerStyle: {
            backgroundColor: 'white'
          },
          titleStyle: {
            fontSize: 18
          },
          messageStyle: {
            fontSize: 14
          }
        }
        break;
      case config.type.error:
        alertProps = {
          title: "ErrorAlert",
          message: "The selected variant is unavailable!",
          showConfirmButton: true,
          confirmText: "Dismiss",
          confirmButtonColor: config.colors.confirmWarning,
          onConfirmPressed: () => {
            this.hideAlert();
          },
          onDismiss: () => {
            console.log('alert was dismissed');
          }
        }
        break;
      case config.type.action:
        alertProps = {
          title: "ActionsAlert",
          message: "Checkout cart items before offer expires!",
          showCancelButton: true,
          showConfirmButton: true,
          cancelText: "No, leave offer",
          confirmText: "Yes, checkout",
          confirmButtonColor: config.colors.confirm,
          cancelButtonStyle: {
            paddingHorizontal: config.spacing.actionButtonPaddingHorizontal,
            paddingVertical: config.spacing.actionButtonPaddingVertical,
            margin: config.spacing.actionButtonMargin,
            borderRadius: config.size.actionButtonBorderRadius,
          },
          cancelButtonTextStyle: {
            color: 'blue',
            fontSize: config.size.actionButtonFontSize
          },
          confirmButtonStyle: {
            paddingHorizontal: config.spacing.actionButtonPaddingHorizontal,
            paddingVertical: config.spacing.actionButtonPaddingVertical,
            margin: config.spacing.actionButtonMargin,
            borderRadius: config.size.actionButtonBorderRadius,
          },
          confirmButtonTextStyle: {
            color: 'blue',
            fontSize: config.size.actionButtonFontSize
          },
          onCancelPressed: () => {
            this.hideAlert();
          },
          onConfirmPressed: () => {
            this.hideAlert();
          }
        }
        break;
    };

    return alertProps;
  }

  renderPage() {
    const { show } = this.state;
    let props = this.getProps();

    return (
      <View style={styles.container}>

        <ProgressAlert onPress={this.showAlert} />
        <BasicAlert onPress={this.showAlert} />
        <ErrorAlert onPress={this.showAlert} />
        <ActionsAlert onPress={this.showAlert} />

        <AnterosAlert
          show={show}
          {...props}
        />
      </View>
    );
  };

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  }
});

class BasicAlert extends Component {
    render() {
      const { onPress } = this.props;
  
      return (
        <View style={stylesAlert.container}>
          <Text>I'm BasicAlert</Text>
          <TouchableOpacity onPress={() => onPress(config.type.basic)}>
            <View style={stylesAlert.button}>
              <Text style={stylesAlert.text}>Try me!</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    };
  };
BasicAlert.propTypes = {
    onPress: PropTypes.func.isRequired
};

class ActionsAlert extends Component {
    render() {
      const {onPress} = this.props;
  
      return (
        <View style={stylesAlert.container}>
          <Text>I'm ActionsAlert</Text>
          <TouchableOpacity onPress={() => onPress(config.type.action)}>
            <View style={stylesAlert.button}>
              <Text style={stylesAlert.text}>Try me!</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    };
};

ActionsAlert.propTypes = {
    onPress: PropTypes.func.isRequired
};

class ErrorAlert extends Component {
    render() {
      const {onPress} = this.props;
  
      return (
        <View style={stylesAlert.container}>
          <Text>I'm ErrorAlert</Text>
          <TouchableOpacity onPress={() => onPress(config.type.error)}>
            <View style={stylesAlert.button}>
              <Text style={stylesAlert.text}>Try me!</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    };
  };
ErrorAlert.propTypes = {
    onPress: PropTypes.func.isRequired
};

class ProgressAlert extends Component {
    render() {
      const {onPress} = this.props;
  
      return (
        <View style={stylesAlert.container}>
          <Text>I'm ProgressAlert</Text>
          <TouchableOpacity onPress={() => onPress(config.type.progress)}>
            <View style={stylesAlert.button}>
              <Text style={stylesAlert.text}>Try me!</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    };
  };
ProgressAlert.propTypes = {
    onPress: PropTypes.func.isRequired
};

const stylesAlert = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    button: {
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5,
        backgroundColor: "#AEDEF4",
    },
    text: {
        color: 'blue',
        fontSize: 15
    }
});