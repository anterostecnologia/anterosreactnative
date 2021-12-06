import React, { PureComponent, memo } from "react";
import PropTypes from "prop-types";
import {
  Animated,
  Platform,
  RefreshControl,
  ScrollView,
  View,
  Image
} from "react-native";

/**
 * Is numeric.
 * @param {any} num
 * @returns {boolean}
 */
 export const isNumeric = (num) => {
    return !isNaN(parseFloat(num)) && isFinite(num);
  };
  
  /**
   * Process block.
   * @param {number} containerHeight
   * @param {number} scrollTop
   * @param {number|null|undefined} batchSizeThreshold
   * @returns {{blockStart: number, batchSize: number, blockEnd: number}}
   */
  export const processBlock = ({
    containerHeight,
    scrollTop,
    batchSizeThreshold = 1,
  }) => {
    if (containerHeight === 0) {
      return {
        batchSize: 0,
        blockStart: 0,
        blockEnd: 0,
      };
    }
    const batchSize = Math.ceil(
      containerHeight * Math.max(0.5, batchSizeThreshold),
    );
    const blockNumber = Math.ceil(scrollTop / batchSize);
    const blockStart = batchSize * blockNumber;
    const blockEnd = blockStart + batchSize;
    return { batchSize, blockStart, blockEnd };
  };
  
  /**
   * Autobind context to class methods.
   * @param {object} self
   * @returns {{}}
   */
  export const autobind = (self = {}) => {
    const exclude = [
      "componentWillMount",
      "UNSAFE_componentWillMount",
      "render",
      "getSnapshotBeforeUpdate",
      "componentDidMount",
      "componentWillReceiveProps",
      "UNSAFE_componentWillReceiveProps",
      "shouldComponentUpdate",
      "componentWillUpdate",
      "UNSAFE_componentWillUpdate",
      "componentDidUpdate",
      "componentWillUnmount",
      "componentDidCatch",
      "setState",
      "forceUpdate",
    ];
  
    const filter = (key) => {
      const match = (pattern) =>
        typeof pattern === "string" ? key === pattern : pattern.test(key);
      if (exclude) {
        return !exclude.some(match);
      }
      return true;
    };
  
    const getAllProperties = (object) => {
      const properties = new Set();
      do {
        for (const key of Object.getOwnPropertyNames(object).concat(
          Object.getOwnPropertySymbols(object),
        )) {
          properties.add([object, key]);
        }
      } while (
        (object = Object.getPrototypeOf(object)) &&
        object !== Object.prototype
      );
      return properties;
    };
  
    for (const [object, key] of getAllProperties(self.constructor.prototype)) {
      if (key === "constructor" || !filter(key)) {
        continue;
      }
      const descriptor = Object.getOwnPropertyDescriptor(object, key);
      if (descriptor && typeof descriptor.value === "function") {
        self[key] = self[key].bind(self);
      }
    }
    return self;
  };
  
  /**
   * Merge styles
   * @param {array|object|null|undefined} style
   * @param {array|object} defaultStyle
   * @returns {Object}
   */
  export const mergeViewStyle = (style, defaultStyle = {}) => {
    let mergedStyle = style;
    if (mergedStyle == null) {
      mergedStyle = defaultStyle;
    } else if (Array.isArray(style) && Array.isArray(defaultStyle)) {
      const mergedDefaultStyle = [...defaultStyle];
      mergedDefaultStyle.concat(style);
      mergedStyle = mergedDefaultStyle;
    } else if (Array.isArray(defaultStyle)) {
      const mergedDefaultStyle = [...defaultStyle];
      mergedDefaultStyle.push(style);
      mergedStyle = mergedDefaultStyle;
    } else if (Array.isArray(style)) {
      mergedStyle = [...style];
      mergedStyle.unshift(defaultStyle);
    } else {
      mergedStyle = [defaultStyle, style];
    }
    return mergedStyle;
  };
  
  /**
   * Get element from component.
   * @param {React.node} Component
   * @returns {JSX.Element|[]|*}
   */
  export const createElement = (Component) => {
    return Component != null ? (
      React.isValidElement(Component) ? (
        Component
      ) : (
        <Component />
      )
    ) : null;
  };


  export const AnterosBigListItemType = {
    SPACER: "spacer",
    HEADER: "header",
    SECTION_HEADER: "section_header",
    ITEM: "item",
    SECTION_FOOTER: "section_footer",
    FOOTER: "footer",
    EMPTY: "empty",
  };
  

  export class AnterosBigListItemRecycler {
    static lastKey = 0;
    /**
     * Constructor.
     * @param {object[]} items
     */
    constructor(items) {
      this.items = {};
      this.pendingItems = {};
      items.forEach((item) => {
        const { type, section, index } = item;
        const [itemsForType] = this.itemsForType(type);
        itemsForType[`${type}:${section}:${index}`] = item;
      });
    }
  
    /**
     * Items for type.
     * @param {any} type
     * @returns {(*|{}|*[])[]}
     */
    itemsForType(type) {
      return [
        this.items[type] || (this.items[type] = {}),
        this.pendingItems[type] || (this.pendingItems[type] = []),
      ];
    }
  
    /**
     * Get item.
     * @param {any} type
     * @param {number} position
     * @param {number} height
     * @param {int} section
     * @param {int} index
     * @returns {{section: int, position: number, index: number, type: any, key: number, height: int}}
     */
    get({ type, position, height, section = 0, index = 0 }) {
      const [items, pendingItems] = this.itemsForType(type);
      const itemKey = `${type}:${section}:${index}`;
      let item = items[itemKey];
      if (item == null) {
        item = { type, key: -1, position, height, section, index };
        pendingItems.push(item);
      } else {
        item.position = position;
        item.height = height;
        delete items[itemKey];
      }
      return item;
    }
  
    /**
     * Fill.
     */
    fill() {
      Object.values(AnterosBigListItemType).forEach((type) => {
        const [items, pendingItems] = this.itemsForType(type);
        let index = 0;
        Object.values(items).forEach(({ key }) => {
          const item = pendingItems[index];
          if (item == null) {
            return false;
          }
          item.key = key;
          index++;
        });
  
        for (; index < pendingItems.length; index++) {
          pendingItems[index].key = ++AnterosBigListItemRecycler.lastKey;
        }
        pendingItems.length = 0;
      });
    }
  }


