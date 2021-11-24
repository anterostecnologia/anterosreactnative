import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Platform, Text, ART, ViewPropTypes, Easing, AppState, 
  Animated, Dimensions, StyleSheet, ScrollView } from 'react-native';
import lodash from 'lodash'



import Svg,{
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Use,
  Defs,
  Stop
} from 'react-native-svg';

class SemiCircular extends Component {

  extractFill(fill) {
    if(fill < -50)
      return -50;
    else if(fill > 50)
      return 50;

    return fill;
  }

  getPath(cx, cy, r, startDegree, endDegree, clockWise) {
    let p = ART.Path();
    let multiplier = clockWise === 1? 1: (clockWise-1)
    if (Platform.OS === 'ios')
    {
      p.path.push(0, cx+r, cy);
      p.path.push(4, cx, cy, r, (startDegree) * Math.PI / 180, (endDegree * multiplier) * Math.PI / 180, clockWise);
    }
    else
    {
      p.path.push(4, cx, cy, r, startDegree * Math.PI / 180, ((startDegree - endDegree) * multiplier) * Math.PI / 180, 0);
    }
    return p;
  }

  drawChartPath()
  {
    const { chartWidth, strokeWidth, fill, style } = this.props;
    const purgedFill = this.extractFill(fill);

    let graph;
    let chartPath, chartColor;
    const backgroundPath = this.getPath(chartWidth / 2, chartWidth / 2, chartWidth / 2 - strokeWidth / 2, 0, 180, 1);

    if(purgedFill<0)
    {
      chartPath = this.getPath(chartWidth / 2, chartWidth / 2, chartWidth / 2 - strokeWidth / 2, 0, 90 * Math.abs(purgedFill)*2 / 100, 0);
      chartColor = "rgb(245,40,55)"
    }
    else
    {
      chartPath = this.getPath(chartWidth / 2, chartWidth / 2, chartWidth / 2 - strokeWidth / 2, 0, 90 * Math.abs(purgedFill)*2 / 100, 1);
      chartColor = "rgb(120,200,65)"
    }

    return(
      <ART.Surface
        width={chartWidth}
        height={chartWidth/2}>
          <ART.Group rotation={180} originX={chartWidth/2} originY={chartWidth/2}>
            <ART.Shape
              d={backgroundPath}
              stroke="rgba(225,235,235,1)"
              strokeWidth={strokeWidth}/>
          </ART.Group>
          <ART.Group rotation={270} originX={chartWidth/2} originY={chartWidth/2}>
            <ART.Shape
              d={chartPath}
              stroke={chartColor}
              strokeCap="butt"
              strokeWidth={strokeWidth}/>
          </ART.Group>
      </ART.Surface>
    )
  }

  render() {
    const { fill, style } = this.props;

    const customViewStyle={
      ...style,
      alignItems:'center',
      marginBottom:-30
    };
    const textStyle = {
      fontSize:20+(customViewStyle.marginBottom/5),
      top:-20,
      backgroundColor:'white',
      textAlign:'center'
    };

    return (
      <View style={customViewStyle}>
        {this.drawChartPath()}
        <Text
          style={textStyle}>
            &nbsp;{Math.round(fill,2)}&nbsp;
        </Text>
      </View>
    )
  }
}

SemiCircular.propTypes = {
  style: View.style,
  chartWidth: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired
}



const AnimatedProgress = Animated.createAnimatedComponent(SemiCircular);

class AnimatedSemiCircular extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chartFillAnimation: new Animated.Value(props.prefill || 0)
    }
  }

  componentDidMount() {
    this.animateFill();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fill !== this.props.fill) {
      this.animateFill();
    }
  }

  animateFill() {
    const { tension, friction } = this.props;
    Animated.spring(
      this.state.chartFillAnimation,
      {
        toValue: this.props.fill,
        tension,
        friction
      }
    ).start();
  }

  render() {
    const { fill, prefill, ...other } = this.props;
    return (
        <AnimatedProgress
          {...other}
          fill={this.state.chartFillAnimation}
          />
      )
  }
}

