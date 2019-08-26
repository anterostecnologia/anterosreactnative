
import React, {    
    Component,
} from 'react';

import PropTypes from 'prop-types';

import {
    PanResponder,
    Dimensions,
    StyleSheet,
    View,
    Text,
} from 'react-native'

const padding = 8
const borderWidth = 1
const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
    }
})

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window')

export class AnterosGesturePassword extends Component {

    static defaultProps = {
        lineWidth: 10,
        pointBackgroundColor: 'transparent',
        gestureAreaLength: 222,
        color: '#A9A9A9',
        activeColor: '#00AAEF',
        warningColor: 'red',
        warningDuration: 0,
        isWarning: false,
        showArrow: true,
        allowCross: true,
    }

    static propTypes = {
        lineWidth: PropTypes.number,
        pointBackgroundColor: PropTypes.string,
        gestureAreaLength: PropTypes.number,
        color: PropTypes.string,
        lineColor: PropTypes.string,
        activeColor: PropTypes.string,
        warningColor: PropTypes.string,
        warningDuration: PropTypes.number,
        topComponent: PropTypes.element,
        bottomComponent: PropTypes.element,
        isWarning: PropTypes.bool,
        showArrow: PropTypes.bool,
        allowCross: PropTypes.bool,
        onStart: PropTypes.func,
        onReset: PropTypes.func,
        onFinish: PropTypes.func,
    }

    constructor (props) {
        super(props)

        this.state = {
            isWarning: false,
            points: [],
            lines: [],
            arrows: [],
        }
        this._gestureAreaMarginHorizontal = (deviceWidth - props.gestureAreaLength) / 2
        this._gestureAreaLeft = 0
        this._gestureAreaTop = 0
        this._pointRadius = (props.gestureAreaLength - padding * 2) / 8
        this._currentPoint = null
        this._currentLine = null
        this._timer = null
        this._sequence = []
    }

