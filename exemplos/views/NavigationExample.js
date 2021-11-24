import {Component, PureComponent} from 'react';
import {
    StyleSheet,
    FlatList,
    Alert,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Actions,
    SafeAreaView,
    Platform,
    ImageBackground,
    ViewPropTypes,
    Animated,
    StatusBar,
    Easing,
    Image,
    TextInput,
    Dimensions,
    View
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {AnterosButton, AnterosSwiper, AnterosNavigationPage, AnterosActionSheet, 
    AnterosLabel, AnterosListRow, AnterosText, AnterosImage} from 'anteros-react-native';
import MenuExample from './MenuExample';
import NavigationBarExample from './NavigationBarExample';
import BubbleMenuExample from './BubbleMenuExample';
import CircleMenuExample from './CircleMenuExample';
import DrawerExample from './DrawerExample';
import OverlayExample from './OverlayExample';
import ActionSheetExample from './ActionSheetExample';
import CircularActionMenuExample from './CircularActionMenuExample';
import BreadCrumbExample from './BreadCrumbExample';


const timer = require('react-native-timer');

const DEVICE_WIDTH = Dimensions
    .get('window')
    .width;
const DEVICE_HEIGHT = Dimensions
    .get('window')
    .height;

export class NavigationExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Navigation',
        showBackButton: true
    };
    constructor(props) {
        super(props);
        this.layout1 = this
            .layout1
            .bind(this);
        this.layout2 = this
            .layout2
            .bind(this);    
        this.layout3 = this
            .layout3
            .bind(this);     
        this.layout4 = this
            .layout4
            .bind(this);    
        this.layout5 = this
            .layout5
            .bind(this);     
        this.layout6 = this
            .layout6
            .bind(this);     
        this.layout7 = this
            .layout7
            .bind(this);    
        this.layout8 = this
            .layout8
            .bind(this);      
        this.layout9 = this
            .layout9
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

    layout1() {
        //  this
        //      .navigator
        //      .push({view: <MenuExample/>})
    }

    layout2() {
        this
            .navigator
            .push({view: <NavigationBarExample/>})
    }
    layout3() {
        this
            .navigator
            .push({view: <BubbleMenuExample/>})
    }
    layout4() {
        this
            .navigator
            .push({view: <CircleMenuExample/>})
    }
    layout5() {
        this
            .navigator
            .push({view: <DrawerExample/>})
    }
    layout6() {
        this
            .navigator
            .push({view: <OverlayExample/>})
    }

    layout7() {
        this
            .navigator
            .push({view: <ActionSheetExample/>})
    }
    layout8() {
        this
            .navigator
            .push({view: <CircularActionMenuExample/>})
    }
    layout9() {
        this
            .navigator
            .push({view: <BreadCrumbExample/>})
    }
    

    renderPage() {
        return (
            <ScrollView style={{
                flex: 1
            }}>
                <View style={{
                    height: 20
                }}/>
                <AnterosListRow title='Menu' onPress={this.layout1} topSeparator='full'/>
                <AnterosListRow title='Navigation bar' onPress={this.layout2}  topSeparator='full'/>
                <AnterosListRow title='Bubble menu' onPress={this.layout3}  topSeparator='full'/>
                <AnterosListRow title='Circle menu' onPress={this.layout4}  topSeparator='full'/>
                <AnterosListRow title='Drawer menu' onPress={this.layout5}  topSeparator='full'/>
                <AnterosListRow title='Overlay' onPress={this.layout6}  topSeparator='full'/>
                <AnterosListRow title='ActionSheet' onPress={this.layout7}  topSeparator='full'/>
                <AnterosListRow title='Circular action menu' onPress={this.layout8}  topSeparator='full'/>
                <AnterosListRow title='BreadCrumb' onPress={this.layout9}  topSeparator='full'/>
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