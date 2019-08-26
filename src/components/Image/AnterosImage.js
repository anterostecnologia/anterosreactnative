import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
    Platform,
    TouchableHighlight,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    ViewPropTypes,
    Text as NativeText
} from 'react-native';


export class AnterosImage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            source,
            height,
            width,
            children,
            allClient,
            onPress,
            key,
            style,
            ...props
        } = this.props

        let newStyle = {};
        

        if (allClient){
            newStyle.flex= 1;
            newStyle.height = null;
            newStyle.width = null;
        } 
        
        if (height != undefined) 
            newStyle.height = height;
        if (width != undefined) 
            newStyle.width = width;

  
        if (onPress){
            return (
                <TouchableOpacity onPress={onPress} key={key}>
                    <Image source={source} style={[newStyle, style]} {...props}>
                        {children}
                    </Image>
                </TouchableOpacity>
            );
        }
        else {
            return (
                <Image key={key} source={source} style={[newStyle, style]} {...props}>
                    {children}
                </Image>
            );
        }    
    }

}


AnterosImage.propTypes = {
    ...ViewPropTypes,
    source: PropTypes.object.isRequired,
    onLoadStart: PropTypes.func,
    onProgress: PropTypes.func,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    onLoadEnd: PropTypes.func,
    height: PropTypes.number,
    width: PropTypes.number,
    allClient : PropTypes.bool,
    style : Image.propTypes.style
}

AnterosImage.defaultProps = {
    allClient : false
}