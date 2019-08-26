'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  Image,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  Text,
  PanResponder,
  TouchableWithoutFeedback,
  View,
  Platform
} from 'react-native';

import _ from 'lodash';


export class AnterosAtoZList extends Component {
  static propTypes = {
    sectionHeaderHeight: PropTypes.number.isRequired,
    cellHeight: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    renderCell: PropTypes.func,
    renderSection: PropTypes.func,
    onEndReached: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);

    let sectionHeight = props.sectionHeaderHeight || 35;
    let cellHeight = props.cellHeight || 95;

    var dataSource = new FixedHeightWindowedListView.DataSource({
      getHeightForSectionHeader: (sectionId) => {
        return sectionHeight;
      },
      getHeightForCell: (sectionId) => {
        return cellHeight;
      }
    });

    this.state = {
      dataSource: dataSource.cloneWithCellsAndSections(this.props.data),
      alphabet: Object.keys(this.props.data)
    };

    this.dataSource = dataSource;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({
        dataSource: this
          .dataSource
          .cloneWithCellsAndSections(nextProps.data),
        alphabet: Object.keys(nextProps.data)
      });
    }
  }

  render() {
    this._alphabetInstance = (
      <View style={styles.alphabetSidebar}>
        <AlphabetPicker
          alphabet={this.state.alphabet}
          onTouchLetter={this
          ._onTouchLetter
          .bind(this)}/>
      </View>
    );

    return (
      <View style={{
        flex: 1
      }}>
        <View style={styles.container}>
          <FixedHeightWindowedListView
            ref={view => this._listView = view}
            dataSource={this.state.dataSource}
            renderCell={this.props.renderCell}
            renderSectionHeader={this.props.renderSection}
            incrementDelay={16}
            initialNumToRender={8}
            pageSize={Platform.OS === 'ios'
            ? 15
            : 8}
            maxNumToRender={70}
            numToRenderAhead={40}
            numToRenderBehind={4}
            onEndReached={this.props.onEndReached}/>
        </View>
        {this._alphabetInstance}
      </View>
    );
  }

  _onTouchLetter(letter) {
    this
      ._listView
      .scrollToSectionBuffered(letter);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#fff'
  },
  alphabetSidebar: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class LetterPicker extends Component {

  render() {
    return (
      <Text style={{
        fontSize: 11,
        fontWeight: 'bold'
      }}>
        {this.props.letter}
      </Text>
    );
  }
}

const Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

class AlphabetPicker extends Component {
  constructor(props, context) {
    super(props, context);
    if (props.alphabet) {
      Alphabet = props.alphabet;
    }
    this.state = {
      alphabet: Alphabet
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.props.onTouchStart && this
          .props
          .onTouchStart();

        this.tapTimeout = setTimeout(() => {
          this._onTouchLetter(this._findTouchedLetter(gestureState.y0));
        }, 100);
      },
      onPanResponderMove: (evt, gestureState) => {
        clearTimeout(this.tapTimeout);
        this._onTouchLetter(this._findTouchedLetter(gestureState.moveY));
      },
      onPanResponderTerminate: this
        ._onPanResponderEnd
        .bind(this),
      onPanResponderRelease: this
        ._onPanResponderEnd
        .bind(this)
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.alphabet !== nextProps.alphabet) {
      this.setState({alphabet: nextProps.alphabet})
    }
  }

  _onTouchLetter(letter) {
    letter && this.props.onTouchLetter && this
      .props
      .onTouchLetter(letter);
  }

  _onPanResponderEnd() {
    requestAnimationFrame(() => {
      this.props.onTouchEnd && this
        .props
        .onTouchEnd();
    });
  }

  _findTouchedLetter(y) {
    let top = y - (this.absContainerTop || 0);
    const {alphabet} = this.state

    if (top >= 1 && top <= this.containerHeight) {
      return alphabet[Math.round((top / this.containerHeight) * alphabet.length)]
    }
  }

  _onLayout(event) {
    this
      .refs
      .alphabetContainer
      .measure((x1, y1, width, height, px, py) => {
        this.absContainerTop = py;
        this.containerHeight = height;
      });
  }

  render() {
    const {alphabet} = this.state
    this._letters = (alphabet.map((letter) => <LetterPicker letter={letter} key={letter}/>));

    return (
      <View
        ref='alphabetContainer'
        {...this._panResponder.panHandlers}
        onLayout={this
        ._onLayout
        .bind(this)}
        style={{
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        borderRadius: 1,
        justifyContent: 'center'
      }}>
        <View>
          {this._letters}
        </View>
      </View>
    );
  }

}

