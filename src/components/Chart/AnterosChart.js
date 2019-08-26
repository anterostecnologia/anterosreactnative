import React, { Component } from 'react'
import {
  LinearGradient,
  Line,
  Text,
  Defs,
  Polyline,
  Path,
  Polygon,
  G,
  Circle,
  Stop,
  Rect,
  Svg
} from 'react-native-svg'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import _ from 'lodash'
import { ART } from 'react-native'
import * as helper from './AnterosChartSparklineHelper'
import AnterosARTChart from './AnterosARTChart';
import AnterosARTChartBar from './AnterosARTChartBar';
import AnterosARTChartDonut from './AnterosARTChartDonut';
import AnterosARTChartHeatmap from './AnterosARTChartHeatmap';
import AnterosARTChartPie from './AnterosARTChartPie';
import AnterosARTChartRadar from './AnterosARTChartRadar';
import AnterosARTChartXY from './AnterosARTChartXY';
import AnterosARTSparkyLine from './AnterosARTSparkyLine';
import AnterosARTSparkyPie from './AnterosARTSparkyPie';
import { AreaChart, BarChart, LineChart, Grid, XAxis, YAxis, StackedAreaChart } from 'react-native-svg-charts'



const Pie = require('paths-js/pie')
const MILLISECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000
const DAYS_IN_WEEK = 7
const MONTH_LABELS = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec'
}

function shiftDate(date, numDays) {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + numDays)
    return newDate
}

function getBeginningTimeForDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

// obj can be a parseable string, a millisecond timestamp, or a Date object
function convertToDate(obj) {
    return (obj instanceof Date) ? obj : (new Date(obj))
}

class AbstractChart extends Component {

  renderHorizontalLines = config => {
    const { count, width, height, labelCount, paddingTop } = config
    return [...Array(count)].map((_, i) => {
      return (
        <Line
          key={Math.random()}
          x1={width / labelCount}
          y1={(height / 4 * i) + paddingTop}
          x2={width}
          y2={(height / 4 * i) + paddingTop}
          stroke={this.props.chartConfig.color(0.2)}
          strokeDasharray="5, 10"
          strokeWidth={1}
        />
      )
    })
  }

  renderHorizontalLabels = config => {
    const { count, data, width, height, labelsCount, paddingTop, yLabelsOffset = 12 } = config
    return [...Array(count)].map((_, i) => {
      return (
        <Text
          key={Math.random()}
          x={(width / labelsCount) - yLabelsOffset}
          textAnchor="end"
          y={(height * 3 / 4) - (height / 4 * i) + (paddingTop / 2)}
          fontSize={12}
          fill={this.props.chartConfig.color(0.5)}
        >{(((Math.max(...data) - Math.min(...data)) / 4 * i) + Math.min(...data)).toFixed(2)}
        </Text>
      )
    })
  }

  renderVerticalLabels = config => {
    const { labels, width, height, paddingRight, paddingTop, horizontalOffset = 0 } = config
    const fontSize = 12
    return labels.map((label, i) => {
      return (
        <Text
          key={Math.random()}
          x={((width - paddingRight) / labels.length * (i + 1)) + horizontalOffset}
          y={(height * 3 / 4) + paddingTop + (fontSize / 2)}
          fontSize={fontSize}
          fill={this.props.chartConfig.color(0.5)}
          textAnchor="middle"
        >{label}
        </Text>
      )
    })
  }

  renderVerticalLines = config => {
    const { data, width, height, paddingTop, paddingRight } = config
    return [...Array(data.length)].map((_, i) => {
      return (
        <Line
          key={Math.random()}
          x1={Math.floor((width - paddingRight) / data.length * (i + 1))}
          y1={0}
          x2={Math.floor((width - paddingRight) / data.length * (i + 1))}
          y2={height - (height / 4) + paddingTop}
          stroke={this.props.chartConfig.color(0.2)}
          strokeDasharray="5, 10"
          strokeWidth={1}
        />
      )
    })
  }

