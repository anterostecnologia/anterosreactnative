//https://github.com/Ramotion/react-native-circle-menu

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Animated, TouchableWithoutFeedback, Platform, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const BUTTON_SIZE = 50;

constants = {
  BORDER_RADIUS: BUTTON_SIZE / 2,
  BUTTON_SIZE,
  ICON_SIZE: 20,
  RADIUS: 70
}

const styles = {
  actionContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    padding: 0
  },
  actionBarItem: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
};

export class AnterosCircleMenu extends Component {
  static propTypes = {
    active: PropTypes.bool,
    bgColor: PropTypes.string,
    itemSize: PropTypes.number,
    onPress: PropTypes.func,
    radius: PropTypes.number
  };

  static defaultProps = {
    active: false,
    bgColor: '#0E1329',
    itemSize: 60,
    onPress() {},
    radius: 170
  };

  constructor(props) {
    super(props);

    this.state = {
      startDeg: 0,
      active: props.active,
      animation: new Animated.Value(+!!props.active),
      isMenuOpen: false
    }
  }

  openMenu = () => {
    this.state.animation.setValue(0);

    this.setState({
        active: true,
        isMenuOpen: true
    });

    Animated.timing(this.state.animation, {
      duration: 300,
      toValue: 1
    }).start(this.state.animation.setValue(0))
  };

  closeMenu = () => {
    this.setState({
      active: false,
      isMenuOpen: false
    });

    Animated.spring(this.state.animation, {
      toValue: .5,
      friction: 4
    }).start(this.state.animation.setValue(0))
  };

  renderButton() {
    if(this.state.isMenuOpen) {
      return <TouchableIcon
        backgroundColor="#535A6B"
        color="#0E1329"
        icon="md-close"
        onPress={this.closeMenu}
      />
    }

    return <TouchableIcon
      color="#0E1329"
      icon="md-menu"
      onPress={this.openMenu}
    />
  }

  renderActions() {
    if(!this.state.active) {
      return null
	}
    
    const increase = Math.PI * 2 / this.props.items.length;
    let angle = -Math.PI / 2;

    return this.props.items.map((item, index) => {
      const btnAngle = angle;

      angle += increase;

      return <ActionIcon
        key={index}
        animation={this.state.animation}
        angle={btnAngle}
        bgColor={this.props.bgColor}
        buttonColor={item.color}
        icon={item.name}
        radius={this.props.radius - this.props.itemSize}
        onPress={() => {
          this.closeMenu();
          this.props.onPress(index);
        }}
        size={this.props.itemSize}
        style={[styles.actionContainer, {position: 'absolute'}]}
      />
    })
  }

  render() {
    return <View style={styles.actionContainer}>
      {this.renderActions()}
      <View
        pointerEvents="box-none"
        style={styles.actionContainer}
      >
        <Animated.View useNativeDriver={true}   style={[styles.actionBarItem, {
          top: (this.props.itemSize - constants.BUTTON_SIZE - 10) / 2 + 5,
          left: 0,
          transform: [{
            rotate: this.state.animation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg']
            })
          }],
          height: constants.BUTTON_SIZE,
          width: constants.BUTTON_SIZE
        }]}>
          {this.renderButton()}
        </Animated.View>
      </View>
    </View>
  }
}




