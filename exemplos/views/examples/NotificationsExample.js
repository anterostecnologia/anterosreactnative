import {Component, PureComponent} from "react";
import PropTypes from "prop-types";
import {
  Text,
  TextInput,
  Image,
  StatusBar,
  Platform,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ListView,
  FlatList,
  BackHandler,
  ScrollView,
  StyleSheet,
  I18nManager
} from "react-native";
import {Container, Button, Right, Left, ListItem, Content, Body, Header} from "native-base";
import Fonts from "../examples/Fonts";
import Colors from "../examples/Colors";
import Metrics from "../examples/Metrics";
import Images from "../examples/Images";
import {View} from "react-native-animatable";
import {AnterosNavigationPage, AnterosText, AnterosListRow,AnterosImageList, AnterosNotifyPanel,AnterosButton, AnterosIcon, AnterosImage} from "anteros-react-native";
import {AnterosContainer, AnterosContent, AnterosSection, AnterosBlock, AnterosInputSearchText, AnterosTheme} from "anteros-react-native";


export class NotificationsExample extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Notifications",
    showBackButton: true
  };
  constructor(props) {
    super(props);
    this.notification1 = this.notification1.bind(this);
    this.notification2 = this.notification2.bind(this);
    this.notification3 = this.notification3.bind(this);
  }

  renderRow = highlighted => {
    if (Platform.OS !== "android") {
      return (
        <View
          style={[
            {
              backgroundColor: "#f0f0f0",
              height: 1
            },
            highlighted && {
              marginLeft: 0
            }
          ]}
        />
      );
    }

    return null;
  };

  notification1() {
    this.navigator.push({view: <NotificationExample01 />});
  }

  notification2() {
    this.navigator.push({view: <NotificationExample02 />});
  }

  notification3() {

  }

  renderPage() {
    return (
      <ScrollView
        style={{
          flex: 1
        }}>
        <View
          style={{
            height: 20
          }}
        />
        <AnterosListRow title="Notifications 01" onPress={this.notification1} topSeparator="full" />
        <AnterosListRow title="Notifications 02" onPress={this.notification2} topSeparator="full" />
      </ScrollView>
    );
  }
}

const stylesList = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  row: {
    paddingHorizontal: 10,
    paddingVertical: 20
  }
});


const dataExample01 = [
    {
      id: 1,
      name: 'Johnie Cornwall',
      profile: 'https://antiqueruby.aliansoftware.net//Images/social/notification_profile_one_so10.png',
      notification: 'followed you',
      comment: '',
      time: 'Just now',
      postImage: '',
    },
    {
      id: 2,
      name: 'Michal Lampley',
      profile: 'https://antiqueruby.aliansoftware.net//Images/social/notification_profile_two_so10.png',
      notification: 'commented your post',
      comment: 'Lorem ipsum dolor sit amet, conses adipisi, sed do eiusmod tempor ince idunt ut labore et dolore.',
      time: '25 mins ago',
      postImage: '',
    },
    {
      id: 3,
      name: 'Marissa Brackett',
      profile: 'https://antiqueruby.aliansoftware.net//Images/social/notification_profile_three_so10.png',
      notification: 'liked your post',
      comment: '',
      time: '45 mins ago',
      postImage: '',
    },
    {
      id: 4,
      name: 'Kayleen Batz',
      profile: 'https://antiqueruby.aliansoftware.net//Images/social/notification_profile__so10.png',
      notification: 'followed you',
      comment: '',
      time: '2 hours ago',
      postImage: '',
    },
    {
      id: 5,
      name: 'Antonia Cheers',
      profile: 'https://antiqueruby.aliansoftware.net//Images/social/notification_profile_five_so10.png',
      notification: 'liked your photo',
      comment: '',
      time: '01:35 PM',
      postImage: [
        {image:'https://antiqueruby.aliansoftware.net//Images/social/like_image_one_so10.png', id:10},
        {image:'https://antiqueruby.aliansoftware.net//Images/social/like_image_two_so10.png', id:20},
        {image:'https://antiqueruby.aliansoftware.net//Images/social/like_image_three_so10.png', id:30},
        {image:'https://antiqueruby.aliansoftware.net//Images/social/like_image_four_so10.png', id:40},
        {image:'https://antiqueruby.aliansoftware.net//Images/social/like_image_one_so10.png', id:50},
        {image:'https://antiqueruby.aliansoftware.net//Images/social/like_image_two_so10.png', id:60},
        {image:'https://antiqueruby.aliansoftware.net//Images/social/like_image_three_so10.png', id:70},
        {image:'https://antiqueruby.aliansoftware.net//Images/social/like_image_four_so10.png', id:80},
      ],
    },
    {
      id: 6,
      name: 'Drucilla Mangione',
      profile: 'https://antiqueruby.aliansoftware.net//Images/social/notification_profile_six_so10.png',
      notification: 'commented your post',
      comment: 'Lorem ipsum dolor sit amet, conses adipisi, sed do eiusmod tempor ince idunt ut labore et dolore ali quare eprehenderit.',
      time: '04:23 PM',
      postImage: '',
    },
  ]

