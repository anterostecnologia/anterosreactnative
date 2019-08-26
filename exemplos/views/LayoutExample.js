import React, { Component, PureComponent } from "react";
import {
  StyleSheet,
  FlatList,
  Alert,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Actions,
  SafeAreaView,
  Platform,
  ImageBackground,
  ViewPropTypes,
  Animated,
  StatusBar,
  Easing,
  Image,
  TextInput,
  Dimensions,
  View
} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import {
  AnterosButton,
  AnterosSwiper,
  AnterosNavigationPage,
  AnterosActionSheet,
  AnterosImage,
  AnterosCarousel,
  AnterosPullPicker,
  AnterosLabel,
  AnterosListRow,
  AnterosText,
  AnterosParallaxImage,
  scrollInterpolators,
  animatedStyles,
  AnterosAdvancedCarousel,
  AnterosContainer,
  AnterosContent,
  AnterosSection,
  AnterosBlock,
  SizeInfo,
  withSizeInfo,
  GridDimensions,
  withGridDimensions,
  calculateStretchLength,
  AnterosPage,
  AnterosLayoutColumn,
  AnterosLayoutRow,
  AnterosLayoutGrid,
  AnterosScreenInfo,
  AnterosLayout,
  AnterosIcon
} from "anteros-react-native";

import faker from 'faker';
import LinearGradient from "react-native-linear-gradient";
import ProjectorExample from "./ProjectorExample";
import SegmentedBarExample from "./SegmentedBarExample";
import SegmentedViewExample from "./SegmentedViewExample";
import TabViewExample from "./TabViewExample";
import SwiperExample from "./SwiperExample";
import DeckSwiperExample from "./DeckSwiperExample";
import StepIndicatorExample from "./StepIndicatorExample";
import AccordionExample from "./AccordionExample";
import ParallaxViewExample from "./ParallaxViewExample";
import SwipeableExample from "./SwipeableExample";
import ScrollableTabViewExample from "./ScrollableTabViewExample";
import ElasticStackExample from "./ElasticStackExample";
import DraggableViewExample from "./DraggableViewExample";

import { Container, Header, Title, Content, Button, Icon, Left, Body, Text as NText, Right } from "native-base";

const timer = require("react-native-timer");

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;

const IS_IOS = Platform.OS === "ios";
const IS_ANDROID = Platform.OS === "android";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);
const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;
const entryBorderRadius = 8;

export default class LayoutExample extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Layout and containers",
    showBackButton: true
  };
  constructor(props) {
    super(props);
    this.layout1 = this.layout1.bind(this);
    this.layout2 = this.layout2.bind(this);
    this.layout3 = this.layout3.bind(this);
    this.layout4 = this.layout4.bind(this);
    this.layout5 = this.layout5.bind(this);
    this.layout6 = this.layout6.bind(this);
    this.layout7 = this.layout7.bind(this);
    this.layout8 = this.layout8.bind(this);
    this.layout9 = this.layout9.bind(this);
    this.layout10 = this.layout10.bind(this);
    this.layout11 = this.layout11.bind(this);
    this.layout12 = this.layout12.bind(this);
    this.layout13 = this.layout13.bind(this);
    this.layout14 = this.layout14.bind(this);
    this.layout15 = this.layout15.bind(this);
    this.layout16 = this.layout16.bind(this);
    this.layout17 = this.layout17.bind(this);
    this.layout18 = this.layout18.bind(this);
  }

  renderRow = highlighted => {
    if (Platform.OS !== "android") {
      return (
        <View
          style={[
            {
              backgroundColor: "#f0f0f0",
              height: 1
            },
            highlighted && {
              marginLeft: 0
            }
          ]}
        />
      );
    }

    return null;
  };

  layout1() {
    this.navigator.push({ view: <CarouselBasicExample /> });
  }

  layout2() {
    this.navigator.push({ view: <CarouselAdvancedExample /> });
  }
  layout3() {
    this.navigator.push({ view: <ProjectorExample /> });
  }
  layout4() {
    this.navigator.push({ view: <SegmentedBarExample /> });
  }
  layout5() {
    this.navigator.push({ view: <SegmentedViewExample /> });
  }
  layout6() {
    this.navigator.push({ view: <TabViewExample /> });
  }
  layout7() {
    this.navigator.push({ view: <SwiperExample /> });
  }
  layout8() {
    this.navigator.push({ view: <DeckSwiperExample /> });
  }
  layout9() {
    this.navigator.push({ view: <StepIndicatorExample /> });
  }

  layout10() {
    this.navigator.push({ view: <AccordionExample /> });
  }

  layout11() {
    this.navigator.push({ view: <PageExample /> });
  }
  layout12() {
    // this.navigator.push({ view: <ParallaxViewExample /> });
  }
  layout13() {
    this.navigator.push({ view: <LayoutExampleMenu /> });
  }
  layout14() {
    this.navigator.push({ view: <SwipeableExample /> });
  }

  layout15() {
    // this.navigator.push({ view: <ScrollableTabViewExample /> });
  }

  layout16() {
    this.navigator.push({ view: <ElasticStackExample /> });
  }

  layout17() {
    this.navigator.push({ view: <DraggableViewExample /> });
  }

  layout18() {
    this.navigator.push({ view: <LayoutGridExampleMenu /> });
  }

  renderPage() {
    return (
      <ScrollView
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            height: 20
          }}
        />
        <AnterosListRow
          title="Grid Layout"
          onPress={this.layout18}
          topSeparator="full"
        />
        <AnterosListRow
          title="Layout responsive"
          onPress={this.layout13}
          topSeparator="full"
        />
        <AnterosListRow
          title="Carousel basic"
          onPress={this.layout1}
          topSeparator="full"
        />
        <AnterosListRow
          title="Carousel advanced"
          onPress={this.layout2}
          topSeparator="full"
        />
        <AnterosListRow
          title="Projector"
          onPress={this.layout3}
          topSeparator="full"
        />
        <AnterosListRow
          title="Segmented bar"
          onPress={this.layout4}
          topSeparator="full"
        />
        <AnterosListRow
          title="Segmented view"
          onPress={this.layout5}
          topSeparator="full"
        />
        <AnterosListRow
          title="Tab view"
          onPress={this.layout6}
          topSeparator="full"
        />
        <AnterosListRow
          title="Scrollable Tab view"
          onPress={this.layout15}
          topSeparator="full"
        />
        <AnterosListRow
          title="Swiper"
          onPress={this.layout7}
          topSeparator="full"
        />
        <AnterosListRow
          title="Deck Swiper"
          onPress={this.layout8}
          topSeparator="full"
        />
        <AnterosListRow
          title="Step indicator"
          onPress={this.layout9}
          topSeparator="full"
        />
        <AnterosListRow
          title="Accordion"
          onPress={this.layout10}
          topSeparator="full"
        />
        <AnterosListRow
          title="Page"
          onPress={this.layout11}
          topSeparator="full"
        />
        <AnterosListRow
          title="Parallax view"
          onPress={this.layout12}
          topSeparator="full"
        />
        <AnterosListRow
          title="Swipeable"
          onPress={this.layout14}
          topSeparator="full"
        />
        <AnterosListRow
          title="Elastic stack"
          onPress={this.layout16}
          topSeparator="full"
        />
        <AnterosListRow
          title="Draggable view"
          onPress={this.layout17}
          topSeparator="full"
        />
      </ScrollView>
    );
  }
}

const stylesList = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  row: {
    paddingHorizontal: 10,
    paddingVertical: 20
  }
});

class CarouselBasicExample extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Carousel basic",
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.items = ["none", "default", "custom"];
    Object.assign(this.state, {
      width: Dimensions.get("window").width,
      control: "none"
    });
  }

  selectControl() {
    AnterosPullPicker.show(
      "Control",
      this.items,
      this.items.indexOf(this.state.control),
      (item, index) => this.setState({ control: item })
    );
  }

  renderControl() {
    let { control } = this.state;
    if (control === "default") {
      return <AnterosCarousel.Control />;
    } else if (control === "custom") {
      return (
        <AnterosCarousel.Control
          style={{
            alignItems: "flex-end"
          }}
          dot={
            <Text
              style={{
                backgroundColor: "rgba(0, 0, 0, 0)",
                color: "#5bc0de",
                padding: 4
              }}
            >
              {" "}
              □{" "}
            </Text>
          }
          activeDot={
            <Text
              style={{
                backgroundColor: "rgba(0, 0, 0, 0)",
                color: "#5bc0de",
                padding: 4
              }}
            >
              {" "}
              ■{" "}
            </Text>
          }
        />
      );
    }
  }

  renderPage() {
    let { width } = this.state;
    return (
      <ScrollView
        style={{
          flex: 1
        }}
      >
        <AnterosCarousel
          style={{
            height: 238
          }}
          control={this.renderControl()}
          onLayout={e => this.setState({ width: e.nativeEvent.layout.width })}
        >
          <AnterosImage
            style={{
              width,
              height: 238
            }}
            resizeMode="cover"
            source={require("../images/teaset1.jpg")}
          />
          <AnterosImage
            style={{
              width,
              height: 238
            }}
            resizeMode="cover"
            source={require("../images/teaset2.jpg")}
          />
          <AnterosImage
            style={{
              width,
              height: 238
            }}
            resizeMode="cover"
            source={require("../images/teaset3.jpg")}
          />
        </AnterosCarousel>
        <View
          style={{
            height: 20
          }}
        />
        <AnterosListRow
          title="Control"
          detail={this.state.control}
          onPress={() => this.selectControl()}
          topSeparator="full"
          bottomSeparator="full"
        />
      </ScrollView>
    );
  }
}