AnimatedSemiCircular.propTypes = {
  style: View.style,
  chartWidth: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  prefill: PropTypes.number,
  strokeWidth: PropTypes.number.isRequired,
  tension: PropTypes.number,
  friction: PropTypes.number
}

AnimatedSemiCircular.defaultProps = {
  tension: 1,
  friction: 6,
};


export const AnterosGauge = function(){

}



class ProgressLabel extends Component {
  static propTypes = {
    size: PropTypes.number,
    startDegree: PropTypes.number,
    endDegree: PropTypes.number,
    progressWidth: PropTypes.number,
    trackWidth: PropTypes.number,
    cornersWidth: PropTypes.number,
    progress: PropTypes.number,
    fillColor: PropTypes.string.isRequired,
    trackColor: PropTypes.string.isRequired,
    progressColor: PropTypes.string.isRequired
  };

  static defaultProps = {
    startDegree: 0,
    progress: 0,
    progressWidth: 5,
    trackWidth: 5,
    cornersWidth: 10,
    size: 200
  };

  getPoint(r, degree) {
    const { size } = this.props;
    const d = degree / 180 * Math.PI;

    return {
      x: r * Math.sin(d) + size / 2,
      y: this.props.trackWidth / 2 + r * (1 - Math.cos(d))
    };
  }

  render() {
    const {
      progress,
      progressWidth,
      progressColor,
      trackWidth,
      cornersWidth,
      fillColor,
      trackColor,
      startDegree,
      size,
      children,
      ...props
    } = this.props;

    const r = size / 2 - trackWidth / 2;
    const endDegree = startDegree + progress * 360 / 100;
    const s = this.getPoint(r, startDegree);
    const e = this.getPoint(r, endDegree);

    let progressPath = null;
    if (progress < 50) {
      progressPath = `M ${s.x} ${s.y} A ${r} ${r}, 0, 0, 1, ${e.x},${e.y}`;
    } else {
      const m = this.getPoint(r, startDegree + 180);
      progressPath = `M ${s.x} ${s.y} A ${r} ${r}, 0, 0, 1, ${m.x},${m.y}
        M ${m.x} ${m.y} A ${r} ${r}, 0, 0, 1, ${e.x},${e.y}`;
    }

    const progressStyle = {
      strokeWidth: progressWidth,
      stroke: progressColor,
      fill: 'none'
    };

    const trackStyle = {
      fill: fillColor,
      stroke: trackColor,
      strokeWidth: trackWidth
    };

    return (
      
      <Svg
        {...props}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <Circle cx={size / 2} cy={size / 2} r={r} fill={trackStyle.fill} stroke={trackStyle.stroke} strokeWidth={trackStyle.strokeWidth} />
        {progress > 0 ? <Path d={progressPath} fill={progressStyle.fill} stroke={progressStyle.stroke} strokeWidth={progressStyle.strokeWidth} /> : null}
        {progress > 0 ? (
          <Circle cx={s.x} cy={s.y} r={cornersWidth} fill={progressColor} />
        ) : null}
        {progress > 0 ? (
          <Circle cx={e.x} cy={e.y} r={cornersWidth} fill={progressColor} />
        ) : null}
        {children}
      </Svg>
    );
  }
}




const GAUGE_WIDTH = Math.floor(Dimensions.get('window').width)
const INTERVAL_WIDTH =  18