/**
 * List section.
 * @param {object|array} style
 * @param {number} position
 * @param {number} height
 * @param {number} nextSectionPosition
 * @param {Animated.Value} scrollTopValue
 * @param {React.node} children
 * @returns {JSX.Element}
 * @constructor
 */
 const BigListSection = ({
    style,
    position,
    height,
    nextSectionPosition,
    scrollTopValue,
    children,
  }) => {
    const inputRange = [-1, 0];
    const outputRange = [0, 0];
    inputRange.push(position);
    outputRange.push(0);
    const collisionPoint = (nextSectionPosition || 0) - height;
    if (collisionPoint >= position) {
      inputRange.push(collisionPoint, collisionPoint + 1);
      outputRange.push(collisionPoint - position, collisionPoint - position);
    } else {
      inputRange.push(position + 1);
      outputRange.push(1);
    }
    const translateY = scrollTopValue.interpolate({
      inputRange,
      outputRange,
    });
    const child = React.Children.only(children);
    const fillChildren =
      React.isValidElement(child) &&
      React.cloneElement(
        child,
        mergeViewStyle(style, {
          style: { flex: 1 },
        }),
      );
    const viewStyle = [
      React.isValidElement(child) && child.props.style
        ? child.props.style
        : style,
      {
        elevation: 10,
        zIndex: 10,
        height: height,
        width: "100%",
        transform: [{ translateY }],
      },
    ];
    return <Animated.View style={viewStyle}>{fillChildren}</Animated.View>;
  };
  
  BigListSection.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    height: PropTypes.number,
    nextSectionPosition: PropTypes.number,
    position: PropTypes.number,
    scrollTopValue: PropTypes.instanceOf(Animated.Value),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };
  
export const AnterosBigListSection = memo(BigListSection);


const BigListPlaceholder = ({
  component,
  image,
  style,
  height,
  width = "100%",
}) => {
  const bgStyles = {
    position: "absolute",
    resizeMode: "repeat",
    overflow: "visible",
    backfaceVisibility: "visible",
    flex: 1,
    height: "100%",
    width: "100%",
  };
  return (
    <Animated.View
      style={mergeViewStyle(style, {
        height,
        width,
      })}
    >
      {createElement(component) || (
        <Image
          source={image || require("../../assets/images/placeholder-biglist.png")}
          style={bgStyles}
        />
      )}
    </Animated.View>
  );
};

BigListPlaceholder.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

BigListPlaceholder.defaultProps = {
  width: "100%",
};

export const AnterosBigListPlaceholder = memo(BigListPlaceholder);


export class AnterosBigListProcessor {
  /**
   * Constructor.
   * @param {ScrollView} scrollView
   * @param {array[]|object|null|undefined} sections
   * @param {number|function|null|undefined} headerHeight
   * @param {number|function|null|undefined} footerHeight
   * @param {number|function|null|undefined} sectionHeaderHeight
   * @param {number|function|null|undefined} itemHeight
   * @param {number|function|null|undefined} sectionFooterHeight
   * @param {number|function|null|undefined} insetTop
   * @param {number|function|null|undefined} insetBottom
   * @param {number|null|undefined} numColumns
   */
  constructor({
    scrollView,
    sections,
    headerHeight,
    footerHeight,
    sectionHeaderHeight,
    itemHeight,
    sectionFooterHeight,
    insetTop,
    insetBottom,
    numColumns,
  }) {
    this.headerHeight = headerHeight;
    this.footerHeight = footerHeight;
    this.sectionHeaderHeight = sectionHeaderHeight;
    this.itemHeight = itemHeight;
    this.sectionFooterHeight = sectionFooterHeight;
    this.sections = sections;
    this.insetTop = insetTop;
    this.insetBottom = insetBottom;
    this.uniform = isNumeric(itemHeight);
    this.scrollView = scrollView;
    this.numColumns = numColumns;
  }

  /**
   * Get item height.
   * @returns {number|*}
   */
  getItemHeight(section, index) {
    const { itemHeight } = this;
    return isNumeric(itemHeight)
      ? Number(itemHeight)
      : itemHeight(section, index);
  }

  /**
   * Get header height.
   * @returns {number|*}
   */
  getHeaderHeight() {
    const { headerHeight } = this;
    return isNumeric(headerHeight) ? Number(headerHeight) : headerHeight();
  }

  /**
   * Get footer height.
   * @returns {number|*}
   */
  getFooterHeight() {
    const { footerHeight } = this;
    return isNumeric(footerHeight) ? Number(footerHeight) : footerHeight();
  }

  /**
   * Get section height.
   * @returns {number|*}
   */
  getSectionHeaderHeight(section) {
    const { sectionHeaderHeight } = this;
    return isNumeric(sectionHeaderHeight)
      ? Number(sectionHeaderHeight)
      : sectionHeaderHeight(section);
  }

  /**
   * Get section footer height.
   * @returns {number|*}
   */
  getSectionFooterHeight(section) {
    const { sectionFooterHeight } = this;
    return isNumeric(sectionFooterHeight)
      ? Number(sectionFooterHeight)
      : sectionFooterHeight(section);
  }

