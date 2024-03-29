import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated, ViewPropTypes, View, FlatList, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const colors = {
  white: '#FFFFFF',
  primary: 'rgb(90, 170, 200)',
  transparent: 'rgba(0, 0, 0, 0)',
  black: '#000000',
};


const generateStyles = ({
  numColumns,
  separatorBorderWidth,
  separatorBorderColor,
  animationInitialBackgroundColor,
}) => ({
  itemContainer: {
    maxHeight: width / numColumns,
    flex: 1,
  },
  itemContainerSeparator: {
    flex: 1,
    borderLeftWidth: separatorBorderWidth,
    borderColor: separatorBorderColor,
  },
  itemContainerAnimationStart: {
    backgroundColor: animationInitialBackgroundColor,
  },
  itemContainerAnimationEnd: {
    backgroundColor: separatorBorderColor,
    width: '100%',
    height: '100%',
  },
  separator: {
    borderColor: separatorBorderColor,
    borderWidth: separatorBorderWidth * 0.5,
  },
  container: {
    borderRightWidth: separatorBorderWidth,
    borderTopWidth: separatorBorderWidth,
    borderBottomWidth: separatorBorderWidth,
    borderColor: separatorBorderColor,
  },
});

export class AnterosGridList extends PureComponent {
  static propTypes = {
    animationDuration: PropTypes.number,
    animationInitialBackgroundColor: PropTypes.string,
    itemStyle: ViewPropTypes.style,
    numColumns: PropTypes.number.isRequired,
    separatorBorderColor: PropTypes.string,
    separatorBorderWidth: PropTypes.number,
    showAnimation: PropTypes.bool,
    showSeparator: PropTypes.bool,

    data: PropTypes.array,
    renderItem: PropTypes.func,

    // Only is allowed children or data not both
    children(props, propName) {
      const { data } = props;
      if (!props[propName] && data && data.length === 0) {
        return new Error('Invalid props, `data` or `children` is required');
      }
      if (data && data.length !== 0 && !props.renderItem) {
        return new Error('Invalid props, `renderItem` is required');
      }
      return undefined;
    },
  };

  static defaultProps = {
    numColumns: 3,
    itemStyle: {},
    showSeparator: false,
    showAnimation: false,
    animationDuration: 500,
    separatorBorderWidth: 0,
    separatorBorderColor: colors.white,
    animationInitialBackgroundColor: colors.white,
  };

  UNSAFE_componentWillMount() {
    const {
      separatorBorderWidth,
      separatorBorderColor,
      numColumns,
      animationInitialBackgroundColor,
      showSeparator,
      showAnimation,
    } = this.props;

    const stylesOptions = {
      numColumns,
    };

    if (showSeparator) {
      stylesOptions.separatorBorderWidth = separatorBorderWidth;
      stylesOptions.separatorBorderColor = separatorBorderColor;
    }
    if (showAnimation) {
      stylesOptions.animationInitialBackgroundColor = animationInitialBackgroundColor;
    }
    this.styles = generateStyles(stylesOptions);

    this.setup(this.props);
    this.animate();
  }
  UNSAFE_componentWillUpdate(nextProps) {
    this.setup(nextProps);
    this.animate();
  }

  setup = ({ children, data, renderItem }) => {
    if (children) {
      this._data = children;
      this._renderItem = this.renderChildren;
    } else if (data) {
      this._data = data;
      this._renderItem = renderItem;
    }
  };

  animate() {
    if (this.props.showAnimation) {
      const { numColumns, animationDuration } = this.props;
      this.animatedValue = [];

      this.animations = this._data.map((_, index) => {
        this.animatedValue[index] = new Animated.Value(0);
        return Animated.stagger(0, [
          Animated.timing(this.animatedValue[index], {
            toValue: 1,
            duration: animationDuration * Math.ceil((index + 1) / numColumns),
          }),
        ]);
      });
    }
  }

  _keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => {
    const { showAnimation, showSeparator, itemStyle } = this.props;

    const viewStyles = [];
    viewStyles.push(this.styles.itemContainer);
    if (showSeparator) {
      viewStyles.push(this.styles.itemContainerSeparator);
    }
    if (showAnimation) {
      viewStyles.push(this.styles.itemContainerAnimationStart);
    }

    viewStyles.push(itemStyle);

    return (
      <View style={viewStyles}>
        {showAnimation ? (
          <Animated.View useNativeDriver={true}
            style={[
              this.styles.itemContainerAnimationEnd,
              { opacity: this.animatedValue[index] },
            ]}
          >
            {this._renderItem({
              item,
              index,
              animation: this.animations[index],
            })}
          </Animated.View>
        ) : (
          this._renderItem({ item, index })
        )}
      </View>
    );
  };

  renderChildren = ({ item, animation }) => {
    if (animation) {
      animation.start();
    }
    return item;
  };

  render() {
    const { showSeparator, ...props } = this.props;
    return (
      <FlatList
        contentContainerStyle={showSeparator && this.styles.container}
        keyExtractor={this._keyExtractor}
        ItemSeparatorComponent={() =>
          showSeparator ? <View style={this.styles.separator} /> : null
        }
        showsVerticalScrollIndicator={false}
        {...props}
        data={this._data}
        renderItem={this.renderItem}
      />
    );
  }
}