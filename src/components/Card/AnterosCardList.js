import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {FlatList} from 'react-native';

export class AnterosCardList extends Component {

    static propTypes = {
        dataSource: PropTypes.array,
        separator: PropTypes.Component,
        renderCard: PropTypes.function,
        keyExtractor : PropTypes.function
    };

    static defaultProps = {
        dataSource: []
    };

    constructor(props) {
        super(props);

    }

    render() {
        return (<FlatList
            style={this.props.style}
            data={this.props.dataSource}
            keyExtractor={this.props.keyExtractor}
            ItemSeparatorComponent={this.props.separator}
            renderItem={this.props.renderCard}/>);
    }
}