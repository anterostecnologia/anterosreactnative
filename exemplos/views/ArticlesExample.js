import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  Alert,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  View
} from 'react-native';

import moment from 'moment';
import {AnterosCard, AnterosCardSection, AnterosSocialBar, AnterosCardList} from 'anteros-react-native';
import {AnterosNavigationPage, AnterosListRow} from 'anteros-react-native';
import {AnterosLabel, AnterosView} from 'anteros-react-native';
import {AnterosText, AnterosTextArea, AnterosImage, AnterosAvatar} from 'anteros-react-native';
import {data} from './data';

export default class ArticlesExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Articles',
    showBackButton: true
  };
  constructor(props){
    super(props);
    data.populateData();
  }

  renderRow = (highlighted) => {
    if (Platform.OS !== 'android') {
      return <View
        style={[
        {
          backgroundColor: '#f0f0f0',
          height: 1
        },
        highlighted && {
          marginLeft: 0
        }
      ]}/>;
    }

    return null;
  };

  renderPage() {
    return (
      <ScrollView style={{
        flex: 1
      }}>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Articles 1'
          onPress={() => this.navigator.push({view: <Articles10/>})}
          topSeparator='full'/>
        <AnterosListRow
          title='Articles 2'
          onPress={() => this.navigator.push({view: <Articles11/>})}
          topSeparator='full'/>
        <AnterosListRow
          title='Articles 3'
          onPress={() => this.navigator.push({view: <Articles12/>})}
          topSeparator='full'/>
        <AnterosListRow
          title='Articles 4'
          onPress={() => this.navigator.push({view: <Articles13/>})}
          topSeparator='full'/>
        <AnterosListRow
          title='Blogposts'
          onPress={() => this.navigator.push({view: <Articles14/>})}
          topSeparator='full'/>
      </ScrollView>
    );
  }
}

const stylesList = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  row: {
    paddingHorizontal: 10,
    paddingVertical: 20
  }
});



/****
 *   Exemplo articles 1
 */
class Articles10 extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Articles list 1',
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.onPressHeart = this
      .onPressHeart
      .bind(this);
    this.onPressComment = this
      .onPressComment
      .bind(this);
    this.onPressUser = this
      .onPressUser
      .bind(this);
    this.renderItem = this
      .renderItem
      .bind(this);
    this.extractId = this
      .extractId
      .bind(this);

    this.state = {
      data: data.getArticles()
    };
  }

  onPressHeart() {
    Alert.alert('Info', 'Press comment', [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed')
      }
    ], {cancelable: false})
  }

  onPressComment() {
    Alert.alert('Info', 'Press comment', [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed')
      }
    ], {cancelable: false})
  }

  onPressUser() {
    Alert.alert('Info', 'Press comment', [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed')
      }
    ], {cancelable: false})
  }

  renderItem(post) {
    const item = post.item;
    return (
      <AnterosCard height={225} imageOverlay={item.photo} style={stylesArticle10.card} showBorder={false} showShadow={false}>
        <AnterosCardSection style={stylesArticle10.cardSection} overlay height={225}>
            <AnterosLabel style={stylesArticle10.title}>{item.header}</AnterosLabel>
            <AnterosLabel style={stylesArticle10.time}>{moment()
                .add(item.time, 'seconds')
                .fromNow()}
            </AnterosLabel>
            <AnterosSocialBar>
              <AnterosSocialBar.SocialButton
                fontType='font-awesome'
                iconName='heart'
                color='white'
                iconSize={16}
                onPress={this.onPressHeart}
                caption='78'/>
              <AnterosSocialBar.SocialButton
                fontType='font-awesome'
                iconName='comment-o'
                color='white'
                iconSize={16}
                onPress={this.onPressComment}
                caption='25'/>
              <AnterosSocialBar.SocialButton
                fontType='font-awesome'
                iconName='user-o'
                color='white'
                iconSize={16}
                onPress={this.onPressUser}
                caption='13'/>
            </AnterosSocialBar>            
        </AnterosCardSection>
      </AnterosCard>
    );
  }

  extractId(post) {
    return post.id;
  }

  renderPage() {
    return (
      <AnterosView style={stylesArticle10.container} animation="bounceInUp" duration={1100} delay={500}>
        <AnterosCardList
          dataSource={this.state.data}
          keyExtractor={this.extractId}
          renderCard={this.renderItem}/>
      </AnterosView>
    );
  }
}

