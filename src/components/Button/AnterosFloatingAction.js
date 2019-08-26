// https://github.com/santomegonzalo/react-native-floating-action

import React, { Component } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  View,
  Text
} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const ACTION_BUTTON_SIZE = 56;

function shadeColor(color, percent) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = parseInt(R * (100 + percent) / 100, 0); // eslint-disable-line
  G = parseInt(G * (100 + percent) / 100, 0); // eslint-disable-line
  B = parseInt(B * (100 + percent) / 100, 0); // eslint-disable-line

  R = (R < 255) ? R : 255;
  G = (G < 255) ? G : 255;
  B = (B < 255) ? B : 255;

  const RR = ((R.toString(16).length === 1) ? `0${R.toString(16)}` : R.toString(16));
  const GG = ((G.toString(16).length === 1) ? `0${G.toString(16)}` : G.toString(16));
  const BB = ((B.toString(16).length === 1) ? `0${B.toString(16)}` : B.toString(16));

  return `#${RR}${GG}${BB}`;
}

export function getTouchableComponent(useNativeFeedback = true) {
  if (useNativeFeedback === true && Platform.OS === 'android') {
    return TouchableOpacity;
  }
  return TouchableOpacity;
}

export function getRippleProps(color, useNativeFeedback = true) {
  // less than API 21 don't support Ripple
  if (useNativeFeedback === true && Platform.OS === 'android' && Platform.Version >= 21) {
    return {
      //background: TouchableNativeFeedback.Ripple(shadeColor(color, -30), true)
    };
  }
  return {};
}

export class AnterosFloatingAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      visible: props.visible
    };

    this.animation = new Animated.Value(0);
    this.actionsAnimation = new Animated.Value(0);
    this.visibleAnimation = new Animated.Value(props.visible ? 0 : 1);
    /*
     * this animation will fix an error on ReactNative (Android) where
     * interpolations with 0 and 1 don't work as expected.
     */
    this.fadeAnimation = new Animated.Value(props.visible ? 1 : 0);
  }

  componentDidMount() {
    const { openOnMount } = this.props;

    if (openOnMount) {
      this.animateButton();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      if (nextProps.visible) {
        Animated.parallel([
          Animated.spring(this.visibleAnimation, { toValue: 0 }),
          Animated.spring(this.fadeAnimation, { toValue: 1 })
        ]).start();
      } if (!nextProps.visible) {
        Animated.parallel([
          Animated.spring(this.visibleAnimation, { toValue: 1 }),
          Animated.spring(this.fadeAnimation, { toValue: 0 })
        ]).start();
      }
    }
  }

  getIcon = () => {
    const { actions, floatingIcon, overrideWithAction } = this.props;

    if (overrideWithAction) {
      const { icon } = actions[0];

      if (React.isValidElement(icon)) {
        return icon;
      }
      return <Image style={styles.buttonIcon} source={icon} />;
    }

    if (floatingIcon) {
      if (React.isValidElement(floatingIcon)) {
        return floatingIcon;
      }
      return <Image style={styles.buttonIcon} source={floatingIcon} />;
    }

    return <Image style={styles.buttonIcon} source={require('../../assets/images/add.png')} />;
  };

  handlePressItem = (itemName) => {
    const { onPressItem } = this.props;

    if (onPressItem) {
      onPressItem(itemName);
    }

    this.reset();
  };

  reset = () => {
    Animated.spring(this.animation, { toValue: 0 }).start();
    Animated.spring(this.actionsAnimation, { toValue: 0 }).start();

    this.setState({
      active: false
    });
  };

  animateButton = () => {
    const {
      overrideWithAction,
      actions,
      floatingIcon,
      onPressMain
    } = this.props;
    const { active } = this.state;

    if (overrideWithAction) {
      this.handlePressItem(actions[0].name);

      return;
    }

    if (onPressMain) {
      onPressMain(!active);
    }

    if (!active) {
      if (!floatingIcon) {
        Animated.spring(this.animation, { toValue: 1 }).start();
      }

      Animated.spring(this.actionsAnimation, { toValue: 1 }).start();

      // only execute it for the background to prevent extra calls
      LayoutAnimation.configureNext({
        duration: 180,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity
        }
      });

      this.setState({
        active: true
      });
    } else {
      this.reset();
    }
  };

  renderMainButton() {
    const {
      // @deprecated in favor of "color"
      buttonColor, // eslint-disable-line
      color,
      position,
      overrideWithAction,
      distanceToEdge
    } = this.props;

    if (buttonColor) {
      console.warn('FloatingAction: "buttonColor" property was deprecated. Please use "color"');
    }

    const mainButtonColor = buttonColor || color;

    const animatedVisibleView = {
      opacity: this.fadeAnimation,
      transform: [{
        rotate: this.visibleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '90deg']
        })
      }, {
        scale: this.visibleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0]
        })
      }]
    };

    let animatedViewStyle = {
      transform: [{
        rotate: this.animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg']
        })
      }]
    };

    if (overrideWithAction) {
      animatedViewStyle = {};
    }

    const Touchable = getTouchableComponent();
    const propStyles = { backgroundColor: mainButtonColor, bottom: distanceToEdge };
    if (['left', 'right'].indexOf(position) > -1) {
      propStyles[position] = distanceToEdge;
    }

    return (
      <Animated.View
        style={[
          styles.buttonContainer,
          styles[`${position}Button`],
          propStyles,
          animatedVisibleView
        ]}
      >
        <Touchable
          {...getRippleProps(mainButtonColor)}
          style={styles.button}
          activeOpacity={0.85}
          onPress={this.animateButton}
        >
          <Animated.View style={[styles.buttonTextContainer, animatedViewStyle]}>
            {this.getIcon()}
          </Animated.View>
        </Touchable>
      </Animated.View>
    );
  }

  renderActions() {
    const {
      actions,
      position,
      overrideWithAction,
      distanceToEdge,
      actionsPaddingTopBottom
    } = this.props;
    const { active } = this.state;

    if (overrideWithAction) {
      return null;
    }

    const animatedActionsStyle = {
      opacity: this.actionsAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
    };

    const actionsStyles = [styles.actions, styles[`${position}Actions`], animatedActionsStyle, {
      bottom: ACTION_BUTTON_SIZE + distanceToEdge + actionsPaddingTopBottom
    }];

    if (active) {
      actionsStyles.push(styles[`${position}ActionsVisible`]);
    }

    const sortedActions = actions.sort((a, b) => a.position - b.position);

    return (
      <Animated.View style={actionsStyles} pointerEvents="box-none">
        {
          sortedActions.map((action) => {
            const textColor = action.textColor || action.actionsTextColor;
            const textBackground = action.textBackground || action.actionsTextBackground;

            return (
              <AnterosFloatingActionItem
                paddingTopBottom={actionsPaddingTopBottom}
                distanceToEdge={distanceToEdge}
                key={action.name}
                textColor={textColor}
                textBackground={textBackground}
                {...action}
                position={position}
                active={active}
                onPress={this.handlePressItem}
              />
            );
          })
        }
      </Animated.View>
    );
  }

  renderTappableBackground() {
    const { overlayColor } = this.props;

    // TouchableOpacity don't require a child
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.overlay, { backgroundColor: overlayColor }]}
        onPress={this.reset}
      />
    );
  }

  render() {
    const { active } = this.state;
    const { showBackground } = this.props;

    return (
      <Animated.View
        pointerEvents="box-none"
        style={[styles.overlay, { backgroundColor: 'transparent' }]}
      >
        {
          (active && showBackground) &&
            this.renderTappableBackground()
        }
        {
          this.renderActions()
        }
        {
          this.renderMainButton()
        }
      </Animated.View>
    );
  }
}

