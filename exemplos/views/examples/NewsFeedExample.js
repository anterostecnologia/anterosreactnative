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
  FlatList,
  BackHandler,
  ScrollView,
  StyleSheet,
  I18nManager
} from "react-native";
import ListView from 'deprecated-react-native-listview'
import {Container, Button, Right, Left, ListItem, Content, Body, Header} from "native-base";
import Fonts from "../examples/Fonts";
import Colors from "../examples/Colors";
import Metrics from "../examples/Metrics";
import Images from "../examples/Images";
import {View} from "react-native-animatable";
import {AnterosNavigationPage, AnterosText, AnterosListRow, AnterosButton, AnterosImage, AnterosIcon, AnterosScrollableTabBar} from "anteros-react-native";
import {AnterosFacePile, AnterosTheme, AnterosContainer, AnterosContent, AnterosSection, AnterosBlock, AnterosInputSearchText, AnterosScrollableTabView, AnterosScrollableTab} from "anteros-react-native";

export default class NewsFeedExample extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "News",
    showBackButton: true
  };
  constructor(props) {
    super(props);
    this.news1 = this.news1.bind(this);
    this.news2 = this.news2.bind(this);
    this.news3 = this.news3.bind(this);
    this.news4 = this.news4.bind(this);
    this.news5 = this.news5.bind(this);
    this.news6 = this.news6.bind(this);
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

  news1() {
    this.navigator.push({view: <NewsFeedExample01 />});
  }

  news2() {
    this.navigator.push({view: <NewsFeedExample02 />});
  }

  news3() {
    this.navigator.push({view: <NewsFeedExample03 />});
  }

  news4() {
    this.navigator.push({view: <NewsFeedExample04 />});
  }

  news5() {
    this.navigator.push({view: <NewsFeedExample05 />});
  }

  news6() {
    this.navigator.push({view: <NewsFeedExample06 />});
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
        <AnterosListRow title="News feed 01" onPress={this.news1} topSeparator="full" />
        <AnterosListRow title="News feed 02" onPress={this.news2} topSeparator="full" />
        <AnterosListRow title="News feed 03" onPress={this.news3} topSeparator="full" />
        <AnterosListRow title="News feed 04" onPress={this.news4} topSeparator="full" />
        <AnterosListRow title="News feed 05" onPress={this.news5} topSeparator="full" />
        <AnterosListRow title="News feed 06" onPress={this.news6} topSeparator="full" />
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

const images01 = [
  {
    id: 1,
    imageUrl: "https://antiqueruby.aliansoftware.net//Images/social/ic_chat_propic04_21_29.png"
  },
  {
    id: 2,
    imageUrl: "https://antiqueruby.aliansoftware.net//Images/social/comments_profile_foursnine." + "png"
  },
  {
    id: 3,
    imageUrl: "https://antiqueruby.aliansoftware.net//Images/social/ic_suggested_user_three_son" + "e.png"
  },
  {
    id: 4,
    imageUrl: "https://antiqueruby.aliansoftware.net//Images/social/ic_user_one_row_sone.png"
  }
];

var dataExample01 = [
  {
    id: 1,
    name: "Johnie Cornwall",
    postImage: "",
    profileImage: {
      uri: images01[1].imageUrl
    },
    time: "8 mins",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor " +
      "incididunt ut labore et dolore magna aliqua."
  },
  {
    id: 2,
    name: "Calandra Herwig",
    postImage: {
      uri: "https://antiqueruby.aliansoftware.net//Images/social/ic_post_sone.png"
    },
    profileImage: {
      uri: images01[3].imageUrl
    },
    time: "15 mins",
    description:
      "Sed iaculis elit velit, at faucibus metus imperdiet sed. Sed dictum, nunc et tem" +
      "por accumsan, libero turpis ullamcorper quam, ut efficitur dolor augue sed sapie" +
      "n."
  },
  {
    id: 3,
    name: "Calandra Herwig",
    postImage: {
      uri: "https://antiqueruby.aliansoftware.net//Images/social/ic_post_sone.png"
    },
    profileImage: {
      uri: images01[3].imageUrl
    },
    time: "15 mins",
    description:
      "Sed iaculis elit velit, at faucibus metus imperdiet sed. Sed dictum, nunc et tem" +
      "por accumsan, libero turpis ullamcorper quam, ut efficitur dolor augue sed sapie" +
      "n."
  },
  {
    id: 4,
    name: "Calandra Herwig",
    postImage: {
      uri: "https://antiqueruby.aliansoftware.net//Images/social/ic_post_sone.png"
    },
    profileImage: {
      uri: images01[3].imageUrl
    },
    time: "15 mins",
    description:
      "Sed iaculis elit velit, at faucibus metus imperdiet sed. Sed dictum, nunc et tem" +
      "por accumsan, libero turpis ullamcorper quam, ut efficitur dolor augue sed sapie" +
      "n."
  }
];

class NewsFeedExample01 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "News Feed",
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(item, index) {
    return <Item01 item={item} key={item.id}/>;
  }

  renderPage() {
    var that = this;

    return (
      <AnterosContainer style={styles01.main}>
        <AnterosContent scrollable={false} style={styles01.mainRow}>
          <AnterosSection>
            <AnterosBlock size="stretch">
              <AnterosText style={styles01.mainRowFirstText}>Suggest connections</AnterosText>
              <AnterosText style={styles01.mainRowSecondText}>People that you may know</AnterosText>
            </AnterosBlock>
            <AnterosBlock xsSize="1/3" smSize="1/3" >
              <AnterosFacePile
                numFaces={3}                
                faces={images01}
              />
            </AnterosBlock>
          </AnterosSection>
        </AnterosContent>
        <AnterosContent>
          {dataExample01.map((item, index) => {
            return (
              this.renderItem(item,index)
            );
          })}
        </AnterosContent>
      </AnterosContainer>
    );
  }
}


class Item01 extends PureComponent {
  render(){
    let {item} = this.props;
    return <AnterosSection style={styles01.rowBg}>
              <AnterosSection style={styles01.rowHeaderView}>
                <AnterosBlock size="1/5">
                  <AnterosImage style={styles01.profileImg} source={item.profileImage} />
                </AnterosBlock>

                <AnterosBlock size="stretch">
                  <AnterosText style={styles01.rowNameTxt}>{item.name}</AnterosText>
                  <AnterosText style={styles01.rowTimeTxt}>{item.time}</AnterosText>
                </AnterosBlock>

                <AnterosBlock size="1/10">
                  <AnterosIcon
                    type="ionicon"
                    name="ios-more"
                    size={25}
                    color="#d4d4d4"
                    onPress={() => alert("More")}
                  />
                </AnterosBlock>
              </AnterosSection>

              <AnterosSection>
                <View style={styles01.dividerHorizontal} />
              </AnterosSection>

              <AnterosSection style={styles01.rowDescriptionView}>
                <AnterosBlock>
                  <AnterosText style={styles01.rowDescTxt}>{item.description}</AnterosText>
                  {item.postImage == "" ? null : (
                    <AnterosImage style={styles01.postDescImage} source={item.postImage} resizeMode= "stretch"/>
                  )}
                </AnterosBlock>
              </AnterosSection>

              <AnterosSection>
                <View style={styles01.dividerHorizontal} />
              </AnterosSection>

              <LikeShareButtons item={item}/>
            </AnterosSection>
  }
}

const styles01 = StyleSheet.create({
  main: {
    backgroundColor: "#F2F2F2",
    flexDirection: 'column'
  },

  dividerVertical: {
    width: (Metrics.WIDTH) * 0.003,
    height: (Metrics.HEIGHT) * 0.03,
    backgroundColor: "#F2F2F2",
    alignSelf: 'center'
  },

  mainRow:{
    alignSelf: 'center',
    backgroundColor: Colors.snow,
    flexDirection: 'row',
    padding:(Metrics.HEIGHT) * 0.015,
    justifyContent:'center',
    margin:(Metrics.HEIGHT) * 0.015,
    shadowOffset:{width: 2,  height: 2},
    shadowColor: '#DFDFDF',
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2
  },

  rowBg: {
    alignSelf: 'center' ,
    backgroundColor: Colors.snow,
    margin: (Metrics.HEIGHT) * 0.015,
    padding:(Metrics.HEIGHT) * 0.015,
    justifyContent: 'center',
    shadowOffset:{width: 3,  height: 3},
    shadowColor: '#DFDFDF',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5
  },

  statusView:{
    borderRadius: (Metrics.HEIGHT) * 0.030,
  },

  statusTxt: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(10),
    fontFamily: Fonts.type.sfuiDisplayRegular,
  },

  mainRowFirstText:{
    fontSize: Fonts.moderateScale(16),
    fontFamily: Fonts.type.sfuiDisplayMedium,
    color: "#6f6f6f",
    textAlign: 'left'
  },

  mainRowSecondText:{
      fontSize: Fonts.moderateScale(16),
      fontFamily: Fonts.type.sfuiDisplayRegular,
      color: "#bfbfbf",
      textAlign: 'left'
  },

  rowHeaderView:{
    flexDirection: 'row',
    marginTop: (Metrics.HEIGHT) * 0.015
  },

  profileImg: {
    width: (Metrics.WIDTH) * 0.12,
    height: (Metrics.WIDTH) * 0.12,
    borderRadius: (Metrics.WIDTH) * 0.06,
    alignSelf: 'flex-start',
    marginLeft: (Metrics.WIDTH) * 0.03
  },

  rowNameTxt: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(17),
    fontFamily: Fonts.type.sfuiDisplayMedium,
  },

  rowTimeTxt: {
    color: "#b7b7b7",
    fontSize: Fonts.moderateScale(14),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    textAlign: 'left'
  },

  rowDescTxt: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(15),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    marginTop: (Metrics.HEIGHT) * 0.015,
    textAlign: 'left'
  },

  dividerHorizontal: {
    height: (Metrics.HEIGHT) * 0.001,
    backgroundColor: "#F2F2F2",
    alignSelf: 'center',
    flex:1,
    marginTop: (Metrics.HEIGHT) * 0.02
  },

  likeCommentShareView:{
    flexDirection: 'row',
    marginTop: (Metrics.HEIGHT) * 0.015,
    marginBottom: (Metrics.HEIGHT) * 0.005,    
  },

  likeView:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  commentView:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  shareView:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dividerHorizontal: {
    height: (Metrics.HEIGHT) * 0.001,
    backgroundColor: "#F2F2F2",
    alignSelf: 'center',
    flex:1,
    marginTop: (Metrics.HEIGHT) * 0.02

  },

  likeCommentShareText: {
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(16),
    marginLeft: (Metrics.WIDTH) * 0.03,
    color: "#6f6f6f"
  },

  likeCommentShareImage: {
    width: (Metrics.WIDTH) * 0.06,
    height: (Metrics.HEIGHT) * 0.03,
  },

  postDescImage:{
    flex: 1,
    width: (Metrics.WIDTH) * 0.90,
    height: (Metrics.HEIGHT) * 0.20,
    alignSelf: 'center',
    marginTop: (Metrics.HEIGHT) * 0.015,
  }
});