const stylesArticle10 = {
  card:{
    margin:0
  },
  cardSection: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: 22,
    color: "white",
    marginTop: 10
  },
  time: {
    fontSize: 16,
    color: "#ffffff",
    marginTop: 0
  }
}


/**
 *  Exemplo articles 2
 */
class Articles11 extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Articles list 2',
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.onPressHeart = this
      .onPressHeart
      .bind(this);
    this.onPressComment = this
      .onPressComment
      .bind(this);
    this.onPressUser = this
      .onPressUser
      .bind(this);
    this.renderItem = this
      .renderItem
      .bind(this);
    this.extractId = this
      .extractId
      .bind(this);

    this.state = {
      data: data.getArticles()
    };
  }

  onPressHeart() {
    Alert.alert('Info', 'Press comment', [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed')
      }
    ], {cancelable: false})
  }

  onPressComment() {
    Alert.alert('Info', 'Press comment', [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed')
      }
    ], {cancelable: false})
  }

  onPressUser() {
    Alert.alert('Info', 'Press comment', [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed')
      }
    ], {cancelable: false})
  }

  renderItem(post) {
    const item = post.item;
    return (
      <AnterosCard height={225} imageOverlay={item.photo} style={stylesArticle11.card} showBorder={true} showShadow={false}>

        <AnterosCardSection style={stylesArticle11.cardSection} overlay height={80}>
            <AnterosLabel style={stylesArticle11.title}>{item.header}</AnterosLabel>
            <AnterosLabel style={stylesArticle11.time}>{moment()
                .add(item.time, 'seconds')
                .fromNow()}
            </AnterosLabel>
        </AnterosCardSection>

        <AnterosCardSection style={stylesArticle11.cardFooter} height={30}>
            <AnterosSocialBar>
              <AnterosSocialBar.SocialButton style={{justifyContent:'center'}}
                fontType='font-awesome'
                iconName='heart'
                color='#EF5350'
                iconSize={16}
                onPress={this.onPressHeart}
                caption='78'/>
              <AnterosSocialBar.SocialButton style={{justifyContent:'center'}}
                fontType='font-awesome'
                iconName='comment-o'
                color='#757575'
                iconSize={16}
                onPress={this.onPressComment}
                caption='25'/>
              <AnterosSocialBar.SocialButton style={{justifyContent:'center'}}
                fontType='font-awesome'
                iconName='user-o'
                color='#757575'
                iconSize={16}
                onPress={this.onPressUser}
                caption='13'/>
            </AnterosSocialBar>    
        </AnterosCardSection>
      </AnterosCard>
    );
  }

  extractId(post) {
    return post.id;
  }

  renderPage() {
    return (
      <AnterosView style={stylesArticle11.container} animation="bounceInUp" animation="bounceInLeft" duration={1100} delay={500}>
        <AnterosCardList
          dataSource={this.state.data}
          keyExtractor={this.extractId}
          renderCard={this.renderItem}/>
      </AnterosView>
    );
  }
}

const stylesArticle11 = {
  card:{
    margin:10
  },
  cardSection: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor:'#00000057',
    justifyContent:'flex-end'
  },
  cardFooter: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    color: "white",
    marginTop: 10
  },
  time: {
    fontSize: 16,
    color: "#ffffff",
    marginTop: 0
  }
}


/**
 *  Exemplo articles 3
 */
