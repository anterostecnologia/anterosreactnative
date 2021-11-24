'use strict';

import {
	Component,
} from 'react';
import PropTypes from 'prop-types';
import {
	FlatList,
	ListView,
	Text,
	Animated,
	PanResponder,
	StyleSheet,
	TouchableOpacity,
	ViewPropTypes,
	View,
} from 'react-native';
const DEFAULT_PREVIEW_OPEN_DELAY = 700;
const PREVIEW_CLOSE_DELAY = 300;
const MAX_VELOCITY_CONTRIBUTION = 5;
const SCROLL_LOCK_MILLISECONDS = 300;

/**
 * Row that is generally used in a AnterosSwipeListView.
 * If you are rendering a AnterosSwipeRow explicitly you must pass the AnterosSwipeRow exactly two children.
 * The first will be rendered behind the second.
 * e.g.
  <AnterosSwipeRow>
      <View style={hiddenRowStyle} />
      <View style={visibleRowStyle} />
  </AnterosSwipeRow>
 */
export class AnterosSwipeRow extends Component {

	constructor(props) {
		super(props);
		this.horizontalSwipeGestureBegan = false;
		this.swipeInitialX = null;
		this.parentScrollEnabled = true;
		this.ranPreview = false;
		this._ensureScrollEnabledTimer = null;
		this.state = {
			dimensionsSet: false,
			hiddenHeight: 0,
			hiddenWidth: 0
		};
		this._translateX = new Animated.Value(0);
	}

