//https://github.com/httpdeveloper/react-native-simple-progressbar
import React, { Component } from 'react';
import {
  View,
  Text,
  Animated, StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
const barMinWidthOffset = 20;	
const maxFontSize = 15;
import {AnterosTheme} from '../../themes/AnterosTheme';
import {AnterosText} from '../Text/AnterosText';


export class AnterosProgressBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			width: new Animated.Value(0),
			progress: 0,
		};
	}

	componentDidMount() {
		this.animate();
		if (this.props.progress > 0 && this.props.size > 0) {
			setTimeout(() => {
				const sizeWidthRatio = this.props.size / this.props.width;
				const progress = (this.props.progress > this.props.size) ? this.props.size : this.props.progress;
				this.state.width.setValue(progress / sizeWidthRatio);
			}, 100);
		}
	}

	UNSAFE_componentWillReceiveProps(props) {
		if (this.props.progress !== props.progress) {
			const sizeWidthRatio = props.size / props.width;
			const progress = (props.progress > props.size) ? props.size : props.progress;
			this.state.width.setValue(progress / sizeWidthRatio); 
		}
	}

	animate() {
		const percentageWidthRatio = 100 / this.props.width;
		this.state.width.setValue(0);

		this.state.width.addListener((progress) => {
			const progressValue = parseInt(progress.value * percentageWidthRatio, 10);
			this.setState({
				progress: progressValue
			});
			if (this.props.onProgress) {
				this.props.onProgress(progressValue);
			}
		});

		Animated.timing(this.state.width, {
			toValue: 0,
			//duration: 1000,
		}).start();
	}

	render() {
		const { 
			size,
			color,
			children,
			style,
            textStyle,
            padding,
            margin,
			hideProgressText,
			height
		} = this.props;

		if (!(size > 0)) return <View />;

		let fontSize = (this.state.progress <= barMinWidthOffset) ? (height / 3) : (height / 2);
		fontSize = (fontSize > maxFontSize) ? maxFontSize : fontSize;

		return (
		<View style={[styles.container, {margin:margin, padding: padding, width: this.props.width, height: this.props.height }, style]}>
			<Animated.View useNativeDriver={true}   
					style={[styles.progressBar, { 
					width: this.state.width, 
					borderRadius: (style && style.borderRadius ? style.borderRadius : 5),
					backgroundColor: (color ? color : AnterosTheme.primaryColor) }]} 
			>
				{!children && !hideProgressText && 
					<AnterosText style={[styles.progressTxt, { fontSize }, textStyle]}>{this.state.progress}%</AnterosText>
				}
			</Animated.View>
			{children}
		</View>
		);
	}
}

AnterosProgressBar.propTypes = {
    children: PropTypes.node,
    style: View.style,
    textStyle: View.style,
    onProgress: PropTypes.func,
};

AnterosProgressBar.defaultProps = {
    height: 20,
    width: 200,
    onProgress: null,
    hideProgressText: false
};


const styles = StyleSheet.create({
	container: { 
		backgroundColor: '#eee', 
		borderRadius: 5, 
		borderWidth: 0.5,
		borderColor: '#E0E0E0',
	},

	progressBar: {
		flex: 1, 
		backgroundColor: AnterosTheme.primaryColor, 
		justifyContent: 'center', 
		alignItems: 'center',
	},

	progressTxt: {
		color: '#fff', 
		fontWeight: 'bold' 
	}
});