class Articles12 extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Articles list 3',
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.onPressHeart = this
      .onPressHeart
      .bind(this);
    this.onPressComment = this
      .onPressComment
      .bind(this);
    this.onPressUser = this
      .onPressUser
      .bind(this);
    this.renderItem = this
      .renderItem
      .bind(this);
    this.extractId = this
      .extractId
      .bind(this);

    this.state = {
      data: data.getArticles()
    };
  }

  onPressHeart() {
    Alert.alert('Info', 'Press comment', [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed')
      }
    ], {cancelable: false})
  }

  onPressComment() {
    Alert.alert('Info', 'Press comment', [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed')
      }
    ], {cancelable: false})
  }

  onPressUser() {
    Alert.alert('Info', 'Press comment', [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed')
      }
    ], {cancelable: false})
  }

  renderItem(post) {
    const item = post.item;
    return (
      <AnterosCard height={280} style={stylesArticle12.card} showBorder={true} showShadow={false}>

        <AnterosCardSection style={stylesArticle12.cardSection} height={60}>
            <AnterosLabel style={stylesArticle12.title}>{item.header}</AnterosLabel>
            <AnterosLabel style={stylesArticle12.time}>{moment()
                .add(item.time, 'seconds')
                .fromNow()}
            </AnterosLabel>
        </AnterosCardSection>

        <AnterosCardSection style={{flex:1}}>
          <AnterosImage
              style={{
              flex: 1,
              width: null,
              height: null
            }}
              resizeMode='stretch'
              source={item.photo}/>
        </AnterosCardSection>

        <AnterosCardSection style={stylesArticle12.cardFooter} height={30}>
            <AnterosSocialBar>
              <AnterosSocialBar.SocialButton style={{justifyContent:'center'}}
                fontType='font-awesome'
                iconName='heart'
                color='#EF5350'
                iconSize={16}
                onPress={this.onPressHeart}
                caption='78'/>
              <AnterosSocialBar.SocialButton style={{justifyContent:'center'}}
                fontType='font-awesome'
                iconName='comment-o'
                color='#757575'
                iconSize={16}
                onPress={this.onPressComment}
                caption='25'/>
              <AnterosSocialBar.SocialButton style={{justifyContent:'center'}}
                fontType='font-awesome'
                iconName='user-o'
                color='#757575'
                iconSize={16}
                onPress={this.onPressUser}
                caption='13'/>
            </AnterosSocialBar>    
        </AnterosCardSection>

      </AnterosCard>
    );
  }

  extractId(post) {
    return post.id;
  }

  renderPage() {
    return (
      <AnterosView style={stylesArticle12.container} animation="zoomInDown" duration={1100} delay={500}>
        <AnterosCardList
          dataSource={this.state.data}
          keyExtractor={this.extractId}
          renderCard={this.renderItem}/>
      </AnterosView>
    );
  }
}

const stylesArticle12 = {
  card:{
    margin:10
  },
  cardSection: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
    justifyContent: 'flex-end',
  },
  cardFooter: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    color: "#424242",
    marginTop: 10
  },
  time: {
    fontSize: 14,
    color: "#757575",
    marginTop: 0,
  }
}


/**
 *  Exemplo articles 4
 */
class Articles13 extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Articles list 4',
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.onPressHeart = this
      .onPressHeart
      .bind(this);
    this.onPressComment = this
      .onPressComment
      .bind(this);
    this.onPressUser = this
      .onPressUser
      .bind(this);
    this.renderItem = this
      .renderItem
      .bind(this);
    this.extractId = this
      .extractId
      .bind(this);

    this.state = {
      data: data.getArticles('fact')
    };
  }

  onPressHeart() {
    Alert.alert('Info', 'Press comment', [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed')
      }
    ], {cancelable: false})
  }

  onPressComment() {
    Alert.alert('Info', 'Press comment', [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed')
      }
    ], {cancelable: false})
  }

  onPressUser() {
    Alert.alert('Info', 'Press comment', [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed')
      }
    ], {cancelable: false})
  }

  renderItem(post) {
    const item = post.item;
    return (
      <AnterosCard height={80} style={stylesArticle13.card} showBorder={true} showShadow={false}>

        <AnterosCardSection style={stylesArticle13.cardImage}>
          <AnterosImage
              style={{
              flex: 1,
              flexDirection:'column',
              height: null,
              width: 80
            }}
              resizeMode='stretch'
              source={item.photo}/>
        </AnterosCardSection>

        <AnterosCardSection style={stylesArticle13.cardText}>   
            <AnterosLabel style={stylesArticle13.title}>{item.header}</AnterosLabel>
            <AnterosTextArea style={stylesArticle13.text} editable={false}>{item.text}</AnterosTextArea>     
        </AnterosCardSection>

      </AnterosCard>
    );
  }

  extractId(post) {
    return post.id;
  }
  
  renderPage() {
    return (
      <AnterosView style={stylesArticle13.container} animation="flipInY" duration={1100} delay={500}>
        <AnterosCardList
          dataSource={this.state.data}
          keyExtractor={this.extractId}
          renderCard={this.renderItem}/>
      </AnterosView>
    );
  }
}

