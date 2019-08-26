import { View, Image, Text, Dimensions, StyleSheet, FlatList } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from 'data.task';
import isEqual from 'lodash.isequal';
import differenceBy from 'lodash.differenceby';
import Injector from 'react-native-injectable-component';
import ListView from 'deprecated-react-native-listview'



const styles = StyleSheet.create({
    masonry__container: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '100%'
    },
    masonry__column: {
      // Might be able to disregard
      flexDirection: 'column'
    }
  });

const resolveImage = (data) => {
	return new Task((reject, resolve) => Image.getSize(data.uri, (width, height) => resolve({
		...data,
		//@TODO: Consider consolidating data.uri with dimensions to a image object
		dimensions: {
			width,
			height
		}
	}), (err) => reject(err)));
};

function AnterosMasonryBrick (props) {
	// Avoid margins for first element
	const image = (props.onPress) ? _getTouchableUnit(props, props.gutter) : _getImageTag(props, props.gutter);
	const footer = (props.renderFooter) ? props.renderFooter(props.data) : null;
	const header = (props.renderHeader) ? props.renderHeader(props.data) : null;

	return (
		<View key={props.brickKey}>
		  {header}
		  {image}
		  {footer}
		</View>
	);
}

// _getImageTag :: Image, Gutter -> ImageTag
function _getImageTag (props, gutter = 0) {
	const imageProps = {
		key: props.uri,
		source: {
			uri: props.uri
		},
		resizeMethod: 'auto',
		style: {
			width: props.width,
			height: props.height,
			marginTop: gutter,
			...props.imageContainerStyle,
		}
	};

	return (
		<Injector
		  defaultComponent={Image}
		  defaultProps={imageProps}
		  injectant={props.customImageComponent}
		  injectantProps={props.customImageProps} />
	)
}

// _getTouchableUnit :: Image, Number -> TouchableTag
function _getTouchableUnit (image, gutter = 0) {
	return (
		<TouchableHighlight
          key={image.uri}
          onPress={() => image.onPress(image.data)}>
          <View>
            { _getImageTag(image, gutter) }
          </View>
		</TouchableHighlight>
	);
}


export class AnterosMasonryColumn extends Component {
	static propTypes = {
		data: PropTypes.array,
		columns: PropTypes.number,
		parentDimensions: PropTypes.object,
		columnKey: PropTypes.string,
		imageContainerStyle: PropTypes.object,
		customImageComponent: PropTypes.func,
		customImageProps: PropTypes.object
	};

	static defaultProps = {
		imageContainerStyle: {},
		spacing: 1
	};

	constructor(props) {
		super(props);
		this.state = {
			images: [],
			columnWidth: 0
		};
	}

	componentWillMount() {
		this.setState({
			images: this._resizeImages(this.props.data, this.props.parentDimensions, this.props.columns),
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			images: this._resizeImages(nextProps.data, nextProps.parentDimensions, nextProps.columns)
		});
	}

	// Transforms an array of images with dimensions scaled according to the
	// column it is within
	// _resizeImages :: Data, parentDimensions. nColumns -> ResizedImage
	_resizeImages (data, parentDimensions, nColumns) {
		return Object.keys(data).map((key) => {
			const image = data[key];
			const imageSizedForColumn =
				  this._resizeByColumns(data[key].dimensions, parentDimensions, nColumns);
			// Return a image object that width will be equivilent to
			// the column dimension, while retaining original image properties
			return {
  				...image,
  				...imageSizedForColumn
			};
		});
	}

	// Resize image while maintain aspect ratio
	// _resizeByColumns :: ImgDimensions , parentDimensions, nColumns  -> AdjustedDimensions
	_resizeByColumns (imgDimensions = { width: 0, height: 0 }, parentDimensions, nColumns=2) {
		const { height, width } = parentDimensions;

		// The gutter is 1% of the available view width
		const gutterBase = width / 100;
		const gutterSize = gutterBase * this.props.spacing;

		// Column gutters are shared between right and left image
		const columnWidth = (width / nColumns) - (gutterSize / 2);

		if (this.state.columnWidth !== columnWidth) {
			this.setState({
				columnWidth
			});
		}

		const divider = imgDimensions.width / columnWidth;

		const newWidth = imgDimensions.width / divider;
		const newHeight = imgDimensions.height / divider;

		return { width: newWidth, height: newHeight, gutter: gutterSize };
	}

	// Renders the "bricks" within the columns
	// _renderBrick :: images -> [TouchableTag || ImageTag...]
	_renderBrick = (data) => {
		// Example Data Structure
		// {
		//   "item": {
		//     "uri": "https://img.buzzfeed.com/buzzfeed-static/static/2016-01/14/20/campaign_images/webdr15/which-delicious-mexican-food-item-are-you-based-o-2-20324-1452822970-1_dblbig.jpg",
		//     "column": 0,
		//     "dimensions": {
		//       "width": 625,
		//       "height": 415
		//     },
		//     "width": 180.675,
		//     "height": 119.96820000000001,
		//     "gutter": 3.65
		//   },
		//   "index": 9
		// }
		const brick = data.item;
		const gutter = (data.index === 0) ? 0 : brick.gutter;
		const key = `RN-MASONRY-BRICK-${brick.column}-${data.index}`;
		const { imageContainerStyle, customImageComponent, customImageProps } = this.props;
		const props = { ...brick, gutter, key, imageContainerStyle, customImageComponent, customImageProps };

		return (
			<AnterosMasonryBrick
			  {...props} />
		);
	}

	// _keyExtractor :: item -> id
	_keyExtractor = (item) => ("IMAGE-KEY-" + item.uri + "---" + (item.key ? item.key : "0"));

