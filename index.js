import {NativeModules} from 'react-native';
const {RNAnterosReactNative} = NativeModules;

'use strict';

import AnterosButton from './src/components/Button/AnterosButton'
import AnterosTheme from './src/themes/AnterosTheme';
import AnterosLabel from './src/components/Label/AnterosLabel';
import {AnterosCheckbox} from './src/components/Checkbox/AnterosCheckbox';
import AnterosInput from './src/components/Input/AnterosInput';
import AnterosSelect from './src/components/Select/AnterosSelect';
import AnterosStepper from './src/components/Stepper/AnterosStepper';
import AnterosSearchInput from './src/components/SearchInput/AnterosSearchInput';
import AnterosBadge from './src/components/Badge/AnterosBadge';
import AnterosPopover from './src/components/Popover/AnterosPopover';

import AnterosNavigationBar from './src/components/NavigationBar/AnterosNavigationBar';
import AnterosListRow from './src/components/ListRow/AnterosListRow';
import AnterosCarousel from './src/components/Carousel/AnterosCarousel';
import AnterosProjector from './src/components/Projector/AnterosProjector';
import AnterosSegmentedBar from './src/components/SegmentedBar/AnterosSegmentedBar';
import AnterosSegmentedView from './src/components/SegmentedView/AnterosSegmentedView';
import AnterosTransformView from './src/components/TransformView/AnterosTransformView';
import AnterosAlbumView from './src/components/AlbumView/AnterosAlbumView';
import AnterosWheel from './src/components/Wheel/AnterosWheel';

import AnterosOverlay from './src/components/Overlay/AnterosOverlay';
import AnterosToast from './src/components/Toast/AnterosToast';
import AnterosActionSheet from './src/components/ActionSheet/AnterosActionSheet';
import AnterosActionPopover from './src/components/ActionPopover/AnterosActionPopover';
import AnterosPullPicker from './src/components/PullPicker/AnterosPullPicker';
import AnterosPopoverPicker from './src/components/PopoverPicker/AnterosPopoverPicker';
import AnterosMenu from './src/components/Menu/AnterosMenu';
import AnterosDrawer from './src/components/Drawer/AnterosDrawer';
import AnterosModalIndicator from './src/components/ModalIndicator/AnterosModalIndicator';

import AnterosNavigator from './src/components/Navigator/AnterosNavigator';
import AnterosBasePage from './src/components/BasePage/AnterosBasePage';
import AnterosNavigationPage from './src/components/NavigationPage/AnterosNavigationPage';
import {AnterosKeyboardSpace} from './src/components/KeyboardSpace/AnterosKeyboardSpace';
import AnterosSwiper from './src/components/Swiper/AnterosSwiper';
import AnterosMasonry from './src/components/Masonry/AnterosMasonry';
import AnterosMasonryColumn from './src/components/Masonry/AnterosMasonryColumn';
import AnterosMasonryBrick from './src/components/Masonry/AnterosMasonryBrick';
import {AnterosMasonryList} from './src/components/Masonry/AnterosMasonryList';
import {AnterosText, normalize, fonts} from './src/components/Text/AnterosText';
import {AnterosTextArea} from './src/components/Text/AnterosTextArea';
import {scale, scaleVertical, scaleModerate} from './src/utils/AnterosUtils';