	UNSAFE_componentWillMount() {
		this._panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: (e, gs) => this.handleOnMoveShouldSetPanResponder(e, gs),
			onPanResponderMove: (e, gs) => this.handlePanResponderMove(e, gs),
			onPanResponderRelease: (e, gs) => this.handlePanResponderEnd(e, gs),
			onPanResponderTerminate: (e, gs) => this.handlePanResponderEnd(e, gs),
			onShouldBlockNativeResponder: _ => false,
		});
	}

	componentWillUnmount() {
		clearTimeout(this._ensureScrollEnabledTimer)
	}

	getPreviewAnimation(toValue, delay) {
		return Animated.timing(
			this._translateX,
			{ duration: this.props.previewDuration, toValue, delay }
		);
	}

	onContentLayout(e) {
		this.setState({
			dimensionsSet: !this.props.recalculateHiddenLayout,
			hiddenHeight: e.nativeEvent.layout.height,
			hiddenWidth: e.nativeEvent.layout.width,
		});

		if (this.props.preview && !this.ranPreview) {
			this.ranPreview = true;
			let previewOpenValue = this.props.previewOpenValue || this.props.rightOpenValue * 0.5;
			this.getPreviewAnimation(previewOpenValue, this.props.previewOpenDelay)
			.start( _ => {
				this.getPreviewAnimation(0, PREVIEW_CLOSE_DELAY).start();
			});
		}
	}

	onRowPress() {
		if (this.props.onRowPress) {
			this.props.onRowPress();
		} else {
			if (this.props.closeOnRowPress) {
				this.closeRow();
			}
		}
	}

	handleOnMoveShouldSetPanResponder(e, gs) {
		const { dx } = gs;
		return Math.abs(dx) > this.props.directionalDistanceChangeThreshold;
	}

	handlePanResponderMove(e, gestureState) {
		const { dx, dy } = gestureState;
		const absDx = Math.abs(dx);
		const absDy = Math.abs(dy);

		// this check may not be necessary because we don't capture the move until we pass the threshold
		// just being extra safe here
		if (absDx > this.props.directionalDistanceChangeThreshold || absDy > this.props.directionalDistanceChangeThreshold) {
			// we have enough to determine direction
			if (absDy > absDx && !this.horizontalSwipeGestureBegan) {
				// user is moving vertically, do nothing, listView will handle
				return;
			}

			// user is moving horizontally
			if (this.parentScrollEnabled) {
				// disable scrolling on the listView parent
				this.parentScrollEnabled = false;
				this.props.setScrollEnabled && this.props.setScrollEnabled(false);
			}

			if (this.swipeInitialX === null) {
				// set tranlateX value when user started swiping
				this.swipeInitialX = this._translateX._value
			}
			if (!this.horizontalSwipeGestureBegan) {
				this.horizontalSwipeGestureBegan = true;
				this.props.swipeGestureBegan && this.props.swipeGestureBegan();
			}

			let newDX = this.swipeInitialX + dx;
			if (this.props.disableLeftSwipe  && newDX < 0) { newDX = 0; }
			if (this.props.disableRightSwipe && newDX > 0) { newDX = 0; }


			if (this.props.stopLeftSwipe && newDX > this.props.stopLeftSwipe) { newDX = this.props.stopLeftSwipe; }
			if (this.props.stopRightSwipe && newDX < this.props.stopRightSwipe) { newDX = this.props.stopRightSwipe; }

			this._translateX.setValue(newDX);

		}
	}

	ensureScrollEnabled = () => {
		if (!this.parentScrollEnabled) {
			this.parentScrollEnabled = true;
			this.props.setScrollEnabled && this.props.setScrollEnabled(true);
		}
	}

	handlePanResponderEnd(e, gestureState) {

		// decide how much the velocity will affect the final position that the list item settles in.
		const swipeToOpenVelocityContribution = this.props.swipeToOpenVelocityContribution;
		const possibleExtraPixels = this.props.rightOpenValue * (swipeToOpenVelocityContribution);
		const clampedVelocity = Math.min(gestureState.vx, MAX_VELOCITY_CONTRIBUTION);
		const projectedExtraPixels = possibleExtraPixels * (clampedVelocity / MAX_VELOCITY_CONTRIBUTION);

		// re-enable scrolling on listView parent
		this._ensureScrollEnabledTimer = setTimeout(this.ensureScrollEnabled, SCROLL_LOCK_MILLISECONDS);

		// finish up the animation
		let toValue = 0;
		if (this._translateX._value >= 0) {
			// trying to swipe right
			if (this.swipeInitialX < this._translateX._value) {
				if ((this._translateX._value - projectedExtraPixels) > this.props.leftOpenValue * (this.props.swipeToOpenPercent/100)) {
					// we're more than halfway
					toValue = this.props.leftOpenValue;
				}
			} else {
				if ((this._translateX._value - projectedExtraPixels) > this.props.leftOpenValue * (1 - (this.props.swipeToClosePercent/100))) {
					toValue = this.props.leftOpenValue;
				}
			}
		} else {
			// trying to swipe left
			if (this.swipeInitialX > this._translateX._value) {
				if ((this._translateX._value - projectedExtraPixels) < this.props.rightOpenValue * (this.props.swipeToOpenPercent/100)) {
					// we're more than halfway
					toValue = this.props.rightOpenValue;
				}
			} else {
				if ((this._translateX._value - projectedExtraPixels) < this.props.rightOpenValue * (1 - (this.props.swipeToClosePercent/100))) {
					toValue = this.props.rightOpenValue;
				}
			}
		}

		this.manuallySwipeRow(toValue);
	}

	/*
	 * This method is called by AnterosSwipeListView
	 */
	closeRow() {
		this.manuallySwipeRow(0);
	}

	manuallySwipeRow(toValue) {
		Animated.spring(
			this._translateX,
			{
				toValue,
				friction: this.props.friction,
				tension: this.props.tension,
			}
		).start( _ => {
			this.ensureScrollEnabled()
			if (toValue === 0) {
				this.props.onRowDidClose && this.props.onRowDidClose();
			} else {
				this.props.onRowDidOpen && this.props.onRowDidOpen();
			}
		});

		if (toValue === 0) {
			this.props.onRowClose && this.props.onRowClose();
		} else {
			this.props.onRowOpen && this.props.onRowOpen(toValue);
		}

		// reset everything
		this.swipeInitialX = null;
		this.horizontalSwipeGestureBegan = false;
	}

	renderVisibleContent() {
		// handle touchables
		const onPress = this.props.children[1].props.onPress;

		if (onPress) {
			const newOnPress = _ => {
				this.onRowPress();
				onPress();
			}
			return React.cloneElement(
				this.props.children[1],
				{
					...this.props.children[1].props,
					onPress: newOnPress
				}
			);
		}

		return (
			<TouchableOpacity
				activeOpacity={1}
				onPress={ _ => this.onRowPress() }
			>
				{this.props.children[1]}
			</TouchableOpacity>
		)

	}

	renderRowContent() {
		// We do this annoying if statement for performance.
		// We don't want the onLayout func to run after it runs once.
		if (this.state.dimensionsSet) {
			return (
				<Animated.View useNativeDriver={true}
					manipulationModes={['translateX']}
					{...this._panResponder.panHandlers}
					style={{
						zIndex: 2,
						transform: [
							{translateX: this._translateX}
						]
					}}
				>
					{this.renderVisibleContent()}
				</Animated.View>
			);
		} else {
			return (
				<Animated.View useNativeDriver={true}
					manipulationModes={['translateX']}
					{...this._panResponder.panHandlers}
					onLayout={ (e) => this.onContentLayout(e) }
					style={{
						zIndex: 2,
						transform: [
							{translateX: this._translateX}
						]
					}}
				>
					{this.renderVisibleContent()}
				</Animated.View>
			);
		}
	}

	render() {
		return (
			<View style={this.props.style ? this.props.style : styles.container}>
				<View style={[
					styles.hidden,
					{
						height: this.state.hiddenHeight,
						width: this.state.hiddenWidth,
					}
				]}>
					{this.props.children[0]}
				</View>
				{this.renderRowContent()}
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container: {
		// As of RN 0.29 flex: 1 is causing all rows to be the same height
		// flex: 1
	},
	hidden: {
		zIndex: 1,
		bottom: 0,
		left: 0,
		overflow: 'hidden',
		position: 'absolute',
		right: 0,
		top: 0,
	},
});