images02 = [{uri: "https://antiqueruby.aliansoftware.net//Images/social/ic_user_one_row_sone.png"},
             {uri: "https://antiqueruby.aliansoftware.net//Images/social/card_profile_one_socialsix.png"},
             {uri: "https://antiqueruby.aliansoftware.net//Images/social/comments_profile_foursnine.png"},
             {uri: "https://antiqueruby.aliansoftware.net//Images/social/ic_post_social_two.png"}];

var dataExample02 = [
  {
    id: 1,
    name: 'Johnie Cornwall',
    postImage: '',
    profileImage: images02[0],
    time: '8 mins',
    status: 'Travel',
    statusBgColor: "#4cd964",
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    name: 'Calandra Herwig',
    postImage: images02[3],
    profileImage: images02[1],
    time: '15 mins',
    status: 'Music',
    statusBgColor: "#f7941d",
    description: 'Sed iaculis elit velit, at faucibus metus imperdiet sed. Sed dictum, nunc et tempor accumsan, libero turpis ullamcorper quam, ut efficitur dolor augue sed sapien.',
  },
  {
    id: 3,
    name: 'Calandra Herwig',
    postImage: '',
    profileImage: images02[2],
    time: '20 mins',
    status: 'Movie',
    statusBgColor: "#0691ce",
    description: 'Sed iaculis elit velit, at faucibus metus imperdiet sed. Sed dictum, nunc et tempor accumsan, libero turpis ullamcorper quam, ut efficitur dolor augue sed sapien.',
  }
]

class NewsFeedExample02 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "News Feed",
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(item, index) {
    return <Item02 item={item} key={item.id}/>;
  }

  renderPage() {
    var that = this;

    return (
      <AnterosContainer style={styles02.main}>
        <AnterosContent>
          {dataExample02.map((item, index) => {
            return (
              this.renderItem(item,index)
            );
          })}
        </AnterosContent>
      </AnterosContainer>
    );
  }
}

