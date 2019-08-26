//https://github.com/idibidiart/react-native-responsive-grid

export { SizeInfo, withSizeInfo, withSizeClass } from "./wrappers/sizeInfo";
export {
  GridDimensions,
  withGridDimensions,
  withContainerDimensions
} from "./wrappers/gridDimensions";
export { calculateStretchLength, warn, checkInsideGrid } from "./utils";
import AnterosBlock from "./components/block";
import AnterosContent from "./components/content";
import AnterosSection from "./components/section";
import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import PropTypes from "prop-types";
import {
  Dimensions,
  ViewPropTypes,
  Platform,
  InteractionManager
} from "react-native";
const deviceHeight = Dimensions.get("window").height;

class Center extends Component {
  render() {
    return (
      <View
        style={[
          { flex: 1, alignItems: "center", justifyContent: "center" },
          this.props.style
        ]}
      >
        {this.props.children}
      </View>
    );
  }
}

class Fill extends Component {
  render() {
    return (
      <View style={[{ flex: 1 }, this.props.style]}>{this.props.children}</View>
    );
  }
}

class Right extends Component {
  render() {
    return (
      <View style={[{ flex: 1 }, this.props.style]}>{this.props.children}</View>
    );
  }
}

class Left extends Component {
  render() {
    return (
      <View style={[{ flex: 1 }, this.props.style]}>{this.props.children}</View>
    );
  }
}

class Footer extends Component {
  render() {
    return (
      <View style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
        {this.props.children}
      </View>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <View
        style={[
          { position: "absolute", top: 0, left: 0, right: 0 },
          this.props.style
        ]}
      >
        {this.props.children}
      </View>
    );
  }
}

class HorizontalLinearLayout extends Component {
  render() {
    return <View style={{ flexDirection: "row" }}>{this.props.children}</View>;
  }
}

class Overlay extends Component {
  render() {
    return (
      <View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "transparent"
          },
          this.props.style
        ]}
      >
        {this.props.children}
      </View>
    );
  }
}