  renderDefs = config => {
    const { width, height, backgroundGradientFrom, backgroundGradientTo } = config
    return (
      <Defs>
        <LinearGradient id="backgroundGradient" x1="0" y1={height} x2={width} y2={0}>
          <Stop offset="0" stopColor={backgroundGradientFrom}/>
          <Stop offset="1" stopColor={backgroundGradientTo}/>
        </LinearGradient>
        <LinearGradient id="fillShadowGradient" x1={0} y1={0} x2={0} y2={height}>
          <Stop offset="0" stopColor={this.props.chartConfig.color()} stopOpacity="0.1"/>
          <Stop offset="1" stopColor={this.props.chartConfig.color()} stopOpacity="0"/>
        </LinearGradient>
      </Defs>
    )
  }
}





const SQUARE_SIZE = 20
const MONTH_LABEL_GUTTER_SIZE = 8
const paddingLeft = 32
export class ContributionGraph extends AbstractChart {
  constructor(props) {
    super(props)
    this.state = {
      valueCache: this.getValueCache(props.values)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      valueCache: this.getValueCache(nextProps.values)
    })
  }

  getSquareSizeWithGutter() {
    return SQUARE_SIZE + this.props.gutterSize
  }

  getMonthLabelSize() {
    if (!this.props.showMonthLabels) {
      return 0
    } else if (this.props.horizontal) {
      return SQUARE_SIZE + MONTH_LABEL_GUTTER_SIZE
    }
    return 2 * (SQUARE_SIZE + MONTH_LABEL_GUTTER_SIZE)
  }

  getStartDate() {
    return shiftDate(this.getEndDate(), -this.props.numDays + 1) // +1 because endDate is inclusive
  }

  getEndDate() {
    return getBeginningTimeForDate(convertToDate(this.props.endDate))
  }

  getStartDateWithEmptyDays() {
    return shiftDate(this.getStartDate(), -this.getNumEmptyDaysAtStart())
  }

  getNumEmptyDaysAtStart() {
    return this.getStartDate().getDay()
  }

  getNumEmptyDaysAtEnd() {
    return (DAYS_IN_WEEK - 1) - this.getEndDate().getDay()
  }

  getWeekCount() {
    const numDaysRoundedToWeek = this.props.numDays + this.getNumEmptyDaysAtStart() + this.getNumEmptyDaysAtEnd()
    return Math.ceil(numDaysRoundedToWeek / DAYS_IN_WEEK)
  }

  getWeekWidth() {
    return DAYS_IN_WEEK * this.getSquareSizeWithGutter()
  }

  getWidth() {
    return (this.getWeekCount() * this.getSquareSizeWithGutter()) - this.props.gutterSize
  }

  getHeight() {
    return this.getWeekWidth() + (this.getMonthLabelSize() - this.props.gutterSize)
  }

  getValueCache(values) {
    return values.reduce((memo, value) => {
      const date = convertToDate(value.date)
      const index = Math.floor((date - this.getStartDateWithEmptyDays()) / MILLISECONDS_IN_ONE_DAY)
      memo[index] = {
        value,
        title: this.props.titleForValue ? this.props.titleForValue(value) : null,
        tooltipDataAttrs: this.getTooltipDataAttrsForValue(value)
      }
      return memo
    }, {})
  }

  getValueForIndex(index) {
    if (this.state.valueCache[index]) {
      return this.state.valueCache[index].value
    }
    return null
  }

  getClassNameForIndex(index) {
    if (this.state.valueCache[index]) {
      if (this.state.valueCache[index].value) {
        const count = this.state.valueCache[index].value.count
        if (count) {
          const opacity = ((count * 0.15 > 1) ? 1 : count * 0.15) + 0.15
          return this.props.chartConfig.color(opacity)
        }
      }
    }
    return this.props.chartConfig.color(0.15)
  }

  getTitleForIndex(index) {
    if (this.state.valueCache[index]) {
      return this.state.valueCache[index].title
    }
    return this.props.titleForValue ? this.props.titleForValue(null) : null
  }

  getTooltipDataAttrsForIndex(index) {
    if (this.state.valueCache[index]) {
      return this.state.valueCache[index].tooltipDataAttrs
    }
    return this.getTooltipDataAttrsForValue({ date: null, count: null })
  }

  getTooltipDataAttrsForValue(value) {
    const { tooltipDataAttrs } = this.props

    if (typeof tooltipDataAttrs === 'function') {
      return tooltipDataAttrs(value)
    }
    return tooltipDataAttrs
  }

  getTransformForWeek(weekIndex) {
    if (this.props.horizontal) {
      return [weekIndex * this.getSquareSizeWithGutter(), 50]
    }
    return [10, weekIndex * this.getSquareSizeWithGutter()]
  }

  getTransformForMonthLabels() {
    if (this.props.horizontal) {
      return null
    }
    return `${this.getWeekWidth() + MONTH_LABEL_GUTTER_SIZE}, 0`
  }

  getTransformForAllWeeks() {
    if (this.props.horizontal) {
      return `0, ${this.getMonthLabelSize() - 100}`
    }
    return null
  }

  getViewBox() {
    if (this.props.horizontal) {
      return `${this.getWidth()} ${this.getHeight()}`
    }
    return `${this.getHeight()} ${this.getWidth()}`
  }

  getSquareCoordinates(dayIndex) {
    if (this.props.horizontal) {
      return [0, dayIndex * this.getSquareSizeWithGutter()]
    }
    return [dayIndex * this.getSquareSizeWithGutter(), 0]
  }

  getMonthLabelCoordinates(weekIndex) {
    if (this.props.horizontal) {
      return [
        weekIndex * this.getSquareSizeWithGutter(),
        this.getMonthLabelSize() - MONTH_LABEL_GUTTER_SIZE
      ]
    }
    const verticalOffset = -2
    return [
      0,
      ((weekIndex + 1) * this.getSquareSizeWithGutter()) + verticalOffset
    ]
  }

  handleClick(value) {
    if (this.props.onClick) {
      this.props.onClick(value)
    }
  }

  renderSquare(dayIndex, index) {
    const indexOutOfRange = index < this.getNumEmptyDaysAtStart() || index >= this.getNumEmptyDaysAtStart() + this.props.numDays
    if (indexOutOfRange && !this.props.showOutOfRangeDays) {
      return null
    }
    const [x, y] = this.getSquareCoordinates(dayIndex)
    return (
      <Rect
        key={index}
        width={SQUARE_SIZE}
        height={SQUARE_SIZE}
        x={x + paddingLeft}
        y={y}
        title={this.getTitleForIndex(index)}
        fill={this.getClassNameForIndex(index)}
        {...this.getTooltipDataAttrsForIndex(index)}
      />
    )
  }

  renderWeek(weekIndex) {
    const [x, y] = this.getTransformForWeek(weekIndex)
    return (
      <G key={weekIndex} x={x} y={y}>
        {_.range(DAYS_IN_WEEK).map(dayIndex => this.renderSquare(dayIndex, (weekIndex * DAYS_IN_WEEK) + dayIndex))}
      </G>
    )
  }

  renderAllWeeks() {
    return _.range(this.getWeekCount()).map(weekIndex => this.renderWeek(weekIndex))
  }

  renderMonthLabels() {
    if (!this.props.showMonthLabels) {
      return null
    }
    const weekRange = _.range(this.getWeekCount() - 1)  // don't render for last week, because label will be cut off
    return weekRange.map(weekIndex => {
      const endOfWeek = shiftDate(this.getStartDateWithEmptyDays(), (weekIndex + 1) * DAYS_IN_WEEK)
      const [x, y] = this.getMonthLabelCoordinates(weekIndex)
      return (endOfWeek.getDate() >= 1 && endOfWeek.getDate() <= DAYS_IN_WEEK) ? (
        <Text
          key={weekIndex}
          fontSize={12}
          x={x + paddingLeft}
          y={y + 8}
          fill={this.props.chartConfig.color(0.5)}
        >
          {MONTH_LABELS[endOfWeek.getMonth()]}
        </Text>
      ) : null
    })
  }

  render() {
    return (
      <View style={this.props.style || {}}>
        <Svg
          height={this.props.height}
          width={this.props.width}
        >
          {this.renderDefs({
            width: this.props.width,
            height: this.props.height,
            ...this.props.chartConfig
          })}
          <Rect width="100%" height={this.props.height} rx={(this.props.chartConfig.style?this.props.chartConfig.style.borderRadius:null)} ry={(this.props.chartConfig.style?this.props.chartConfig.style.borderRadius:null)} fill="url(#backgroundGradient)"/>
          <G>
            {this.renderMonthLabels()}
          </G>
          <G >
            {this.renderAllWeeks()}
          </G>
        </Svg>
      </View>
    )
  }
}