import {AnterosAccordion} from './src/components/Accordion/AnterosAccordion';
import {AnterosAlert} from './src/components/Alert/AnterosAlert';
import {AnterosDropdownAlert} from './src/components/Alert/AnterosDropdownAlert';
import {AnterosFlashMessage, showMessage, hideMessage} from './src/components/Alert/AnterosFlashMessage';
import {AnterosNotifyPanel} from './src/components/Alert/AnterosNotifyPanel';
import {AnterosAppIntro} from './src/components/AppIntro/AnterosAppIntro';
import {AnterosConfirmationCodeInput} from './src/components/Authentication/AnterosConfirmationCodeInput';
import {AnterosFingerprint} from './src/components/Authentication/AnterosFingerprint';
import {AnterosGesturePassword} from './src/components/Authentication/AnterosGesturePassword';
import {AnterosLogin} from './src/components/Authentication/AnterosLogin';
import {AnterosAvatar} from './src/components/Avatar/AnterosAvatar';
import {AnterosFacePile} from './src/components/Avatar/AnterosFacePile';
import {AnterosBreadCrumb} from './src/components/BreadCrumb/AnterosBreadCrumb';
import {AnterosButtonGroup} from './src/components/Button/AnterosButtonGroup';
import {AnterosFloatingAction} from './src/components/Button/AnterosFloatingAction';
import {AnterosRadioButton} from './src/components/Button/AnterosRadioButton';
import {AnterosMiniCalendar} from './src/components/Calendar/AnterosMiniCalendar';
import {AnterosTimeAgo} from './src/components/Calendar/AnterosTimeAgo';
import {AnterosMonthSelector} from './src/components/Calendar/AnterosMonthSelector';
import {AnterosCalendarPeriod} from './src/components/Calendar/AnterosCalendarPeriod';
import {AnterosCalendarStrip} from './src/components/Calendar/AnterosCalendarStrip';
import {AnterosDateHistoryPicker} from './src/components/Calendar/AnterosDateHistoryPicker';
import AnterosCalendar from './src/components/Calendar/calendar/AnterosCalendar';
import AnterosAgenda from './src/components/Calendar/agenda/AnterosAgenda';
import AnterosCalendarList from './src/components/Calendar/calendar-list/AnterosCalendarList';
import {AnterosCameraRollPicker} from './src/components/Camera/AnterosCameraRollPicker';
import {AnterosCard, AnterosCardSection} from './src/components/Card/AnterosCard';
import {AnterosCardList} from './src/components/Card/AnterosCardList';
import {AnterosCardModal} from './src/components/Card/AnterosCardModal';
import {AnterosCardStack} from './src/components/Card/AnterosCardStack';
import {AnterosCreditCard} from './src/components/Card/AnterosCreditCard';
import {AnterosDeckSwiper} from './src/components/Card/AnterosDeckSwiper';
import {AnterosDigitalMagazine} from './src/components/Card/AnterosDigitalMagazine';
import {AnterosElasticStack} from './src/components/Card/AnterosElasticStack';
import {AnterosFlipCard} from './src/components/Card/AnterosFlipCard';
import {AnterosFoldView} from './src/components/Card/AnterosFoldView';
import {AnterosHero} from './src/components/Card/AnterosHero';
import {AnterosInteractiveCard, Header, Footer, Content} from './src/components/Card/AnterosInteractiveCard';
import {AnterosPricingCard} from './src/components/Card/AnterosPricingCard';

import {AnterosAdvancedCarousel,scrollInterpolators,animatedStyles} from './src/components/Carousel/AnterosAdvancedCarousel';
import {polarToCartesian,    makeArc,    interpolateColors,    interpolateColorsFixedAlpha,    lightenColor,
     saturateColor,    hueshiftColor,    tintColor,    shadeColor,    complement,    computeSplineControlPoints,
     makeCircle,    makeSpline,    getMinMaxValues,    getMinMaxValuesXY,    getMinMaxValuesCandlestick,    getMinMaxValuesRange,
     computeChartSum,    findRectangleIndexContainingPoint,    findClosestPointIndexWithinRadius,    makeBarsChartPath,    makeAreaChartPath,
     makeLineChartPath,    makeSplineChartPath,    makeCandlestickChart,    makeAreaRangeChartPath,    makeLineStepChartPath,
     makeStackedBarsChartPath,    makeBars3DChartPath,    getMaxSumStack,    getMaxSumBars3d,
     AnterosChart
 } from './src/components/Chart/AnterosChart';

import {AnterosGiftedChat,    AnterosActionsChat,    AnterosAvatarChat,    AnterosBubbleChat,    AnterosSystemMessage,
     AnterosMessageImage,    AnterosMessageText,    AnterosComposerChat,    AnterosDayChat,    AnterosInputToolbar,
     AnterosLoadEarlier,    AnterosMessage,    AnterosMessageContainer,    AnterosSendChat,    AnterosTimeChat,
     AnterosGiftedAvatar,    AnterosUtilsChat} from './src/components/Chat/AnterosGiftedChat';

