'use strict';

import React, { Component } from 'react';
import { Dimensions,
    StyleSheet,
    View,
    ScrollView,
    Animated } from 'react-native';
import PropTypes from 'prop-types';

var screen = Dimensions.get('window');
var ScrollViewPropTypes = ScrollView.propTypes;

export class AnterosParallaxView extends Component {

    constructor(props){
        super(props);
        this.state = {scrollY: new Animated.Value(0)};
    }

    getInnerViewNode() {
        return this.getScrollResponder().getInnerViewNode();
    }

    scrollTo(destY, destX) {
        this.getScrollResponder().scrollTo(destY, destX);
    }

    scrollWithoutAnimationTo(destY, destX) {
        this.getScrollResponder().scrollWithoutAnimationTo(destY, destX);
    }

    static propTypes = {
        ...ScrollViewPropTypes,
        windowHeight: PropTypes.number,
        backgroundSource: PropTypes.oneOfType([
            PropTypes.shape({
                uri: PropTypes.string,
            }),
            PropTypes.number,
        ]),
        header: PropTypes.node,
        blur: PropTypes.string,
        contentInset: PropTypes.object,
    }

    static defaultProps = {
        windowHeight: 300,
            contentInset: {
                top: screen.scale
            }
    }


    getScrollResponder() {
        return this._scrollView.getScrollResponder();
    }

    setNativeProps(props) {
        this._scrollView.setNativeProps(props);
    }

    renderBackground() {
        var {
            windowHeight,
            backgroundSource,
            blur
        } = this.props;
        var {
            scrollY
        } = this.state;
        if (!windowHeight || !backgroundSource) {
            return null;
        }
        return ( <Animated.Image  useNativeDriver={true}  style = {
                [styles.background, {
                    height: windowHeight,
                    transform: [{
                        translateY: scrollY.interpolate({
                            inputRange: [-windowHeight, 0, windowHeight],
                            outputRange: [windowHeight / 2, 0, -windowHeight / 3]
                        })
                    }, {
                        scale: scrollY.interpolate({
                            inputRange: [-windowHeight, 0, windowHeight],
                            outputRange: [2, 1, 1]
                        })
                    }]
                }]
            }
            source = {
                backgroundSource
            } >
            </Animated.Image>
        );
    }

    renderHeader() {
        var {
            windowHeight,
            backgroundSource
        } = this.props;
        var {
            scrollY
        } = this.state;
        if (!windowHeight || !backgroundSource) {
            return null;
        }
        return ( <Animated.View useNativeDriver={true}   style = {
                {
                    position: 'relative',
                    height: windowHeight,
                    opacity: scrollY.interpolate({
                        inputRange: [-windowHeight, 0, windowHeight / 1.2],
                        outputRange: [1, 1, 0]
                    }),
                }
            } > {
                this.props.header
            } </Animated.View>
        );
    }

    render() {
        var {
            style,
            ...props
        } = this.props;
        return ( <View style = {
                [styles.container, style]
            } > {
                this.renderBackground()
            } <ScrollView ref = {
                component => {
                    this._scrollView = component;
                }
            } { ...props
            }
            style = {
                styles.scrollView
            }
            onScroll = {
                Animated.event(
                    [{
                        nativeEvent: {
                            contentOffset: {
                                y: this.state.scrollY
                            }
                        }
                    }]
                )
            }
            scrollEventThrottle = {
                16
            } > {
                this.renderHeader()
            } <View style = {
                [styles.content, props.scrollableViewStyle]
            } > {
                this.props.children
            } </View> 
            </ScrollView> </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: 'transparent',
    },
    scrollView: {
        backgroundColor: 'transparent',
    },
    background: {
        position: 'absolute',
        backgroundColor: '#2e2f31',
        width: screen.width,
        resizeMode: 'cover'
    },
    blur: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'transparent',
    },
    content: {
        shadowColor: '#222',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column'
    }
});