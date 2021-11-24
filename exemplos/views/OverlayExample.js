// AnterosOverlayExample.js

'use strict';

import {Component} from 'react';
import {View, Image, ScrollView, TouchableWithoutFeedback, Dimensions} from 'react-native';

import {
  AnterosTheme,
  AnterosNavigationPage,
  AnterosOverlay,
  AnterosListRow,
  AnterosLabel,
  AnterosButton,
  AnterosCheckbox
} from 'anteros-react-native';

export class OverlayExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Overlay',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {
      black: true,
      shadow: false,
      showArrow: true,
    });
  }

  showDefault(transparent, modal, text) {
    let overlayView = (
      <AnterosOverlay.View
        style={{alignItems: 'center', justifyContent: 'center'}}
        modal={modal}
        overlayOpacity={transparent ? 0 : null}
        ref={v => this.overlayView = v}
        >
        <View style={{backgroundColor: transparent ? '#333' : AnterosTheme.defaultColor, padding: 40, borderRadius: 15, alignItems: 'center'}}>
          <AnterosLabel type='danger' size='xl' text={text} />
          {modal ? <View style={{height: 20}} /> : null}
          {modal ? <AnterosButton title='Close' onPress={() => this.overlayView && this.overlayView.close()} /> : null}
        </View>
      </AnterosOverlay.View>
    );
    AnterosOverlay.show(overlayView);
  }

  showPop(type, modal, text) {
    let overlayView = (
      <AnterosOverlay.PopView
        style={{alignItems: 'center', justifyContent: 'center'}}
        type={type}
        modal={modal}
        ref={v => this.overlayPopView = v}
        >
        <View style={{backgroundColor: AnterosTheme.defaultColor, minWidth: 260, minHeight: 180, borderRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
          <AnterosLabel type='title' size='xl' text={text} />
          {modal ? <View style={{height: 60}} /> : null}
          {modal ? <AnterosButton title='Close' onPress={() => this.overlayPopView && this.overlayPopView.close()} /> : null}
        </View>
      </AnterosOverlay.PopView>
    );
    AnterosOverlay.show(overlayView);
  }

  showPopCustom(imageSource, fromView) {
    fromView.measure((x, y, width, height, pageX, pageY) => {
      let overlayView = (
        <AnterosOverlay.PopView
          style={{alignItems: 'center', justifyContent: 'center'}}
          overlayOpacity={1}
          type='custom'
          customBounds={{x: pageX, y: pageY, width, height}}
          ref={v => this.customPopView = v}
          >
          <TouchableWithoutFeedback onPress={() => this.customPopView && this.customPopView.close()}>
            <Image source={imageSource} resizeMode='cover' />
          </TouchableWithoutFeedback>
        </AnterosOverlay.PopView>
      );
      AnterosOverlay.show(overlayView);
    });
  }

  showPull(side, modal, text, rootTransform) {
    let overlayView = (
      <AnterosOverlay.PullView side={side} modal={modal} rootTransform={rootTransform} ref={v => this.overlayPullView = v}>
        <View style={{backgroundColor: AnterosTheme.defaultColor, minWidth: 300, minHeight: 260, justifyContent: 'center', alignItems: 'center'}}>
          <AnterosLabel type='title' size='xl' text={text} />
          {modal ? <View style={{height: 60}} /> : null}
          {modal ? <AnterosButton title='Close' onPress={() => this.overlayPullView && this.overlayPullView.close()} /> : null}
        </View>
      </AnterosOverlay.PullView>
    );
    AnterosOverlay.show(overlayView);
  }

  showPopover(view, direction, align) {
    let {black, shadow, showArrow} = this.state;
    let blackStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 12,
      paddingRight: 12,
    };
    let whiteStyle = {
      ...blackStyle,
      backgroundColor: '#fff',
    };
    let shadowStyle = {
      shadowColor: '#777',
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.5,
      shadowRadius: 2,
    };
    let popoverStyle = [].concat(black ? blackStyle : whiteStyle).concat(shadow ? shadowStyle : null);

    view.measure((x, y, width, height, pageX, pageY) => {
      let fromBounds = {x: pageX, y: pageY, width, height};
      let overlayView = (
        <AnterosOverlay.PopoverView popoverStyle={popoverStyle} fromBounds={fromBounds} direction={direction} align={align} directionInsets={4} showArrow={showArrow}>
          <AnterosLabel style={{color: black ? '#fff' : '#000'}} size='lg' text={direction + ' ' + align} />
        </AnterosOverlay.PopoverView>
      );
      AnterosOverlay.show(overlayView);
    });
  }

  showMulti() {
    let overlayView = (
      <AnterosOverlay.PullView modal={false}>
        <View style={{backgroundColor: AnterosTheme.defaultColor, minWidth: 200, minHeight: 260, justifyContent: 'center', alignItems: 'center'}}>
          <AnterosLabel type='title' size='xl' text='Overlay' />
          <View style={{height: 60}} />
          <AnterosButton title='New overlay' onPress={() => this.showDefault(false, true, 'New overlay')} />
        </View>
      </AnterosOverlay.PullView>
    );
    AnterosOverlay.show(overlayView);
  }

  renderPage() {
    let img = require('../images/faircup.jpg');
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <AnterosListRow title='Transparent' onPress={() => this.showDefault(true, false, 'Transparent')} topSeparator='full' />
        <AnterosListRow title='Translucent' onPress={() => this.showDefault(false, false, 'Translucent')} />
        <AnterosListRow title='Translucent modal' onPress={() => this.showDefault(false, true, 'Translucent modal')} bottomSeparator='full' />
        <View style={{height: 20}} />
        <AnterosListRow title='Pull from bottom' onPress={() => this.showPull('bottom', false, 'Pull from bottom')} topSeparator='full' />
        <AnterosListRow title='Pull from top' onPress={() => this.showPull('top', false, 'Pull from top')} />
        <AnterosListRow title='Pull from left' onPress={() => this.showPull('left', false, 'Pull from left')} />
        <AnterosListRow title='Pull from right' onPress={() => this.showPull('right', false, 'Pull from right')} />
        <AnterosListRow title='Pull modal' onPress={() => this.showPull('bottom', true, 'Pull modal')} />
        <AnterosListRow title='Pull and scale' onPress={() => this.showPull('bottom', false, 'Pull and scale', 'scale')} />
        <AnterosListRow title='Pull and translate' onPress={() => this.showPull('left', false, 'Pull and translate', 'translate')} bottomSeparator='full' />
        <View style={{height: 20}} />
        <AnterosListRow title='Pop zoom out' onPress={() => this.showPop('zoomOut', false, 'Pop zoom out')} topSeparator='full' />
        <AnterosListRow title='Pop zoom in' onPress={() => this.showPop('zoomIn', false, 'Pop zoom in')} />
        <AnterosListRow title='Pop modal' onPress={() => this.showPop('zoomOut', true, 'Pop modal')} />
        <AnterosListRow
          title='Pop custom'
          detail={<Image style={{width: 40, height: 40}} source={img} resizeMode='cover' ref={v => this.imgView = v} />}
          onPress={() => this.showPopCustom(img, this.imgView)}
          bottomSeparator='full' />
        <View style={{height: 20}} />
        <AnterosListRow
          title='Popover'
          titlePlace='top'
          detail={
            <View>
              <View style={{paddingTop: 16, paddingBottom: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
                <AnterosCheckbox title='Black' ref='black' checked={this.state.black} onChange={value => this.setState({black: value})} />
                <AnterosCheckbox title='Shadow' ref='shadow' checked={this.state.shadow} onChange={value => this.setState({shadow: value})} />
                <AnterosCheckbox title='Show arrow' ref='showArrow' checked={this.state.showArrow} onChange={value => this.setState({showArrow: value})} />
              </View>
              <View style={{paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
                <AnterosButton title='down start' ref='downstart' onPress={() => this.showPopover(this.refs['downstart'], 'down', 'start')} />
                <AnterosButton title='down center' ref='downcenter' onPress={() => this.showPopover(this.refs['downcenter'], 'down', 'center')} />
                <AnterosButton title='down end' ref='downend' onPress={() => this.showPopover(this.refs['downend'], 'down', 'end')} />
              </View>
              <View style={{paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
                <AnterosButton title='right start' ref='rightstart' onPress={() => this.showPopover(this.refs['rightstart'], 'right', 'start')} />
                <AnterosButton title='left start' ref='leftstart' onPress={() => this.showPopover(this.refs['leftstart'], 'left', 'start')} />
              </View>
              <View style={{paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
                <AnterosButton title='right center' ref='rightcenter' onPress={() => this.showPopover(this.refs['rightcenter'], 'right', 'center')} />
                <AnterosButton title='left center' ref='leftcenter' onPress={() => this.showPopover(this.refs['leftcenter'], 'left', 'center')} />
              </View>
              <View style={{paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
                <AnterosButton title='right end' ref='rightend' onPress={() => this.showPopover(this.refs['rightend'], 'right', 'end')} />
                <AnterosButton title='left end' ref='leftend' onPress={() => this.showPopover(this.refs['leftend'], 'left', 'end')} />
              </View>
              <View style={{paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
                <AnterosButton title='up start' ref='upstart' onPress={() => this.showPopover(this.refs['upstart'], 'up', 'start')} />
                <AnterosButton title='up center' ref='upcenter' onPress={() => this.showPopover(this.refs['upcenter'], 'up', 'center')} />
                <AnterosButton title='up end' ref='upend' onPress={() => this.showPopover(this.refs['upend'], 'up', 'end')} />
              </View>
            </View>
          }
          topSeparator='full'
          />
        <View style={{height: 20}} />
        <AnterosListRow title='Multi overlay' onPress={() => this.showMulti()} topSeparator='full' bottomSeparator='full' />
        <View style={{height: AnterosTheme.screenInset.bottom}} />
      </ScrollView>
    );
  }

}