class VerticalLinearLayout extends Component {
  render() {
    return (
      <View style={[{ flexDirection: "column" }, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}

const isHidden = (screenSize, props) => {
  switch (screenSize) {
    case "sm":
      return props.smHidden ? true : false;
    case "md":
      return props.mdHidden ? true : false;
    case "lg":
      return props.lgHidden ? true : false;
    case "xl":
      return props.xlHidden ? true : false;
    default:
      return false;
  }
};

const isExcludedByAspectRatio = (
  { aspectRatio },
  { currentNearestRatio, currentOrientation }
) => {
  if (aspectRatio !== undefined) {
    if (
      aspectRatio.ratio !== currentNearestRatio ||
      aspectRatio.orientation.toLowerCase() !== currentOrientation
    ) {
      return true;
    }
  }
  return false;
};

const toPercent = num => num + "%";

const getSize = (screenSize, props) => {
  switch (screenSize) {
    case "sm":
      if (props.smSize !== undefined || props.smSizePoints !== undefined) {
        if (props.smSize !== undefined)
          return toPercent(Math.max(props.smSize, 0));
        return props.smSizePoints;
      } else if (props.size !== undefined || props.sizePoints !== undefined) {
        if (props.size !== undefined) return toPercent(Math.max(props.size, 0));
        return props.sizePoints;
      } else {
        return undefined;
      }

    case "md":
      if (props.mdSize !== undefined || props.mdSizePoints) {
        if (props.mdSize !== undefined)
          return toPercent(Math.max(props.mdSize, 0));
        return props.mdSizePoints;
      } else if (props.size !== undefined || props.sizePoints !== undefined) {
        if (props.size !== undefined) return toPercent(Math.max(props.size, 0));
        return props.sizePoints;
      } else {
        return undefined;
      }

    case "lg":
      if (props.lgSize !== undefined || props.lgSizePoints !== undefined) {
        if (props.lgSize !== undefined)
          return toPercent(Math.max(props.lgSize, 0));
        return props.lgSizePoints;
      } else if (props.size !== undefined || props.sizePoints !== undefined) {
        if (props.size !== undefined) return toPercent(Math.max(props.size, 0));
        return props.sizePoints;
      } else {
        return undefined;
      }

    case "xl":
      if (props.xlSize !== undefined || props.xlSizePoints !== undefined) {
        if (props.xlSize !== undefined)
          return toPercent(Math.max(props.xlSize, 0));
        return props.xlSizePoints;
      } else if (props.size !== undefined || props.sizePoints !== undefined) {
        if (props.size !== undefined) return toPercent(Math.max(props.size, 0));
        return props.sizePoints;
      } else {
        return undefined;
      }
  }
};

const getOffset = (screenSize, props) => {
  switch (screenSize) {
    case "sm":
      if (props.smOffset !== undefined || props.smOffsetPoints) {
        if (props.smOffset !== undefined) return toPercent(props.smOffset);
        return props.smOffsetPoints;
      } else if (
        props.offset !== undefined ||
        props.offsetPoints !== undefined
      ) {
        if (props.offset !== undefined) return toPercent(props.offset);
        return props.offsetPoints;
      } else {
        return undefined;
      }

    case "md":
      if (props.mdOffset !== undefined || props.mdOffsetPoints !== undefined) {
        if (props.mdOffset !== undefined) return toPercent(props.mdOffset);
        return props.mdOffsetPoints;
      } else if (
        props.offset !== undefined ||
        props.offsetPoints !== undefined
      ) {
        if (props.offset !== undefined) return toPercent(props.offset);
        return props.offsetPoints;
      } else {
        return undefined;
      }

    case "lg":
      if (props.lgOffset !== undefined || props.lgOffsetPoints !== undefined) {
        if (props.lgOffset !== undefined) return toPercent(props.lgOffset);
        return props.lgOffsetPoints;
      } else if (
        props.offset !== undefined ||
        props.offsetPoints !== undefined
      ) {
        if (props.offset !== undefined) return toPercent(props.offset);
        return props.offsetPoints;
      } else {
        return undefined;
      }

    case "xl":
      if (props.xlOffset !== undefined || props.xlOffsetPoints !== undefined) {
        if (props.xlOffset !== undefined) return toPercent(props.xlOffset);
        return props.xlOffsetPoints;
      } else if (
        props.offset !== undefined ||
        props.offsetPoints !== undefined
      ) {
        if (props.offset !== undefined) return toPercent(props.offset);
        return props.offsetPoints;
      } else {
        return undefined;
      }
  }
};

const diff = (value, list, index) => Math.abs(value - list[index]);

// binary search in case we wish to let user specify a wide range of aspect ratios for
// the web/desktop version
const closest = (value, list) => {
  let start = 0;
  let end = list.length - 1;
  let mid = (end + start) >> 1;
  while (start < end && list[mid] !== value) {
    if (value < list[mid]) {
      end = mid - 1;
    } else if (value > list[mid]) {
      start = mid + 1;
    }
    mid = (end + start) >> 1;
  }

  let resultIndex;

  if (list[mid] === value) {
    resultIndex = mid;
  } else {
    const prev = mid - 1;
    const next = mid + 1;

    if (prev < 0) {
      resultIndex =
        diff(value, list, mid) < diff(value, list, next) ? mid : next;
    } else if (next >= list.length) {
      resultIndex =
        diff(value, list, prev) < diff(value, list, mid) ? prev : mid;
    } else {
      if (diff(value, list, prev) < diff(value, list, mid)) {
        resultIndex =
          diff(value, list, prev) < diff(value, list, next) ? prev : next;
      } else {
        resultIndex =
          diff(value, list, mid) < diff(value, list, next) ? mid : next;
      }
    }
  }

  return { index: resultIndex, value: list[resultIndex] };
};

let mediaSizeWidth, mediaSizeHeight;

const defaultBreakPoints = {
  SMALL_Width: 375,
  MEDIUM_Width: 767,
  LARGE_Width: 1023,
  // XLARGE_Width: 1024+
  SMALL_Height: 667,
  MEDIUM_Height: 1023,
  LARGE_Height: 1365
  // XLARGE_Height: 1366+
}

let breakPoints = {...defaultBreakPoints};

const setBreakPoints = newBreakPoints => {
  breakPoints = { ...breakPoints, ...newBreakPoints };
};

const resetBreakPoints = () => {
  breakPoints = { ...defaultBreakPoints };
};

let _screenInfo = null,
  _screenWidth = null,
  _screenHeight = null;

export const AnterosScreenInfo = () => {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const SCREEN_HEIGHT = Dimensions.get("window").height;

  // no need to recompute everything if width/height haven't changed
  if (_screenWidth === SCREEN_WIDTH && _screenHeight === SCREEN_HEIGHT) {
    return _screenInfo;
  }
  _screenWidth = SCREEN_WIDTH;
  _screenHeight = SCREEN_HEIGHT;

  if (SCREEN_WIDTH <= breakPoints.SMALL_Width) {
    // 0 to SMALL_Width
    mediaSizeWidth = "sm";
  } else if (SCREEN_WIDTH <= breakPoints.MEDIUM_Width) {
    // SMALL_Width + 1 to MEDIUM_Width
    mediaSizeWidth = "md";
  } else if (SCREEN_WIDTH <= breakPoints.LARGE_Width) {
    // MEDIUM_Width + 1 to LARGE_Width
    mediaSizeWidth = "lg";
  } else {
    // > LARGE_Width (aka XLARGE_Width)
    mediaSizeWidth = "xl";
  }

  if (SCREEN_HEIGHT <= breakPoints.SMALL_Height) {
    // 0 to SMALL_Height
    mediaSizeHeight = "sm";
  } else if (SCREEN_HEIGHT <= breakPoints.MEDIUM_Height) {
    // SMALL_Height + 1 to LARGE_Height
    mediaSizeHeight = "md";
  } else if (SCREEN_HEIGHT <= breakPoints.LARGE_Height) {
    // LARGE_Height + 1 to XLARGE_Height
    mediaSizeHeight = "lg";
  } else {
    // > LARGE_Height (aka XLARGE_Height)
    mediaSizeHeight = "xl";
  }

  // sorted ascending order
  const decimalRatios = [0.56, 0.625, 0.66, 0.75, 1, 1.33, 1.5, 1.6, 1.77];
  // values in aspetcRatios array must map 1:1 order-wise to values in decimalRatios array
  const aspectRatios = [
    "16:9",
    "16:10",
    "3:2",
    "4:3",
    "1:1",
    "4:3",
    "3:2",
    "16:10",
    "16:9"
  ];
  const currentFloatRatio = SCREEN_WIDTH / SCREEN_HEIGHT;
  const currentDecimalRatio = closest(currentFloatRatio, decimalRatios);
  const currentNearestRatio = aspectRatios[currentDecimalRatio.index];

  let currentOrientation;

  if (currentDecimalRatio.value == 1) {
    currentOrientation = "square";
  } else if (currentDecimalRatio.value > 1) {
    currentOrientation = "landscape";
  } else {
    currentOrientation = "portrait";
  }

  _screenInfo = {
    mediaSize: mediaSizeWidth,
    mediaSizeWidth,
    mediaSizeHeight,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    aspectRatio: { currentNearestRatio, currentOrientation }
  };
  return _screenInfo;
};

export class AnterosLayoutGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props.state, layout: {} };
    this.animFrame;
    this.unmounting = false;
  }

  componentWillUnmount = () => {
    this.unmounting = true;
    cancelAnimationFrame(this.animFrame);
  };

  callback = e => {
    // callback to runAfterInteractions is async
    // so onLayout might be triggered before component is unmounted
    // and it mifht schedule rAF after component is unmounted
    // so cAF in componentWillUnmount would then miss that rFA
    if (this.unmounting) return;

    const layout = {
      screen: AnterosScreenInfo(),
      grid: e.nativeEvent.layout
    };
    this.setState(state => {
      return { ...state, layout };
    });
  };

  render() {
    return (
      <View
        style={[
          {
            flex: 1
          },
          this.props.style
        ]}
        onLayout={e => {
          e.persist();
          InteractionManager.runAfterInteractions(() => {
            // avoid queuing up rAF tasks
            cancelAnimationFrame(this.animFrame);
            this.animFrame = requestAnimationFrame(() => {
              this.callback(e);
            });
          });
        }}
      >
        {this.props.children({
          state: this.state,
          setState: (...args) => this.setState(...args)
        })}
      </View>
    );
  }
}

export class AnterosLayoutRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.hidden = false;
    this.shown = true;
  }

  hide = () => {
    this.setState(state => {
      this.hidden = true;
      this.shown = false;
      return { ...state, display: "none" };
    });
  };

  show = () => {
    this.setState(state => {
      this.shown = true;
      this.hidden = false;
      return { ...state, display: "flex" };
    });
  };

  cloneElements = () => {
    if (
      isHidden(this.screenInfo.mediaSizeHeight, this.props) ||
      isExcludedByAspectRatio(this.props, this.screenInfo.aspectRatio)
    ) {
      return null;
    }

    const rtl = this.props.rtl;
    return React.Children.map(
      rtl
        ? React.Children.toArray(this.props.children).reverse()
        : this.props.children,
      element => {
        if (!element) return null;
        if (element.type && element.type.name === "Row") {
          if (__DEV__)
            console.error(
              "Row may not contain other Rows as children. Child rows must be wrapped in a Column."
            );
          return null;
        } else if (element.type && element.type.name === "Column") {
          return React.cloneElement(element, [{ rtl }]);
        } else {
          return element;
        }
      }
    );
  };

  setNativeProps = nativeProps => {
    this._root.setNativeProps(nativeProps);
  };

  static propTypes = {
    rtl: PropTypes.bool,
    noWrap: PropTypes.bool,
    hAlign: PropTypes.oneOf([
      "space",
      "distribute",
      "center",
      "middle",
      "left",
      "right"
    ]),
    vAlign: PropTypes.oneOf([
      "stretch",
      "middle",
      "center",
      "top",
      "bottom",
      "baseline"
    ]),
    alignSelf: PropTypes.oneOf([
      "auto",
      "left",
      "right",
      "center",
      "middle",
      "stretch"
    ]),
    fullHeight: PropTypes.bool,
    alignLines: PropTypes.string,
    size: PropTypes.number,
    smSize: PropTypes.number,
    mdSize: PropTypes.number,
    lgSize: PropTypes.number,
    xlSize: PropTypes.number,
    sizePoints: PropTypes.number,
    smSizePoints: PropTypes.number,
    mdSizePoints: PropTypes.number,
    lgSizePoints: PropTypes.number,
    xlSizePoints: PropTypes.number,
    aspectRatio: PropTypes.object
  };

  render() {
    const {
      rtl,
      fullHeight,
      noWrap,
      hAlign,
      vAlign,
      alignLines,
      alignSelf,
      size,
      smSize,
      mdSize,
      lgSize,
      xlSize,
      sizePoints,
      smSizePoints,
      mdSizePoints,
      lgSizePoints,
      xlSizePoints,
      aspectRatio,
      ...rest
    } = this.props;

    this.screenInfo = AnterosScreenInfo();

    this.wrapState = noWrap ? "nowrap" : "wrap";
    this.flex =
      this.props.style && this.props.style.flex !== undefined
        ? this.props.style.flex
        : 0;

    if (rtl && !hAlign) {
      this.hAlign = "flex-end";
    } else {
      switch (hAlign) {
        case "space":
          this.hAlign = "space-between";
          break;
        case "distribute":
          this.hAlign = "space-around";
          break;
        case "center":
        case "middle":
          this.hAlign = "center";
          break;
        case "right":
          this.hAlign = "flex-end";
          break;
        case "left":
          this.hAlign = "flex-start";
          break;
        default:
          this.hAlign = "flex-start";
      }
    }

    switch (vAlign) {
      case "stretch":
        this.vAlign = "stretch";
        break;
      case "middle":
      case "center":
        this.vAlign = "center";
        break;
      case "bottom":
        this.vAlign = "flex-end";
        break;
      case "baseline":
        this.vAlign = "baseline";
        break;
      case "top":
        this.vAlign = "flex-start";
      default:
        this.vAlign = "stretch";
    }

    switch (alignLines) {
      case "top":
        this.alignLines = "flex-start";
        break;
      case "bottom":
        this.alignLines = "flex-end";
        break;
      case "middle":
      case "center":
        this.alignLines = "center";
        break;
      case "space":
        this.alignLines = "space-between";
        break;
      case "distribute":
        this.alignLines = "space-around";
        break;
      case "stretch":
        this.alignLines = "stretch";
        break;
      default:
        this.alignLines = "stretch";
    }

    switch (alignSelf) {
      case "left":
        this.alignSelf = "flex-start";
        break;
      case "right":
        this.alignSelf = "flex-end";
        break;
      case "center":
      case "middle":
        this.alignSelf = "center";
        break;
      case "stretch":
        this.alignLines = "stretch";
        break;
      default:
        this.alignSelf = "auto";
    }

    return (
      <View
        {...rest}
        ref={component => (this._root = component)}
        style={[
          this.props.style,
          {
            display: this.state.display || "flex",
            flex: this.flex,
            flexDirection: "row",
            height: this.props.fullHeight
              ? "100%"
              : this.props.style && this.props.style.height !== undefined
                ? this.props.style.height
                : this.props.size !== undefined ||
                  this.props.sizePoints !== undefined ||
                  this.props[this.screenInfo.mediaSizeHeight + "Size"] !==
                    undefined ||
                  this.props[this.screenInfo.mediaSizeHeight + "SizePoints"] !==
                    undefined
                  ? getSize(this.screenInfo.mediaSizeHeight, this.props)
                  : undefined,
            alignContent: this.alignLines,
            flexWrap: this.wrapState,
            alignItems: this.vAlign,
            justifyContent: this.hAlign,
            alignSelf: this.alignSelf,
            position:
              this.props.style && this.props.style.position
                ? this.props.style.position
                : "relative",
            overflow: "hidden"
          }
        ]}
      >
        {this.cloneElements()}
      </View>
    );
  }
}

