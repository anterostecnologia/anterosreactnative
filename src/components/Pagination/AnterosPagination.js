import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  ActivityIndicator,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity
} from "react-native";
import _ from "lodash";

const { width, height } = Dimensions.get("window");

import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Zocial from 'react-native-vector-icons/Zocial'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import PropTypes from "prop-types";

//helper functions

/**
 * gets max and min pads. should look something like this [0, -1, -2, 2, 3, 4]
 * if [0,1] are viewable and paginationItemPadSize is 3
 * list items are active when only one should be.
 */
const getVisibleArrayIndexes = (
  paginationVisibleItems,
  paginationVisibleItemsIndexList,
  paginationItemPadSize
) => {
  let preIniquePaddedIndexList = [
    ..._.times(
      paginationItemPadSize,
      i => _.min(paginationVisibleItemsIndexList) - (i + 1)
    ),
    ..._.times(
      paginationItemPadSize,
      i => _.max(paginationVisibleItemsIndexList) + (i + 1)
    )
  ];
  let uniquePaddedIndexList = preIniquePaddedIndexList.map((num, i) => {
    if (num < 0) return _.max(paginationVisibleItemsIndexList) + (num *= -1);
    else return num;
  });
  return _.uniq(uniquePaddedIndexList);
};

// export class Pagination extends Component {
export class AnterosPagination extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderDot = this.renderDot.bind(this);
  }

  renderDot(o, i) {
    let {
      paginationDotStyle,
      showEmptyDots,
      iconSet,
      lightTheme,
      onPress,
      paginationItems
    } = this.props;
    let color = "rgba(0,0,0,0.5)";
    if (lightTheme) {
      color = "rgba(255,255,255,0.5)";
    }

    let text = "";
    if (o.index !== undefined) {
      text = o.index + 1;
    } else {
      if (!showEmptyDots) return;
    }

    if (!onPress) {
      if (paginationItems.length === o.index + 1)
        onPress = () => {
          try {
            this.props.refs.scrollToEnd();
          } catch (e) {
            console.warn(" e: ", e);
          }
        };
      else
        onPress = () => {
          try {
            this.props.refs.scrollToItem(o);
          } catch (e) {
            console.log(" e: ", e);
          }
        };
    }
    return (
      <AnterosPaginationDot
        onPress={onPress}
        refs={this.props.refs}
        color={color}
        iconSet={iconSet}
        name={o.isViewable ? "circle-outline" : "circle"}
        isViewable={o.isViewable}
        size={o.isViewable ? 20 : 15}
        textStyle={{ color, fontSize: o.isViewable ? 15 : 10 }}
        text={text}
        style={[paginationDotStyle]}
      />
    );
  }
  render() {
    let {
      iconFamily,
      textStyle,
      containerStyle,
      nextButtonStyle,
      backButtonStyle,
      backwardStyle,
      dotStyle,
      backText,
      backStyle,
      nextText,
      nextStyle,
      paginationItemPadSize,

      paginationItems,
      horizontal,
      startDotStyle,
      endDotStyle,
      debugMode,
      dotAnimation,
      paginationStyle,
      pagingEnabled,
      lightTheme,
      onPressPaginationDot,
      paginationVisibleItems,
      loadingComponent,
      paginationDot,
      hideEmptyDots
    } = this.props;
    let paginationDotCallback =
      this.props.paginationDotCallback || function() {};
    let startDotCallback = this.props.startDotCallback || function() {};

    let renderDot = this.props.renderDot || this.renderDot;

    /**
     * set theme
     */
    let color = "rgba(0,0,0,0.5)";
    if (lightTheme) {
      color = "rgba(255,255,255,0.5)";
    }
    /**
     * set horizontal
     */
    if (horizontal === true) style = s.horizontalStyle;
    else style = s.verticalStyle;

    if (paginationStyle) style = paginationStyle;

    /**
     * return loading if no paginationItems
     */

    if (!paginationItems.length) {
      if (!loadingComponent)
        return (
          <View
            style={[
              style,
              s.center,
              {
                width: horizontal === true ? width : 40,
                height: horizontal === false ? height : 30,
                backgroundColor: "transparent"
              }
            ]}
          >
            <ActivityIndicator color={color} />
          </View>
        );
      else
        return (
          <View
            style={[
              {
                width: horizontal === true ? width : 40,
                height: horizontal === false ? height : 30
              }
            ]}
          >
            {React.cloneElement(loadingComponent, { style })}
          </View>
        );
    }

    paginationItems = paginationItems.map((item, i) => {
      item.index = i;
      return item;
    });
    let paginationVisibleItemsIndexList = [];

    /**
     * fix issue where it says two visable
     * list items are active when only one should be.
     */
    if (pagingEnabled) {
      let indexMap = paginationVisibleItems.map(i => i.index);
      if (indexMap.length > 1) {
        paginationVisibleItems = paginationVisibleItems.map(o => {
          if (o.index !== _.max(indexMap)) return o;
          return Object.assign(
            {},
            {
              index: _.get(o, `index`),
              key: _.get(o, `key`),
              item: _.get(o, `item`, {}),
              isViewable: false
            }
          );
        });
      }

      paginationVisibleItemsIndexList = paginationVisibleItems;
    } else
      paginationVisibleItemsIndexList = paginationVisibleItems.map(
        i => i.index
      );

    /**
     * gets max and min pads. should look something like this [0, -1, -2, 2, 3, 4]
     * if [0,1] are viewable and paginationItemPadSize is 3
     * list items are active when only one should be.
     */
    if (paginationVisibleItems.length)
      paginationVisibleItemsIndexList = paginationVisibleItems.map(
        i => i.index
      );
    let paginationVisableItemsIndexArray = getVisibleArrayIndexes(
      paginationVisibleItems,
      paginationVisibleItemsIndexList,
      paginationItemPadSize
    );
    let paginationVisiblePadItems = paginationVisableItemsIndexArray.map(
      (o, i) =>
        Object.assign(
          {},
          {
            index: _.get(paginationItems, `[${o}].index`),
            key: _.get(paginationItems, `[${o}].index`),
            item: _.get(paginationItems, `[${o}]`, {}),
            isViewable: false
          }
        )
    );
    let flatListPaginationItems = _.sortBy(
      [...paginationVisibleItems, ...paginationVisiblePadItems],
      "index"
    );

    /**
     * log dev tool
     */
    if (debugMode) {
      let paginationItemsIndexList = paginationItems.map(i => i.index);
      let allDotsIndexList = flatListPaginationItems.map(i => i.index);
      let NOT_ACTIVE_DOTS_INDEXES = _.sortBy(
        paginationVisiblePadItems.map(i => i.index)
      );
      let ALL_DOTS_INDEXES = flatListPaginationItems.map(i => i.isViewable);
      let ___ = `%c __________________________________________\n`;
      let ADBY = `%c all paginationVisibleItems dots:              ${allDotsIndexList} \n`;
      let ADI = `%c active paginationVisibleItems dots:           ${paginationVisibleItemsIndexList} \n`;
      let ANDI = `%c not active dots: (padding):    ${NOT_ACTIVE_DOTS_INDEXES} \n`;
      let ADI_ISVIEWABLE = `%c each "paginationVisibleItems dots" "isViewable" attribute:\n                      ${ALL_DOTS_INDEXES} \n`;
      let AID = `%c all "paginationItems"'s':       ${paginationItemsIndexList} \n`;
      console.log(
        "\n\n%cReact Native Pagination" +
          "%c \ndebugMode: ON\n" +
          ___ +
          ADBY +
          ADI +
          ANDI +
          ___ +
          ADI_ISVIEWABLE +
          ___ +
          AID,
        "color: #01a699",
        "color: #f99137",
        "color: #f99137",
        "color: #a94920",
        "color: #00a7f8",
        "color: #3b539a",
        "color: #32db64",
        "color: #00c59e",
        "color: #3b539a",
        "color: #488aff"
      );
    }

    return (
      <View style={[style]}>
        <View
          style={[
            {
              flex: 1,
              marginTop: horizontal === true ? 0 : 20,
              marginBottom: horizontal === true ? 0 : 20,
              marginLeft: horizontal === true ? 5 : 0,
              marginRight: horizontal === true ? 5 : 0,
              width: horizontal === true ? width : 40,
              height: horizontal === false ? height : 30,
              flexDirection: horizontal == true ? "row" : "column",
              justifyContent: "center",
              alignItems: "center"
            },
            this.props.paginationContainerStyle
          ]}
        >
          {paginationItems.length &&
            this.props.showStartDot && (
              <AnterosPaginationDot
                onPress={() => {
                  try {
                    this.props.refs.scrollToItem({
                      index: 0,
                      key: 0,
                      item: paginationItems[0],
                      isViewable: true
                    });
                  } catch (e) {
                    console.warn(" e: ", e);
                  }
                }}
                color={color}
                size={20}
                name={"chevron-left"}
              />
            )}
          {paginationItems.length &&
            this.props.startDot && (
              <View>
                {React.cloneElement(this.props.startDot, {
                  onPress: () => {
                    try {
                      this.props.refs.scrollToItem({
                        index: 0,
                        key: 0,
                        item: paginationItems[0],
                        isViewable: true
                      });
                    } catch (e) {
                      console.warn(" e: ", e);
                    }
                  }
                })}
              </View>
            )}

          {flatListPaginationItems.map((item, i) => {
            LayoutAnimation.configureNext(dotAnimation);
            return (
              <View style={{ flex: 1 }} key={i}>
                {React.Children.map(renderDot(item, i), child =>
                  React.cloneElement(child, { horizontal })
                )}
              </View>
            );
          })}

          {paginationItems.length &&
            this.props.showEndDot && (
              <AnterosPaginationDot
                onPress={() => {
                  try {
                    this.props.refs.scrollToEnd();
                  } catch (e) {
                    console.warn(" e: ", e);
                  }
                }}
                color={color}
                size={20}
                name={"chevron-right"}
              />
            )}
          {paginationItems.length &&
            this.props.endDot && (
              <View>
                {React.cloneElement(this.props.endDot, {
                  onPress: () => {
                    try {
                      this.props.refs.scrollToEnd();
                    } catch (e) {
                      console.warn(" e: ", e);
                    }
                  }
                })}
              </View>
            )}
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {},
  center: { justifyContent: "center", alignItems: "center" },
  horizontalStyle: {
    width,
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    margin: 0,
    bottom: 10,
    left: 0,
    right: 0,
    padding: 0,
    flex: 1
  },
  verticalStyle: {
    height,
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    margin: 0,
    bottom: 0,
    right: 0,
    bottom: 0,
    padding: 0,
    flex: 1
  }
});

