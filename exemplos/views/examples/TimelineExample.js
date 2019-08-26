import React, {Component, PureComponent} from "react";
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
import {AnterosSearchBox,AnterosTheme,AnterosNavigationPage, AnterosText, AnterosListRow, AnterosButton,AnterosIcon,AnterosImage} from "anteros-react-native";
import {AnterosInputSearchText,AnterosContainer, AnterosContent, AnterosSection, AnterosBlock} from "anteros-react-native";

export default class NewsFeedExample extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "News",
    showBackButton: true
  };
  constructor(props) {
    super(props);
    this.timeline1 = this.timeline1.bind(this);
    this.timeline2 = this.timeline2.bind(this);
    this.timeline3 = this.timeline3.bind(this);
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

  timeline1() {
    this.navigator.push({view: <TimelineExample01 />});
  }

  timeline2() {
    this.navigator.push({view: <TimelineExample02 />});
  }

  timeline3() {

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
        <AnterosListRow title="Timeline 01" onPress={this.timeline1} topSeparator="full" />
        <AnterosListRow title="Timeline 02" onPress={this.timeline2} topSeparator="full" />
        <AnterosListRow title="Timeline 03" onPress={this.timeline3} topSeparator="full" />
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

const images01 = [{uri:"https://antiqueruby.aliansoftware.net//Images/social/ic_chat_propic04_21_29.png"},
                  {uri:"https://antiqueruby.aliansoftware.net//Images/social/ic_user_one_row_sone.png"},
                  {uri:"https://antiqueruby.aliansoftware.net//Images/social/comments_profile_foursnine.png"},
                  {uri:"https://antiqueruby.aliansoftware.net//Images/social/image_food_social_seven.png"}];

var dataExample01 = [
    {
    id: 1,
    name: 'Johnie Cornwall',
    profileImage: images01[0],
    postImage: '',
    time: '8 mins',
    likeCount: 12,
    commentCount: 35,
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
    id: 2,
    name: 'Michal Lampley',
    profileImage: images01[1],
    postImage: images01[3],
    time: '10 mins',
    likeCount: 12,
    commentCount: 35,
    description: 'Sed iaculis elit velit, at faucibus metus imperdiet sed. Sed dictum, nunc et tempor accumsan, libero turpis ullamcorper quam, ut efficitur dolor augue sed sapien.',
    },
    {
    id: 3,
    name: 'Marissa Brackett',
    profileImage: images01[2],
    postImage: '',
    time: '15 mins',
    likeCount: 12,
    commentCount: 35,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus posuere, nibh id pellentesque hendrerit, massa dui fermentum massa, eget fermentum libero nisl convallis elit. ',
    }
]

class TimelineExample01 extends AnterosNavigationPage {
    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: "Timeline",
      showBackButton: true
    };
  
    constructor(props) {
      super(props);
      this.state = {};
      this.renderItem = this.renderItem.bind(this);
    }
  
    renderItem(item, index) {
      return <Item01 item={item} key={item.id} index={index}/>;
    }

    renderNavigationRightView(){
        return <AnterosIcon containerStyle={{marginRight: 4}} onPress={()=>alert("Search")} type="ionicon" name="ios-search" size={25} color="white"/>
    }
  
    renderPage() {
      var that = this;
  
      return (
        <AnterosContainer style={styles01.main}>
            <AnterosContent>
                {dataExample01.map((item, index) => {
                    return (
                    this.renderItem(item,index)
                    );
                })}
            </AnterosContent>
        </AnterosContainer>);
    }
}


class Item01 extends PureComponent {
    render(){
      let {item,index} = this.props;
      return <AnterosSection>
                <AnterosSection>
                    <AnterosBlock size="1/7" mdSize="1/20">
                        {item.profileImage == "" ? null : (
                            <AnterosImage style={styles01.profileImg} source={item.profileImage}/>
                        )}       
                    </AnterosBlock>
                    <AnterosBlock size="stretch" style={styles01.nameDescView}>
                        <AnterosSection>
                            <AnterosBlock size="stretch">
                                <AnterosText style={styles01.rowNameTxt}>{item.name}</AnterosText>
                            </AnterosBlock>
                            <AnterosBlock size="1/5">
                                <AnterosText style={styles01.rowTimeTxt}>{item.time}</AnterosText>
                            </AnterosBlock>
                        </AnterosSection>
                        <AnterosSection>
                            <AnterosBlock size="stretch">
                                <AnterosText style={styles01.rowDescTxt}>{item.description}</AnterosText>
                                {
                                    (item.postImage == '') ? null :
                                    <AnterosImage source={item.postImage} style={styles01.postDescImg}/>
                                }
                            </AnterosBlock>
                        </AnterosSection>
                        <AnterosBlock style={styles01.likeCommentView}>
                            <AnterosIcon containerStyle={styles01.likeView}
                                type="font-awesome"
                                name="heart"
                                size={18}
                                color="#d4d4d4"
                                onPress={() => alert("Like")}
                                text={item.likeCount}
                                textStyle={styles01.textStyle}
                            />                
                            
                            <AnterosIcon containerStyle={styles01.likeView}
                                type="font-awesome"
                                name="comments"
                                size={18}
                                color="#d4d4d4"
                                onPress={() => alert("Like")}
                                text={item.commentCount}
                                textStyle={styles01.textStyle}
                                />  
                        </AnterosBlock>
                    </AnterosBlock>
                </AnterosSection>
                <AnterosSection>
                    <AnterosBlock size="1/1" style={(index === dataExample01.length - 1) ? null :styles01.dividerHorizontal}/>
                </AnterosSection>
            </AnterosSection>
    }
}


const styles01 = StyleSheet.create({
 
    main: {
      backgroundColor: Colors.snow,
      flexDirection: 'column',
      margin:8
    },
  
    rowBg: {
      backgroundColor: Colors.snow,
      marginLeft: (Metrics.WIDTH) * 0.045,
      marginTop: (Metrics.HEIGHT) * 0.015
    },
  
    dividerHorizontal: {
      marginTop:4,
      marginBottom:8,
      height: (Metrics.HEIGHT) * 0.001,
      backgroundColor: "#D7D7D7",
    },
  
    profileImg: {
      width: (Metrics.WIDTH) * 0.14,
      height: (Metrics.WIDTH) * 0.14,
      borderRadius: (Metrics.WIDTH) * 0.07,
      justifyContent: 'flex-start'
    },
  
    rowPostDescription: {
      fontFamily: Fonts.type.sfuiDisplaySemibold,
      fontSize: Fonts.moderateScale(14),
      marginTop: (Metrics.HEIGHT) * 0.015,
    },
  
    rowNameTxt: {
      color: "#363636",
      fontSize: Fonts.moderateScale(16),
      fontFamily: Fonts.type.sfuiDisplayMedium,
      marginTop: (Metrics.HEIGHT) * 0.007
    },
  
    rowTimeTxt: {
      color: "#b7b7b7",
      fontSize: Fonts.moderateScale(14),
      fontFamily: Fonts.type.sfuiDisplayRegular,
    },
  
    rowDescTxt: {
      color: "#6f6f6f",
      fontSize: Fonts.moderateScale(14),
      fontFamily: Fonts.type.sfuiDisplayRegular,
      marginTop: (Metrics.HEIGHT) * 0.011,
      textAlign: 'left'
    },
  
    likeCommentText: {
      fontFamily: Fonts.type.sfuiDisplayRegular,
      fontSize: Fonts.moderateScale(14),
      marginLeft: (Metrics.WIDTH) * 0.02,
      color: "#6f6f6f"
    },
  
    mainListView:{
    },
  
    rowView:{
      flexDirection: 'row'
    },
  
    nameDescView:{
      flexDirection: 'column',
      marginLeft: (Metrics.WIDTH) * 0.045,
      width: (Metrics.WIDTH) * 0.75
    },
  
    nameView:{
      flexDirection: 'row'
    },
  
    postDescImg:{
      resizeMode: 'cover',
      height: (Metrics.HEIGHT) * 0.20,
      marginTop: (Metrics.HEIGHT) * 0.015,
    },
  
    likeCommentView:{
      flexDirection: 'row',
      marginTop: (Metrics.HEIGHT) * 0.015,
      marginBottom: (Metrics.HEIGHT) * 0.020
    },
  
    likeView:{
      flexDirection: 'row',
      width: (Metrics.WIDTH) * 0.18
    },
  
    likeCommentShareImage: {
      width: (Metrics.WIDTH) * 0.05,
      height: (Metrics.HEIGHT) * 0.022,
      resizeMode: 'contain',
      marginTop: (Metrics.HEIGHT) * 0.004
    },
  
  });



const images02 = [{uri:"https://antiqueruby.aliansoftware.net//Images/social/timeline_image_one_seight.png"},
                    {uri:"https://antiqueruby.aliansoftware.net//Images/social/timeline_image_two_seight.png"},
                    {uri:"https://antiqueruby.aliansoftware.net//Images/social/timeline_profile_one_seight.png"},
                    {uri:"https://antiqueruby.aliansoftware.net//Images/social/timeline_profile_two_seight.png"}];

var dataExample02 = [
    {
        id: 1,
        name: 'Johnie Cornwall',
        profileImage: images02[2],
        postImage: images02[0],
        time: '8 mins',
        likeCount: 12,
        commentCount: 35,
    },
    {
        id: 2,
        name: 'Michal Lampley',
        profileImage: images02[3],
        postImage: images02[1],
        time: '12 mins',
        likeCount: 12,
        commentCount: 35,
    },
    {
        id: 3,
        name: 'Johnie Cornwall',
        profileImage: images02[2],
        postImage: images02[0],
        time: '8 mins',
        likeCount: 12,
        commentCount: 35,
    },
    {
        id: 4,
        name: 'Michal Lampley',
        profileImage: images02[3],
        postImage: images02[1],
        time: '12 mins',
        likeCount: 12,
        commentCount: 35,
    }
]



class TimelineExample02 extends AnterosNavigationPage {
    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: "Timeline",
        showBackButton: true
    };
    
    constructor(props) {
        super(props);
        this.state = {};
        this.renderItem = this.renderItem.bind(this);
    }
    
    renderItem(item, index) {
        return <Item02 item={item} key={item.id} index={index}/>;
    }

    renderNavigationRightView(){
        return <AnterosIcon containerStyle={{marginRight: 4}} onPress={()=>alert("Search")} type="ionicon" name="ios-search" size={25} color="white"/>
    }
    
    renderPage() {
        var that = this;
    
        return (
        <AnterosContainer>
            <AnterosContent scrollable={false}>
                <AnterosSection>
                    <AnterosBlock size='1/1'>
                        <AnterosSearchBox/>
                    </AnterosBlock>
                </AnterosSection>
            </AnterosContent>
            <AnterosContent style={styles02.main}>
                {dataExample02.map((item, index) => {
                    return (
                    this.renderItem(item,index)
                    );
                })}
            </AnterosContent>
        </AnterosContainer>);
    }
}