function clamp(min, value, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

var deepDiffer = function (one, two) {
  if (one === two) {
    // Short circuit on identical object references instead of traversing them.
    return false;
  }
  if ((typeof one === 'function') && (typeof two === 'function')) {
    // We consider all functions equal
    return false;
  }
  if ((typeof one !== 'object') || (one === null)) {
    // Primitives can be directly compared
    return one !== two;
  }
  if ((typeof two !== 'object') || (two === null)) {
    // We know they are different because the previous case would have triggered
    // otherwise.
    return true;
  }
  if (one.constructor !== two.constructor) {
    return true;
  }
  if (Array.isArray(one)) {
    // We know two is also an array because the constructors are equal
    var len = one.length;
    if (two.length !== len) {
      return true;
    }
    for (var ii = 0; ii < len; ii++) {
      if (deepDiffer(one[ii], two[ii])) {
        return true;
      }
    }
  } else {
    for (var key in one) {
      if (deepDiffer(one[key], two[key])) {
        return true;
      }
    }
    for (var twoKey in two) {
      // The only case we haven't checked yet is keys that are in two but aren't in
      // one, which means they are different.
      if (one[twoKey] === undefined && two[twoKey] !== undefined) {
        return true;
      }
    }
  }
  return false;
};

var invariant = function (condition, format, a, b, c, d, e, f) {
  if (__DEV__) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment for the full e' +
          'rror message and additional helpful warnings.');
    } else {
      var args = [
        a,
        b,
        c,
        d,
        e,
        f
      ];
      var argIndex = 0;
      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};





class FixedHeightWindowedListViewDataSource {

  constructor(params) {
    this._dataSource = [];
    this._lookup = {};

    this._getHeightForSectionHeader = params.getHeightForSectionHeader;
    this._getHeightForCell = params.getHeightForCell;
  }

  computeRowsToRender(options) {
    let {
      scrollDirection,
      firstVisible,
      lastVisible,
      firstRendered,
      lastRendered,
      pageSize,
      maxNumToRender,
      numToRenderAhead
    } = options;

    invariant(numToRenderAhead < maxNumToRender, `numToRenderAhead must be less than maxNumToRender`,);

    let numRendered = lastRendered - firstRendered + 1;
    let lastRow,
      targetLastRow,
      firstRow,
      targetFirstRow;

    if (scrollDirection === 'down') {
      let lastResult = this.__computeLastRow({
        numRendered,
        ...options
      });
      lastRow = lastResult.lastRow;
      targetLastRow = lastResult.targetLastRow;
      let firstResult = this.__computeFirstRow({
        lastRow,
        numRendered,
        ...options
      });
      firstRow = firstResult.firstRow;
      targetFirstRow = firstResult.targetFirstRow;
    } else if (scrollDirection === 'up') {
      let firstResult = this.__computeFirstRow({
        numRendered,
        ...options
      });
      firstRow = firstResult.firstRow;
      targetFirstRow = firstResult.targetFirstRow;
      let lastResult = this.__computeLastRow({
        firstRow,
        numRendered,
        ...options
      });
      lastRow = lastResult.lastRow;
      targetLastRow = lastResult.targetLastRow;
    }

    return {firstRow, lastRow, targetFirstRow, targetLastRow};
  }

  __computeFirstRow(options) {
    let {
      lastRow,
      firstVisible,
      lastVisible,
      maxNumToRender,
      numToRenderBehind,
      numToRenderAhead,
      numRendered,
      firstRendered,
      scrollDirection,
      pageSize
    } = options;

    let firstRow,
      targetFirstRow;

    if (scrollDirection === 'down') {
      targetFirstRow = firstRow = Math.max(0, firstVisible - numToRenderBehind, // Never hide the first visible row
          lastRow - maxNumToRender, // Don't exceed max to render
      );
    } else if (scrollDirection === 'up') {
      targetFirstRow = Math.max(0, // Don't render past the top
          firstVisible - numToRenderAhead + numToRenderBehind, // Primary goal -- this is what we need lastVisible for
      );

      firstRow = Math.max(targetFirstRow, firstRendered - pageSize,);
    }

    return {firstRow, targetFirstRow};
  }

  __computeLastRow(options) {
    let {
      firstVisible,
      firstRow,
      numRendered,
      lastVisible,
      totalRows,
      numToRenderBehind,
      numToRenderAhead,
      lastRendered,
      pageSize,
      maxNumToRender,
      scrollDirection
    } = options;

    let lastRow,
      targetLastRow;

    if (scrollDirection === 'down') {
      targetLastRow = Math.min(totalRows - 1, // Don't render past the bottom
          lastVisible + numToRenderAhead - numToRenderBehind, // Primary goal -- this is what we need lastVisible for
          firstVisible + numRendered + numToRenderAhead - numToRenderBehind, // But don't exceed num to render ahead
      );

      lastRow = Math.min(targetLastRow, lastRendered + pageSize,);
    } else if (scrollDirection === 'up') {
      targetLastRow = lastRow = lastRendered;

      let numToBeRendered = (lastRendered - firstRow);
      if (numToBeRendered > maxNumToRender) {
        targetLastRow = lastRow = targetLastRow - (numToBeRendered - maxNumToRender);
      }
    }

    return {lastRow, targetLastRow};
  }

  /**
   * Public: Used to set the height of the top spacer
   *
   * i - the index of a row in _dataSource
   *
   * Returns the height of spacer before the first rendered row.
   */
  getHeightBeforeRow(i) {
    let height = 0;

    // console.log(this._lookup);
    _.forEach(this._lookup, (section, sectionId) => {
      if (i > section.range[0] && i <= section.range[1]) {
        height += section.sectionHeaderHeight;
        height += ((i - 1) - section.range[0]) * section.cellHeight;
      } else if (section.range[0] < i) {
        height += section.height;
      }
    });

    return height;
  }

  hasSection(sectionId) {
    return !!this._lookup[sectionId];
  }

  getFirstRowOfSection(sectionId) {
    let range = this._lookup[sectionId].range;
    let startY = this._lookup[sectionId].startY;

    return {row: range[0], startY};
  }

  /**
   * Public: Find the height between index i and index ii, where i < ii
   */
  getHeightBetweenRows(i, ii) {
    if (ii < i) {
      console.warn('provide the lower index first');
    }

    return this.getHeightBeforeRow(ii) - this.getHeightBeforeRow(i + 1);
  }

  /**
   * Public: Used to set the height of the bottom spacer
   *
   * i - the index of a row in _dataSource
   *
   * Returns the height of spacer after the last rendered row.
   */
  getHeightAfterRow(i) {
    return (this.getTotalHeight() - this.getHeightBeforeRow(i) - this.getRowHeight(i));
  }

  /**
   * Public: Used by computeRowsToRender to determine what the target
   * last row is (lastVisible + numToRenderAhead)
   */
  computeVisibleRows(scrollY, viewportHeight) {
    let firstVisible = this.getRowAtHeight(scrollY);
    let lastVisible = this.getRowAtHeight(scrollY + viewportHeight) + 1;

    return {firstVisible, lastVisible};
  }

  /**
   * Public: Gets the number of rows (cells + section headers)
   *
   * Returns the number of rows.
   */
  getRowCount() {
    return this._dataSource.length;
  }

  /**
   * Public: Gets the data for a cell or header at the given row index
   *
   * Returns whatever is stored in datasource for the given index
   */
  getRowData(i) {
    return this._dataSource[i];
  }

  /**
   * Private: Used internally by computeVisibleRows
   *
   * scrollY - the Y position at the top of the ScrollView
   *
   * Returns the index of the row in the _dataSource array that should be
   * rendered at the given scrollY.
   */
  getRowAtHeight(scrollY) {
    if (scrollY < 0) {
      return 0;
    } else if (scrollY > this.getTotalHeight()) {
      return Math.max(this.getRowCount() - 1, 0);
    }

    let parentSection = _.find(this._lookup, (value) => {
      return scrollY >= value.startY && scrollY <= value.endY;
    });

    let relativeY = scrollY - parentSection.startY;

    if (relativeY <= parentSection.sectionHeaderHeight) {
      return parentSection.range[0];
    } else {
      let i = Math.floor((relativeY - parentSection.sectionHeaderHeight) / parentSection.cellHeight);
      return parentSection.range[0] + i;
    }
  }