ContributionGraph.ViewPropTypes = {
  values: PropTypes.arrayOf(             // array of objects with date and arbitrary metadata
    PropTypes.shape({
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]).isRequired
    }).isRequired
  ).isRequired,
  numDays: PropTypes.number,             // number of days back from endDate to show
  endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),  // end of date range
  gutterSize: PropTypes.number,          // size of space between squares
  horizontal: PropTypes.bool,            // whether to orient horizontally or vertically
  showMonthLabels: PropTypes.bool,       // whether to show month labels
  showOutOfRangeDays: PropTypes.bool,    // whether to render squares for extra days in week after endDate, and before start date
  tooltipDataAttrs: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),    // data attributes to add to square for setting 3rd party tooltips, e.g. { 'data-toggle': 'tooltip' } for bootstrap tooltips
  titleForValue: PropTypes.func,         // function which returns title text for value
  classForValue: PropTypes.func,         // function which returns html class for value
  onClick: PropTypes.func               // callback function when a square is clicked
}

ContributionGraph.defaultProps = {
  numDays: 200,
  endDate: new Date(),
  gutterSize: 1,
  horizontal: true,
  showMonthLabels: true,
  showOutOfRangeDays: false,
  classForValue: value => (value ? 'black' : '#8cc665')
}


const barWidth = 32

