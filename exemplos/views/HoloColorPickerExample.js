import React from 'react'
import {StyleSheet, View, TouchableOpacity, PanResponder} from 'react-native';
import {AnterosNavigationPage, AnterosText, AnterosTriangleColorPicker, AnterosHoloColorPicker} from 'anteros-react-native';



class ExampleControlledTriangle extends React.Component {

    constructor(...args) {
      super(...args)
      this.state = { color: AnterosTriangleColorPicker.toHsv('green') }
      this.onColorChange = this.onColorChange.bind(this)
    }
  
    onColorChange(color) {
      this.setState({ color })
    }
  
    render() {
      return (
        <View style={{flex: 1, padding: 15, backgroundColor: '#212021'}}>
          <AnterosText style={{color: 'white'}}>React Native Color Picker - Controlled</AnterosText>
          <AnterosTriangleColorPicker
            oldColor='purple'
            color={this.state.color}
            onColorChange={this.onColorChange}
            onColorSelected={color => alert(`Color selected: ${color}`)}
            onOldColorSelected={color => alert(`Old color selected: ${color}`)}
            style={{flex: 1}}
          />
        </View>
      )
    }
  
  }


  class ExampleControlledVertical extends React.Component {

    constructor(...args) {
      super(...args)
      this.state = { color: AnterosHoloColorPicker.toHsv('green') }
      this.onColorChange = this.onColorChange.bind(this)
    }
  
    onColorChange(color) {
      this.setState({ color })
    }
  
    render() {
      return (
        <View style={{flex: 1, padding: 15, backgroundColor: '#212021'}}>
          <AnterosText style={{color: 'white'}}>React Native Color Picker - Controlled</AnterosText>
          <AnterosHoloColorPicker
            oldColor='purple'
            color={this.state.color}
            onColorChange={this.onColorChange}
            onColorSelected={color => alert(`Color selected: ${color}`)}
            onOldColorSelected={color => alert(`Old color selected: ${color}`)}
            style={{flex: 1}}
          />
        </View>
      )
    }
  
  }

  const ExampleUncontrolledTriangle = () => (
    <View style={{flex: 1, padding: 15, backgroundColor: '#212021'}}>
      <AnterosText style={{color: 'white'}}>React Native Color Picker - Uncontrolled</AnterosText>
      <AnterosTriangleColorPicker
        oldColor='purple'
        onColorSelected={color => alert(`Color selected: ${color}`)}
        style={{flex: 1}}
      />
    </View>
  )
  
  const ExampleUncontrolledVertical = () => (
    <View style={{flex: 1, padding: 15, backgroundColor: '#212021'}}>
      <AnterosText style={{color: 'white'}}>React Native Color Picker - Uncontrolled</AnterosText>
      <AnterosHoloColorPicker
        oldColor='purple'
        onColorSelected={color => alert(`Color selected: ${color}`)}
        style={{flex: 1}}
      />
    </View>
  )

const examples = [
  { Component: ExampleUncontrolledVertical, title: 'Uncontrolled vertical picker' },
  { Component: ExampleControlledVertical, title: 'Controlled vertical picker' },
  { Component: ExampleUncontrolledTriangle, title: 'Uncontrolled triangle picker' },
  { Component: ExampleControlledTriangle, title: 'Controlled triangle picker' },
]

export default class HoloColorPickerExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Holo/triangle color picker',
      showBackButton: true,
    };


  constructor(...args) {
    super(...args)
    this.state = { example: null }
  }

  onColorChange(color) {
    this.setState({ color })
  }

  renderPage() {
    const { example } = this.state
    if (example) {
      const { Component } = example
      return <Component />
    }
    return (
      <View style={styles.container}>
        {examples.map(example => (
          <TouchableOpacity
            key={example.title}
            style={styles.touchable}
            onPress={() => this.setState({ example })}
          >
            <AnterosText style={styles.text}>{example.title}</AnterosText>
          </TouchableOpacity>
        ))}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  touchable: {
    padding: 5,
  },
  text: {
    color: 'blue',
  },
})



