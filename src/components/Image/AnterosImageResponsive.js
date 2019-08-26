import React, { Component } from 'react';
import { AnterosImage } from '../Image/AnterosImage';
import {Platform, Dimensions } from 'react-native';


var device = Dimensions.get('window');
var scale;
if (Platform.OS === 'ios') {
    if (device.width <= 414) { 
        //Android smartphones
        scale = device.width / 414;
    } else{
        //Android tablets
        scale = 1;
    }
}
else {    
    switch (device.width) {
        //iPhone4/4S and iPhone5/5S
            case 320:
            scale = 0.77;
            break;
        //iPhone6/6S
            case 375:
            scale = 0.902;
            break;
        //iPhone6plus/6Splus
            case 414:
            scale = 1;
            break;
        //iPad
        default:
            scale = 1;
    }
}



function applyScale(size) {
    return Math.ceil(size * scale);
  }

export class AnterosImageResponsive extends Component {

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    var width = applyScale(this.props.initWidth);
    var height = applyScale(this.props.initHeight);
    const Component = this.props.component
    return (
      <Component
        style={[{ width: width, height: height }, this.props.style]}
        source={this.props.source}
        ref={component => this._root = component}
        resizeMode={this.props.resizeMode || 'cover'}
        onLoadStart={this.props.onLoadStart}
        onProgress={this.props.onProgress}
        onLoad={this.props.onLoad}
        onError={this.props.onError}
        onLoadEnd={this.props.onLoadEnd}
        defaultSource={this.props.defaultSource}
        borderRadius={this.props.borderRadius}
      >
        {this.props.children}
      </Component>
    )
  }
}

AnterosImageResponsive.defaultProps = {
  component: AnterosImage
}