class Item02 extends PureComponent {
  render(){
    let {item} = this.props;
    return <AnterosSection style={styles02.rowBg}>
              <AnterosSection style={styles02.rowHeaderView}>
                <AnterosBlock size="1/5">
                  <AnterosImage style={styles02.profileImg} source={item.profileImage} />
                </AnterosBlock>

                <AnterosBlock size="stretch">
                  <AnterosText style={styles02.rowNameTxt}>{item.name}</AnterosText>
                  <AnterosText style={styles02.rowTimeTxt}>{item.time}</AnterosText>
                </AnterosBlock>

                <AnterosBlock size="1/5">
                  <AnterosButton 
                  titleStyle={styles02.statusTxt}
                  buttonStyle={[styles02.statusView, {backgroundColor:item.statusBgColor}]} 
                  title={item.status}/>
                </AnterosBlock>
              </AnterosSection>

              <AnterosSection>
                <View style={styles02.dividerHorizontal} />
              </AnterosSection>

              <AnterosSection style={styles02.rowDescriptionView}>
                <AnterosBlock>
                  <AnterosText style={styles02.rowDescTxt}>{item.description}</AnterosText>
                  {item.postImage == "" ? null : (
                    <AnterosImage style={styles02.postDescImage} source={item.postImage} resizeMode= "stretch"/>
                  )}
                </AnterosBlock>
              </AnterosSection>

              <AnterosSection>
                <View style={styles02.dividerHorizontal} />
              </AnterosSection>

              <LikeShareButtons item={item}/>
            </AnterosSection>
  }
}

const styles02 = StyleSheet.create({
  main: {
    backgroundColor: "#F2F2F2",
    flexDirection: 'column'
  },

  dividerVertical: {
    width: (Metrics.WIDTH) * 0.003,
    height: (Metrics.HEIGHT) * 0.03,
    backgroundColor: "#F2F2F2",
    alignSelf: 'center'
  },

  mainRow:{
    alignSelf: 'center',
    backgroundColor: Colors.snow,
    flexDirection: 'row',
    padding:(Metrics.HEIGHT) * 0.015,
    justifyContent:'center',
    shadowOffset:{width: 2,  height: 2},
    shadowColor: '#DFDFDF',
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2
  },

  rowBg: {
    alignSelf: 'center' ,
    backgroundColor: Colors.snow,
    marginBottom: (Metrics.HEIGHT) * 0.015,
    padding:(Metrics.HEIGHT) * 0.015,
    justifyContent: 'center',
    shadowOffset:{width: 3,  height: 3},
    shadowColor: '#DFDFDF',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5
  },

  statusView:{
    borderRadius: (Metrics.HEIGHT) * 0.030,
  },

  statusTxt: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(10),
    fontFamily: Fonts.type.sfuiDisplayRegular,
  },

  mainRowFirstText:{
    fontSize: Fonts.moderateScale(16),
    fontFamily: Fonts.type.sfuiDisplayMedium,
    color: "#6f6f6f",
    textAlign: 'left'
  },

  mainRowSecondText:{
      fontSize: Fonts.moderateScale(16),
      fontFamily: Fonts.type.sfuiDisplayRegular,
      color: "#bfbfbf",
      textAlign: 'left'
  },

  rowHeaderView:{
    flexDirection: 'row',
    marginTop: (Metrics.HEIGHT) * 0.015
  },

  profileImg: {
    width: (Metrics.WIDTH) * 0.12,
    height: (Metrics.WIDTH) * 0.12,
    borderRadius: (Metrics.WIDTH) * 0.06,
    alignSelf: 'flex-start',
    marginLeft: (Metrics.WIDTH) * 0.03
  },

  rowNameTxt: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(17),
    fontFamily: Fonts.type.sfuiDisplayMedium,
  },

  rowTimeTxt: {
    color: "#b7b7b7",
    fontSize: Fonts.moderateScale(14),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    textAlign: 'left'
  },

  rowDescTxt: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(15),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    marginTop: (Metrics.HEIGHT) * 0.015,
    textAlign: 'left'
  },

  dividerHorizontal: {
    height: (Metrics.HEIGHT) * 0.001,
    backgroundColor: "#F2F2F2",
    alignSelf: 'center',
    flex:1,
    marginTop: (Metrics.HEIGHT) * 0.02
  },

  likeCommentShareView:{
    flexDirection: 'row',
    marginTop: (Metrics.HEIGHT) * 0.015,
    marginBottom: (Metrics.HEIGHT) * 0.015
  },

  likeView:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  commentView:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  shareView:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'  
  },

  dividerHorizontal: {
    height: (Metrics.HEIGHT) * 0.001,
    backgroundColor: "#F2F2F2",
    alignSelf: 'center',
    flex:1,
    marginTop: (Metrics.HEIGHT) * 0.02

  },

  likeCommentShareText: {
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(16),
    marginLeft: (Metrics.WIDTH) * 0.03,
    color: "#6f6f6f"
  },

  likeCommentShareImage: {
    width: (Metrics.WIDTH) * 0.06,
    height: (Metrics.HEIGHT) * 0.03,
  },

  postDescImage:{
    flex: 1,
    width: (Metrics.WIDTH) * 0.90,
    height: (Metrics.HEIGHT) * 0.20,
    alignSelf: 'center',
    marginTop: (Metrics.HEIGHT) * 0.015,
  }
});


images03 = [{uri: "https://antiqueruby.aliansoftware.net//Images/social/ic_user_one_row_sone.png"},
             {uri: "https://antiqueruby.aliansoftware.net//Images/social/card_profile_one_socialsix.png"},
             {uri: "https://antiqueruby.aliansoftware.net//Images/social/ic_post_one_social_three.png"},
             {uri: "https://antiqueruby.aliansoftware.net//Images/social/timeline_image_two_seight.png"}];

var dataExample03 = [
  {
    id: 1,
    name: 'Johnie Cornwall',
    postImage: images03[2],
    profileImage: images03[0],
    time: '8 mins',
    status: 'Travel',
    statusBgColor: "#4cd964",
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    name: 'Calandra Herwig',
    postImage: images03[3],
    profileImage: images03[1],
    time: '15 mins',
    status: 'Music',
    statusBgColor: "#f7941d",
    description: 'Sed iaculis elit velit, at faucibus metus imperdiet sed. Sed dictum, nunc et tempor accumsan, libero turpis ullamcorper quam, ut efficitur dolor augue sed sapien.',
  }
]

class NewsFeedExample03 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "News Feed",
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(item, index) {
    return <Item03 item={item} key={item.id}/>;
  }

  renderPage() {
    var that = this;

    return (
      <AnterosContainer style={styles03.main}>
        <AnterosContent>
          {dataExample03.map((item, index) => {
            return (
              this.renderItem(item,index)
            );
          })}
        </AnterosContent>
      </AnterosContainer>
    );
  }
}

