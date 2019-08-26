import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AnterosImage } from '../Image/AnterosImage';
import {Platform, Dimensions, FlatList, View, Text } from 'react-native';

export class AnterosImageList extends Component {
    constructor(props){
        super(props);
        this.renderImage = this.renderImage.bind(this);
    }

    static propTypes = {
        dataSource: PropTypes.array,
        horizontal: PropTypes.bool.isRequired,
        listStyle : PropTypes.any,
        imageStyle : PropTypes.any,
        idName: PropTypes.string.isRequired,
        sourceName: PropTypes.string.isRequired

    }

    static defaultProps = {
        horizontal: false,
        listStyle: {},
        imageStyle: {width:100, height:100}
    }

    _keyExtractor = (item, index) => item[this.props.idName];

    renderImage(row){
        return <AnterosImage source={{uri:row.item[this.props.sourceName]}} style={this.props.imageStyle}/>;
    }

    render(){
        return (
            <FlatList 
                horizontal={this.props.horizontal} 
                style={this.props.listStyle} 
                renderItem={this.renderImage}
                keyExtractor={this._keyExtractor} 
                data={this.props.dataSource}/>
        )
    }
}