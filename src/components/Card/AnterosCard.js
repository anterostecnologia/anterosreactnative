import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {AnterosImage} from '../Image/AnterosImage';

const styles = {
    containerCard: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        margin: 5
    },
    containerSection: {
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        borderColor: '#ddd',
        borderWidth: 0,
        position: 'relative'
    }
};


export class AnterosCard extends Component {

    static propTypes = {
        onPress: PropTypes.func,
        height: PropTypes.number,
        width: PropTypes.number,
        showBorder : PropTypes.bool,
        showShadow : PropTypes.bool,
        imageOverlay: PropTypes.object
    }

    static defaultProps = {
        showBorder: true,
        showShadow: true
    }

    constructor(props) {
        super(props);
    }

    render() {
        let {showBorder, showShadow, imageOverlay} = this.props;
        let {borderWidth, shadowColor, shadowOffset} = styles.containerCard;
        let style = {
            height: this.props.height, 
            width: this.props.width,
            borderWidth: (showBorder?borderWidth:0),
            shadowColor: (showShadow?shadowColor:'transparent'),
            shadowOffset: (showShadow?shadowOffset:{})
        }

        let overlay;
        if (imageOverlay){
            overlay=<AnterosImage source={imageOverlay} allClient/>
        }

        return (
            <TouchableOpacity>
                <View style={[styles.containerCard, style, this.props.style]}>
                    {overlay}
                    {this.props.children}
                </View>
            </TouchableOpacity>
        );
    }
};






export class AnterosCardSection extends Component {

    static propTypes = {
        height: PropTypes.number,
        width: PropTypes.number,
        overlay: PropTypes.bool
    }

    static defaultProps = {
        overlay: false
    }

    constructor(props) {
        super(props);
    }

    render() {

        const {overlay, height, width} = this.props;

        let style = {};
        style.height= height;
        style.width= width;
        if (overlay){
            //overlay efect
            style.flex= 1;
            style.width= null;
            style.position= 'absolute';
            style.zIndex= 100;
            style.left= 0;
            style.right= 0;
            style.backgroundColor= 'transparent';
        }        
        
        return (
            <View style={[styles.containerSection, style, this.props.style]}>
                {this.props.children}
            </View>
        );
    }
};