class Item02 extends PureComponent {
    render(){
      let {item,index} = this.props;
      return <AnterosSection style={styles02.rowBg}>
                <AnterosSection>
                    {item.postImage == "" ? null : (
                    <AnterosImage style={styles02.postDescImg} source={item.postImage} resizeMode= "stretch"/>
                    )} 
                </AnterosSection>
                <AnterosSection style={{margin:10}}>
                    <AnterosBlock size="1/8">
                        {item.profileImage == "" ? null : (
                            <AnterosImage style={styles02.profileImg} source={item.profileImage}/>
                        )} 
                    </AnterosBlock>
                    <AnterosBlock size="stretch" style={styles02.postNameTimeView}>
                        <AnterosText style={styles02.rowNameTxt}>{item.name}</AnterosText>
                        <AnterosText style={styles02.rowTimeTxt}>{item.time}</AnterosText>
                    </AnterosBlock>
                    <AnterosBlock size="1/6">
                        <AnterosIcon containerStyle={styles01.likeView}
                            type="font-awesome"
                            name="heart"
                            size={18}
                            color="#d4d4d4"
                            onPress={() => alert("Like")}
                            text={item.likeCount}
                            textStyle={styles01.textStyle}
                        />               
                    </AnterosBlock> 
                    <AnterosBlock size="1/6">        
                        <AnterosIcon containerStyle={styles01.likeView}
                            type="font-awesome"
                            name="comments"
                            size={18}
                            color="#d4d4d4"
                            onPress={() => alert("Comments")}
                            text={item.commentCount}
                            textStyle={styles01.textStyle}
                            />  
                    </AnterosBlock>
                </AnterosSection>
            </AnterosSection>
    }
}