AnterosSwipeRow.propTypes = {
	/**
	 * Used by the AnterosSwipeListView to close rows on scroll events.
	 * You shouldn't need to use this prop explicitly.
	 */
	setScrollEnabled: PropTypes.func,
	/**
	 * Called when it has been detected that a row should be swiped open.
	 */
	swipeGestureBegan: PropTypes.func,
	/**
	 * Called when a swipe row is animating open. Used by the AnterosSwipeListView
	 * to keep references to open rows.
	 */
	onRowOpen: PropTypes.func,
	/**
	 * Called when a swipe row has animated open.
	 */
	onRowDidOpen: PropTypes.func,
	/**
	 * TranslateX value for opening the row to the left (positive number)
	 */
	leftOpenValue: PropTypes.number,
	/**
	 * TranslateX value for opening the row to the right (negative number)
	 */
	rightOpenValue: PropTypes.number,
	/**
	 * TranslateX value for stop the row to the left (positive number)
	 */
	stopLeftSwipe: PropTypes.number,
	/**
	 * TranslateX value for stop the row to the right (negative number)
	 */
	stopRightSwipe: PropTypes.number,
	/**
	 * Friction for the open / close animation
	 */
	friction: PropTypes.number,
	/**
	 * Tension for the open / close animation
	 */
	tension: PropTypes.number,
	/**
	 * Should the row be closed when it is tapped
	 */
	closeOnRowPress: PropTypes.bool,
	/**
	 * Disable ability to swipe the row left
	 */
	disableLeftSwipe: PropTypes.bool,
	/**
	 * Disable ability to swipe the row right
	 */
	disableRightSwipe: PropTypes.bool,
	/**
	 * Enable hidden row onLayout calculations to run always
	 */
	recalculateHiddenLayout: PropTypes.bool,
	/**
	 * Called when a swipe row is animating closed
	 */
	onRowClose: PropTypes.func,
	/**
	 * Called when a swipe row has animated closed
	 */
	onRowDidClose: PropTypes.func,
	/**
	 * Styles for the parent wrapper View of the AnterosSwipeRow
	 */
	style: ViewPropTypes.style,
	/**
	 * Should the row do a slide out preview to show that it is swipeable
	 */
	preview: PropTypes.bool,
	/**
	 * Duration of the slide out preview animation
	 */
	previewDuration: PropTypes.number,
	/**
	 * TranslateX value for the slide out preview animation
	 * Default: 0.5 * props.rightOpenValue
	 */
	previewOpenValue: PropTypes.number,
	/**
	 * The dx value used to detect when a user has begun a swipe gesture
	 */
	directionalDistanceChangeThreshold: PropTypes.number,
	/**
	 * What % of the left/right openValue does the user need to swipe
	 * past to trigger the row opening.
	 */
	swipeToOpenPercent: PropTypes.number,
	/**
	 * Describes how much the ending velocity of the gesture contributes to whether the swipe will result in the item being closed or open.
	 * A velocity factor of 0 means that the velocity will have no bearing on whether the swipe settles on a closed or open position
	 * and it'll just take into consideration the swipeToOpenPercent.
	 */
	swipeToOpenVelocityContribution: PropTypes.number,
	/**
	 * What % of the left/right openValue does the user need to swipe
	 * past to trigger the row closing.
	 */
	swipeToClosePercent: PropTypes.number
};

