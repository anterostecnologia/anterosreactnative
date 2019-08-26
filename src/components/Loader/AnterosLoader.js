import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Animated, ART, Easing, Text, View, Dimensions} from 'react-native';
const {Surface, Shape, Path, Group} = ART;



class Bar extends Component {
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    };

    render() {
        const {width, height} = this.props;

        const path = Path()
            .moveTo(width, height / 2)
            .lineTo(0, height / 2)
            .lineTo(0, -height / 2)
            .lineTo(width, -height / 2)
            .close();

        return <Shape {...this.props} d={path}/>;
    }
}

class Bar2 extends Component {
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    };

    render() {
        const {width, height} = this.props;

        const path = Path()
            .moveTo(0, 0)
            .lineTo(0, -height)
            .lineTo(width, -height)
            .lineTo(width, 0)
            .close();

        return <Shape {...this.props} d={path}/>;
    }
}

class Bar3 extends Component {
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    };

    render() {
        const {width, height} = this.props;

        const path = Path()
            .moveTo(width/2, height / 2)
            .lineTo(-width/2, height / 2)
            .lineTo(-width/2, -height / 2)
            .lineTo(width/2, -height / 2)
            .close();

        return <Shape {...this.props} d={path}/>;
    }
}

class Circle extends Component {
    static propTypes = {
        radius: PropTypes.number.isRequired,
        opacity: PropTypes.number
    };

    render() {
        const { radius } = this.props;

        const path = Path()
            .moveTo(0, -radius/2)
            .arc(0, radius, 1)
            .arc(0, -radius, 1)
            .close();

        return <Shape {...this.props} d={path}/>;
    }
}

AnimatedCircle = Animated.createAnimatedComponent(Circle);
AnimatedBar = Animated.createAnimatedComponent(Bar);


export class AnterosLoader extends Component {
    static propTypes = {
        color: PropTypes.string,
        size: PropTypes.number,
        strokeWidth: PropTypes.number,
        frequency: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        size: 30,
        strokeWidth: 3,
        frequency: 800
    };

    constructor(props) {
        super(props);
        this.state = {
            scale: new Animated.Value(0.1)
        };
        this._animation = this._animation.bind(this);
    }

    render() {
        const {color, size, strokeWidth} = this.props;
        return (
            <Surface width={size+strokeWidth} height={size+strokeWidth}>
                <AnimatedCircle radius={size} stroke={color} strokeWidth={strokeWidth} scale={this.state.scale}
                                x={(size+strokeWidth)/2} y={(size+strokeWidth)/2}/>
            </Surface>
        );
    }

    componentDidMount() {
        this._animation();
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    _animation() {
        Animated.sequence([
            Animated.timing(this.state.scale, {toValue: 1, duration: this.props.frequency}),
            Animated.timing(this.state.scale, {toValue: 0.1, duration: this.props.frequency})
        ]).start(() => {
            if (!this.unmounted)
                this._animation();
        });
    }
}





class Breathing extends Component {
    static propTypes = {
        color: PropTypes.string,
        size: PropTypes.number,
        strokeWidth: PropTypes.number,
        frequency: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        size: 30,
        strokeWidth: 3,
        frequency: 800
    };

    constructor(props) {
        super(props);
        this.state = {
            scale: new Animated.Value(0.1)
        };
        this._animation = this._animation.bind(this);
    }

    render() {
        const {color, size, strokeWidth} = this.props;
        return (
            <Surface width={size+strokeWidth} height={size+strokeWidth}>
                <AnimatedCircle radius={size} stroke={color} strokeWidth={strokeWidth} scale={this.state.scale}
                                x={(size+strokeWidth)/2} y={(size+strokeWidth)/2}/>
            </Surface>
        );
    }

    componentDidMount() {
        this._animation();
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    _animation() {
        Animated.sequence([
            Animated.timing(this.state.scale, {toValue: 1, duration: this.props.frequency}),
            Animated.timing(this.state.scale, {toValue: 0.1, duration: this.props.frequency})
        ]).start(() => {
            if (!this.unmounted)
                this._animation();
        });
    }
}


class Bubbles extends Component {
    static propTypes = {
        color: PropTypes.string,
        dotRadius: PropTypes.number,
        size: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        dotRadius: 10,
        size: 40
    };

