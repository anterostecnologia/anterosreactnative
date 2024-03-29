// SegmentedBarExample.js

'use strict';

import {Component} from 'react';
import {StyleSheet, View, Image, ScrollView, Switch} from 'react-native';

import {
  AnterosTheme,
  AnterosNavigationPage,
  AnterosListRow,
  AnterosLabel,
  AnterosSegmentedBar,
  AnterosPullPicker,
  AnterosCarousel
} from 'anteros-react-native';
import SelectRow from './SelectRow';

export class SegmentedBarExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'SegmentedBar',
    showBackButton: true
  };

  constructor(props) {
    super(props);

    this.barItems = ['Apple', 'Banana', 'Cherry', 'Durian'];
    this.barScrollItems = [
      'Apple',
      'Banana',
      'Cherry',
      'Durian',
      'Filbert',
      'Grape',
      'Hickory',
      'Lemon',
      'Mango'
    ];
    this.barCustomItems = ['Home', 'Store', 'Me'];

    this.justifyItemItems = ['fixed', 'scrollable'];
    this.indicatorTypeItems = ['none', 'boxWidth', 'itemWidth'];
    this.indicatorPositionItems = ['top', 'bottom'];

    Object.assign(this.state, {
      justifyItem: 'fixed',
      indicatorType: 'itemWidth',
      indicatorPosition: 'bottom',
      animated: true,
      autoScroll: true,
      activeIndex: 0,
      custom: false
    });
  }

  onSegmentedBarChange(index) {
    if (index != this.state.activeIndex) {
      this.setState({activeIndex: index});
      if (this.refs.carousel) {
        this
          .refs
          .carousel
          .scrollToPage(index, false);
      }
    }
  }

  onCarouselChange(index) {
    index != this.state.activeIndex && this.setState({activeIndex: index});
  }

  renderCustomItems() {
    let icons = [require('../icons/home.png'), require('../icons/store.png'), require('../icons/me.png')];
    let activeIcons = [require('../icons/home_active.png'), require('../icons/store_active.png'), require('../icons/me_active.png')];
    let {activeIndex} = this.state;
    return this
      .barCustomItems
      .map((item, index) => {
        let isActive = index == activeIndex;
        let tintColor = isActive
          ? AnterosTheme.primaryColor
          : '#989898';
        return (
          <View
            key={index}
            style={{
            padding: 8,
            alignItems: 'center'
          }}>
            <Image
              style={{
              width: 20,
              height: 20,
              tintColor
            }}
              source={isActive
              ? activeIcons[index]
              : icons[index]}/>
            <AnterosLabel
              style={{
              color: tintColor,
              paddingTop: 4
            }}
              text={item}/>
          </View>
        );
      });
  }

  renderPage() {
    let {
      justifyItem,
      indicatorType,
      indicatorPosition,
      animated,
      autoScroll,
      custom,
      activeIndex
    } = this.state;
    let barItems = custom
      ? this.barCustomItems
      : (justifyItem == 'scrollable'
        ? this.barScrollItems
        : this.barItems);
    return (
      <ScrollView style={{
        flex: 1
      }} stickyHeaderIndices={[1]}>
        <View style={{
          height: 20
        }}/>
        <AnterosSegmentedBar
          justifyItem={justifyItem}
          indicatorType={indicatorType}
          indicatorPosition={indicatorPosition}
          indicatorLineColor={custom
          ? '#5cb85c'
          : undefined}
          indicatorLineWidth={custom
          ? 1
          : undefined}
          indicatorPositionPadding={custom
          ? 3
          : undefined}
          animated={animated}
          autoScroll={autoScroll}
          activeIndex={activeIndex}
          onChange={index => this.onSegmentedBarChange(index)}>
          {custom
            ? this.renderCustomItems()
            : barItems.map((item, index) => <AnterosSegmentedBar.Item key={'item' + index} title={item}/>)}
        </AnterosSegmentedBar>
        <AnterosCarousel
          style={{
          backgroundColor: AnterosTheme.defaultColor,
          height: 238,
          borderTopWidth: 1,
          borderTopColor: AnterosTheme.pageColor
        }}
          carousel={false}
          startIndex={activeIndex}
          cycle={false}
          ref='carousel'
          onChange={index => this.onCarouselChange(index)}>
          {barItems.map((item, index) => (
            <View
              key={'view' + index}
              style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AnterosLabel type='detail' size='xl' text={item}/>
            </View>
          ))}
        </AnterosCarousel>
        <View style={{
          height: 20
        }}/>
        <SelectRow
          title='Justify item'
          value={justifyItem}
          items={this.justifyItemItems}
          onSelected={(item, index) => this.setState({justifyItem: item})}
          topSeparator='full'/>
        <SelectRow
          title='Indicator type'
          value={indicatorType}
          items={this.indicatorTypeItems}
          onSelected={(item, index) => this.setState({indicatorType: item})}/>
        <SelectRow
          title='Indicator position'
          value={indicatorPosition}
          items={this.indicatorPositionItems}
          onSelected={(item, index) => this.setState({indicatorPosition: item})}/>
        <AnterosListRow
          title='Animated'
          detail={< Switch value = {
          animated
        }
        onValueChange = {
          value => this.setState({animated: value})
        } />}/>
        <AnterosListRow
          title='Auto scroll (scrollable only)'
          detail={< Switch value = {
          autoScroll
        }
        onValueChange = {
          value => this.setState({autoScroll: value})
        } />}
          bottomSeparator='full'/>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Custom'
          detail={< Switch value = {
          custom
        }
        onValueChange = {
          value => this.setState({custom: value})
        } />}
          topSeparator='full'
          bottomSeparator='full'/>
      </ScrollView>
    );
  }

}