class BarChart1 extends AbstractChart {
  renderBars = config => {
    const { data, width, height, paddingTop, paddingRight } = config
    return data.map((x, i) => {
      const barHeight = height / 4 * 3 * ((x - Math.min(...data)) / (Math.max(...data) - Math.min(...data)))
      const barWidth = 32
      return (
        <Rect
          key={Math.random()}
          x={((i + 1) * (width - paddingRight) / data.length)}
          y={(((height / 4 * 3) - barHeight) + paddingTop)}
          width={barWidth}
          height={barHeight}
          fill="url(#fillShadowGradient)"
        />)
    })
  }

  renderBarTops = config => {
    const { data, width, height, paddingTop, paddingRight } = config
    return data.map((x, i) => {
      const barHeight = height / 4 * 3 * ((x - Math.min(...data)) / (Math.max(...data) - Math.min(...data)))
      return (
        <Rect
          key={Math.random()}
          x={((i + 1) * (width - paddingRight) / data.length)}
          y={(((height / 4 * 3) - barHeight) + paddingTop)}
          width={barWidth}
          height={2}
          fill={this.props.chartConfig.color(0.6)}
        />)
    })
  }

  render() {
    const paddingTop = 16
    const paddingRight = 32
    const { width, height, data, style = {} } = this.props
    const config = {
      width,
      height
    }
    return (
      <View style={style}>
        <Svg
          height={height}
          width={width}
        >
          {this.renderDefs({
            ...config,
            ...this.props.chartConfig
          })}
          <Rect width="100%" height={height} rx={this.props.chartConfig.borderRadius} ry={this.props.chartConfig.borderRadius} fill="url(#backgroundGradient)"/>
          {this.renderHorizontalLines({
            ...config,
            count: 4,
            labelCount: data.labels.length,
            paddingTop
          })}
          {this.renderHorizontalLabels({
            ...config,
            count: 4,
            data: data.datasets[0].data,
            labelsCount: data.labels.length,
            paddingTop
          })}
          {this.renderVerticalLabels({
            ...config,
            labels: data.labels,
            paddingRight,
            paddingTop,
            horizontalOffset: barWidth / 2
          })}
          {this.renderBars({
            ...config,
            data: data.datasets[0].data,
            paddingTop,
            paddingRight
          })}
          {this.renderBarTops({
            ...config,
            data: data.datasets[0].data,
            paddingTop,
            paddingRight
          })}
        </Svg>
      </View>
    )
  }

}