    constructor(props) {
        super(props);
        this.state = {
            opacities: [
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1)
            ]
        };
        this.eachDegree = 360 / this.state.opacities.length;
        this.timers = [];
        this._animation = this._animation.bind(this);
    }

    render() {
        const {size, dotRadius, color} = this.props;
        return (
            <Surface width={size+dotRadius} height={size+dotRadius}>
                {this.state.opacities.map((item, i) => {
                    let radian = (i * this.eachDegree) * Math.PI / 180;
                    let x = Math.round(size / 2 * Math.cos(radian)) + size / 2 + dotRadius / 2;
                    let y = Math.round(size / 2 * Math.sin(radian)) + size / 2 + dotRadius / 2;
                    return <AnimatedCircle key={i} radius={dotRadius} fill={color} x={x} y={y}
                                           scale={this.state.opacities[i]}/>
                })}
            </Surface>
        );
    }

    componentDidMount() {
        this.state.opacities.forEach((item, i) => {
            const id = setTimeout(() => {
                this._animation(i)
            }, i * 150);
            this.timers.push(id);
        });
    }

    componentWillUnmount() {
        this.unmounted = true;
        this.timers.forEach((id) => {
            clearTimeout(id);
        });
    }

    _animation(i) {
        Animated.sequence([
            Animated.timing(this.state.opacities[i], {toValue: 0.2, duration: 600}),
            Animated.timing(this.state.opacities[i], {toValue: 1, duration: 600})
        ]).start(() => {
            if (!this.unmounted)
                this._animation(i);
        });
    }
}




class Circles extends Component {
    static propTypes = {
        color: PropTypes.string,
        dotRadius: PropTypes.number,
        size: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        dotRadius: 8,
        size: 40
    };

    constructor(props) {
        super(props);
        this.state = {
            opacities: [
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1)
            ]
        };
        this.eachDegree = 360 / this.state.opacities.length;
        this.timers = [];
        this._animation = this._animation.bind(this);
    }

    render() {
        const {size, dotRadius, color} = this.props;
        return (
            <Surface width={size+dotRadius} height={size+dotRadius}>
                {this.state.opacities.map((item, i) => {
                    let radian = (i * this.eachDegree) * Math.PI / 180;
                    let x = Math.round(size / 2 * Math.cos(radian)) + size / 2 + dotRadius / 2;
                    let y = Math.round(size / 2 * Math.sin(radian)) + size / 2 + dotRadius / 2;
                    return <AnimatedCircle key={i} radius={dotRadius} fill={color} x={x} y={y}
                                           opacity={this.state.opacities[i]}/>
                })}
            </Surface>
        );
    }

    componentDidMount() {
        this.state.opacities.forEach((item, i) => {
            const id = setTimeout(() => {
                this._animation(i)
            }, i * 150);
            this.timers.push(id);
        });
    }

    componentWillUnmount() {
        this.unmounted = true;
        this.timers.forEach((id) => {
            clearTimeout(id);
        });
    }

    _animation(i) {
        Animated.sequence([
            Animated.timing(this.state.opacities[i], {toValue: 0.1, duration: 600}),
            Animated.timing(this.state.opacities[i], {toValue: 1, duration: 600})
        ]).start(() => {
            if (!this.unmounted)
                this._animation(i);
        });
    }
}



class RotationCircleScale extends Component {
    static propTypes = {
        size: PropTypes.number,
        color: PropTypes.string,
    };

    static defaultProps = {
        size: 50,
        color: '#1e90ff',
    }

    constructor(props) {
        super(props);
        this.state = {
            degree: new Animated.Value(0),
            scales: [new Animated.Value(0), new Animated.Value(0)]
        };
        this._animation = this._animation.bind(this);
        this.timers = [];
    }