AnterosSwipeRow.defaultProps = {
	leftOpenValue: 0,
	rightOpenValue: 0,
	closeOnRowPress: true,
	disableLeftSwipe: false,
	disableRightSwipe: false,
	recalculateHiddenLayout: false,
	preview: false,
	previewDuration: 300,
	previewOpenDelay: DEFAULT_PREVIEW_OPEN_DELAY,
	directionalDistanceChangeThreshold: 2,
	swipeToOpenPercent: 50,
	swipeToOpenVelocityContribution: 0,
	swipeToClosePercent: 50
};

/**
 * ListView that renders AnterosSwipeRow.
 */
export class AnterosSwipeListView extends Component {

	constructor(props){
		super(props);
		this._rows = {};
		this.openCellKey = null;
	}

	setScrollEnabled(enable) {
		// Due to multiple issues reported across different versions of RN
		// We do this in the safest way possible...
		if (this._listView && this._listView.setNativeProps) {
			this._listView.setNativeProps({scrollEnabled: enable});
		} else if (this._listView && this._listView.getScrollResponder) {
			const scrollResponder = this._listView.getScrollResponder();
			scrollResponder.setNativeProps && scrollResponder.setNativeProps({scrollEnabled: enable});
		}
		this.props.onScrollEnabled && this.props.onScrollEnabled(enable);
	}

	safeCloseOpenRow() {
		const rowRef = this._rows[this.openCellKey];
		if (rowRef && rowRef.closeRow) {
			this._rows[this.openCellKey].closeRow();
		}
	}

	rowSwipeGestureBegan(key) {
		if (this.props.closeOnRowBeginSwipe && this.openCellKey && this.openCellKey !== key) {
			this.safeCloseOpenRow();
		}

		if (this.props.swipeGestureBegan) {
			this.props.swipeGestureBegan(key);
		}
	}

	onRowOpen(key) {
		if (this.openCellKey && this.openCellKey !== key) {
			this.safeCloseOpenRow();
		}
		this.openCellKey = key;
		this.props.onRowOpen && this.props.onRowOpen(key, this._rows);
	}

	onRowPress() {
		if (this.openCellKey) {
			if (this.props.closeOnRowPress) {
				this.safeCloseOpenRow();
				this.openCellKey = null;
			}
		}
	}

