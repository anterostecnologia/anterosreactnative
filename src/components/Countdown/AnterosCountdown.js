import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewPropTypes,
  Animated,
  Easing,
  AppState
} from 'react-native';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import {AnterosText} from '../Text/AnterosText';

const DEFAULT_BG_COLOR = '#FAB913';
const DEFAULT_TIME_TXT_COLOR = '#000';
const DEFAULT_DIGIT_TXT_COLOR = '#000';
const DEFAULT_TIME_TO_SHOW = ['D', 'H', 'M', 'S'];

export class AnterosCountdown extends React.Component {
  static propTypes = {
    digitBgColor: PropTypes.string,
    digitTxtColor: PropTypes.string,
    timeTxtColor: PropTypes.string,
    timeToShow: PropTypes.array,
    size: PropTypes.number,
    until: PropTypes.number,
    onFinish: PropTypes.func,
    onPress: PropTypes.func,
  };

  state = {
    until: this.props.until,
    wentBackgroundAt: null,
  };

  componentDidMount() {
    if (this.props.onFinish) {
      this.onFinish = _.once(this.props.onFinish);
    }
    this.timer = setInterval(this.updateTimer, 1000);
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = currentAppState => {
    const {until, wentBackgroundAt} = this.state;
    if (currentAppState === 'active' && wentBackgroundAt) {
      const diff = (Date.now() - wentBackgroundAt) / 1000.0;
      this.setState({until: Math.max(0, until - diff)});
    }
    if (currentAppState === 'background') {
      this.setState({wentBackgroundAt: Date.now()});
    }
  }

  getTimeLeft = () => {
    const {until} = this.state;
    return {
      seconds: until % 60,
      minutes: parseInt(until / 60, 10) % 60,
      hours: parseInt(until / (60 * 60), 10) % 24,
      days: parseInt(until / (60 * 60 * 24), 10),
    };
  };

  updateTimer = () => {
    const {until} = this.state;

    if (until <= 1) {
      clearInterval(this.timer);
      if (this.onFinish) {
        this.onFinish();
        this.setState({until: 0});
      }
    } else {
      this.setState({until: until - 1});
    }
  };

  renderDigit = (d) => {
    const {digitBgColor, digitTxtColor, size} = this.props;
    return (
      <View style={[
        styles.digitCont,
        {backgroundColor: digitBgColor},
        {width: size * 2.3, height: size * 2.6},
      ]}>
        <AnterosText style={[
          styles.digitTxt,
          {fontSize: size},
          {color: digitTxtColor}
        ]}>
          {d}
        </AnterosText>
      </View>
    );
  };

  renderDoubleDigits = (label, digits) => {
    const {timeTxtColor, size} = this.props;

    return (
      <View key={label} style={styles.doubleDigitCont}>
        <View style={styles.timeInnerCont}>
          {this.renderDigit(digits)}
        </View>
        <AnterosText style={[
          styles.timeTxt,
          {fontSize: size / 1.8},
          {color: timeTxtColor},
        ]}>
          {label}
        </AnterosText>
      </View>
    );
  };

  renderCountDown = () => {
    const {timeToShow} = this.props;
    const {until} = this.state;
    const {days, hours, minutes, seconds} = this.getTimeLeft();
    const newTime = sprintf('%02d:%02d:%02d:%02d', days, hours, minutes, seconds).split(':');
    const Component = this.props.onPress ? TouchableOpacity : View;

    return (
      <Component
        style={styles.timeCont}
        onPress={this.props.onPress}
      >
        {_.includes(timeToShow, 'D') ? this.renderDoubleDigits('Days', newTime[0]) : null}
        {_.includes(timeToShow, 'H') ? this.renderDoubleDigits('Hours', newTime[1]) : null}
        {_.includes(timeToShow, 'M') ? this.renderDoubleDigits('Minutes', newTime[2]) : null}
        {_.includes(timeToShow, 'S') ? this.renderDoubleDigits('Seconds', newTime[3]) : null}
      </Component>
    );
  };

  render() {
    return (
      <View style={this.props.style}>
        {this.renderCountDown()}
      </View>
    );
  }
}

AnterosCountdown.defaultProps = {
  digitBgColor: DEFAULT_BG_COLOR,
  digitTxtColor: DEFAULT_DIGIT_TXT_COLOR,
  timeTxtColor: DEFAULT_TIME_TXT_COLOR,
  timeToShow: DEFAULT_TIME_TO_SHOW,
  until: 0,
  size: 15,
};

const styles = StyleSheet.create({
  timeCont: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeTxt: {
    color: 'white',
    marginVertical: 2,
    backgroundColor: 'transparent',
  },
  timeInnerCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitCont: {

    borderRadius: 5,
    marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doubleDigitCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
});



// compatability for react-native versions < 0.44
const ViewPropTypesStyle = ViewPropTypes
  ? ViewPropTypes.style
  : View.propTypes.style

const stylesCircle = StyleSheet.create({
  outerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
  },
  innerCircle: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  leftWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  halfCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#f00',
  },
})