class Item03 extends PureComponent {
  render(){
    let {item} = this.props;
    return <AnterosSection style={styles03.rowBg}>
              <AnterosSection style={styles03.rowHeaderView}>
                <AnterosBlock size="1/5">
                  <AnterosImage style={styles03.profileImg} source={item.profileImage} />
                </AnterosBlock>

                <AnterosBlock size="stretch">
                  <AnterosText style={styles03.rowNameTxt}>{item.name}</AnterosText>
                  <AnterosText style={styles03.rowTimeTxt}>{item.time}</AnterosText>
                </AnterosBlock>

                <AnterosBlock size="1/5">
                  <AnterosButton 
                  titleStyle={styles03.statusTxt}
                  buttonStyle={[styles03.statusView, {backgroundColor:item.statusBgColor}]} 
                  title={item.status}/>
                </AnterosBlock>
              </AnterosSection>

              <AnterosSection style={styles03.rowDescriptionView}>
                <AnterosBlock>
                  {item.postImage == "" ? null : (
                    <AnterosImage style={styles03.postDescImage} source={item.postImage} resizeMode= "stretch"/>
                  )}
                  <AnterosText style={styles03.rowDescTxt}>{item.description}</AnterosText>                  
                </AnterosBlock>
              </AnterosSection>

              <AnterosSection>
                <View style={styles03.dividerHorizontal} />
              </AnterosSection>

              <LikeShareButtons item={item}/>
            </AnterosSection>
  }
}

const styles03 = StyleSheet.create({
  main: {
    backgroundColor: "#F2F2F2",
    flexDirection: 'column'
  },

  dividerVertical: {
    width: (Metrics.WIDTH) * 0.003,
    height: (Metrics.HEIGHT) * 0.03,
    backgroundColor: "#F2F2F2",
    alignSelf: 'center'
  },

  mainRow:{
    alignSelf: 'center',
    backgroundColor: Colors.snow,
    flexDirection: 'row',
    padding:(Metrics.HEIGHT) * 0.015,
    justifyContent:'center',
    shadowOffset:{width: 2,  height: 2},
    shadowColor: '#DFDFDF',
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2
  },

  rowBg: {
    alignSelf: 'center' ,
    backgroundColor: Colors.snow,
    marginBottom: (Metrics.HEIGHT) * 0.015,
    padding:(Metrics.HEIGHT) * 0.015,
    justifyContent: 'center',
    shadowOffset:{width: 3,  height: 3},
    shadowColor: '#DFDFDF',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5
  },

  statusView:{
    borderRadius: (Metrics.HEIGHT) * 0.030,
  },

  statusTxt: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(10),
    fontFamily: Fonts.type.sfuiDisplayRegular,
  },

  mainRowFirstText:{
    fontSize: Fonts.moderateScale(16),
    fontFamily: Fonts.type.sfuiDisplayMedium,
    color: "#6f6f6f",
    textAlign: 'left'
  },

  mainRowSecondText:{
      fontSize: Fonts.moderateScale(16),
      fontFamily: Fonts.type.sfuiDisplayRegular,
      color: "#bfbfbf",
      textAlign: 'left'
  },

  rowHeaderView:{
    flexDirection: 'row',
    marginTop: (Metrics.HEIGHT) * 0.015
  },

  profileImg: {
    width: (Metrics.WIDTH) * 0.12,
    height: (Metrics.WIDTH) * 0.12,
    borderRadius: (Metrics.WIDTH) * 0.06,
    alignSelf: 'flex-start',
    marginLeft: (Metrics.WIDTH) * 0.03
  },

  rowNameTxt: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(17),
    fontFamily: Fonts.type.sfuiDisplayMedium,
  },

  rowTimeTxt: {
    color: "#b7b7b7",
    fontSize: Fonts.moderateScale(14),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    textAlign: 'left'
  },

  rowDescTxt: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(15),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    marginTop: (Metrics.HEIGHT) * 0.015,
    textAlign: 'left'
  },

  dividerHorizontal: {
    height: (Metrics.HEIGHT) * 0.001,
    backgroundColor: "#F2F2F2",
    alignSelf: 'center',
    flex:1,
    marginTop: (Metrics.HEIGHT) * 0.02
  },

  likeCommentShareView:{
    flexDirection: 'row',
    marginTop: (Metrics.HEIGHT) * 0.015,
    marginBottom: (Metrics.HEIGHT) * 0.015
  },

  likeView:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  commentView:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  shareView:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'  
  },

  dividerHorizontal: {
    height: (Metrics.HEIGHT) * 0.001,
    backgroundColor: "#F2F2F2",
    alignSelf: 'center',
    flex:1,
    marginTop: (Metrics.HEIGHT) * 0.02

  },

  likeCommentShareText: {
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(16),
    marginLeft: (Metrics.WIDTH) * 0.03,
    color: "#6f6f6f"
  },

  likeCommentShareImage: {
    width: (Metrics.WIDTH) * 0.06,
    height: (Metrics.HEIGHT) * 0.03,
  },

  postDescImage:{
    flex: 1,
    width: (Metrics.WIDTH),
    height: (Metrics.HEIGHT) * 0.40,
    alignSelf: 'center',
    marginTop: (Metrics.HEIGHT) * 0.015,
  }
});

images04 = [{uri:"https://antiqueruby.aliansoftware.net//Images/social/ic_post_one_social_four.png"},
             {uri:"https://antiqueruby.aliansoftware.net//Images/social/ic_post_two_social_four.png"}];

var dataExample04 = [
  {
    id: 1,
    name: 'Alexa Garison',
    postImage: images04[0],
    date: 'Oct 24,2015',
    likeCount: 12,
    commentCount: 35,
    shareCount: 5,
    postDescription: '16 Photos That Prove Dubai is the Most Beautiful City to Admire From Above',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    name: 'Alexa Garison',
    postImage: images04[1],
    date: 'Jan 20,2016',
    likeCount: 12,
    commentCount: 35,
    shareCount: 5,
    postDescription: '16 Photos That Prove Dubai is the Most Beautiful City to Admire From Above',
    description: 'Sed iaculis elit velit, at faucibus metus imperdiet sed. Sed dictum, nunc et tempor accumsan, libero turpis ullamcorper quam, ut efficitur dolor augue sed sapien.',
  }
]

class NewsFeedExample04 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "News Feed",
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(item, index) {
    return <Item04 item={item} key={item.id}/>;
  }

  renderPage() {
    var that = this;

    return (
      <AnterosContainer style={styles04.main}>
        <AnterosContent>
          {dataExample04.map((item, index) => {
            return (
              this.renderItem(item,index)
            );
          })}
        </AnterosContent>
      </AnterosContainer>
    );
  }
}