const ENTRIES1 = [
  {
    title: "Beautiful and dramatic Antelope Canyon",
    subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
    illustration: "https://i.imgur.com/UYiroysl.jpg"
  },
  {
    title: "Earlier this morning, NYC",
    subtitle: "Lorem ipsum dolor sit amet",
    illustration: "https://i.imgur.com/UPrs1EWl.jpg"
  },
  {
    title: "White Pocket Sunset",
    subtitle: "Lorem ipsum dolor sit amet et nuncat ",
    illustration: "https://i.imgur.com/MABUbpDl.jpg"
  },
  {
    title: "Acrocorinth, Greece",
    subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
    illustration: "https://i.imgur.com/KZsmUi2l.jpg"
  },
  {
    title: "The lone tree, majestic landscape of New Zealand",
    subtitle: "Lorem ipsum dolor sit amet",
    illustration: "https://i.imgur.com/2nCt3Sbl.jpg"
  },
  {
    title: "Middle Earth, Germany",
    subtitle: "Lorem ipsum dolor sit amet",
    illustration: "https://i.imgur.com/lceHsT6l.jpg"
  }
];

const ENTRIES2 = [
  {
    title: "Favourites landscapes 1",
    subtitle: "Lorem ipsum dolor sit amet",
    illustration: "https://i.imgur.com/SsJmZ9jl.jpg"
  },
  {
    title: "Favourites landscapes 2",
    subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
    illustration: "https://i.imgur.com/5tj6S7Ol.jpg"
  },
  {
    title: "Favourites landscapes 3",
    subtitle: "Lorem ipsum dolor sit amet et nuncat",
    illustration: "https://i.imgur.com/pmSqIFZl.jpg"
  },
  {
    title: "Favourites landscapes 4",
    subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
    illustration: "https://i.imgur.com/cA8zoGel.jpg"
  },
  {
    title: "Favourites landscapes 5",
    subtitle: "Lorem ipsum dolor sit amet",
    illustration: "https://i.imgur.com/pewusMzl.jpg"
  },
  {
    title: "Favourites landscapes 6",
    subtitle: "Lorem ipsum dolor sit amet et nuncat",
    illustration: "https://i.imgur.com/l49aYS3l.jpg"
  }
];

class CarouselAdvancedExample extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Carousel advanced",
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    };
  }

  _renderItem({ item, index }) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  _renderLightItem({ item, index }) {
    return <SliderEntry data={item} even={false} />;
  }

  _renderDarkItem({ item, index }) {
    return <SliderEntry data={item} even={true} />;
  }

  mainExample(number, title) {
    const { slider1ActiveSlide } = this.state;

    return (
      <View style={stylesAdvanced.exampleContainer}>
        <AnterosText
          style={stylesAdvanced.title}
        >{`Example ${number}`}</AnterosText>
        <AnterosText style={stylesAdvanced.subtitle}>{title}</AnterosText>
        <AnterosAdvancedCarousel
          ref={c => (this._slider1Ref = c)}
          data={ENTRIES1}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          // inactiveSlideShift={20}
          containerCustomStyle={stylesAdvanced.slider}
          contentContainerCustomStyle={stylesAdvanced.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
        />
        <AnterosAdvancedCarousel.Pagination
          dotsLength={ENTRIES1.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={stylesAdvanced.paginationContainer}
          dotColor={"rgba(255, 255, 255, 0.92)"}
          dotStyle={stylesAdvanced.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
      </View>
    );
  }

  momentumExample(number, title) {
    return (
      <View style={stylesAdvanced.exampleContainer}>
        <AnterosText
          style={stylesAdvanced.title}
        >{`Example ${number}`}</AnterosText>
        <AnterosText style={stylesAdvanced.subtitle}>{title}</AnterosText>
        <AnterosAdvancedCarousel
          data={ENTRIES2}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={0.95}
          inactiveSlideOpacity={1}
          enableMomentum={true}
          activeSlideAlignment={"start"}
          containerCustomStyle={stylesAdvanced.slider}
          contentContainerCustomStyle={stylesAdvanced.sliderContentContainer}
          activeAnimationType={"spring"}
          activeAnimationOptions={{
            friction: 4,
            tension: 40
          }}
        />
      </View>
    );
  }

  layoutExample(number, title, type) {
    const isTinder = type === "tinder";
    return (
      <View
        style={[
          stylesAdvanced.exampleContainer,
          isTinder
            ? stylesAdvanced.exampleContainerDark
            : stylesAdvanced.exampleContainerLight
        ]}
      >
        <AnterosText
          style={[
            stylesAdvanced.title,
            isTinder ? {} : stylesAdvanced.titleDark
          ]}
        >{`Example ${number}`}</AnterosText>
        <AnterosText
          style={[
            stylesAdvanced.subtitle,
            isTinder ? {} : stylesAdvanced.titleDark
          ]}
        >
          {title}
        </AnterosText>
        <AnterosAdvancedCarousel
          data={isTinder ? ENTRIES2 : ENTRIES1}
          renderItem={isTinder ? this._renderLightItem : this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={stylesAdvanced.slider}
          contentContainerCustomStyle={stylesAdvanced.sliderContentContainer}
          layout={type}
          loop={true}
        />
      </View>
    );
  }

  customExample(number, title, refNumber, renderItemFunc) {
    const isEven = refNumber % 2 === 0;

    // Do not render examples on Android; because of the zIndex bug, they won't work as is
    return !IS_ANDROID ? (
      <View
        style={[
          stylesAdvanced.exampleContainer,
          isEven
            ? stylesAdvanced.exampleContainerDark
            : stylesAdvanced.exampleContainerLight
        ]}
      >
        <AnterosText
          style={[stylesAdvanced.title, isEven ? {} : stylesAdvanced.titleDark]}
        >{`Example ${number}`}</AnterosText>
        <AnterosText
          style={[
            stylesAdvanced.subtitle,
            isEven ? {} : stylesAdvanced.titleDark
          ]}
        >
          {title}
        </AnterosText>
        <AnterosAdvancedCarousel
          data={isEven ? ENTRIES2 : ENTRIES1}
          renderItem={renderItemFunc}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={stylesAdvanced.slider}
          contentContainerCustomStyle={stylesAdvanced.sliderContentContainer}
          scrollInterpolator={
            scrollInterpolators[`scrollInterpolator${refNumber}`]
          }
          slideInterpolatedStyle={animatedStyles[`animatedStyles${refNumber}`]}
          useScrollView={true}
        />
      </View>
    ) : (
      false
    );
  }

  get gradient() {
    return (
      <LinearGradient
        colors={[colors.background1, colors.background2]}
        startPoint={{ x: 1, y: 0 }}
        endPoint={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
    );
  }

  renderPage() {
    const example1 = this.mainExample(
      1,
      "Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots"
    );
    const example2 = this.momentumExample(
      2,
      "Momentum | Left-aligned | Active animation"
    );
    const example3 = this.layoutExample(
      3,
      '"Stack of cards" layout | Loop',
      "stack"
    );
    const example4 = this.layoutExample(
      4,
      '"Tinder-like" layout | Loop',
      "tinder"
    );
    const example5 = this.customExample(
      5,
      "Custom animation 1",
      1,
      this._renderItem
    );
    const example6 = this.customExample(
      6,
      "Custom animation 2",
      2,
      this._renderLightItem
    );
    const example7 = this.customExample(
      7,
      "Custom animation 3",
      3,
      this._renderDarkItem
    );
    const example8 = this.customExample(
      8,
      "Custom animation 4",
      4,
      this._renderLightItem
    );

    return (
      <SafeAreaView style={stylesAdvanced.safeArea}>
        <View style={stylesAdvanced.container}>
          <StatusBar
            translucent={true}
            backgroundColor={"rgba(0, 0, 0, 0.3)"}
            barStyle={"light-content"}
          />
          {this.gradient}
          <ScrollView
            style={stylesAdvanced.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
            {example1}
            {example2}
            {example3}
            {example4}
            {example5}
            {example6}
            {example7}
            {example8}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const SLIDER_1_FIRST_ITEM = 1;

const colors = {
  txt_main: "#0765d7",
  txt_description: "#777777",
  txt_dark: "#3c3c3c",
  txt1: "white",

  bg_main: "#0765d7",
  bg_header: "#f8f7f3",
  bg1: "white",

  bd_main: "#0765d7",
  bd1: "white",
  bd_line: "#dddddd",
  bd_input: "#cbcbcb",

  white: "#FDFDFD",
  tuna: "#4B4E55",
  malibu: "#4FB2E2",
  light_gray: "#D1CECE",
  dark_gray: "#A5A3A3",
  ebb: "#E3DAD8",
  black: "#1a1917",
  gray: "#888888",
  background1: "#21D4FD",
  background2: "#21D4FD"
};

const stylesAdvanced = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.black
  },
  container: {
    flex: 1,
    backgroundColor: colors.background1
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  scrollview: {
    flex: 1
  },
  exampleContainer: {
    paddingVertical: 30
  },
  exampleContainerDark: {
    backgroundColor: colors.black
  },
  exampleContainerLight: {
    backgroundColor: "white"
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: "transparent",
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  titleDark: {
    color: colors.black
  },
  subtitle: {
    marginTop: 5,
    paddingHorizontal: 30,
    backgroundColor: "transparent",
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 13,
    fontStyle: "italic",
    textAlign: "center"
  },
  slider: {
    marginTop: 15,
    overflow: "visible" // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10 // for custom animation
  },
  paginationContainer: {
    paddingVertical: 8
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8
  }
});

class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object
  };

  get image() {
    const {
      data: { illustration },
      parallax,
      parallaxProps,
      even
    } = this.props;

    return parallax ? (
      <AnterosParallaxImage
        source={{ uri: illustration }}
        containerStyle={[
          styleSlyderEntry.imageContainer,
          even ? styleSlyderEntry.imageContainerEven : {}
        ]}
        style={styleSlyderEntry.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.25)"}
        {...parallaxProps}
      />
    ) : (
      <AnterosImage
        source={{ uri: illustration }}
        style={styleSlyderEntry.image}
      />
    );
  }

  render() {
    const {
      data: { title, subtitle },
      even
    } = this.props;

    const uppercaseTitle = title ? (
      <AnterosText
        style={[styleSlyderEntry.title, even ? styleSlyderEntry.titleEven : {}]}
        numberOfLines={2}
      >
        {title.toUpperCase()}
      </AnterosText>
    ) : (
      false
    );

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styleSlyderEntry.slideInnerContainer}
        onPress={() => {
          alert(`You've clicked '${title}'`);
        }}
      >
        <View style={styleSlyderEntry.shadow} />
        <View
          style={[
            styleSlyderEntry.imageContainer,
            even ? styleSlyderEntry.imageContainerEven : {}
          ]}
        >
          {this.image}
          <View
            style={[
              styleSlyderEntry.radiusMask,
              even ? styleSlyderEntry.radiusMaskEven : {}
            ]}
          />
        </View>
        <View
          style={[
            styleSlyderEntry.textContainer,
            even ? styleSlyderEntry.textContainerEven : {}
          ]}
        >
          {uppercaseTitle}
          <AnterosText
            style={[
              styleSlyderEntry.subtitle,
              even ? styleSlyderEntry.subtitleEven : {}
            ]}
            numberOfLines={2}
          >
            {subtitle}
          </AnterosText>
        </View>
      </TouchableOpacity>
    );
  }
}

const styleSlyderEntry = StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18 // needed for shadow
  },
  shadow: {
    position: "absolute",
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  imageContainerEven: {
    backgroundColor: colors.black
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: "white"
  },
  radiusMaskEven: {
    backgroundColor: colors.black
  },
  textContainer: {
    justifyContent: "center",
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
  },
  textContainerEven: {
    backgroundColor: colors.black
  },
  title: {
    color: colors.black,
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 0.5
  },
  titleEven: {
    color: "white"
  },
  subtitle: {
    marginTop: 6,
    color: colors.gray,
    fontSize: 12,
    fontStyle: "italic"
  },
  subtitleEven: {
    color: "rgba(255, 255, 255, 0.7)"
  }
});

let imageStyle = {
  width: null,
  height: null,
  resizeMode: "cover",
  flex: 1
};

let viewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden"
};