    render() {
        const {size, color} = this.props;
        const degree = this.state.degree.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg']
        });
        return (
            <Animated.View style={{transform: [{rotate: degree}], backgroundColor: 'rgba(0,0,0,0)'}}>
                <Surface width={size} height={size}>
                    <Group>
                        <AnimatedCircle fill={color} radius={size/2} x={size/2} y={size/4}
                                        scale={this.state.scales[0]}/>
                        <AnimatedCircle fill={color} radius={size/2} x={size/2} y={size/4*3}
                                        scale={this.state.scales[1]}/>
                    </Group>
                </Surface>
            </Animated.View>
        );
    }

    componentDidMount() {
        this._animation();
        this.state.scales.forEach((item, i) => {
            const id = setTimeout(() => {
                this._animationCircles(i)
            }, i * 500);
            this.timers.push(id);
        });

    }

    componentWillUnmount() {
        this.unmounted = true;
        this.timers.forEach((id)=>{
            clearTimeout(id);
        });
    }

    _animation() {
        Animated.sequence([
            Animated.timing(this.state.degree, {
                toValue: 360,
                duration: 2000,
                easing: Easing.linear
            })
        ]).start(() => {
            if (!this.unmounted) {
                this.state.degree.setValue(0);
                this._animation();
            }
        });
    }

    _animationCircles(i) {
        Animated.sequence([
            Animated.timing(this.state.scales[i], {toValue: 1, duration: 1000}),
            Animated.timing(this.state.scales[i], {toValue: 0.05, duration: 1000}),
        ]).start(() => {
            if (!this.unmounted) {
                this._animationCircles(i);
            }
        });
    }
}


class ColorDots extends Component {
    static propTypes = {
        size: PropTypes.number,
        betweenSpace: PropTypes.number,
        color1: PropTypes.string,
        color2: PropTypes.string,
        color3: PropTypes.string
    };

    static defaultProps = {
        size: 15,
        betweenSpace: 7,
        color1: '#ff4500',
        color2: '#ffd700',
        color3: '#9acd32'
    };

    constructor(props) {
        super(props);
        const red = this.props.color1;
        const yellow = this.props.color2;
        const green = this.props.color3;
        this.state = {
            colors: [red, red, red],
            color: yellow,
            x: new Animated.Value(-this.props.size / 2)
        };
        this.patterns = [
            [yellow, red, red],
            [yellow, yellow, red],
            [yellow, yellow, yellow],
            [green, yellow, yellow],
            [green, green, yellow],
            [green, green, green],
            [red, green, green],
            [red, red, green],
            [red, red, red],
        ];
        this._animation = this._animation.bind(this);
        this.timers = [];
    }

    render() {
        const {size, betweenSpace} = this.props;
        return (
            <Surface width={size*3 + betweenSpace*2} height={size}>
                <Group>
                    {this.state.colors.map((item, i) => {
                        return <AnimatedCircle key={i} fill={item} radius={size} x={size/2 + i * (size+betweenSpace)}
                                               y={size/2}/>
                    })}
                    <AnimatedCircle fill={this.state.color} radius={size} x={this.state.x} y={size/2}/>
                </Group>
            </Surface>
        );
    }

    componentDidMount() {
        this._animation();
    }

    componentWillUnmount(){
        this.unmounted = true;
        this.timers.forEach((id)=>{
            clearTimeout(id);
        });
    }

    _animation() {
        const {size, betweenSpace, color1, color2, color3} = this.props;
        const id1 = setTimeout(()=>{this.setState({color: color3})}, 600);
        const id2 = setTimeout(()=>{this.setState({color: color1})}, 1200);
        this.timers.push(id1);
        this.timers.push(id2);
        this.patterns.forEach((item, i)=>{
            const id = setTimeout(()=>{
                this.setState({colors: this.patterns[i]});
            }, i*200+100);
            this.timers.push(id);
        });

        Animated.sequence([
            Animated.timing(this.state.x, {
                toValue: size * 3 + betweenSpace * 2 + size / 2,
                duration: 600,
                easing: Easing.linear}),
            Animated.timing(this.state.x, {
                toValue: -size / 2,
                duration: 0}),
            Animated.timing(this.state.x, {
                toValue: size * 3 + betweenSpace * 2 + size / 2,
                duration: 600,
                easing: Easing.linear}),
            Animated.timing(this.state.x, {
                toValue: -size / 2,
                duration: 0}),
            Animated.timing(this.state.x, {
                toValue: size * 3 + betweenSpace * 2 + size / 2,
                duration: 600,
                easing: Easing.linear})
        ]).start(() => {
            if(!this.unmounted) {
                this.state.x.setValue(-size / 2);
                this.setState({color: color2});
                this._animation();
            }
        });
    }
}