const scale = (v, inputMin, inputMax, outputMin, outputMax) => {
  return Math.round(((v - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin)
}

class LineGauge extends Component {
  constructor(props) {
    super(props)

    this._handleScroll = this._handleScroll.bind(this)
    this._handleScrollEnd = this._handleScrollEnd.bind(this)
    this._handleContentSizeChange = this._handleContentSizeChange.bind(this)

    this.scrollMin = 0
    this.scrollMax = this._getScrollMax(props)
    this._scrollQueue = null
    this._value = props.value || props.min

    this.state = {
      contentOffset: this._scaleValue(this._value),
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.scrollMax = this._getScrollMax(nextProps)

    if (nextProps.value !== this._value) {
      this._setScrollQueue({
        x: this._scaleValue(nextProps.value, nextProps),
        animate: true,
      })

      if (!this._contentSizeWillChange(nextProps)) {
        this._resolveScrollQueue()
      }
    }
  }

  _contentSizeWillChange(nextProps) {
    let { min, max } = nextProps
    if (min !== this.props.min || max !== this.props.max) {
      return true
    }

    return false
  }

  _getScrollMax(props = this.props) {
    return (props.max - props.min) * INTERVAL_WIDTH
  }

  _scaleScroll(x, props = this.props) {
    let { min, max } = props
    return scale(x, this.scrollMin, this.scrollMax, min, max)
  }

  _scaleValue(v, props = this.props) {
    let { min, max } = props
    return scale(v, min, max, this.scrollMin, this.scrollMax)
  }

  _setScrollQueue(scrollTo) {
    this._scrollQueue = scrollTo
  }

  _resolveScrollQueue() {
    if (this._scrollQueue !== null) {
      this._scrollView && this._scrollView.scrollTo(this._scrollQueue)
      this._handleScrollEnd()
    }
  }

  _handleContentSizeChange() {
    this._resolveScrollQueue()
  }

  _handleScroll(event) {
    if (this._scrollQueue) return

    let offset = event.nativeEvent.contentOffset.x
    let { min, max } = this.props

    let val = this._scaleScroll(offset)

    if (val !== this._value) {
      this._value = val
      this.props.onChange(val)
    }
  }

  _handleScrollEnd() {
    this._value = this.props.value
    this._scrollQueue = null
  }

  _getIntervalSize(val) {
    let { largeInterval, mediumInterval } = this.props

    if (val % largeInterval == 0) return 'large'
    if (val % mediumInterval == 0) return 'medium'
    return 'small'
  }

  _renderIntervals() {
    let { min, max } = this.props
    let range = max - min + 1

    let values = lodash.times(range, (i) => i + min)

    return values.map((val, i) => {
      let intervalSize = this._getIntervalSize(val)

      return (
        <View key={`val-${i}`} style={stylesLine.intervalContainer}>
          {intervalSize === 'large' && (
            <Text style={[stylesLine.intervalValue, this.props.styles.intervalValue]}>{val}</Text>
          )}

          <View style={[stylesLine.interval, styles[intervalSize], this.props.styles.interval, this.props.styles[intervalSize]]}/>
        </View>
      )
    })
  }

  render() {
    return (
      <View style={[stylesLine.container, this.props.styles.container]}>
        <ScrollView
          ref={r => this._scrollView = r}
          automaticallyAdjustInsets={false}
          horizontal={true}
          decelerationRate={0}
          snapToInterval={INTERVAL_WIDTH}
          snapToAlignment="start"
          showsHorizontalScrollIndicator={false}
          onScroll={this._handleScroll}
          onMomentumScrollEnd={this._handleScrollEnd}
          onContentSizeChange={this._handleContentSizeChange}
          scrollEventThrottle={100}
          contentOffset={{ x: this.state.contentOffset }}>

          <View style={[stylesLine.intervals, this.props.styles.intervals]}>
            {this._renderIntervals()}
          </View>
        </ScrollView>

        <View style={[stylesLine.centerline, this.props.styles.centerline]} />
      </View>
    )
  }
}

LineGauge.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  largeInterval: PropTypes.number,
  mediumInterval: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func,
  styles: PropTypes.object,
}

LineGauge.defaultProps = {
  min: 1,
  max: 100,
  mediumInterval: 5,
  largeInterval: 10,
  onChange: () => {},
  styles: {},
}

var stylesLine = StyleSheet.create({
  container: {
    height: 55,
    width: GAUGE_WIDTH,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#DDDDDD',
    borderBottomColor: '#DDDDDD',
    backgroundColor: '#F9F9F9',
    marginVertical: 8,
  },
  intervals: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: GAUGE_WIDTH / 2,
    marginHorizontal: -INTERVAL_WIDTH / 2,
  },
  intervalContainer: {
    width: INTERVAL_WIDTH,
    alignItems: 'center',
  },
  interval: {
    width: 1,
    marginRight: -1,
    backgroundColor: '#979797',
  },
  intervalValue: {
    fontSize: 9,
    marginBottom: 3,
    fontWeight: 'bold',
  },
  small: {
    height: 13,
  },
  medium: {
    height: 20,
  },
  large: {
    backgroundColor: '#4A4A4A',
    width: 2,
    height: 26,
  },
  centerline: {
    height: 54,
    width: 1,
    backgroundColor: 'red',
    position: 'absolute',
    left: GAUGE_WIDTH / 2,
    opacity: 0.6,
    top: 0,
    zIndex: -1
  },
})


const Speedometer = ({ value, totalValue, size, outerColor, internalColor, style, showText, text, textStyle, showLabels, labelStyle, showPercent, percentStyle }) => {
  const styles = getStyles(size);
  const degreesValue = (value > totalValue) ? totalValue : value;
  const percentValue = parseInt(String((value * 100) / totalValue).split('.')[0]);
  const degrees = ((degreesValue * 180) / ((totalValue === 0) ? 1 : totalValue)) - 90;
  const degressStyle = {
    backgroundColor: internalColor,
    transform: [{ translateX: size / 4 }, { rotate: `${degrees}deg` }, { translateX: (size / 4 * -1) }],
  };

  const percentElement = (showPercent) ? (
    <Text style={[percentStyle]} numberOfLines={1}>{percentValue}%</Text>
  ) : null;

  const textElement = ((showText) && (text)) ? (
    <Text style={textStyle} numberOfLines={1}>{text}</Text>
  ) : null;

  const labelsElement = (showLabels) ? (
    <View style={[styles.labelsView, { width: size }]}>
      <Text style={[styles.initialLabel, labelStyle]} numberOfLines={1}>0</Text>
      <Text style={[styles.finalLabel, labelStyle]} numberOfLines={1}>{totalValue}</Text>
    </View>
  ) : null;

  return (
    <View style={style}>
      <View style={[styles.outerCircle, { backgroundColor: outerColor }]}>
        <View style={[styles.halfCircle, degressStyle]}/>
        <View style={styles.innerCircle}>
          {percentElement}
          {textElement}
        </View>
      </View>
      {labelsElement}
    </View>
  );
};

Speedometer.propTypes = {
  value: PropTypes.number.isRequired,
  totalValue: PropTypes.number.isRequired,
  size: PropTypes.number,
  outerColor: PropTypes.string,
  internalColor: PropTypes.string,
  style: PropTypes.object,
  showText: PropTypes.bool,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  textStyle: PropTypes.object,
  showLabels: PropTypes.bool,
  labelStyle: PropTypes.object,
  showPercent: PropTypes.bool,
  percentStyle: PropTypes.object,
};

Speedometer.defaultProps = {
  size: 200,
  outerColor: '#e6e6e6',
  internalColor: '#2eb82e',
  style: {},
  showText: false,
  text: '',
  textStyle: {},
  showLabels: false,
  labelStyle: {},
  showPercent: false,
  percentStyle: {},
};


const getStyles = (size) => ({
  outerCircle: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: size,
    height: size / 2,
    borderTopLeftRadius: size / 2,
    borderTopRightRadius: size / 2,
    overflow: 'hidden',
  },
  innerCircle: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: size * 0.5,
    height: (size / 2) * 0.5,
    borderTopLeftRadius: size / 2,
    borderTopRightRadius: size / 2,
    paddingLeft: 3,
    paddingRight: 3,
  },
  halfCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: size / 2,
    height: size,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRadius: size / 2,
  },
  labelsView: {
    flexDirection: 'row',
  },
  initialLabel: {
    flex: 1,
  },
  finalLabel: {
    flex: 0,
  },
});