function calcInterpolationValuesForHalfCircle1(animatedValue, { shadowColor }) {
  const rotate = animatedValue.interpolate({
    inputRange: [0, 50, 50, 100],
    outputRange: ['0deg', '180deg', '180deg', '180deg'],
  })

  const backgroundColor = shadowColor
  return { rotate, backgroundColor }
}

function calcInterpolationValuesForHalfCircle2(
  animatedValue,
  { color, shadowColor },
) {
  const rotate = animatedValue.interpolate({
    inputRange: [0, 50, 50, 100],
    outputRange: ['0deg', '0deg', '180deg', '360deg'],
  })

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 50, 50, 100],
    outputRange: [color, color, shadowColor, shadowColor],
  })
  return { rotate, backgroundColor }
}

function getInitialState(props) {
  const circleProgress = new Animated.Value(0)
  return {
    circleProgress,
    secondsElapsed: 0,
    text: props.updateText(0, props.seconds),
    interpolationValuesHalfCircle1: calcInterpolationValuesForHalfCircle1(
      circleProgress,
      props,
    ),
    interpolationValuesHalfCircle2: calcInterpolationValuesForHalfCircle2(
      circleProgress,
      props,
    ),
  }
}

class Circle extends React.PureComponent {
  static propTypes = {
    seconds: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    color: PropTypes.string,
    shadowColor: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    bgColor: PropTypes.string,
    borderWidth: PropTypes.number,
    containerStyle: ViewPropTypesStyle,
    textStyle: Text.propTypes.style,
    updateText: PropTypes.func,
    onTimeElapsed: PropTypes.func,
  };

  static defaultProps = {
    color: '#f00',
    shadowColor: '#999',
    bgColor: '#e9e9ef',
    borderWidth: 2,
    seconds: 10,
    children: null,
    containerStyle: null,
    textStyle: null,
    onTimeElapsed: () => null,
    updateText: (elapsedSeconds, totalSeconds) =>
      (totalSeconds - elapsedSeconds).toString(),
  };

  constructor(props) {
    super(props)

    this.state = getInitialState(props);
    this.restartAnimation();
  }

 

  componentWillReceiveProps(nextProps) {
    if (
      this.props.seconds !== nextProps.seconds
    ) {
      this.state.circleProgress.stopAnimation()
      this.setState(getInitialState(nextProps), this.restartAnimation)
    }
  }

  onCircleAnimated = ({ finished }) => {
    // if animation was interrupted by stopAnimation don't restart it.
    if (!finished) return

    const secondsElapsed = this.state.secondsElapsed + 1
    const callback = secondsElapsed < this.props.seconds
      ? this.restartAnimation
      : this.props.onTimeElapsed
    const updatedText = this.props.updateText(
      secondsElapsed,
      this.props.seconds,
    )
    this.setState(
      {
        ...getInitialState(this.props),
        secondsElapsed,
        text: updatedText,
      },
      callback,
    )
  };

  restartAnimation = () => {
    this.state.circleProgress.stopAnimation()
    Animated.timing(this.state.circleProgress, {
      toValue: 100,
      duration: 1000,
      easing: Easing.linear,
    }).start(this.onCircleAnimated)
  };

  renderHalfCircle({ rotate, backgroundColor }) {
    const { radius } = this.props

    return (
      <View
        style={[
          stylesCircle.leftWrap,
          {
            width: radius,
            height: radius * 2,
          },
        ]}
      >
        <Animated.View
          style={[
            stylesCircle.halfCircle,
            {
              width: radius,
              height: radius * 2,
              borderRadius: radius,
              backgroundColor,
              transform: [
                { translateX: radius / 2 },
                { rotate },
                { translateX: -radius / 2 },
              ],
            },
          ]}
        />
      </View>
    )
  }

  renderInnerCircle() {
    const radiusMinusBorder = this.props.radius - this.props.borderWidth
    return (
      <View
        style={[
          stylesCircle.innerCircle,
          {
            width: radiusMinusBorder * 2,
            height: radiusMinusBorder * 2,
            borderRadius: radiusMinusBorder,
            backgroundColor: this.props.bgColor,
            ...this.props.containerStyle,
          },
        ]}
      >
        <AnterosText style={this.props.textStyle}>
          {this.state.text}
        </AnterosText>
      </View>
    )
  }

  render() {
    const {
      interpolationValuesHalfCircle1,
      interpolationValuesHalfCircle2,
    } = this.state
    return (
      <View
        style={[
          stylesCircle.outerCircle,
          {
            width: this.props.radius * 2,
            height: this.props.radius * 2,
            borderRadius: this.props.radius,
            backgroundColor: this.props.color,
          },
        ]}
      >
        {this.renderHalfCircle(interpolationValuesHalfCircle1)}
        {this.renderHalfCircle(interpolationValuesHalfCircle2)}
        {this.renderInnerCircle()}
      </View>
    )
  }
}