let textStyle = {
  backgroundColor: "transparent",
  textAlign: "center",
  fontSize: 52
};

let indexStyle = {
  fontSize: 10,
  color: "rgba(255, 255, 255, .63)"
};

let Label = ({
  color,
  backgroundColor,
  text,
  effect,
  index,
  pages,
  progress
}) => {
  let style = { ...textStyle, color };

  switch (effect) {
    case "skew":
      style.transform = [
        {
          skewX: progress.interpolate({
            inputRange: [-0.75, 0, 0.75],
            outputRange: ["45deg", "0deg", "-45deg"]
          })
        }
      ];
      break;

    case "rise":
      style.transform = [
        {
          translateY: progress.interpolate({
            inputRange: [-0.5, 0, 0.5],
            outputRange: [50, 0, -50]
          })
        }
      ];

      style.opacity = progress.interpolate({
        inputRange: [-0.5, 0, 0.5],
        outputRange: [0, 1, 0]
      });
      break;

    case "zoom":
      style.transform = [
        {
          scale: progress.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [4, 1, 0]
          })
        }
      ];

      style.opacity = progress.interpolate({
        inputRange: [-0.25, 0, 1],
        outputRange: [0, 1, 1]
      });
      break;

    case "flip":
      style.transform = [
        {
          rotate: progress.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: ["360deg", "0deg", "-360deg"]
          })
        }
      ];
      break;

    case "slide":
      style.transform = [
        {
          translateX: progress.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [-100, 0, 100]
          })
        }
      ];
      break;
  }

  return (
    <View style={[viewStyle, { backgroundColor }]}>
      <Animated.Text style={style}>
        {text}
        {"\n"}
        <Animated.Text style={indexStyle}>{`[${index +
          1} / ${pages}]`}</Animated.Text>
      </Animated.Text>
    </View>
  );
};

class PageExample extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Page",
    showBackButton: true
  };

  renderPage() {
    return (
      <View style={{ flex: 1, backgroundColor: "#263238" }}>
        <AnterosPage>
          <Label
            color="#FFF59D"
            backgroundColor="#607D8B"
            text="move"
            effect="skew"
          />
          <Label
            color="#B2FF59"
            backgroundColor="#546E7A"
            text="fast"
            effect="rise"
          />
          <Label
            color="#81D4FA"
            backgroundColor="#455A64"
            text="and"
            effect="zoom"
          />
          <Label
            color="#F44336"
            backgroundColor="#37474F"
            text="break"
            effect="flip"
          />
          <Label
            color="#FF9100"
            backgroundColor="#263238"
            text="things"
            effect="slide"
          />
        </AnterosPage>

        <AnterosPage
          horizontal={false}
          indicatorPosition="left"
          indicatorColor="#FF9100"
          indicatorOpacity={0.54}
        >
          <Image source={require("../images/b-1.png")} style={imageStyle} />
          <Image source={require("../images/b-2.png")} style={imageStyle} />
          <Image source={require("../images/b-3.png")} style={imageStyle} />
        </AnterosPage>
      </View>
    );
  }
}

class LayoutExampleMenu extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Layout",
    showBackButton: true
  };
  constructor(props) {
    super(props);
    this.layout1 = this.layout1.bind(this);
    this.layout2 = this.layout2.bind(this);
    this.layout3 = this.layout3.bind(this);
    this.layout4 = this.layout4.bind(this);
    this.layout5 = this.layout5.bind(this);
    this.layout6 = this.layout6.bind(this);
    this.layout7 = this.layout7.bind(this);
    this.layout8 = this.layout8.bind(this);
    this.layout9 = this.layout9.bind(this);
    this.layout10 = this.layout10.bind(this);
    this.layout11 = this.layout11.bind(this);
    this.layout12 = this.layout12.bind(this);
    this.layout13 = this.layout13.bind(this);
  }

  renderRow = highlighted => {
    if (Platform.OS !== "android") {
      return (
        <View
          style={[
            {
              backgroundColor: "#f0f0f0",
              height: 1
            },
            highlighted && {
              marginLeft: 0
            }
          ]}
        />
      );
    }

    return null;
  };

  layout1() {
    this.navigator.push({ view: <Layout1 /> });
  }
  layout2() {
    this.navigator.push({ view: <Layout2 /> });
  }
  layout3() {
    this.navigator.push({ view: <Layout3 /> });
  }
  layout4() {
    this.navigator.push({ view: <Layout4 /> });
  }
  layout5() {
    this.navigator.push({ view: <Layout5 /> });
  }
  layout6() {
    this.navigator.push({ view: <Layout6 /> });
  }
  layout7() {
    this.navigator.push({ view: <Layout7 /> });
  }
  layout8() {
    this.navigator.push({ view: <Layout8 /> });
  }
  layout9() {
    this.navigator.push({ view: <Layout9 /> });
  }
  layout10() {
    this.navigator.push({ view: <Layout10 /> });
  }
  layout11() {
    this.navigator.push({ view: <Layout11 /> });
  }
  layout12() {
    this.navigator.push({ view: <Layout12 /> });
  }
  layout13() {
    this.navigator.push({ view: <Layout13 /> });
  }

  renderPage() {
    return (
      <ScrollView
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            height: 20
          }}
        />
        <AnterosListRow
          title="Responsive elements"
          onPress={this.layout1}
          topSeparator="full"
        />
        <AnterosListRow
          title="Hidden elements"
          onPress={this.layout2}
          topSeparator="full"
        />
        <AnterosListRow
          title="Shifting elements"
          onPress={this.layout3}
          topSeparator="full"
        />
        <AnterosListRow
          title="Fixed size elements"
          onPress={this.layout4}
          topSeparator="full"
        />
        <AnterosListRow
          title="Conditional styling"
          onPress={this.layout5}
          topSeparator="full"
        />
        <AnterosListRow
          title="Horizontal direction"
          onPress={this.layout6}
          topSeparator="full"
        />
        <AnterosListRow
          title="Strech disabled"
          onPress={this.layout7}
          topSeparator="full"
        />
        <AnterosListRow
          title="Strech enabled"
          onPress={this.layout8}
          topSeparator="full"
        />
        <AnterosListRow
          title="Scrollable grid"
          onPress={this.layout9}
          topSeparator="full"
        />
        <AnterosListRow
          title="Nested grid"
          onPress={this.layout10}
          topSeparator="full"
        />
        <AnterosListRow
          title="Tiles"
          onPress={this.layout11}
          topSeparator="full"
        />
        <AnterosListRow
          title="With grid dimensions"
          onPress={this.layout12}
          topSeparator="full"
        />
        <AnterosListRow
          title="With size info"
          onPress={this.layout13}
          topSeparator="full"
        />
      </ScrollView>
    );
  }
}

const stylesLayout1 = StyleSheet.create({
  element: {
    height: 100,
    justifyContent: "center"
  }
});