import {AnterosAnalogClock} from './src/components/Clock/AnterosAnalogClock';
import {AnterosClockTimePicker} from './src/components/Clock/AnterosClockTimePicker';
import {AnterosCollapsible} from './src/components/Collapsible/AnterosCollapsible';
import {AnterosColorPicker, AnterosFullStatusColorPicker, AnterosStatusColorPicker} from './src/components/Color/AnterosColorPicker';
import {AnterosColorGradient} from './src/components/Color/AnterosColorGradient';
import {AnterosColorGradientSlider} from './src/components/Color/AnterosColorGradientSlider';
import {AnterosColorHueGradient} from './src/components/Color/AnterosColorHueGradient';
import {AnterosColorLightnessGradient} from './src/components/Color/AnterosColorLightnessGradient';
import {AnterosColorLightnessSlider} from './src/components/Color/AnterosColorLightnessSlider';
import {AnterosColorPickerSliders} from './src/components/Color/AnterosColorPickerSliders';
import {AnterosColorSaturationGradient} from './src/components/Color/AnterosColorSaturationGradient';
import {AnterosColorSaturationSlider} from './src/components/Color/AnterosColorSaturationSlider';
import {AnterosHoloColorPicker} from './src/components/Color/AnterosHoloColorPicker';

import {AnterosTriangleColorPicker} from './src/components/Color/AnterosTriangleColorPicker';
import {AnterosComment, AnterosComments} from './src/components/Comments/AnterosComments';
import {AnterosCountdown} from './src/components/Countdown/AnterosCountdown';
import {AnterosBounceable} from './src/components/Effects/AnterosBounceable';
import {AnterosZoomable} from './src/components/Effects/AnterosZoomable';
import {AnterosEmoticons} from './src/components/Emoticon/AnterosEmoticons';
import {AnterosForm, AnterosKeyboardAwareScrollView} from './src/components/Form/AnterosForm';
import {AnterosAnimatedProgressbar} from './src/components/Gauge/AnterosAnimatedProgressbar';
import {AnterosCircularProgress} from './src/components/Gauge/AnterosCircularProgress';
import {AnterosDial} from './src/components/Gauge/AnterosDial';
import {AnterosGauge} from './src/components/Gauge/AnterosGauge';

import {AnterosPercentageCircle} from './src/components/Gauge/AnterosPercentageCircle';
import {AnterosProgressBar} from './src/components/Gauge/AnterosProgressBar';
import {AnterosProgressCircle} from './src/components/Gauge/AnterosProgressCircle';
import {AnterosGrid} from './src/components/Grid/AnterosGrid';
import {AnterosGridList} from './src/components/Grid/AnterosGridList';
import {AnterosIcon} from './src/components/Icon/AnterosIcon';
import {AnterosImage} from './src/components/Image/AnterosImage';
import {AnterosImageCard} from './src/components/Image/AnterosImageCard';
import {AnterosImageCrop} from './src/components/Image/AnterosImageCrop';

import {AnterosImageHeaderScrollView} from './src/components/Image/AnterosImageHeaderScrollView';
import {AnterosImageList} from './src/components/Image/AnterosImageList';
import {AnterosImageOverlay} from './src/components/Image/AnterosImageOverlay';
//import {AnterosImagePickerDialog} from './src/components/Image/AnterosImagePickerDialog';
import {AnterosImageResponsive} from './src/components/Image/AnterosImageResponsive';
import {AnterosImageSlider} from './src/components/Image/AnterosImageSlider';
import {AnterosImageSVG} from './src/components/Image/AnterosImageSVG';
import {AnterosImageViewer} from './src/components/Image/AnterosImageViewer';

import {AnterosLightbox} from './src/components/Image/AnterosLightbox';
import {AnterosParallaxImage} from './src/components/Image/AnterosParallaxImage';
import {AnterosThumbnailSelector} from './src/components/Image/AnterosThumbnailSelector';
//import {AnterosAutoComplete} from './src/components/Input/AnterosAutoComplete';
import {AnterosInputSearchText} from './src/components/Input/AnterosInputSearchText';
import {AnterosSearchBox} from './src/components/Input/AnterosSearchBox';
import {AnterosHyperlink} from './src/components/Label/AnterosHyperlink';
import {AnterosOnLayoutWindow} from './src/components/Layout/AnterosOnLayoutWindow';