const styles02 = StyleSheet.create({ 
    main: {
      backgroundColor: "#F2F2F2",
      flexDirection: 'column'
    },
  
    lastRowBg: {
      backgroundColor: Colors.snow,
      justifyContent: 'center'
    },
  
    rowBg: {
      backgroundColor: Colors.snow,
      justifyContent: 'center',
      marginBottom: (Metrics.HEIGHT) * 0.025,
    },
  
    profileImg: {
      width: (Metrics.WIDTH) * 0.12,
      height: (Metrics.WIDTH) * 0.12,
      borderRadius: (Metrics.WIDTH) * 0.06,
      alignSelf: 'flex-start',
    },
  
    rowNameTxt: {
      color: "#363636",
      fontSize: Fonts.moderateScale(16),
      fontFamily: Fonts.type.sfuiDisplayMedium,
      textAlign: 'left'
    },
  
    rowTimeTxt: {
      color: "#b7b7b7",
      fontSize: Fonts.moderateScale(14),
      fontFamily: Fonts.type.sfuiDisplayRegular,
    },
  
    rowDescTxt: {
      color: "#6f6f6f",
      fontSize: Fonts.moderateScale(13),
      fontFamily: Fonts.type.sfuiDisplayRegular,
      textAlign: 'left'
    },
  
    dividerHorizontal: {
      width: (Metrics.WIDTH) * 0.90,
      height: (Metrics.HEIGHT) * 0.001,
      backgroundColor: "#F2F2F2",
      alignSelf: 'center',
    },
  
    likeCommentText: {
      fontFamily: Fonts.type.sfuiDisplayRegular,
      fontSize: Fonts.moderateScale(14),
      marginLeft: (Metrics.WIDTH) * 0.02,
      color: "#6f6f6f"
    },
  
    likeCommentImage: {
      width: (Metrics.WIDTH) * 0.06,
      height: (Metrics.HEIGHT) * 0.03,
      resizeMode: 'contain',
    },
  
    dividerVertical: {
      width: (Metrics.WIDTH) * 0.003,
      height: (Metrics.HEIGHT) * 0.04,
      backgroundColor: "#F2F2F2",
      alignSelf: 'flex-end',
    },
  
    searchViewBg:{
      backgroundColor: "#c8c8cb",
      width: (Metrics.WIDTH),
      height: (Metrics.HEIGHT) * 0.09,
      justifyContent: 'center'
    },
  
    searchView:{
      backgroundColor: Colors.snow,
      borderRadius: 5,
      paddingTop: (Metrics.HEIGHT) * 0.008,
      paddingBottom: (Metrics.HEIGHT) * 0.008,
      marginLeft: (Metrics.WIDTH) * 0.02,
      marginRight: (Metrics.WIDTH) * 0.02,
      flexDirection: 'row',
      justifyContent: 'center'
    },
  
    searchText:{
      color: "#a8a8a8",
      fontSize: Fonts.moderateScale(15),
      fontFamily: Fonts.type.sfuiDisplayRegular,
      marginLeft: (Metrics.WIDTH) * 0.03
    },
  
    listMainView:{
      width: (Metrics.WIDTH),
      backgroundColor: '#f2f2f2'
    },
  
    postDescImg:{
      width: (Metrics.WIDTH),
      height: (Metrics.HEIGHT) * 0.35,
      alignSelf: 'center',
    },
  
    postInfoView:{
      backgroundColor: Colors.snow,
      flexDirection: 'row',
      width: (Metrics.WIDTH) * 0.92,
      alignSelf: 'center',
      marginTop: (Metrics.HEIGHT) * 0.022,
      marginBottom: (Metrics.HEIGHT) * 0.022
    },
  
    postNameTimeView:{
      flexDirection: 'column',
      marginLeft: (Metrics.WIDTH) * 0.04,
      alignSelf: 'center'
    },
  
    likeCommentView:{
      flexDirection: 'row',
      marginTop: (Metrics.HEIGHT) * 0.006
    },
  
  });