const stylesTimer = StyleSheet.create({
  cardItemTimeRemainTxt: {
    fontSize: 20,
    color: '#ee394b'
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  },
  container: {
    flexDirection: 'row',
  },
  defaultTime: {
    paddingHorizontal: 3,
    backgroundColor: 'rgba(85, 85, 85, 1)',
    fontSize: 12,
    color: 'white',
    marginHorizontal: 3,
    borderRadius: 2,
  },

  defaultColon: {
    fontSize: 12, color: 'rgba(85, 85, 85, 1)'
  }
});

class Timer extends Component {
    static displayName = 'Simple countDown';
    static propTypes = {
      date: PropTypes.string,
      days: PropTypes.objectOf(PropTypes.string),
      hours: PropTypes.string,
      mins: PropTypes.string,
      secs: PropTypes.string,
      onEnd: PropTypes.func,

      containerStyle: View.style,
      daysStyle: Text.style,
      hoursStyle: Text.style,
      minsStyle: Text.style,
      secsStyle: Text.style,
      firstColonStyle: Text.style,
      secondColonStyle: Text.style,

    };
    static defaultProps = {
      date: new Date(),
      days: {
        plural: 'days',
        singular: 'day',
      },
      hours: ':',
      mins: ':',
      secs: ':',
      onEnd: () => {},

      containerStyle: stylesTimer.container,
      daysStyle: stylesTimer.defaultTime,
      hoursStyle: stylesTimer.defaultTime,
      minsStyle: stylesTimer.defaultTime,
      secsStyle: stylesTimer.defaultTime,
      firstColonStyle: stylesTimer.defaultColon,
      secondColonStyle: stylesTimer.defaultColon,

    };
    state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    };
    componentDidMount() {
      //console.log(this.props.date);//"2017-03-29T00:00:00+00:00"
      this.interval = setInterval(()=> {
        const date = this.getDateData(this.props.date);
        if (date) {
          this.setState(date);
        } else {
          this.stop();
          this.props.onEnd();
        }
      }, 1000);
    }
    componentWillMount() {
      const date = this.getDateData(this.props.date);
      if (date) {
        this.setState(date);
      }

    }
    componentWillUnmount() {
      this.stop();
    }
    getDateData(endDate) {
      let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date)) / 1000;

      if (diff <= 0) {
        return false;
      }

      const timeLeft = {
        years: 0,
        days: 0,
        hours: 0,
        min: 0,
        sec: 0,
        millisec: 0,
      };

      if (diff >= (365.25 * 86400)) {
        timeLeft.years = Math.floor(diff / (365.25 * 86400));
        diff -= timeLeft.years * 365.25 * 86400;
      }
      if (diff >= 86400) {
        timeLeft.days = Math.floor(diff / 86400);
        diff -= timeLeft.days * 86400;
      }
      if (diff >= 3600) {
        timeLeft.hours = Math.floor(diff / 3600);
        diff -= timeLeft.hours * 3600;
      }
      if (diff >= 60) {
        timeLeft.min = Math.floor(diff / 60);
        diff -= timeLeft.min * 60;
      }
      timeLeft.sec = diff;
      return timeLeft;
    }
    render() {
      const countDown = this.state;
      let days;
      if (countDown.days === 1) {
        days = this.props.days.singular;
      } else {
        days = this.props.days.plural;
      }
      return (
          <View style={this.props.containerStyle}>
            { (countDown.days>0) ? <AnterosText style={this.props.daysStyle}>{ this.leadingZeros(countDown.days)+days}</AnterosText> : null}
            <AnterosText style={this.props.hoursStyle}>{ this.leadingZeros(countDown.hours)}</AnterosText>
            <AnterosText style={ this.props.firstColonStyle}>{this.props.hours}</AnterosText>
            <AnterosText style={this.props.minsStyle}>{this.leadingZeros(countDown.min)}</AnterosText>
            <AnterosText style={this.props.secondColonStyle}>{this.props.mins}</AnterosText>
            <AnterosText style={this.props.secsStyle}>{this.leadingZeros(countDown.sec)}</AnterosText>
            <AnterosText style={this.props.secondColonStyle}>{this.props.secs}</AnterosText>
          </View>


      );
    }
    stop() {
      clearInterval(this.interval);
    }
    leadingZeros(num, length = null) {

      let length_ = length;
      let num_ = num;
      if (length_ === null) {
        length_ = 2;
      }
      num_ = String(num_);
      while (num_.length < length_) {
        num_ = '0' + num_;
      }
      return num_;
    }
};

AnterosCountdown.Timer = Timer;
AnterosCountdown.Circle = Circle;