import {AnterosContainer,AnterosContent,AnterosSection,AnterosBlock, AnterosLayout, 
     AnterosLayoutGrid, AnterosLayoutRow, AnterosLayoutColumn, AnterosScreenInfo} from './src/components/Layout/AnterosLayout';
import {AnterosAtoZList} from './src/components/List/AnterosAtoZList';
import {AnterosListView} from './src/components/List/AnterosListView';
import {AnterosSettingsList} from './src/components/List/AnterosSettingsList';
import {AnterosSortableList} from './src/components/List/AnterosSortableList';
import {AnterosBouncingPreloader} from './src/components/Loader/AnterosBouncingPreloader';
import {AnterosContentLoader} from './src/components/Loader/AnterosContentLoader';
import {AnterosLoader} from './src/components/Loader/AnterosLoader';

import {AnterosLoaderMask} from './src/components/Loader/AnterosLoaderMask';
import AnterosPulseLoader from './src/components/Loader/AnterosPulseLoader';
import {AnterosBubbleMenu} from './src/components/Menu/AnterosBubbleMenu';
import {AnterosCircleMenu} from './src/components/Menu/AnterosCircleMenu';
import {AnterosCircularActionMenu} from './src/components/Menu/AnterosCircularActionMenu';
import {AnterosFallingDrawer} from './src/components/Menu/AnterosFallingDrawer';
import {AnterosModal} from './src/components/Modal/AnterosModal';

import {slideInDown ,slideInUp,slideInLeft,slideInRight,slideOutDown ,slideOutUp,slideOutLeft,slideOutRight } from './src/components/Modal/AnterosModalAnimations';
import {AnterosModalWalkThrough} from './src/components/Modal/AnterosModalWalkThrough';
import {AnterosPage} from './src/components/Page/AnterosPage';
import {AnterosPagerDotIndicator} from './src/components/Page/AnterosPagerDotIndicator';
import {AnterosPagerTabIndicator} from './src/components/Page/AnterosPagerTabIndicator';
import {AnterosPagerTitleIndicator} from './src/components/Page/AnterosPagerTitleIndicator';
import {AnterosPagerView} from './src/components/Page/AnterosPagerView';
import {AnterosPagerViewIndicator} from './src/components/Page/AnterosPagerViewIndicator';

import {AnterosPagination} from './src/components/Pagination/AnterosPagination';
import {AnterosPanel} from './src/components/Panel/AnterosPanel';
import {AnterosParallaxKeyboardAwareScrollView} from './src/components/Parallax/AnterosParallaxKeyboardAwareScrollView';
import {AnterosParallaxView} from './src/components/Parallax/AnterosParallaxView';
import {AnterosPlaceHolder} from './src/components/PlaceHolder/AnterosPlaceholder';
import {AnterosQRCode} from './src/components/QRCode/AnterosQRCode';
import {AnterosAirbnbRating} from './src/components/Rating/AnterosAirbnbRating';
import {AnterosGrading, AnterosGradingModal} from './src/components/Rating/AnterosGrading';

import {AnterosStar} from './src/components/Rating/AnterosStar';
import {AnterosRating} from './src/components/Rating/AnterosRating';
import {AnterosAnimatedRefresh} from './src/components/Refresh/AnterosAnimatedRefresh';
import {AnterosRipple} from './src/components/Ripple/AnterosRipple';
import {AnterosInfiniteScrollView} from './src/components/ScrollView/AnterosInfiniteScrollView';
import {AnterosInvertibleScrollView} from './src/components/ScrollView/AnterosInvertibleScrollView';

import {AnterosKeyboardScrollView} from './src/components/ScrollView/AnterosKeyboardScrollView';
import {AnterosSegmentedControl, AnterosSegmentedControlItem} from './src/components/SegmentedControl/AnterosSegmentedControl';
import {AnterosLabelSelect} from './src/components/Select/AnterosLabelSelect';
import {AnterosMultiSelect} from './src/components/Select/AnterosMultiSelect';
import {AnterosSwitchSelector} from './src/components/Select/AnterosSwitchSelector';
import {AnterosDivider} from './src/components/Separator/AnterosDivider';
import {AnterosSeparator} from './src/components/Separator/AnterosSeparator';
import {AnterosSpacer} from './src/components/Separator/AnterosSpacer';