class LineChart1 extends AbstractChart {
    renderDots = config => {
      const { data, width, height, paddingTop, paddingRight } = config
      return data.map((x, i) => {
        return (
          <Circle
            key={Math.random()}
            cx={(i + 1) * (width - paddingRight) / data.length}
            cy={((height / 4 * 3 * (1 - ((x - Math.min(...data)) / (Math.max(...data) - Math.min(...data))))) + paddingTop)}
            r="4"
            fill={this.props.chartConfig.color(0.7)}
          />)
      })
    }
  
    renderShadow = config => {
      if (this.props.bezier) {
        return this.renderBezierShadow(config)
      }
      const { data, width, height, paddingRight, paddingTop, labels } = config
      return (
        <Polygon
          points={data.map((x, i) =>
          ((i + 1) * (width - paddingRight) / data.length) +
          ',' +
           (((height / 4 * 3 * (1 - ((x - Math.min(...data)) / (Math.max(...data) - Math.min(...data))))) + paddingTop))
        ).join(' ') + ` ${width - paddingRight},${(height / 4 * 3) + paddingTop} ${width / labels.length},${(height / 4 * 3) + paddingTop}`}
          fill="url(#fillShadowGradient)"
          strokeWidth={0}
        />)
    }
  
    renderLine = config => {
      if (this.props.bezier) {
        return this.renderBezierLine(config)
      }
      const { width, height, paddingRight, paddingTop, data } = config
      const points = data.map((x, i) =>
        ((i + 1) * (width - paddingRight) / data.length) +
        ',' +
         (((height / 4 * 3 * (1 - ((x - Math.min(...data)) / (Math.max(...data) - Math.min(...data))))) + paddingTop))
      )
      return (
        <Polyline
          points={points.join(' ')}
          fill="none"
          stroke={this.props.chartConfig.color(0.2)}
          strokeWidth={3}
        />
      )
    }
  
    getBezierLinePoints = config => {
      const { width, height, paddingRight, paddingTop, data } = config
      const x = i => Math.floor((i + 1) * (width - paddingRight) / data.length)
      const y = i => Math.floor(((height / 4 * 3 * (1 - ((data[i] - Math.min(...data)) / (Math.max(...data) - Math.min(...data))))) + paddingTop))
      return [`M${x(0)},${y(0)}`].concat(data.slice(0, -1).map((_, i) => {
        const x_mid = (x(i) + x(i + 1)) / 2
        const y_mid = (y(i) + y(i + 1)) / 2
        const cp_x1 = (x_mid + x(i)) / 2
        const cp_x2 = (x_mid + x(i + 1)) / 2
        return `Q ${cp_x1}, ${y(i)}, ${x_mid}, ${y_mid}` +
        ` Q ${cp_x2}, ${y(i + 1)}, ${x(i + 1)}, ${y(i + 1)}`
      })).join(' ')
    }
  
    renderBezierLine = config => {
      return (
        <Path
          d={this.getBezierLinePoints(config)}
          fill="none"
          stroke={this.props.chartConfig.color(0.2)}
          strokeWidth={3}
        />
      )
    }
  
    renderBezierShadow = config => {
      const { width, height, paddingRight, paddingTop, labels } = config
      return (
        <Path
          d={this.getBezierLinePoints(config) +
            ` L${width - paddingRight},${(height / 4 * 3) + paddingTop} L${width / labels.length},${(height / 4 * 3) + paddingTop} Z`}
          fill="url(#fillShadowGradient)"
          strokeWidth={0}
        />)
    }
  