class Layout1 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Responsive elements",
    showBackButton: true
  };

  renderPage() {
    return (
      <AnterosContent>
        <AnterosSection>
          <AnterosBlock xsSize="1/1" smSize="1/2">
            <View
              style={[stylesLayout1.element, { backgroundColor: "#c3defe" }]}
            />
          </AnterosBlock>
          <AnterosBlock xsSize="1/1" smSize="1/2">
            <View
              style={[stylesLayout1.element, { backgroundColor: "#b2d4fe" }]}
            />
          </AnterosBlock>
          <AnterosBlock xsSize="1/1" smSize="1/2">
            <View
              style={[stylesLayout1.element, { backgroundColor: "#a1cbfd" }]}
            />
          </AnterosBlock>
        </AnterosSection>
        <AnterosSection>
          <AnterosBlock xsSize="1/1" smSize="1/2">
            <View
              style={[stylesLayout1.element, { backgroundColor: "#2d8bfb" }]}
            />
          </AnterosBlock>
          <AnterosBlock xsSize="1/1" smSize="1/2">
            <View
              style={[stylesLayout1.element, { backgroundColor: "#1c81fb" }]}
            />
          </AnterosBlock>
          <AnterosBlock xsSize="1/1" smSize="1/2">
            <View
              style={[stylesLayout1.element, { backgroundColor: "#0b78fb" }]}
            />
          </AnterosBlock>
          <AnterosBlock xsSize="1/1" smSize="1/2">
            <View
              style={[stylesLayout1.element, { backgroundColor: "#0470f1" }]}
            />
          </AnterosBlock>
          <AnterosBlock xsSize="1/1" smSize="1/2">
            <View
              style={[stylesLayout1.element, { backgroundColor: "#0468e0" }]}
            />
          </AnterosBlock>
        </AnterosSection>
      </AnterosContent>
    );
  }
}

const stylesLayout2 = StyleSheet.create({
  element: {
    height: 100,
    justifyContent: "center"
  },
  text: {
    textAlign: "center",
    color: "#02326b",
    fontSize: 40
  },
  textLight: {
    color: "white"
  }
});

class Layout2 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Hidden elements",
    showBackButton: true
  };

  renderPage() {
    return (
      <AnterosContent>
        <AnterosSection>
          <AnterosBlock>
            <View
              style={[stylesLayout2.element, { backgroundColor: "#c3defe" }]}
            >
              <AnterosText style={stylesLayout2.text}>
                always visible
              </AnterosText>
            </View>
          </AnterosBlock>
          <AnterosBlock smHidden>
            <View
              style={[stylesLayout2.element, { backgroundColor: "#4e9dfc" }]}
            >
              <AnterosText style={stylesLayout2.text}>small phone</AnterosText>
            </View>
          </AnterosBlock>
          <AnterosBlock xsHidden smVisible>
            <View
              style={[stylesLayout2.element, { backgroundColor: "#02326b" }]}
            >
              <AnterosText style={[stylesLayout2.text, styles.textLight]}>
                large phone
              </AnterosText>
            </View>
          </AnterosBlock>
        </AnterosSection>
      </AnterosContent>
    );
  }
}

const stylesShifting = StyleSheet.create({
  element: {
    height: 100,
    justifyContent: "center"
  },
  text: {
    textAlign: "center",
    color: "#02326b",
    fontSize: 30
  },
  hiddenBlock: {
    backgroundColor: "#eee",
    borderTopWidth: 1,
    borderColor: "#ccc",
    flex: 1,
    justifyContent: "center"
  },
  hiddenText: {
    textAlign: "center",
    color: "#aaa",
    fontSize: 20
  }
});

class Layout3 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Shifting elements",
    showBackButton: true
  };

  renderPage() {
    return (
      <ScrollView>
        <AnterosContent>
          <AnterosSection>
            <AnterosBlock xsSize="1/2" smSize="1/4">
              <View
                style={[stylesShifting.element, { backgroundColor: "#b2d4fe" }]}
              >
                <AnterosText style={stylesShifting.text}>Left</AnterosText>
              </View>
            </AnterosBlock>
          </AnterosSection>
          <AnterosSection>
            <AnterosBlock size="stretch">
              <View style={stylesShifting.hiddenBlock}>
                <AnterosText style={stylesShifting.hiddenText}>
                  Stretch
                </AnterosText>
              </View>
            </AnterosBlock>
            <AnterosBlock xsSize="1/2" smSize="1/4">
              <View
                style={[stylesShifting.element, { backgroundColor: "#91c2fd" }]}
              >
                <AnterosText style={stylesShifting.text}>Center</AnterosText>
              </View>
            </AnterosBlock>
            <AnterosBlock size="stretch">
              <View style={stylesShifting.hiddenBlock}>
                <AnterosText style={stylesShifting.hiddenText}>
                  Stretch
                </AnterosText>
              </View>
            </AnterosBlock>
          </AnterosSection>
          <AnterosSection>
            <AnterosBlock size="stretch" />
            <AnterosBlock xsSize="1/2" smSize="1/4">
              <View
                style={[stylesShifting.element, { backgroundColor: "#6faffd" }]}
              >
                <AnterosText style={stylesShifting.text}>Right</AnterosText>
              </View>
            </AnterosBlock>
          </AnterosSection>
          <AnterosSection>
            <AnterosBlock xsSize="1/3" smSize="1/4">
              <View
                style={[stylesShifting.element, { backgroundColor: "#6faffd" }]}
              >
                <AnterosText style={stylesShifting.text}>Left</AnterosText>
              </View>
            </AnterosBlock>
            <AnterosBlock size="stretch">
              <View style={stylesShifting.hiddenBlock}>
                <AnterosText style={stylesShifting.hiddenText}>
                  Stretch
                </AnterosText>
              </View>
            </AnterosBlock>
            <AnterosBlock xsSize="1/3" smSize="1/4">
              <View
                style={[stylesShifting.element, { backgroundColor: "#4e9dfc" }]}
              >
                <AnterosText style={stylesShifting.text}>Right</AnterosText>
              </View>
            </AnterosBlock>
          </AnterosSection>
        </AnterosContent>
      </ScrollView>
    );
  }
}

const stylesFixed = StyleSheet.create({
  element: {
    height: 100,
    justifyContent: "center"
  },
  text: {
    textAlign: "center",
    color: "#02326b",
    fontSize: 30
  },
  whiteText: {
    textAlign: "center",
    color: "white",
    fontSize: 30
  }
});

class Layout4 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Fixed size elements",
    showBackButton: true
  };

  renderPage() {
    return (
      <AnterosContent>
        <AnterosSection>
          <AnterosBlock size="stretch">
            <View style={[stylesFixed.element, { backgroundColor: "#80b9fd" }]}>
              <AnterosText style={stylesFixed.text}>stretch</AnterosText>
            </View>
          </AnterosBlock>
          <AnterosBlock size="1/4">
            <View style={[stylesFixed.element, { backgroundColor: "#5fa6fc" }]}>
              <AnterosText style={stylesFixed.text}>1/4</AnterosText>
            </View>
          </AnterosBlock>
          <AnterosBlock size="25%">
            <View style={[styles.element, { backgroundColor: "#3d94fc" }]}>
              <AnterosText style={styles.text}>25%</AnterosText>
            </View>
          </AnterosBlock>
          <AnterosBlock size={50}>
            <View style={[stylesFixed.element, { backgroundColor: "#a1cbfd" }]}>
              <AnterosText style={stylesFixed.text}>50pt</AnterosText>
            </View>
          </AnterosBlock>
        </AnterosSection>
        <AnterosSection>
          <AnterosBlock size={150}>
            <View style={[stylesFixed.element, { backgroundColor: "#02418d" }]}>
              <AnterosText style={stylesFixed.whiteText}>
                150pt{"\n"}fixed
              </AnterosText>
            </View>
          </AnterosBlock>
          <AnterosBlock size="stretch">
            <View style={[stylesFixed.element, { backgroundColor: "#02326b" }]}>
              <AnterosText style={stylesFixed.whiteText}>
                stretch{"\n"}remaining width
              </AnterosText>
            </View>
          </AnterosBlock>
        </AnterosSection>
      </AnterosContent>
    );
  }
}

const stylesConditional = StyleSheet.create({
  element: {
    height: "100%",
    justifyContent: "center"
  },
  lightBackground: {
    backgroundColor: "#b2d4fe"
  },
  darkBackground: {
    backgroundColor: "#1c81fb"
  }
});

const WrappedComponent = withSizeInfo(({ sizeSelector }) => {
  const style = sizeSelector({
    xs: stylesConditional.lightBackground,
    sm: stylesConditional.darkBackground
  });

  return <View style={[stylesConditional.element, style]} />;
});

class Layout5 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Conditional styling",
    showBackButton: true
  };

  renderPage() {
    return (
      <AnterosContent>
        <AnterosSection>
          <AnterosBlock>
            <WrappedComponent />
            <SizeInfo>
              {({ sizeSelector }) => {
                const style = sizeSelector({
                  xs: stylesConditional.lightBackground,
                  sm: stylesConditional.darkBackground
                });
                return <View style={[stylesConditional.element, style]} />;
              }}
            </SizeInfo>
          </AnterosBlock>
        </AnterosSection>
      </AnterosContent>
    );
  }
}

const stylesHorizontal = StyleSheet.create({
  element: {
    width: 160,
    justifyContent: "center"
  },
  text: {
    textAlign: "center",
    color: "#02326b",
    fontSize: 40,
    marginTop: 10,
    fontWeight: "600"
  },
  icon: {
    textAlign: "center",
    fontSize: 60
  }
});