class Dots extends Component {
    static propTypes = {
        color: PropTypes.string,
        size: PropTypes.number,
        betweenSpace: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        size: 10,
        betweenSpace: 5
    };

    constructor(props) {
        super(props);
        this.state = {
            scales: [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]
        };
        this._animation = this._animation.bind(this);
    }

    _renderCircle(i) {
        const {color, size, betweenSpace} = this.props;
        return (
            <AnimatedCircle radius={size} fill={color} x={size/2 + i * (size+betweenSpace)} y={size/2}
                            scale={this.state.scales[i]}/>
        );
    }

    render() {
        const {size, betweenSpace} = this.props;
        return (
            <Surface width={size*3 + betweenSpace*2} height={size}>
                {this._renderCircle(0)}
                {this._renderCircle(1)}
                {this._renderCircle(2)}
            </Surface>
        );
    }

    componentDidMount() {
        this._animation();
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    _animation() {
        function seq(self, i) {
            return Animated.sequence([
                Animated.timing(self.state.scales[i], {toValue: 1, duration: 300, delay: (i+1)*200}),
                Animated.timing(self.state.scales[i], {toValue: 0, duration: 300, delay: 50})
            ])
        }

        Animated.parallel([
            seq(this, 0), seq(this, 1), seq(this, 2)
        ]).start(() => {
            if (!this.unmounted)
                this._animation();
        });
    }
}


class DoubleCircle extends Component {
    static propTypes = {
        color: PropTypes.string,
        size: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        size: 30
    };

    constructor(props) {
        super(props);
        this.state = {
            scales: [new Animated.Value(0), new Animated.Value(0)]
        };
        this._animation = this._animation.bind(this);
        this.timers = [];
    }

    render() {
        const {color, size} = this.props;
        return (
            <Surface width={size} height={size}>
                <AnimatedCircle radius={size} fill={color} opacity={0.5}
                                scale={this.state.scales[0]} x={size/2} y={size/2}/>
                <AnimatedCircle radius={size} fill={color} opacity={0.5}
                                scale={this.state.scales[1]} x={size/2} y={size/2}/>
            </Surface>
        );
    }

    componentDidMount() {
        this.state.scales.forEach((item, i) => {
            const id = setTimeout(() => {
                this._animation(i);
            }, i * 1000);
            this.timers.push(id);
        });
    }

    componentWillUnmount() {
        this.unmounted = true;
        this.timers.forEach((id) => {
            clearTimeout(id);
        });
    }

    _animation(i) {
        Animated.sequence([
            Animated.timing(this.state.scales[i], {toValue: 1, duration: 1000}),
            Animated.timing(this.state.scales[i], {toValue: 0, duration: 1000})
        ]).start(() => {
            if (!this.unmounted)
                this._animation(i);
        });
    }
}


class EatBean extends Component {
    static propTypes = {
        size: PropTypes.number,
        color: PropTypes.string
    };

    static defaultProps = {
        size: 30,
        color: '#1e90ff'
    }

    constructor(props) {
        super(props);
        this.state = {
            dotsY: [
                new Animated.Value(this.props.size*2.2),
                new Animated.Value(this.props.size*2.2),
                new Animated.Value(this.props.size*2.2),
                new Animated.Value(this.props.size*2.2)
            ]
        };
        this._animation = this._animation.bind(this);
        this.timers = [];
    }

    render() {
        const {size, color} = this.props;

        const sinValue = Math.sqrt(2) / 2;
        const x = Math.floor(size / 2 * sinValue) + size / 2;
        const startY = Math.floor(size / 2 * sinValue) + size / 2;
        const endY = size / 2 - Math.floor(size / 2 * sinValue);
        const d = `M${x} ${startY} A ${size / 2} ${size / 2}, 0, 1, 1, ${x} ${endY} L ${size / 2} ${size / 2} Z`;
        return (
            <Surface width={size*2} height={size}>
                <Shape d={d} fill={color} x={size/5}/>
                {this.state.dotsY.map((item, i) => {
                    return <AnimatedCircle key={i} radius={size/5} fill={color} x={item} y={size/2}/>
                })}
            </Surface>
        );
    }