  getRowHeight(i) {
    let row = this._dataSource[i];

    if (row && _.isObject(row) && row.sectionId) {
      return this.getSectionHeaderHeight(row.sectionId);
    } else {
      return this.getCellHeight(i);
    }
  }

  getSectionHeaderHeight(sectionId) {
    return this._lookup[sectionId].sectionHeaderHeight;
  }

  getCellHeight(i) {
    let parentSection = this.getParentSection(i);

    if (parentSection) {
      return parentSection.cellHeight;
    }
  }

  getSectionId(i) {
    return this
      .getParentSection(i)
      .sectionId;
  }

  getParentSection(i) {
    return _.find(this._lookup, (section) => {
      return i >= section.range[0] && i <= section.range[1];
    });
  }

  getTotalHeight() {
    let keys = Object.keys(this._lookup);
    let lastSection = this._lookup[keys[keys.length - 1]];

    if (lastSection) {
      return lastSection.endY;
    } else {
      return 0;
    }
  }

  cloneWithCellsAndSections(dataBlob, sectionIds = Object.keys(dataBlob)) {
    /* Take in { 'A': [{..}, {..}], 'B': [{..}]} and turn it into
     *         [ { sectionId: 'A' }, {..}, {..}, { sectionId: 'B' }, {..} ]
     *
     * This is important because we want to treat section headers just as
     * other rows.
     */
    this._dataSource = [];
    let sectionIdsPresent = [];

    sectionIds.forEach((sectionId) => {
      if (dataBlob[sectionId]) {
        this
          ._dataSource
          .push({
            sectionId
          }, ...dataBlob[sectionId]);
        sectionIdsPresent.push(sectionId);
      }
    });

    /* Build a data structure like this so we can easily perform calculations we
     * need later:
     * { 'A': { rows: 2, range: [0, 2], height: 250, startY: 0, endY: 250, cellHeight: 95, sectionHeaderHeight: 35} }
     */
    let lastRow = -1;
    let cumulativeHeight = 0;
    this._lookup = sectionIdsPresent.reduce((result, sectionId) => {
      let sectionHeaderHeight = this._getHeightForSectionHeader(sectionId);
      let cellHeight = this._getHeightForCell(sectionId);
      let count = dataBlob[sectionId].length;
      let sectionHeight = sectionHeaderHeight + cellHeight * count;

      result[sectionId] = {
        count: count + 1, // Factor in section header
        range: [
          lastRow + 1,
          lastRow + 1 + count
        ], // Move 1 ahead of previous last row
        height: sectionHeight,
        startY: cumulativeHeight,
        endY: cumulativeHeight + sectionHeight,
        cellHeight,
        sectionHeaderHeight,
        sectionId
      };

      cumulativeHeight += sectionHeight;
      lastRow = lastRow + 1 + count;

      return result;
    }, {});

    return this;
  }

  getHeightOfSection(sectionId) {
    return this._lookup[sectionId].height;
  }

  /**
   * Returns an array containing the number of rows in each section
   */
  getSectionLengths() {
    let result = [];
    _.forEach(this._lookup, value => {
      result.push(value.count);
    });
    return result;
  }
}



/**
 * An experimental ListView implementation that only renders a subset of rows of
 * a potentially very large set of data.
 *
 * Row data should be provided as a simple array corresponding to rows. `===`
 * is used to determine if a row has changed and should be re-rendered.
 *
 * Rendering is done incrementally by row to minimize the amount of work done
 * per JS event tick.
 *
 * Rows must have a pre-determined height, thus FixedHeight. The height
 * of the rows can vary depending on the section that they are in.
 */
class FixedHeightWindowedListView extends Component {