    render() {
      const paddingTop = 75
      const paddingRight = 50
      const { width, height, data, withShadow = true, withDots = true, style = {} } = this.props
      const config = {
        width,
        height
      }
      return (
        <View style={style}>
          <Svg
            height={height}
            width={width}
          >
            {this.renderDefs({
              ...config,
              ...this.props.chartConfig
            })}
            <Rect width="100%" height={height} rx={(this.props.chartConfig.style?this.props.chartConfig.borderRadius:null)} ry={(this.props.chartConfig.style?this.props.chartConfig.borderRadius:null)} fill="url(#backgroundGradient)"/>
            {this.renderHorizontalLines({
              ...config,
              count: 4,
              labelCount: data.labels.length,
              paddingTop
            })}
            {this.renderHorizontalLabels({
              ...config,
              count: 4,
              data: data.datasets[0].data,
              labelsCount: data.labels.length,
              paddingTop,
              paddingRight
            })}
            {this.renderVerticalLines({
              ...config,
              data: data.datasets[0].data,
              paddingTop,
              paddingRight
            })}
            {this.renderVerticalLabels({
              ...config,
              labels: data.labels,
              paddingRight,
              paddingTop
            })}
            {this.renderLine({
              ...config,
              paddingRight,
              paddingTop,
              data: data.datasets[0].data
            })}
            {withShadow && this.renderShadow({
              ...config,
              data: data.datasets[0].data,
              paddingRight,
              paddingTop,
              labels: data.labels
            })}
            {withDots && this.renderDots({
              ...config,
              data: data.datasets[0].data,
              paddingTop,
              paddingRight
            })}
          </Svg>
        </View>
      )
    }
  
  }


  class PieChart extends AbstractChart {
    render() {
      const { style = {} } = this.props
      const chart = Pie({
        center: this.props.center || [0, 0],
        r: 0,
        R: this.props.height / 2.5,
        data: this.props.data,
        accessor: x => {
          return x[this.props.accessor]
        }
      })
      const total = this.props.data.reduce((sum, item) => {
        return sum + item[this.props.accessor]
      }, 0)
      const slices = chart.curves.map((c, i) => {
        return (
          <G key={Math.random()}>
            <Path
              d={c.sector.path.print()}
              fill={this.props.chartConfig.color(0.2 * (i + 1))}
            />
            <Rect
              width="16"
              height="16"
              fill={this.props.chartConfig.color(0.2 * (i + 1))}
              rx={8}
              ry={8}
              transform={{
                translate: [(this.props.width / 2.5) - 24, -(this.props.height / 2.5) + ((this.props.height * 0.8) / this.props.data.length * i) + 12].join(',')
              }}
            />
            <Text
              fill={this.props.chartConfig.color(0.5)}
              fontSize="11"
              transform={{
                translate: [this.props.width / 2.5, -(this.props.height / 2.5) + ((this.props.height * 0.8) / this.props.data.length * i) + 12].join(',')
              }}
            >{Math.round(100 / total * c.item[this.props.accessor])}% { c.item.name }
            </Text>
          </G>
        )
      })
      return (
        <View
          style={{
            width: this.props.width,
            height: this.props.height,
            padding: 0,
            ...style
          }}
        >
          <Svg
            width={this.props.width}
            height={this.props.height}
          >
            {this.renderDefs({
              width: this.props.height,
              height: this.props.height,
              ...this.props.chartConfig
            })}
            <Rect width="100%" height={this.props.height} rx={(this.props.chartConfig.style?this.props.chartConfig.borderRadius:null)} ry={(this.props.chartConfig.style?this.props.chartConfig.borderRadius:null)} fill="url(#backgroundGradient)"/>
            <G
              transform={{
                translate: `${this.props.width / 2.5}, ${this.props.height / 2}`
              }}
            >
              {slices}
            </G>
          </Svg>
        </View>
      )
    }
  }


  class ProgressChart1 extends AbstractChart {

    render() {
      const { width, height, style = {} } = this.props
  
      const pies = this.props.data.map((pieData, i) => {
        const r = (((height / 2) - 32) / this.props.data.length * i) + 32
        return Pie({
          r,
          R: r,
          center: [0, 0],
          data: [pieData, 1 - pieData],
          accessor(x) {
            return x
          }
        })
      })
  
      const pieBackgrounds = this.props.data.map((pieData, i) => {
        const r = (((height / 2) - 32) / this.props.data.length * i) + 32
        return Pie({
          r,
          R: r,
          center: [0, 0],
          data: [0.999, 0.001],
          accessor(x) {
            return x
          }
        })
      })
  
      return (
        <View
          style={{
            width,
            height,
            padding: 0,
            ...style
          }}
        >
          <Svg width={width} height={height}>
            {this.renderDefs({
              width: this.props.height,
              height: this.props.height,
              ...this.props.chartConfig
            })}
            <Rect width="100%" height={this.props.height} rx={(this.props.chartConfig.style?this.props.chartConfig.borderRadius:null)} ry={(this.props.chartConfig.style?this.props.chartConfig.borderRadius:null)} fill="url(#backgroundGradient)"/>
            <G
              transform={{
                translate: `${this.props.width / 2.5}, ${this.props.height / 2}`
              }}
            >
              {pieBackgrounds.map(pie => {
                return (
                  <Path
                    key={Math.random()}
                    d={pie.curves[0].sector.path.print()}
                    strokeWidth={16}
                    stroke={this.props.chartConfig.color(0.2)}
                  />
                )
              })}
              {pies.map((pie, i) => {
                return (
                  <Path
                    key={Math.random()}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={pie.curves[0].sector.path.print()}
                    strokeWidth={16}
                    stroke={this.props.chartConfig.color((i / pies.length * 0.5) + 0.5)}
  
                  />)
              })}
              {pies.map((_, i) => {
                return (
                  <Rect
                    key={Math.random()}
                    width="16"
                    height="16"
                    fill={this.props.chartConfig.color(0.2 * (i + 1))}
                    rx={8}
                    ry={8}
                    transform={{
                      translate: [(this.props.width / 2.5) - 24, -(this.props.height / 2.5) + ((this.props.height * 0.8) / this.props.data.length * i) + 12].join(',')
                    }}
                  />
                )
              })}
              {pies.map((_, i) => {
                return (
                  <Text
                    key={Math.random()}
                    fill={this.props.chartConfig.color(0.5)}
                    fontSize="11"
                    transform={{
                      translate: [this.props.width / 2.5, -(this.props.height / 2.5) + ((this.props.height * 0.8) / this.props.data.length * i) + 12].join(',')
                    }}
                  >
                    {Math.round(100 * this.props.data[i]) + '%'}
                  </Text>)
              })}
            </G>
          </Svg>
        </View>
      )
    }
  }



  const makeCircle = (props) => `
  M${props.cx - props.r} ${props.cy}
  A${props.r} ${props.r} 0 0 0 ${props.cx + props.r} ${props.cy}
  A${props.r} ${props.r} 0 0 0 ${props.cx - props.r} ${props.cy}
  Z
`