  /**
   * Process list items.
   * @param {number} top
   * @param {number} bottom
   * @param {array} prevItems
   * @returns {{items: [], height: *}}
   */
  process(top, bottom, prevItems) {
    const { sections } = this;
    const items = [];
    const recycler = new AnterosBigListItemRecycler(prevItems);

    let position;
    let counter = -1; // Counter of items per row pushed
    let height = this.insetTop;
    let spacerHeight = height;

    /**
     * The width of the row is the entire line.
     * @param {object} item
     * @returns {boolean}
     */
    const isFullRow = (item) => {
      // Only items can be rendered with column format, so all others are full row
      return item.type !== AnterosBigListItemType.ITEM;
    };

    /**
     * Is visible below.
     * @param {object} item
     * @returns {boolean}
     */
    const isVisibleBelow = (item) => {
      const { height: itemHeight } = item;
      counter = -1;
      if (height > bottom) {
        spacerHeight += itemHeight;
        return false;
      } else {
        return true;
      }
    };

    /**
     * Is the item visible.
     * @param {object} item
     * @param {bool} force
     * @returns {boolean}
     */
    const isVisible = (item, force = false) => {
      // Check section headers visibility below
      if (item.type === AnterosBigListItemType.SECTION_HEADER) {
        return isVisibleBelow(item);
      }
      // Dimensions
      const { height: itemHeight } = item;
      const fullRow = isFullRow(item);
      const prevHeight = height;
      // Increase or reset counter
      counter = fullRow ? -1 : counter + 1;
      if (fullRow || counter % this.numColumns === 0) {
        height += itemHeight;
      }
      // Check if is visible
      if (force || (height > top && prevHeight < bottom)) {
        return true;
      } else {
        if (fullRow || counter % this.numColumns === 0) {
          spacerHeight += itemHeight;
        }
        return false;
      }
    };

    /**
     * Get recycled views and push items.
     * @param {object} itemsArray
     */
    const push = (...itemsArray) => {
      itemsArray.forEach((item) => {
        items.push(recycler.get(item));
      });
    };

    /**
     * Push spacer.
     * @param {object} item
     */
    const pushSpacer = (item) => {
      if (spacerHeight > 0) {
        push({
          type: AnterosBigListItemType.SPACER,
          position: item.position - spacerHeight,
          height: spacerHeight,
          section: item.section,
          index: item.index,
        });
        spacerHeight = 0;
      }
    };

    /**
     * Push the item when is visible.
     * @param {object} item
     * @param {bool} force
     */
    const pushItem = (item, force = false) => {
      if (isVisible(item, force)) {
        pushSpacer(item);
        push(item);
      }
    };

    /**
     * Calculate spacer height.
     */
    const getSpacerHeight = () => {
      let itemsCounter = -1;
      return items.reduce((totalHeight, item, i) => {
        if (i !== items.length - 1) {
          const fullRow = isFullRow(item);
          itemsCounter = fullRow ? 0 : itemsCounter + 1;
          if (fullRow || itemsCounter % this.numColumns === 0) {
            return totalHeight + item.height;
          }
        }
        return totalHeight;
      }, 0);
    };

    // Header
    const headerHeight = this.getHeaderHeight();
    if (headerHeight > 0) {
      position = height;
      pushItem(
        {
          type: AnterosBigListItemType.HEADER,
          position: position,
          height: headerHeight,
        },
        true,
      );
    }
    // Sections
    for (let section = 0; section < sections.length; section++) {
      const rows = sections[section];
      if (rows === 0) {
        continue;
      }
      // Section Header
      const sectionHeaderHeight = this.getSectionHeaderHeight(section);
      position = height;
      height += sectionHeaderHeight;
      if (
        section > 1 &&
        items.length > 0 &&
        items[items.length - 1].type === AnterosBigListItemType.SECTION_HEADER
      ) {
        // Top Spacer
        const initialSpacerHeight = getSpacerHeight();
        const prevSection = items[items.length - 1];
        items.splice(0, items.length);
        push(
          {
            type: AnterosBigListItemType.HEADER,
            position: position,
            height: headerHeight,
          },
          {
            type: AnterosBigListItemType.SPACER,
            position: 0,
            height: initialSpacerHeight - headerHeight,
            section: prevSection.section,
            index: 0,
          },
          prevSection,
        );
      }
      pushItem({
        type: AnterosBigListItemType.SECTION_HEADER,
        position: position,
        height: sectionHeaderHeight,
        section: section,
      });
      // Items
      let itemHeight = this.getItemHeight(section);
      for (let index = 0; index < rows; index++) {
        if (!this.uniform) {
          itemHeight = this.getItemHeight(section, index);
        }
        position = height;
        pushItem({
          type: AnterosBigListItemType.ITEM,
          position: position,
          height: itemHeight,
          section: section,
          index: index,
        });
      }
      // Section Footer
      const sectionFooterHeight = this.getSectionFooterHeight(section);
      if (sectionFooterHeight > 0) {
        position = height;
        pushItem({
          type: AnterosBigListItemType.SECTION_FOOTER,
          position: position,
          height: sectionFooterHeight,
          section: section,
        });
      }
    }
    // Footer
    const footerHeight = this.getFooterHeight();
    if (footerHeight > 0) {
      position = height;
      pushItem(
        {
          type: AnterosBigListItemType.FOOTER,
          position: position,
          height: footerHeight,
        },
        true,
      );
    }
    // Bottom Spacer
    height += this.insetBottom;
    spacerHeight += this.insetBottom;
    if (spacerHeight > 0) {
      push({
        type: AnterosBigListItemType.SPACER,
        position: height - spacerHeight,
        height: spacerHeight,
        section: sections.length,
      });
    }
    recycler.fill();
    return {
      height,
      items,
    };
  }

  /**
   * Scroll to position.
   * @param {int} targetSection
   * @param {int} targetIndex
   * @param {boolean} animated
   */
  scrollToPosition(targetSection, targetIndex, animated) {
    const { sections, insetTop } = this;

    // Header + inset
    let scrollTop = insetTop + this.getHeaderHeight();
    let section = 0;
    let foundIndex = false;
    while (section <= targetSection) {
      const rows = Math.ceil(sections[section] / this.numColumns);
      if (rows === 0) {
        section += 1;
        continue;
      }
      // Section header
      scrollTop += this.getSectionHeaderHeight(section);

      // Items
      if (this.uniform) {
        const uniformHeight = this.getItemHeight(section);
        if (section === targetSection) {
          scrollTop += uniformHeight * Math.ceil(targetIndex / this.numColumns);
          foundIndex = true;
        } else {
          scrollTop += uniformHeight * rows;
        }
      } else {
        for (let index = 0; index < rows; index++) {
          if (
            section < targetSection ||
            (section === targetSection && index < targetIndex)
          ) {
            scrollTop += this.getItemHeight(
              section,
              Math.ceil(index / this.numColumns),
            );
          } else if (section === targetSection && index === targetIndex) {
            foundIndex = true;
            break;
          }
        }
      }

      // Section footer
      if (!foundIndex) {
        scrollTop += this.getSectionFooterHeight(section);
      }
      section += 1;
    }
    this.scrollView.scrollTo({
      x: 0,
      y: Math.max(0, scrollTop - this.getSectionHeaderHeight(targetSection)),
      animated,
    });
    return true;
  }
}


