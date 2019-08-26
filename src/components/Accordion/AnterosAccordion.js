import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  View,
  TouchableHighlight,
  Animated, Easing
} from 'react-native';
import {AnterosCollapsible} from '../Collapsible/AnterosCollapsible';

export class AnterosAccordion extends Component {
  static propTypes = {
    collapsed: PropTypes.bool,
    underlayColor: PropTypes.string,
    renderHeader: PropTypes.func.isRequired,
    children: PropTypes.node
  };

  static defaultProps = {
    underlayColor: "rgba(0, 0, 0, 0)"
  };

  constructor(props) {
    super(props);
    this._toggleCollapsed = this._toggleCollapsed.bind(this);
    this.state = {
      collapsed: props.collapsed !== undefined ? props.collapsed : true
    };
  }

  _toggleCollapsed() {
    this.setState({
      collapsed: !this.state.collapsed
    });

    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.collapsed !== this.state.collapsed) {
      this.setState({
        collapsed: nextProps.collapsed
      });
    }
  }

  render() {
    const {
      children,
      renderHeader,
      underlayColor,
      ...collapsibleProps
    } = this.props;
    return (
      <View>
        <TouchableHighlight
          onPress={() => this._toggleCollapsed()}
          underlayColor={underlayColor}
        >
          <View>{renderHeader()}</View>
        </TouchableHighlight>
        <AnterosCollapsible {...collapsibleProps} collapsed={this.state.collapsed}>
          {children}
        </AnterosCollapsible>
      </View>
    );
  }
}