const stylesArticle13 = {
  card:{
    margin:10,
    flexDirection: 'row',
  },
  cardImage: {
    flexDirection:'column'
  },
  cardText: {
    justifyContent: 'flex-start',
    flexDirection:'column',
    flex: 1,
    paddingLeft: 10,
    paddingTop: 5
  },
  title: {
    fontSize: 18,
    color: "#424242",
    marginTop: 5
  },
  text: {
    fontSize: 12,
    color: "#757575",
    marginTop: 0
  }
}


/**
 *  Exemplo blogspot
 */
class Articles14 extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Blogspots',
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.onPressHeart = this
      .onPressHeart
      .bind(this);
    this.onPressComment = this
      .onPressComment
      .bind(this);
    this.onPressUser = this
      .onPressUser
      .bind(this);
    this.renderItem = this
      .renderItem
      .bind(this);
    this.extractId = this
      .extractId
      .bind(this);

    this.state = {
      data: data.getArticles('post')
    };
  }

  onPressHeart() {
    Alert.alert('Info', 'Press comment', [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed')
      }
    ], {cancelable: false})
  }

  onPressComment() {
    Alert.alert('Info', 'Press comment', [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed')
      }
    ], {cancelable: false})
  }

  onPressUser() {
    Alert.alert('Info', 'Press comment', [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed')
      }
    ], {cancelable: false})
  }

  renderItem(post) {
    const item = post.item;
    return (
      <AnterosCard height={300} style={stylesArticle14.card} showBorder={true} showShadow={false}>

        <AnterosCardSection style={{flex:1}}>
          <AnterosImage
              style={{
              flex: 1,
              width: null,
              height: null
            }}
              resizeMode='stretch'
              source={item.photo}/>
        </AnterosCardSection>

        <AnterosCardSection style={stylesArticle14.cardSection} height={60}>
          <AnterosText style={stylesArticle14.text} editable={false} numberOfLines={2}>{item.text}</AnterosText>     
        </AnterosCardSection>     

        <AnterosCardSection style={stylesArticle14.cardFooter} height={40}>
          <View style={{width:null, flex:1, margin:4, flexDirection: 'row', alignItems:'space-between'}}>
              <View style={{flex:1, flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
              <AnterosAvatar 
                  small
                  rounded
                  source={item.user.photo}/>                
              <AnterosLabel style={{paddingLeft:10}} text={item.user.lastName}/>
              </View>
              <View style={{flex:1, flexDirection: 'row', justifyContent:'center', alignItems:'center', height:40}}>
              <AnterosLabel style={stylesArticle14.time}>{moment()
                    .add(item.time, 'seconds')
                    .fromNow()}
              </AnterosLabel>
              </View>
            </View>
        </AnterosCardSection>
        
      </AnterosCard>
    );
  }

  extractId(post) {
    return post.id;
  }

  renderPage() {
    return (
      <AnterosView style={stylesArticle14.container} animation="fadeInDownBig" duration={1100} delay={500}>
        <AnterosCardList
          dataSource={this.state.data}
          keyExtractor={this.extractId}
          renderCard={this.renderItem}/>
      </AnterosView>
    );
  }
}

const stylesArticle14 = {
  card:{
    margin:10
  },
  cardSection: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
    justifyContent: 'flex-end',
  },
  cardFooter: {
    justifyContent: 'center',
    alignItems: 'space-around',
    flexDirection:'row'
  },
  title: {
    fontSize: 22,
    color: "#424242",
    marginTop: 10
  },
  time: {
    fontSize: 14,
    color: "#757575",
    marginTop: 0,
    paddingLeft: 10,
    flex:1,
    alignItems:'center'
  }
}