/**
 * List item.
 * @param {string} uniqueKey
 * @param {React.node} children
 * @param {array|object|null|undefined} style
 * @param {number} height
 * @param {number} width
 * @returns {JSX.Element}
 * @constructor
 */
const BigListItem = ({
  uniqueKey,
  children,
  style,
  height,
  width = "100%",
}) => {
  return (
    <View
      key={uniqueKey}
      style={mergeViewStyle(style, {
        height,
        width,
      })}
    >
      {children}
    </View>
  );
};

BigListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  uniqueKey: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

BigListItem.defaultProps = {
  width: "100%",
};

export const AnterosBigListItem = memo(BigListItem);

class BigList extends PureComponent {
  /**
   * Constructor.
   * @param props
   */
  constructor(props) {
    super(props);
    autobind(this);
    // Initialize properties and state
    this.containerHeight = 0;
    this.scrollTop = 0;
    this.scrollTopValue =
      this.props.initialScrollIndex || new Animated.Value(0);
    this.scrollView = React.createRef();
    this.state = this.getListState();
    this.viewableItems = [];
  }

  /**
   * Get list state.
   * @param {array} data
   * @param {array[]|object|null|undefined} sections
   * @param {array} prevItems
   * @param {number|null} batchSizeThreshold
   * @param {number|function|null|undefined} headerHeight
   * @param {number|function|null|undefined} footerHeight
   * @param {number|function|null|undefined} sectionHeaderHeight
   * @param {number|function|null|undefined} itemHeight
   * @param {number|function|null|undefined} sectionFooterHeight
   * @param {number|null|undefined} insetTop
   * @param {number|null|undefined} insetBottom
   * @param {number|null|undefined} numColumns
   * @param {number|null|undefined} batchSize
   * @param {number|null|undefined} blockStart
   * @param {number|null|undefined} blockEnd
   * @param {function|null|undefined} getItemLayout
   * @returns {{blockStart: *, batchSize: *, blockEnd: *, items: [], height: *}|{blockStart, batchSize, blockEnd, items: [], height: *}}
   */
  static getListState(
    {
      data,
      sections,
      batchSizeThreshold,
      headerHeight,
      footerHeight,
      sectionHeaderHeight,
      itemHeight,
      sectionFooterHeight,
      insetTop,
      insetBottom,
      numColumns,
      getItemLayout,
    },
    { batchSize, blockStart, blockEnd, items: prevItems },
  ) {
    if (batchSize === 0) {
      return {
        batchSize,
        blockStart,
        blockEnd,
        height: insetTop + insetBottom,
        items: [],
      };
    }
    const self = BigList;
    const layoutItemHeight = self.getItemHeight(itemHeight, getItemLayout);
    const sectionLengths = self.getSectionLengths(sections, data);
    const processor = new AnterosBigListProcessor({
      sections: sectionLengths,
      itemHeight: layoutItemHeight,
      headerHeight,
      footerHeight,
      sectionHeaderHeight,
      sectionFooterHeight,
      insetTop,
      insetBottom,
      numColumns,
    });
    return {
      ...{
        batchSize,
        blockStart,
        blockEnd,
      },
      ...processor.process(
        blockStart - batchSize,
        blockEnd + batchSize,
        prevItems || [],
      ),
    };
  }

  /**
   * Get list state
   * @param {object} props
   * @param {object} options.
   * @return {{blockStart: *, batchSize: *, blockEnd: *, items: *[], height: *}|{blockStart, batchSize, blockEnd, items: *[], height: *}}
   */
  getListState(props, options) {
    const stateProps = props || this.props;
    return this.constructor.getListState(
      stateProps,
      options ||
        processBlock({
          containerHeight: this.containerHeight,
          scrollTop: this.scrollTop,
          batchSizeThreshold: stateProps.batchSizeThreshold,
        }),
    );
  }

  /**
   * Get sections item lengths.
   * @param {array[]|object<string, object>|null|undefined} sections
   * @param {array} data
   * @returns {int[]}
   */
  static getSectionLengths(sections = null, data = null) {
    if (sections !== null) {
      return sections.map((section) => {
        return section.length;
      });
    }
    return [data?.length];
  }

  /**
   * Get sections item lengths.
   * @returns {int[]}
   */
  getSectionLengths() {
    const { sections, data } = this.props;
    return this.constructor.getSectionLengths(sections, data);
  }

  /**
   * Get item height.
   * @param {number} itemHeight
   * @param {function|null|undefined} getItemLayout
   * @return {null|*}
   */
  static getItemHeight(itemHeight, getItemLayout) {
    if (getItemLayout) {
      const itemLayout = getItemLayout([], 0);
      return itemLayout.length;
    }
    if (itemHeight) {
      return itemHeight;
    }
    return null;
  }

  /**
   * Get item height.
   * @return {null|*}
   */
  getItemHeight() {
    const { itemHeight, getItemLayout } = this.props;
    return this.constructor.getItemHeight(itemHeight, getItemLayout);
  }

  /**
   * Is item visible.
   * @param {int} index
   * @param {int} section
   * @returns {boolean}
   */
  isVisible({ index, section = 0 }) {
    const position = this.getItemOffset({ index, section });
    return (
      position >= this.scrollTop &&
      position <= this.scrollTop + this.containerHeight
    );
  }

  /**
   * Provides a reference to the underlying scroll component.
   * @returns {ScrollView|null}
   */
  getNativeScrollRef() {
    return this.scrollView.current;
  }

