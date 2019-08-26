'use strict';

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';

import {AnterosNavigationPage, AnterosListRow, AnterosText,AnterosChart} from 'anteros-react-native';



const data = Array.from({ length: 20 }).map(
  (unused, i) => i + (i + 1) * Math.random()
)

const props = {
  data,
  style: {
    margin: 10
  }
}
export default class ChartSparklineExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Sparkline',
    showBackButton: true
  };

  renderPage(){
    return (<View style={styles.container}>
            <AnterosText style={{fontSize: 40,color:'#3F51B5'}}>{'Spark line'}</AnterosText>
            <AnterosChart.Sparkline {...props}>
              <AnterosChart.SparklineLine />
            </AnterosChart.Sparkline>
        
            <AnterosText>Line</AnterosText>
        
            <AnterosChart.Sparkline {...props}>
              <AnterosChart.SparklineFill />
            </AnterosChart.Sparkline>
        
            <AnterosText>Fill</AnterosText>
        
            <AnterosChart.Sparkline {...props}>
              <AnterosChart.SparklineLine />
              <AnterosChart.SparklineFill />
            </AnterosChart.Sparkline>
        
            <AnterosText>Line + Fill</AnterosText>
        
            <AnterosChart.Sparkline {...props}>
              <AnterosChart.SparklineLine />
              <AnterosChart.SparklineFill />
              <AnterosChart.SparklineSpots color='red' />
            </AnterosChart.Sparkline>
        
            <AnterosText>with Spots</AnterosText>
        
            <AnterosChart.Sparkline {...props}>
              <AnterosChart.SparklineLine />
              <AnterosChart.SparklineBand />
            </AnterosChart.Sparkline>
        
            <AnterosText>Line + Band</AnterosText>
        
            <AnterosChart.Sparkline {...props}>
              <AnterosChart.SparklineLine />
              <AnterosChart.SparklineBand />
              <AnterosChart.SparklineGuide where='max' />
              <AnterosChart.SparklineGuide where='min' />
            </AnterosChart.Sparkline>
        
            <AnterosText>with Guide</AnterosText> 
          </View>
    );
  }
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })