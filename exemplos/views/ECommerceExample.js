import {Component} from 'react';
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
import {AnterosImage, AnterosButton,  AnterosNavigationPage, AnterosActionSheet, AnterosLabel, AnterosListRow, AnterosText} from 'anteros-react-native';
import PricingCardExample from './PricingCardExample';

const timer = require('react-native-timer');

const DEVICE_WIDTH = Dimensions
    .get('window')
    .width;
const DEVICE_HEIGHT = Dimensions
    .get('window')
    .height;

export class ECommerceExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'e-Commerce',
        showBackButton: true
    };
    constructor(props) {
        super(props);
        this.ecommerce5 = this
            .ecommerce5
            .bind(this);
    }

    renderRow = (highlighted) => {
        if (Platform.OS !== 'android') {
            return <View
                style={[
                {
                    backgroundColor: '#f0f0f0',
                    height: 1
                },
                highlighted && {
                    marginLeft: 0
                }
            ]}/>;
        }

        return null;
    };

    ecommerce5() {
        this
            .navigator
            .push({view: <PricingCardExample/>})
    }


    renderPage() {
        return (
            <ScrollView style={{
                flex: 1
            }}>
                <View style={{
                    height: 20
                }}/>
                <AnterosListRow title='Category' onPress={this.ecommerce1} topSeparator='full'/>
                <AnterosListRow title='Product list 1' onPress={this.ecommerce2}  topSeparator='full'/>
                <AnterosListRow title='Product list 2' onPress={this.ecommerce3}  topSeparator='full'/>
                <AnterosListRow title='Product detail' onPress={this.ecommerce4}  topSeparator='full'/>
                <AnterosListRow title='Pricing card' onPress={this.ecommerce5}  topSeparator='full'/>
                <AnterosListRow title='Shop' onPress={this.ecommerce6}  topSeparator='full'/>
                <AnterosListRow title='Cart' onPress={this.ecommerce7}  topSeparator='full'/>
                <AnterosListRow title='Checkout' onPress={this.ecommerce8}  topSeparator='full'/>
                <AnterosListRow title='My order' onPress={this.ecommerce9}  topSeparator='full'/>
            </ScrollView>
        );
    }
}

const stylesList = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    row: {
        paddingHorizontal: 10,
        paddingVertical: 20
    }
});