  /**
   * Get list processor,
   * @returns {AnterosBigListProcessor}
   */
  getListProcessor() {
    const scrollView = this.getNativeScrollRef();
    if (scrollView != null) {
      const {
        headerHeight,
        footerHeight,
        sectionHeaderHeight,
        sectionFooterHeight,
        insetTop,
        insetBottom,
        numColumns,
      } = this.props;
      const itemHeight = this.getItemHeight();
      const sectionLengths = this.getSectionLengths();
      return new AnterosBigListProcessor({
        sections: sectionLengths,
        headerHeight,
        footerHeight,
        sectionHeaderHeight,
        sectionFooterHeight,
        itemHeight,
        insetTop,
        insetBottom,
        scrollView,
        numColumns,
      });
    }
    return null;
  }

  /**
   * Displays the scroll indicators momentarily.
   */
  flashScrollIndicators() {
    const scrollView = this.getNativeScrollRef();
    if (scrollView != null) {
      scrollView.flashScrollIndicators();
    }
  }

  /**
   * Scrolls to a given x, y offset, either immediately, with a smooth animation.
   * @param {int} x
   * @param {int} y
   * @param {bool} animated
   */
  scrollTo({ x = 0, y = 0, animated = true } = {}) {
    const scrollView = this.getNativeScrollRef();
    if (scrollView != null) {
      scrollView.scrollTo({
        x: x,
        y: y,
        animated,
      });
    }
  }

  /**
   * Scroll to index.
   * @param {int} index
   * @param {int} section
   * @param {bool} animated
   * @returns {bool}
   */
  scrollToIndex({ index, section = 0, animated = true }) {
    const processor = this.getListProcessor();
    if (processor != null && index != null && section != null) {
      return processor.scrollToPosition(section, index, animated);
    }
    return false;
  }

  /**
   * Alias to scrollToIndex with polyfill for SectionList.
   * @see scrollToIndex
   * @param {int} itemIndex
   * @param {int} sectionIndex
   * @param {bool} animated
   * @returns {bool}
   */
  scrollToLocation({ itemIndex, sectionIndex, animated = true }) {
    return this.scrollToIndex({
      section: sectionIndex,
      index: itemIndex,
      animated,
    });
  }

  /**
   * Scroll to item.
   * @param {object} item
   * @param {bool} animated
   * @returns {bool}
   */
  scrollToItem({ item, animated = false }) {
    let index;
    if (this.hasSections()) {
      const coords = JSON.stringify(
        this.map((a) => {
          return a[0] + "|" + a[1];
        }),
      );
      index = coords.indexOf(item[0] + "|" + item[1]) !== -1;
    } else {
      index = this.props.data.indexOf(item);
    }
    return this.scrollToIndex({ index, animated });
  }

  /**
   * Scroll to offset.
   * @param {number} offset
   * @param {bool} animated
   * @returns {bool}
   */
  scrollToOffset({ offset, animated = false }) {
    const scrollRef = this.getNativeScrollRef();
    if (scrollRef != null) {
      scrollRef.scrollTo({
        x: 0,
        y: offset,
        animated,
      });
      return true;
    }
    return false;
  }

  /**
   * Scroll to top.
   * @param {bool} animated
   * @returns {bool}
   */
  scrollToTop({ animated = true } = {}) {
    return this.scrollTo({ x: 0, y: 0, animated });
  }

  /**
   * Scroll to end.
   * @param {bool} animated
   * @returns {bool}
   */
  scrollToEnd({ animated = true } = {}) {
    const { data } = this.props;
    let section = 0;
    let index = 0;
    if (this.hasSections()) {
      const sectionLengths = this.getSectionLengths();
      section = sectionLengths[sectionLengths.length - 1];
    } else {
      index = data.length;
    }
    return this.scrollToIndex({ section, index, animated });
  }

  /**
   * Scroll to section.
   * @param {int} section
   * @param {bool} animated
   * @returns {bool}
   */
  scrollToSection({ section, animated = true }) {
    return this.scrollToIndex({ index: 0, section, animated });
  }

  /**
   * On viewable items changed.
   */
  onViewableItemsChanged() {
    const { onViewableItemsChanged } = this.props;
    if (onViewableItemsChanged) {
      const prevItems = this.viewableItems;
      const currentItems = this.state.items
        .map(({ type, section, index, key }) => {
          if (type === AnterosBigListItemType.ITEM) {
            return {
              item: this.getItem({ section, index }),
              key: key,
              index: (section + 1) * index,
              isViewable: this.isVisible({ section, index }),
            };
          }
          return false;
        })
        .filter(Boolean);
      this.viewableItems = currentItems.filter((item) => item.isViewable);
      const changed = prevItems
        .filter(
          ({ index: prevIndex }) =>
            !this.viewableItems.some(
              ({ index: nextIndex }) => nextIndex === prevIndex,
            ),
        )
        .map((item) => {
          item.isViewable = this.isVisible({
            section: item.section,
            index: item.index,
          });
          return item;
        });

      const prevViewableItem = prevItems.length;
      const currentViewableItem = this.viewableItems.length;

      if (changed.length > 0 || prevViewableItem !== currentViewableItem) {
        onViewableItemsChanged({ viewableItems: this.viewableItems, changed });
      }
    }
  }

  /**
   * Handle scroll.
   * @param event
   */
  onScroll(event) {
    const { nativeEvent } = event;
    const { contentInset, batchSizeThreshold, onViewableItemsChanged } =
      this.props;
    this.containerHeight =
      nativeEvent.layoutMeasurement.height -
      (contentInset.top || 0) -
      (contentInset.bottom || 0);
    this.scrollTop = Math.min(
      Math.max(0, nativeEvent.contentOffset.y),
      nativeEvent.contentSize.height - this.containerHeight,
    );

    const nextState = processBlock({
      containerHeight: this.containerHeight,
      scrollTop: this.scrollTop,
      batchSizeThreshold,
    });

    if (
      nextState.batchSize !== this.state.batchSize ||
      nextState.blockStart !== this.state.blockStart ||
      nextState.blockEnd !== this.state.blockEnd
    ) {
      this.setState(nextState);
    }

    if (onViewableItemsChanged) {
      this.onViewableItemsChanged();
    }

    const { onScroll, onEndReached, onEndReachedThreshold } = this.props;
    if (onScroll != null) {
      onScroll(event);
    }
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const distanceFromEnd =
      contentSize.height - (layoutMeasurement.height + contentOffset.y);
    if (distanceFromEnd <= layoutMeasurement.height * onEndReachedThreshold) {
      if (!this.endReached) {
        this.endReached = true;
        onEndReached && onEndReached({ distanceFromEnd });
      }
    } else {
      this.endReached = false;
    }
  }