    componentWillMount () {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: this._onTouchStart,
            onPanResponderMove: this._onTouchMove,
            onPanResponderRelease: this._onTouchEnd,
            onPanResponderTerminationRequest: () => false,
        })

    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            isWarning: nextProps.isWarning
        });
    }

    render () {
        return (
            <View style={[this.props.style, styles.container]}>
                {this.props.topComponent}
                <View
                    {...this._panResponder.panHandlers}
                    onLayout={this._onLayout}
                    style={{
                        overflow: 'hidden',
                        width: this.props.gestureAreaLength,
                        height: this.props.gestureAreaLength,
                        marginHorizontal: this._gestureAreaMarginHorizontal,}}>
                    {this._renderLines()}
                    {this._renderPoints()}
                    {this.props.showArrow ? this._renderArrows() : null}
                </View>
                {this.props.bottomComponent}
            </View>
        )
    }

    componentWillUnmount () {
        if (this._timer != null) {
            clearTimeout(this._timer)
            this._timer = null
        }
    }

    _onLayout = (e) => {
        this._gestureAreaLeft = e.nativeEvent.layout.x
        this._gestureAreaTop = e.nativeEvent.layout.y
        this._initializePoints()
    }

    _renderArrows () {
        return this.state.arrows.map((arrow, index) => {
            if (this.state.isWarning) {
                arrow.color = this.props.warningColor
            }
            return (
                <Arrow
                    key={'arrow-' + index}
                    width={this._pointRadius / 3}
                    color={arrow.color}
                    start={{
                        x: arrow.start.x - this._gestureAreaLeft,
                        y: arrow.start.y - this._gestureAreaTop,
                    }}
                    end={{
                        x: arrow.end.x - this._gestureAreaLeft,
                        y: arrow.end.y - this._gestureAreaTop,
                    }}/>
            )
        })
    }

    _renderPoints () {
        return this.state.points.map((point, index) => {
            return (
                <Point
                    key={'point-' + index}
                    radius={this._pointRadius}
                    borderWidth={borderWidth}
                    backgroundColor={this.props.pointBackgroundColor}
                    color={this.props.color}
                    activeColor={this.props.activeColor}
                    warningColor={this.props.warningColor}
                    isActive={point.isActive}
                    isWarning={point.isActive ? this.state.isWarning : false}
                    index={point.index}
                    position={point.position}/>
            )
        })
    }

    _renderLines () {
        return this.state.lines.map((line, index) => {
            if (this.state.isWarning) {
                line.color = this.props.warningColor
            }
            return (
                <Line
                    key={'line-' + index}
                    color={line.color}
                    lineWidth={this.props.lineWidth}
                    start={{
                        x: line.start.x - this._gestureAreaLeft,
                        y: line.start.y - this._gestureAreaTop,
                    }}
                    end={{
                        x: line.end.x - this._gestureAreaLeft,
                        y: line.end.y - this._gestureAreaTop,
                    }}/>
            )
        })
    }

    _initializePoints () {
        //avoid repeat invoking(for android)
        if(this.state.points.length) {
            return
        }

        let points = []
        for (let i = 0; i < 9; i++) {
            let left = this._pointRadius * 3 * (i % 3) + padding
            let top = this._pointRadius * 3 * Math.floor(i / 3) + padding
            points.push({
                index: i,
                position: {
                    left: left,
                    top: top,
                },
                origin: {
                    x: this._gestureAreaLeft + left + this._pointRadius,
                    y: this._gestureAreaTop + top + this._pointRadius,
                },
                isActive: false,
                isWarning: false,
            })
        }
        this.setState({
            points,
        })
    }

    _getTouchPoint (location) {
        for (let point of this.state.points) {
            if (isPointInPath(location, point.origin, this._pointRadius)) {
                return point
            }
        }
        return null
    }

    _addSequence (index) {
        if (this._sequence.includes(index)) {
            return
        }
        this._sequence.push(index)
    }

    _addArrow (arrow) {
        this.state.arrows.push(arrow)
        let arrows = this.state.arrows
        this.setState({
            arrows
        })
    }

    _addLine (line) {
        this.state.lines.push(line)
        let lines = this.state.lines
        this.setState({
            lines
        })
    }

    _updateLine (start, end) {
        this._currentLine.start = start
        this._currentLine.end = end

        let lines = this.state.lines
        this.setState({
            lines
        })
    }

    _setToActive (point) {
        point.isActive = true
        this.setState({
            points: this.state.points,
        })
    }

    _reset () {
        let points = this.state.points.map((point, index) => {
            point.isActive = false
            return point
        })
        this.setState({
            isWarning: false,
            points: points,
            lines: [],
            arrows: [],
        })

        this._sequence = []
        this._currentPoint = null
        this._currentLine = null

        if (this.props.onReset) {
            this.props.onReset()
        }
    }

    _onTouchStart = (e, gestureState) => {
        if (this.props.onStart) {
            this.props.onStart()
        }

        if (this._timer != null) {
            clearTimeout(this._timer)
            this._timer = null
        }

        this._reset()
        let location = {
            x: e.nativeEvent.pageX,
            y: e.nativeEvent.pageY,
        }
        let point = this._getTouchPoint(location)
        if (point == null) {
            return
        }

        this._addSequence(point.index)
        this._setToActive(point)
        this._currentPoint = point


    }

    _onTouchMove = (e, gestureState) => {
        let location = {
            x: e.nativeEvent.pageX,
            y: e.nativeEvent.pageY,
        }
        let point = this._getTouchPoint(location)

        if (point == null) {
            if (this._currentLine == null) {
                return
            }
            this._updateLine(this._currentPoint.origin, location)
        }
        else {
            if (this._currentLine == null) {

                let line = {
                    start: point.origin,
                    end: location,
                    color: this.props.lineColor || this.props.activeColor,
                }
                this._addLine(line)
                this._currentLine = line

                if (this._currentPoint != null) {
                    return
                }
                this._addSequence(point.index)
                this._setToActive(point)
                this._currentPoint = point
            }
            else {
                if (point === this._currentPoint) {
                    this._updateLine(point.origin, location)
                    return
                }

                if (this._sequence.includes(point.index)) {
                    this._updateLine(this._currentPoint.origin, location)
                    return
                }

                if (!this.props.allowCross) {
                    let crossPoint = getCrossPoint(this.state.points, this._currentPoint, point, this._pointRadius)
                    if (crossPoint != null) {
                        this._addSequence(crossPoint.index)
                        this._setToActive(crossPoint)
                    }
                }

                this._updateLine(this._currentPoint.origin, point.origin)
                let arrow = {
                    start: this._currentPoint.origin,
                    end: point.origin,
                    color: this.props.activeColor,
                }
                this._addArrow(arrow)
                let line = {
                    start: point.origin,
                    end: location,
                    color: this.props.lineColor || this.props.activeColor,
                }
                this._addLine(line)
                this._currentLine = line

                this._addSequence(point.index)
                this._setToActive(point)
                this._currentPoint = point
            }
        }

    }

    _onTouchEnd = (e, gestureState) => {
        if (this._sequence.length == 0) {
            return
        }

        let points = this.state.points
        let lines = this.state.lines
        lines.pop()

        this.setState({
            lines,
            points,
        })

        let password = getPassword(this._sequence)
        if (this.props.onFinish) {
            this.props.onFinish(password)
        }

        if (this.props.warningDuration > 0) {
            this._timer = setTimeout(() => {
                this._reset()
            }, this.props.warningDuration)
        }
        else {
            this._reset()
        }
    }

}