	onScroll(e) {
		if (this.openCellKey) {
			if (this.props.closeOnScroll) {
				this.safeCloseOpenRow();
				this.openCellKey = null;
			}
		}
		this.props.onScroll && this.props.onScroll(e);
	}

	setRefs(ref) {
		this._listView = ref;
		this.props.listViewRef && this.props.listViewRef(ref);
	}

	renderCell(VisibleComponent, HiddenComponent, key, item, shouldPreviewRow) {
		if (!HiddenComponent) {
			return React.cloneElement(
				VisibleComponent,
				{
					...VisibleComponent.props,
					ref: row => this._rows[key] = row,
					onRowOpen: _ => this.onRowOpen(key),
					onRowDidOpen: _ => this.props.onRowDidOpen && this.props.onRowDidOpen(key, this._rows),
					onRowClose: _ => this.props.onRowClose && this.props.onRowClose(key, this._rows),
					onRowDidClose: _ => this.props.onRowDidClose && this.props.onRowDidClose(key, this._rows),
					onRowPress: _ => this.onRowPress(),
					setScrollEnabled: enable => this.setScrollEnabled(enable),
					swipeGestureBegan: _ => this.rowSwipeGestureBegan(key)
				}
			);
		} else {
			return (
				<AnterosSwipeRow
					ref={row => this._rows[key] = row}
					swipeGestureBegan={ _ => this.rowSwipeGestureBegan(key) }
					onRowOpen={ _ => this.onRowOpen(key) }
					onRowDidOpen={ _ => this.props.onRowDidOpen && this.props.onRowDidOpen(key, this._rows)}
					onRowClose={ _ => this.props.onRowClose && this.props.onRowClose(key, this._rows) }
					onRowDidClose={ _ => this.props.onRowDidClose && this.props.onRowDidClose(key, this._rows) }
					onRowPress={ _ => this.onRowPress(key) }
					setScrollEnabled={ (enable) => this.setScrollEnabled(enable) }
					leftOpenValue={item.leftOpenValue || this.props.leftOpenValue}
					rightOpenValue={item.rightOpenValue || this.props.rightOpenValue}
					closeOnRowPress={item.closeOnRowPress || this.props.closeOnRowPress}
					disableLeftSwipe={item.disableLeftSwipe || this.props.disableLeftSwipe}
					disableRightSwipe={item.disableRightSwipe || this.props.disableRightSwipe}
					stopLeftSwipe={item.stopLeftSwipe || this.props.stopLeftSwipe}
					stopRightSwipe={item.stopRightSwipe || this.props.stopRightSwipe}
					recalculateHiddenLayout={this.props.recalculateHiddenLayout}
					style={this.props.swipeRowStyle}
					preview={shouldPreviewRow}
					previewDuration={this.props.previewDuration}
					previewOpenDelay={this.props.previewOpenDelay}
					previewOpenValue={this.props.previewOpenValue}
					tension={this.props.tension}
					friction={this.props.friction}
					directionalDistanceChangeThreshold={this.props.directionalDistanceChangeThreshold}
					swipeToOpenPercent={this.props.swipeToOpenPercent}
					swipeToOpenVelocityContribution={this.props.swipeToOpenVelocityContribution}
					swipeToClosePercent={this.props.swipeToClosePercent}
				>
					{HiddenComponent}
					{VisibleComponent}
				</AnterosSwipeRow>
			);
		}
	}

	renderRow(rowData, secId, rowId, rowMap) {
		const key = `${secId}${rowId}`;
		const Component = this.props.renderRow(rowData, secId, rowId, rowMap);
		const HiddenComponent = this.props.renderHiddenRow && this.props.renderHiddenRow(rowData, secId, rowId, rowMap);
		const previewRowId = this.props.dataSource && this.props.dataSource.getRowIDForFlatIndex(this.props.previewRowIndex || 0);
		const shouldPreviewRow = (this.props.previewFirstRow || this.props.previewRowIndex) && rowId === previewRowId;

		return this.renderCell(Component, HiddenComponent, key, rowData, shouldPreviewRow);
	}