  /**
   * Handle layout.
   * @param event
   */
  onLayout(event) {
    const { nativeEvent } = event;
    const { contentInset, batchSizeThreshold } = this.props;
    this.containerHeight =
      nativeEvent.layout.height -
      (contentInset.top || 0) -
      (contentInset.bottom || 0);
    const nextState = processBlock({
      containerHeight: this.containerHeight,
      scrollTop: this.scrollTop,
      batchSizeThreshold,
    });
    if (
      nextState.batchSize !== this.state.batchSize ||
      nextState.blockStart !== this.state.blockStart ||
      nextState.blockEnd !== this.state.blockEnd
    ) {
      this.setState(nextState);
    }
    const { onLayout } = this.props;
    if (onLayout) {
      onLayout(event);
    }
  }

  /**
   * Handle scroll end.
   * @param event
   */
  onScrollEnd(event) {
    const { renderAccessory, onScrollEnd } = this.props;
    if (renderAccessory != null) {
      this.forceUpdate();
    }
    if (onScrollEnd) {
      onScrollEnd(event);
    }
  }

  /**
   * Handle scroll end.
   * @param event
   */
  onMomentumScrollEnd(event) {
    const { onMomentumScrollEnd } = this.props;
    this.onScrollEnd(event);
    if (onMomentumScrollEnd) {
      onMomentumScrollEnd(event);
    }
  }

  /**
   * Is empty
   * @returns {boolean}
   */
  isEmpty() {
    const sectionLengths = this.getSectionLengths();
    const length = sectionLengths.reduce((total, sectionLength) => {
      return total + sectionLength;
    }, 0);
    return length === 0;
  }

  /**
   * Get derived state.
   * @param props
   * @param state
   * @returns {{blockStart: *, batchSize: *, blockEnd: *, items: *[], height: *}|{blockStart, batchSize, blockEnd, items: *[], height: *}}
   */
  static getDerivedStateFromProps(props, state) {
    return BigList.getListState(props, state);
  }

  /**
   * Has sections.
   * @returns {boolean}
   */
  hasSections() {
    return this.props.sections !== null;
  }

  /**
   * Get item scroll view offset.
   * @param {int} section
   * @param {int} index
   * @returns {*}
   */
  getItemOffset({ section = 0, index }) {
    const {
      insetTop,
      headerHeight,
      sectionHeaderHeight,
      sectionFooterHeight,
      numColumns,
      itemHeight,
    } = this.props;

    // Header + inset
    let offset =
      insetTop + isNumeric(headerHeight)
        ? Number(headerHeight)
        : headerHeight();

    const sections = this.getSectionLengths();
    let foundIndex = false;
    let s = 0;

    while (s <= section) {
      const rows = Math.ceil(sections[section] / numColumns);
      if (rows === 0) {
        s += 1;
        continue;
      }

      // Section header
      offset += isNumeric(sectionHeaderHeight)
        ? Number(sectionHeaderHeight)
        : sectionHeaderHeight(s);

      // Items
      if (isNumeric(itemHeight)) {
        const uniformHeight = this.getItemHeight(section);
        if (s === section) {
          offset += uniformHeight * Math.ceil(index / numColumns);
          foundIndex = true;
        } else {
          offset += uniformHeight * rows;
        }
      } else {
        for (let i = 0; i < rows; i++) {
          if (s < section || (s === section && i < index)) {
            offset += itemHeight(s, Math.ceil(i / numColumns));
          } else if (s === section && i === index) {
            foundIndex = true;
            break;
          }
        }
      }

      // Section footer
      if (!foundIndex) {
        offset += isNumeric(sectionFooterHeight)
          ? Number(sectionFooterHeight)
          : sectionFooterHeight(s);
      }
      s += 1;
    }

    return offset;
  }

  /**
   * Get item data.
   * @param {int} section
   * @param {int} index
   * @returns {*}
   */
  getItem({ index, section = 0 }) {
    if (this.hasSections()) {
      return this.props.sections[section][index];
    } else {
      return this.props.data[index];
    }
  }

  /**
   * Get items data.
   * @returns {*}
   */
  getItems() {
    return this.hasSections() ? this.props.sections : this.props.data;
  }