const stylesArrow = StyleSheet.create({
    container: {
        position: 'absolute',
    }
})

class Arrow extends Component {

    static defaultProps = {
        vertexDeg: 90,
    }

    static propTypes = {
        vertexDeg: PropTypes.number,
        start: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        }).isRequired,
        end: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        }).isRequired,
        width: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props)
        this.state = {}
        this._borderWidth = props.width / 3 * 2
        this._transform = getArrowTransform(props.start, props.end, props.width, this._borderWidth, props.vertexDeg)
    }

    render () {
        return (
            <View
                style={[stylesArrow.container, {
                    borderWidth: this._borderWidth,
                    borderLeftColor: this.props.color,
                    borderRightColor: 'transparent',
                    borderTopColor: 'transparent',
                    borderBottomColor: 'transparent',
                    left: this._transform.origin.x,
                    top: this._transform.origin.y,
                    transform: [{translateX: this._transform.translateX},
                        {translateY: this._transform.translateY},
                        {rotateZ: this._transform.rotateRad + 'rad'}]
                    }]}/>
            )

    }

}




const stylesCircle = StyleSheet.create({
    container: {
        position: 'absolute',
    }
})

class Circle extends Component {

    static defaultProps = {
        isFill: false,
        backgroundColor: 'transparent',
    }

    static propTypes = {
        isFill: PropTypes.bool,
        color: PropTypes.string.isRequired,
        radius: PropTypes.number.isRequired,
        borderWidth: PropTypes.number.isRequired,
        backgroundColor: PropTypes.string,
        position: PropTypes.shape({
            left: PropTypes.number.isRequired,
            top: PropTypes.number.isRequired,
        }).isRequired,

    }

    constructor (props) {
        super(props)
        this.state = {}
        this._diameter = props.radius * 2
    }

    render () {
        return (
            <View
                style={[
                stylesCircle.container,
                this.props.isFill ?
                {backgroundColor: this.props.color, } :
                {borderColor: this.props.color, borderWidth: this.props.borderWidth, backgroundColor: this.props.backgroundColor },
                {width: this._diameter,
                height: this._diameter,
                borderRadius: this.props.radius,
                    left: this.props.position.left,
                    top: this.props.position.top,
                    }
                ]}>
                {this.props.children}
            </View>
        )
    }

}


const stylesLine = StyleSheet.create({
    container: {
        position: 'absolute',
    }
})

class Line extends Component {
    static propTypes = {
        color: PropTypes.string.isRequired,
        lineWidth: PropTypes.number,
        start: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        }).isRequired,
        end: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        }).isRequired,
    }

    constructor (props) {
        super(props)
        this.state = {}
    }

    render () {
        let transform = getLineTransform(this.props.start, this.props.end)

        return (
            <View
                style={[stylesLine.container, {
                    backgroundColor: this.props.color,
                    width: transform.distance,
                    height: this.props.lineWidth,
                    left: this.props.start.x,
                    top: this.props.start.y - this.props.lineWidth / 2,
                    transform: [{translateX: transform.translateX},
                        {translateY: transform.translateY},
                        {rotateZ: transform.rotateRad + 'rad'}]
                  }]}/>
        )
    }

}


class Point extends Component {

    static defaultProps = {
        isActive: false,
        isWarning: false,
    }

    static propTypes = {
        index: PropTypes.number.isRequired,
        radius: PropTypes.number.isRequired,
        borderWidth: PropTypes.number.isRequired,
        isActive: PropTypes.bool.isRequired,
        isWarning: PropTypes.bool.isRequired,
        backgroundColor: PropTypes.string,
        color: PropTypes.string.isRequired,
        activeColor: PropTypes.string.isRequired,
        warningColor: PropTypes.string.isRequired,
        position: PropTypes.shape({
            left: PropTypes.number.isRequired,
            top: PropTypes.number.isRequired,
        }).isRequired,
    }

    constructor (props) {
        super(props)
        this.state = {}
        this._outerCircleRadius = props.radius
        this._outerCirclePosition = props.position
        this._innerCircleRadius = this._outerCircleRadius / 3
        this._innerCirclePosition = {
            left: this._innerCircleRadius * 2 - props.borderWidth,
            top: this._innerCircleRadius * 2 - props.borderWidth,
        }

    }