	render() {
		return (
			<View
			  style={[
				  {
					  width: this.state.columnWidth,
					  overflow: 'hidden'
				  },
				  styles.masonry__column
			  ]}>
			  <FlatList
				key={this.props.columnKey}
				data={this.state.images}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderBrick}
				/>
			</View>
		)
	}
}

// assignObjectColumn :: Number -> [Objects] -> [Objects]
export const assignObjectColumn = (nColumns, index, targetObject) => ({...targetObject, ...{ column: index % nColumns }});

// assignObjectIndex :: (Number, Object) -> Object
// Assigns an `index` property` from bricks={data}` for later sorting.
export const assignObjectIndex = (index, targetObject) => ({...targetObject, ...{ index }});

// containMatchingUris :: ([brick], [brick]) -> Bool
const containMatchingUris = (r1, r2) => isEqual(r1.map(brick => brick.uri), r2.map(brick => brick.uri));

export class AnterosMasonryList extends Component {
	static propTypes = {
		bricks: PropTypes.array,
		columns: PropTypes.number,
		sorted: PropTypes.bool,
		imageContainerStyle: PropTypes.object,
		customImageComponent: PropTypes.func,
		customImageProps: PropTypes.object,
		spacing: PropTypes.number,
		refreshControl: PropTypes.element
	};

	static defaultProps = {
		bricks: [],
		columns: 2,
		sorted: false,
		imageContainerStyle: {},
		spacing: 1
	};

	constructor(props) {
		super(props);
        // Assuming users don't want duplicated images, if this is not the case we can always change the diff check
        this.getInitialState = this.getInitialState.bind(this);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => !containMatchingUris(r1, r2) });
		this.state = this.getInitialState();
		// Assuming that rotation is binary (vertical|landscape)
		Dimensions.addEventListener('change', (window) => this.setState(state => ({ initialOrientation: !state.initialOrientation })))
    }
    
    getInitialState(){        
		return {
			dataSource: this.ds.cloneWithRows([]),
			dimensions: {},
			initialOrientation: true,
			_sortedData: [],
			_resolvedData: []
		};
    }

	componentDidMount() {
		this.resolveBricks(this.props);
	}

	componentWillReceiveProps(nextProps) {
		// Check if it's array and contains more than 1 item
		if (!Array.isArray(nextProps.bricks) || nextProps.bricks.length === 0) {
			this.setState(state => ({
				dataSource: state.dataSource.cloneWithRows([])
			}));
		}

		const sameData = containMatchingUris(this.props.bricks, nextProps.bricks);
		const differentColumns = this.props.columns !== nextProps.columns;

		if (sameData && !differentColumns) {
			// Only re-render a portion of the bricks
			this.resolveBricks(nextProps, true);
		} else {
            // this.setState(this.getInitialState());
			this.resolveBricks(nextProps);
		}
	}

	resolveBricks({ bricks, columns }, partiallyCache = false) {
		// Sort bricks and place them into their respectable columns
		const sortedBricks = bricks
			  .map((brick, index) => assignObjectColumn(columns, index, brick))
			.map((brick, index) => assignObjectIndex(index, brick));

		// Do a difference check if these are new props
		// to only resolve what is needed
		const unresolvedBricks = (partiallyCache) ?
			differenceBy(sortedBricks, this.state._resolvedData, 'uri') :
			sortedBricks;

		unresolvedBricks
			.map(brick => resolveImage(brick))
			.map(resolveTask => resolveTask.fork(
				(err) => console.warn('Image failed to load'),
				(resolvedBrick) => {
					this.setState(state => {
						const sortedData = _insertIntoColumn(resolvedBrick, state._sortedData, this.props.sorted);

						return {
							dataSource: state.dataSource.cloneWithRows(sortedData),
							_sortedData: sortedData,
							_resolvedData: [...state._resolvedData, resolvedBrick]
						};
					});;
				}));
	}

	_setParentDimensions(event) {
		// Currently height isn't being utilized, but will pass through for future features
		const {width, height} = event.nativeEvent.layout;

		this.setState({
			dimensions: {
				width,
				height
			}
		});
	}

	render() {
		return (
			<View style={{flex: 1}} onLayout={(event) => this._setParentDimensions(event)}>
			  <ListView
				contentContainerStyle={styles.masonry__container}
				dataSource={this.state.dataSource}
				enableEmptySections
				renderRow={(data, sectionId, rowID) =>
						   <AnterosMasonryColumn
								 data={data}
								 columns={this.props.columns}
								 parentDimensions={this.state.dimensions}
								 imageContainerStyle={this.props.imageContainerStyle}
								 customImageComponent={this.props.customImageComponent}
								 customImageProps={this.props.customImageProps}
								 spacing={this.props.spacing}
							 key={`RN-MASONRY-COLUMN-${rowID}`}/> }
				refreshControl={this.props.refreshControl}
				/>
			</View>
		)
	}
};

// Returns a copy of the dataSet with resolvedBrick in correct place
// (resolvedBrick, dataSetA, bool) -> dataSetB
export function _insertIntoColumn (resolvedBrick, dataSet, sorted) {
	let dataCopy = dataSet.slice();
	const columnIndex = resolvedBrick.column;
	const column = dataSet[columnIndex];

	if (column) {
		// Append to existing "row"/"column"
		const bricks = [...column, resolvedBrick];
		if (sorted) {
			// Sort bricks according to the index of their original array position
			bricks = bricks.sort((a, b) => (a.index < b.index) ? -1 : 1);
		}
		dataCopy[columnIndex] = bricks;
	} else {
		// Pass it as a new "row" for the data source
		dataCopy = [...dataCopy, [resolvedBrick]];
	}

	return dataCopy;
};