class NotificationExample01 extends AnterosNavigationPage {
    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: "Notification",
      showBackButton: true
    };

    constructor(props){
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(item,index){
        return <Item01 item={item} index={index} key={index}/>;
    }

    renderPage(){
        return (
            <AnterosContainer>
                <AnterosContent style={styles.slidesec}>
                    {
                    dataExample01.map((item, index) => {
                        return (
                            this.renderItem(item,index)
                        )
                    })
                    }
                </AnterosContent>
            </AnterosContainer>
        );
    }
}

class Item01 extends PureComponent {
    constructor(props){
        super(props);
    }

    render(){
        const {item,index} = this.props;
        console.log('item');
        console.log(item);
        return (
            <AnterosSection style={styles01.postMainRow}>
                <AnterosSection style={styles01.slide}>
                    <AnterosBlock size="1/8">
                        <AnterosImage source={{uri:item.profile}} style={styles01.imageStyle}/>
                    </AnterosBlock>

                    <AnterosBlock size="stretch" style={styles01.notificationContent}>
                        <AnterosSection>
                            <AnterosBlock style={styles01.titleBar}>
                                <AnterosText style={styles01.name}>{item.name}</AnterosText>
                                <AnterosText style={styles01.notification}>{item.notification}</AnterosText>
                            </AnterosBlock>
                        </AnterosSection>
                        {
                        (item.comment == '') ? null :
                            <AnterosSection>
                                <AnterosBlock>
                                    <AnterosText style={styles01.comments}>{item.comment}</AnterosText>
                                </AnterosBlock>
                            </AnterosSection>
                        }
                        {
                        (item.postImage == '') ? null :
                            <AnterosSection>
                                <AnterosBlock>
                                    <AnterosImageList 
                                        horizontal={true} 
                                        dataSource={item.postImage} 
                                        idName={'id'}
                                        sourceName={'image'}
                                        imageStyle={styles01.postedImage}/>
                                </AnterosBlock>
                            </AnterosSection>            
                        }
                        <AnterosSection>
                            <AnterosBlock style={styles01.bottombar}>
                                <AnterosIcon type="ionicon" name="md-time" size={15} color="#d4d4d4" />
                                <AnterosText style={styles01.time}>{item.time}</AnterosText>
                            </AnterosBlock>
                        </AnterosSection>    
                    </AnterosBlock>
                </AnterosSection>
                {/* <Anteros style={styles01.separatoeStyle}></AnterosSection> */}
            </AnterosSection>
        )
    }
}

const styles01 = StyleSheet.create({

	main:{
		backgroundColor: '#2d324f'
	},

  	logosec:{
		height: (Metrics.HEIGHT*0.095),
		marginTop: (Platform.OS === 'ios')? 0 : (Metrics.HEIGHT*0.035),
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	},

	slidesec:{
		height: (Metrics.HEIGHT*0.905),
		position: 'relative',
		backgroundColor: Colors.snow,
	},

	postImageContent:{
		flexDirection: 'row',
		paddingVertical: (Metrics.HEIGHT*0.01),
	},

	name: {
		color: '#363636',
		fontSize: Fonts.moderateScale(15),
		fontFamily: Fonts.type.sfuiDisplayMedium,
		marginRight: (Metrics.WIDTH) * 0.015
	},

	notification: {
		color: '#b7b7b7',
		fontFamily: Fonts.type.sfuiDisplayRegular,
		fontSize: Fonts.moderateScale(12),
	},

	comments: {
		color: '#6f6f6f',
		fontSize: Fonts.moderateScale(15),
		fontFamily: Fonts.type.sfuiDisplayRegular,
		marginVertical: (Metrics.HEIGHT*0.005),
		textAlign: 'left'
	},

	postedImage: {
		height:(Metrics.HEIGHT*0.09),
        width:(Metrics.HEIGHT*0.09),
        margin: 4
	},

	slide: {
		marginVertical: (Metrics.HEIGHT * 0.02),
		flexDirection: 'row',
	},

	imageStyle: {
		width: (Metrics.HEIGHT * 0.06),
		height: (Metrics.HEIGHT * 0.06),
		borderRadius: (Metrics.HEIGHT * 0.03),
		marginRight: (Metrics.WIDTH * 0.04),
		resizeMode: 'cover',
	},

	notificationContent: {
		marginTop: (Metrics.WIDTH * 0.005),
		marginRight: (Metrics.WIDTH * 0.02),
	},

	titleBar: {
		flexDirection: 'row',
		alignItems: 'flex-end'
	},

	bottombar: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginTop: (Platform.OS === 'ios')? (Metrics.HEIGHT * 0.005) : 0,
	},

	time: {
		color: '#b7b7b7',
		fontFamily: Fonts.type.sfuiDisplayRegular,
		fontSize: Fonts.moderateScale(12),
		marginLeft: (Metrics.WIDTH) * 0.02
	},

	separatoeStyle: {
		height: (Metrics.HEIGHT) * 0.001,
		backgroundColor: '#b7b7b7'
	},

	postImageView:{
		height:(Metrics.HEIGHT*0.2),
		backgroundColor: '#ff0000',
	},

	postMainRow:{
		backgroundColor: Colors.snow,
		paddingLeft: (Metrics.WIDTH * 0.04)
	},

	postImageView:{
		paddingRight:(Metrics.WIDTH*0.05)
	},

});