    render () {
        this._color = this.props.isWarning ?
            this.props.warningColor :
            ( this.props.isActive ? this.props.activeColor : this.props.color )

        return (
            <Circle
                backgroundColor={this.props.backgroundColor}
                color={this._color}
                radius={this.props.radius}
                borderWidth={this.props.borderWidth}
                position={this._outerCirclePosition}>
                { (this.props.isActive || this.props.isWarning) ? (
                    <Circle
                        isFill={true}
                        color={this._color}
                        radius={this._innerCircleRadius}
                        borderWidth={this.props.borderWidth}
                        position={this._innerCirclePosition}
                    />
                ) : null}
            </Circle>
        )
    }

}


function getLineDistance (start, end) {
    return Math.sqrt(Math.pow(Math.abs(start.x - end.x), 2) + Math.pow(Math.abs(start.y - end.y), 2))
}

export function isPointInPath (location, origin, radius) {
    return radius > getLineDistance(location, origin)
}

export function getLineTransform (start, end) {
    let distance = getLineDistance(start, end)
    let rotateRad = Math.acos((end.x - start.x) / distance)
    if (start.y > end.y) {
        rotateRad = Math.PI * 2 - rotateRad
    }

    let translateX = (end.x + start.x) / 2 - start.x - distance / 2
    let translateY = (end.y + start.y) / 2 - start.y

    return {
        distance,
        rotateRad,
        translateX,
        translateY,
    }
}

export function getArrowTransform (start, end, width, borderWidth, vertexDeg) {
    let distance = getLineDistance(start, end)
    let rotateRad = Math.acos((end.x - start.x) / distance)
    if (start.y > end.y) {
        rotateRad = Math.PI * 2 - rotateRad
    }
    let origin = {
        x: start.x + Math.cos(rotateRad) * width * 2,
        y: start.y + Math.sin(rotateRad) * width * 2,
    }

    let vertexRad = vertexDeg / 2 * 2 * Math.PI / 360
    let translateX = -borderWidth
    let translateY = -borderWidth
    if(start.x == end.x) {
        if(end.y > start.y) {
            translateY = -borderWidth / 2
        }
        else {
            translateY = -borderWidth * 1.5
        }
    }
    else if(start.y == end.y) {
        if(end.x > start.x) {
            translateX = -borderWidth / 2
        }
        else {
            translateX = -borderWidth * 1.5
        }
    }
    else {
        if( start.x > end.x && start.y > end.y) {
            translateX = - Math.sqrt(Math.pow(borderWidth * 2.5, 2)) / 2
            translateY = - Math.sqrt(Math.pow(borderWidth * 2.5, 2)) / 2
        }
        else if(start.x > end.x && end.y > start.y) {
            translateX = - Math.sqrt(Math.pow(borderWidth * 2.5, 2)) / 2
            translateY = - Math.sqrt(Math.pow(borderWidth * 1.5, 2)) / 2
        }
        else if(end.x > start.x && start.y > end.y) {
            translateX = - Math.sqrt(Math.pow(borderWidth * 1.5, 2)) / 2
            translateY = - Math.sqrt(Math.pow(borderWidth * 2.5, 2)) / 2
        }
        else {
            translateX = - Math.sqrt(Math.pow(borderWidth * 1.5, 2)) / 2
            translateY = - Math.sqrt(Math.pow(borderWidth * 1.5, 2)) / 2
        }
    }

    return {
        origin,
        rotateRad,
        translateX,
        translateY,
    }
}

export function getPassword (sequence) {
    return sequence.join('')
}

export function getCrossPoint (points, lastPoint, currentPoint, radius) {

    if (lastPoint.index == 4 || currentPoint.index == 4) {
        return null
    }
    let x1 = lastPoint.origin.x
    let y1 = lastPoint.origin.y
    let x2 = currentPoint.origin.x
    let y2 = currentPoint.origin.y
    let crossLineLength = 6 * radius
    if (( y1 == y2 && Math.abs(x1 - x2) == crossLineLength)
        || ( x1 == x2 && Math.abs(y1 - y2) == crossLineLength)
        || ( Math.abs(x1 - x2) == crossLineLength && Math.abs(y1 - y2) == crossLineLength )) {
        let crossPointIndex = (lastPoint.index + currentPoint.index) / 2
        return points[ crossPointIndex ]
    }
    return null
}