	renderItem(rowData, rowMap) {
		const Component = this.props.renderItem(rowData, rowMap);
		const HiddenComponent = this.props.renderHiddenItem && this.props.renderHiddenItem(rowData, rowMap);
		let { item, index } = rowData;
		let { key } = item;
		if (!key && this.props.keyExtractor) {
			key = this.props.keyExtractor(item, index);
		}

		const shouldPreviewRow = this.props.previewRowKey === key;

		return this.renderCell(Component, HiddenComponent, key, item, shouldPreviewRow);
	}

	render() {
		const { useFlatList, renderListView, ...props } = this.props;

		if (renderListView) {
			return renderListView(
				props,
				this.setRefs.bind(this),
				this.onScroll.bind(this),
				useFlatList ? this.renderItem.bind(this) : this.renderRow.bind(this, this._rows),
			);
		}

		if (useFlatList) {
			return (
				<FlatList
					{...props}
					ref={ c => this.setRefs(c) }
					onScroll={ e => this.onScroll(e) }
					renderItem={(rowData) => this.renderItem(rowData, this._rows)}
				/>
			);
		}

		return (
			<ListView
				{...props}
				ref={ c => this.setRefs(c) }
				onScroll={ e => this.onScroll(e) }
				renderRow={(rowData, secId, rowId) => this.renderRow(rowData, secId, rowId, this._rows)}
			/>
		)
	}

}