const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 75
  }

const dataExample02 = [
  {
    id:1,
    title:'Today',
    body:'',
    group: true
  },
  {
    id:2,
    title:'First Notification',
    body:'This is the body of the first notification',
    group: false
  },
  {
    id:3,
    title:'Second Notification',
    body:'This is the body of the 2nd notification',
    group: false
  },
  {
    id:4,
    title:'Third Notification',
    body:'This is the body of the 3rd notification',
    group: false
  },
  {
    id:5,
    title:'Fourth Notification',
    body:'This is the body of the 4rd notification',
    group: false
  },
  {
    id:6,
    title:'Yesterday',
    body:'',
    group: true
  },
  {
    id:7,
    title:'First Notification',
    body:'This is the body of the first notification',
    group: false
  },
  {
    id:8,
    title:'Second Notification',
    body:'This is the body of the 2nd notification',
    group: false
  },
  {
    id:9,
    title:'Third Notification',
    body:'This is the body of the 3rd notification',
    group: false
  },
  {
    id:10,
    title:'Fourth Notification',
    body:'This is the body of the 4rd notification',
    group: false
  }
];

class NotificationExample02 extends AnterosNavigationPage {
    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: "Notification",
      showBackButton: true
    };

    constructor(props){
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(item,index){
      if (item.group){
        return <AnterosText style={styles02.panelHeader}>{item.title}</AnterosText>
      } else {
         return <Notification title={item.title} body={item.body}/>
      }
    }

    renderPage(){
        return (
            <AnterosContainer style={styles02.container}>
              <AnterosContent style={styles02.panel} scrollable={true}>
                  <AnterosSection>
                      <AnterosBlock size="1/1" style={styles02.content}>
                         <AnterosText style={styles02.contentTitle}>{'Content Title'}</AnterosText>
                      </AnterosBlock> 
                  </AnterosSection>      
                  <AnterosSection>    
                      <AnterosBlock size="1/1" style={styles02.content}>
                         <AnterosImage style={styles02.contentImage} source={require('../../images/tinder-photo.jpg')} />
                      </AnterosBlock> 
                  </AnterosSection>
                  <AnterosSection>         
                      <AnterosBlock size="1/1" style={styles02.content}>
                        <AnterosText style={styles02.contentBody}>{'This is the content body'}</AnterosText>
                      </AnterosBlock>  
                  </AnterosSection>                  
              </AnterosContent>     
              <AnterosNotifyPanel renderItem={this.renderItem} dataSource={dataExample02} footerTitle={dataExample02.length+' NOTIFICATIONS'}/>         
            </AnterosContainer>);
    }
}

class Notification extends Component {
  render() {
    return (
      <View style={styles02.notificationContainer}>
        <View style={styles02.notificationHeader}>
          <Text style={styles02.notificationTitle}>{this.props.title}</Text>
        </View>
        <Text style={styles02.notificationBody}>{this.props.body}</Text>
      </View>
    );
  }
}

const styles02 = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#efefef',
    },
    panelContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    content: {
      alignItems:'center', justifyContent: 'center',
    },
    panel: {
      flex:1,
      paddingTop:100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentTitle: {
      fontSize: 20,
      marginBottom: 10
    },
    contentImage: {
      width: Screen.width-50,
      height: Screen.width-50
    },
    contentBody: {
      fontSize: 18,
      color: 'gray',
      marginTop: 10
    },
    panelHeader: {
      fontSize: 24,
      color: 'white',
      marginTop: 15,
      marginBottom: 10,
      marginLeft: 10,
      justifyContent: 'flex-start'
    },
    panelFooterIos: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    panelFooterAndroid: {
      flex: 1,
      paddingTop: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    panelFooterText: {
      fontSize: 13,
      color: '#ffffff80',
      marginBottom: 10
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#ffffff80'
    },
    notificationContainer: {
      backgroundColor: '#b0cbdd',
      borderRadius: 14,
      marginBottom: 10
    },
    notificationHeader: {
      height: 30,
      backgroundColor: '#c3d6e1',
      borderTopLeftRadius: 14,
      borderTopRightRadius: 14,
      paddingHorizontal: 20
    },
    notificationTitle: {
      marginTop: 5,
      fontSize: 16,
      color: '#1c5675'
    },
    notificationBody: {
      marginVertical: 14,
      marginHorizontal: 20
    }
  });