    componentDidMount() {
        this.state.dotsY.forEach((item, i) => {
            const id = setTimeout(() => {
                this._animation(i)
            }, i * 300);
            this.timers.push(id);
        });
    }

    componentWillUnmount() {
        this.unmounted = true;
        this.timers.forEach((id) => {
            clearTimeout(id);
        });
    }

    _animation(i) {
        Animated.timing(this.state.dotsY[i], {toValue: this.props.size / 2, duration: 1200}).start(() => {
            if (!this.unmounted) {
                this.state.dotsY[i].setValue(this.props.size * 2.2);
                this._animation(i);
            }
        });
    }
}

class LineDots extends Component {
    static propTypes = {
        color: PropTypes.string,
        size: PropTypes.number,
        dotsNumber: PropTypes.number,
        betweenSpace: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        size: 10,
        dotsNumber: 5,
        betweenSpace: 5
    };

    constructor(props) {
        super(props);
        this.screenWidth = Dimensions.get('window').width;
        const {size, dotsNumber, betweenSpace} = this.props;
        const midX = this.screenWidth / 2 + (size * dotsNumber + betweenSpace * (dotsNumber - 1))/2 - size / 2;
        let circlesX = [];
        this.beginX = [];
        this.centerX = [];
        this.destX = [];
        for (let i = 0; i < dotsNumber; i++) {
            let beginX = -size / 2 - (size + betweenSpace) * i;
            circlesX.push(new Animated.Value(beginX));
            this.beginX.push(beginX);
            this.centerX.push(midX - i * (size + betweenSpace));
            this.destX.push(this.screenWidth + size / 2 + i * (size + betweenSpace));
        }

        this.state = {
            x: circlesX
        };

        this._animation = this._animation.bind(this);
    }

    render() {
        const {color, size} = this.props;
        return (
            <Surface width={this.screenWidth} height={size}>
                {this.state.x.map((item, i) => {
                    return <AnimatedCircle key={i} radius={size} fill={color} x={item} y={size/2}/>
                })}
            </Surface>
        );
    }

    componentDidMount() {
        this._animation();
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    _animation() {
        this.state.x.forEach((item, i) => {
            Animated.sequence([
                Animated.timing(this.state.x[i], {toValue: this.centerX[i], duration: 600, delay: i * 50}),
                Animated.timing(this.state.x[i], {toValue: this.centerX[i], duration: 600, delay: 300}),
                Animated.timing(this.state.x[i], {toValue: this.destX[i], duration: 600, delay: i * 50})
            ]).start(() => {
                if (i === this.props.dotsNumber - 1) {
                    for (let index in this.state.x) {
                        this.state.x[index].setValue(this.beginX[index]);
                    }
                    if (!this.unmounted)
                        this._animation();
                }
            });
        });
    }
}

class Lines extends Component {
    static propTypes = {
        color: PropTypes.string,
        barWidth: PropTypes.number,
        barHeight: PropTypes.number,
        betweenSpace: PropTypes.number,
        barNumber: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        betweenSpace: 2,
        barNumber: 5,
        barWidth: 5,
        barHeight: 40
    };

    constructor(props) {
        super(props);
        var heights = [];
        for (let i = 0; i < this.props.barNumber; i++) {
            heights.push(new Animated.Value(this.props.barHeight/3));
        }

        this.state = {
            heights: heights
        };
        this._animation = this._animation.bind(this);
    }


    render() {
        const {color, betweenSpace, barWidth, barHeight, barNumber} = this.props;
        return (
            <Surface width={barWidth*barNumber+betweenSpace*(barNumber-1)} height={barHeight}>
                {this.state.heights.map((item, i) => {
                    return <AnimatedBar key={i} fill={color} width={barWidth} height={this.state.heights[i]}
                                        x={i*(betweenSpace+barWidth)} y={barHeight/2}/>
                })}
            </Surface>
        );
    }