AnterosFloatingAction.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    icon: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string,
    textBackground: PropTypes.string,
    textColor: PropTypes.string
  })),
  color: PropTypes.string,
  distanceToEdge: PropTypes.number,
  visible: PropTypes.bool,
  overlayColor: PropTypes.string,
  position: PropTypes.oneOf(['right', 'left', 'center']),
  overrideWithAction: PropTypes.bool, // replace mainAction with first action from actions
  floatingIcon: PropTypes.any,
  showBackground: PropTypes.bool,
  openOnMount: PropTypes.bool,
  actionsPaddingTopBottom: PropTypes.number,
  onPressItem: PropTypes.func,
  onPressMain: PropTypes.func
};

AnterosFloatingAction.defaultProps = {
  actionsPaddingTopBottom: 8,
  overrideWithAction: false,
  visible: true,
  color: '#1253bc',
  overlayColor: 'rgba(68, 68, 68, 0.6)',
  position: 'right',
  distanceToEdge: 30,
  openOnMount: false,
  showBackground: true
};

const styles = StyleSheet.create({
  actions: {
    position: 'absolute',
    bottom: 85,
    zIndex: 10
  },
  rightActions: {
    alignItems: 'flex-end',
    right: -1000 // this magic number will make always disspear the text from screen
  },
  leftActions: {
    alignItems: 'flex-start',
    left: -1000 // this magic number will make always disspear the text from screen
  },
  centerActions: {
    left: -1000
  },
  rightActionsVisible: {
    right: 0
  },
  leftActionsVisible: {
    left: 0
  },
  centerActionsVisible: {
    left: (DEVICE_WIDTH / 2) - 30
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    elevation: 0,
    zIndex: 0
  },
  buttonContainer: {
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
    zIndex: 2,
    width: ACTION_BUTTON_SIZE,
    height: ACTION_BUTTON_SIZE,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowColor: '#000000',
    shadowRadius: 3,
    elevation: 5,
    position: 'absolute'
  },
  button: {
    zIndex: 3,
    width: ACTION_BUTTON_SIZE,
    height: ACTION_BUTTON_SIZE,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightButton: {},
  leftButton: {},
  centerButton: {
    left: (DEVICE_WIDTH / 2) - 28
  },
  buttonTextContainer: {
    borderRadius: 28,
    width: ACTION_BUTTON_SIZE,
    height: ACTION_BUTTON_SIZE,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonIcon: {
    resizeMode: 'contain'
  }
});



const DEFAULT_MARGIN = 8;

class AnterosFloatingActionItem extends Component {
  constructor(props) {
    super(props);

    this.animation = new Animated.Value(0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      Animated.spring(this.animation, { toValue: nextProps.active ? 1 : 0 }).start();
    }
  }

  handleOnPress = () => {
    const { name, onPress } = this.props;

    onPress(name);
  };

  renderText() {
    const {
      // @deprecated in favor of textElevation
      elevation, // eslint-disable-line
      text,
      position,
      textElevation,
      textBackground,
      textColor
    } = this.props;

    if (elevation !== undefined) {
      console.warn('AnterosFloatingActionItem: "elevation" property was deprecated. Please use "textElevation"');
    }

    if (text) {
      return (
        <View
          key="text"
          style={[
            stylesItem.textContainer,
            stylesItem[`${position}TextContainer`],
            {
              backgroundColor: textBackground,
              elevation: textElevation || elevation
            }]
          }
        >
          <Text
            style={[
              stylesItem.text,
              {
                color: textColor
              }
            ]}
          >
            {text}
          </Text>
        </View>
      );
    }

    return null;
  }

  renderButton() {
    const { icon, color } = this.props;

    let iconStyle;

    if (icon && icon.uri) {
      iconStyle = stylesItem.iconLogo;
    } else {
      iconStyle = stylesItem.icon;
    }

    return (
      <View key="button" style={[stylesItem.button, { backgroundColor: color }]}>
        {
          React.isValidElement(icon) ? icon : <Image style={iconStyle} source={icon} />
        }
      </View>
    );
  }

  render() {
    const { position, distanceToEdge, paddingTopBottom } = this.props;
    const Touchable = getTouchableComponent(false);

    const animatedActionContainerStyle = {
      marginBottom: this.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [5, 10]
      })
    };

    const components = [];
    const distanceToEdgeActionContainer = {};

    if (position === 'left') {
      components.push(this.renderButton());
      components.push(this.renderText());
      distanceToEdgeActionContainer.paddingLeft = distanceToEdge + DEFAULT_MARGIN;
    } else if (position === 'right') {
      components.push(this.renderText());
      components.push(this.renderButton());
      distanceToEdgeActionContainer.paddingRight = distanceToEdge + DEFAULT_MARGIN;
    } else {
      components.push(this.renderButton());
    }

    return (
      <Touchable activeOpacity={0.4} style={stylesItem.container} onPress={this.handleOnPress}>
        <Animated.View
          style={[
            stylesItem.actionContainer,
            animatedActionContainerStyle,
            stylesItem[`${position}ActionContainer`],
            distanceToEdgeActionContainer,
            {
              paddingTop: paddingTopBottom,
              paddingBottom: paddingTopBottom
            }
          ]}
        >
          {components}
        </Animated.View>
      </Touchable>
    );
  }
}