const ActiveState = "active"

class GaugeProgress extends Component {

  state = {
    show: true
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    this.setState({show: nextAppState === ActiveState})
  }

  circlePath(cx, cy, r, startDegree, endDegree) {

    let p = ART.Path();
    p.path.push(0, cx + r, cy);
    p.path.push(4, cx, cy, r, startDegree * Math.PI / 180, endDegree * Math.PI / 180, 1);
    return p;
  }

  extractFill(fill) {
    if (fill < 0.01) {
      return 0;
    } else if (fill > 100) {
      return 100;
    }

    return fill;
  }

  render() {
    const { size, width, tintColor, backgroundColor, style, stroke, strokeCap, rotation, cropDegree, children } = this.props;
    const backgroundPath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, (360 * 99.9 / 100) - cropDegree);

    const fill = this.extractFill(this.props.fill);
    const circlePath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, ((360 * 99.9 / 100) - cropDegree) * fill / 100);
    const { show } =  this.state
    return (
      <View style={style}>
        {!!show &&
          <ART.Surface
            width={size}
            height={size}
            >
            <ART.Group rotation={rotation + cropDegree / 2} originX={size / 2} originY={size / 2}>
              <ART.Shape d={backgroundPath}
                     strokeDash={stroke}
                     stroke={backgroundColor}
                     strokeWidth={width}
                     strokeCap={strokeCap}/>
              <ART.Shape d={circlePath}
                     strokeDash={stroke}
                     stroke={tintColor}
                     strokeWidth={width}
                     strokeCap={strokeCap}/>
            </ART.Group>
          </ART.Surface>
        }
        {typeof children === 'function' ? children(fill) : children}
      </View>
    )
  }
}