    componentDidMount() {
        this._animation();
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    _animation() {
        function seq(self, i) {
            return Animated.sequence([
                Animated.timing(self.state.heights[i], {toValue: self.props.barHeight, duration: 400, delay: i*200}),
                Animated.timing(self.state.heights[i], {toValue: self.props.barHeight/3, duration: 400})
            ])
        }
        let anim = [];
        for(let i=0; i<this.props.barNumber; i++)
            anim.push(seq(this,i));

        Animated.parallel(anim).start(() => {
            if (!this.unmounted) {
                this._animation();
            }
        });
    }
}


const AnimatedBar2 = Animated.createAnimatedComponent(Bar2);

class Music extends Component {
    static propTypes = {
        color: PropTypes.string,
        barWidth: PropTypes.number,
        barHeight: PropTypes.number,
        betweenSpace: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        betweenSpace: 5,
        barWidth: 3,
        barHeight: 30
    };

    constructor(props) {
        super(props);
        this.fixedMaxValue = [
            this.props.barHeight * 0.8,
            this.props.barHeight * 0.4,
            this.props.barHeight,
            this.props.barHeight * 0.2,
        ];
        this.fixedMinValue = [
            this.props.barHeight * 0.3,
            this.props.barHeight,
            this.props.barHeight * 0.5,
            this.props.barHeight * 0.8,
        ];

        this.state = {
            heights: [
                new Animated.Value(this.fixedMinValue[0]),
                new Animated.Value(this.fixedMinValue[1]),
                new Animated.Value(this.fixedMinValue[2]),
                new Animated.Value(this.fixedMinValue[3])
            ]
        };
        this._animation = this._animation.bind(this);
    }


    render() {
        const {color, betweenSpace, barWidth, barHeight, barNumber} = this.props;
        return (
            <Surface width={barWidth*4+betweenSpace*3} height={barHeight}>
                {this.state.heights.map((item, i) => {
                    return <AnimatedBar2 key={i} fill={color} width={barWidth} height={this.state.heights[i]}
                                        x={i*(betweenSpace+barWidth)} y={barHeight}/>
                })}
            </Surface>
        );
    }

    componentDidMount() {
        this.state.heights.forEach((item, i) => {
            this._animation(i);
        });
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    _animation(i) {
        Animated.sequence([
            Animated.timing(this.state.heights[i], {toValue: this.fixedMaxValue[i], duration: 500}),
            Animated.timing(this.state.heights[i], {toValue: this.fixedMinValue[i], duration: 500}),
        ]).start(() => {
            if (!this.unmounted) {
                this._animation(i);
            }
        });
    }
}


const AnimatedBar3 = Animated.createAnimatedComponent(Bar3);

class NineCubes extends Component{
    constructor(props) {
        super(props);
        this.state = {
            scales: [
                new Animated.Value(0),
                new Animated.Value(0),
                new Animated.Value(0),
                new Animated.Value(0),
                new Animated.Value(0)
            ]
        };
        this._animation = this._animation.bind(this);
    }

    static propTypes = {
        size: PropTypes.number,
        color: PropTypes.string
    };

    static defaultProps = {
        size: 20,
        color: '#1e90ff'
    };

    _renderCube(i, j, scaleID){
        const {size, color} = this.props;
        return (
            <AnimatedBar3
                fill={color}
                width={size}
                height={size}
                x={(size/2)*(i*2+1)}
                y={(size/2)*(j*2+1)}
                scale={this.state.scales[scaleID]}
            />
        );
    }

    render(){
        const {size, color} = this.props;
        return (
            <Surface width={size*3} height={size*3}>
                {this._renderCube(0,0,2)}
                {this._renderCube(0,1,1)}
                {this._renderCube(0,2,0)}
                {this._renderCube(1,0,3)}
                {this._renderCube(1,1,2)}
                {this._renderCube(1,2,1)}
                {this._renderCube(2,0,4)}
                {this._renderCube(2,1,3)}
                {this._renderCube(2,2,2)}
            </Surface>
        );
    }

    componentDidMount(){
        this._animation();
    }

    componentWillUnmount(){
        this.unmounted = true;
    }

