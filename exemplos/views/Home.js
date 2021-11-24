// Home.js

'use strict';

import {Component} from 'react';
import {View, ScrollView} from 'react-native';

import {AnterosTheme, AnterosNavigationPage, AnterosNavigationBar, AnterosListRow} from 'anteros-react-native';
import ThemeExample from './ThemeExample';
import LabelExample from './LabelExample';
import ButtonExample from './ButtonExample';
import CheckboxExample from './CheckboxExample';
import InputExample from './InputExample';
import SelectExample from './SelectExample';
import StepperExample from './StepperExample';
import SearchInputExample from './SearchInputExample';
import BadgeExample from './BadgeExample';
import PopoverExample from './PopoverExample';
import NavigationBarExample from './NavigationBarExample';
import ListRowExample from './ListRowExample';
import CarouselExample from './CarouselExample';
import ProjectorExample from './ProjectorExample';
import SegmentedBarExample from './SegmentedBarExample';
import SegmentedViewExample from './SegmentedViewExample';
import TabViewExample from './TabViewExample';
import TransformViewExample from './TransformViewExample';
import AlbumViewExample from './AlbumViewExample';
import WheelExample from './WheelExample';
import OverlayExample from './OverlayExample';
import ToastExample from './ToastExample';
import ActionSheetExample from './ActionSheetExample';
import ActionPopoverExample from './ActionPopoverExample';
import PullPickerExample from './PullPickerExample';
import PopoverPickerExample from './PopoverPickerExample';
import MenuExample from './MenuExample';
import DrawerExample from './DrawerExample';
import ModalIndicatorExample from './ModalIndicatorExample';
import SwiperExample from './SwiperExample';
import TagSelectExample from './TagSelectExample';
import PanelExample from './PanelExample';
import DeckSwiperExample from './DeckSwiperExample';
import PulseLoaderExample from './PulseLoaderExample';
// import PaginationExample from './PaginationExample';
import RadioButtonExample from './RadioButtonExample';
import StepIndicatorExample from './StepIndicatorExample';
import ModalExample from './ModalExample';
import SliderExample from './SliderExample';
import AlertExample from './AlertExample';
import DialogExample from './DialogExample';
import AccordionExample from './AccordionExample';
import TimelineExample from './TimelineExample';
import GridExample from './GridExample';
import HeroExample from './HeroExample';
import ImageCardExample from './ImageCardExample';
import CardStackExample from './CardStackExample';
import PlaceholderExample from './PlaceholderExample';
import DropdownAlertExample from './DropdownAlertExample';
import RatingExample from './RatingExample';
import SwitchSelectorExample from './SwitchSelectorExample';
import HyperlinkExample from './HyperlinkExample';
import SwipeableExample from './SwipeableExample';
import FallingDrawerExample from './FallingDrawerExample';
import ProgressbarExample from './ProgressbarExample';
import FoldViewExample from './FoldViewExample';
import IntereactiveCardExample from './InteractiveCardExample';
import CardModalExample from './CardModalExample';
import AvatarExample from './AvatarExample';
import PricingCardExample from './PricingCardExample';
import ColorPickerExample from './ColorPickerExample';
import SocialIconExample from './SocialIconExample';
import MultiSelectExample from './MultiSelectExample';
import FloatingActionExample from './FloatingActionExample';
import ConfirmationCodeInputExample from './ConfirmationCodeInputExample';
import GesturePasswordExample from './GesturePasswordExample';
// import LottieExample from './LottieExample';
import AppIntroExample from './AppIntroExample';
import GridListExample from './GridListExample';
import BubbleMenuExample from './BubbleMenuExample';
import CircleMenuExample from './CircleMenuExample';
import BigSliderExample from './BigSliderExample';


