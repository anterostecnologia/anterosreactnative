import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, SectionList, ListView, Animated, ScrollView, StyleSheet, 
         View, Image, Dimensions } from 'react-native';


export class AnterosImageHeaderScrollView extends Component{ 

  static propTypes = {
    children: PropTypes.any,
    childrenStyle: PropTypes.any,
    overlayColor: PropTypes.string,
    fadeOutForeground: PropTypes.bool,
    foregroundParallaxRatio: PropTypes.number,
    maxHeight: PropTypes.number,
    maxOverlayOpacity: PropTypes.number,
    minHeight: PropTypes.number,
    minOverlayOpacity: PropTypes.number,
    renderFixedForeground: PropTypes.element,
    renderForeground: PropTypes.element,
    renderHeader: PropTypes.element,
    renderTouchableFixedForeground: PropTypes.element,
    ScrollViewComponent: PropTypes.element,
    scrollViewBackgroundColor: PropTypes.string,
    headerImage: PropTypes.any
  }

  static defaultProps = {
    overlayColor: 'black',
    fadeOutForeground: false,
    foregroundParallaxRatio: 1,
    maxHeight: 125,
    maxOverlayOpacity: 0.3,
    minHeight: 80,
    minOverlayOpacity: 0,
    renderFixedForeground: () => <View />,
    renderHeader: () => <View />,
    ScrollViewComponent: ScrollView,
    scrollViewBackgroundColor: 'white',
  };

  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      pageY: 0,
    };
  }

  getChildContext() {
    return {
      scrollY: this.state.scrollY,
      scrollPageY: this.state.pageY + this.props.minHeight,
    };
  }

  interpolateOnImageHeight(outputRange) {
    const headerScrollDistance = this.props.maxHeight - this.props.minHeight;
    return this.state.scrollY.interpolate({
      inputRange: [0, headerScrollDistance],
      outputRange,
      extrapolate: 'clamp',
    });
  }

  renderHeaderProps() {
    if (this.props.headerImage) {
      return (
        <Image
          source={this.props.headerImage}
          style={{
            height: this.props.maxHeight,
            width: Dimensions.get('window').width,
          }}
        />
      );
    }
    return this.props.renderHeader();
  }

  renderHeader() {
    const overlayOpacity = this.interpolateOnImageHeight([
      this.props.minOverlayOpacity,
      this.props.maxOverlayOpacity,
    ]);

    const headerScale = this.state.scrollY.interpolate({
      inputRange: [-this.props.maxHeight, 0],
      outputRange: [3, 1],
      extrapolate: 'clamp',
    });

    const headerTransformStyle = {
      height: this.props.maxHeight,
      transform: [{ scale: headerScale }],
    };

    const overlayStyle = [
      styles.overlay,
      { opacity: overlayOpacity, backgroundColor: this.props.overlayColor },
    ];

    return (
      <Animated.View useNativeDriver={true}   style={[styles.header, headerTransformStyle]}>
        {this.renderHeaderProps()}
        <Animated.View useNativeDriver={true}   style={overlayStyle} />
        <View style={styles.fixedForeground}>{this.props.renderFixedForeground()}</View>
      </Animated.View>
    );
  }

  renderForeground() {
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, this.props.maxHeight * 2],
      outputRange: [0, -this.props.maxHeight * 2 * this.props.foregroundParallaxRatio],
      extrapolate: 'clamp',
    });
    const opacity = this.interpolateOnImageHeight([1, -0.3]);

    const headerTransformStyle = {
      height: this.props.maxHeight,
      transform: [{ translateY: headerTranslate }],
      opacity: this.props.fadeOutForeground ? opacity : 1,
    };

    if (!this.props.renderForeground) {
      return <View />;
    }

    return (
      <Animated.View useNativeDriver={true}   style={[styles.header, headerTransformStyle]}>
        {this.props.renderForeground()}
      </Animated.View>
    );
  }

  renderTouchableFixedForeground() {
    const height = this.interpolateOnImageHeight([this.props.maxHeight, this.props.minHeight]);

    if (!this.props.renderTouchableFixedForeground) {
      return <View />;
    }

    return (
      <Animated.View useNativeDriver={true}   style={[styles.header, styles.touchableFixedForeground, { height }]}>
        {this.props.renderTouchableFixedForeground()}
      </Animated.View>
    );
  }

  onContainerLayout = () => {
    if (!this.container) {
      return;
    }
    this.container.measureInWindow((x, y) => this.setState(() => ({ pageY: y })));
  };

  onScroll = (e) => {
    if (this.props.onScroll) {
      this.props.onScroll(e);
    }
    const scrollY = e.nativeEvent.contentOffset.y;
    this.state.scrollY.setValue(scrollY);
  };

  render() {
    /* eslint-disable no-unused-vars */
    const {
      childrenStyle,
      overlayColor,
      fadeOutForeground,
      foregroundParallaxRatio,
      maxHeight,
      maxOverlayOpacity,
      minHeight,
      minOverlayOpacity,
      renderFixedForeground,
      renderForeground,
      renderHeader,
      renderTouchableFixedForeground,
      style,
      contentContainerStyle,
      onScroll,
      ScrollViewComponent,
      scrollViewBackgroundColor,
      ...scrollViewProps
    } = this.props;
    /* eslint-enable no-unused-vars */

    const inset = maxHeight - minHeight;

    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: minHeight,
            backgroundColor: scrollViewBackgroundColor,
          },
        ]}
        ref={ref => (this.container = ref)}
        onLayout={this.onContainerLayout}
      >
        {this.renderHeader()}
        {/* <ScrollView
          ref={ref => (this.scrollViewRef = ref)}
          scrollEventThrottle={16}
          overScrollMode="never"
          {...scrollViewProps}
          contentContainerStyle={[
            {
              backgroundColor: scrollViewBackgroundColor,
              marginTop: inset,
              paddingBottom: inset,
            },
            contentContainerStyle,
            childrenStyle,
          ]}
          style={[styles.container, style]}
          onScroll={this.onScroll}
        /> */}
        {this.renderTouchableFixedForeground()}
        {this.renderForeground()}
      </View>
    );
  }

  /*
   * Expose `ScrollView` API so this component is composable
   * with any component that expects a `ScrollView`.
   */
  getScrollableNode() {
    const responder = this.getScrollResponder();
    if (!responder) {
      return;
    }
    return responder.getScrollableNode();
  }
  getInnerViewNode() {
    const responder = this.getScrollResponder();
    if (!responder) {
      return;
    }
    return responder.getInnerViewNode();
  }

  scrollTo(
    y,
    x,
    animated  ) {
    const responder = this.getScrollResponder();
    if (!responder) {
      return;
    }
    responder.scrollTo(y, x, animated);
  }

  scrollToEnd(params) {
    if (
      this.scrollViewRef &&
      this.scrollViewRef.scrollToEnd &&
      typeof this.scrollViewRef.scrollToEnd === 'function'
    ) {
      this.scrollViewRef.scrollToEnd(params);
    }
  }

  getScrollResponder() {
    if (this.scrollViewRef && this.scrollViewRef.getScrollResponder) {
      return this.scrollViewRef.getScrollResponder();
    }
  }

  setNativeProps(props) {
    if (this.scrollViewRef && this.scrollViewRef.setNativeProps) {
      this.scrollViewRef.setNativeProps(props);
    }
  }

  recordInteraction() {
    if (this.scrollViewRef && this.scrollViewRef.recordInteraction) {
      this.scrollViewRef.recordInteraction();
    }
  }

  flashScrollIndicators() {
    if (this.scrollViewRef && this.scrollViewRef.flashScrollIndicators) {
      this.scrollViewRef.flashScrollIndicators();
    }
  }

  getMetrics() {
    if (
      this.scrollViewRef &&
      this.scrollViewRef.getMetrics &&
      typeof this.scrollViewRef.getMetrics === 'function'
    ) {
      return this.scrollViewRef.getMetrics();
    }
  }

  /**
   * Expose `FlatList` API so this component is composable
   * with any component that expects a `FlatList`.
   */
  scrollToIndex(params) {
    if (
      this.scrollViewRef &&
      this.scrollViewRef.scrollToIndex &&
      typeof this.scrollViewRef.scrollToIndex === 'function'
    ) {
      this.scrollViewRef.scrollToIndex(params);
    }
  }

  scrollToItem(params) {
    if (
      this.scrollViewRef &&
      this.scrollViewRef.scrollToItem &&
      typeof this.scrollViewRef.scrollToItem === 'function'
    ) {
      this.scrollViewRef.scrollToItem(params);
    }
  }

  scrollToOffset(params) {
    if (
      this.scrollViewRef &&
      this.scrollViewRef.scrollToOffset &&
      typeof this.scrollViewRef.scrollToOffset === 'function'
    ) {
      this.scrollViewRef.scrollToOffset(params);
    }
  }

  /**
   * Expose `SectionList` API so this component is composable
   * with any component that expects a `SectionList`.
   */
  scrollToLocation(params) {
    if (
      this.scrollViewRef &&
      this.scrollViewRef.scrollToLocation &&
      typeof this.scrollViewRef.scrollToLocation === 'function'
    ) {
      this.scrollViewRef.scrollToLocation(params);
    }
  }
}

