
import { View, LayoutAnimation, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import React,{Component} from "react";

const { Types, Properties } = LayoutAnimation;

const ERROR_MESSAGE = 'AnterosCardStack component must have at least two child Card components. Please check the children of this AnterosCardStack instance.';
const LONG_PRESS_THROTTLE = 400;

const calcHeight = (indexs, staticHeight, hoverOffset, cardsLength) => {
	const { selectedIndex, hoveredIndex, cardIndex } = indexs;
	if (!selectedIndex && selectedIndex !== 0) {
		if (cardIndex < 0) return 0;
		const height = (staticHeight / cardsLength) * (cardsLength - cardIndex);
		return (hoveredIndex === cardIndex && cardIndex !== 0)
			? height + hoverOffset
			: height;
	}
	return (selectedIndex === cardIndex) ? staticHeight : 0;
};

export class AnterosCardStack extends Component {
	constructor (props) {
		super();
		const childrenLength = props.children && props.children.length || 1;
		if (childrenLength <= 1) throw new Error(ERROR_MESSAGE);

		this.handlePressIn = this.handlePressIn.bind(this);
		this.handlePressOut = this.handlePressOut.bind(this);

		this.state = {
			selectedCardIndex: null,
			hoveredCardIndex: null,
		};

		this._PRESET = LayoutAnimation.create(
		  props.transitionDuration, Types.easeInEaseOut, Properties.opacity
		);
	}

	UNSAFE_componentWillReceiveProps ({ transitionDuration }) {
		if (this.props.transitionDuration !== transitionDuration) {
			this._PRESET = LayoutAnimation.create(
				transitionDuration, Types.easeInEaseOut, Properties.opacity
			);
		}
	}

	handleCardPress (cardId) {
		LayoutAnimation.configureNext(this._PRESET);
		const index = (this.state.selectedCardIndex === cardId) ? null : cardId;
		this.setState({ selectedCardIndex: index });
		if (this.props.onPress) this.props.onPress();
	}

	handleCardLongPress (cardId) {
		LayoutAnimation.configureNext(this._PRESET);
		this.setState({ hoveredCardIndex: null });
		if (this.props.onLongPress) this.props.onLongPress();
	}

	handlePressIn (cardId, cardSelected) {
		if (this.state.selectedCardIndex) return this.handleCardPress(cardId);
		LayoutAnimation.configureNext(this._PRESET);
		this.setState({ hoveredCardIndex: cardId });
		this._cardPressed = setTimeout(() =>
			this._cardPressed = clearTimeout(this._cardPressed),
			LONG_PRESS_THROTTLE
		);
	}

	handlePressOut (cardId) {
		if (this._cardPressed) this.handleCardPress(cardId);
		else this.handleCardLongPress(cardId);
	}

	renderCards () {
		const cloneCard = (child, cardIndex, children) => {
			const indexs = {
				selectedIndex: this.state.selectedCardIndex,
				hoveredIndex: this.state.hoveredCardIndex,
				cardIndex,
			};
			const height = calcHeight(
				indexs,
				this.props.height,
				this.props.hoverOffset,
				children.length
			);
			return React.cloneElement(child, {
				key: cardIndex,
				cardId: cardIndex,
				height,
				onPressIn: this.handlePressIn,
				onPressOut: this.handlePressOut,
			});
		};
		return this.props.children.map(cloneCard);
	}

	render () {
		const stackStyles = {
			overflow: 'hidden',
			backgroundColor: this.props.backgroundColor,
			height: this.props.height,
			width: this.props.width,
		};
		return (
			<View
				style={[this.props.style, stackStyles]}>
				{this.renderCards()}
			</View>
		);
	}
};

AnterosCardStack.propTypes = {
	height: PropTypes.number,
	width: PropTypes.number,
	backgroundColor: PropTypes.string,
	hoverOffset: PropTypes.number,
	transitionDuration: PropTypes.number,
};

AnterosCardStack.defaultProps = {
	height: 600,
	width: 350,
	backgroundColor: 'f8f8f8',
	hoverOffset: 30,
	transitionDuration: 300,
};



export class AnterosCard extends Component {
	constructor (props) {
		super(props);
		this.handlePressIn = this.handlePressIn.bind(this);
		this.handlePressOut = this.handlePressOut.bind(this);
	}

	handlePressIn () {
		this.props.onPressIn(this.props.cardId);
	}

	handlePressOut () {
		this.props.onPressOut(this.props.cardId);
	}

	render () {
		const cardStyles = {
			backgroundColor: this.props.backgroundColor,
			height: this.props.height,
		};
		return (
			<TouchableOpacity
				{...this.props}
				activeOpacity={1}
				style={[stylesCard.container, this.props.style, cardStyles]}
				onPressIn={this.handlePressIn}
				onPressOut={this.handlePressOut}>
				{this.props.children}
			</TouchableOpacity>
		);
	}
}

const stylesCard = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
	}
});
