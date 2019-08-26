// AnterosCarousel.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ScrollView} from 'react-native';

import AnterosTheme from '../../themes/AnterosTheme';
import AnterosCarouselControl from './AnterosCarouselControl';

export default class AnterosCarousel extends Component {

  static propTypes = {
    ...ScrollView.propTypes,
    carousel: PropTypes.bool,
    interval: PropTypes.number,
    direction: PropTypes.oneOf(['forward', 'backward']),
    startIndex: PropTypes.number,
    cycle: PropTypes.bool,
    control: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    onChange: PropTypes.func
  };

  static defaultProps = {
    ...ScrollView.defaultProps,
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    alwaysBounceHorizontal: false,
    alwaysBounceVertical: false,
    bounces: false,
    automaticallyAdjustContentInsets: false,
    scrollEventThrottle: 200,
    scrollsToTop: false,

    carousel: true,
    interval: 3000,
    direction: 'forward',
    startIndex: 0,
    cycle: true,
    control: false
  };

  static Control = AnterosCarouselControl;

  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      pageIndex: 0
    };
    this.cardIndex = null;
    this.initByProps(props);
    this.setupTimer();
  }

  componentDidMount() {
    super.componentDidMount && super.componentDidMount();
    setTimeout(() => this.scrollToCard(this.cardIndex, false), 50);
  }

  componentWillUnmount() {
    super.componentWillUnmount && super.componentWillUnmount();
    this.removeTimer();
  }

  componentWillReceiveProps(nextProps) {
    this.initByProps(nextProps);
    this.setupTimer();
  }

  scrollToPage(index, animated = true) {
    this.scrollToCard(this.cycle
      ? index + 1
      : index, animated);
  }

  scrollToNextPage(animated = true) {
    this.scrollToNextCard(animated);
  }

  initByProps(props) {
    let {children, carousel, direction, startIndex, cycle} = props;
    this.pageCount = children
      ? (children instanceof Array
        ? children.length
        : 1)
      : 0;
    let multiPage = this.pageCount > 1;
    this.carousel = carousel && multiPage;
    this.cycle = cycle && multiPage;
    this.forward = direction === 'forward';
    this.cardCount = multiPage && this.cycle
      ? this.pageCount + 2
      : this.pageCount;
    if (this.cardIndex === null || this.cardIndex >= this.cardCount) 
      this.cardIndex = multiPage && this.cycle
        ? startIndex + 1
        : startIndex;
    
    this.step = this.forward
      ? 1
      : -1;
  }

  setupTimer() {
    this.removeTimer();
    if (!this.carousel) 
      return;
    this.timer = setTimeout(() => {
      this.timer = null;
      this.scrollToNextCard();
    }, this.props.interval);
  }

  removeTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  scrollToCard(cardIndex, animated = true) {
    let {width, height} = this.state;
    if (cardIndex < 0) 
      cardIndex = 0;
    else if (cardIndex >= this.cardCount) 
      cardIndex = this.cardCount - 1;
    if (this.refs.scrollView) {
      if (this.props.horizontal) 
        this.refs.scrollView.scrollTo({
          x: width * cardIndex,
          y: 0,
          animated: animated
        });
      else 
        this
          .refs
          .scrollView
          .scrollTo({
            x: 0,
            y: height * cardIndex,
            animated: animated
          });
      }
    }

  scrollToNextCard(animated = true) {
    this.scrollToCard(this.cardIndex + this.step, animated);
  }

  changeCardIndex(cardIndex) {
    if (cardIndex == this.cardIndex) 
      return;
    this.cardIndex = cardIndex;
    let total = this.pageCount;
    let pageIndex = this.cycle
      ? cardIndex - 1
      : cardIndex;
    if (pageIndex < 0) 
      pageIndex = total - 1;
    else if (pageIndex >= total) 
      pageIndex = 0;
    this.setState({pageIndex});
    this.props.onChange && this
      .props
      .onChange(pageIndex, total);
  }

  onHorizontalScroll(e) {
    let {width} = this.state;
    let {x} = e.nativeEvent.contentOffset;
    let cardIndex = Math.round(x / width);

    if (this.cycle) {
      if (cardIndex <= 0 && x <= 0) {
        cardIndex = this.cardCount - 2;
        this.scrollToCard(cardIndex, false);
      } else if (cardIndex >= this.cardCount - 1 && x >= (this.cardCount - 1) * width) {
        cardIndex = 1;
        this.scrollToCard(cardIndex, false);
      }
    }

    this.changeCardIndex(cardIndex);
    this.setupTimer();
  }

  onVerticalScroll(e) {
    let {height} = this.state;
    let {y} = e.nativeEvent.contentOffset;
    let cardIndex = Math.round(y / height);

    if (this.cycle) {
      if (cardIndex <= 0 && y <= 0) {
        cardIndex = this.cardCount - 2;
        this.scrollToCard(cardIndex, false);
      } else if (cardIndex >= this.cardCount - 1 && y >= (this.cardCount - 1) * height) {
        cardIndex = 1;
        this.scrollToCard(cardIndex, false);
      }
    }

    this.changeCardIndex(cardIndex);
    this.setupTimer();
  }

  onScroll(e) {
    if (this.state.width == 0 || this.state.height == 0) 
      return;
    this.props.horizontal
      ? this.onHorizontalScroll(e)
      : this.onVerticalScroll(e);
    this.props.onScroll && this
      .props
      .onScroll(e);
  }

  onLayout(e) {
    this.setState({width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height});
    this.props.onLayout && this
      .props
      .onLayout(e);
  }

  renderCards() {
    let {width, height} = this.state;
    let {children} = this.props;
    if (width <= 0 || height <= 0 || !children) 
      return null;
    if (!(children instanceof Array)) 
      children = [children];
    let cards = [];
    let cardStyle = {
      width: width,
      height: height,
      overflow: 'hidden'
    };
    this.cycle && cards.push(
      <View style={cardStyle} key={'card-head'}>{children[children.length - 1]}</View>
    );
    children.map((item, index) => cards.push(
      <View style={cardStyle} key={'card' + index}>{item}</View>
    ));
    this.cycle && cards.push(
      <View style={cardStyle} key={'card-tail'}>{children[0]}</View>
    );
    return cards;
  }

  render() {
    let {
      style,
      children,
      horizontal,
      contentContainerStyle,
      control,
      onScroll,
      onLayout,
      onChange,
      direction,
      ...others
    } = this.props;
    let {width, height, pageIndex} = this.state;
    if (width > 0 && height > 0) {
      let fixStyle;
      if (horizontal) 
        fixStyle = {
          width: width * this.cardCount,
          height: height
        };
      else 
        fixStyle = {
          width: width,
          height: height * this.cardCount
        };
      contentContainerStyle = []
        .concat(contentContainerStyle)
        .concat(fixStyle);
    }
    if (React.isValidElement(control)) {
      control = React.cloneElement(control, {
        index: pageIndex,
        total: this.pageCount,
        carousel: this
      });
    } else if (control) {
      control = <this.constructor.Control
        index={pageIndex}
        total={this.pageCount}
        carousel={this}/>
    }
    return (
      <View
        style={[
        style, {
          alignItems: 'stretch'
        }
      ]}>
        <ScrollView
          style={{
          flex: 1
        }}
          horizontal={horizontal}
          contentContainerStyle={contentContainerStyle}
          {...others}
          ref='scrollView'
          onScroll={(e) => this.onScroll(e)}
          onLayout={(e) => this.onLayout(e)}>
          {this.renderCards()}
        </ScrollView>
        {control}
      </View>
    );
  }

}