AnterosImageHeaderScrollView.childContextTypes = {
  scrollY: PropTypes.instanceOf(Animated.Value),
  scrollPageY: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  headerChildren: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 100,
  },
  fixedForeground: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 101,
  },
  touchableFixedForeground: {
    zIndex: 102,
  },
});



export class AnterosTriggeringView extends Component { 
  
    static defaultProps = {
      onBeginHidden: () => {},
      onHide: () => {},
      onBeginDisplayed: () => {},
      onDisplay: () => {},
      onTouchTop: () => {},
      onTouchBottom: () => {},
    };
  
    constructor(props) {
      super(props);
      this.initialPageY = 0;
      this.state = {
        touched: false,
        hidden: false,
      };
    }
  
    UNSAFE_componentWillMount() {
      if (!this.context.scrollY) {
        return;
      }
      this.listenerId = this.context.scrollY.addListener(this.onScroll);
    }
  
    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
      if (!this.context.scrollY) {
        return;
      }
      this.context.scrollY.removeListener(this.listenerId);
      this.listenerId = nextContext.scrollY.addListener(this.onScroll);
    }
  
    onRef = (ref) => {
      this.ref = ref;
    };
  
    onLayout = (e) => {
      if (this.props.onLayout) {
        this.props.onLayout(e);
      }
      if (!this.ref) {
        return;
      }
      const layout = e.nativeEvent.layout;
      this.height = layout.height;
      this.ref.measure((x, y, width, height, pageX, pageY) => {
        this.initialPageY = pageY;
      });
    };
  
    onScroll = (event) => {
      if (!this.context.scrollPageY) {
        return;
      }
      const pageY = this.initialPageY - event.value;
      this.triggerEvents(this.context.scrollPageY, pageY, pageY + this.height);
    };
  
    triggerEvents(value, top, bottom) {
      if (!this.state.touched && value >= top) {
        this.setState({ touched: true });
        this.props.onBeginHidden();
        this.props.onTouchTop(true);
      } else if (this.state.touched && value < top) {
        this.setState({ touched: false });
        this.props.onDisplay();
        this.props.onTouchTop(false);
      }
  
      if (!this.state.hidden && value >= bottom) {
        this.setState({ hidden: true });
        this.props.onHide();
        this.props.onTouchBottom(true);
      } else if (this.state.hidden && value < bottom) {
        this.setState({ hidden: false });
        this.props.onBeginDisplayed();
        this.props.onTouchBottom(false);
      }
    }
  
    render() {
      /* eslint-disable no-unused-vars */
      const {
        onBeginHidden,
        onHide,
        onBeginDisplayed,
        onDisplay,
        onTouchTop,
        onTouchBottom,
        ...viewProps
      } = this.props;
      /* eslint-enable no-unused-vars */
  
      return (
        <View ref={this.onRef} collapsable={false} {...viewProps} onLayout={this.onLayout}>
          {this.props.children}
        </View>
      );
    }
  }
  
  AnterosTriggeringView.contextTypes = {
    scrollY: PropTypes.instanceOf(Animated.Value),
    scrollPageY: PropTypes.number,
  };