AnterosSwipeListView.propTypes = {
	/**
	 * To render a custom ListView component, if you don't want to use ReactNative one.
	 * Note: This will call `renderRow`, not `renderItem`
	 */
	renderListView: PropTypes.func,
	/**
	 * How to render a row in a FlatList. Should return a valid React Element.
	 */
	renderItem: PropTypes.func,
	/**
	 * How to render a hidden row in a FlatList (renders behind the row). Should return a valid React Element.
	 * This is required unless renderItem is passing a AnterosSwipeRow.
	 */
	renderHiddenItem: PropTypes.func,
	/**
	 * [DEPRECATED] How to render a row in a ListView. Should return a valid React Element.
	 */
	renderRow: PropTypes.func,
	/**
	 * [DEPRECATED] How to render a hidden row in a ListView (renders behind the row). Should return a valid React Element.
	 * This is required unless renderRow is passing a AnteroSwipeRow.
	 */
	renderHiddenRow: PropTypes.func,
	/**
	 * TranslateX value for opening the row to the left (positive number)
	 */
	leftOpenValue: PropTypes.number,
	/**
	 * TranslateX value for opening the row to the right (negative number)
	 */
	rightOpenValue: PropTypes.number,
	/**
	 * TranslateX value for stop the row to the left (positive number)
	 */
	stopLeftSwipe: PropTypes.number,
	/**
	 * TranslateX value for stop the row to the right (negative number)
	 */
	stopRightSwipe: PropTypes.number,
	/**
	 * Should open rows be closed when the listView begins scrolling
	 */
	closeOnScroll: PropTypes.bool,
	/**
	 * Should open rows be closed when a row is pressed
	 */
	closeOnRowPress: PropTypes.bool,
	/**
	 * Should open rows be closed when a row begins to swipe open
	 */
	closeOnRowBeginSwipe: PropTypes.bool,
	/**
	 * Disable ability to swipe rows left
	 */
	disableLeftSwipe: PropTypes.bool,
	/**
	 * Disable ability to swipe rows right
	 */
	disableRightSwipe: PropTypes.bool,
	/**
	 * Enable hidden row onLayout calculations to run always.
	 *
	 * By default, hidden row size calculations are only done on the first onLayout event
	 * for performance reasons.
	 * Passing ```true``` here will cause calculations to run on every onLayout event.
	 * You may want to do this if your rows' sizes can change.
	 * One case is a AnterosSwipeListView with rows of different heights and an options to delete rows.
	 */
	recalculateHiddenLayout: PropTypes.bool,
	/**
	 * Called when a swipe row is animating swipe
	 */
	swipeGestureBegan: PropTypes.func,
	/**
	 * Called when a swipe row is animating open
	 */
	onRowOpen: PropTypes.func,
	/**
	 * Called when a swipe row has animated open
	 */
	onRowDidOpen: PropTypes.func,
	/**
	 * Called when a swipe row is animating closed
	 */
	onRowClose: PropTypes.func,
	/**
	 * Called when a swipe row has animated closed
	 */
	onRowDidClose: PropTypes.func,
	/**
	 * Called when scrolling on the AnterosSwipeListView has been enabled/disabled
	 */
	onScrollEnabled: PropTypes.func,
	/**
	 * Styles for the parent wrapper View of the AnterosSwipeRow
	 */
	swipeRowStyle: ViewPropTypes.style,
	/**
	 * Called when the ListView (or FlatList) ref is set and passes a ref to the ListView (or FlatList)
	 * e.g. listViewRef={ ref => this._swipeListViewRef = ref }
	 */
	listViewRef: PropTypes.func,
	/**
	 * Should the row with this key do a slide out preview to show that the list is swipeable
	 */
	previewRowKey: PropTypes.string,
	/**
	 * [DEPRECATED] Should the first AnterosSwipeRow do a slide out preview to show that the list is swipeable
	 */
	previewFirstRow: PropTypes.bool,
	/**
	 * [DEPRECATED] Should the specified rowId do a slide out preview to show that the list is swipeable
	 * Note: This ID will be passed to this function to get the correct row index
	 * https://facebook.github.io/react-native/docs/listviewdatasource.html#getrowidforflatindex
	 */
	previewRowIndex: PropTypes.number,
	/**
	 * Duration of the slide out preview animation (milliseconds)
	 */
	previewDuration: PropTypes.number,
	/**
	 * Delay of the slide out preview animation (milliseconds) // default 700ms
	 */
	prewiewOpenDelay: PropTypes.number,
	/**
	 * TranslateX value for the slide out preview animation
	 * Default: 0.5 * props.rightOpenValue
	 */
	previewOpenValue: PropTypes.number,
	/**
	 * Friction for the open / close animation
	 */
	friction: PropTypes.number,
	/**
	 * Tension for the open / close animation
	 */
	tension: PropTypes.number,
	/**
	 * The dx value used to detect when a user has begun a swipe gesture
	 */
	directionalDistanceChangeThreshold: PropTypes.number,
	/**
	 * What % of the left/right openValue does the user need to swipe
	 * past to trigger the row opening.
	 */
	swipeToOpenPercent: PropTypes.number,
	/**
	 * Describes how much the ending velocity of the gesture affects whether the swipe will result in the item being closed or open.
	 * A velocity factor of 0 means that the velocity will have no bearing on whether the swipe settles on a closed or open position
	 * and it'll just take into consideration the swipeToOpenPercent.
	 */
	swipeToOpenVelocityContribution: PropTypes.number,
	/**
	 * What % of the left/right openValue does the user need to swipe
	 * past to trigger the row closing.
	 */
	swipeToClosePercent: PropTypes.number
}

AnterosSwipeListView.defaultProps = {
	leftOpenValue: 0,
	rightOpenValue: 0,
	closeOnRowBeginSwipe: false,
	closeOnScroll: true,
	closeOnRowPress: true,
	disableLeftSwipe: false,
	disableRightSwipe: false,
	recalculateHiddenLayout: false,
	previewFirstRow: false,
	directionalDistanceChangeThreshold: 2,
	swipeToOpenPercent: 50,
	swipeToOpenVelocityContribution: 0,
	swipeToClosePercent: 50
}


AnterosSwipeListView.SwipeRow = AnterosSwipeRow;