AnterosFloatingActionItem.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.any,
  name: PropTypes.string.isRequired,
  text: PropTypes.string,
  textBackground: PropTypes.string,
  textColor: PropTypes.string,
  // not on doc
  textElevation: PropTypes.number,
  // not modified by user
  position: PropTypes.oneOf(['left', 'right', 'center']),
  active: PropTypes.bool,
  distanceToEdge: PropTypes.number,
  paddingTopBottom: PropTypes.number, // modified by parent property "actionsPaddingTopBottom"
  onPress: PropTypes.func
};

AnterosFloatingActionItem.defaultProps = {
  color: '#1253bc',
  distanceToEdge: 30,
  textElevation: 5,
  textColor: '#444444',
  textBackground: '#ffffff'
};

const stylesItem = StyleSheet.create({
  container: {
    elevation: 0,
    flex: 1,
    flexDirection: 'column'
  },
  actionContainer: {
    elevation: 0,
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 8,
    paddingTop: 8
  },
  centerActionContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  textContainer: {
    paddingHorizontal: 8,
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowColor: '#000000',
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 4,
    height: 22,
    marginTop: 8
  },
  leftTextContainer: {
    marginLeft: 14
  },
  rightTextContainer: {
    marginRight: 14
  },
  text: {
    fontSize: 14,
    lineHeight: 20
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowColor: '#000000',
    shadowRadius: 3,
    elevation: 5
  },
  iconLogo: {
    resizeMode: 'cover',
    width: 40,
    height: 40,
    borderRadius: 20
  },
  icon: {
    resizeMode: 'contain',
    width: 20,
    height: 20
  }
});