// AnterosSegmentedView.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, ViewPropTypes} from 'react-native';
import shallowCompare from "react-addons-shallow-compare";
import {AnterosSegmentedSheet} from './AnterosSegmentedSheet';
import {AnterosSegmentedBar} from '../SegmentedBar/AnterosSegmentedBar';
import {AnterosProjector} from '../Projector/AnterosProjector';
import {AnterosCarousel} from '../Carousel/AnterosCarousel';

export class AnterosSegmentedView extends Component {

  static propTypes = {
    ...ViewPropTypes,
    type: PropTypes.oneOf(['projector', 'carousel']),
    barPosition: PropTypes.oneOf(['top', 'bottom']),
    //AnterosSegmentedBar
    barStyle: ViewPropTypes.style,
    justifyItem: PropTypes.oneOf(['fixed', 'scrollable']),
    indicatorType: PropTypes.oneOf(['none', 'boxWidth', 'itemWidth']),
    indicatorPosition: PropTypes.oneOf(['top', 'bottom']),
    indicatorLineColor: PropTypes.string,
    indicatorLineWidth: PropTypes.number,
    indicatorPositionPadding: PropTypes.number,
    animated: PropTypes.bool,
    autoScroll: PropTypes.bool,
    activeIndex: PropTypes.number,
    onChange: PropTypes.func, //(index)
  };

  static defaultProps = {
    ...View.defaultProps,
    type: 'projector',
    barPosition: 'top'
  };

  static Sheet = AnterosSegmentedSheet;

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: this.props.activeIndex
        ? this.props.activeIndex
        : 0
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.activeIndex != this.props.activeIndex && this.refs.carousel) {
      this
        .refs
        .carousel
        .scrollToPage(nextProps.activeIndex);
    }
  }

  get activeIndex() {
    let activeIndex = this.props.activeIndex;
    if (activeIndex || activeIndex === 0) 
      return activeIndex;
    else 
      return this.state.activeIndex;
    }
  
  buildProps() {
    let {
      style,
      children,
      ...others
    } = this.props;

    style = [
      {
        flexDirection: 'column',
        alignItems: 'stretch'
      }
    ].concat(style);

    if (!(children instanceof Array)) {
      if (children) 
        children = [children];
      else 
        children = [];
      }
    children = children.filter(item => item); //remove empty item

    return {
      style,
      children,
      ...others
    };
  }

  onSegmentedBarChange(index) {
    if (index == this.activeIndex) 
      return;
    this.setState({
      activeIndex: index
    }, () => {
      if (this.refs.carousel) {
        this
          .refs
          .carousel
          .scrollToPage(index, false);
      }
      this.props.onChange && this
        .props
        .onChange(index);
    });
  }

  onCarouselChange(index) {
    if (index == this.state.activeIndex) 
      return;
    this.setState({
      activeIndex: index
    }, () => {
      this.props.onChange && this
        .props
        .onChange(index);
    });
  }

  buildChildrens(){
    let children = React.Children.toArray(this.props.children);
    let result = [];
    children.map((item, index) => {     
      result.push(<AnterosSegmentedBar.Item
        key={index}
        title={item.props.title}
        titleStyle={item.props.titleStyle}
        activeTitleStyle={item.props.activeTitleStyle}
        badge={item.props.badge}/>
      )});
    return result;  
  }

  renderBar() {
    let {
      barPosition,
      barStyle,
      justifyItem,
      indicatorType,
      indicatorPosition,
      indicatorLineColor,
      indicatorLineWidth,
      indicatorPositionPadding,
      animated,
      autoScroll,
      onChange,
      children,
      paddingHorizontalBar
    } = this.props;

    if (!indicatorPosition && barPosition == 'bottom') {
      indicatorPosition = 'top';
    }
    

    return (
      <View>
        <AnterosSegmentedBar
          style={barStyle}
          paddingHorizontalBar={paddingHorizontalBar}
          justifyItem={justifyItem}
          indicatorType={indicatorType}
          indicatorPosition={indicatorPosition}
          indicatorLineColor={indicatorLineColor}
          indicatorLineWidth={indicatorLineWidth}
          indicatorPositionPadding={indicatorPositionPadding}
          animated={animated}
          autoScroll={autoScroll}
          activeIndex={this.activeIndex}
          onChange={index => this.onSegmentedBarChange(index)}>
          {this.buildChildrens()}
        </AnterosSegmentedBar>
      </View>
    );
  }

  renderProjector() {
    return (
      <AnterosProjector style={{
        flex: 1
      }} index={this.activeIndex}>
        {this.props.children}
      </AnterosProjector>
    );
  }

  renderCarousel() {
    let {children} = this.props;
    return (
      <AnterosCarousel
        style={{
        flex: 1
      }}
        carousel={false}
        startIndex={this.activeIndex}
        cycle={false}
        ref='carousel'
        onChange={index => this.onCarouselChange(index)}>
        {children}
      </AnterosCarousel>
    );
  }

  shouldComponentUpdate=(nextProps, nextState) => {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const props = this.buildProps();

    let {
      type,
      barPosition,
      children,
      onChange,
      ...others
    } = props; //disable View.onChange
    return (
      <View {...others}>
        {barPosition === 'top'
          ? this.renderBar()
          : null}
        {type === 'carousel'
          ? this.renderCarousel()
          : this.renderProjector()}
        {barPosition === 'bottom'
          ? this.renderBar()
          : null}
      </View>
    );
  }

}
