import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    FlatList,
    Alert,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Actions,
    SafeAreaView,
    Platform,
    ImageBackground,
    ViewPropTypes,
    Animated,
    StatusBar,
    Easing,
    Image,
    TextInput,
    Dimensions,
    View
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {AnterosButton, AnterosNavigationPage, AnterosScrollableTabBar, AnterosScrollableDefaultTabBar,
     AnterosLabel, AnterosListRow, AnterosText, AnterosScrollableTabView, AnterosIcon} from 'anteros-react-native';

export default class ScrollableTabViewExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Scrollable tabview',
        showBackButton: true
    };
    constructor(props) {
        super(props);
        this.scroll1 = this
            .scroll1
            .bind(this);
        this.scroll2 = this
            .scroll2
            .bind(this);    
        this.scroll3 = this
            .scroll3
            .bind(this);     
        this.scroll4 = this
            .scroll4
            .bind(this);                 
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

    scroll1() {
        this
            .navigator
            .push({view: <ScrollableExample1/>})
    }

    scroll2() {
        this
            .navigator
            .push({view: <ScrollableExample2/>})
    }
    scroll3() {
        this
            .navigator
            .push({view: <ScrollableExample3/>})
    }
    scroll4() {
        this
            .navigator
            .push({view: <ScrollableExample4/>})
    }
    renderPage() {
        return (
            <ScrollView style={{
                flex: 1
            }}>
                <View style={{
                    height: 20
                }}/>
                <AnterosListRow title='Scrollable simple' onPress={this.scroll1}  topSeparator='full'/>
                <AnterosListRow title='Tabs example' onPress={this.scroll2} topSeparator='full'/>
                <AnterosListRow title='Overlay example' onPress={this.scroll3}  topSeparator='full'/>
                <AnterosListRow title='Facebook example' onPress={this.scroll4}  topSeparator='full'/>
                            
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




class ScrollableExample1 extends AnterosNavigationPage {
    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Scrollable simple',
        showBackButton: true
    };

    renderPage(){
        return (<AnterosScrollableTabView
                style={{marginTop: 20, }}
                initialPage={1}>
            <AnterosText tabLabel='Tab #1'>My</AnterosText>
            <AnterosText tabLabel='Tab #2'>favorite</AnterosText>
            <AnterosText tabLabel='Tab #3'>project</AnterosText>
        </AnterosScrollableTabView>)
  }
}


class ScrollableExample2 extends AnterosNavigationPage {
    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Tabs example',
        showBackButton: true
    };

    renderPage(){
        return <AnterosScrollableTabView
                    style={{marginTop: 20, }}
                    initialPage={0}
                    renderTabBar={() => <AnterosScrollableTabBar />}
                >
                    <AnterosText tabLabel='Tab #1'>My</AnterosText>
                    <AnterosText tabLabel='Tab #2 word word'>favorite</AnterosText>
                    <AnterosText tabLabel='Tab #3 word word word'>project</AnterosText>
                    <AnterosText tabLabel='Tab #4 word word word word'>favorite</AnterosText>
                    <AnterosText tabLabel='Tab #5'>project</AnterosText>
                </AnterosScrollableTabView>;
    }
}


class ScrollableExample3 extends AnterosNavigationPage {
    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Overlay example',
        showBackButton: true
    };
    renderPage(){
        return (<AnterosScrollableTabView
                    style={styles3.container}
                    renderTabBar={()=><AnterosScrollableDefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}
                    tabBarPosition='overlayTop'
                    >
                    <ScrollView tabLabel='iOS'>
                        <AnterosIcon name='logo-apple' type='ionicon' color='black' size={200} iconStyle={styles3.icon} />
                        <AnterosIcon name='ios-phone-portrait' type='ionicon' color='black' size={200} iconStyle={styles3.icon} />
                        <AnterosIcon name='logo-apple' type='ionicon' color='#DBDDDE' size={200} iconStyle={styles3.icon} />
                        <AnterosIcon name='ios-phone-portrait' type='ionicon' color='#DBDDDE' size={200} iconStyle={styles3.icon} />
                    </ScrollView>
                    <ScrollView tabLabel='Android'>
                        <AnterosIcon name='logo-android' type='ionicon' color='#A4C639' size={200} iconStyle={styles3.icon} />
                        <AnterosIcon name='logo-android' type='ionicon' color='black' size={200} iconStyle={styles3.icon} />
                        <AnterosIcon name='logo-android' type='ionicon' color='brown' size={200} iconStyle={styles3.icon} />
                    </ScrollView>
                </AnterosScrollableTabView>)
    }
}


