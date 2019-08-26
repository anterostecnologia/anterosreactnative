

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    TextInput,
    ViewPropTypes,
    View,
} from 'react-native';
import {AnterosIcon} from '../Icon/AnterosIcon';

export class AnterosInputSearchText extends Component {

    constructor(props){
        super(props);
    }

    static propTypes = {
        height: PropTypes.number,
        width: PropTypes.number,
        borderRadius: PropTypes.number,
        placeholder: PropTypes.string,
        placeholderTextColor: PropTypes.string,
        underlineColorAndroid: PropTypes.string,
        autoCapitalize: TextInput.propTypes.autoCapitalize,
        autoCorrect: TextInput.propTypes.autoCorrect,
        keyboardType: TextInput.propTypes.keyboardType,
        selectionColor: TextInput.propTypes.selectionColor,
        iconName: PropTypes.string,
        iconType: PropTypes.string,
        iconColor: PropTypes.string,
        iconSize: PropTypes.number,
        style: ViewPropTypes.style,
        backgroundColor: PropTypes.string,
        fontSize: PropTypes.any,
        fontFamily: PropTypes.any
    }

    static defaultProps = {
        height: 30,
        width: 200,
        borderRadius:4,
        iconName: 'ios-search',
        iconSize: 18,
        iconType: 'ionicon',
        iconColor: '#9c9c9c',
        underlineColorAndroid: "transparent",
        autoCapitalize: "none",
        keyboardType: "default",
        selectionColor:'#6f6f6f',
        backgroundColor:'white'
    }
    render(){
        const {height,width,borderRadius,style, fontFamily, fontSize,
            placeholderTextColor, placeholder, underlineColorAndroid,
            autoCapitalize, keyboardType, selectionColor, iconType,
            iconName, iconColor, iconSize, backgroundColor} = this.props;
        return (<View style={[{height, width,borderRadius, flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor},style]}>
              <View style={{alignItems: 'flex-end',paddingLeft:6, paddingRight:6}}>
                  <AnterosIcon  type={iconType} name={iconName} size={iconSize} color={iconColor}/>
              </View>
              <TextInput style={{fontFamily,fontSize, flex:1}}
                placeholder = {placeholder}
                placeholderTextColor = {placeholderTextColor}
                underlineColorAndroid = {underlineColorAndroid}
                autoCapitalize = {autoCapitalize}
                keyboardType = {keyboardType}
                selectionColor={selectionColor}/>
            </View>);
    }
}