  /**
   * Render all list items.
   * @returns {[]|*}
   */
  renderItems() {
    const {
      keyExtractor,
      numColumns,
      hideMarginalsOnEmpty,
      hideHeaderOnEmpty,
      hideFooterOnEmpty,
      columnWrapperStyle,
      controlItemRender,
      placeholder,
      placeholderComponent,
      placeholderImage,
      ListEmptyComponent,
      ListFooterComponent,
      ListFooterComponentStyle,
      ListHeaderComponent,
      ListHeaderComponentStyle,
      renderHeader,
      renderFooter,
      renderSectionHeader,
      renderItem,
      renderSectionFooter,
      renderEmpty,
    } = this.props;
    const { items = [] } = this.state;

    const itemStyle = this.getBaseStyle();
    const fullItemStyle = mergeViewStyle(itemStyle, {
      width: "100%",
    });

    // On empty list
    const isEmptyList = this.isEmpty();
    const emptyItem = ListEmptyComponent
      ? createElement(ListEmptyComponent)
      : renderEmpty
      ? renderEmpty()
      : null;
    if (isEmptyList && emptyItem) {
      if (hideMarginalsOnEmpty || (hideHeaderOnEmpty && hideFooterOnEmpty)) {
        // Render empty
        return emptyItem;
      } else {
        // Add empty item
        const headerIndex = items.findIndex(
          (item) => item.type === AnterosBigListItemType.HEADER,
        );
        items.splice(headerIndex + 1, 0, {
          type: AnterosBigListItemType.EMPTY,
          key: "empty",
        });
        if (hideHeaderOnEmpty) {
          // Hide header
          items.splice(headerIndex, 1);
        }
        if (hideFooterOnEmpty) {
          // Hide footer
          const footerIndex = items.findIndex(
            (item) => item.type === AnterosBigListItemType.FOOTER,
          );
          items.splice(footerIndex, 1);
        }
      }
    }

    // Sections positions
    const sectionPositions = [];
    items.forEach(({ type, position }) => {
      if (type === AnterosBigListItemType.SECTION_HEADER) {
        sectionPositions.push(position);
      }
    });

    // Render items
    const children = [];
    items.forEach(({ type, key, position, height, section, index }) => {
      const itemKey = key || position; // Fallback fix
      let uniqueKey = String((section + 1) * index);
      let child;
      let style;
      switch (type) {
        case AnterosBigListItemType.HEADER:
          if (ListHeaderComponent != null) {
            child = createElement(ListHeaderComponent);
            style = mergeViewStyle(fullItemStyle, ListHeaderComponentStyle);
          } else {
            child = renderHeader();
            style = fullItemStyle;
          }
        // falls through
        case AnterosBigListItemType.FOOTER:
          if (type === AnterosBigListItemType.FOOTER) {
            if (ListFooterComponent != null) {
              child = createElement(ListFooterComponent);
              style = mergeViewStyle(fullItemStyle, ListFooterComponentStyle);
            } else {
              child = renderFooter();
              style = fullItemStyle;
            }
          }
        // falls through
        case AnterosBigListItemType.SECTION_FOOTER:
          if (type === AnterosBigListItemType.SECTION_FOOTER) {
            height = isEmptyList ? 0 : height; // Hide section footer on empty
            child = renderSectionFooter(section);
            style = fullItemStyle;
          }
        // falls through
        case AnterosBigListItemType.ITEM:
          if (type === AnterosBigListItemType.ITEM) {
            const item = this.getItem({ section, index });
            uniqueKey = keyExtractor
              ? keyExtractor(item, uniqueKey)
              : uniqueKey;
            style =
              numColumns > 1
                ? mergeViewStyle(itemStyle, columnWrapperStyle || {})
                : itemStyle;

            const renderArguments = {
              item,
              index,
              section: undefined,
              key: undefined,
              style: undefined,
            };

            if (this.hasSections()) {
              renderArguments.section = section;
            }
            if (controlItemRender) {
              renderArguments.key = uniqueKey;
              renderArguments.style = mergeViewStyle(style, {
                height,
                width: 100 / numColumns + "%",
              });
            }
            child = renderItem(renderArguments);
          }
          if (child != null) {
            children.push(
              type === AnterosBigListItemType.ITEM && controlItemRender ? (
                child
              ) : (
                <AnterosBigListItem
                  key={itemKey}
                  uniqueKey={uniqueKey}
                  height={height}
                  width={100 / numColumns + "%"}
                  style={style}
                >
                  {child}
                </AnterosBigListItem>
              ),
            );
          }
          break;
        case AnterosBigListItemType.EMPTY:
          children.push(<View key={itemKey}>{emptyItem}</View>);
          break;
        case AnterosBigListItemType.SPACER:
          children.push(
            placeholder ? (
              <AnterosBigListPlaceholder
                key={itemKey}
                height={height}
                image={placeholderImage}
                component={placeholderComponent}
              />
            ) : (
              <AnterosBigListItem key={itemKey} height={height} />
            ),
          );
          break;
        case AnterosBigListItemType.SECTION_HEADER:
          height = isEmptyList ? 0 : height; // Hide section header on empty
          sectionPositions.shift();
          child = renderSectionHeader(section);
          if (child != null) {
            children.push(
              <AnterosBigListSection
                key={itemKey}
                style={fullItemStyle}
                height={height}
                position={position}
                nextSectionPosition={sectionPositions[0]}
                scrollTopValue={this.scrollTopValue}
              >
                {child}
              </AnterosBigListSection>,
            );
          }
          break;
      }
    });
    return children;
  }

  /**
   * Component did mount.
   */
  componentDidMount() {
    const { stickySectionHeadersEnabled } = this.props;
    const scrollView = this.getNativeScrollRef();
    if (
      stickySectionHeadersEnabled &&
      scrollView != null &&
      Platform.OS !== "web"
    ) {
      // Disabled on web
      this.scrollTopValueAttachment = Animated.attachNativeEvent(
        scrollView,
        "onScroll",
        [{ nativeEvent: { contentOffset: { y: this.scrollTopValue } } }],
      );
    }
  }

  /**
   * Component did update.
   * @param prevProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps.initialScrollIndex !== this.props.initialScrollIndex) {
      throw new Error("scrollTopValue cannot changed after mounting");
    }
  }

  /**
   * Component will unmount.
   */
  componentWillUnmount() {
    if (this.scrollTopValueAttachment != null) {
      this.scrollTopValueAttachment.detach();
    }
  }

  /**
   * Get base style.
   * @return {{transform: [{scaleX: number}]}|{transform: [{scaleY: number}]}}
   */
  getBaseStyle() {
    const { inverted, horizontal } = this.props;
    if (inverted) {
      if (horizontal) {
        return {
          transform: [{ scaleX: -1 }],
        };
      } else {
        return {
          transform: [{ scaleY: -1 }],
        };
      }
    }
    return {};
  }