    _animation(){
        function seq(self, i) {
            return Animated.sequence([
                Animated.timing(self.state.scales[i], {toValue: 1, duration: 300, delay: (i+1)*100}),
                Animated.timing(self.state.scales[i], {toValue: 0, duration: 300, delay: 200})
            ])
        }

        Animated.parallel([
            seq(this,0),seq(this,1),seq(this,2),seq(this,3),seq(this,4),
        ]).start(()=>{
            if(!this.unmounted)
                this._animation();
        });
    }
}


class Pulse extends Component {
    static propTypes = {
        color: PropTypes.string,
        size: PropTypes.number,
        frequency: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        size: 30,
        frequency: 1000
    };

    constructor(props) {
        super(props);
        this.state = {
            effect: new Animated.ValueXY({x: 0, y: 1})
        };
        this._animation = this._animation.bind(this);
    }

    render() {
        const {color, size} = this.props;
        return (
            <Surface width={size} height={size}>
                <AnimatedCircle radius={size} fill={color} scale={this.state.effect.x} opacity={this.state.effect.y} x={size/2} y={size/2}/>
            </Surface>
        );
    }

    componentDidMount() {
        this._animation();
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    _animation() {
        Animated.parallel([
            Animated.timing(this.state.effect.x, {toValue: 1, duration: this.props.frequency}),
            Animated.timing(this.state.effect.y, {toValue: 0.05, duration: this.props.frequency})
        ]).start(() => {
            if (!this.unmounted) {
                this.state.effect.setValue({x: 0, y: 1});
                this._animation();
            }
        });
    }
}


class Ripple extends Component {
    static propTypes = {
        color: PropTypes.string,
        size: PropTypes.number,
        strokeWidth: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        size: 40,
        strokeWidth: 3
    };

    constructor(props) {
        super(props);
        this.state = {
            scales: [new Animated.Value(0.1), new Animated.Value(0.1)],
            opacities: [new Animated.Value(1), new Animated.Value(1)]
        };
        this.timers = [];
        this._animation = this._animation.bind(this);
    }

    render() {
        const {color, size, strokeWidth} = this.props;
        return (
            <Surface width={size+strokeWidth} height={size+strokeWidth}>
                {this.state.scales.map((item, i) => {
                    return (
                        <AnimatedCircle
                            key={i}
                            radius={size}
                            stroke={color}
                            strokeWidth={strokeWidth}
                            scale={this.state.scales[i]}
                            opacity={this.state.opacities[i]}
                            x={(size+strokeWidth)/2}
                            y={(size+strokeWidth)/2}/>
                    );
                })}
            </Surface>
        );
    }

    componentDidMount() {
        this.state.scales.forEach((item, i) => {
            const id = setTimeout(() => {
                this._animation(i)
            }, i * 1200);
            this.timers.push(id);
        });
    }

    componentWillUnmount() {
        this.unmounted = true;
        this.timers.forEach((id) => {
            clearTimeout(id);
        });
    }

    _animation(i) {
        Animated.parallel([
            Animated.timing(this.state.scales[i], {toValue: 1, duration: 1600}),
            Animated.timing(this.state.opacities[i], {toValue: 0, duration: 1600, delay: 800})
        ]).start(() => {
            if (!this.unmounted) {
                this.state.scales[i].setValue(0.1);
                this.state.opacities[i].setValue(1);
                this._animation(i);
            }
        });
    }
}

class RotationCircle extends Component {
    static propTypes = {
        size: PropTypes.number,
        color: PropTypes.string,
        rotationSpeed: PropTypes.number
    };

    static defaultProps = {
        size: 40,
        color: '#1e90ff',
        rotationSpeed: 800
    }

    constructor(props) {
        super(props);
        this.state = {
            degree: new Animated.Value(0)
        };
        this._animation = this._animation.bind(this);
    }

    render() {
        const {size, color} = this.props;
        const degree = this.state.degree.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg']
        });
        return (
            <Animated.View style={{transform: [{rotate: degree}], backgroundColor: 'rgba(0,0,0,0)'}}>
                <Surface width={size} height={size}>
                    <Group>
                        <AnimatedCircle fill={color} radius={size} x={size/2} y={size/2}/>
                        <AnimatedCircle fill="#fff" radius={size/4} x={size/2} y={size/8}/>
                    </Group>
                </Surface>
            </Animated.View>
        );
    }

