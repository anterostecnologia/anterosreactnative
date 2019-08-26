
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
	Image,
	TouchableOpacity,
	Dimensions,
  View,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {AnterosNavigationPage, AnterosCardStack, AnterosCard} from 'anteros-react-native';

// Can use the Dimensions API to query for the width and height
const { width } = Dimensions.get('window');


const people = [{
	background: '#2980B9',
	imgSrc: 'https://s3.amazonaws.com/uifaces/faces/twitter/rem/128.jpg',
	imgBorderColor: '#015389',
	name: 'James Stuart',
	title: 'Training Manager',
	mobileNo: '0491 570 156',
	location: 'Sydney, Australia',
	role: 'Starting the company in sales, James is now responsible for overseeing all staff training. James mainly focuses on getting new employees up to speed with the practices and procedures Hunter & Co has continually refined over the last 50 years.'
}, {
	background: '#27AE60',
	imgSrc: 'https://s3.amazonaws.com/uifaces/faces/twitter/glif/128.jpg',
	imgBorderColor: '#086C32',
	name: 'Isaac Pullman',
	title: 'Creative Director',
	mobileNo: '0491 570 157',
	location: 'Brisbane, Australia',
	role: "Isaac has overseen all of Hunter and Co's creative efforts for the last five years. He's ability to generate a shared vision between teams throughout the company has been his biggest achievement."
}, {
	background: '#9B27AE',
	imgSrc: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
	imgBorderColor: '#6A067A',
	name: 'Sarah Oscar',
	title: 'Sales Rep',
	mobileNo: '0491 570 158',
	location: 'Sydney, Australia',
	role: "In Sarah's short time with the company, she is now a key figure in the sales team for the Sydney and outer region. Her excellent communication skills has opened up the door to let her mentoring any new hires in sales."
}, {
	background: '#e67e22',
	imgSrc: 'https://s3.amazonaws.com/uifaces/faces/twitter/9lessons/128.jpg',
	imgBorderColor: '#9D4F09',
	name: 'Srinivas Tamada',
	title: 'Tech Lead',
	mobileNo: '0491 570 110',
	location: 'Melbourne, Australia',
	role: "In recent years Hunter & Co's website and accompaning app has undergone a massive face lift. Srinivas was responsible for the exploration and planning of the new technology used. He now works on maintaining and continually improving the website."
}];



const ProfilePicture = ({ imgSrc, borderColor }) => (
	<Image
		style={[styles.img, { borderColor: borderColor }]}
		source={{ uri: imgSrc }}
	/>
);

const DetailsRow = ({ icon, title, summary }) => {
	return (
		<View style={styles.detailsRow}>
			<View style={styles.detailsIcon}>
				<Ionicon
					name={icon}
					size={27}
					color='#fff'
				/>
   		</View>
			<View>
				<Text style={styles.detailsTitle}>
					{title}
				</Text>
				<Text style={styles.detailsSummary}>
					{summary}
				</Text>
			</View>
		</View>
	);
};

const TeamMemberCard = (props) => (
	<View>
		<View style={styles.cardHeader}>
			<View>
				<ProfilePicture
					imgSrc={props.imgSrc}
					borderColor={props.imgBorderColor}
				/>
			</View>
			<View style={{ alignItems: 'flex-end' }}>
				<Text style={styles.headerName}>{props.name}</Text>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Ionicon
						name='ios-arrow-down-outline'
						style={{ marginRight: 10, paddingTop: 5 }}
						size={20}
						color='rgba(255, 255, 255, 0.7)'
					/>
					<Text style={styles.headerTitle}>{props.title}</Text>
    		</View>
			</View>
		</View>

		<View>
			<DetailsRow
				icon='ios-call-outline'
				title={props.mobileNo}
			/>

			<DetailsRow
				icon='ios-pin-outline'
				title={props.location}
			/>

			<DetailsRow
				icon='ios-paper-outline'
				title='Main Role'
				summary={props.role}
			/>
		</View>
  </View>
);

export default class CardStackDemo extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Card stack',
      showBackButton: true
    };

    renderPage(){
        return (
            <View style={styles.container}>
                <AnterosCardStack
                    height={500}
                    width={width}
                    transitionDuration={300}
                    backgroundColor='#f8f8f8'
                    hoverOffset={60}>

                    {people.map((person, i) =>
                        <AnterosCard
                            key={i}
                            onPress={() => console.log('onPress called')}
                            onLongPress={() => console.log('long press called')}
                            backgroundColor={person.background}>
                            <TeamMemberCard {...person} />
                        </AnterosCard>
                    )}

                </AnterosCardStack>
            </View>);
    }
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 0,
		flex: 1,
		justifyContent: 'space-between',
	},
	exampleTitle: {
		fontSize: 16,
		fontFamily: 'Futura-Medium'
	},
	cardHeader: {
		flexDirection: 'row',
		height: 100,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,
	},
	headerName: {
		margin: 0,
		fontWeight: '500',
		fontSize: 23,
		color: '#fff',
		textAlign: 'right'
	},
	headerTitle: {
		marginTop: 4,
		fontWeight: '300',
		fontSize: 16,
		color: '#fff',
		opacity: 0.8,
	},
	img: {
		width: 60,
		height: 60,
		borderRadius: 60	/2,
		borderWidth: 3,
	},
	detailsRow: {
		flexDirection: 'row',
		paddingLeft: 20,
		paddingRight: 20,
		marginBottom: 20,
	},
	detailsIcon: {
		alignItems: 'center',
		width: 25,
		height: 35,
		marginRight: 20,
		alignSelf: 'flex-start',
		borderBottomWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.8)',
	},
	detailsTitle: {
		fontWeight: '500',
		fontSize: 19,
		color: '#fff',
		margin: 0,
		fontStyle: 'italic',
	},
	detailsSummary: {
		fontWeight: '300',
		color: '#fff',
		lineHeight: 22,
		width: 300,
	},
});