class Item04 extends PureComponent {
  render(){
    let {item} = this.props;
    return <AnterosSection style={styles04.rowBg}>
              {item.postImage == "" ? null : (
                 <AnterosImage style={styles04.postDescImage} source={item.postImage} resizeMode= "stretch"/>
              )}       

              <AnterosBlock>
                <AnterosText style={styles04.rowPostDescription}>{item.postDescription}</AnterosText>                  
              </AnterosBlock>

              <AnterosSection>
                <AnterosBlock style={styles04.postDateView}>
                  <AnterosText style={[styles04.postAuthorDate, {color: "#adadad"}]}>by</AnterosText>
                  <AnterosText style={[styles04.postAuthorDate, {color: "#0691ce", marginLeft: (Metrics.WIDTH) * 0.010}]}>{item.name}</AnterosText>
                  <AnterosText style={[styles04.postAuthorDate, {color: "#6f6f6f", marginLeft: (Metrics.WIDTH) * 0.025, marginTop: -(Metrics.HEIGHT) * 0.007}]}>.</AnterosText>
                  <AnterosText style={[styles04.postAuthorDate, {color: "#adadad", marginLeft: (Metrics.WIDTH) * 0.025}]}>{item.date}</AnterosText>
              </AnterosBlock>
             </AnterosSection>
             <AnterosSection>
              <AnterosBlock style={styles04.rowDescView}>
                <AnterosText style={styles04.rowDescTxt}>{item.description}</AnterosText>
              </AnterosBlock>
             </AnterosSection>


              <LikeShareButtons item={item}/>
            </AnterosSection>
  }
}


const styles04 = StyleSheet.create({


  textTitle: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(16),
    marginTop: (Metrics.HEIGHT * 0.001),
    alignSelf: 'center',
    fontFamily: Fonts.type.sfuiDisplayRegular,
  },

  main: {
    height: Metrics.HEIGHT,
    backgroundColor: "#F2F2F2",
    flexDirection: 'column'
  },

  lastRowBg: {
    width: (Metrics.WIDTH),
    backgroundColor: Colors.snow,
    justifyContent: 'center'
  },

  rowBg: {
    backgroundColor: Colors.snow,
    justifyContent: 'center',
    marginBottom: (Metrics.HEIGHT) * 0.018,
  },

  profileImg: {
    width: (Metrics.WIDTH) * 0.12,
    height: (Metrics.WIDTH) * 0.12,
    borderRadius: (Metrics.WIDTH) * 0.06,
    alignSelf: 'flex-start',
  },

  rowPostDescription: {
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    fontSize: Fonts.moderateScale(17),
    marginLeft: (Metrics.HEIGHT) * 0.015,
    marginRight: (Metrics.HEIGHT) * 0.015,
    marginTop: (Metrics.HEIGHT) * 0.015,
    textAlign: 'left'
  },

  rowNameTxt: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(17),
    fontFamily: Fonts.type.sfuiDisplayMedium,
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
    height: (Metrics.HEIGHT) * 0.001,
    backgroundColor: "#F2F2F2",
    alignSelf: 'center',
    marginTop: (Metrics.HEIGHT) * 0.022
  },

  likeCommentShareText: {
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(15),
    marginLeft: (Metrics.WIDTH) * 0.015,
    color: "#6f6f6f"
  },

  likeCommentShareImage: {
    width: (Metrics.WIDTH) * 0.06,
    height: (Metrics.HEIGHT) * 0.03,
    
  },

  dividerVertical: {
    width: (Metrics.WIDTH) * 0.003,
    height: (Metrics.HEIGHT) * 0.04,
    backgroundColor: "#F2F2F2",
    alignSelf: 'flex-end',
  },

  rowMainView:{
    
  },

  postDescImage:{
    height: (Metrics.HEIGHT) * 0.35,
    marginLeft: (Metrics.HEIGHT) * 0.015,
    marginRight: (Metrics.HEIGHT) * 0.015,
    alignSelf: 'center',
    width: (Metrics.WIDTH)    
  },

  postDateView:{    
    alignSelf: 'center',
    flexDirection: 'row',
    marginLeft: (Metrics.HEIGHT) * 0.015,
    marginRight: (Metrics.HEIGHT) * 0.015,
    alignItems:'center'
  },

  postAuthorDate:{
    fontSize: Fonts.moderateScale(12),
    fontFamily: Fonts.type.sfuiDisplayRegular
  },

  rowDescView:{    
    alignSelf: 'center',
    margin: (Metrics.HEIGHT) * 0.015,
  },

  likeCommentShareView:{
    flexDirection: 'row',    
    alignSelf: 'center',
    marginTop: (Metrics.HEIGHT) * 0.015,
    marginBottom: (Metrics.HEIGHT) * 0.015,
  },

  likeView:{
    flexDirection: 'row',
    width: (Metrics.WIDTH) * 0.26,
    alignItems: 'center'
  },

  commentView:{
    flexDirection: 'row',
    width: (Metrics.WIDTH) * 0.37,
    alignItems: 'center',
    marginLeft: (Metrics.WIDTH) * 0.045
  },

  shareView:{
    flexDirection: 'row',
    width: (Metrics.WIDTH) * 0.32,
    alignItems: 'center',
    marginLeft: (Metrics.WIDTH) * 0.045
  },

});




const images05 = [{uri: "https://antiqueruby.aliansoftware.net//Images/social/ic_hotels_one_sfive.png"},
      {uri: "https://antiqueruby.aliansoftware.net//Images/social/ic_hotels_two_sfive.png"},
      {uri: "https://antiqueruby.aliansoftware.net//Images/social/ic_hotels_three_sfive.png"},
      {uri: "https://antiqueruby.aliansoftware.net//Images/social/ic_hotels_four_sfive.png"},
      {uri: "https://antiqueruby.aliansoftware.net//Images/social/ic_hotels_one_sfive.png"}];

const dataExample05 = [
  {
    id: 1,
    name: 'citizenM NY Times Square',
    comment: 'Lorem ipsum dolor sit amet, conses adipisi, sed do eiusmod tempor ince idunt ut labore et dolore.',
    likes: 12,
    comments: 35,
    image: images05[0],
  },
  {
    id: 2,
    name: 'The Roosevelt Hotel',
    comment: 'Lorem ipsum dolor sit amet, conses adipisi, sed do eiusmod tempor ince idunt ut labore et dolore.',
    likes: 12,
    comments: 35,
    image: images05[1],
  },
  {
    id: 3,
    name: 'EVEN Hotel Times Square',
    comment: 'Lorem ipsum dolor sit amet, conses adipisi, sed do eiusmod tempor ince idunt ut labore et dolore.',
    likes: 12,
    comments: 35,
    image: images05[2],
  },
  {
    id: 4,
    name: 'Wellington Hotel',
    comment: 'Lorem ipsum dolor sit amet, conses adipisi, sed do eiusmod tempor ince idunt ut labore et dolore.',
    likes: 12,
    comments: 35,
    image: images05[3],
  },
  {
    id: 5,
    name: 'Waldorf Astoria New York',
    comment: 'Lorem ipsum dolor sit amet, conses adipisi, sed do eiusmod tempor ince idunt ut labore et dolore.',
    likes: 12,
    comments: 35,
    image: images05[4],
  },
]