import {AnterosBigSlider} from './src/components/Slider/AnterosBigSlider';
import {AnterosCircularSlider} from './src/components/Slider/AnterosCircularSlider';
import {AnterosSlider} from './src/components/Slider/AnterosSlider';
import {AnterosMultiSlider} from './src/components/Slider/AnterosMultiSlider';
import {AnterosSocialBar} from './src/components/Social/AnterosSocialBar';
import {AnterosSocialIcon} from './src/components/Social/AnterosSocialIcon';
import {AnterosSideSwipe} from './src/components/Swiper/AnterosSideSwipe';
import {AnterosSwipeable} from './src/components/Swiper/AnterosSwipeable';

import {AnterosSwipeListView,AnterosSwipeRow} from './src/components/Swiper/AnterosSwipeListView';
import {AnterosScrollableTabBar, AnterosScrollableDefaultTabBar} from './src/components/TabView/AnterosScrollableTabBar';
import {AnterosScrollableTabView, AnterosScrollableTab} from './src/components/TabView/AnterosScrollableTabView';
import {AnterosTabButton} from './src/components/TabView/AnterosTabButton';
import {AnterosTabSheet} from './src/components/TabView/AnterosTabSheet';
import AnterosTabView from './src/components/TabView/AnterosTabView';
//import {AnterosTagAutoComplete} from './src/components/Tags/AnterosTagAutoComplete';
import {AnterosTags} from './src/components/Tags/AnterosTags';
import {AnterosTagSelect} from './src/components/Tags/AnterosTagSelect';

import {AnterosParsedText} from './src/components/Text/AnterosParsedText';
import {isIphoneX,ifIphoneX,getStatusBarHeight} from './src/components/Utils/AnterosHelper';
import {cloneReferencedElement, formatDateTime} from './src/components/Utils/AnterosUtils';
import {AnterosView} from './src/components/View/AnterosView';
import {AnterosWallpaper} from './src/components/Wallpaper/AnterosWallpaper';
import {AnterosDialog, AnterosMultiPickerDialog, AnterosSinglePickerDialog} from './src/components/Dialog/AnterosDialog';
import { SizeInfo, withSizeInfo, withSizeClass } from './src/components/Layout/AnterosLayout';

import { GridDimensions, withGridDimensions, withContainerDimensions } from './src/components/Layout/AnterosLayout';
import { calculateStretchLength, warn, checkInsideGrid} from './src/components/Layout/AnterosLayout';
import {AnterosClockSlider} from './src/components/Clock/AnterosClockSlider';
import {AnterosHistogram} from './src/components/Chart/AnterosHistogram';
import {AnterosTimeline} from './src/components/Calendar/AnterosTimeline';
import AnterosStepIndicator from './src/components/StepIndicator/AnterosStepIndicator';
import {AnterosWeekView} from './src/components/Calendar/AnterosWeekView';
import {AnterosColorHueSlider} from './src/components/Color/AnterosColorHueSlider';
import AnterosDateTimePicker from './src/components/Calendar/AnterosDateTimePicker';
import {AnterosDraggableView} from './src/components/View/AnterosDraggableView';
import {AnterosPanDrawer} from './src/components/Drawer/AnterosPanDrawer';
import {AnterosScallingDrawer} from './src/components/Drawer/AnterosScalingDrawer';


