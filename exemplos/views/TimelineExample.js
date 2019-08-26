import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator, 
  TouchableOpacity, ScrollView, Image, RefreshControl, ActivityIndicator
} from 'react-native';

import {AnterosNavigationPage, AnterosListRow, AnterosTimeline} from 'anteros-react-native';

export default class TimelineExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Timeline',
    showBackButton: true
  };

  renderPage() {
	return <ScrollView style={{
        flex: 1
      }}>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Basic Example'
          onPress={() => this.navigator.push({view: <BasicExample/>})}
          topSeparator='full'/>
        <AnterosListRow
          title='Custom Example'
          onPress={() => this.navigator.push({view: <CustomExample/>})}
          bottomSeparator='full'/>
        <AnterosListRow
          title='Circle Dot Example'
          onPress={() => this.navigator.push({view: <DotExample/>})}
          bottomSeparator='full'/>  
        <AnterosListRow
          title='Icon Example'
          onPress={() => this.navigator.push({view: <IconExample/>})}
          bottomSeparator='full'/>    
        <AnterosListRow
          title='Press Example'
          onPress={() => this.navigator.push({view: <PressExample/>})}
          bottomSeparator='full'/>   
        <AnterosListRow
          title='Override Render Example'
          onPress={() => this.navigator.push({view: <OverrideExample/>})}
          bottomSeparator='full'/>   
        <AnterosListRow
          title='Single Right Example'
          onPress={() => this.navigator.push({view: <SingleRightExample/>})}
          bottomSeparator='full'/>   
        <AnterosListRow
          title='Two Column Example'
          onPress={() => this.navigator.push({view: <TwoColumnExample/>})}
          bottomSeparator='full'/>  
        <AnterosListRow
          title='Refresh Load More'
          onPress={() => this.navigator.push({view: <LoadMoreExample/>})}
          bottomSeparator='full'/>
      </ScrollView>	
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  },
	back: {
		paddingLeft:10,
		fontSize: 20,
		color: 'white',
    textAlign: 'center'
	},
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});



class BasicExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Basic',
      showBackButton: true
    };

    constructor(){
      super()
      this.data = [
        {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
        {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
        {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
        {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
        {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
      ]
    } 
  
    renderPage() {
      //'rgb(45,156,219)'
      return (
        <View style={stylesBasic.container}>
          <AnterosTimeline 
            style={stylesBasic.list}
            data={this.data}
          />
        </View>
      );
    }
  }
  
  const stylesBasic = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
          paddingTop:5,
          backgroundColor:'white'
    },
    list: {
      flex: 1,
      marginTop:20,
    },
  });



class CustomExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Custom',
      showBackButton: true
    };

    constructor(){
      super()
      this.data = [
        {time: '09:00', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ', circleColor: '#009688',lineColor:'#009688'},
        {time: '10:45', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.'},
        {time: '12:00', title: 'Lunch'},
        {time: '14:00', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ',lineColor:'#009688'},
        {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688'}
      ]
    } 
  
    renderPage() {
      //'rgb(45,156,219)'
      return (
        <View style={stylesCustom.container}>
          <AnterosTimeline 
            style={stylesCustom.list}
            data={this.data}
            circleSize={20}
            circleColor='rgb(45,156,219)'
            lineColor='rgb(45,156,219)'
            timeContainerStyle={{minWidth:52, marginTop: -5}}
            timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
            descriptionStyle={{color:'gray'}}
            options={{
              style:{paddingTop:5}
            }}
          />
        </View>
      );
    }
  }
  
  const stylesCustom = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
          paddingTop:5,
      backgroundColor:'white'
    },
    list: {
      flex: 1,
      marginTop:20,
    },
  });


  class DotExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Dot',
      showBackButton: true
    };

    constructor(){
      super()
      this.data = [
        {time: '09:00', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ', circleColor: '#009688',lineColor:'#009688'},
        {time: '10:45', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.'},
        {time: '12:00', title: 'Lunch', icon: require('../images/lunch.png')},
        {time: '14:00', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ',lineColor:'#009688'},
        {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688'}
      ]
    } 
  
    renderPage() {
      return (
        <View style={stylesDot.container}>
          <AnterosTimeline 
            style={stylesDot.list}
            data={this.data}
            circleSize={20}
            circleColor='rgb(45,156,219)'
            lineColor='rgb(45,156,219)'
            timeContainerStyle={{minWidth:52, marginTop: -5}}
            timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
            descriptionStyle={{color:'gray'}}
            options={{
              style:{paddingTop:5}
            }}
            innerCircle={'dot'}
          />
        </View>
      );
    }
  }
  
  const stylesDot = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
          paddingTop:5,
      backgroundColor:'white'
    },
    list: {
      flex: 1,
      marginTop:20,
    },
  });


class IconExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Icon',
      showBackButton: true
    };

    constructor(){
      super()
      this.data = [
        {time: '09:00', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',lineColor:'#009688', icon: require('../images/archery.png')},
        {time: '10:45', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.', icon: require('../images/badminton.png')},
        {time: '12:00', title: 'Lunch', icon: require('../images/lunch.png')},
        {time: '14:00', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ',lineColor:'#009688', icon: require('../images/soccer.png')},
        {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', icon: require('../images/dumbbell.png')}
      ]
    } 
  
    renderPage() {
      return (
        <View style={stylesIcon.container}>
          <AnterosTimeline 
            style={stylesIcon.list}
            data={this.data}
            circleSize={20}
            circleColor='rgba(0,0,0,0)'
            lineColor='rgb(45,156,219)'
            timeContainerStyle={{minWidth:52, marginTop: -5}}
            timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
            descriptionStyle={{color:'gray'}}
            options={{
              style:{paddingTop:5}
            }}
            innerCircle={'icon'}
          />
        </View>
      );
    }
  }
  
  const stylesIcon = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
          paddingTop:5,
      backgroundColor:'white'
    },
    list: {
      flex: 1,
      marginTop:20,
    },
  });



class OverrideExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Override',
      showBackButton: true
    };

    constructor(){
      super()
      this.onEventPress = this.onEventPress.bind(this)
      this.renderSelected = this.renderSelected.bind(this)
      this.renderDetail = this.renderDetail.bind(this)
  
      this.data = [
        {
          time: '09:00', 
          title: 'Archery Training', 
          description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
          lineColor:'#009688', 
          icon: require('../images/archery.png'),
          imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
        },
        {
          time: '10:45', 
          title: 'Play Badminton', 
          description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.', 
          icon: require('../images/badminton.png'),
          imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg'
        },
        {
          time: '12:00', 
          title: 'Lunch', 
          icon: require('../images/lunch.png'),
        },
        {
          time: '14:00', 
          title: 'Watch Soccer', 
          description: 'Team sport played between two teams of eleven players with a spherical ball. ',
          lineColor:'#009688', 
          icon: require('../images/soccer.png'),
          imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg'
        },
        {
          time: '16:30', 
          title: 'Go to Fitness center', 
          description: 'Look out for the Best Gym & Fitness Centers around me :)', 
          icon: require('../images/dumbbell.png'),
          imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
        }
      ]
      this.state = {selected: null}
    } 
  
    onEventPress(data){
      this.setState({selected: data})
    }
  
    renderSelected(){
        if(this.state.selected)
          return <Text style={{marginTop:10}}>Selected event: {this.state.selected.title} at {this.state.selected.time}</Text>
    }
  
    renderDetail(rowData, sectionID, rowID) {
      let title = <Text style={[stylesOverride.title]}>{rowData.title}</Text>
      var desc = null
      if(rowData.description && rowData.imageUrl)
        desc = (
          <View style={stylesOverride.descriptionContainer}>   
            <Image source={{uri: rowData.imageUrl}} style={stylesOverride.image}/>
            <Text style={[stylesOverride.textDescription]}>{rowData.description}</Text>
          </View>
        )
      
      return (
        <View style={{flex:1}}>
          {title}
          {desc}
        </View>
      )
    }
  
    renderPage() {
      return (
        <View style={stylesOverride.container}>
          {this.renderSelected()}
          <AnterosTimeline 
            style={stylesOverride.list}
            data={this.data}
            circleSize={20}
            circleColor='rgba(0,0,0,0)'
            lineColor='rgb(45,156,219)'
            timeContainerStyle={{minWidth:52, marginTop: -5}}
            timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
            descriptionStyle={{color:'gray'}}
            options={{
              style:{paddingTop:5}
            }}
            innerCircle={'icon'}
            onEventPress={this.onEventPress}
            renderDetail={this.renderDetail}
          />
        </View>
      );
    }
  }
  
  const stylesOverride = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      paddingTop:5,
      backgroundColor:'white'
    },
    list: {
      flex: 1,
      marginTop:20,
    },
    title:{
      fontSize:16,
      fontWeight: 'bold'
    },
    descriptionContainer:{
      flexDirection: 'row',
      paddingRight: 50
    },
    image:{
      width: 50,
      height: 50,
      borderRadius: 25
    },
    textDescription: {
      marginLeft: 10,
      color: 'gray'
    }
  });




class LoadMoreExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Refresh',
      showBackButton: true
    };

    constructor(){
      super()
      this.onEndReached = this.onEndReached.bind(this)
      this.renderFooter = this.renderFooter.bind(this)
      this.onRefresh = this.onRefresh.bind(this)
  
      this.data = [
        {time: '09:00', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. '},
        {time: '10:45', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.'},
        {time: '12:00', title: 'Lunch', icon: require('../images/lunch.png')},
        {time: '14:00', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. '},
        {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)'},
      ]
  
      this.state = {
        isRefreshing: false,      
        waiting: false,
        data: this.data
      }
    } 
  
    onRefresh(){
      this.setState({isRefreshing: true});
      //refresh to initial data
      setTimeout(() => {
        //refresh to initial data
        this.setState({
          data: this.data,
          isRefreshing: false
        });
      }, 2000);
    }
  
    onEndReached() {
      if (!this.state.waiting) {
          this.setState({waiting: true});
  
          //fetch and concat data
          setTimeout(() => {
  
            //refresh to initial data
            var data = this.state.data.concat(
              [
                {time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
                {time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
                {time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
                {time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
                {time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'}
              ]
              )
  
            this.setState({
              waiting: false,
              data: data,
            });
          }, 2000);
      }
    }
  
    renderFooter() {
      if (this.state.waiting) {
          return <ActivityIndicator />;
      } else {
          return <Text>~</Text>;
      }
    }
  
    renderPage() {
      return (
        <View style={stylesLoad.container}>
          <AnterosTimeline 
            style={stylesLoad.list}
            data={this.state.data}
            circleSize={20}
            circleColor='rgb(45,156,219)'
            lineColor='rgb(45,156,219)'
            timeContainerStyle={{minWidth:52, marginTop: -5}}
            timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
            descriptionStyle={{color:'gray'}}
            options={{
              style:{paddingTop:5},
              refreshControl: (
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.onRefresh}
                />
              ),
              renderFooter: this.renderFooter,
              onEndReached: this.onEndReached
            }}
            innerCircle={'dot'}
          />
        </View>
      );
    }
  }
  
  const stylesLoad = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
          paddingTop:5,
      backgroundColor:'white'
    },
    list: {
      flex: 1,
      marginTop:20,
    },
  });



class SingleRightExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Single',
      showBackButton: true
    };

    constructor(){
      super()
      this.onEventPress = this.onEventPress.bind(this)
      this.renderSelected = this.renderSelected.bind(this)
      this.renderDetail = this.renderDetail.bind(this)
  
      this.data = [
        {
          time: '09:00', 
          title: 'Archery Training', 
          description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
          lineColor:'#009688', 
          icon: require('../images/archery.png'),
          imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
        },
        {
          time: '10:45', 
          title: 'Play Badminton', 
          description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.', 
          icon: require('../images/badminton.png'),
          imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg'
        },
        {
          time: '12:00', 
          title: 'Lunch', 
          icon: require('../images/lunch.png'),
        },
        {
          time: '14:00', 
          title: 'Watch Soccer', 
          description: 'Team sport played between two teams of eleven players with a spherical ball. ',
          lineColor:'#009688', 
          icon: require('../images/soccer.png'),
          imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg'
        },
        {
          time: '16:30', 
          title: 'Go to Fitness center', 
          description: 'Look out for the Best Gym & Fitness Centers around me :)', 
          icon: require('../images/dumbbell.png'),
          imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
        }
      ]
      this.state = {selected: null}
    } 
  
    onEventPress(data){
      this.setState({selected: data})
    }
  
    renderSelected(){
        if(this.state.selected)
          return <Text style={{marginTop:10}}>Selected event: {this.state.selected.title} at {this.state.selected.time}</Text>
    }
  
    renderDetail(rowData, sectionID, rowID) {
      let title = <Text style={[stylesSingle.title]}>{rowData.title}</Text>
      var desc = null
      if(rowData.description && rowData.imageUrl)
        desc = (
          <View style={stylesSingle.descriptionContainer}>   
            <Image source={{uri: rowData.imageUrl}} style={stylesSingle.image}/>
            <Text style={[stylesSingle.textDescription]}>{rowData.description}</Text>
          </View>
        )
      
      return (
        <View style={{flex:1}}>
          {title}
          {desc}
        </View>
      )
    }
  
    renderPage() {
      return (
        <View style={stylesSingle.container}>
          {this.renderSelected()}
          <AnterosTimeline 
            style={stylesSingle.list}
            data={this.data}
            circleSize={20}
            circleColor='rgba(0,0,0,0)'
            lineColor='rgb(45,156,219)'
            timeContainerStyle={{minWidth:52, marginTop: -5}}
            timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
            descriptionStyle={{color:'gray'}}
            options={{
              style:{paddingTop:5}
            }}
            innerCircle={'icon'}
            onEventPress={this.onEventPress}
            renderDetail={this.renderDetail}          
            separator={false}
            detailContainerStyle={{marginBottom: 20, paddingLeft: 5, paddingRight: 5, backgroundColor: "#BBDAFF", borderRadius: 10}}
            columnFormat='single-column-right'
          />
        </View>
      );
    }
  }
  
  const stylesSingle = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      paddingTop:5,
      backgroundColor:'white'
    },
    list: {
      flex: 1,
      marginTop:20,
    },
    title:{
      fontSize:16,
      fontWeight: 'bold'
    },
    descriptionContainer:{
      flexDirection: 'row',
      paddingRight: 50
    },
    image:{
      width: 50,
      height: 50,
      borderRadius: 25
    },
    textDescription: {
      marginLeft: 10,
      color: 'gray'
    }
  });


class TemplateExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Template',
      showBackButton: true
    };

    constructor(){
      super()
      this.data = [
        {time: '09:00', title: 'Archery Training', description: 'Event 1 Description', icon: require('../images/archery.png')},
        {time: '10:45', title: 'Event 2', description: 'Event 2 Description', icon: require('../images/badminton.png')},
        {time: '12:00', title: 'Event 3', description: 'Event 3 Description', icon: require('../images/lunch.png')},
        {time: '14:00', title: 'Event 4', description: 'Event 4 Description', icon: require('../images/soccer.png')},
        {time: '16:30', title: 'Event 5', description: 'Event 5 Description', icon: require('../images/dumbbell.png')}
      ]
    } 
  
    renderPage() {
      return (
        <View style={stylesTemplate.container}>
          <AnterosTimeline 
            style={stylesTemplate.list}
            data={this.data}
            circleSize={20}
            circleColor='rgba(0,0,0,0)'
            innerCircle={'icon'}
            options={{
            }}
          />
        </View>
      );
    }
  }
  
  const stylesTemplate = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
          paddingTop:5
    },
    list: {
      flex: 1,
      marginTop:20,
    },
  });

class PressExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Press',
      showBackButton: true
    };

    constructor(){
      super()
      this.onEventPress = this.onEventPress.bind(this)
      this.renderSelected = this.renderSelected.bind(this)
      this.data = [
        {time: '09:00', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',lineColor:'#009688', icon: require('../images/archery.png')},
        {time: '10:45', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.', icon: require('../images/badminton.png')},
        {time: '12:00', title: 'Lunch', icon: require('../images/lunch.png')},
        {time: '14:00', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ',lineColor:'#009688', icon: require('../images/soccer.png')},
        {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', icon: require('../images/dumbbell.png')}
      ]
      this.state = {selected: null}
    } 
  
    onEventPress(data){
      this.setState({selected: data})
    }
  
    renderSelected(){
        if(this.state.selected)
          return <Text style={{marginTop:10}}>Selected event: {this.state.selected.title} at {this.state.selected.time}</Text>
    }
  
    renderPage() {
      return (
        <View style={stylesPress.container}>
          {this.renderSelected()}
          <AnterosTimeline 
            style={stylesPress.list}
            data={this.data}
            circleSize={20}
            circleColor='rgba(0,0,0,0)'
            lineColor='rgb(45,156,219)'
            timeContainerStyle={{minWidth:52, marginTop: -5}}
            timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
            descriptionStyle={{color:'gray'}}
            options={{
              style:{paddingTop:5}
            }}
            innerCircle={'icon'}
            onEventPress={this.onEventPress}
          />
        </View>
      );
    }
  }
  
  const stylesPress = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      paddingTop:5,
      backgroundColor:'white'
    },
    list: {
      flex: 1,
      marginTop:20,
    },
  });


class TwoColumnExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Two column',
      showBackButton: true
    };

    constructor(){
      super()
      this.onEventPress = this.onEventPress.bind(this)
      this.renderSelected = this.renderSelected.bind(this)
  
      this.data = [
        {
          time: '09:00', 
          title: 'Archery Training', 
          description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
          lineColor:'#009688', 
          icon: require('../images/archery.png'),
          imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
        },
        {
          time: '10:45', 
          title: 'Play Badminton', 
          description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.', 
          icon: require('../images/badminton.png'),
          imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg'
        },
        {
          time: '12:00', 
          title: 'Lunch', 
          icon: require('../images/lunch.png'),
        },
        {
          time: '14:00', 
          title: 'Watch Soccer', 
          description: 'Team sport played between two teams of eleven players with a spherical ball. ',
          lineColor:'#009688', 
          icon: require('../images/soccer.png'),
          imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg'
        },
        {
          time: '16:30', 
          title: 'Go to Fitness center', 
          description: 'Look out for the Best Gym & Fitness Centers around me :)', 
          icon: require('../images/dumbbell.png'),
          imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
        }
      ]
      this.state = {selected: null}
    } 
  
    onEventPress(data){
      this.setState({selected: data})
    }
  
    renderSelected(){
        if(this.state.selected)
          return <Text style={{marginTop:10}}>Selected event: {this.state.selected.title} at {this.state.selected.time}</Text>
    }
  
    renderPage() {
      return (
        <View style={stylesTwo.container}>
          {this.renderSelected()}
          <AnterosTimeline 
            style={stylesTwo.list}
            data={this.data}
            circleSize={20}
            circleColor='rgba(0,0,0,0)'
            lineColor='rgb(45,156,219)'
            timeContainerStyle={{minWidth:52, marginTop: -5}}
            timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
            descriptionStyle={{color:'gray'}}
            options={{
              style:{paddingTop:5}
            }}
            innerCircle={'icon'}
            onEventPress={this.onEventPress}                    
            separator={false}
            detailContainerStyle={{marginBottom: 20, paddingLeft: 5, paddingRight: 5, backgroundColor: "#BBDAFF", borderRadius: 10}}
            columnFormat='two-column'
          />
        </View>
      );
    }
  }
  
  const stylesTwo = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      paddingTop:5,
      backgroundColor:'white'
    },
    list: {
      flex: 1,
      marginTop:20,
    },
    title:{
      fontSize:16,
      fontWeight: 'bold'
    },
    descriptionContainer:{
      flexDirection: 'row',
      paddingRight: 50
    },
    image:{
      width: 50,
      height: 50,
      borderRadius: 25
    },
    textDescription: {
      marginLeft: 10,
      color: 'gray'
    }
  });