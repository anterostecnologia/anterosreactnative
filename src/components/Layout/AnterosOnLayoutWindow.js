import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'

export class AnterosOnLayoutWindow extends Component {
  constructor (props) {
    super(props)
    this.state = { dimensions: { width: 0, height: 0 }}
  }

  onLayout = (e) => {
    const {width, height} = Dimensions.get("window");
    this.setState({
      dimensions: { width: width, height: height }
    })
  }

  render () {
    let { children, ...props } = this.props
    return (
      <View {...props} onLayout={this.onLayout}>
        {this.props.children(this.state.dimensions)}
      </View>
    )
  }
}