const makeRect = (props) => `
  M${props.x} ${props.y}
  H${props.x + props.width}
  V${props.y + props.height}
  H${props.x}
  Z
`

const makeLine = (points) =>
  points.reduce(
    // prettier-ignore
    (path, p, idx) => idx === 0
      ? path.moveTo(p.x, p.y)
      : path.lineTo(p.x, p.y),
    new ART.Path()
  )

function createScale (
    xs,
    ys
  ) {
    const [y0, y1] = ys
  
    const sameX = xs[0] === xs[1]
    const x0 = sameX ? xs[0] - 1 : xs[0]
    const x1 = sameX ? xs[1] + 1 : xs[1]
  
    const slope = (y1 - y0) / (x1 - x0)
    const intercept = y0 - slope * x0
  
    return function (x) {
      return slope * x + intercept
    }
  }


const createHelpers = ({
  data,
  width,
  height,
  padding,
  max = helper.max(data),
  min = helper.min(data)
}) => {
  // prettier-ignore
  const scaleX = createScale(
    [0, data.length - 1],
    [padding, width - padding]
  )

  // prettier-ignore
  const scaleY = createScale(
    [min, max],
    [height - padding, padding]
  )

  const points = data.map((d, i) => ({
    x: scaleX(i),
    y: scaleY(d)
  }))

  return {
    scaleX,
    scaleY,
    points
  }
}



const Sparkline = ({ children, ...props }) => {
  const helpers = createHelpers(props)

  return (
    // prettier-ignore
    <ART.Surface
      width={props.width}
      height={props.height}
      style={props.style}
    >
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          ...props,
          ...child.props,
          ...helpers
        })
      )}
    </ART.Surface>
  )
}

Sparkline.defaultProps = {
  color: '#48d',
  strokeWidth: 1,
  opacity: 0.1,
  width: 240,
  height: 60,
  padding: 4,
  sampling: 8
}


