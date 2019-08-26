import React, {Component} from 'react'
import {View, Animated, Dimensions, StyleSheet, Easing} from 'react-native'
import {AnterosNavigationPage, AnterosClockTimePicker, AnterosCircularActionMenu} from 'anteros-react-native';

const { width, height } = Dimensions.get("window");


export default class ClockTimePickerExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Clock time picker',
    showBackButton: true
  };

  constructor(props){
      super(props);
      this.state = {
        clockDraging: false,
        datePickerAnimation: new Animated.Value(width),
        timePickerAnimation: new Animated.Value(width)
      };
  }

  componentDidMount() {
    this.enterAnimation();
  }

  createTimingAnimation = (controlVar, duration) => {
    return Animated.timing(controlVar, {
      toValue: 0,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true
    });
  };

  enterAnimation = () => {
    const { datePickerAnimation, timePickerAnimation } = this.state;
    Animated.stagger(100, [
      this.createTimingAnimation(datePickerAnimation, 800),
      this.createTimingAnimation(timePickerAnimation, 800)
    ]).start();
  };
  
  onClockDrag = () => {
    this.setState({...this.state, clockDraging: true });
  };

  onEndClockDrag = () => {
    this.setState({...this.state, clockDraging: false });
  };


  renderPage(){
    const {
        datePickerAnimation,
        timePickerAnimation,
        clockDraging
      } = this.state;

    const timePickerOpacityInterpolate = timePickerAnimation.interpolate({
        inputRange: [0, width / 3],
        outputRange: [1, 0],
        extrapolate: "clamp"
        });  

    return (<Animated.View
                style={[
                styles.timePicker,
                { opacity: timePickerOpacityInterpolate }
                ]}>
                <AnterosClockTimePicker
                    highlightColor={"#7658d4"}
                    markerColor={"#f5437b"}
                    hourColor={"#7658d4"}
                    minuteColor={"#9c87e0"}
                    onDrag={this.onClockDrag}
                    onEndDrag={this.onEndClockDrag}
                />
            </Animated.View>);
  }
}


const styles = StyleSheet.create({    
    timePicker: {
      flex: 1,
      width: "100%",
      padding: 10,
      marginTop: 20
    }
  });