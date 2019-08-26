'use strict';

import React, {Component} from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import {AnterosNavigationPage, AnterosListRow, AnterosToast, AnterosTheme, AnterosSocialIcon} from 'anteros-react-native';

export default class SocialIconExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Toast',
        showBackButton: true
    };

    renderPage() {
        return (
            <ScrollView>
                <AnterosSocialIcon type='twitter'/>
                <AnterosSocialIcon raised={false} type='gitlab'/>
                <AnterosSocialIcon light type='medium'/>
                <AnterosSocialIcon light raised={false} type='medium'/>
                <AnterosSocialIcon title='Sign In With Facebook' button type='facebook'/>
                <AnterosSocialIcon title='Some Twitter Message' button type='twitter'/>
                <AnterosSocialIcon button type='medium'/>
                <AnterosSocialIcon button light type='instagram'/>
            </ScrollView>
        );

    }

}