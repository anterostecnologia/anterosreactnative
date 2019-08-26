import React, {Component} from 'react';

import {View as ViewAnimatable} from 'react-native-animatable';

export class AnterosView extends Component {
    static propTypes = {
        ...ViewAnimatable.propTypes
    };

    static defaultProps = {
        ...ViewAnimatable.defaultProps
    };

    constructor(props) {
        super(props);
    }


    render(){
        return (<ViewAnimatable {...this.props}/>);
    }

}