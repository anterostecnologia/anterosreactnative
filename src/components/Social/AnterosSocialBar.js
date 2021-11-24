'use strict';

import {
  Component,
} from "react";

import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes
} from "react-native";

import {AnterosIcon} from '../Icon/AnterosIcon';
import PropTypes from 'prop-types';
import {AnterosLabel} from '../Label/AnterosLabel';


const styles = StyleSheet.create({
    
    socialBarSection: {
      flexDirection: 'row',
      flex: 1,
    },
    socialBarButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

export class AnterosSocialBar extends Component {

    static propTypes = {
        justifyContent: PropTypes.oneOf(['start', 'center', 'end', 'space-between']),
        alignItems: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
        backgroundColor: PropTypes.string,
        height: PropTypes.number,
        width: PropTypes.number
    };

    static defaultProps = {
        justifyContent: 'start',
        alignItems: 'start',
        backgroundColor: 'transparent',
        width: null,
        height: null
    };

    constructor(props) {
      super(props);
    }
  
    render() {
        let st = {
            flexDirection: 'row',
            backgroundColor: this.props.backgroundColor,
            height: this.props.height,
            width: this.props.width
        };
        if (this.props.alignItems == 'center') {
            st.alignItems = 'center';
        } else if (this.props.alignItems == 'end') {
            st.alignItems = 'flex-end';
        } else if (this.props.alignItems == 'stretch') {
            st.alignItems = 'stretch';
        } else {
            st.alignItems = 'flex-start';
        }

        if (this.props.justifyContent == 'start') {
            st.justifyContent = 'flex-start';
        } else if (this.props.justifyContent == 'center') {
            st.justifyContent = 'center';
        } else if (this.props.justifyContent == 'end') {
            st.justifyContent = 'flex-end';
        } else {
            st.justifyContent = 'space-between';
        }

        
      return <View style={[st,this.props.style]}>
        {this.props.children}
      </View>;
    }
  }
  
  class SocialButton extends Component {

    static propTypes = {
    };

    static defaultProps = {
    };
  
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <View style={[styles.socialBarSection, this.props.style]}>
          <TouchableOpacity style={styles.socialBarButton} onPress={this.props.onPress}>
            <AnterosIcon
              type={this.props.fontType}
              name={this.props.iconName}
              color={this.props.color}
              size={this.props.iconSize}/>
            <AnterosLabel
              style={{
              marginLeft: 8,
              alignSelf: 'flex-start',
              justifyContent: 'center',
              color: this.props.color
            }}
              text={this.props.caption}/>
          </TouchableOpacity>
        </View>
      );
    }
  }
  
  AnterosSocialBar.SocialButton = SocialButton;