class Layout6 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Horizontal direction",
    showBackButton: true
  };

  renderPage() {
    return (
      <AnterosContent horizontal>
        <AnterosSection>
          <AnterosBlock xsSize="1/1" smSize="1/2">
            <View
              style={[stylesHorizontal.element, { backgroundColor: "#c3defe" }]}
            >
              <AnterosText style={stylesHorizontal.text}>2018.</AnterosText>
            </View>
          </AnterosBlock>
          <AnterosBlock xsSize="1/1" smSize="1/2">
            <View
              style={[stylesHorizontal.element, { backgroundColor: "#a1cbfd" }]}
            >
              <AnterosText style={stylesHorizontal.text}>2017.</AnterosText>
            </View>
          </AnterosBlock>
          <AnterosBlock xsSize="1/1" smSize="1/2">
            <View
              style={[stylesHorizontal.element, { backgroundColor: "#80b9fd" }]}
            >
              <AnterosText style={stylesHorizontal.text}>2016.</AnterosText>
            </View>
          </AnterosBlock>
          <AnterosBlock xsSize="1/1" smSize="1/2">
            <View
              style={[stylesHorizontal.element, { backgroundColor: "#5fa6fc" }]}
            >
              <AnterosText style={stylesHorizontal.text}>2015.</AnterosText>
            </View>
          </AnterosBlock>
          <AnterosBlock xsSize="1/1" smSize="1/2">
            <View
              style={[stylesHorizontal.element, { backgroundColor: "#3d94fc" }]}
            >
              <AnterosText style={stylesHorizontal.text}>2014.</AnterosText>
            </View>
          </AnterosBlock>
        </AnterosSection>
      </AnterosContent>
    );
  }
}

const stylesStretch = StyleSheet.create({
  text: {
    textAlign: "center",
    color: "#02326b",
    fontSize: 40,
    lineHeight: 80
  }
});

class Layout7 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Stretch disabled",
    showBackButton: true
  };

  renderPage() {
    return (
      <AnterosContent>
        <AnterosSection>
          <AnterosBlock>
            <View style={{ height: 80, backgroundColor: "#d4e7fe" }}>
              <Text style={stylesStretch.text}>Header</Text>
            </View>
          </AnterosBlock>
        </AnterosSection>
        <AnterosSection>
          <AnterosBlock size="1/4">
            <View>
              <View style={{ backgroundColor: "#b2d4fe" }}>
                <AnterosText style={stylesStretch.text}>L</AnterosText>
              </View>
            </View>
          </AnterosBlock>
          <AnterosBlock size="stretch">
            <View>
              <View style={{ backgroundColor: "#91c2fd" }}>
                <AnterosText style={stylesStretch.text}>Content</AnterosText>
              </View>
            </View>
          </AnterosBlock>
          <AnterosBlock size="1/4">
            <View>
              <View style={{ backgroundColor: "#b2d4fe" }}>
                <AnterosText style={stylesStretch.text}>R</AnterosText>
              </View>
            </View>
          </AnterosBlock>
        </AnterosSection>
        <AnterosSection>
          <AnterosBlock>
            <View style={{ height: 80, backgroundColor: "#6faffd" }}>
              <AnterosText style={stylesStretch.text}>Footer</AnterosText>
            </View>
          </AnterosBlock>
        </AnterosSection>
      </AnterosContent>
    );
  }
}

const stylesEnabled = StyleSheet.create({
  flexibleContainer: {
    flex: 1
  },
  text: {
    textAlign: "center",
    color: "#02326b",
    fontSize: 40,
    lineHeight: 80
  }
});

class Layout8 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Stretch enabled",
    showBackButton: true
  };

  renderPage() {
    return (
      <AnterosContent stretchable>
        <AnterosSection>
          <AnterosBlock>
            <View style={{ height: 80, backgroundColor: "#d4e7fe" }}>
              <AnterosText style={stylesEnabled.text}>Header</AnterosText>
            </View>
          </AnterosBlock>
        </AnterosSection>
        <AnterosSection stretch>
          {/* By default Sections are not stretched. */}
          <AnterosBlock size="20%">
            <View
              style={[
                { backgroundColor: "#b2d4fe" },
                stylesEnabled.flexibleContainer
              ]}
            >
              {/* When nesting elements inside stretched section blocks, if you want
                            them to fill space do not forget to add flex: 1 */}

              <AnterosText style={stylesEnabled.text}>L</AnterosText>
            </View>
          </AnterosBlock>
          <AnterosBlock size="stretch">
            <View
              style={[
                { backgroundColor: "#91c2fd" },
                stylesEnabled.flexibleContainer
              ]}
            >
              <AnterosText style={stylesEnabled.text}>Content</AnterosText>
            </View>
          </AnterosBlock>
        </AnterosSection>
        <AnterosSection>
          <AnterosBlock>
            <View style={{ height: 80, backgroundColor: "#6faffd" }}>
              <AnterosText style={stylesEnabled.text}>Footer</AnterosText>
            </View>
          </AnterosBlock>
        </AnterosSection>
      </AnterosContent>
    );
  }
}

const stylesScroll = StyleSheet.create({
  text: {
    textAlign: "center",
    color: "#02326b",
    fontSize: 40,
    lineHeight: 80
  }
});

class Layout9 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Scrollable grid",
    showBackButton: true
  };

  renderPage() {
    return (
      <AnterosContent scrollable>
        <AnterosSection>
          <AnterosBlock xsSize="1/1" mdSize="1/2">
            <View style={{ backgroundColor: "#c3defe" }}>
              <AnterosText style={stylesScroll.text}>1</AnterosText>
            </View>
          </AnterosBlock>
          <AnterosBlock xsSize="1/1" mdSize="1/2">
            <View style={{ backgroundColor: "#b2d4fe" }}>
              <AnterosText style={stylesScroll.text}>2</AnterosText>
            </View>
          </AnterosBlock>
          <AnterosBlock xsSize="1/1" mdSize="1/2">
            <View style={{ backgroundColor: "#a1cbfd" }}>
              <AnterosText style={stylesScroll.text}>3</AnterosText>
            </View>
          </AnterosBlock>
          <AnterosBlock xsSize="1/1" mdSize="1/2">
            <View style={{ backgroundColor: "#91c2fd" }}>
              <AnterosText style={stylesScroll.text}>4</AnterosText>
            </View>
          </AnterosBlock>
          <AnterosBlock xsSize="1/1" mdSize="1/2">
            <View style={{ backgroundColor: "#80b9fd" }}>
              <AnterosText style={stylesScroll.text}>5</AnterosText>
            </View>
          </AnterosBlock>
          <AnterosBlock xsSize="1/1" mdSize="1/2">
            <View style={{ backgroundColor: "#6faffd" }}>
              <AnterosText style={stylesScroll.text}>6</AnterosText>
            </View>
          </AnterosBlock>
          <AnterosBlock xsSize="1/1" mdSize="1/2">
            <View style={{ backgroundColor: "#5fa6fc" }}>
              <AnterosText style={stylesScroll.text}>7</AnterosText>
            </View>
          </AnterosBlock>
          <AnterosBlock xsSize="1/1" mdSize="1/2">
            <View style={{ backgroundColor: "#4e9dfc" }}>
              <AnterosText style={stylesScroll.text}>8</AnterosText>
            </View>
          </AnterosBlock>
          <AnterosBlock xsSize="1/1" mdSize="1/2">
            <View style={{ backgroundColor: "#3d94fc" }}>
              <AnterosText style={stylesScroll.text}>9</AnterosText>
            </View>
          </AnterosBlock>
          <AnterosBlock xsSize="1/1" mdSize="1/2">
            <View style={{ backgroundColor: "#2d8bfb" }}>
              <AnterosText style={stylesScroll.text}>10</AnterosText>
            </View>
          </AnterosBlock>
          <AnterosBlock xsSize="1/1" mdSize="1/2">
            <View style={{ backgroundColor: "#1c81fb" }}>
              <AnterosText style={stylesScroll.text}>11</AnterosText>
            </View>
          </AnterosBlock>
          <AnterosBlock xsSize="1/1" mdSize="1/2">
            <View style={{ backgroundColor: "#0b78fb" }}>
              <AnterosText style={stylesScroll.text}>12</AnterosText>
            </View>
          </AnterosBlock>
        </AnterosSection>
      </AnterosContent>
    );
  }
}

const stylesNested = StyleSheet.create({
  text: {
    textAlign: "center",
    color: "#02326b",
    fontSize: 40,
    lineHeight: 80
  },
  textSmall: {
    fontSize: 30,
    lineHeight: 40
  }
});

class Layout10 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Nested grid",
    showBackButton: true
  };

  renderPage() {
    return (
      <AnterosContent>
        <AnterosSection>
          <AnterosBlock size="1/2" style={{ backgroundColor: "#b2d4fe" }}>
            <AnterosText style={stylesNested.text}>1/2</AnterosText>
            <AnterosContent>
              <AnterosSection>
                <AnterosBlock size="1/2" style={{ backgroundColor: "#80b9fd" }}>
                  <AnterosText
                    style={[stylesNested.text, stylesNested.textSmall]}
                  >
                    1/2 of 1/2 {"\n"} is 1/4
                  </AnterosText>
                </AnterosBlock>
              </AnterosSection>
            </AnterosContent>
          </AnterosBlock>
        </AnterosSection>
      </AnterosContent>
    );
  }
}

const CardFaCC = ({ style }) => (
  <GridDimensions>
    {({ width }) => {
      const l = calculateStretchLength(width, 120);
      return <View style={[style, { width: l, height: l }]} />;
    }}
  </GridDimensions>
);