class NewsFeedExample05 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "News Feed",
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.rowHasChanged = (r1, r2) => r1 !== r2
    this.ds = new ListView.DataSource({rowHasChanged:this.rowHasChanged})
    this.state = {
      isLoading: true,
      dataSource: this.ds.cloneWithRows(dataExample05)
    };
    this.renderItem = this.renderItem.bind(this);    
    this.onResize = this.onResize.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  renderItem(item, index) {
    return <Item05 item={item} key={item.id}/>;
  }
  renderSeparator(){
    return null;
  }

  updateData() {
    var source = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.setState({
        ...this.state,
        dataSource: source.cloneWithRows(dataExample05)
    });
}


  onResize(width, height){
    console.log('onResize '+width+','+height);
    this.updateData();
    this.forceUpdate();
  }

  renderPage() {
    var that = this;

    return (
      <AnterosContainer style={styles05.main}>
        <AnterosContent onResize={this.onResize}>
            <AnterosScrollableTabView
              initialPage={0}
              tabBarUnderlineStyle={styles05.tabUnderLine}
              tabBarBackgroundColor={'#383d5a'}
              tabBarActiveTextColor={'white'}
              tabBarInactiveTextColor={'rgba(255,255,255,0.4)'}
              tabBarTextStyle={styles05.tabText}
              renderTabBar={() => <AnterosScrollableTabBar />} >
                <AnterosScrollableTab tabLabel='Hotels'>
                  <ListView
                    contentContainerStyle={styles05.listContent}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderItem}
                    renderSeparator={this.renderSeparator}
                    enableEmptySections
                    pageSize={4}/>
                </AnterosScrollableTab>

                <AnterosScrollableTab tabLabel='Cars'>
                  <ListView
                    contentContainerStyle={styles.listContent}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderItem}
                    renderSeparator={this.renderSeparator}
                    enableEmptySections
                    pageSize={4}/>
                </AnterosScrollableTab>

                <AnterosScrollableTab tabLabel='Flights'>
                  <ListView
                    contentContainerStyle={styles05.listContent}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderItem}
                    renderSeparator={this.renderSeparator}
                    enableEmptySections
                    pageSize={4}/>
                </AnterosScrollableTab>

                <AnterosScrollableTab tabLabel='Restaurant'>
                  <ListView
                    contentContainerStyle={styles05.listContent}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderItem}
                    renderSeparator={this.renderSeparator}
                    enableEmptySections
                    pageSize={4}/>
                </AnterosScrollableTab>

                <AnterosScrollableTab tabLabel='Train'>
                  <ListView
                    contentContainerStyle={styles05.listContent}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderItem}
                    renderSeparator={this.renderSeparator}
                    enableEmptySections
                    pageSize={4}/>
                </AnterosScrollableTab>  
            </AnterosScrollableTabView>
        </AnterosContent>
      </AnterosContainer>
    );
  }
}

class Item05 extends PureComponent {
  render(){
    let {item} = this.props;
    console.log(Dimensions.get('window').width);
    return <AnterosSection style={styles05.rowMain}>
              <AnterosBlock smSize="1/3" mdSize="1/5">
                {item.image == "" ? null : (
                  <AnterosImage style={styles05.images} source={item.image} resizeMode='cover'/>
                )}       
              </AnterosBlock>
              <AnterosBlock size="stretch" style={styles05.newsContent}>
                <AnterosText numberOfLines={1} style={styles05.name}>{item.name}</AnterosText>
                <AnterosText numberOfLines={3} style={styles05.comment}>{item.comment}</AnterosText>
                <View style={styles05.followContent}>
                  <View style={styles05.likeContent}>
                    <AnterosIcon
                      type="font-awesome"
                      name="heart"
                      size={18}
                      color="#d4d4d4"
                      onPress={() => alert("Like")}
                      text={item.likes}
                      textStyle={styles05.textStyle}
                    />                
                  </View>
                  <View style={styles05.likeContent}>
                    <AnterosIcon
                        type="font-awesome"
                        name="comments"
                        size={18}
                        color="#d4d4d4"
                        onPress={() => alert("Like")}
                        text={item.comments}
                        textStyle={styles05.textStyle}
                      />  
                  </View>
                </View>
              </AnterosBlock>
            </AnterosSection>
  }
}

const styles05 = StyleSheet.create({

  container: {
      flex: 1,
    },

  main: {
    height: Metrics.HEIGHT,
    backgroundColor: "#F2F2F2",
    flexDirection: 'column'
  },


  headerTitle: {
    color: Colors.snow,
    fontFamily: Fonts.type.sfuiDisplayBold,
    paddingTop: (Platform.OS === 'ios')? 15 : 0,
    fontSize : Fonts.moderateScale(17),
    letterSpacing:0.7
  },

  rowMain:{
    margin:(Metrics.WIDTH * 0.035),
    flexDirection: 'row'
  },

  images: {
    height: (Metrics.HEIGHT*0.15),
    width: (Metrics.WIDTH*0.30),    
    marginTop: (Metrics.HEIGHT) * 0.007
  },

  newsContent: {
    marginLeft: (Metrics.WIDTH*0.05),
  },

  name: {
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    fontSize: Fonts.moderateScale(17),
    color:'#363636',
    textAlign: 'left'
  },

  comment: {
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(13),
    color: '#6f6f6f',
    marginTop: (Metrics.HEIGHT*0.005),
    textAlign: 'left'
  },

  followContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: (Metrics.HEIGHT*0.015)
  },

  likeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: (Metrics.WIDTH*0.1)
  },

  iconSize: {
    height: (Metrics.HEIGHT*0.02),
    width: (Metrics.HEIGHT*0.02),
    marginRight: (Metrics.WIDTH*0.02)
  },

  textStyle: {
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(13),
    color: '#6f6f6f',
    marginLeft: (Metrics.WIDTH) * 0.020,
    textAlign: 'center'
  },

  separatorStyle: {
    height: (Metrics.HEIGHT * 0.001),
    backgroundColor: '#d7d7d7',
    marginLeft:(Metrics.WIDTH * 0.035),
  },

  headerView:{
    backgroundColor: '#2d324f',
    width: Metrics.WIDTH,
    alignItems:'center'
  },

  menuView:{
    width: (Metrics.WIDTH * 0.30)
  },

  menuIcon:{
    color: Colors.snow
  },

  searchView:{
    width: (Metrics.WIDTH * 0.30),
    alignItems: 'flex-end'
  },

  searchIcon:{
    color: Colors.snow,
    fontSize: Fonts.moderateScale(24)
  },

  tabUnderLine:{
    backgroundColor: Colors.snow
  },
  tabUnderLineTrans:{
    backgroundColor: 'transparent'
  },
  tabText:{
    fontSize: Fonts.moderateScale(14),
  },

  likeCommentShareImage: {
    width: (Metrics.WIDTH) * 0.05,
    height: (Metrics.HEIGHT) * 0.02,
  },

  searchicon:{
    marginRight: 10,
    color: '#fff',
    fontSize:24
  },

});