const stylesAction = {
    actionButton: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 2,
      position: 'absolute'
    },
    circle: {
      alignItems: 'center',
      backgroundColor: '#0E1329',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative'
    },
    leftWrap: {
      overflow: 'hidden',
      position: 'absolute'
    },
    rightWrap: {
      position: 'absolute'
    },
    loader: {
      borderRadius: 1000,
      left: 0,
      position: 'absolute',
      top: 0
    },
    innerCircle: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 1
    },
    actionContainer: {
      alignItems: 'center',
      flexDirection: 'column',
      padding: 0
    }
  };
  
  class ActionIcon extends Component {
    static propTypes = {
      afterPress: PropTypes.func,
      angle: PropTypes.number,
      buttonColor: PropTypes.string,
      duration: PropTypes.number,
      icon: PropTypes.string.isRequired,
      onPress: PropTypes.func,
      radius: PropTypes.number,
      size: PropTypes.number,
      style: View.style
    };
  
    static defaultProps = {
      afterPress() {},
      duration: 500,
      onPress() {}
    };
  
    constructor(props) {
      super(props);
  
      this.radius = (props.radius / 2 + props.size / 2);
  
      this.state = {
        isActive: false,
        startDeg: (props.angle * 180 / Math.PI) + 90,
        progress: 0,
        circleWidth: props.size
      };
  
      this.animation = new Animated.Value(0);
      this.closeAnimation = new Animated.Value(0);
  
      this.animation.addListener(({value}) => {
        this.move(value);
        this.setState({progress: value});
      });
    }
  
    move(value) {
      const angle = this.props.angle + Math.PI * 2 * value;
  
      this.btn.setNativeProps({
        style: {
          transform: [
            {translateY: this.radius * Math.sin(angle)},
            {translateX: this.radius * Math.cos(angle)}
          ]
        }
      })
    }
  
    startAnimation = () => {
      this.setState({isActive: true});
  
      const left = (this.props.size - constants.BUTTON_SIZE - 10) / 2 + 5;
      const size = this.props.radius + this.props.size * 4;
      const position = -(this.props.radius + this.props.size) / 2;
  
      this.wraper.setNativeProps({
        style: [this.props.style, {
          alignItems: 'center',
          height: size,
          justifyContent: 'center',
          left: position - left - this.props.size,
          overflow: 'visible',
          top: position - this.props.size,
          width: size,
          zIndex: 1000
        }]
      });
  
      this.animation.setValue(0);
  
      Animated.timing(this.animation, {
        duration: this.props.duration,
        toValue: 1
      }).start(this.startClose)
    };
  
    startClose = () => {
      this.wraper.setNativeProps({
        style: [this.props.style, {
          backgroundColor: this.props.bgColor
        }]
      });
  
      Animated.timing(this.closeAnimation, {
        duration: 300,
        toValue: 1
      }).start(() => {
        this.closeAnimation.setValue(0);
        this.props.onPress()
      })
    };
  
    render() {
      const radius = this.props.radius + this.props.size;
      const outRadius = radius * 2;
      const border = (this.props.size - 50) / 2 + 5;
  
      return <Animated.View useNativeDriver={true}
        style={[this.props.style]}
        ref={(ref) => this.wraper = ref}
      >
        <Animated.View useNativeDriver={true}   style={{
          alignItems: 'center',
          display: this.state.isActive ? 'flex' : 'none',
          height: outRadius + this.props.size * 2,
          justifyContent: 'center',
          opacity: this.closeAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, .3]
          }),
          position: 'absolute',
          top: -this.props.radius / 2,
          transform: [{rotate: this.state.startDeg + 'deg'}]
        }}>
          {/* <Progress.Circle
              animated={false}
              borderColor="rgba(0, 0, 0, 0)"
              borderWidth={border}
              color={this.props.buttonColor}
              progress={this.state.progress}
              size={this.props.radius + (border * 2) + 2 + this.state.circleWidth * 2}
              strokeCap="round"
              thickness={this.state.circleWidth + 4}
          /> */}
        </Animated.View>
  
        <Animated.View useNativeDriver={true}
          ref={ref => this.btn = ref}
          style={[{
            height: this.props.size,
            opacity: this.closeAnimation.interpolate({
              inputRange: [0, .1],
              outputRange: [1, 0]
            }),
            transform: [
              {scale: this.props.animation.interpolate({
                inputRange: [0, .3, .75, 1],
                outputRange: [.1, .1, 1.2, 1]
              })},
              {translateX: this.radius * Math.cos(this.props.angle)},
              {translateY: this.radius * Math.sin(this.props.angle)}
            ],
            width: this.props.size,
            zIndex: 100
          }]}
        >
          <TouchableOpacity
            activeOpacity={this.props.activeOpacity || .85}
            onPress={this.startAnimation}
            style={{flex:1}}
          >
            <View style={[stylesAction.actionButton, {
              backgroundColor: this.props.buttonColor,
              borderRadius: this.props.size / 2,
              height: this.props.size,
              width: this.props.size
            }]}>
              <TouchableIcon
                afterAnimation={this.startAnimation}
                backgroundColor={this.props.buttonColor}
                buttonSize={this.props.size - 2}
                color="#FFF"
                iconSize={27}
                icon={this.props.icon}
              />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    }
  }


  const stylesTouch = {
    container: {
      alignItems: 'center',
      justifyContent: 'center'
    }
  };
  
class TouchableIcon extends Component {
    static propTypes = {
      afterAnimation: PropTypes.func,
      backgroundColor: PropTypes.string.isRequired,
      buttonSize: PropTypes.number,
      color: PropTypes.string,
      duration: PropTypes.number,
      icon: PropTypes.string.isRequired,
      iconSize: PropTypes.number,
      onPress: PropTypes.func
    };
  
    static defaultProps = {
      afterAnimation() {},
      backgroundColor: '#FFF',
      buttonSize: constants.BUTTON_SIZE,
      duration: 250,
      iconSize: 25,
      onPress() {}
    };
  
    state = {
      animation: new Animated.Value(0)
    };
  
    render() {
      const {
        afterAnimation,
        backgroundColor,
        buttonSize,
        color,
        duration,
        icon,
        iconSize,
        onPress
      } = this.props;
  
      let size = buttonSize;
  
      if (Platform.OS === 'ios') {
        size += 1;
      }
  
      return <TouchableWithoutFeedback
        style={{
          height: buttonSize,
          position: 'relative',
          width: buttonSize
        }}
        onPress={() => {
          onPress();
  
          if(Platform.OS === 'ios') {
            Animated.timing(this.state.animation, {
              duration,
              toValue: 1
            }).start(() => {
              this.state.animation.setValue(0);
              afterAnimation()
            })
          } else {
            afterAnimation()
          }
        }}
      >
        <Animated.View useNativeDriver={true}   style={[stylesTouch.container, {
          backgroundColor: 'transparent',
          borderColor: '#FFF',
          borderRadius: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [buttonSize / 2, buttonSize]
          }),
          borderWidth: this.state.animation.interpolate({
            inputRange: [0, .1, 1],
            outputRange: [0, buttonSize / 2, 0]
          }),
          height: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [buttonSize, buttonSize * 2]
          }),
          left: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -buttonSize / 2]
          }),
          position: 'absolute',
          top: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -buttonSize / 2]
          }),
          width: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [buttonSize, buttonSize * 2]
          })
        }]}>
          <View style={[stylesTouch.container, {
            backgroundColor,
            borderColor: 'transparent',
            borderRadius: buttonSize,
            height: size,
            paddingTop: Platform.OS === 'ios' ? 2 : 0,
            paddingLeft: Platform.OS === 'ios' ? 1 : 0,
            width: size
          }]}>
            <Icon
              color={color || '#FFF'}
              name={icon}
              size={iconSize}
            />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    }
  }