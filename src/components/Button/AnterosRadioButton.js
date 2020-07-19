// https://github.com/thegamenicorus/react-native-flexi-radio-button

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback
} from 'react-native';

export class AnterosRadioButton extends Component {
    constructor(props, context) {
        super(props, context)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedIndex: nextProps.selectedIndex
        })
    }

    getRadioStyle() {
        return {
            height: this.context.size,
            width: this.context.size,
            borderRadius: this.context.size / 2,
            borderWidth: this.context.thickness,
            borderColor: this.props.isSelected && this.props.activeColor ? this.props.activeColor : this.props.inactiveColor || this.context.color,
        }
    }

    getRadioDotStyle() {
        return {
            height: this.context.size / 2,
            width: this.context.size / 2,
            borderRadius: this.context.size / 4,
            backgroundColor: this.props.color || this.props.activeColor,
        }
    }

    isSelected() {
        if (this.props.isSelected)
            return <View style={this.getRadioDotStyle()} />
    }
    render() {
        var { children } = this.props
        return (
            <View style={{ opacity: this.props.disabled ? 0.4 : 1 }}>
                <TouchableWithoutFeedback
                    disabled={this.props.disabled}
                    onPress={() => this.context.onSelect(this.props.index, this.props.value)}
                >
                    <View style={[styles.container, this.props.style, this.props.isSelected ? { backgroundColor: this.context.highlightColor } : null]}>
                        <View style={[styles.radio, this.getRadioStyle()]}>
                            {this.isSelected()}
                        </View>
                        <View style={styles.item}>
                            {children}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

AnterosRadioButton.contextTypes = {
    onSelect: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
    thickness: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    highlightColor: PropTypes.string
}

let styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: 'row',
        padding: 10,
    },
    radio: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
})


const defaultSize = 20
const defaultThickness = 1
const defaultColor = '#007AFF'

export class AnterosRadioGroup extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            selectedIndex: this.props.selectedIndex,
        }
        this.prevSelected = this.props.selectedIndex
        this.onSelect = this.onSelect.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedIndex != this.prevSelected) {
            this.prevSelected = nextProps.selectedIndex
            this.setState({
                selectedIndex: nextProps.selectedIndex
            })
        }
    }

    getChildContext() {
        return {
            onSelect: this.onSelect,
            size: this.props.size,
            thickness: this.props.thickness,
            color: this.props.color,
            highlightColor: this.props.highlightColor
        };
    }

    onSelect(index, value) {
        this.setState({
            selectedIndex: index
        })
        if (this.props.onSelect)
            this.props.onSelect(index, value)
    }

    render() {
        var radioButtons = React.Children.map(this.props.children, (radioButton, index) => {
            let isSelected = this.state.selectedIndex == index
            let color = isSelected && this.props.activeColor ? this.props.activeColor : this.props.color
            return (
                <AnterosRadioButton
                    color={color}
                    activeColor={this.props.activeColor}
                    {...radioButton.props}
                    index={index}
                    isSelected={isSelected}
                >
                    {radioButton.props.children}
                </AnterosRadioButton>
            )
        })

        return (
            <View style={this.props.style}>
                {radioButtons}
            </View>
        )
    }
}

AnterosRadioGroup.childContextTypes = {
    onSelect: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
    thickness: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    activeColor: PropTypes.string,
    highlightColor: PropTypes.string,
}

AnterosRadioGroup.defaultProps = {
    size: defaultSize,
    thickness: defaultThickness,
    color: defaultColor,
    highlightColor: null,
}