export class AnterosLayoutColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setNativeProps = nativeProps => {
    this._root.setNativeProps(nativeProps);
  };

  hide = () => {
    this.setState(state => {
      this.hidden = true;
      return { ...state, display: "none" };
    });
  };

  show = () => {
    this.setState(state => {
      this.shown = true;
      return { ...state, display: "flex" };
    });
  };

  cloneElements = () => {
    if (
      isHidden(this.screenInfo.mediaSizeWidth, this.props) ||
      isExcludedByAspectRatio(this.props, this.screenInfo.aspectRatio)
    ) {
      return null;
    }

    return React.Children.map(this.props.children, element => {
      if (!element) return null;
      if (element.type && element.type.name === "Column") {
        if (__DEV__)
          console.error(
            "Column may not contain other Columns as children. Child columns must be wrapped in a Row."
          );
        return null;
      }
      return element;
    });
  };

  static propTypes = {
    size: PropTypes.number,
    sizePoints: PropTypes.number,
    offset: PropTypes.number,
    offsetPoints: PropTypes.number,
    smSize: PropTypes.number,
    smSizePoints: PropTypes.number,
    smOffset: PropTypes.number,
    smOffsetPoints: PropTypes.number,
    smHidden: PropTypes.bool,
    mdSize: PropTypes.number,
    mdSizePoints: PropTypes.number,
    mdOffset: PropTypes.number,
    mdOffsetPoints: PropTypes.number,
    mdHidden: PropTypes.bool,
    lgSize: PropTypes.number,
    lgSizePoints: PropTypes.number,
    lgOffset: PropTypes.number,
    lgOffsetPoints: PropTypes.number,
    lgHidden: PropTypes.bool,
    xlSize: PropTypes.number,
    xlSizePoints: PropTypes.number,
    xlOffset: PropTypes.number,
    xlOffsetPoints: PropTypes.number,
    xlHidden: PropTypes.bool,
    vAlign: PropTypes.oneOf([
      "space",
      "distribute",
      "middle",
      "center",
      "bottom",
      "top"
    ]),
    hAlign: PropTypes.oneOf(["stretch", "center", "middle", "right", "left"]),
    alignSelf: PropTypes.oneOf([
      "auto",
      "top",
      "bottom",
      "middle",
      "center",
      "stretch",
      "baseline"
    ]),
    fullWidtht: PropTypes.bool,
    aspectRatio: PropTypes.object
  };

  render() {
    const {
      size,
      sizePoints,
      offset,
      offsetPoints,
      smSize,
      smSizePoints,
      smOffset,
      smOffsetPoints,
      smHidden,
      mdSize,
      mdSizePoints,
      mdOffset,
      mdOffsetPoints,
      mdHidden,
      lgSize,
      lgSizePoints,
      lgOffset,
      lgOffsetPoints,
      lgHidden,
      xlSize,
      xlSizePoints,
      xlOffset,
      xlOffsetPoints,
      xlHidden,
      vAlign,
      hAlign,
      alignSelf,
      rtl,
      fullWidth,
      aspectRatio,
      ...rest
    } = this.props;

    this.screenInfo = AnterosScreenInfo();

    this.flex =
      this.props.style && this.props.style.flex !== undefined
        ? this.props.style.flex
        : 0;

    switch (vAlign) {
      case "space":
        this.vAlign = "space-between";
        break;
      case "distribute":
        this.vAlign = "space-around";
        break;
      case "middle":
      case "center":
        this.vAlign = "center";
        break;
      case "bottom":
        this.vAlign = "flex-end";
        break;
      default:
        this.vAlign = "flex-start";
    }

    if (rtl && !hAlign) {
      this.hAlign = "flex-end";
    } else {
      switch (hAlign) {
        case "stretch":
          this.hAlign = "stretch";
          break;
        case "center":
        case "middle":
          this.hAlign = "center";
          break;
        case "left":
          this.hAlign = "flex-start";
          break;
        case "right":
          this.hAlign = "flex-end";
          break;
        default:
          this.hAlign = "stretch";
      }
    }

    switch (alignSelf) {
      case "stretch":
        this.alignSelf = "stretch";
        break;
      case "middle":
      case "center":
        this.alignSelf = "center";
        break;
      case "top":
        this.alignSelf = "flex-start";
        break;
      case "bottom":
        this.alignSelf = "flex-end";
        break;
      case "baseline":
        this.alignSelf = "baseline";
        break;
      default:
        this.alignSelf = "auto";
    }

    this.style = {
      display: this.state.display || "flex",
      flex: this.flex,
      width: this.props.fullWidth
        ? "100%"
        : this.props.style && this.props.style.width !== undefined
          ? this.props.style.width
          : this.props.size !== undefined ||
            this.props.sizePoints !== undefined ||
            this.props[this.screenInfo.mediaSizeWidth + "Size"] !== undefined ||
            this.props[this.screenInfo.mediaSizeWidth + "SizePoints"] !==
              undefined
            ? getSize(this.screenInfo.mediaSizeWidth, this.props)
            : undefined,
      flexDirection: "column",
      marginLeft:
        this.props.style && this.props.style.marginLeft !== undefined
          ? this.props.style.marginLeft
          : !this.props.rtl &&
            (this.props.offset !== undefined ||
              this.props.offsetPoints !== undefined ||
              this.props[this.screenInfo.mediaSizeWidth + "Offset"] !==
                undefined ||
              this.props[this.screenInfo.mediaSizeWidth + "OffsetPoints"] !==
                undefined)
            ? getOffset(this.screenInfo.mediaSizeWidth, this.props)
            : undefined,
      marginRight:
        this.props.style && this.props.style.marginRight !== undefined
          ? this.props.style.marginRight
          : this.props.rtl &&
            (this.props.offset !== undefined ||
              this.props.offsetPoints !== undefined ||
              this.props[this.screenInfo.mediaSizeWidth + "Offset"] !==
                undefined ||
              this.props[this.screenInfo.mediaSizeWidth + "OffsetPoints"] !==
                undefined)
            ? getOffset(this.screenInfo.mediaSizeWidth, this.props)
            : undefined,
      alignItems: this.hAlign,
      justifyContent: this.vAlign,
      alignSelf: this.alignSelf,
      position:
        this.props.style && this.props.style.position
          ? this.props.style.position
          : "relative",
      overflow: "hidden"
    };

    try {
      return (
        <View
          {...rest}
          ref={component => (this._root = component)}
          style={[this.props.style, this.style]}
        >
          {this.cloneElements()}
        </View>
      );
    } catch (e) {
      if (__DEV__) {
        console.error(e);
      }
      return null;
    }
  }
}