const SparklineSpots = ({ color, stroke, strokeWidth, ...props }) => (
    <ART.Shape
      stroke={stroke || color}
      strokeWidth={strokeWidth}
      d={helper.sample(props.points, props.sampling)
        .map(({ x, y }) =>
          makeCircle({
            cx: x,
            cy: y,
            r: 2
          })
        )
        .join()}
    />
  )

  const SparklineLine = ({ points, color, stroke, strokeWidth }) => (
    <ART.Shape
      stroke={stroke || color}
      strokeWidth={strokeWidth}
      d={makeLine(points)}
    />
  )


  const makeGuide = ({ data, where, scaleY, padding, width }) => {
    const level = typeof where !== 'number' ? helper[where](data) : where
    return `M${padding} ${scaleY(level)} H${width - padding}`
  }
  
  const SparklineGuide = ({ color, stroke, strokeWidth, ...props }) => (
    <ART.Shape
      stroke={stroke || color}
      strokeWidth={strokeWidth}
      d={makeGuide(props)}
    />
  )
  
  SparklineGuide.defaultProps = {
    where: 'mean'
  }


  const makeFill = ({ points, height, padding }) => {
    const last = points[points.length - 1]
    return (
      last &&
      makeLine(points)
        .lineTo(last.x, height - padding)
        .lineTo(padding, height - padding)
        .close()
    )
  }

  const SparklineFill = ({ color, fill, opacity, ...props }) => (
    <ART.Shape fill={fill || color} opacity={opacity} d={makeFill(props)} />
  )


  const SparklineBand = ({
    data,
    scaleY,
    padding,
    width,
    color,
    fill,
    opacity
  }) => {
    const max = helper.max(data)
    const min = helper.min(data)
    const half = (max - min) / 2
    const high = max - half / 2
  
    return (
      <ART.Shape
        fill={fill || color}
        opacity={opacity}
        d={makeRect({
          x: padding,
          y: scaleY(high),
          width: width - 2 * padding,
          height: scaleY(half)
        })}
      />
    )
  }

  const AnterosChart = AnterosARTChart;


  AnterosChart.BarChartART = AnterosARTChartBar;
  AnterosChart.DonutChartART = AnterosARTChartDonut;
  AnterosChart.HeatmapChartART = AnterosARTChartHeatmap;
  AnterosChart.PieChartART = AnterosARTChartPie;
  AnterosChart.RadarChartART = AnterosARTChartRadar;
  AnterosChart.XYChartART = AnterosARTChartXY;
  AnterosChart.LineChartSVG = LineChart;
  AnterosChart.StackedAreaChartSVG = StackedAreaChart;
  // AnterosChart.ContributionGraphSVG = ContributionGraph;
  // AnterosChart.PieChartSVG = PieChart;
  AnterosChart.BarChartSVG = BarChart;
  AnterosChart.AreaChartSVG = AreaChart;
  AnterosChart.GridSVG = Grid;
  // AnterosChart.ProgressChartSVG = ProgressChart;
  AnterosChart.XAxisSVG = XAxis;
  AnterosChart.YAxisSVG = YAxis;

  
  AnterosChart.SparkyLineART = AnterosARTSparkyLine;
  AnterosChart.SparkyPieART = AnterosARTSparkyPie;
  AnterosChart.Sparkline = Sparkline;
  AnterosChart.SparklineLine = SparklineLine;
  AnterosChart.SparklineFill = SparklineFill;
  AnterosChart.SparklineBand = SparklineBand;
  AnterosChart.SparklineGuide = SparklineGuide;
  AnterosChart.SparklineSpots = SparklineSpots;


  export { 
    polarToCartesian,
    makeArc,
    interpolateColors,
    interpolateColorsFixedAlpha,
    lightenColor,
    saturateColor,
    hueshiftColor,
    tintColor,
    shadeColor,
    complement,
    computeSplineControlPoints,
    makeCircle,
    makeSpline,
    getMinMaxValues,
    getMinMaxValuesXY,
    getMinMaxValuesCandlestick,
    getMinMaxValuesRange,
    computeChartSum,
    findRectangleIndexContainingPoint,
    findClosestPointIndexWithinRadius,
    makeBarsChartPath,
    makeAreaChartPath,
    makeLineChartPath,
    makeSplineChartPath,
    makeCandlestickChart,
    makeAreaRangeChartPath,
    makeLineStepChartPath,
    makeStackedBarsChartPath,
    makeBars3DChartPath,
    getMaxSumStack,
    getMaxSumBars3d
   } from './util';

  export {AnterosChart}