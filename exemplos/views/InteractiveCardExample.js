import React from 'react';
import {StyleSheet, Text, ScrollView, View, Animated, Dimensions} from 'react-native';
import {AnterosNavigationPage, AnterosInteractiveCard, Header, Footer, Content} from 'anteros-react-native';

export default class InteractiveCardExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Interactive card',
      showBackButton: true
    };

	loadCardsInView = () => <CardsInView />;
	loadCustomTransition = () => <CustomTransition />;
	loadCardsInScrollView = () => <CardsInScrollView />;

	renderPage() {
		return (
			this.loadCardsInScrollView()
		);
	}
}



class CardsInView  extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<View style={stylesBase.container}>
				<AnterosInteractiveCard overlayOpacity={1}>
					<Header>
						<View style={stylesBase.cardHeader}>
							<Text style={stylesBase.text}>Header</Text>
						</View>
					</Header>
					<Content>
						<View style={stylesBase.content}>
							<Text style={stylesBase.text}>Content</Text>
						</View>
					</Content>
				</AnterosInteractiveCard>
			</View>
		);
	}
}

const stylesBase = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		padding: 10
	},
	cardHeader: {backgroundColor: "#68E9FF",padding: 30,marginBottom: 10, borderRadius: 5},
	text: {fontSize: 40, opacity: 0.6,textAlign: 'center',fontWeight: 'bold'},
	content: {width: "90%", padding: 50, backgroundColor: "#E85F53"},
});


const windowDimensions = Dimensions.get('window');
const cardWidth = (windowDimensions.width < 768) ? "100%" : "50%";

class CardsInScrollView  extends React.Component {
	constructor() {
		super();
		this.state = {activeCard : null};

		this.layoutAnimationValue = new Animated.Value(0);
	}

	componentWillMount() {
		this.loadCards()
	}

	loadCards() {

		this.state.cards = [0,1,2,3,4,5, 6, 7, 8, 9, 10].map((number, i) => {

			return (
				<AnterosInteractiveCard
					key={i}
					name={number}
					style={stylesCard.cardStyles}
					// On iPhone we open the card at 100 in the Y axis. But in iPad we leave it as is.
					openCoords={{y: 100, x: "center"}}
					onOpen={this.handleCardOpen.bind(this)}
					onClose={this.handleCardClose.bind(this)}
					onAnimationProgress={this.onAnimationProgress.bind(this)}
				>
					<Header style={stylesCard.headerWrapper}>
						<View style={stylesCard.cardHeader}>
							<View style={stylesCard.leftColumn}>
								<View style={stylesCard.image} />
							</View>
							<View style={stylesCard.rightColumn}>
								<View style={stylesCard.heading} />
								<View style={stylesCard.subheading} />
							</View>
						</View>
					</Header>
					<Content enterFrom={"bottom"} style={stylesCard.contentWrapper}>
						<ScrollView style={stylesCard.content}>
							<Text style={stylesCard.contentText}>{"🤘"}</Text>
						</ScrollView>
					</Content>
				</AnterosInteractiveCard>
			)
		});
	}

	onAnimationProgress(draggingProgress) {
		if (draggingProgress >= 0 && draggingProgress <= 1)
			this.layoutAnimationValue.setValue(draggingProgress);
	}

	handleCardOpen(card) {
		Animated.timing(this.layoutAnimationValue, {
			toValue: 1,
			duration: 200
		}).start();
		this.setState({activeCard: card});
	}

	handleCardClose() {
		Animated.timing(this.layoutAnimationValue, {
			toValue: 0,
			duration: 200
		}).start();
		this.setState({activeCard: null});
	}

	getDraggingProgress() {

	}

	getNavBarStyles() {
		return {
			height: this.layoutAnimationValue.interpolate({
				inputRange: [0, 1],
				outputRange: [80, 0]
			}),
			backgroundColor: "rgba(0,0,0,0.1)",
			alignItems: "center",
			justifyContent: "flex-end",
		}
	}