class AnterosContainer extends Component {
  render() {
    let { scrollable, style, otherProps } = this.props;
    if (scrollable) {
      return (
        <ScrollView
          ref={c => (this._root = c)}
          style={[styleContainer, style]}
          {...otherProps}
        >
          {this.props.children}
        </ScrollView>
      );
    } else {
      return (
        <View
          ref={c => (this._root = c)}
          style={[styleContainer, style]}
          {...otherProps}
        >
          {this.props.children}
        </View>
      );
    }
  }
}

AnterosContainer.propTypes = {
  ...ViewPropTypes,
  style: ViewPropTypes.style,
  scrollable: PropTypes.bool.isRequired
};

AnterosContainer.defaultProps = {
  scrollable: false
};

const styleContainer = {
  flex: 1,
  height: Platform.OS === "ios" ? deviceHeight : deviceHeight - 20
};

const AnterosLayout = function() {};

AnterosLayout.Center = Center;
AnterosLayout.Right = Right;
AnterosLayout.Left = Left;
AnterosLayout.Header = Header;
AnterosLayout.Footer = Footer;
AnterosLayout.Grid = AnterosLayoutGrid;
AnterosLayout.Row = AnterosLayoutRow;
AnterosLayout.Column = AnterosLayoutColumn;
AnterosLayout.ScreenInfo = AnterosScreenInfo;
AnterosLayout.setBreakPoints = setBreakPoints;
AnterosLayout.resetBreakPoints = resetBreakPoints;

export {
  AnterosContainer,
  AnterosContent,
  AnterosSection,
  AnterosBlock,
  AnterosLayout
};