  constructor(props, context) {
    super(props, context);

    invariant(this.props.numToRenderAhead < this.props.maxNumToRender, 'FixedHeightWindowedListView: numToRenderAhead must be less than maxNumToRender');

    invariant(this.props.numToRenderBehind < this.props.maxNumToRender, 'FixedHeightWindowedListView: numToRenderBehind must be less than maxNumToRender');

    this.__onScroll = this
      .__onScroll
      .bind(this);
    this.__enqueueComputeRowsToRender = this
      .__enqueueComputeRowsToRender
      .bind(this);
    this.__computeRowsToRenderSync = this
      .__computeRowsToRenderSync
      .bind(this);
    this.scrollOffsetY = 0;
    this.height = 0;
    this.willComputeRowsToRender = false;
    this.timeoutHandle = 0;
    this.nextSectionToScrollTo = null;
    this.scrollDirection = 'down';

    let {dataSource, initialNumToRender} = this.props;

    this.state = {
      firstRow: 0,
      lastRow: Math.min(dataSource.getRowCount() - 1, initialNumToRender),
      bufferFirstRow: null,
      bufferLastRow: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.__computeRowsToRenderSync(nextProps, true);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }

  render() {
    this.__rowCache = this.__rowCache || {};

    let {bufferFirstRow, bufferLastRow} = this.state;
    let {firstRow, lastRow} = this.state;
    let {spacerTopHeight, spacerBottomHeight, spacerMidHeight} = this.__calculateSpacers();

    let rows = [];
    rows.push(<View key="sp-top" style={{
      height: spacerTopHeight
    }}/>);

    if (bufferFirstRow < firstRow && bufferFirstRow !== null) {
      bufferLastRow = clamp(0, bufferLastRow, firstRow - 1);
      this.__renderCells(rows, bufferFirstRow, bufferLastRow);

      // It turns out that this isn't needed, we don't really care about what is
      // rendered after in this case because it will be immediately replaced with the
      // non-buffered window. Leaving this in can sometimes lead to white screen
      // flashes on Android. rows.push(<View key="sp-mid" style={{height:
      // spacerMidHeight}} />);
    }

    this.__renderCells(rows, firstRow, lastRow);

    if (bufferFirstRow > lastRow && bufferFirstRow !== null) {
      rows.push(<View key="sp-mid" style={{
        height: spacerMidHeight
      }}/>);
      this.__renderCells(rows, bufferFirstRow, bufferLastRow);
    }

    let totalRows = this
      .props
      .dataSource
      .getRowCount();
    rows.push(<View key="sp-bot" style={{
      height: spacerBottomHeight
    }}/>);

    return (
      <ScrollView
        scrollEventThrottle={50}
        removeClippedSubviews={this.props.numToRenderAhead === 0
        ? false
        : true}
        automaticallyAdjustContentInsets={false}
        {...this.props}
        ref={(ref) => {
        this.scrollRef = ref;
      }}
        onScroll={this.__onScroll}>
        {rows}
      </ScrollView>
    );
  }

  getScrollResponder() {
    return this.scrollRef && this.scrollRef.getScrollResponder && this
      .scrollRef
      .getScrollResponder();
  }

  scrollToSectionBuffered(sectionId) {
    if (!this.isScrollingToSection && this.props.dataSource.hasSection(sectionId)) {
      let {row, startY} = this
        .props
        .dataSource
        .getFirstRowOfSection(sectionId);
      let {initialNumToRender, numToRenderBehind} = this.props;
      let totalRows = this
        .props
        .dataSource
        .getRowCount();
      let lastRow = totalRows - 1;

      // We don't want to run computeRowsToRenderSync while scrolling
      this.__clearEnqueuedComputation();
      this.isScrollingToSection = true;

      let windowFirstRow = row;
      let windowLastRow = Math.min(lastRow, row + initialNumToRender);

      // If we are at the bottom of the list, subtract any left over rows from the
      // firstRow
      if (windowLastRow - lastRow === 0) {
        windowFirstRow = Math.max(0, windowLastRow - initialNumToRender);
      }

      // Set up the buffer
      this.setState({
        bufferFirstRow: windowFirstRow,
        bufferLastRow: windowLastRow
      }, () => {
        this.__maybeWait(() => {
          this.setState({
            firstRow: windowFirstRow,
            lastRow: windowLastRow,
            bufferFirstRow: null,
            bufferLastRow: null
          }, () => {
            if (this.nextSectionToScrollTo !== null) {
              requestAnimationFrame(() => {
                let nextSectionID = this.nextSectionToScrollTo;
                this.nextSectionToScrollTo = null;
                this.isScrollingToSection = false;
                this.scrollToSectionBuffered(nextSectionID);
              });
            } else {
              // On Android it seems like it is possible for the scroll position to be
              // reported incorrectly sometimes, so we delay setting isScrollingToSection to
              // false here to give it more time for the scroll position to catch up (?) which
              // is important for calculating the firstVisible and lastVisible, ultimately
              // determining rows to render. Leaving this out sometimes causes a blank screen
              // briefly, with the firstRow exceeding lastRow.
              setTimeout(() => {
                this.isScrollingToSection = false;
                this.__clearEnqueuedComputation();
                this.__enqueueComputeRowsToRender();
              }, 100);
            }
          });
        });
      });

      // Scroll to the buffer area as soon as setState is complete
      this
        .scrollRef
        .scrollTo({y: startY, animated: false});
      //  this.scrollRef.scrollTo({x: 0, y: startY, animation: false});
    } else {
      this.nextSectionToScrollTo = sectionId; // Only keep the most recent value
    }
  }

  scrollWithoutAnimationTo(destY, destX) {
    this.scrollRef && this
      .scrollRef
      .scrollTo({y: destY, x: destX, animated: false});

  }

  // Android requires us to wait a frame between setting the buffer, scrolling to
  // it, and then setting the firstRow and lastRow to the buffer. If not, white
  // flash. iOS doesnt't care.
  __maybeWait(callback) {
    if (Platform.OS === 'android') {
      requestAnimationFrame(() => {
        callback();
      });
    } else {
      callback();
    }
  }

  __renderCells(rows, firstRow, lastRow) {
    for (var idx = firstRow; idx <= lastRow; idx++) {
      let data = this
        .props
        .dataSource
        .getRowData(idx);
      let id = idx.toString();
      let parentSectionId = '';

      // TODO: generalize this!
      if (data && data.get && data.get('guid_token')) {
        id = data.get('guid_token');
      }

      let key = id;

      if (!(data && _.isObject(data) && data.sectionId)) {
        parentSectionId = this
          .props
          .dataSource
          .getSectionId(idx)
        key = `${key}-${id}`;
      }

      rows.push(<CellRenderer
        key={key}
        shouldUpdate={data !== this.__rowCache[key]}
        render={this
        .__renderRow
        .bind(this, data, parentSectionId, idx, key)}/>);

      this.__rowCache[key] = data;
    }
  }

  __renderRow(data, parentSectionId, idx, key) {
    if (data && _.isObject(data) && data.sectionId) {
      return this
        .props
        .renderSectionHeader(data, null, idx, key);
    } else {
      return this
        .props
        .renderCell(data, parentSectionId, idx, key);
    }
  }

  __onScroll(e) {
    this.prevScrollOffsetY = this.scrollOffsetY || 0;
    this.scrollOffsetY = e.nativeEvent.contentOffset.y;
    this.scrollDirection = this.__getScrollDirection();
    this.height = e.nativeEvent.layoutMeasurement.height;
    this.__enqueueComputeRowsToRender();

    if (this.props.onEndReached) {
      const windowHeight = Dimensions
        .get('window')
        .height;
      const {height} = e.nativeEvent.contentSize;
      const offset = e.nativeEvent.contentOffset.y;

      if (windowHeight + offset >= height) {
        // ScrollEnd
        this
          .props
          .onEndReached(e);
      }
    }
  }

  __getScrollDirection() {
    if (this.scrollOffsetY - this.prevScrollOffsetY >= 0) {
      return 'down';
    } else {
      return 'up';
    }
  }

  __clearEnqueuedComputation() {
    clearTimeout(this.timeoutHandle);
    this.willComputeRowsToRender = false;
  }

  __enqueueComputeRowsToRender() {
    if (!this.willComputeRowsToRender) {
      this.willComputeRowsToRender = true; // batch up computations
      clearTimeout(this.timeoutHandle);

      this.timeoutHandle = setTimeout(() => {
        this.willComputeRowsToRender = false;
        this.__computeRowsToRenderSync(this.props);
      }, this.props.incrementDelay);
    }
  }

  /**
   * The result of this is an up-to-date state of firstRow and lastRow, given
   * the viewport.
   */
  __computeRowsToRenderSync(props, forceUpdate = false) {
    if (this.props.bufferFirstRow === 0 || this.props.bufferFirstRow > 0 || this.isScrollingToSection) {
      requestAnimationFrame(() => {
        this.__computeRowsToRenderSync(this.props);
      });
      return;
    }

    let {dataSource} = this.props;
    let totalRows = dataSource.getRowCount();

    if (totalRows === 0) {
      this.setState({firstRow: 0, lastRow: -1});
      return;
    }

    if (this.props.numToRenderAhead === 0) {
      return;
    }

    let {firstVisible, lastVisible} = dataSource.computeVisibleRows(this.scrollOffsetY, this.height,);

    if ((lastVisible >= totalRows - 1) && !forceUpdate) {
      return;
    }

    let scrollDirection = this.props.isTouchingSectionPicker
      ? 'down'
      : this.scrollDirection;

    let {firstRow, lastRow, targetFirstRow, targetLastRow} = dataSource.computeRowsToRender({
      scrollDirection,
      firstVisible,
      lastVisible,
      firstRendered: this.state.firstRow,
      lastRendered: this.state.lastRow,
      maxNumToRender: props.maxNumToRender,
      pageSize: props.pageSize,
      numToRenderAhead: props.numToRenderAhead,
      numToRenderBehind: props.numToRenderBehind,
      totalRows
    });

    this.setState({firstRow, lastRow});

    // Keep enqueuing updates until we reach the targetLastRow or targetFirstRow
    if (lastRow !== targetLastRow || firstRow !== targetFirstRow) {
      this.__enqueueComputeRowsToRender();
    }
  }

  /**
   * TODO: pull this out into data source, add tests
   */
  __calculateSpacers() {
    let {bufferFirstRow, bufferLastRow} = this.state;
    let {firstRow, lastRow} = this.state;

    let spacerTopHeight = this
      .props
      .dataSource
      .getHeightBeforeRow(firstRow);
    let spacerBottomHeight = this
      .props
      .dataSource
      .getHeightAfterRow(lastRow);
    let spacerMidHeight;

    if (bufferFirstRow !== null && bufferFirstRow < firstRow) {
      spacerMidHeight = this
        .props
        .dataSource
        .getHeightBetweenRows(bufferLastRow, firstRow);

      let bufferHeight = this
        .props
        .dataSource
        .getHeightBetweenRows(bufferFirstRow - 1, bufferLastRow + 1);

      spacerTopHeight -= (spacerMidHeight + bufferHeight);
    } else if (bufferFirstRow !== null && bufferFirstRow > lastRow) {
      spacerMidHeight = this
        .props
        .dataSource
        .getHeightBetweenRows(lastRow, bufferFirstRow);

      spacerBottomHeight -= spacerMidHeight;
    }

    return {spacerTopHeight, spacerBottomHeight, spacerMidHeight}
  }
}

FixedHeightWindowedListView.DataSource = FixedHeightWindowedListViewDataSource;

FixedHeightWindowedListView.propTypes = {
  dataSource: PropTypes.object.isRequired,
  renderCell: PropTypes.func.isRequired,
  renderSectionHeader: PropTypes.func,
  incrementDelay: PropTypes.number,
  initialNumToRender: PropTypes.number,
  maxNumToRender: PropTypes.number,
  numToRenderAhead: PropTypes.number,
  numToRenderBehind: PropTypes.number,
  pageSize: PropTypes.number,
  onEndReached: PropTypes.func
};

FixedHeightWindowedListView.defaultProps = {
  incrementDelay: 17,
  initialNumToRender: 1,
  maxNumToRender: 20,
  numToRenderAhead: 4,
  numToRenderBehind: 2,
  pageSize: 5
};

const DEBUG = false;

class CellRenderer extends React.Component {
  shouldComponentUpdate(newProps) {
    return newProps.shouldUpdate;
  }

  render() {
    return this
      .props
      .render()
  }
}

CellRenderer.propTypes = {
  shouldUpdate: PropTypes.bool,
  render: PropTypes.func
};