const CardHOC = withGridDimensions(({ width, style }) => {
  const l = calculateStretchLength(width, 120);
  return <View style={[style, { width: l, height: l }]} />;
});

class Layout11 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Tiles",
    showBackButton: true
  };

  renderPage() {
    return (
      <ScrollView>
        <AnterosContent>
          {/* You can also use Sections to group multiple cards together.  */}
          <AnterosSection>
            <AnterosBlock>
              <Text style={{ margin: 5, fontSize: 16 }}>First Heading</Text>
            </AnterosBlock>
            <CardFaCC style={{ backgroundColor: "#eee" }} />
            <CardFaCC style={{ backgroundColor: "#ddd" }} />
            <CardFaCC style={{ backgroundColor: "#ccc" }} />
          </AnterosSection>
          <AnterosSection>
            <AnterosBlock>
              <Text style={{ margin: 5, fontSize: 16 }}>Second Heading</Text>
            </AnterosBlock>
            <CardHOC style={{ backgroundColor: "#bbb" }} />
            <CardHOC style={{ backgroundColor: "#aaa" }} />
            <CardHOC style={{ backgroundColor: "#999" }} />
            <CardHOC style={{ backgroundColor: "#888" }} />
            <CardHOC style={{ backgroundColor: "#777" }} />
            <CardHOC style={{ backgroundColor: "#666" }} />
            <CardHOC style={{ backgroundColor: "#555" }} />
            <CardHOC style={{ backgroundColor: "#444" }} />
            <CardHOC style={{ backgroundColor: "#333" }} />
            <CardHOC style={{ backgroundColor: "#222" }} />
          </AnterosSection>
        </AnterosContent>
      </ScrollView>
    );
  }
}

const stylesWith = StyleSheet.create({
  text: {
    fontSize: 36,
    padding: 15,
    color: "#333",
    textAlign: "center"
  },
  toolbar: {
    height: 100,
    width: "100%",
    backgroundColor: "#DDD",
    justifyContent: "center"
  }
});

// Our original component is provided with original props and it will
// additionally receive width and height once rendered inside grid.
// Default values are fallback if rendered outside grid.
const InfoHOC = withGridDimensions(({ width, height }) => (
  <Text style={stylesWith.text}>
    {width}pt x {height}pt
  </Text>
));

// Same component implemented using function as child component pattern.
const InfoFaCC = () => (
  <GridDimensions>
    {({ width, height }) => (
      <Text style={stylesWith.text}>
        {width}pt x {height}pt
      </Text>
    )}
  </GridDimensions>
);

class Layout12 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "With grid dimensions",
    showBackButton: true
  };

  renderPage() {
    return (
      <View>
        <View style={stylesWith.toolbar}>
          <AnterosText style={stylesWith.text}>Header</AnterosText>
        </View>
        <AnterosContent relativeTo="self">
          <AnterosSection>
            <AnterosBlock>
              {/* When nesting grids, withGridDimensions and GridDimensions point to first
                                parent's relative object */}
              <AnterosContent relativeTo="self">
                <AnterosSection>
                  <AnterosBlock size="1/2">
                    <View style={[{ backgroundColor: "#BBB" }]}>
                      <InfoHOC />
                    </View>
                  </AnterosBlock>
                  <AnterosBlock size="1/2">
                    <View style={[{ backgroundColor: "#999" }]}>
                      <InfoFaCC />
                    </View>
                  </AnterosBlock>
                </AnterosSection>
              </AnterosContent>
            </AnterosBlock>
          </AnterosSection>
          <AnterosSection>
            <AnterosBlock>
              <View style={[{ backgroundColor: "#777" }]}>
                <InfoHOC />
              </View>
            </AnterosBlock>
          </AnterosSection>
        </AnterosContent>
      </View>
    );
  }
}

const stylesInfo = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 15,
    color: "#333",
    textAlign: "center"
  },
  smallButton: {
    padding: 5,
    backgroundColor: "#eee",
    margin: 5,
    marginBottom: 0
  },
  mediumButton: {
    padding: 15,
    backgroundColor: "#aaa",
    margin: 10,
    marginBottom: 0
  },
  largeButton: {
    padding: 25,
    backgroundColor: "#666",
    margin: 15,
    marginBottom: 0
  }
});

const ResponsiveButtonHOC = withSizeInfo(({ sizeSelector, ...props }) => {
  const style = sizeSelector({
    xs: stylesInfo.smallButton,
    sm: stylesInfo.mediumButton,
    md: stylesInfo.largeButton
  });
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={style}>
        <AnterosText style={stylesInfo.text}>{props.title}</AnterosText>
      </View>
    </TouchableOpacity>
  );
});

const ResponsiveButtonFaCC = props => (
  <SizeInfo>
    {({ sizeSelector }) => {
      const style = sizeSelector({
        xs: styles.smallButton,
        sm: styles.mediumButton,
        md: styles.largeButton
      });
      return (
        <TouchableOpacity onPress={props.onPress}>
          <View style={style}>
            <AnterosText style={stylesInfo.text}>{props.title}</AnterosText>
          </View>
        </TouchableOpacity>
      );
    }}
  </SizeInfo>
);

class Layout13 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "With size info",
    showBackButton: true
  };

  renderPage() {
    return (
      <View>
        <AnterosContent>
          <AnterosSection>
            <AnterosBlock>
              <ResponsiveButtonHOC title="First button" onPress={() => {}} />
              <ResponsiveButtonFaCC title="Second button" onPress={() => {}} />
              <ResponsiveButtonHOC title="Third button" onPress={() => {}} />
              <ResponsiveButtonFaCC title="Fourth button" onPress={() => {}} />
            </AnterosBlock>
          </AnterosSection>
        </AnterosContent>
      </View>
    );
  }
}

class LayoutGridExampleMenu extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Grid layout",
    showBackButton: true
  };
  constructor(props) {
    super(props);
    this.gridLayout1 = this.gridLayout1.bind(this);
    this.gridLayout2 = this.gridLayout2.bind(this);
    this.gridLayout3 = this.gridLayout3.bind(this);
    this.gridLayout4 = this.gridLayout4.bind(this);
    this.gridLayout5 = this.gridLayout5.bind(this);
    this.gridLayout6 = this.gridLayout6.bind(this);
    this.gridLayout7 = this.gridLayout7.bind(this);
    this.gridLayout8 = this.gridLayout8.bind(this);
    this.gridLayout9 = this.gridLayout9.bind(this);
  }

  renderRow = highlighted => {
    if (Platform.OS !== "android") {
      return (
        <View
          style={[
            {
              backgroundColor: "#f0f0f0",
              height: 1
            },
            highlighted && {
              marginLeft: 0
            }
          ]}
        />
      );
    }

    return null;
  };

  gridLayout1() {
    this.navigator.push({ view: <GridLayout1 /> });
  }

  gridLayout2() {
    this.navigator.push({ view: <GridLayout2 /> });
  }

  gridLayout3() {
    this.navigator.push({ view: <GridLayout3 /> });
  }

  gridLayout4() {
    this.navigator.push({ view: <GridLayout4 /> });
  }

  gridLayout5() {
    this.navigator.push({ view: <GridLayout5 /> });
  }

  gridLayout6() {
    this.navigator.push({ view: <GridLayout6 /> });
  }

  gridLayout7() {
    this.navigator.push({ view: <GridLayout7 /> });
  }

  gridLayout8() {
    this.navigator.push({ view: <GridLayout8 /> });
  }

  gridLayout9() {
    this.navigator.push({ view: <GridLayout9 /> });
  }

  renderPage() {
    return (
      <ScrollView
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            height: 20
          }}
        />
        <AnterosListRow
          title="Universal, responsive Pinterest layout"
          onPress={this.gridLayout1}
          topSeparator="full"
        />
        <AnterosListRow
          title="Universal tiles"
          onPress={this.gridLayout2}
          topSeparator="full"
        />

        <AnterosListRow
          title="Responsive Break Points"
          onPress={this.gridLayout3}
          topSeparator="full"
        />

        <AnterosListRow
          title="FlatList,Row and Column Wrapping"
          onPress={this.gridLayout4}
          topSeparator="full"
        />

        <AnterosListRow
          title="Nested layout"
          onPress={this.gridLayout5}
          topSeparator="full"
        />

        <AnterosListRow
          title="Normal LTR Markup"
          onPress={this.gridLayout6}
          topSeparator="full"
        />

        <AnterosListRow
          title="RTL Markup"
          onPress={this.gridLayout7}
          topSeparator="full"
        />

        <AnterosListRow
          title="Two columns (50% and 50%)"
          onPress={this.gridLayout9}
          topSeparator="full"
        />

        {/* <AnterosListRow
          title="More Examples"
          onPress={this.gridLayout8}
          topSeparator="full"
        /> */}
      </ScrollView>
    );
  }
}

// column width (relative to screen size)
const sizes1 = { sm: 100, md: 50, lg: 25, xl: 20 };