  /**
   * Render.
   * @returns {JSX.Element}
   */
  render() {
    // Reduce list properties
    const {
      data,
      keyExtractor,
      inverted,
      horizontal, // Disabled
      placeholder,
      placeholderImage,
      placeholderComponent,
      sections,
      initialScrollIndex,
      columnWrapperStyle,
      renderHeader,
      renderFooter,
      renderSectionHeader,
      renderItem,
      renderSectionFooter,
      renderScrollViewWrapper,
      renderEmpty,
      renderAccessory,
      itemHeight,
      footerHeight,
      headerHeight,
      sectionHeaderHeight,
      sectionFooterHeight,
      insetTop,
      insetBottom,
      actionSheetScrollRef,
      stickySectionHeadersEnabled,
      onEndReached,
      onEndReachedThreshold,
      onRefresh,
      refreshing,
      ListEmptyComponent,
      ListFooterComponent,
      ListFooterComponentStyle,
      ListHeaderComponent,
      ListHeaderComponentStyle,
      hideMarginalsOnEmpty,
      hideFooterOnEmpty,
      hideHeaderOnEmpty,
      ...props
    } = this.props;

    const wrapper = renderScrollViewWrapper || ((val) => val);
    const handleScroll =
      stickySectionHeadersEnabled && Platform.OS === "web"
        ? Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollTopValue } } }],
            {
              listener: (event) => this.onScroll(event),
              useNativeDriver: false,
            },
          )
        : this.onScroll;

    const defaultProps = {
      refreshControl:
        onRefresh && !this.props.refreshControl ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : null,
      contentContainerStyle: {
        flexDirection: "row",
        flexWrap: "wrap",
        maxWidth: "100%",
      },
    };

    const overwriteProps = {
      ref: (ref) => {
        this.scrollView.current = ref;
        if (actionSheetScrollRef) {
          actionSheetScrollRef.current = ref;
        }
      },
      onScroll: handleScroll,
      onLayout: this.onLayout,
      onMomentumScrollEnd: this.onMomentumScrollEnd,
      onScrollEndDrag: this.onScrollEnd,
    };

    const scrollViewProps = {
      ...defaultProps,
      ...props,
      ...overwriteProps,
    };

    // Content container style merge
    scrollViewProps.contentContainerStyle = mergeViewStyle(
      props.contentContainerStyle,
      defaultProps.contentContainerStyle,
    );

    const scrollView = wrapper(
      <ScrollView {...scrollViewProps}>{this.renderItems()}</ScrollView>,
    );

    const scrollStyle = mergeViewStyle(
      {
        flex: 1,
        maxHeight: Platform.select({ web: "100vh", default: "100%" }),
      },
      this.getBaseStyle(),
    );

    return (
      <View style={scrollStyle}>
        {scrollView}
        {renderAccessory != null ? renderAccessory(this) : null}
      </View>
    );
  }
}

BigList.propTypes = {
  inverted: PropTypes.bool,
  horizontal: PropTypes.bool,
  actionSheetScrollRef: PropTypes.any,
  batchSizeThreshold: PropTypes.number,
  bottom: PropTypes.number,
  numColumns: PropTypes.number,
  columnWrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  contentInset: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
  }),
  controlItemRender: PropTypes.bool,
  data: PropTypes.array,
  placeholder: PropTypes.bool,
  placeholderImage: PropTypes.any,
  placeholderComponent: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.element,
    PropTypes.node,
  ]),
  footerHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  getItemLayout: PropTypes.func,
  headerHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  insetBottom: PropTypes.number,
  insetTop: PropTypes.number,
  itemHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  keyboardDismissMode: PropTypes.string,
  keyboardShouldPersistTaps: PropTypes.string,
  ListEmptyComponent: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.element,
    PropTypes.node,
  ]),
  ListFooterComponent: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.element,
    PropTypes.node,
  ]),
  ListFooterComponentStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  ListHeaderComponent: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.element,
    PropTypes.node,
  ]),
  ListHeaderComponentStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  onEndReached: PropTypes.func,
  onEndReachedThreshold: PropTypes.number,
  onLayout: PropTypes.func,
  onRefresh: PropTypes.func,
  onScroll: PropTypes.func,
  onScrollEnd: PropTypes.func,
  onViewableItemsChanged: PropTypes.func,
  removeClippedSubviews: PropTypes.bool,
  renderAccessory: PropTypes.func,
  renderScrollViewWrapper: PropTypes.func,
  renderEmpty: PropTypes.func,
  renderFooter: PropTypes.func,
  renderHeader: PropTypes.func,
  renderItem: PropTypes.func.isRequired,
  renderSectionHeader: PropTypes.func,
  renderSectionFooter: PropTypes.func,
  keyExtractor: PropTypes.func,
  refreshing: PropTypes.bool,
  scrollEventThrottle: PropTypes.number,
  initialScrollIndex: PropTypes.number,
  hideMarginalsOnEmpty: PropTypes.bool,
  sectionFooterHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  sectionHeaderHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  sections: PropTypes.array,
  stickySectionHeadersEnabled: PropTypes.bool,
};

BigList.defaultProps = {
  // Data
  data: [],
  inverted: false,
  horizontal: false,
  sections: null,
  refreshing: false,
  batchSizeThreshold: 1,
  numColumns: 1,
  placeholder: Platform.select({
    web: false,
    default: false /* TODO: default disabled until a solution for different screen sizes is found */,
  }),
  // Renders
  renderItem: () => null,
  renderHeader: () => null,
  renderFooter: () => null,
  renderSectionHeader: () => null,
  renderSectionFooter: () => null,
  hideMarginalsOnEmpty: false,
  hideFooterOnEmpty: false,
  hideHeaderOnEmpty: false,
  controlItemRender: false,
  // Height
  itemHeight: 50,
  headerHeight: 0,
  footerHeight: 0,
  sectionHeaderHeight: 0,
  sectionFooterHeight: 0,
  // Scroll
  stickySectionHeadersEnabled: true,
  removeClippedSubviews: false,
  scrollEventThrottle: Platform.OS === "web" ? 5 : 16,
  // Keyboard
  keyboardShouldPersistTaps: "always",
  keyboardDismissMode: "interactive",
  // Insets
  insetTop: 0,
  insetBottom: 0,
  contentInset: { top: 0, right: 0, left: 0, bottom: 0 },
  onEndReachedThreshold: 0,
};


export const AnterosBigList = Animated.createAnimatedComponent(BigList);