class LikeShareButtons extends PureComponent{
  render(){
    let {likeCount,commentCount,shareCount} = this.props.item;
    return (<AnterosSection style={styles01.likeCommentShareView}>
      <AnterosBlock size="26%" style={styles01.likeView}>
        <AnterosIcon
          type="font-awesome"
          name="heart"
          size={18}
          color="#d4d4d4"
          onPress={() => alert("Like")}
          text={likeCount?likeCount+" Like":"Like"}
          textStyle={styles01.likeCommentShareText}
        />
      </AnterosBlock>
      <AnterosBlock size="8%">
          <View style={styles01.dividerVertical}/>
      </AnterosBlock>
      <AnterosBlock size="29%" style={styles01.commentView}>
        <AnterosIcon
          type="font-awesome"
          name="comments"
          size={18}
          color="#d4d4d4"
          onPress={() => alert("Comment")}
          text="Comment"
          text={commentCount?commentCount+" Comment":"Comment"}
          textStyle={styles01.likeCommentShareText}
        />
      </AnterosBlock>
      <AnterosBlock size="8%">
          <View style={styles01.dividerVertical}/>
      </AnterosBlock>
      <AnterosBlock size="26%" style={styles01.shareView}>
        <AnterosIcon
          type="material"
          name="share"
          size={18}
          color="#d4d4d4"
          onPress={() => alert("Share")}
          text="Share"
          text={shareCount?shareCount+" Share":"Share"}
          textStyle={styles01.likeCommentShareText}
        />
      </AnterosBlock>
    </AnterosSection>);
  }
}


const images06 = [{uri:"https://antiqueruby.aliansoftware.net//Images/social/ic_chat_propic04_21_29.png"},
                  {uri:"https://antiqueruby.aliansoftware.net//Images/social/card_profile_one_socialsix.png"},
                  {uri:"https://antiqueruby.aliansoftware.net//Images/social/ic_propic02_s21_29.png"},
                  {uri:"https://antiqueruby.aliansoftware.net//Images/social/story_image_one_socialsix.png"},
                  {uri:"https://antiqueruby.aliansoftware.net//Images/social/story_image_two_socialsix.png"}];

var dataExample06 = [
  {
    id: 1,
    name: 'Calandra Herwig',
    postImage: images06[3],
    profileImage: images06[1],
    time: '15 mins',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    name: 'Ariane Sutherlin',
    postImage: images06[4],
    profileImage: images06[2],
    time: '30 mins',
    description: 'Sed iaculis elit velit, at faucibus metus imperdiet sed. Sed dictum, nunc et tempor accumsan, libero turpis ullamcorper quam, ut efficitur dolor augue sed sapien.',
  },
  {
    id: 3,
    name: 'Calandra Herwig',
    postImage: images06[3],
    profileImage: images06[1],
    time: '45 mins',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
]


class NewsFeedExample06 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "News Feed",
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.rowHasChanged = (r1, r2) => r1 !== r2
    this.ds = new ListView.DataSource({rowHasChanged:this.rowHasChanged})
    this.state = {
      isLoading: true,
      dataSource: this.ds.cloneWithRows(dataExample05)
    };
    this.renderItem = this.renderItem.bind(this);    
    this.onResize = this.onResize.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  renderItem(item, index) {
    return <Item06 item={item} key={item.id}/>;
  }
  renderSeparator(){
    return null;
  }

  updateData() {
    var source = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.setState({
        ...this.state,
        dataSource: source.cloneWithRows(dataExample05)
    });
}


  onResize(width, height){
    console.log('onResize '+width+','+height);
    this.updateData();
    this.forceUpdate();
  }

  renderNavigationBody(){
    return ( <AnterosInputSearchText backgroundColor={AnterosTheme.navTintColor} placeholder = "I'm looking for..."/>);
  }

  renderNavigationRightView(){
    return (<AnterosImage resizeMode='contain' style={styles06.userGroupIcon} source={Images.userGroup}></AnterosImage>);
  }
  renderPage() {
    var that = this;

    return (
      <AnterosContainer style={styles06.main}>
        <AnterosContent onResize={this.onResize}>
            <AnterosSection style={styles06.profilePicView}>
                <AnterosBlock smSize="1/5" mdSize="1/8" lgSize="1/10">
                  <AnterosImage style={styles06.profileImg} source={images06[0]}/>
                </AnterosBlock>

                <AnterosBlock size="stretch">
                  <AnterosText style={styles06.headerText}>{'Whats on your mind?'}</AnterosText>
                </AnterosBlock>

                <AnterosBlock size="1/10">
                  <AnterosIcon style={styles06.cameraView}
                    type="foundation"
                    name="camera"
                    size={35}
                    color="#d4d4d4"
                    onPress={() => alert("Camera")}
                  />
                </AnterosBlock>
            </AnterosSection>
        </AnterosContent>
        <AnterosContent>
          {dataExample06.map((item, index) => {
            return (
              this.renderItem(item,index)
            );
          })}
        </AnterosContent>
      </AnterosContainer>
    );
  }
}

class Item06 extends PureComponent {
  render(){
    let {item} = this.props;
    return <AnterosSection style={styles01.rowBg}>
              <AnterosSection style={styles01.rowHeaderView}>
                <AnterosBlock size="1/5">
                  <AnterosImage style={styles01.profileImg} source={item.profileImage} />
                </AnterosBlock>

                <AnterosBlock size="stretch">
                  <AnterosText style={styles01.rowNameTxt}>{item.name}</AnterosText>
                  <AnterosText style={styles01.rowTimeTxt}>{item.time}</AnterosText>
                </AnterosBlock>

                <AnterosBlock size="1/10">
                  <AnterosIcon
                    type="ionicon"
                    name="ios-more"
                    size={25}
                    color="#d4d4d4"
                    onPress={() => alert("More")}
                  />
                </AnterosBlock>
              </AnterosSection>

              <AnterosSection>
                <View style={styles01.dividerHorizontal} />
              </AnterosSection>

              <AnterosSection style={styles01.rowDescriptionView}>
                <AnterosBlock>
                  <AnterosText style={styles01.rowDescTxt}>{item.description}</AnterosText>
                  {item.postImage == "" ? null : (
                    <AnterosImage style={styles01.postDescImage} source={item.postImage} resizeMode= "stretch"/>
                  )}
                </AnterosBlock>
              </AnterosSection>

              <AnterosSection>
                <View style={styles01.dividerHorizontal} />
              </AnterosSection>

              <LikeShareButtons item={item}/>
            </AnterosSection>
  }
}