var AnterosSet = {
    AnterosTheme,

    AnterosLabel,
    AnterosButton,
    AnterosCheckbox,
    AnterosInput,
    AnterosSelect,
    AnterosStepper,
    AnterosSearchInput,
    AnterosBadge,
    AnterosPopover,

    AnterosNavigationBar,
    AnterosListRow,
    AnterosCarousel,
    AnterosProjector,
    AnterosSegmentedBar,
    AnterosSegmentedView,
    AnterosTabView,
    AnterosTransformView,
    AnterosAlbumView,
    AnterosWheel,

    AnterosOverlay,
    AnterosToast,
    AnterosActionSheet,
    AnterosActionPopover,
    AnterosPullPicker,
    AnterosPopoverPicker,
    AnterosMenu,
    AnterosDrawer,
    AnterosModalIndicator,

    AnterosNavigator,
    AnterosBasePage,
    AnterosNavigationPage,
    AnterosKeyboardSpace,

    AnterosMasonry,
    AnterosMasonryColumn,
    AnterosMasonryBrick,
    AnterosMasonryList,
    AnterosText, normalize, fonts,
    AnterosTextArea,
    scale, scaleVertical, scaleModerate,
    AnterosAccordion,
    AnterosAlert,
    AnterosDropdownAlert,
    AnterosFlashMessage,
    showMessage,
    hideMessage,
    AnterosNotifyPanel,
    AnterosAppIntro,
    AnterosConfirmationCodeInput,
    AnterosFingerprint,
    AnterosGesturePassword,
    AnterosLogin,
    AnterosAvatar,
    AnterosFacePile,
    AnterosBreadCrumb,
    AnterosRadioButton,
    AnterosButtonGroup,
    AnterosFloatingAction,
    AnterosTimeAgo,
    AnterosMonthSelector,
    AnterosCalendarPeriod,
    AnterosCalendarStrip,
    AnterosCalendar,
    AnterosAgenda,
    AnterosDateHistoryPicker,
    AnterosCard,
    AnterosCardSection,
    AnterosCardList,
    AnterosCardModal,
    AnterosCardStack,
    AnterosCreditCard,
    AnterosDeckSwiper,
    AnterosDigitalMagazine,
    AnterosElasticStack,
    AnterosFlipCard,
    AnterosFoldView,
    AnterosHero,
    AnterosInteractiveCard,Header, Footer, Content,
    AnterosPricingCard,
    AnterosAdvancedCarousel,
    polarToCartesian,
    makeArc,
    interpolateColors,
    interpolateColorsFixedAlpha,
    lightenColor,
    saturateColor,
    hueshiftColor,
    tintColor,
    shadeColor,
    complement,
    computeSplineControlPoints,
    makeCircle,
    makeSpline,
    getMinMaxValues,
    getMinMaxValuesXY,
    getMinMaxValuesCandlestick,
    getMinMaxValuesRange,
    computeChartSum,
    findRectangleIndexContainingPoint,
    findClosestPointIndexWithinRadius,
    makeBarsChartPath,
    makeAreaChartPath,
    makeLineChartPath,
    makeSplineChartPath,
    makeCandlestickChart,
    makeAreaRangeChartPath,
    makeLineStepChartPath,
    makeStackedBarsChartPath,
    makeBars3DChartPath,
    getMaxSumStack,
    getMaxSumBars3d, 
    AnterosChart,
    AnterosGiftedChat,
    AnterosActionsChat,
    AnterosAvatarChat,
    AnterosBubbleChat,
    AnterosSystemMessage,
    AnterosMessageImage,
    AnterosMessageText,
    AnterosComposerChat,
    AnterosDayChat,
    AnterosInputToolbar,
    AnterosLoadEarlier,
    AnterosMessage,
    AnterosMessageContainer,
    AnterosSendChat,
    AnterosTimeChat,
    AnterosGiftedAvatar,
    AnterosUtilsChat,
    AnterosAnalogClock,
    AnterosClockTimePicker,
    AnterosColorGradient,
    AnterosColorHueGradient,
    AnterosColorLightnessGradient,
    AnterosColorLightnessSlider,
    AnterosColorPickerSliders,
    AnterosColorSaturationGradient,
    AnterosColorSaturationSlider,
    AnterosColorPicker,
    AnterosStatusColorPicker,
    AnterosFullStatusColorPicker,
    AnterosHoloColorPicker,
    AnterosTriangleColorPicker,
    AnterosComment, AnterosComments,
    AnterosCountdown, AnterosBounceable,
    AnterosZoomable,
    AnterosEmoticons,
    //AnterosForm, AnterosKeyboardAwareScrollView,
    AnterosAnimatedProgressbar,
    AnterosCircularProgress,
    AnterosDial,
    AnterosGauge,
    AnterosPercentageCircle,
    AnterosProgressBar,
    AnterosProgressCircle,
    AnterosGrid,
    AnterosGridList,
    AnterosIcon,
    AnterosImage,
    AnterosImageCard,
    AnterosImageCrop,
    AnterosImageHeaderScrollView,
    AnterosImageList,
    AnterosImageOverlay,
    AnterosImageResponsive,
    AnterosImageSlider,
    AnterosImageSVG,
    AnterosImageViewer,
    AnterosLightbox,
    AnterosParallaxImage,
    AnterosThumbnailSelector,
    //AnterosAutoComplete,
    AnterosInputSearchText,
    AnterosSearchBox,
    //AnterosHyperlink,
    AnterosOnLayoutWindow,
    AnterosContainer,AnterosContent,AnterosSection,AnterosBlock,
    AnterosAtoZList,
    AnterosListView,
    AnterosSettingsList,
    AnterosSortableList,
    AnterosBouncingPreloader,
    AnterosContentLoader,
    AnterosLoader,
    AnterosLoaderMask,
    AnterosPulseLoader,
    AnterosBubbleMenu,
    AnterosCircleMenu,
    AnterosCircularActionMenu,
    AnterosFallingDrawer,
    AnterosModal,
    slideInDown ,slideInUp,slideInLeft,slideInRight,slideOutDown ,slideOutUp,slideOutLeft,slideOutRight,
    AnterosModalWalkThrough,
    AnterosPage,
    AnterosPagerDotIndicator,
    AnterosPagerTabIndicator,
    AnterosPagerTitleIndicator,
    AnterosPagerView,
    AnterosPagerViewIndicator,
    AnterosPagination,
    AnterosPanel,
    AnterosParallaxKeyboardAwareScrollView,
    AnterosParallaxView,
    AnterosPlaceHolder,
    AnterosQRCode,
    AnterosAirbnbRating,
    AnterosGrading,
    AnterosRating,
    AnterosStar,
    AnterosAnimatedRefresh,
    AnterosRipple,
    //AnterosInfiniteScrollView,
    AnterosInvertibleScrollView,
    AnterosKeyboardScrollView,
    AnterosSegmentedControl, AnterosSegmentedControlItem,
    AnterosLabelSelect,
    AnterosMultiSelect,
    AnterosSwitchSelector,
    AnterosDivider,
    AnterosSeparator,
    AnterosSpacer,
    AnterosBigSlider,
    AnterosCircularSlider,
    AnterosSlider,
    AnterosMultiSlider,
    AnterosSocialBar,
    AnterosSocialIcon,
    AnterosSideSwipe,
    AnterosSwipeable,
    AnterosSwipeListView,
    AnterosSwipeRow,
    AnterosSwiper,
    AnterosScrollableTabBar,
    AnterosScrollableTabView,
    AnterosScrollableTab,
    AnterosTabButton,
    AnterosTabSheet,
    //AnterosTagAutoComplete,
    AnterosTags,
    AnterosTagSelect,
    AnterosParsedText,
    AnterosParsedText,
    isIphoneX,ifIphoneX,getStatusBarHeight,
    cloneReferencedElement, formatDateTime,
    AnterosView,
    AnterosWallpaper,
    SizeInfo, withSizeInfo, withSizeClass,
    GridDimensions, withGridDimensions, withContainerDimensions,
    calculateStretchLength, warn, checkInsideGrid,
    AnterosCalendarList,
    AnterosMiniCalendar,
    AnterosClockSlider,
    AnterosHistogram,
    //AnterosImagePickerDialog,
    AnterosCameraRollPicker,
    AnterosTimeline,
    scrollInterpolators, animatedStyles,
    AnterosStepIndicator,
    AnterosCollapsible,
    AnterosScrollableDefaultTabBar,
    AnterosDialog, AnterosMultiPickerDialog, AnterosSinglePickerDialog,
    AnterosWeekView,
    AnterosColorHueSlider,
    AnterosDateTimePicker,
    AnterosDraggableView,
    AnterosPanDrawer,
    AnterosScallingDrawer,
    AnterosLayout, AnterosLayoutGrid, AnterosLayoutRow, 
    AnterosLayoutColumn, AnterosScreenInfo,

    AnterosColorGradientSlider,
    AnterosGradingModal,

}

module.exports = AnterosSet;

export default RNAnterosReactNative;