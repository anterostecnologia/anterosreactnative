"use strict";

import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';

import {AnterosNavigationPage, AnterosListRow, AnterosAvatar, AnterosSpacer, AnterosFacePile} from 'anteros-react-native';


const avatars = [{imageUrl:'https://randomuser.me/api/portraits/women/88.jpg'},
                 {imageUrl:'https://randomuser.me/api/portraits/men/79.jpg'},
                 {imageUrl:'https://randomuser.me/api/portraits/women/85.jpg'},
                 {imageUrl:'https://randomuser.me/api/portraits/women/81.jpg'},
                 {imageUrl:'https://randomuser.me/api/portraits/men/60.jpg'},
                 {imageUrl:'https://randomuser.me/api/portraits/men/91.jpg'},
                 {imageUrl:'https://randomuser.me/api/portraits/men/73.jpg'}];

export default class AvatarExample extends AnterosNavigationPage {
    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: "Avatar",
        showBackButton: true
    };

    renderPage() {
        return (
            <ScrollView style={{
                flex: 1
            }}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
                    <AnterosAvatar
                        small
                        rounded
                        source={{
                        uri: "https://randomuser.me/api/portraits/women/85.jpg"
                    }}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}/>
                    <AnterosAvatar
                        medium
                        source={{
                        uri: "https://randomuser.me/api/portraits/men/79.jpg"
                    }}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}/>
                    <AnterosAvatar
                        large
                        rounded
                        source={{
                        uri: "https://randomuser.me/api/portraits/women/88.jpg"
                    }}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}/>
                    <AnterosAvatar
                        xlarge
                        rounded
                        avatarStyle={{borderWidth: 1,borderColor: '#1E88E5'}}
                        source={{
                        uri: "https://randomuser.me/api/portraits/women/3.jpg"
                    }}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}/>
                </View>
                <AnterosSpacer height={10}/> 
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
                    <AnterosAvatar
                        small
                        rounded
                        title="MT"
                        overlayContainerStyle={{backgroundColor:'#A5D6A7'}}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}/>
                    <AnterosAvatar
                        medium
                        title="BP"
                        overlayContainerStyle={{backgroundColor:'#66BB6A'}}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}/>
                    <AnterosAvatar
                        large
                        title="LW" 
                        overlayContainerStyle={{backgroundColor:'#388E3C'}}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}/>
                    <AnterosAvatar
                        xlarge
                        rounded
                        title="CR"
                        overlayContainerStyle={{backgroundColor:'#1B5E20'}}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}/>
                </View>
                <AnterosSpacer height={10}/> 
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
                    <AnterosAvatar
                        small
                        rounded
                        icon={{
                        name: 'user',
                        type: 'font-awesome'
                    }}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                        containerStyle={{
                        flex: 2,
                        marginLeft: 20,
                        marginTop: 115
                    }}/>
                    <AnterosAvatar
                        medium
                        overlayContainerStyle={{
                        backgroundColor: 'blue'
                    }}
                        icon={{
                        name: 'bicycle',
                        color: 'red',
                        type: 'font-awesome'
                    }}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                        containerStyle={{
                        flex: 3,
                        marginTop: 100
                    }}/>
                    <AnterosAvatar
                        large
                        icon={{
                        name: 'dribbble',
                        color: 'orange',
                        type: 'font-awesome'
                    }}
                        overlayContainerStyle={{
                        backgroundColor: 'white'
                    }}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                        containerStyle={{
                        flex: 4,
                        marginTop: 75
                    }}/>
                    <AnterosAvatar
                        xlarge
                        rounded
                        icon={{
                        name: 'home',
                        type: 'font-awesome'
                    }}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                        containerStyle={{
                        flex: 5,
                        marginRight: 60
                    }}/>
                </View>
                <View style={{marginTop:10,flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',}}>
                    <AnterosFacePile contentStyle={{marginBottom:10}} faces={avatars} circleSize={15}/>
                    <AnterosFacePile contentStyle={{marginBottom:10}} faces={avatars} circleSize={25}/>
                    <AnterosFacePile contentStyle={{marginBottom:10}} faces={avatars} circleSize={35} offSet={2} />
                </View>
            </ScrollView>
        );
    }
}