AnterosPagination.propTypes = {
  paginationItems: PropTypes.array.isRequired,
  paginationVisibleItems: PropTypes.array.isRequired
};

AnterosPagination.defaultProps = {
  // containerStyle:{flex: 1,backgroundColor:"red",width,height:null},
  containerStyle: null,
  // textStyle:{color:"rgba(0,0,0,0.5)",textAlign: "center",},
  style: {
    height,
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    margin: 0,
    bottom: 0,
    right: 0,
    bottom: 0,
    padding: 0,
    flex: 1
  },
  iconSet: "MaterialCommunityIcons",

  paginationDotStyle: {
    margin: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  },
  paginationVisibleItems: [],
  paginationItems: [],
  horizontal: false,
  pageRangeDisplayed: 10,
  hideEmptyDots: false,
  activeItemIndex: null,
  hideEmptyDotComponents: false,
  paginationItemPadSize: 3,
  dotAnimation: LayoutAnimation.Presets.spring
};


export class AnterosPaginationDot extends Component {
    constructor(props) {
      super(props);
      this.shouldUpdate = false;
      this.AnimatedValue = new Animated.Value(0);
    }
  
    render() {
      let {
        hideEmptyDots,
        iconSet,
        color,
        name,
        onPress,
        navOnPress,
        text,
  
        horizontal,
  
        iconStyle,
        dotStyle,
        style,
        StartDot,
        dotIconHide,
  
        textStyle,
        EndDot,
        item,
        size,
        dotSwapAxis,
        dotPositionSwap,
        dotComponent
      } = this.props;
  
      dotSwapAxis = !dotSwapAxis;
      if (horizontal == true) {
        dotPositionSwap = !dotPositionSwap;
      }
  
      if (StartDot) {
        if (startDotSwapAxis) dotSwapAxis = !dotSwapAxis;
      }
      if (EndDot) {
        if (endDotSwapAxis) dotSwapAxis = !dotSwapAxis;
        if (endDotPositionSwap) dotPositionSwap = !dotPositionSwap;
      }
  
      return (
        <TouchableOpacity
          onPress={onPress}
          style={[
            {
              flex: 1,
              flexDirection: (horizontal == dotSwapAxis
              ? true
              : false)
                ? "column"
                : "row",
              justifyContent: "center",
              alignItems: "center"
            },
            style
          ]}
        >
          {name &&
            dotPositionSwap && (
              <AnterosPaginationIcon
                name={name}
                iconStyle={iconStyle}
                size={size}
                color={color}
                iconSet={iconSet}
              />
            )}
          {dotComponent && dotPositionSwap && <View>{dotComponent}</View>}
  
          <Text
            // adjustsFontSizeToFit={true}
            // numberOfLines={1}
            style={[
              {
                textAlign: "center",
                fontWeight:
                  _.get(item, "isViewable", false) === true ? "600" : "500"
              },
              textStyle
            ]}
          >
            {text}
          </Text>
  
          <View
            style={{
              flexDirection: (horizontal !== dotSwapAxis
              ? true
              : false)
                ? "row"
                : "column"
            }}
          >
            {name &&
              !dotPositionSwap && (
                <AnterosPaginationIcon
                  name={name}
                  iconStyle={iconStyle}
                  size={size}
                  color={color}
                  iconSet={iconSet}
                />
              )}
            {dotComponent && !dotPositionSwap && <View>{dotComponent}</View>}
          </View>
        </TouchableOpacity>
      );
    }
  }
  
  AnterosPaginationDot.defaultProps = {
    size: 15,
    isActive: false,
    item: {},
    dotFontSize: 15,
    textStyle: {},
    iconStyle: {},
    style: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0)",
      justifyContent: "center",
      alignItems: "center"
    },
    dotSwapAxis: false,
    dotIconHide: false,
  
    dotPositionSwap: false
  };
  

export class AnterosPaginationIcon extends Component {
  render() {
    const {iconSet,name,size,color} = this.props

    let Icon=null
    if(iconSet==="Entypo")Icon=Entypo
    else if(iconSet==="EvilIcons")Icon=EvilIcons
    else if(iconSet==="FontAwesome")Icon=FontAwesome
    else if(iconSet==="Foundation")Icon=Foundation
    else if(iconSet==="Ionicons")Icon=Ionicons
    else if(iconSet==="SimpleLineIcons")Icon=SimpleLineIcons
    else if(iconSet==="MaterialIcons")Icon=MaterialIcons
    else if(iconSet==="MaterialCommunityIcons")Icon=MaterialCommunityIcons
    else if(iconSet==="Octicons")Icon=Octicons
    else if(iconSet==="Zocial")Icon=Zocial
    else Icon=MaterialCommunityIcons

    return (<Icon name={name} size={size} color={color} />);
  }
}





AnterosPaginationIcon.defaultProps={
  iconSet:"MaterialCommunityIcons",
}
AnterosPaginationIcon.PropTypes={
    name:PropTypes.string,
    size:PropTypes.number,
    color:PropTypes.string,
}