GaugeProgress.propTypes = {
  style: ViewPropTypes.style,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  tintColor: PropTypes.string,
  stroke: PropTypes.arrayOf(PropTypes.number),
  strokeCap: PropTypes.string,
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  cropDegree: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.array])
};

GaugeProgress.defaultProps = {
  tintColor: 'black',
  backgroundColor: '#e4e4e4',
  rotation: 90,
  cropDegree: 90,
  strokeCap: 'butt',
};


const AnimatedProgressGauge = Animated.createAnimatedComponent(GaugeProgress);


class AnimatedGaugeProgress extends Component {

  state = {
    chartFillAnimation: new Animated.Value(this.props.prefill || 0)
  }

  componentDidMount() { 
    this.animateFill();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === ActiveState) this.animateFill();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fill !== this.props.fill) {
      this.animateFill();
    }
  }

  animateFill() {
    const { tension, friction, onAnimationComplete, prefill } = this.props;

    var chartFillAnimation = new Animated.Value(prefill || 0)
    this.setState({chartFillAnimation})

    Animated.spring(
      chartFillAnimation,
      {
        toValue: this.props.fill,
        tension,
        friction
      }
    ).start(onAnimationComplete);
  }
  
  render() {
    const { fill, prefill, ...other } = this.props;

    return (
      <AnimatedProgressGauge
        {...other}
        fill={this.state.chartFillAnimation}
        />
    )
  }
}

AnimatedGaugeProgress.propTypes = {
  style: ViewPropTypes.style,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number,
  prefill: PropTypes.number,
  width: PropTypes.number.isRequired,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  tension: PropTypes.number,
  friction: PropTypes.number,
  onAnimationComplete: PropTypes.func,
  onLinearAnimationComplete: PropTypes.func,
}

AnimatedGaugeProgress.defaultProps = {
  tension: 7,
  friction: 10
};


AnterosGauge.SemiCircular = SemiCircular;
AnterosGauge.AnimatedSemiCircular = AnimatedSemiCircular;
AnterosGauge.ProgressLabel = ProgressLabel;
AnterosGauge.LineGauge = LineGauge;
AnterosGauge.Speedometer = Speedometer; 
AnterosGauge.GaugeProgress = GaugeProgress; 
AnterosGauge.AnimatedGaugeProgress = AnimatedGaugeProgress; 