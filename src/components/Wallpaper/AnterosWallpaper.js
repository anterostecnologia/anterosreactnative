import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import PropTypes from 'prop-types';
import {AnterosImageOverlay} from '../Image/AnterosImageOverlay';

export class AnterosWallpaper extends Component {
    static propTypes = {
        backgroundSource: PropTypes.any.isRequired
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    render() {
        let {height,width} = this.props;
        if (height == 0 && width == 0) 
            return <View></View>
        else {
            let st = {
                width: this.props.width,
                height: this.props.height
            };
            return <AnterosImageOverlay
                style={[stylesWallpaper.picture, st]}
                source={this.props.backgroundSource}
                onLayout={this.props.onLayout}>
                {this.props.children}
            </AnterosImageOverlay>
        }
    }
}

const stylesWallpaper = StyleSheet.create({
    picture: {
        flex: 1,
        width: null,
        height: null
    }
});