const Item1 = props => {
  if (!props.colWidth) return null;
  return (
    <AnterosLayoutRow
      style={{
        backgroundColor: "white",
        margin: props.margin,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "black"
      }}
    >
      <AnterosLayoutColumn fullWidth>
        <ImageBackground
          source={{ uri: props.url }}
          style={{
            width: props.colWidth,
            height:
              props.height +
              ((props.colWidth - props.width) * props.height) / props.width,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <AnterosText style={{ fontSize: 48, marginTop: 5 }}>
            {props.id}
          </AnterosText>
        </ImageBackground>
      </AnterosLayoutColumn>
    </AnterosLayoutRow>
  );
};

class GridLayout1 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Pinterest layout ",
    showBackButton: true
  };
  constructor(props) {
    super(props);
    this.buildLayout = this.buildLayout.bind(this);
    AnterosLayout.resetBreakPoints();
  }

  componentDidMount(){
    AnterosLayout.resetBreakPoints();
  }

  componentWillReceiveProps(nextProps){
    AnterosLayout.resetBreakPoints();
  }

  buildLayout(state) {
    const numCols = Math.floor(100 / sizes1[AnterosScreenInfo().mediaSize]);
    const numRows = Math.ceil(dataGrid.length / numCols);
    const colWidth = state.layout.grid ? state.layout.grid.width / numCols : 0;

    let layoutMatrix = [],
      layoutCols = [];

    for (let col = 0; col < numCols; col++) {
      layoutMatrix.push([]);
      for (let row = 0, i = col; row < numRows; row++, i += numCols) {
        if (dataGrid[i])
          layoutMatrix[col].push(
            <Item1
              key={i}
              id={i}
              url={dataGrid[i].url}
              height={dataGrid[i].pixelHeight}
              width={dataGrid[i].pixelWidth}
              margin={15}
              colWidth={colWidth}
              state={state}
            />
          );
      }
      layoutCols.push(
        <AnterosLayoutColumn
          key={col}
          smSize={state.layout.grid ? sizes1.sm : 0}
          mdSize={state.layout.grid ? sizes1.md : 0}
          lgSize={state.layout.grid ? sizes1.lg : 0}
          xlSize={state.layout.grid ? sizes1.xl : 0}
        >
          {layoutMatrix[col]}
        </AnterosLayoutColumn>
      );
    }

    return layoutCols;
  }

  renderPage() {
    return (
      <AnterosLayoutGrid>
        {({ state, setState }) => (
          <AnterosLayoutRow fullHeight style={{ backgroundColor: "lightgray" }}>
            <ScrollView removeClippedSubviews={true}>
              <AnterosLayoutRow>{this.buildLayout(state)}</AnterosLayoutRow>
            </ScrollView>
          </AnterosLayoutRow>
        )}
      </AnterosLayoutGrid>
    );
  }
}

const dataGrid = [
  {
    url:
      "https://i.pinimg.com/236x/d8/3a/9b/d83a9b6faf2e58ff895342242bd62214.jpg",
    pixelHeight: 354,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/61/35/93/613593ea3d5537c7f85f7365f0d72f45.jpg",
    pixelHeight: 157,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/52/7c/66/527c66879c1bbbeaf53938e467ee8927.jpg",
    pixelHeight: 289,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/16/8e/1e/168e1e2ba9e74baf37e1c64df576b79c.jpg",
    pixelHeight: 326,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/22/0f/01/220f016c154044a51abca097f7ecc4ea.jpg",
    pixelHeight: 354,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/14/3a/8c/143a8c283ecaecbf90058ac0f914a1ed.jpg",
    pixelHeight: 176,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/3d/65/6f/3d656f63189290a84d906b92d0d1565d.jpg",
    pixelHeight: 571,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/7a/2c/f2/7a2cf28357e37a95dfac3d273ef9cb0a.jpg",
    pixelHeight: 265,
    pixelWidth: 190
  },
  {
    url:
      "https://i.pinimg.com/236x/57/f2/c5/57f2c55991b7173ffa9056c413cae260.jpg",
    pixelHeight: 744,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/e0/d3/85/e0d385c22794dc2140639ffc73257047.jpg",
    pixelHeight: 354,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/b2/bf/d8/b2bfd8cb9ecb96982de45d96ef5f5801.jpg",
    pixelHeight: 249,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/c3/73/2a/c3732abb95e790432a0208097c4e662e.jpg",
    pixelHeight: 314,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/24/1b/5e/241b5eb929d7353e7a85c37cffad4027.jpg",
    pixelHeight: 188,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/8b/73/b9/8b73b932a9d73ae7e17f3ccc8fc4029c.jpg",
    pixelHeight: 156,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/88/a8/4d/88a84d09003aae699bde89d888428642.jpg",
    pixelHeight: 361,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/3c/ca/4f/3cca4f233f253b4ca72010f5200cb372.jpg",
    pixelHeight: 249,
    pixelWidth: 202
  },
  {
    url:
      "https://i.pinimg.com/236x/35/50/b5/3550b5659e25022e8af69fb8f6417e13.jpg",
    pixelHeight: 1137,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/ba/2d/f9/ba2df9aa774329560f3ee48fc947a299.jpg",
    pixelHeight: 785,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/f0/45/4d/f0454d0a5047ba3c73a50cc8c9d80bba.jpg",
    pixelHeight: 353,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/d8/64/ca/d864cad4ec4d9cfb1a08202a887bb175.jpg",
    pixelHeight: 353,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/2d/f4/91/2df491590161974dc461767bd405de8e.jpg",
    pixelHeight: 405,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/c6/6d/02/c66d0236627dbb979f8b1c1b5cc3e8fb.jpg",
    pixelHeight: 354,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/bd/3c/35/bd3c35762f8174decf01096f980c10e0.jpg",
    pixelHeight: 236,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/90/0a/49/900a49c038c9759f79ddccbf6a82c499.jpg",
    pixelHeight: 480,
    pixelWidth: 230
  },
  {
    url:
      "https://i.pinimg.com/236x/13/24/2f/13242f1e28dfe2e590859107d31758a1.jpg",
    pixelHeight: 300,
    pixelWidth: 225
  },
  {
    url:
      "https://i.pinimg.com/236x/cc/da/2a/ccda2a351bb00a0267bb98e6bc8067eb.jpg",
    pixelHeight: 577,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/a7/1e/97/a71e9712083d908d31d55ada64598125.jpg",
    pixelHeight: 394,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/2d/cf/1e/2dcf1eca1f7329f45b4ecc572841b0f7.jpg",
    pixelHeight: 187,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/d5/32/b3/d532b398c2c824bace748d5c876e0d1f.jpg",
    pixelHeight: 975,
    pixelWidth: 236
  },
  {
    url:
      "https://i.pinimg.com/236x/4f/a3/44/4fa3442fd9a7e2da25ddaddb968b6d0a.jpg",
    pixelHeight: 328,
    pixelWidth: 236
  }
];

const dataGrid2 = [...new Array(12).keys()];

// column width (relative to screen size)
const sizes2 = { sm: 100, md: 50, lg: 33.333, xl: 25 };

let els = {};

const hide = id => {
  els[id].hide();
};

const showAll = e => {
  Object.keys(els).forEach(id => {
    els[id].show();
  });
};

const Item2 = props => {
  return (
    <AnterosLayoutColumn
      ref={col => (props.els[props.id] = col)}
      smSize={sizes2.sm}
      mdSize={sizes2.md}
      lgSize={sizes2.lg}
      xlSize={sizes2.xl}
      style={{ backgroundColor: colorsGrid[props.id] }}
    >
      <AnterosLayoutRow
        smSizePoints={
          props.state.layout.grid ? props.state.layout.grid.height / 2 : 0
        }
        mdSizePoints={
          props.state.layout.grid ? props.state.layout.grid.width / 2 : 0
        }
        lgSizePoints={
          props.state.layout.grid ? props.state.layout.grid.width / 3 : 0
        }
        xlSizePoints={
          props.state.layout.grid ? props.state.layout.grid.width / 4 : 0
        }
        alignLines="stretch"
      >
        <AnterosLayoutColumn fullWidth>
          <AnterosLayoutRow rtl>
            <AnterosLayoutColumn fullWidth offsetPoints={10}>
              <TouchableOpacity
                onPress={() => {
                  props.hide(props.id);
                }}
              >
                <AnterosText style={{ fontSize: 22, marginTop: 15 }}>
                  X
                </AnterosText>
              </TouchableOpacity>
            </AnterosLayoutColumn>
          </AnterosLayoutRow>
        </AnterosLayoutColumn>
        <AnterosLayoutColumn fullWidth hAlign="center">
          <AnterosText style={{ fontSize: 48, marginTop: 5 }}>
            {props.id}
          </AnterosText>
        </AnterosLayoutColumn>
      </AnterosLayoutRow>
    </AnterosLayoutColumn>
  );
};

class GridLayout2 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Universal tiles",
    showBackButton: true
  };

  constructor(props) {
    super(props);
    AnterosLayout.resetBreakPoints();
    this.buildLayout = this.buildLayout.bind(this);
  }

  componentDidMount(){
    AnterosLayout.resetBreakPoints();
  }

  componentWillReceiveProps(nextProps){
    AnterosLayout.resetBreakPoints();
  }

  buildLayout(state) {
    return dataGrid2.map(i => {
      return [<Item2 key={i} id={i} els={els} hide={hide} state={state} />];
    });
  }

  renderPage() {
    return (
      <AnterosLayoutGrid>
        {({ state, setState }) => {
          return (
            <AnterosLayoutColumn
              fullHeight
              style={{ backgroundColor: "lightgray" }}
            >
              <ScrollView removeClippedSubviews={true}>
                <TouchableOpacity activeOpacity={1} onPress={e => showAll(e)}>
                  <AnterosLayoutRow>{this.buildLayout(state)}</AnterosLayoutRow>
                </TouchableOpacity>
              </ScrollView>
            </AnterosLayoutColumn>
          );
        }}
      </AnterosLayoutGrid>
    );
  }
}