const styles3 = StyleSheet.create({
    container: {
      marginTop: 30,
    },
    icon: {
      width: 300,
      height: 300,
      alignSelf: 'center',
    },
  });



  class ScrollableExample4 extends AnterosNavigationPage {
    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Facebook example',
        showBackButton: true
    };
    renderPage(){
            return <AnterosScrollableTabView
                    style={{marginTop: 20, }}
                    initialPage={1}
                    renderTabBar={() => <FacebookTabBar />}
                    >
                        <ScrollView tabLabel="ios-paper" style={styles4.tabView}>
                            <View style={styles4.card}>
                                <AnterosText>News</AnterosText>
                            </View>
                        </ScrollView>
                        <ScrollView tabLabel="ios-people" style={styles4.tabView}>
                            <View style={styles4.card}>
                                <AnterosText>Friends</AnterosText>
                            </View>
                        </ScrollView>
                        <ScrollView tabLabel="ios-chatboxes" style={styles4.tabView}>
                            <View style={styles4.card}>
                                <AnterosText>Messenger</AnterosText>
                            </View>
                        </ScrollView>
                        <ScrollView tabLabel="ios-notifications" style={styles4.tabView}>
                            <View style={styles4.card}>
                                <AnterosText>Notifications</AnterosText>
                            </View>
                        </ScrollView>
                        <ScrollView tabLabel="ios-list" style={styles4.tabView}>
                            <View style={styles4.card}>
                                <AnterosText>Other nav</AnterosText>
                            </View>
                        </ScrollView>
                    </AnterosScrollableTabView>;
    }
}
  
  const styles4 = StyleSheet.create({
    tabView: {
      flex: 1,
      padding: 10,
      backgroundColor: 'rgba(0,0,0,0.01)',
    },
    card: {
      borderWidth: 1,
      backgroundColor: '#fff',
      borderColor: 'rgba(0,0,0,0.1)',
      margin: 5,
      height: 150,
      padding: 15,
      shadowColor: '#ccc',
      shadowOffset: { width: 2, height: 2, },
      shadowOpacity: 0.5,
      shadowRadius: 3,
    },
  });


  class FacebookTabBar extends React.Component {
    icons = [];
  
    constructor(props) {
      super(props);
      this.icons = [];
    }
  
    componentDidMount() {
      this._listener = this.props.scrollValue.addListener(this.setAnimationValue.bind(this));
    }
  
    setAnimationValue({ value, }) {
      this.icons.forEach((icon, i) => {
        const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
        icon.setNativeProps({
          style: {
            color: this.iconColor(progress),
          },
        });
      });
    }
  
    //color between rgb(59,89,152) and rgb(204,204,204)
    iconColor(progress) {
      const red = 59 + (204 - 59) * progress;
      const green = 89 + (204 - 89) * progress;
      const blue = 152 + (204 - 152) * progress;
      return `rgb(${red}, ${green}, ${blue})`;
    }
  
    render() {
      return <View style={[stylesF.tabs, this.props.style, ]}>
        {this.props.tabs.map((tab, i) => {
          return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={stylesF.tab}>
            <AnterosIcon
              name={tab}
              type='ionicon'
              size={30}
              color={this.props.activeTab === i ? 'rgb(59,89,152)' : 'rgb(204,204,204)'}
              ref={(icon) => { this.icons[i] = icon; }}
            />
          </TouchableOpacity>;
        })}
      </View>;
    }
  }
  
  const stylesF = StyleSheet.create({
    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 10,
    },
    tabs: {
      height: 45,
      flexDirection: 'row',
      paddingTop: 5,
      borderWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomColor: 'rgba(0,0,0,0.05)',
    },
  });

