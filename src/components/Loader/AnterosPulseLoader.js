//https://github.com/mastermoo/react-native-pulse-loader

import React from "react";
import { View, Image, TouchableOpacity, Animated, Easing, Dimensions, StyleSheet } from "react-native";
import PropTypes from 'prop-types';
const { height, width } = Dimensions.get('window');

export default class AnterosPulseLoader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      circles: []
    };

    this.counter = 1;
    this.setInterval = null;
    this.anim = new Animated.Value(1);
      
  }

  componentDidMount() {
    this.setCircleInterval();
  }

  setCircleInterval() {
    this.setInterval = setInterval(
      this.addCircle.bind(this),
      this.props.interval
    );
    this.addCircle();
  }

  addCircle() {
    this.setState({ circles: [...this.state.circles, this.counter] });
    this.counter++;
  }

  onPressIn() {
    Animated.timing(this.anim, {
      useNativeDriver: true,
      toValue: this.props.pressInValue,
      duration: this.props.pressDuration,
      easing: this.props.pressInEasing
    }).start(() => clearInterval(this.setInterval));
  }

  onPressOut() {
    Animated.timing(this.anim, {
      useNativeDriver: true,
      toValue: 1,
      duration: this.props.pressDuration,
      easing: this.props.pressOutEasing
    }).start(this.setCircleInterval.bind(this));
  }

  render() {
    const { size, avatar, avatarBackgroundColor, interval } = this.props;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {this.state.circles.map(circle => (
          <AnterosPulse key={circle} {...this.props} />
        ))}

        <TouchableOpacity
          activeOpacity={1}
          onPressIn={this.onPressIn.bind(this)}
          onPressOut={this.onPressOut.bind(this)}
          style={{
            transform: [
              {
                scale: this.anim
              }
            ]
          }}
        >
          <Image
            source={{ uri: avatar }}
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: avatarBackgroundColor
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

AnterosPulseLoader.propTypes = {
  interval: PropTypes.number,
  size: PropTypes.number,
  pulseMaxSize: PropTypes.number,
  avatar: PropTypes.string.isRequired,
  avatarBackgroundColor: PropTypes.string,
  pressInValue: PropTypes.number,
  pressDuration: PropTypes.number,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  getStyle: PropTypes.func
};

AnterosPulseLoader.defaultProps = {
  interval: 2000,
  size: 100,
  pulseMaxSize: 250,
  avatar: undefined,
  avatarBackgroundColor: "white",
  pressInValue: 0.8,
  pressDuration: 150,
  pressInEasing: Easing.in,
  pressOutEasing: Easing.in,
  borderColor: "#D8335B",
  backgroundColor: "#ED225B55",
  getStyle: undefined
};


class AnterosPulse extends React.Component {
	constructor(props) {
		super(props);
	
		this.anim = new Animated.Value(0);
	}

	componentDidMount() {
		Animated.timing(this.anim, {
			toValue: 1,
			duration: this.props.interval,
			easing: Easing.in,
		})
		.start();
	}

	render() {
    const { size, pulseMaxSize, borderColor, backgroundColor, getStyle } = this.props;
    
    const left = (this.props.left==undefined?width/2:this.props.left);
		const top = (this.props.top==undefined?height/2:this.props.top);

		return (
			<View style={[styles.circleWrapper, {
        left: left,
        top: top,
				width: pulseMaxSize,
				height: pulseMaxSize,
				marginLeft: -pulseMaxSize/2,
				marginTop: -pulseMaxSize/2,
			}]}>
				<Animated.View
					style={[styles.circle, {
						borderColor,
						backgroundColor,
						width: this.anim.interpolate({
							inputRange: [0, 1],
							outputRange: [size, pulseMaxSize]
						}),
						height: this.anim.interpolate({
							inputRange: [0, 1],
							outputRange: [size, pulseMaxSize]
						}),
						borderRadius: pulseMaxSize/2,
						opacity: this.anim.interpolate({
							inputRange: [0, 1],
							outputRange: [1, 0]
						})
					}, getStyle && getStyle(this.anim)]}
				/>
			</View>
		);
	}	
}


const styles = StyleSheet.create({
	circleWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
	},
	circle: {
		borderWidth: 4 * StyleSheet.hairlineWidth,
	},
});