	render() {
		return (
			<View style={stylesCard.container}>
				<Animated.View style={this.getNavBarStyles()}>
					<View style={stylesCard.navItem}/>
				</Animated.View>
				<ScrollView contentContainerStyle={stylesCard.scrollViewConentContainer} style={stylesCard.scrollView} scrollEnabled={!Boolean(this.state.activeCard)}>
					{this.state.cards}
				</ScrollView>
			</View>
		);
	}
}

const stylesCard = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	scrollView: {
		flex: 1,
	},
	scrollViewConentContainer: {
		flexWrap: 'wrap',
		flexDirection: 'row',

	},
	cardStyles: {
		width: cardWidth,
	},
	navItem: {
		backgroundColor: 'black',
		borderRadius: 10,
		opacity: 0.4,
		width: "80%",
		height: 30,
		marginBottom: 13
	},
	headerWrapper: {
		padding: 10,
		paddingBottom: 30
	},
	cardHeader: {
		height: 100,
		backgroundColor: '#11C5FF',
		flexDirection: 'row',
		borderRadius: 5,
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 1,
		shadowOpacity: 0.2,
		shadowColor: 'black'
	},
	leftColumn: {
		flex: 1,
		padding: 10,
	},
	rightColumn: {
		flex: 3,
		padding: 10,
	},
	image: {
		width: "100%",
		height: "100%",
		backgroundColor: "#FF9E0D",
		borderRadius: 50,
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 2,
		shadowOpacity: 0.2,
		shadowColor: 'black'
	},
	heading: {
		backgroundColor: '#666',
		width: "70%",
		height: 30,
		marginBottom: 10,
		borderRadius: 10
	},
	subheading: {
		backgroundColor: '#888',
		width: 100,
		height: 20,
		borderRadius: 7
	},
	contentWrapper:{
		alignItems: 'center'
	},
	content: {
		height: 500,
		backgroundColor: '#E85F53',
		width: '92%',
		marginTop: -20,
		paddingTop: 30,
		borderRadius: 3,
		padding: 10
	},
	contentText: {
		fontSize: 50,
		textAlign: 'center',
		fontWeight: 'bold',
	}
});



class CustomTransition extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<View style={stylesCustom.container}>
				<AnterosInteractiveCard overlayOpacity={1}>
					<Header>
						<View style={stylesCustom.cardHeader}>
							<Text style={stylesCustom.text}>Header</Text>
						</View>
					</Header>
					<Content enterFrom={"right"}>
						<View style={stylesCustom.content}>
							<Text style={stylesCustom.text}>Content</Text>
						</View>
					</Content>
				</AnterosInteractiveCard>
				<AnterosInteractiveCard overlayOpacity={1}>
					<Header>
						<View style={stylesCustom.cardHeader}>
							<Text style={stylesCustom.text}>Header</Text>
						</View>
					</Header>
					<Content enterFrom={"right"}>
						<View style={stylesCustom.content}>
							<Text style={stylesCustom.text}>Content</Text>
						</View>
					</Content>
				</AnterosInteractiveCard>
				<AnterosInteractiveCard overlayOpacity={1}>
					<Header>
						<View style={stylesCustom.cardHeader}>
							<Text style={stylesCustom.text}>Header</Text>
						</View>
					</Header>
					<Content enterFrom={"right"}>
						<View style={stylesCustom.content}>
							<Text style={stylesCustom.text}>Content</Text>
						</View>
					</Content>
				</AnterosInteractiveCard>
			</View>
		);
	}
}

const stylesCustom = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		padding: 10
	},
	cardHeader: {backgroundColor: "#68E9FF",padding: 30,marginBottom: 10, borderRadius: 5},
	text: {fontSize: 40, opacity: 0.6,textAlign: 'center',fontWeight: 'bold'},
	content: {width: "90%", padding: 50, backgroundColor: "#E85F53"},
});