const styles06 = StyleSheet.create({

  header: {
    backgroundColor: '#2d324f',
    height: (Metrics.HEIGHT * 0.1),
    borderBottomWidth: 0,
    paddingTop: (Metrics.HEIGHT * 0.03),
    elevation: 0,
    paddingLeft: (Metrics.WIDTH * 0.05),
    paddingRight: (Metrics.WIDTH * 0.05),
  },

  left: {
    flex: 0.5,
    backgroundColor: Colors.transparent,
    marginTop: (Metrics.HEIGHT) * 0.007
  },

  body: {
    flex: 3.7,
    flexDirection:'row',
    backgroundColor: Colors.snow,
    borderRadius:5,
    height: (Metrics.HEIGHT * 0.055),
    marginTop: (Metrics.HEIGHT * 0.012)
  },

  textTitle: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(16),
    marginTop: (Metrics.HEIGHT * 0.001),
    alignSelf: 'center',
    fontFamily: Fonts.type.sfuiDisplayRegular,

  },

  right: {
    flex: 0.5,
    marginLeft: (Metrics.WIDTH) * 0.06,
    backgroundColor: 'transparent'
  },

  main: {
    backgroundColor: "#F2F2F2",
    flexDirection: 'column'
  },

  userGroupIcon: {
    width: (Metrics.WIDTH) * 0.09,
    height: (Metrics.WIDTH) * 0.09,
    alignSelf: 'flex-end',
    color: AnterosTheme.navTintColor,
    marginTop: (Metrics.HEIGHT) * 0.007
  },

  rowBg: {
    alignSelf: 'center' ,
    backgroundColor: Colors.snow,
    marginBottom: (Metrics.HEIGHT) * 0.015,
    justifyContent: 'center',
    shadowOffset:{width: 3,  height: 3},
    shadowColor: '#DFDFDF',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5
  },

  profileImg: {
    width: (Metrics.WIDTH) * 0.12,
    height: (Metrics.WIDTH) * 0.12,
    borderRadius: (Metrics.WIDTH) * 0.06,
    alignSelf: 'flex-start',
  },

  moreIcon: {
    marginTop: -(Metrics.HEIGHT) * 0.015
  },

  rowNameTxt: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(17),
    fontFamily: Fonts.type.sfuiDisplayMedium,
  },

  rowTimeTxt: {
    color: "#b7b7b7",
    fontSize: Fonts.moderateScale(14),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    textAlign: 'left'
  },

  rowDescTxt: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(15),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    marginTop: (Metrics.HEIGHT) * 0.015,
    textAlign: 'left'
  },

  dividerHorizontal: {
    height: 1,
    backgroundColor: "#F2F2F2",
    alignSelf: 'center',
    marginTop: (Metrics.HEIGHT) * 0.022
  },

  likeCommentShareText: {
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(15),
    marginLeft: (Metrics.WIDTH) * 0.025,
    color: "#6f6f6f"
  },

  likeCommentShareImage: {
    width: (Metrics.WIDTH) * 0.06,
    height: (Metrics.HEIGHT) * 0.03,
    resizeMode: 'contain'
  },

  dividerVertical: {
    width: (Metrics.WIDTH) * 0.003,
    height: (Metrics.HEIGHT) * 0.04,
    backgroundColor: "#F2F2F2",
    alignSelf: 'flex-end'
  },

  searchText:{
    flex:2,
    height:(Metrics.HEIGHT) * 0.066,
    marginLeft: (Metrics.WIDTH) * 0.02,
    fontSize: Fonts.moderateScale(15),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    color: "#c3c3c3",
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'transparent',
  },

  profilePicView:{
    backgroundColor: Colors.snow,
    flexDirection: 'row',
    padding: (Metrics.WIDTH) * 0.03,
    marginBottom: (Metrics.HEIGHT) * 0.015,
    alignItems: 'center',
    shadowOffset:{width: 2,  height: 2},
    shadowColor: '#DFDFDF',
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2
  },

  headerText:{
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(18),
    color: "#bfbfbf",
    marginLeft: (Metrics.HEIGHT) * 0.015
  },

  searchHeaderView:{
    borderRadius: 5,
    backgroundColor: Colors.snow,
    flexDirection: 'row',
    backgroundColor: 'green'
  },

  rowHeaderView:{
    flexDirection: 'row',
    marginTop: (Metrics.HEIGHT) * 0.015,
    width: (Metrics.WIDTH) * 0.84,
    alignSelf: 'center',
  },

  rowHeaderNameView:{
    flexDirection: 'column',
    marginLeft: (Metrics.WIDTH) * 0.03
  },

  rowDescriptionView:{
    width: (Metrics.WIDTH) * 0.84,
    alignSelf: 'center'
  },

  postDescImg:{
    width: (Metrics.WIDTH) * 0.84,
    height: (Metrics.HEIGHT) * 0.20,
    alignSelf: 'center',
    marginTop: (Metrics.HEIGHT) * 0.015,
    resizeMode: 'cover'
  },

  likeCommentShareView:{
    flexDirection: 'row',
    marginTop: (Metrics.HEIGHT) * 0.015,
    marginBottom: (Metrics.HEIGHT) * 0.015,
    marginLeft: (Metrics.WIDTH) * 0.045
  },

  likeView:{
    flexDirection: 'row',
    width: (Metrics.WIDTH) * 0.21,
    alignItems: 'center'
  },

  commentView:{
    flexDirection: 'row',
    width: (Metrics.WIDTH) * 0.33,
    alignItems: 'center',
    marginLeft: (Metrics.WIDTH) * 0.06
  },

  shareView:{
    flexDirection: 'row',
    width: (Metrics.WIDTH) * 0.21,
    alignItems: 'center',
    marginLeft: (Metrics.WIDTH) * 0.06
  },

  searchView:{
    justifyContent:'center',
    alignItems:'center',
    marginLeft: (Metrics.WIDTH) * 0.03,
    backgroundColor: 'transparent',
    height:30
  },

  cameraView:{
    marginRight: (Metrics.HEIGHT) * 0.007
  },

  mainListView:{
    width: (Metrics.WIDTH)
  }

});