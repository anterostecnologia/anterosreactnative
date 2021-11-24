import React, { Component } from 'react';
import { AppRegistry,StyleSheet,View, Text, ScrollView, FlatList } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {AnterosNavigationPage, AnterosListRow, AnterosPagerView,AnterosStepIndicator, AnterosText} from 'anteros-react-native';
import dummyData from './StepIndicatorData';

const PAGES = ['Page 1','Page 2','Page 3','Page 4','Page 5'];

const firstIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize:40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  separatorFinishedColor: '#4aae4f',
  separatorUnFinishedColor: '#a4d4a5',
  stepIndicatorFinishedColor: '#4aae4f',
  stepIndicatorUnFinishedColor: '#a4d4a5',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 12,
  currentStepLabelColor: '#4aae4f'
}

const secondIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize:40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
}

const thirdIndicatorStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#7eaec4',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#7eaec4',
  stepStrokeUnFinishedColor: '#dedede',
  separatorFinishedColor: '#7eaec4',
  separatorUnFinishedColor: '#dedede',
  stepIndicatorFinishedColor: '#7eaec4',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: 'transparent',
  stepIndicatorLabelUnFinishedColor: 'transparent',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#7eaec4'
}

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
      name: 'feed',
      color: stepStatus === 'finished' ? '#ffffff' : '#fe7013',
      size: 15,
    };
    switch (position) {
      case 0: {
        iconConfig.name = 'shopping-cart';
        break;
      }
      case 1: {
        iconConfig.name = 'location-on';
        break;
      }
      case 2: {
        iconConfig.name = 'assessment';
        break;
      }
      case 3: {
        iconConfig.name = 'payment';
        break;
      }
      case 4: {
        iconConfig.name = 'track-changes';
        break;
      }
      default: {
        break;
      }
    }
    return iconConfig;
  };



export class StepIndicatorExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Swiper',
    showBackButton: true
  };

  show(modal) {
    let items = [
      {
        title: 'Say hello',
        onPress: () => alert('Hello')
      }, {
        title: 'Do nothing'
      }, {
        title: 'Disabled',
        disabled: true
      }
    ];
    let cancelItem = {
      title: 'Cancel'
    };
    AnterosActionSheet.show(items, cancelItem, {modal});
  }

  renderPage() {
    return (
      <ScrollView style={{
        flex: 1
      }}>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Horizontal'
          onPress={() => this.navigator.push({view: <StepHorizontal/>})}
          topSeparator='full'/>
        <AnterosListRow
          title='Vertical'
          onPress={() => this.navigator.push({view: <VerticalStepIndicator/>})}
          bottomSeparator='full'/>
      </ScrollView>
    );
  }

}


class StepHorizontal extends AnterosNavigationPage {
    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: "Step horizontal",
      showBackButton: true
    };
  
    constructor(props) {
      super(props);
      this.state = {
        currentPage:0
      }
    }
  
      renderPage(){
          return (  
              <View style={stylesStep.container}>
              <View style={stylesStep.stepIndicator}>
                <AnterosStepIndicator customStyles={firstIndicatorStyles} currentPosition={this.state.currentPage} labels={["Account","Profile","Band","Membership","Dashboard"]} />
              </View>
              <View style={stylesStep.stepIndicator}>
                <AnterosStepIndicator renderStepIndicator={this.renderStepIndicator} customStyles={secondIndicatorStyles} currentPosition={this.state.currentPage} labels={["Cart","Delivery Address","Order Summary","Payment Method","Track"]} />
              </View>
              <View style={stylesStep.stepIndicator}>
                <AnterosStepIndicator stepCount={4} customStyles={thirdIndicatorStyles} currentPosition={this.state.currentPage} labels={["Approval","Processing","Shipping","Delivery"]} />
              </View>
              <AnterosPagerView
                style={{flexGrow:1}}
                ref={(viewPager) => {this.viewPager = viewPager}}
                onPageSelected={(page) => {this.setState({currentPage:page.position})}}
                >
                  {PAGES.map((page,index) => this.renderViewPagerPage(page,index))}
                </AnterosPagerView>
            </View>              
          );
  
      }
  
      renderViewPagerPage = (data, index) => {
          return(<View style={stylesStep.page} key={index}>
            <AnterosText>{data}</AnterosText>
          </View>)
        }
      
        renderStepIndicator = params => (
          <MaterialIcon {...getStepIndicatorIconConfig(params)} />
        );
  }
  
  
  
  const stylesStep = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    stepIndicator: {
      marginVertical:50,
    },
    page: {
      flex:1,
      backgroundColor: '#ffffff',
      justifyContent:'center',
      alignItems:'center'
    }
  });


  

const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize:40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: '#fe7013',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#aaaaaa',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 15,
  currentStepLabelColor: '#fe7013'
}

class VerticalStepIndicator extends AnterosNavigationPage {
    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: "Step vertical",
      showBackButton: true
    };

  constructor() {
    super();

    this.state = {
      currentPage:0
    };
    this.viewabilityConfig = {itemVisiblePercentThreshold: 40}
  }

  renderPage() {
    return (
      <View style={stylesVertical.container}>
          <View style={stylesVertical.stepIndicator}>
            <AnterosStepIndicator
              customStyles={stepIndicatorStyles}
              stepCount={6}
              direction='vertical'
              currentPosition={this.state.currentPage}
              labels={dummyData.data.map(item => item.title)}
              />
          </View>
          <FlatList
            style={{flexGrow:1}}
            data={dummyData.data}
            renderItem={this.renderItem}
            onViewableItemsChanged={this.onViewableItemsChanged}
            viewabilityConfig={this.viewabilityConfig}
          />
      </View>
    );
  }

  renderItem = (rowData) => {
    const item = rowData.item
    return (
      <View style={stylesVertical.rowItem}>
        <AnterosText style={stylesVertical.title}>{item.title}</AnterosText>
        <AnterosText style={stylesVertical.body}>{item.body}</AnterosText>
      </View>
    )
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
      const visibleItemsCount = viewableItems.length;
      if(visibleItemsCount != 0) {
      this.setState({currentPage:viewableItems[visibleItemsCount-1].index})
    };
  }
}

const stylesVertical = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    backgroundColor:'#ffffff'
  },
  stepIndicator: {
    marginVertical:50,
    paddingHorizontal:20
  },
  rowItem: {
    flex:3,
    paddingVertical:20
  },
  title: {
    flex: 1,
    fontSize:20,
    color:'#333333',
    paddingVertical:16,
    fontWeight:'600'
  },
  body: {
    flex: 1,
    fontSize:15,
    color:'#606060',
    lineHeight:24,
    marginRight:8
  }
});