export class Home extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Anteros Example'
  };

  renderPage() {
    return (
      <ScrollView style={{
        flex: 1
      }}>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Theme'
          detail=''
          contentStyle={{fontFamily: 'Roboto-Regular'}}
          onPress={() => this.navigator.push({view: <ThemeExample/>})}
          topSeparator='full'/>
        <AnterosListRow
          title='Label'
          detail=''
          contentStyle={{fontFamily: 'Roboto-Regular'}}
          onPress={() => this.navigator.push({view: <LabelExample/>})}/>
        <AnterosListRow
          title='Button'
          detail=''
          contentStyle={{fontFamily: 'Roboto-Regular'}}
          onPress={() => this.navigator.push({view: <ButtonExample/>})}/>
        <AnterosListRow
          title='Checkbox'
          detail=''
          contentStyle={{fontFamily: 'Roboto-Regular'}}
          onPress={() => this.navigator.push({view: <CheckboxExample/>})}/>
        <AnterosListRow
          title='Radio button'
          detail=''
          contentStyle={{fontFamily: 'Roboto-Regular'}}
          onPress={() => this.navigator.push({view: <RadioButtonExample/>})}/>  
        <AnterosListRow
          title='Input'
          detail=''
          contentStyle={{fontFamily: 'Roboto-Regular'}}
          onPress={() => this.navigator.push({view: <InputExample/>})}/>
        <AnterosListRow
          title='Stepper'
          detail=''
          contentStyle={{fontFamily: 'Roboto-Regular'}}
          onPress={() => this.navigator.push({view: <StepperExample/>})}/>
        <AnterosListRow
          title='SearchInput'
          detail=''
          onPress={() => this.navigator.push({view: <SearchInputExample/>})}/>
        <AnterosListRow
          title='Badge'
          detail=''
          onPress={() => this.navigator.push({view: <BadgeExample/>})}/>
        <AnterosListRow
          title='Popover'
          detail=''
          onPress={() => this.navigator.push({view: <PopoverExample/>})}/>
        <AnterosListRow
          title='SegmentedView'
          detail=''
          onPress={() => this.navigator.push({view: <SegmentedViewExample/>})}/>
        <AnterosListRow
          title='TransformView'
          detail=''
          onPress={() => this.navigator.push({view: <TransformViewExample/>})}/>
        <AnterosListRow
          title='AlbumView'
          detail=''
          onPress={() => this.navigator.push({view: <AlbumViewExample/>})}/>
        <AnterosListRow
          title='Wheel'
          detail=''
          onPress={() => this.navigator.push({view: <WheelExample/>})}/>
        <AnterosListRow
          title='Toast'
          detail=''
          onPress={() => this.navigator.push({view: <ToastExample/>})}/>
        <AnterosListRow
          title='ActionSheet'
          detail=''
          onPress={() => this.navigator.push({view: <ActionSheetExample/>})}/>
        <AnterosListRow
          title='ActionPopover'
          detail=''
          onPress={() => this.navigator.push({view: <ActionPopoverExample/>})}/>
        <AnterosListRow
          title='ModalIndicator'
          detail=''
          onPress={() => this.navigator.push({view: <ModalIndicatorExample/>})}
          bottomSeparator='full'/>
        <AnterosListRow
          title='Panel'
          detail=''
          onPress={() => this.navigator.push({view: <PanelExample/>})}
          bottomSeparator='full'/>   
        <AnterosListRow
          title='Modal'
          detail=''
          onPress={() => this.navigator.push({view: <ModalExample/>})}
          bottomSeparator='full'/>   
        <AnterosListRow
          title='Slider'
          detail=''
          onPress={() => this.navigator.push({view: <SliderExample/>})}
          bottomSeparator='full'/>  
        <AnterosListRow
          title='Alert'
          detail=''
          onPress={() => this.navigator.push({view: <AlertExample/>})}
          bottomSeparator='full'/>      
        <AnterosListRow
          title='Dialog'
          detail=''
          onPress={() => this.navigator.push({view: <DialogExample/>})}
          bottomSeparator='full'/>   
        <AnterosListRow
          title='Grid'
          detail=''
          onPress={() => this.navigator.push({view: <GridExample/>})}
          bottomSeparator='full'/>   
        <AnterosListRow
          title='Hero'
          detail=''
          onPress={() => this.navigator.push({view: <HeroExample/>})}
          bottomSeparator='full'/>  
        <AnterosListRow
          title='Image card'
          detail=''
          onPress={() => this.navigator.push({view: <ImageCardExample/>})}
          bottomSeparator='full'/>    
        <AnterosListRow
          title='Card stack'
          detail=''
          onPress={() => this.navigator.push({view: <CardStackExample/>})}
          bottomSeparator='full'/>    
        <AnterosListRow
          title='Placeholder'
          detail=''
          onPress={() => this.navigator.push({view: <PlaceholderExample/>})}
          bottomSeparator='full'/>    
        <AnterosListRow
          title='Dropdown alert'
          detail=''
          onPress={() => this.navigator.push({view: <DropdownAlertExample/>})}
          bottomSeparator='full'/> 
        <AnterosListRow
          title='Swipeable'
          detail=''
          onPress={() => this.navigator.push({view: <SwipeableExample/>})}
          bottomSeparator='full'/>   
        <AnterosListRow
          title='Falling drawer'
          detail=''
          onPress={() => this.navigator.push({view: <FallingDrawerExample/>})}
          bottomSeparator='full'/>    
        <AnterosListRow
          title='Progressbar'
          detail=''
          onPress={() => this.navigator.push({view: <ProgressbarExample/>})}
          bottomSeparator='full'/>   
        <AnterosListRow
          title='FoldView'
          detail=''
          onPress={() => this.navigator.push({view: <FoldViewExample/>})}
          bottomSeparator='full'/> 
        <AnterosListRow
          title='Interactive card'
          detail=''
          onPress={() => this.navigator.push({view: <IntereactiveCardExample/>})}
          bottomSeparator='full'/>    
        <AnterosListRow
          title='Card modal'
          detail=''
          onPress={() => this.navigator.push({view: <CardModalExample/>})}
          bottomSeparator='full'/>   
        <AnterosListRow
          title='Color picker'
          detail=''
          onPress={() => this.navigator.push({view: <ColorPickerExample/>})}
          bottomSeparator='full'/>  
        <AnterosListRow
          title='Social icon'
          detail=''
          onPress={() => this.navigator.push({view: <SocialIconExample/>})}
          bottomSeparator='full'/>
        <AnterosListRow
          title='Floating action'
          detail=''
          onPress={() => this.navigator.push({view: <FloatingActionExample/>})}
          bottomSeparator='full'/>  
        <AnterosListRow
          title='Big slider'
          detail=''
          onPress={() => this.navigator.push({view: <BigSliderExample/>})}
          bottomSeparator='full'/>   
        <View style={{
          height: AnterosTheme.screenInset.bottom
        }}/>
      </ScrollView>
    );
  }

}
