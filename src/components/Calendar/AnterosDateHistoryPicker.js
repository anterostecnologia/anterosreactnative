import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  FlatList,
  TouchableWithoutFeedback,
  Easing
} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import {AnterosText} from '../Text/AnterosText';

const HIGHLIGHT_COLOR = "#57a8ef";
const ANIMATED_TIMING_DURATION = 400;
const SIZE = 95;


const Colors = {
  error: "rgba(200, 0, 0, 0.8)",
  snow: "white",
  text: "#6b6c73",
  icon: "#6b6c73",
  border: "#9aa2af",
  disable: "#9aa2af",
  app: "#7658d4",
  primary: "#f5437b",
  secondary: "#9c87e0"
};

const type = {
  base: "Roboto"
};

const size = {
  extra: 40,
  large: 22,
  regular: 18,
  medium: 14,
  small: 12,
  tiny: 8
};

const style = {
  topic: {
    fontFamily: type.base,
    fontSize: size.large,
    color: Colors.text
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular,
    color: Colors.text
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium,
    color: Colors.disable
  },
  header: {
    fontFamily: type.base,
    fontSize: size.extra,
    fontWeight: "600",
    color: Colors.text
  }
};

const Fonts = {
  type,
  size,
  style
};

const HistoryDateItem = ({
  data,
  animation,
  highlightColor,
  isSelected,
  daySize,
  onSelect,
  index
}) => {
  const areaInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [daySize, 0],
    extrapolate: "clamp"
  });
  const borderRadiusInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [daySize, 10],
    extrapolate: "clamp"
  });
  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [0, 0, 1],
    extrapolate: "clamp"
  });

  return (
    <View style={[styles.container,{height: daySize,
      width: daySize}]}>
      <Animated.View useNativeDriver={true}
        style={[
          styles.highlight,
          {
            backgroundColor: highlightColor,
            opacity: opacityInterpolate,
            right: areaInterpolate,
            bottom: areaInterpolate,
            borderTopRightRadius: borderRadiusInterpolate,
            borderBottomLeftRadius: borderRadiusInterpolate,
            borderBottomRightRadius: borderRadiusInterpolate
          }
        ]}
      />
      <Animated.View useNativeDriver={true}   style={[styles.itemContainer, {height: daySize,
      width: daySize}]}>
        {data.prefer && (
          <TouchableWithoutFeedback onPress={() => onSelect(index)}>
            <View style={styles.prefer}>
              <AnterosText style={[styles.text, isSelected ? styles.selected : null]}>
                {data.prefer}
              </AnterosText>
            </View>
          </TouchableWithoutFeedback>
        )}
        {!data.prefer && (
          <TouchableWithoutFeedback onPress={() => onSelect(index)}>
            <View style={styles.item}>
              <AnterosText
                style={[styles.textMini, isSelected ? styles.selected : null]}
              >
                {data.monthName.toUpperCase()}'{data.year}
              </AnterosText>
              <AnterosText style={[styles.text, isSelected ? styles.selected : null]}>
                {data.day}
              </AnterosText>
              <AnterosText
                style={[styles.textMini, isSelected ? styles.selected : null]}
              >
                {data.dayName.toUpperCase()}
              </AnterosText>
            </View>
          </TouchableWithoutFeedback>
        )}
      </Animated.View>
    </View>
  );
};

export class AnterosDateHistoryPicker extends Component {
  constructor(props) {
    super(props);
    const selectedIndex = props.selectedIndex || 0;
    const historyDay = props.historyDay;
    const historyDates = Array(historyDay)
      .fill()
      .map((_, index) => {
        const date = moment().subtract(index, "day");
        return {
          isoString: date.toISOString(),
          dayName: date.format("dddd"),
          monthName: date.format("MMMM"),
          day: date.format("D"),
          month: date.format("MM"),
          year: date.format("YY"),
          prefer: index === 0 ? "Today" : null
        };
      });
    const highlightAnimations = historyDates.map(
      (_, index) => new Animated.Value(selectedIndex === index ? 1 : 0)
    );
    this.state = {
      selectedIndex,
      highlighting: false,
      historyDates,
      highlightAnimations
    };
  }
  createTimingAnimation = (
    controlVar,
    duration,
    toValue = 0,
    useNativeDriver = true
  ) => {
    return Animated.timing(controlVar, {
      toValue,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver
    });
  };
  createSelectHighlightAnimation = controlVar => {
    return this.createTimingAnimation(
      controlVar,
      ANIMATED_TIMING_DURATION,
      1,
      false
    );
  };
  createUnselectHighlightAnimation = controlVar => {
    return this.createTimingAnimation(
      controlVar,
      ANIMATED_TIMING_DURATION,
      0,
      false
    );
  };
  onSelect = index => {
    const { selectedIndex, highlightAnimations, highlighting } = this.state;
    if (selectedIndex === index || highlighting) {
      return;
    }
    let animationSet = [
      this.createSelectHighlightAnimation(highlightAnimations[index])
    ];
    if (selectedIndex !== -1) {
      animationSet.push(
        this.createUnselectHighlightAnimation(
          highlightAnimations[selectedIndex]
        )
      );
    }
    this.setState({ selectedIndex: index, highlighting: true });
    Animated.parallel(animationSet).start(({ finished }) => {
      if (finished) {
        this.setState({ highlighting: false });
      }
    });
  };
  render() {
    const { highlightColor, daySize } = this.props;
    const { historyDates, highlightAnimations, selectedIndex } = this.state;
    return (
      <FlatList
        style={this.props.style}
        inverted
        data={historyDates}
        extraData={selectedIndex}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={date => date.isoString}
        renderItem={({ item, index }) => (
          <HistoryDateItem
            index={index}
            onSelect={this.onSelect}
            highlightColor={highlightColor}
            data={item}
            daySize={daySize}
            animation={highlightAnimations[index]}
            isSelected={selectedIndex === index}
          />
        )}
      />
    );
  }
}
AnterosDateHistoryPicker.propTypes = {
  historyDay: PropTypes.number.isRequired,
  highlightColor: PropTypes.string.isRequired,
  daySize: PropTypes.number.isRequired
};
AnterosDateHistoryPicker.defaultProps = {
  historyDay: 1,
  highlightColor: HIGHLIGHT_COLOR,
  daySize: SIZE
};
const styles = StyleSheet.create({
  container: { flex: 1, height: SIZE, width: SIZE, marginRight: 10 },
  itemContainer: {
    height: SIZE,
    width: SIZE,
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 10,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "space-between"
  },
  prefer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between"
  },
  highlight: {
    position: "absolute",
    top: 0,
    left: 0,
    borderTopLeftRadius: 10
  },
  text: {
    ...Fonts.style.normal,
    backgroundColor: "transparent"
  },
  textMini: {
    ...Fonts.style.description,
    fontSize: 10,
    color: Colors.text,
    backgroundColor: "transparent"
  },
  selected: {
    color: Colors.snow
  }
});


AnterosDateHistoryPicker.Colors = Colors;