const colorsGrid = [
  "lightyellow",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "pink",
  "orange",
  "yellow",
  "lime",
  "lightgreen",
  "purple",
  "magenta",
  "gold"
];





class GridLayout3 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Responsive break points",
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.setBreakPoints = this.setBreakPoints.bind(this);    
  }

  componentDidMount(){
    this.setBreakPoints();
  }

  componentWillReceiveProps(nextProps){
    this.setBreakPoints();
  }

  setBreakPoints(){
    AnterosLayout.setBreakPoints({
      SMALL_Width: 414,
      MEDIUM_Width: 600,
      LARGE_Width: 1024
    })
  }

  renderPage(){
    return (<AnterosLayoutRow style={{borderBottomColor: 'lightgray',paddingTop: 10, paddingBottom: 10, backgroundColor: 'white',  borderBottomWidth: 1}}>
              <AnterosLayoutColumn size={80} offset={6}>
                <AnterosLayoutRow>
                  <AnterosLayoutColumn size={50} smSize={100}>      
                    <AnterosText style={{fontSize: 15, color: '#BD1206', fontWeight:'bold'}}>March 9, 2017</AnterosText>
                    <AnterosLayoutRow>
                      <AnterosLayoutColumn size={5}>
                        <AnterosIcon type="font-awesome"  name='cutlery' size={17} color='gray'/>
                      </AnterosLayoutColumn>
                      <AnterosLayoutColumn size={60} offset={2.5}>
                        <AnterosText style={{fontSize: 12, color: 'gray', lineHeight: 20}}>TAKEOUT ORDER</AnterosText>
                      </AnterosLayoutColumn>
                    </AnterosLayoutRow>
                  </AnterosLayoutColumn>
                  <AnterosLayoutColumn size={50} smSize={100}>
                    <AnterosText style={{fontSize: 16, color: '#0a0a0a'}}>Double Cheese Burger</AnterosText>                                                                          
                  </AnterosLayoutColumn>
                </AnterosLayoutRow>
              </AnterosLayoutColumn>
              <AnterosLayoutColumn size={14} offset={-6} hAlign='right'>
                    <AnterosIcon type="material" name="keyboard-arrow-right" size={28} color="#BD1206" style={{left: 5}} />
              </AnterosLayoutColumn>
            </AnterosLayoutRow>);
  }
}


let j = 0
const randomUsers = (count = 10) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      key: faker.random.uuid(),
      date: faker.date.weekday(),
      name: faker.name.firstName(),
      job: faker.name.jobTitle(),
      index: j++
    })
  }
  return arr
}

class GridLayout4 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "FlatList + Row & Column Wrapping",
    showBackButton: true
  };

  constructor(props) {
    super(props);  
    this.onEndReached = this.onEndReached.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      refreshing: false,
      data: randomUsers(10),
    };
  }

  onEndReached(){
    const data = [
        ...this.state.data,
        ...randomUsers(10),
      ]

    this.setState(state => ({
      data
    }));
  };

  onRefresh(){
    this.setState({
      data: randomUsers(10),
    });
  }

  renderPage(){
    return (<FlatList
      data={this.state.data}
      initialNumToRender={10}
      onEndReachedThreshold={1}
      onEndReached={this.onEndReached}
      refreshing={this.state.refreshing}
      onRefresh={this.onRefresh}
      renderItem={
        ({ item }) => {
          return (
            <AnterosLayoutRow key={item.key} style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
              <AnterosLayoutColumn size={80} offset={6} >
                <AnterosLayoutRow>
                  <AnterosLayoutColumn size={60} smSize={100}>
                    <AnterosText style={{fontSize: 15, color: '#BD1206', fontWeight:'bold'}}>{String(item.date)}</AnterosText>
                    <AnterosLayoutRow>
                      <AnterosLayoutColumn size={10}>
                        <AnterosIcon type='material' name='person' size={17} color='gray'/>
                      </AnterosLayoutColumn>
                      <AnterosLayoutColumn smSize={60} size={87.5} offset={2.5}>
                        <AnterosText style={{fontSize: 12, color: 'gray', lineHeight: 20}}>{item.job}</AnterosText>
                      </AnterosLayoutColumn>
                    </AnterosLayoutRow>
                  </AnterosLayoutColumn>
                  <AnterosLayoutColumn size={40} smSize={100}>
                    <AnterosText style={{fontSize: 16, color: '#0a0a0a'}}>{item.name}</AnterosText>
                  </AnterosLayoutColumn> 
                </AnterosLayoutRow>    
              </AnterosLayoutColumn>
              <AnterosLayoutColumn size={8} offset={-6} hAlign='right'>
                    <AnterosText>{item.index}</AnterosText>
              </AnterosLayoutColumn>
            </AnterosLayoutRow>
          )
        }}
    />);
  }
}



class GridLayout5 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Nested layout",
    showBackButton: true
  };

  constructor(props) {
    super(props);  
  }

  renderPage(){
    return (<AnterosLayoutRow>
            <AnterosLayoutColumn size={50} style={{borderWidth:1, borderColor:'gray', backgroundColor:'#FDD835'}}>
              <AnterosLayoutRow>
                <AnterosLayoutColumn size={50} style={{borderWidth:2, borderColor:'gray', backgroundColor:'#7CB342'}}>
                  <AnterosText>
                    This column is 25% of the outer view's width (or 25% of the screen width if
                    the top level Row has no parent)
                  </AnterosText>
                </AnterosLayoutColumn>
              </AnterosLayoutRow>
            </AnterosLayoutColumn>
        </AnterosLayoutRow>);
  }
}


class GridLayout6 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Normal LTR Markup",
    showBackButton: true
  };

  constructor(props) {
    super(props);  
  }

  renderPage(){
    return (<AnterosLayoutRow style={{paddingTop: 10, paddingBottom: 10, backgroundColor: '#f3f3f3', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
              <AnterosLayoutColumn size={60} offset={6} >
                <AnterosText style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
                PREVIOUS ORDERS
                </AnterosText>
              </AnterosLayoutColumn>
              <AnterosLayoutColumn size={30} hAlign='right'>
                <AnterosText style={{ fontSize: 16, color: '#BD1206'}}>
                  SEE ALL
                </AnterosText>
              </AnterosLayoutColumn>
          </AnterosLayoutRow>);
  }
}


class GridLayout7 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "RTL Markup",
    showBackButton: true
  };

  constructor(props) {
    super(props);  
  }

  renderPage(){
    return (<AnterosLayoutRow rtl style={{paddingTop: 10, paddingBottom: 10,backgroundColor: '#f3f3f3', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
              <AnterosLayoutColumn size={60} offset={4} >
                <AnterosText style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
                PREVIOUS ORDERS
                </AnterosText>
              </AnterosLayoutColumn>
              <AnterosLayoutColumn size={30} hAlign='left'>
                <AnterosText style={{ fontSize: 16, color: '#BD1206'}}>
                  SEE ALL
                </AnterosText>
              </AnterosLayoutColumn>
          </AnterosLayoutRow>);
  }
}


class GridLayout8 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "More Examples",
    showBackButton: true
  };

  constructor(props) {
    super(props);  
  }

  componentDidMount(){
    AnterosLayout.resetBreakPoints();
  }

  componentWillReceiveProps(nextProps){
    AnterosLayout.resetBreakPoints();
  }

  renderPage(){
    return (<View>
              <AnterosLayoutRow>
                <AnterosLayoutColumn smSize={50} mdSize={33.333} lgSize={25} style={{backgroundColor:"#F57C00"}}>
                    <AnterosText>First Column</AnterosText>
                </AnterosLayoutColumn>
              </AnterosLayoutRow>

              <AnterosLayoutRow style={{height: 100, backgroundColor:"#C0CA33"}}>
                <AnterosLayoutColumn style={{backgroundColor:"#FFD180"}} smOffset={0} mdOffset={10} lgOffset={20} xlOffset={40}>
                  <AnterosText>Test column...</AnterosText>
                </AnterosLayoutColumn>
              </AnterosLayoutRow>

              <AnterosLayoutRow style={{height: 200, backgroundColor:"#FFEB3B"}}>>
                <AnterosLayoutColumn smHidden style={{borderWidth:1, borderColor:"gray"}}>
                    <AnterosText>{"Column displayed when width is <= 480"}</AnterosText>
                </AnterosLayoutColumn>
                <AnterosLayoutColumn mdHidden lgHidden xlHidden style={{borderWidth:1, borderColor:"gray"}}>
                    <AnterosText>{"Column displayed when width is > 480"}</AnterosText>
                </AnterosLayoutColumn>
            </AnterosLayoutRow>
            </View>);
  }
}


class GridLayout9 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Two columns (50% and 50%)",
    showBackButton: true
  };

  constructor(props) {
    super(props);  
  }

  componentDidMount(){
    AnterosLayout.resetBreakPoints();
  }

  componentWillReceiveProps(nextProps){
    AnterosLayout.resetBreakPoints();
  }

  renderPage(){
    return (<View style={{flex: 1, flexDirection:'row', height:40}}>
      <View style={{borderColor:'red', borderWidth:2,
        alignSelf: 'center',
        alignItems: 'flex-start'}}>
        <AnterosButton title="TEste"></AnterosButton>
      </View>
      <View style={{flex: 1, borderColor:'green', borderWidth:2,
        alignSelf: 'center',
        alignItems: 'center'}}>
        <AnterosButton title="TEste1"></AnterosButton>
      </View>
      <View style={{borderColor:'blue', borderWidth:2,
        alignSelf: 'center',
        alignItems: 'flex-end'}}>
        <AnterosButton title="TEste2"></AnterosButton>
      </View>
    </View>);
  }
}