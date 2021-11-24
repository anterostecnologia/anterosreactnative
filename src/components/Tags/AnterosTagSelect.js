import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  View,
  Text,
  ViewPropTypes,
  StyleSheet, 
  TouchableOpacity
} from 'react-native'


export class AnterosTagSelect extends Component {
  static propTypes = {
    // Pre-selected values
    value: PropTypes.array,

    // Objet keys
    labelAttr: PropTypes.string,
    keyAttr: PropTypes.string,

    // Available data
    data: PropTypes.array,

    // validations
    max: PropTypes.number,

    // Callbacks
    onMaxError: PropTypes.func,
    onItemPress: PropTypes.func,

    // Styles
    containerStyle: ViewPropTypes.style
  }

  static defaultProps = {
    value: [],

    labelAttr: 'label',
    keyAttr: 'id',

    data: [],

    max: null,

    onMaxError: null,
    onItemPress: null,

    containerStyle: {}
  }

  state = {
    value: {}
  }

  componentDidMount () {
    const value = {}
    this.props.value.forEach((val) => {
      value[val[[this.props.keyAttr]] || val] = val
    })

    this.setState({ value })
  }

  /**
   * @description Return the number of items selected
   * @return {Number}
   */
  get totalSelected () {
    return Object.keys(this.state.value).length
  }

  /**
   * @description Return the items selected
   * @return {Array}
   */
  get itemsSelected () {
    const items = []

    Object.entries(this.state.value).forEach(([key]) => {
      items.push(this.state.value[key])
    })

    return items
  }

  /**
   * @description Callback after select an item
   * @param {Object} item
   * @return {Void}
   */
  handleSelectItem = (item) => {
    const key = item[this.props.keyAttr] || item

    const value = { ...this.state.value }
    const found = this.state.value[key]

    // Item is on array, so user is removing the selection
    if (found) {
      delete value[key]
    } else {
      // User is adding but has reached the max number permitted
      if (this.props.max && this.totalSelected >= this.props.max) {
        if (this.props.onMaxError) {
          return this.props.onMaxError()
        }
      }

      value[key] = item
    }

    return this.setState({ value }, () => {
      if (this.props.onItemPress) {
        this.props.onItemPress(item)
      }
    })
  }

  render () {
    return (
      <View
        style={[
          styles.container,
          this.props.containerStyle
        ]}
      >
        {this.props.data.map((i) => {
          return (
            <AnterosTagSelectItem
              {...this.props}
              label={i[this.props.labelAttr] ? i[this.props.labelAttr] : i}
              key={i[this.props.keyAttr] ? i[this.props.keyAttr] : i}
              onPress={this.handleSelectItem.bind(this, i)}
              selected={(this.state.value[i[this.props.keyAttr]] || this.state.value[i]) && true}
            />
          )
        })}
      </View>
    )
  }
}



export class AnterosTagSelectItem extends Component {
    render(){
        return (
        <View style={styles.container_item}>
            <TouchableOpacity
            onPress={this.props.onPress}
            activeOpacity={this.props.activeOpacity}
            >
            <View
                style={[
                styles.inner,
                styles[`${this.props.theme}Inner`],
                this.props.itemStyle,
                this.props.selected && styles[`${this.props.theme}InnerSelected`],
                this.props.selected && this.props.itemStyleSelected
                ]}
            >
                <Text
                numberOfLines={1}
                style={[
                    styles[`${this.props.theme}LabelText`],
                    this.props.itemLabelStyle,
                    this.props.selected && styles[`${this.props.theme}LabelTextSelected`],
                    this.props.selected && this.props.itemLabelStyleSelected
                ]}
                >
                {this.props.label}
                </Text>
            </View>
            </TouchableOpacity>
        </View>
        )
    }
}


AnterosTagSelectItem.propTypes = {
    label: PropTypes.string,
  
    // Callbacks
    onPress: PropTypes.func,
  
    // Indicate if the item is selected
    selected: PropTypes.bool,
  
    // Touch
    activeOpacity: PropTypes.number,
  
    // Styles
    theme: PropTypes.oneOf([
      'default',
      'inverse',
      'success',
      'info',
      'danger',
      'warning'
    ]),
    itemStyle: ViewPropTypes.style,
    itemStyleSelected: ViewPropTypes.style,
    itemLabelStyle: PropTypes.any,
    itemLabelStyleSelected: PropTypes.any
  }
  
  AnterosTagSelectItem.defaultProps = {
    label: null,
    onPress: null,
    selected: false,
    touchComponent: 'TouchableOpacity',
    activeOpacity: 0.5,
    theme: 'default',
    itemStyle: null,
    itemStyleSelected: null,
    itemLabelStyle: null,
    itemLabelStyleSelected: null
  }

  
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    container_item: {
      marginBottom: 10,
      marginRight: 10
    },
    inner: {
      padding: 10,
      borderWidth: 1,
      borderRadius: 6
    },
    defaultInner: {
      backgroundColor: '#f8f9fa',
      borderColor: '#f8f9fa'
    },
    defaultInnerSelected: {
      backgroundColor: '#6c757d',
      borderColor: '#6c757d'
    },
    defaultLabelText: {
      color: '#333333'
    },
    defaultLabelTextSelected: {
      color: '#FFF'
    },
    inverseInner: {
      backgroundColor: '#FFFFFF',
      borderColor: '#343a40'
    },
    inverseInnerSelected: {
      backgroundColor: '#343a40',
      borderColor: '#343a40'
    },
    inverseLabelText: {
      color: '#343a40'
    },
    inverseLabelTextSelected: {
      color: '#FFF'
    },
    successInner: {
      backgroundColor: '#FFFFFF',
      borderColor: '#28a745'
    },
    successInnerSelected: {
      backgroundColor: '#28a745',
      borderColor: '#28a745'
    },
    successLabelText: {
      color: '#28a745'
    },
    successLabelTextSelected: {
      color: '#FFF'
    },
    infoInner: {
      backgroundColor: '#FFFFFF',
      borderColor: '#007BFF'
    },
    infoInnerSelected: {
      backgroundColor: '#007bff',
      borderColor: '#007BFE'
    },
    infoLabelText: {
      color: '#004085'
    },
    infoLabelTextSelected: {
      color: '#FFF'
    },
    warningInner: {
      backgroundColor: '#FFFFFF',
      borderColor: '#ffc107'
    },
    warningInnerSelected: {
      backgroundColor: '#ffc107',
      borderColor: '#ffc107'
    },
    warningLabelText: {
      color: '#333'
    },
    warningLabelTextSelected: {
      color: '#333'
    },
    dangerInner: {
      backgroundColor: '#FFFFFF',
      borderColor: '#dc3545'
    },
    dangerInnerSelected: {
      backgroundColor: '#dc3545',
      borderColor: '#dc3545'
    },
    dangerLabelText: {
      color: '#dc3545'
    },
    dangerLabelTextSelected: {
      color: '#FFF'
    }
  })
  
 
