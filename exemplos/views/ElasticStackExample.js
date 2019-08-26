
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {AnterosNavigationPage, AnterosElasticStack, AnterosImage} from 'anteros-react-native';

const items = ['https://source.unsplash.com/MsTOg6rhRVk/300x300',
               'https://source.unsplash.com/-YHSwy6uqvk/300x300',
               'https://source.unsplash.com/12eHC6FxPyg/300x300',
               'https://source.unsplash.com/XoByiBymX20/300x300',
               'https://source.unsplash.com/aZOqcEK2KuQ/300x300',
               'https://source.unsplash.com/L1ZhjK-R6uc/300x300',
               'https://source.unsplash.com/SqYmTDQYMjo/300x300',
               'https://source.unsplash.com/_Zn_7FzoL1w/300x300'
               ]


export default class ElasticStackExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Elastic stack',
      showBackButton: true,
    };

    renderPage() {
        return (
            <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#1565C0' }}>
                <AnterosElasticStack
                    items={items}
                    itemWidth={300}
                    itemHeight={300}
                    renderItem={url => <AnterosImage  style={{borderWidth: 1, borderColor:'white'}} source={{uri:url}} width={300} height={300} />}
                    elastickRange={0.9}
                    elastickItemsCount={5}
                />
            </View>
        );
  }
}