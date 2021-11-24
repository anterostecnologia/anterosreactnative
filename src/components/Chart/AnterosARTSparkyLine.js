import React, {Component} from 'react';
import {
  View
} from 'react-native';
import Svg,{
    Defs,
    G,
    LinearGradient,
    Path,
    Stop
} from 'react-native-svg';

class AnterosARTSparkyLine extends Component {
  constructor(props) {
    super(props);
    this.makeLineChartPath = this.makeLineChartPath.bind(this);
  }

  UNSAFE_componentWillMount() {
    this._computeChartConstants();
  }


  _computeChartConstants() {
    this.maxValue = Math.max(...this.props.data);   
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.props = nextProps;
      this._computeChartConstants();
    }
  }

  makeLineChartPath() {
    let heightScaler = this.props.height/this.maxValue;
    let xSpacing = this.props.width / this.props.data.length;
    let lineStrArray = []
    this.props.data.forEach((d, idx) => {
        let xCord = idx*xSpacing;
        lineStrArray.push((idx ? 'L' : 'M') + xCord);
        let yCord = this.props.height - d * heightScaler;
        lineStrArray.push(yCord);
    });
    return lineStrArray.join(' ');
  }

  render() {
    return (
        <View style={this.props.style} >
          <Svg width={this.props.width} height={this.props.height}
          style={{backgroundColor: 'rgba(0,0,0,0)', overflow: 'visible'}}>
            <Path
                    d={this.makeLineChartPath()}
                    stroke={this.props.color || "black"}
                    strokeWidth={1}
                    fill='transparent' />
        </Svg>
        </View>
    );
  }
}

export {AnterosARTSparkyLine};
