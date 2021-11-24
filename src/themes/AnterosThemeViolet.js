// ThemeViolet.js

'use strict';

import {PixelRatio} from 'react-native';

//primary color
const primaryColor = '#e64692';
//secondary color
const secondaryColor = '#bf7bfd';
//default color
const defaultColor = '#292f4f';
//default text color
const defaultTextColor = '#898d9e';

//pixel size
const pixelSize = (function() {
  let pixelRatio = PixelRatio.get();
  if (pixelRatio >= 3) return 0.333;
  else if (pixelRatio >= 2) return 0.5;
  else return 1;
})();

export const AnterosThemeViolet = {
  //General
  screenColor: '#000',
  primaryColor: primaryColor,
  secondaryColor: secondaryColor,
  defaultColor: defaultColor,
  defaultTextColor: defaultTextColor,
  pageColor: '#20253f',
  pixelSize: pixelSize,

  //AnterosLabel - color
  labelTextColor: defaultTextColor,
  labelTextTitleColor: '#afb1bd',
  labelTextDetailColor: '#5e637b',
  labelTextDangerColor: '#e34043',
  //AnterosLabel - font size
  labelFontSizeXL: 26,
  labelFontSizeLG: 20,
  labelFontSizeMD: 14,
  labelFontSizeSM: 10,
  labelFontSizeXS: 8,
  labelTitleScale: 1.1, //29, 22, 15, 11, 9
  labelDetailScale: 0.9, //23, 18, 13, 9, 7
  labelDangerScale: 1,

  //AnterosButton - background color
  btnColor: defaultColor,
  btnPrimaryColor: primaryColor,
  btnSecondaryColor: secondaryColor,
  btnDangerColor: '#e34043',
  btnLinkColor: 'rgba(0, 0, 0, 0)',
  //AnterosButton - title color
  btnTitleColor: primaryColor,
  btnPrimaryTitleColor: '#c1c2cc',
  btnSecondaryTitleColor: '#c1c2cc',
  btnDangerTitleColor: '#c1c2cc',
  btnLinkTitleColor: primaryColor,
  //AnterosButton - border color
  btnBorderColor: primaryColor,
  btnPrimaryBorderColor: primaryColor,
  btnSecondaryBorderColor: secondaryColor,
  btnDangerBorderColor: '#e34043',
  btnLinkBorderColor: 'rgba(0, 0, 0, 0)',
  //AnterosButton - border width
  btnBorderWidth: 1,
  //AnterosButton - border radius
  btnBorderRadiusXL: 6,
  btnBorderRadiusLG: 6,
  btnBorderRadiusMD: 4,
  btnBorderRadiusSM: 3,
  btnBorderRadiusXS: 3,
  //AnterosButton - font size
  btnFontSizeXL: 29,
  btnFontSizeLG: 22,
  btnFontSizeMD: 15,
  btnFontSizeSM: 11,
  btnFontSizeXS: 9,
  //AnterosButton - padding vertical
  btnPaddingVerticalXL: 8,
  btnPaddingVerticalLG: 8,
  btnPaddingVerticalMD: 6,
  btnPaddingVerticalSM: 4,
  btnPaddingVerticalXS: 2,
  //AnterosButton - padding horizontal
  btnPaddingHorizontalXL: 20,
  btnPaddingHorizontalLG: 16,
  btnPaddingHorizontalMD: 12,
  btnPaddingHorizontalSM: 8,
  btnPaddingHorizontalXS: 4,
  //AnterosButton - disabled opacity
  btnDisabledOpacity: 0.65,

  //AnterosCheckbox
  cbTitleColor: defaultTextColor,
  cbFontSizeLG: 20,
  cbFontSizeMD: 14,
  cbFontSizeSM: 10,
  cbTitlePaddingLeftLG: 8,
  cbTitlePaddingLeftMD: 6,
  cbTitlePaddingLeftSM: 4,
  cbCheckedTintColor: '#ccc',
  cbUncheckedTintColor: '#333858',
  cbIconSizeLG: 18,
  cbIconSizeMD: 13,
  cbIconSizeSM: 10,
  cbDisabledOpacity: 0.65,

  //AnterosInput
  inputColor: defaultColor,
  inputTextColor: defaultTextColor,
  inputPlaceholderTextColor: '#626683',
  inputBorderColor: '#333858',
  inputBorderWidth: 1,
  //AnterosInput - border radius
  inputBorderRadiusLG: 6,
  inputBorderRadiusMD: 4,
  inputBorderRadiusSM: 3,
  //AnterosInput - font size
  inputFontSizeLG: 18,
  inputFontSizeMD: 14,
  inputFontSizeSM: 12,
  //AnterosInput - padding vertical
  inputPaddingVerticalLG: 8,
  inputPaddingVerticalMD: 6,
  inputPaddingVerticalSM: 5,
  //AnterosInput - padding horizontal
  inputPaddingHorizontalLG: 16,
  inputPaddingHorizontalMD: 12,
  inputPaddingHorizontalSM: 10,
  //AnterosInput - height
  inputHeightLG: 46,
  inputHeightMD: 34,
  inputHeightSM: 30,
  //AnterosInput - disabled opacity
  inputDisabledOpacity: 0.65,

  //AnterosSelect
  selectColor: defaultColor,
  selectTextColor: defaultTextColor,
  selectPlaceholderTextColor: '#626683',
  selectBorderColor: '#333858',
  selectBorderWidth: 1,
  //AnterosSelect - border radius
  selectBorderRadiusLG: 6,
  selectBorderRadiusMD: 4,
  selectBorderRadiusSM: 3,
  //AnterosSelect - font size
  selectFontSizeLG: 18,
  selectFontSizeMD: 14,
  selectFontSizeSM: 12,
  //AnterosSelect - padding vertical
  selectPaddingTopLG: 8,
  selectPaddingTopMD: 6,
  selectPaddingTopSM: 5,
  selectPaddingBottomLG: 8,
  selectPaddingBottomMD: 6,
  selectPaddingBottomSM: 5,
  //AnterosSelect - padding horizontal
  selectPaddingLeftLG: 16,
  selectPaddingLeftMD: 12,
  selectPaddingLeftSM: 10,
  selectPaddingRightLG: 26, //include icon size
  selectPaddingRightMD: 20, //include icon size
  selectPaddingRightSM: 16, //include icon size
  //AnterosSelect - height
  selectHeightLG: 46,
  selectHeightMD: 34,
  selectHeightSM: 30,
  //AnterosSelect - icon
  selectIconSizeLG: 20,
  selectIconSizeMD: 15,
  selectIconSizeSM: 12,
  selectIconTintColor: '#777',
  //AnterosSelect - disabled opacity
  selectDisabledOpacity: 0.65,

  //AnterosStepper
  stepperColor: defaultColor,
  stepperBorderColor: '#333858',
  stepperBorderWidth: 1,
  stepperBorderRadius: 2,
  stepperTextColor: defaultTextColor,
  stepperFontSize: 13,
  stepperBtnTextColor: defaultTextColor,
  stepperBtnFontSize: 13,
  stepperValueMinWidth: 40,  
  stepperValuePaddingHorizontal: 8,
  stepperButtonWidth: 20,
  stepperButtonHeight: 20,
  stepperDisabledOpacity: 0.35,

  //AnterosSearchInput
  siColor: defaultColor,
  siTextColor: defaultTextColor,
  siPlaceholderTextColor: '#626683',
  siBorderColor: '#333858',
  siBorderWidth: 1,
  siBorderRadius: 3,
  siFontSize: 13,
  siPaddingVertical: 4,
  siPaddingHorizontal: 6,
  siHeight: 28,
  siIconSize: 12,
  siDisabledOpacity: 0.65,

  //AnterosBadge
  badgeSize: 18,
  badgeDotSize: 6,
  badgePadding: 5,
  badgeColor: '#d3aaf6',
  badgeBorderColor: '#f8f8f8',
  badgeBorderWidth: 0,
  badgeTextColor: '#fff',
  badgeFontSize: 11,

  //AnterosPopover
  popoverColor: defaultColor,
  popoverBorderColor: 'rgba(0, 0, 0, 0.15)',
  popoverBorderRadius: 4,
  popoverBorderWidth: pixelSize,
  popoverPaddingCorner: 8,

  //AnterosNavigationBar
  navType: 'ios', //'auto', 'ios', 'android'
  navStatusBarStyle: 'light-content', //'default', 'light-content'
  navBarContentHeight: 44,
  navColor: '#383b5d',
  navTintColor: '#a3a4b3',
  navTitleColor: '#c1c2cc',
  navTitleFontSize: 18,
  navButtonFontSize: 15,
  navSeparatorColor: '#252a46',
  navSeparatorLineWidth: pixelSize,

  //AnterosSegmentedBar
  sbColor: defaultColor,
  sbHeight: 40,
  sbBtnPaddingTop: 8,
  sbBtnPaddingBottom: 8,
  sbBtnPaddingLeft: 8,
  sbBtnPaddingRight: 8,
  sbBtnTitleColor: '#989898',
  sbBtnTextFontSize: 13,
  sbBtnActiveTitleColor: primaryColor,
  sbBtnActiveTextFontSize: 13,
  sbIndicatorLineColor: primaryColor,
  sbIndicatorLineWidth: 2,
  sbIndicatorPositionPadding: 0,

  //AnterosSegmentedView

  //AnterosTabView
  tvBarColor: '#383b5d',
  tvBarHeight: 49,
  tvBarPaddingTop: 2,
  tvBarPaddingBottom: 2,
  tvBarSeparatorWidth: 0,
  tvBarSeparatorColor: 'rgba(0, 0, 0, 0)',
  tvBarBtnWidth: 44,
  tvBarBtnIconSize: 22,
  tvBarBtnIconTintColor: '#626683',
  tvBarBtnIconActiveTintColor: '#c1c2cc',
  tvBarBtnTitleColor: '#626683',
  tvBarBtnTextFontSize: 10,
  tvBarBtnActiveTitleColor: '#c1c2cc',
  tvBarBtnActiveTextFontSize: 10,

  //AnterosListRow
  rowColor: defaultColor,
  rowMinHeight: 44,
  rowPaddingLeft: 12,
  rowPaddingRight: 12,
  rowPaddingTop: 8,
  rowPaddingBottom: 8,
  rowIconWidth: 20,
  rowIconHeight: 20,
  rowIconPaddingRight: 12,
  rowAccessoryWidth: 10,
  rowAccessoryHeight: 10,
  rowAccessoryPaddingLeft: 8,
  rowAccessoryCheckColor: '#007aff',
  rowAccessoryIndicatorColor: '#a7aab7',
  rowSeparatorColor: '#333858',
  rowSeparatorLineWidth: pixelSize,
  rowPaddingTitleDetail: 4,
  rowDetailLineHeight: 18,
  rowActionButtonColor: '#494f6f',
  rowActionButtonDangerColor: '#e34043',
  rowActionButtonTitleColor: '#fff',
  rowActionButtonDangerTitleColor: '#fff',
  rowActionButtonTitleFontSize: 15,
  rowActionButtonPaddingHorizontal: 12,

  //AnterosCarousel
  carouselDotSize: 9,
  carouselDotUseSize: 16,
  carouselDotColor: 'rgba(255, 255, 255, 0.4)',
  carouselActiveDotColor: 'rgba(255, 255, 255, 0.85)',

  //AnterosWheel
  wheelColor: defaultColor,
  wheelFontSize: 14,
  wheelTextColor: defaultTextColor,
  wheelHoleHeight: 28,
  wheelHoleLineWidth: pixelSize,
  wheelHoleLineColor: '#494d5e',
  wheelMaskColor: defaultColor,
  wheelMaskOpacity: 0.4,

  //AnterosOverlay
  overlayOpacity: 0.4,
  overlayRootScale: 0.93,

  //AnterosToast
  toastColor: 'rgba(0, 0, 0, 0.8)',
  toastPaddingLeft: 12,
  toastPaddingRight: 12,
  toastPaddingTop: 8,
  toastPaddingBottom: 8,
  toastBorderRadius: 4,
  toastIconTintColor: '#ddd',
  toastIconWidth: 40,
  toastIconHeight: 40,
  toastIconPaddingTop: 8,
  toastIconPaddingBottom: 8,
  toastTextColor: '#ddd',
  toastFontSize: 15,
  toastScreenPaddingLeft: 40,
  toastScreenPaddingRight: 40,
  toastScreenPaddingTop: 100,
  toastScreenPaddingBottom: 80,

  //AnterosActionSheet
  asItemDisabledOpacity: 0.65,
  asItemMinHeight: 53,
  asItemPaddingLeft: 12,
  asItemPaddingRight: 12,
  asItemPaddingTop: 8,
  asItemPaddingBottom: 8,
  asItemColor: 'rgba(90, 74, 124, 0.9)',
  asItemSeparatorColor: 'rgba(0, 0, 0, 0.3)',
  asItemSeparatorLineWidth: pixelSize,
  asItemTitleColor: '#c1c2cc',
  asItemTitleAlign: 'center',
  asItemFontSize: 19,
  asCancelItemColor: 'rgba(90, 74, 124, 0.9)',
  asCancelItemSeparatorColor: 'rgba(0, 0, 0, 0.3)',
  asCancelItemSeparatorLineWidth: 7,
  asCancelItemTitleColor: '#e34043',
  asCancelItemTitleAlign: 'center',
  asCancelItemFontSize: 19,

  //AnterosActionPopover
  apColor: 'rgba(90, 74, 124, 0.9)',
  apPaddingVertical: 0,
  apPaddingHorizontal: 4,
  apBorderRadius: 8,
  apDirectionInsets: 4,
  apItemTitleColor: '#c1c2cc',
  apItemFontSize: 14,
  apItemPaddingVertical: 8,
  apItemPaddingHorizontal: 12,
  apSeparatorColor: '#333858',
  apSeparatorWidth: pixelSize,  

  //AnterosPullPicker
  pupColor: '#292f4f',
  pupMaxHeight: 258,
  pupHeaderColor: 'rgba(90, 74, 124, 0.9)',
  pupHeaderPaddingLeft: 12,
  pupHeaderPaddingRight: 12,
  pupHeaderPaddingTop: 12,
  pupHeaderPaddingBottom: 12,
  pupHeaderTitleColor: '#c1c2cc',
  pupHeaderFontSize: 16,
  pupHeaderFontWeight: 'bold',
  pupHeaderSeparatorColor: '#292f4f',
  pupHeaderSeparatorHeight: 8,
  pupItemColor: 'rgba(90, 74, 124, 0.9)',
  pupSeparatorColor: '#333858',

  //AnterosPopoverPicker
  poppColor: 'rgba(90, 74, 124, 0.9)',
  poppShadowColor: '#333',
  poppMinWidth: 120,
  poppMaxWidth: 260,
  poppMinHeight: 44,
  poppMaxHeight: 246,
  poppDirectionInsets: 4,
  poppItemColor: 'rgba(0, 0, 0, 0)',
  poppItemPaddingLeft: 12,
  poppItemPaddingRight: 12,
  poppItemPaddingTop: 8,
  poppItemPaddingBottom: 8,
  poppItemTitleColor: defaultTextColor,
  poppItemFontSize: 14,
  poppItemSeparatorWidth: pixelSize,
  poppItemSeparatorColor: '#292f4f',
  poppAccessoryWidth: 10,
  poppAccessoryHeight: 10,
  poppAccessoryPaddingLeft: 8,
  poppAccessoryCheckColor: '#007aff',

  //AnterosMenu
  menuColor: 'rgba(90, 74, 124, 0.9)',
  menuShadowColor: '#333',
  menuDirectionInsets: 4,
  menuItemColor: 'rgba(0, 0, 0, 0)',
  menuItemPaddingLeft: 16,
  menuItemPaddingRight: 16,
  menuItemPaddingTop: 12,
  menuItemPaddingBottom: 12,
  menuItemTitleColor: '#c1c2cc',
  menuItemFontSize: 14,
  menuItemSeparatorWidth: pixelSize,
  menuItemSeparatorColor: '#292f4f',
  menuItemIconWidth: 16,
  menuItemIconHeight: 16,
  menuItemIconColor: '#c1c2cc',
  menuItemIconPaddingRight: 12,

  //AnterosModalIndicator
  miIndicatorColor: '#c1c2cc',
  miTextColor: '#c1c2cc',
  miFontSize: 15,
  miTextPaddingTop: 12,
  miScreenPaddingLeft: 40,
  miScreenPaddingRight: 40,
  miScreenPaddingTop: 100,
  miScreenPaddingBottom: 80,

  //AnterosNavigationPage
  backButtonTitle: 'Back',

  //AnterosSwiper
  swiperContainer: {
    backgroundColor: 'transparent',
    position: 'relative',
    flex: 1
  },

  swiperWrapperIOS: {
    backgroundColor: 'transparent',
  },

  swiperWrapperAndroid: {
    backgroundColor: 'transparent',
    flex: 1
  },

  swiperSlide: {
    backgroundColor: 'transparent',
  },

  swiperPagination_x: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },

  swiperPagination_y: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },

  swiperTitle: {
    height: 30,
    justifyContent: 'center',
    position: 'absolute',
    paddingLeft: 10,
    bottom: -30,
    left: 0,
    flexWrap: 'nowrap',
    width: 250,
    backgroundColor: 'transparent'
  },

  swiperButtonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  swiperButtonText: {
    fontSize: 50,
    color: '#007aff'
  },

  masonryCcontainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%'
  },
  
  masonryColumn: {
    flexDirection: 'column'
  }

};

