import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    Alert,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Actions,
    Platform,
    ImageBackground,
    ViewPropTypes,
    Animated,
    Easing,
    Image,
    TextInput,
    Dimensions,
    View
} from 'react-native';

import PropTypes from 'prop-types';

const {width, height} = Dimensions.get("window");

export class AnterosImageOverlay extends Component {
    static propTypes = {
        rounded: PropTypes.number,
        source: Image.propTypes.source,
        height: PropTypes.number,
        title: PropTypes.string,
        titleStyle: Text.propTypes.style,
        overlayColor: PropTypes.string,
        overlayAlpha: PropTypes.number,
        contentPosition: PropTypes.oneOf(["top", "center", "bottom"]),
        containerStyle: ViewPropTypes.style,
        blurRadius: PropTypes.number,
        children: PropTypes.element,
    };
    
    static defaultProps = {
        width: 300,
        height: 300,
        overlayColor: "#000000",
        overlayAlpha: 0.5,
        contentPosition: 'top'
    };

    render() {
        const {
            blurRadius,
            children,
            containerStyle,
            contentPosition,
            height,
            width,
            overlayAlpha,
            overlayColor,
            rounded,
            source,
            title,
            titleStyle,
            onLayout,
            style,
            ...props
        } = this.props;

        let justifyContent;
        if (contentPosition == "top") {
            justifyContent = "flex-start";
        } else if (contentPosition == "bottom") {
            justifyContent = "flex-end";
        } else if (contentPosition == "center") {
            justifyContent = "center";
        }

        return (
            <ImageBackground
                onLayout={onLayout}
                source={source}
                style={[
                stylesImageOverlay.image, {
                    borderRadius: rounded,
                    height: height,
                    width: width,
                    justifyContent: justifyContent
                },
                containerStyle,
                style
            ]}
                blurRadius={blurRadius}>
                <View
                    style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: overlayColor,
                    opacity: overlayAlpha
                }}/>{!children && !title && <Text style={[stylesImageOverlay.title, titleStyle]}>{title}</Text>}

                {children}
            </ImageBackground>
        );
    }
}

const stylesImageOverlay = StyleSheet.create({
    image: {
        overflow: "hidden",
        alignItems: "center"
    },
    title: {
        margin: 20,
        color: "white",
        textAlign: "center",
        fontSize: 16
    }
});

