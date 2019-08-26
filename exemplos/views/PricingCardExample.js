'use strict';

import React, {Component} from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';

import {AnterosNavigationPage, AnterosPricingCard} from 'anteros-react-native';

export default class PricingCardExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Pricing card',
        showBackButton: true
    };

    renderPage() {
        return (
            <View>
                <AnterosPricingCard
                    color='#4f9deb'
                    title='Free'
                    price='$0'
                    info={['1 User', 'Basic Support', 'All Core Features']}
                    button={{
                    title: 'GET STARTED',
                    icon: 'flight-takeoff',
                    type: 'font-awesome'
                }}/>
            </View>
        );
    }

}