    componentDidMount() {
        this._animation();
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    _animation() {
        Animated.sequence([
            Animated.timing(this.state.degree, {toValue: 360, duration: this.props.rotationSpeed, easing: Easing.linear})
        ]).start(() => {
            if (!this.unmounted) {
                this.state.degree.setValue(0);
                this._animation();
            }
        });
    }
}


class RotationHole extends Component {
    static propTypes = {
        size: PropTypes.number,
        color: PropTypes.string,
        strokeWith: PropTypes.number,
        rotationSpeed: PropTypes.number
    };

    static defaultProps = {
        size: 40,
        color: '#1e90ff',
        rotationSpeed: 800,
        strokeWith: 8
    }

    constructor(props) {
        super(props);
        this.state = {
            degree: new Animated.Value(0)
        };
        this._animation = this._animation.bind(this);
    }

    render() {
        const {size, color, strokeWith} = this.props;
        const degree = this.state.degree.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg']
        });
        return (
            <Animated.View style={{transform: [{rotate: degree}], backgroundColor: 'rgba(0,0,0,0)'}}>
                <Surface width={size+strokeWith*2} height={size+strokeWith*2}>
                    <Group>
                        <AnimatedCircle stroke={color} opacity={0.3} strokeWidth={strokeWith} radius={size} x={size/2+strokeWith} y={size/2+strokeWith}/>
                        <AnimatedCircle fill={color} radius={strokeWith} x={size/2+strokeWith} y={strokeWith}/>
                    </Group>
                </Surface>
            </Animated.View>
        );
    }

    componentDidMount() {
        this._animation();
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    _animation() {
        Animated.sequence([
            Animated.timing(this.state.degree, {toValue: 360, duration: this.props.rotationSpeed, easing: Easing.linear})
        ]).start(() => {
            if (!this.unmounted) {
                this.state.degree.setValue(0);
                this._animation();
            }
        });
    }
}





class TextLoader extends Component {
    static propTypes = {
        text: PropTypes.string,
        textStyle: Text.propTypes.style
    };

    static defaultProps = {
        text: 'Loading'
    };

    constructor(props) {
        super(props);
        this.state = {
            opacities: [0, 0, 0]
        };
        this._animation = this._animation.bind(this);
        this.patterns = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [1, 1, 1]];
        this.timers = [];
    }

    render() {
        const {text, textStyle} = this.props;
        return (
            <View style={{flexDirection: 'row'}}>
                <Text style={textStyle}>{text}</Text>
                {this.state.opacities.map((item, i) => {
                    return <Text key={i} style={[{opacity: item}, textStyle]}>.</Text>
                })}
            </View>
        );
    }

    componentDidMount() {
        this._animation(1);
    }

    componentWillUnmount() {
        this.unmounted = true;
        this.timers.forEach((id) => {
            clearTimeout(id);
        });
    }

    _animation(index) {
        if (!this.unmounted) {
            const id = setTimeout(() => {
                this.setState({opacities: this.patterns[index]});
                index++;
                if (index >= this.patterns.length)
                    index = 0;
                this._animation(index);
            }, 500);
            this.timers.push(id);
        }
    }
}


AnterosLoader.Breathing = Breathing;
AnterosLoader.Bubbles = Bubbles;
AnterosLoader.Circles = Circles;
AnterosLoader.RotationCircleScale = RotationCircleScale;
AnterosLoader.ColorDots = ColorDots;
AnterosLoader.Dots = Dots;
AnterosLoader.DoubleCircle = DoubleCircle;
AnterosLoader.EatBean = EatBean;
AnterosLoader.LineDots = LineDots;
AnterosLoader.Lines = Lines;
AnterosLoader.Music = Music;
AnterosLoader.NineCubes = NineCubes;
AnterosLoader.Pulse = Pulse;
AnterosLoader.Ripple = Ripple;
AnterosLoader.RotationCircle = RotationCircle;
AnterosLoader.RotationHole = RotationHole;
AnterosLoader.Text = TextLoader;
