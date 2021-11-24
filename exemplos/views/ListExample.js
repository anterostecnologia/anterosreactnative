import {Component, PureComponent} from 'react';
import {
    StyleSheet,
    FlatList,
    Alert,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Actions,
    SafeAreaView,
    Platform,
    ListView,
    ImageBackground,
    ViewPropTypes,
    Animated,
    StatusBar,
    TouchableHighlight,
    Easing,
    Image,
    TextInput,
    Dimensions,
    View
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    AnterosButton,
    AnterosSwiper,
    AnterosNavigationPage,
    AnterosActionSheet,
    AnterosCarousel,
    AnterosPullPicker,
    AnterosLabel,
    AnterosTextArea,
    AnterosListRow,
    AnterosTheme,
    AnterosAtoZList,
    AnterosSortableList,
    AnterosSettingsList,
    AnterosIcon,
    AnterosImage,
    AnterosInfiniteScrollView,
    AnterosListView,
    AnterosText,
    AnterosSearchBox,
    AnterosSegmentedControl
} from 'anteros-react-native';
import GridListExample from './GridListExample';
import {data} from './data';
import randomcolor from 'randomcolor';
import _ from 'lodash';
import TimelineExample from './TimelineExample';
import ListRowExample from './ListRowExample';
import { Button, ListItem, Left, Right, Body, Thumbnail, Icon, Item, Input } from 'native-base'
var faker = require('faker/locale/pt_BR');

const window = Dimensions.get('window');

export class ListExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'List',
        showBackButton: true
    };
    constructor(props) {
        super(props);
        this.list1 = this
            .list1
            .bind(this);
        this.list2 = this
            .list2
            .bind(this);
        this.list3 = this
            .list3
            .bind(this);    
        this.list4 = this
            .list4
            .bind(this);     
        this.list5 = this
            .list5
            .bind(this);      
        this.list6 = this
            .list6
            .bind(this);     
        this.list7 = this
            .list7
            .bind(this);  
            
        this.list9 = this
            .list9
            .bind(this);       
        this.list10 = this
            .list10
            .bind(this);     
        this.list11 = this
            .list11
            .bind(this);
        this.list12 = this
            .list12
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

    list1() {
        this
            .navigator
            .push({view: <GridListExample/>})
    }

    list2() {
        this
            .navigator
            .push({view: <SortableListExample/>})
    }

    list3() {
        //  this
        //      .navigator
        //      .push({view: <ListAtoZExample/>})
    }

    list4() {
        this
            .navigator
            .push({view: <SettingsListExample/>})
    }

    list6() {
         this
             .navigator
             .push({view: <TimelineExample/>})
    }

    list7() {
        this
            .navigator
            .push({view: <ListRowExample/>})
    }

    

    list9() {
        this
            .navigator
            .push({view: <SearchBoxExample/>})
    }
    
    list12() {
         this
             .navigator
             .push({view: <AnterosListViewExample/>})
    }

    renderPage() {
        return (
            <ScrollView style={{
                flex: 1
            }}>
                <View style={{
                    height: 20
                }}/>
                <AnterosListRow title='Grid list' onPress={this.list1} topSeparator='full'/>
                <AnterosListRow title='Sortable list' onPress={this.list2} topSeparator='full'/>
                <AnterosListRow title='Alphabetic list' onPress={this.list3} topSeparator='full'/>
                <AnterosListRow title='Settings list' onPress={this.list4} topSeparator='full'/>
                <AnterosListRow title='Timeline' onPress={this.list6} topSeparator='full'/>
                <AnterosListRow title='List row' onPress={this.list7} topSeparator='full'/>
                
                <AnterosListRow title='Search box' onPress={this.list9} topSeparator='full'/>
                <AnterosListRow title='Infinite scrollview' onPress={this.list12} topSeparator='full'/>
            
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

class SortableListExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Sortable list',
        showBackButton: true
    };

    constructor(props) {
        super(props);
        data.populateData();
        this.users = data.getUsers();
    }

    renderPage() {
        return (
            <View style={stylesRow.container}>
                <AnterosSortableList
                    style={stylesRow.list}
                    contentContainerStyle={stylesRow.contentContainer}
                    data={this.users}
                    renderRow={this._renderRow}/>
            </View>
        );
    }

    _renderRow = ({data, active}) => {
        return <Row data={data} active={active}/>
    }
}

class Row extends Component {
    constructor(props) {
        super(props);
        this._active = new Animated.Value(0);
        this._style = {
            ...Platform.select({
                ios: {
                    transform: [
                        {
                            scale: this
                                ._active
                                .interpolate({
                                    inputRange: [
                                        0, 1
                                    ],
                                    outputRange: [1, 1.1]
                                })
                        }
                    ],
                    shadowRadius: this
                        ._active
                        .interpolate({
                            inputRange: [
                                0, 1
                            ],
                            outputRange: [2, 10]
                        })
                },

                android: {
                    transform: [
                        {
                            scale: this
                                ._active
                                .interpolate({
                                    inputRange: [
                                        0, 1
                                    ],
                                    outputRange: [1, 1.07]
                                })
                        }
                    ],
                    elevation: this
                        ._active
                        .interpolate({
                            inputRange: [
                                0, 1
                            ],
                            outputRange: [2, 6]
                        })
                }
            })
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.active !== nextProps.active) {
            Animated
                .timing(this._active, {
                duration: 300,
                easing: Easing.bounce,
                toValue: Number(nextProps.active)
            })
                .start();
        }
    }

    render() {
        const {data, active} = this.props;

        return (
            <Animated.View style={[stylesRow.row, this._style]}>
                <AnterosImage
                    source={
                    data.photo
                }
                    style={stylesRow.image}/>
                <AnterosText style={stylesRow.text}>{data.firstName + ' ' + data.lastName}</AnterosText>
            </Animated.View>
        );
    }
}

const stylesRow = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',

        ...Platform.select({
            ios: {
                paddingTop: 20
            }
        })
    },

    title: {
        fontSize: 20,
        paddingVertical: 20,
        color: '#999999'
    },

    list: {
        flex: 1,
    },

    contentContainer: {
        width: window.width,

        ...Platform.select({
            ios: {
                paddingHorizontal: 30
            },

            android: {
                paddingHorizontal: 0
            }
        })
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        height: 80,
        flex: 1,
        marginTop: 7,
        marginBottom: 12,
        borderRadius: 4,

        ...Platform.select({
            ios: {
                width: window.width - 30 * 2,
                shadowColor: 'rgba(0,0,0,0.2)',
                shadowOpacity: 1,
                shadowOffset: {
                    height: 2,
                    width: 2
                },
                shadowRadius: 2
            },

            android: {
                width: window.width - 30 * 2,
                elevation: 0,
                marginHorizontal: 30
            }
        })
    },

    image: {
        width: 50,
        height: 50,
        marginRight: 30,
        borderRadius: 25
    },

    text: {
        fontSize: 24,
        color: '#222222'
    }
});




let names = require('./data/names');
names = _.groupBy(require('./data/names'), (name) => name[0].toUpperCase());

class ListAtoZExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Alphabetic list',
        showBackButton: true
    };

    constructor(props, context) {
        super(props, context);

        this._renderCell = this._renderCell.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
    }

    _renderHeader(data) {
        return (
            <View style={{ height: 35, justifyContent: 'center', backgroundColor: '#eee', paddingLeft: 10 }}>
                <AnterosText>{data.sectionId}</AnterosText>
            </View>
        )
    }


    _renderCell(data) {
        return (
            <View style={stylesAtoZ.cell}>
                <View style={[stylesAtoZ.placeholderCircle, { backgroundColor: randomcolor() }]} />
                <AnterosText style={stylesAtoZ.name}>
                    {data} {data.split('').reverse().join('')}
                </AnterosText>
            </View>
        );
    }

    renderPage() {
        return (
            <AnterosAtoZList
                sectionHeaderHeight={35}
                cellHeight={95}
                data={names}
                renderCell={this._renderCell}
                renderSection={this._renderHeader}
                />
        );
    }
}






const stylesAtoZ = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: '#fff',
    },
    swipeContainer: {
    },
    alphabetSidebar: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderCircle: {
        width: 50,
        height: 50,
        backgroundColor: '#ccc',
        borderRadius: 25,
        marginRight: 10,
        marginLeft: 5,
    },
    name: {
        fontSize: 15,
    },
    cell: {
        height: 95,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
});





 class SettingsListExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Settings list',
        showBackButton: true
    };

   constructor(){
     super();
     this.onValueChange = this.onValueChange.bind(this);
     this.state = {switchValue: false, loggedIn: false};
   }
   renderPage() {
     var bgColor = '#DCE3F4';
     return (
       <View style={{backgroundColor:'#EFEFF4',flex:1}}>
         <View style={{borderBottomWidth:1, backgroundColor:'#f7f7f8',borderColor:'#c8c7cc'}}>
           <AnterosText style={{alignSelf:'center',marginTop:30,marginBottom:10,fontWeight:'bold',fontSize:16}}>Settings</AnterosText>
         </View>
         <View style={{backgroundColor:'#EFEFF4',flex:1}}>
           <AnterosSettingsList borderColor='#c8c7cc' defaultItemSize={50}>
             <AnterosSettingsList.Header headerStyle={{marginTop:15}}/>
             {this.state.toggleAuthView ?
               <AnterosSettingsList.Item
                 icon={
                    <AnterosIcon containerStyle={{padding:4}} type="ionicon" size={36} name="ios-person" color={AnterosTheme.primaryColor}/>
                 }
                 title='Logged In As...'
                 hasNavArrow={false}
               />
               :
               <AnterosSettingsList.Item
                 icon={
                    <AnterosIcon containerStyle={{padding:4}} type="ionicon" size={36}  name="ios-person" color={AnterosTheme.primaryColor}/>
                 }
                 isAuth={true}
                 authPropsUser={{placeholder:'E-mail'}}
                 authPropsPW={{placeholder:'Password'}}
                 onPress={() => this.toggleAuthView()}
               />
             }
             <AnterosSettingsList.Header headerStyle={{marginTop:15}}/>
             <AnterosSettingsList.Item
               icon={
                <AnterosIcon containerStyle={{padding:4}} type="ionicon" size={36}  name="ios-plane" color={AnterosTheme.primaryColor}/>
               }
               hasSwitch={true}
               switchState={this.state.switchValue}
               switchOnValueChange={this.onValueChange}
               hasNavArrow={false}
               title='Airplane Mode'
             />
             <AnterosSettingsList.Item
               icon={<AnterosIcon containerStyle={{padding:4}} type="ionicon" size={36}  name="ios-wifi" color={AnterosTheme.primaryColor}/>}
               title='Wi-Fi'
               titleInfo='Bill Wi The Science Fi'
               titleInfoStyle={stylesSettings.titleInfoStyle}
               onPress={() => Alert.alert('Route to Wifi Page')}
             />
             <AnterosSettingsList.Item
               icon={<AnterosIcon containerStyle={{padding:4}} type="ionicon" size={36}  name="ios-bluetooth" color={AnterosTheme.primaryColor}/>}
               title='Blutooth'
               titleInfo='Off'
               titleInfoStyle={stylesSettings.titleInfoStyle}
               onPress={() => Alert.alert('Route to Blutooth Page')}
             />
             <AnterosSettingsList.Item
               icon={<AnterosIcon containerStyle={{padding:4}} type="ionicon" size={36}  name="ios-phone-portrait" color={AnterosTheme.primaryColor}/>}
               title='Cellular'
               onPress={() => Alert.alert('Route To Cellular Page')}
             />
             <AnterosSettingsList.Item
               icon={<AnterosIcon containerStyle={{padding:4}} type="ionicon" size={36}  name="ios-flame" color={AnterosTheme.primaryColor}/>}
               title='Personal Hotspot'
               titleInfo='Off'
               titleInfoStyle={stylesSettings.titleInfoStyle}
               onPress={() => Alert.alert('Route To Hotspot Page')}
             />
             <AnterosSettingsList.Header headerStyle={{marginTop:15}}/>
             <AnterosSettingsList.Item
               icon={<AnterosIcon containerStyle={{padding:4}} type="ionicon" size={36}  name="ios-notifications" color={AnterosTheme.primaryColor}/>}
               title='Notifications'
               onPress={() => Alert.alert('Route To Notifications Page')}
             />
             <AnterosSettingsList.Item
               icon={<AnterosIcon containerStyle={{padding:4}} type="ionicon" size={36}  name="ios-apps" color={AnterosTheme.primaryColor}/>}
               title='Control Center'
               onPress={() => Alert.alert('Route To Control Center Page')}
             />
             <AnterosSettingsList.Item
               icon={<AnterosIcon containerStyle={{padding:4}} type="ionicon" size={36}  name="ios-alarm" color={AnterosTheme.primaryColor}/>}
               title='Do Not Disturb'
               onPress={() => Alert.alert('Route To Do Not Disturb Page')}
             />
             <AnterosSettingsList.Header headerStyle={{marginTop:15}}/>
             <AnterosSettingsList.Item
               icon={<AnterosIcon containerStyle={{padding:4}} type="ionicon" size={36}  name="ios-apps" color={AnterosTheme.primaryColor}/>}
               title='General'
               onPress={() => Alert.alert('Route To General Page')}
             />
             <AnterosSettingsList.Item
               icon={<AnterosIcon containerStyle={{padding:4}} type="ionicon" size={36}  name="ios-list" color={AnterosTheme.primaryColor}/>}
               title='Display & Brightness'
               onPress={() => Alert.alert('Route To Display Page')}
             />
           </AnterosSettingsList>
         </View>
       </View>
     );
   }
   toggleAuthView() {
     this.setState({toggleAuthView: !this.state.toggleAuthView});
   }
   onValueChange(value){
     this.setState({switchValue: value});
   }
 }

const stylesSettings = StyleSheet.create({
  imageStyle:{
    marginLeft:15,
    alignSelf:'center',
    height:30,
    width:30
  },
  titleInfoStyle:{
    fontSize:16,
    color: '#8e8e93'
  }
});




const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      width: 0,
      height: 0
    }
    this.measureView = this.measureView.bind(this);
  }

  measureView(event) {
    this.setState({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height
    })
  }

  render(){
    const mainStyle = {
      flex: 1,
      backgroundColor: '#F8F4FC',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#8B8393'
    }

    const submenuStyle = {
      width: this.state.width / 2,
      height: this.state.height / 4,
      borderRadius: 50,
      backgroundColor: '#8B8393'
    }
    return (
      <View style={mainStyle} onLayout={(event) => this.measureView(event)}>
        <View style={submenuStyle}/>
      </View>
    )
  }
}

class ScrollItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      height: 100
    }
  }

  render(){
    const mainStyle = {
      flex: 1,
      height: this.state.height,
      backgroundColor: '#DCDADF',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#8B8393'
    }
    const imgContainer = {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }

    const imgStyle = {
      width: this.state.height / 1.5,
      height: this.state.height / 1.5,
      backgroundColor: '#ADA8B3',
      borderRadius: 10
    }

    const textContainer = {
      flex: 3,
      height: this.state.height / 1.5,
      flexDirection: 'column',
      justifyContent: 'flex-start'
    }

    const textStyle = {
      width: WIDTH / 1.8,
      marginBottom: 10,
      height: this.state.height / 8,
      backgroundColor: '#ADA8B3',
      borderRadius: 10
    }

    const textStyleShort = {
      width: WIDTH / 3,
      marginBottom: 10,
      height: this.state.height / 9,
      backgroundColor: '#ADA8B3',
      borderRadius: 12
    }

    return (
      <View style={mainStyle}>
        <View style={imgContainer}>
          <View style={imgStyle}/>
        </View>

        <View style={textContainer}>
          <View style={textStyle}/>
          <View style={textStyle}/>
          <View style={textStyleShort}/>
        </View>

      </View>
    )
  }
}


// class AnimatedRefreshExample extends AnterosNavigationPage {

//     static defaultProps = {
//         ...AnterosNavigationPage.defaultProps,
//         title: 'Animated refresh',
//         showBackButton: true
//     };

//   constructor(props) {
//     super(props);
//     this.state = {
//       isRefreshing: false,
//     };
//   }

//   onRefresh() {
//     this.setState({isRefreshing: true});
//     setTimeout(() => {
//       this.setState({isRefreshing: false});
//     }, 5000);
//   }

//   renderPage() {
//     return (
//       <View style={{flex:1}}>
//         <Header/>
//         <View style={{flex: 7, backgroundColor: '#F8F4FC'}}>
//           <AnterosAnimatedRefresh
//             isRefreshing= {this.state.isRefreshing}
//             onRefresh= {this.onRefresh.bind(this)}
//             animationBackgroundColor = {'#564A63'}
//             pullHeight = {180}
//             contentView = {
//               <ScrollView>
//                 <ScrollItem/>
//                 <ScrollItem/>
//                 <ScrollItem/>
//                 <ScrollItem/>
//                 <ScrollItem/>
//                 <ScrollItem/>
//                 <ScrollItem/>
//                 <ScrollItem/>
//                 <ScrollItem/>
//               </ScrollView>
//             }

//             onPullAnimationSrc ={require('./animations/umbrella_1.json')}
//             onStartRefreshAnimationSrc ={require('./animations/umbrella_start.json')}
//             onRefreshAnimationSrc = {require('./animations/umbrella_repeat.json')}
//             onEndRefreshAnimationSrc = {require('./animations/umbrella_end.json')}
//           />
//         </View>
//       </View>
//     );
//   }
// }




const rowHeight = 40;

class SearchBoxExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Search box',
        showBackButton: true
    };

  state = {
    data: {
      "A": [
        {
          "name": "Anh Tuan Nguyen",
          "age": 28
        },
        {
          "name": "An Nhien",
          "age": 2
        },
      ],
      "Z": [
        {
          "name": "Thanh Tu Pham",
          "age": 32
        },
        {
          "name": "Tien Thanh",
          "age": 24
        },
      ]
    }
  }

    renderRow = (item, sectionId, index) => {
      return (
        <TouchableHightLight
          style={{
            height: rowHeight,
            justifyContent: 'center',
            alignItems: 'center'}}
        >
          <Text>{item.name}</Text>
        </TouchableHightLight>
      );
    }

    // Important: You must return a Promise
    beforeFocus = () => {
        return new Promise((resolve, reject) => {
            console.log('beforeFocus');
            resolve();
        });
    }

    // Important: You must return a Promise
    onFocus = (text) => {
        return new Promise((resolve, reject) => {
            console.log('onFocus', text);
            resolve();
        });
    }

    // Important: You must return a Promise
    afterFocus = () => {
        return new Promise((resolve, reject) => {
            console.log('afterFocus');
            resolve();
        });
    }

  renderPage() {
    // inside your render function
    return (
      <View style={{ flex: 1}}>
        <AnterosSearchBox
          ref="search_box"
          /**
          * There many props that can customizable
          * Please scroll down to Props section
          */
        />

        {/* <AnterosAtoZList
          data={this.state.data}
          renderCell={this.renderRow}
          rowHeight={rowHeight}
          sectionHeaderHeight={40}
        /> */}
      </View>
    );
  }
}





 class InfiniteScrollViewExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Infinite scroll view',
     showBackButton: true
  };

  constructor(props) {
    super(props);
    this.fetchMore = this._fetchMore.bind(this);
    this.fetchData = this._fetchData.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.state = {
      dataSource: null,
      isLoading: true,
      isLoadingMore: false,
      _data: null,
      _dataAfter: '',
    };
  }

  _fetchData(callback) {
    const params = this.state._dataAfter !== ''
      ? `&after=${this.state._dataAfter}`
      : '';
    //Limits fetches to 15 so there's lesser items from the get go
    fetch(`https://www.reddit.com/subreddits/popular/.json?limit=15${params}`)
      .then(response => response.json())
      .then(callback)
      .catch(error => {
        console.error(error);
      });
  }

  _fetchMore() {
    this.fetchData(responseJson => {
      const data = this.state._data.concat(responseJson.data.children);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
        isLoadingMore: false,
        _data: data,
        _dataAfter: responseJson.data.after,
      });
    });
  }

  componentDidMount() {
    //Start getting the first batch of data from reddit
    this.fetchData(responseJson => {
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      });
      const data = responseJson.data.children;
      this.setState({
        dataSource: ds.cloneWithRows(data),
        isLoading: false,
        _data: data,
        _dataAfter: responseJson.data.after,
      });
    });
  }

  renderItem(rowData){
    return (
          <View style={styles.listItem}>
            <View style={styles.imageWrapper}>
              <Image
                style={{ width: 70, height: 70 }}
                source={{
                  uri: rowData.data.icon_img === '' ||
                    rowData.data.icon_img === null
                    ? 'https://via.placeholder.com/70x70.jpg'
                    : rowData.data.icon_img,
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>
                {rowData.data.display_name}
              </Text>
              <Text style={styles.subtitle}>
                {rowData.data.public_description}
              </Text>
            </View>
          </View>
        );
  }

  renderPage() {
      if (this.state.dataSource==null){
        return <View></View>
      } else {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderScrollComponent={props => <AnterosInfiniteScrollView {...props} />}
                renderRow={this.renderItem}   
                onLoadMoreAsync={this._fetchMore}  
                canLoadMore={true}               
            />
        );
    }
  }
}

const stylesInfinite = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d6d7da',
    padding: 6,
  },
  imageWrapper: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    margin: 6,
  },
  subtitle: {
    fontSize: 10,
    textAlign: 'left',
    margin: 6,
  },
});




const stylesAlv = {
    container: {
      flex: 1
    },
    header: {
      width,
      height: 80,
      padding: 20,
      justifyContent: 'flex-end',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderColor: 'lightgray',
      backgroundColor: 'whitesmoke'
    },
    headerSegment: {
      width,
      height: 60,
      flexDirection: 'row',
      alignItems: 'center'
    },
    row: {
      flex: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      shadowOffset: { width: 0, height: 0 },
      marginLeft: -1,
      marginRight: -1,
      marginTop: 0,
      marginBottom: 0,
      padding: 0
    },
    rowAndroid: {
      flex: 0,
      borderColor: 'gray',
      borderTopWidth: 0,
      borderBottomWidth: 1,
      shadowOffset: { width: 0, height: 0 },
      marginLeft: -1,
      marginRight: -1,
      marginTop: 0,
      marginBottom: 0,
      padding: 0
    },
    rowHeader: {
  
    },
    rowBody: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      height: height * 0.25,
      marginBottom: 0,
      backgroundColor: 'whitesmoke'
    },
    image: {
      flex: 1,
      height: height * 0.25,
      marginBottom: 0,
      resizeMode: 'cover',
      backgroundColor: 'whitesmoke'
    },
    rowFooter: {
      padding: 0
    },
    thumb: {
      width: 50,
      height: 50,
      borderRadius: 25
    },
    gridThumb: {
      alignSelf: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
      marginBottom: 10
    },
    cardTitle: {
      fontSize: 14
    },
    cardSubTitle: {
      marginTop: 3,
      fontSize: 11
    },
    rightBtnGroup: {
      flexDirection: 'row',
      width: '30%'
    },
    rightBtn: {
      margin: 0,
      padding: 5
    },
    rightBtnIcon: {
      color: 'dimgray'
    },
    gridText: {
      textAlign: 'center'
    },
    gridBorder: {
      justifyContent: 'center',
      alignItems: 'center',
      width: width / 3 - 10,
      height: width / 3 - 10,
      borderWidth: 0.5,
      borderColor: 'gray'
    }
  }



const { width, height } = Dimensions.get('window');

const logo = require('../images/default-portrait.png');

class FlatListItem extends PureComponent {
    constructor(props) {
      super(props)
    }
  
    render() {
      const rowID = this.props.index
      const rowData = this.props.item
      return (
        <ListItem thumbnail>
          <Left>
            {/* <Thumbnail square source={{uri:rowData.avatar}} style={stylesAlv.thumb} /> */}
          </Left>
          <Body style={{ borderBottomWidth: 0 }}>
            <Text>Id {rowData.id}</Text>
            <Text note>{rowData.firstName+' '+rowData.lastName}</Text>
          </Body>
          <Right style={{ borderBottomWidth: 0 }}>
            <View style={stylesAlv.rightBtnGroup}>
              <Button
                small
                transparent
                title="view"
                onPress={() => this.props.onPress('chat', rowID, rowData)}
                style={stylesAlv.rightBtn}
              >
                <Icon name="chatbubbles" style={stylesAlv.rightBtnIcon} />
              </Button>
              <Button
                small
                transparent
                title="view"
                onPress={() => this.props.onPress('like', rowID, rowData)}
                style={stylesAlv.rightBtn}
              >
                <Icon name="heart" style={stylesAlv.rightBtnIcon} />
              </Button>
              <Button
                small
                transparent
                title="view"
                onPress={() => this.props.onPress('share', rowID, rowData)}
                style={stylesAlv.rightBtn}
              >
                <Icon name="share" style={stylesAlv.rightBtnIcon} />
              </Button>
            </View>
          </Right>
        </ListItem>
      )
    }
  }


class FlatListGrid extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const rowID = this.props.index
    const rowData = this.props.item
    return (
      <TouchableOpacity onPress={() => this.props.onPress('GridView', rowID, rowData)}>
        <View style={{ margin: 0.5, width: width / 3, paddingBottom: 15 }}>
          {/* <Thumbnail square source={{uri:rowData.avatar}} style={stylesAlv.gridThumb} /> */}
          <AnterosText style={stylesAlv.gridText}>Id {rowData.id}</AnterosText>
          <AnterosText style={stylesAlv.gridText}>{rowData.firstName+' '+rowData.lastName}</AnterosText>
        </View>
      </TouchableOpacity>
    )
  }
}

class LoadingSpinner extends Component {
    static defaultProps = {
      width,
      height,
      spinnerColor: 'dimgray',
      textColor: 'dimgray',
      text: ''
    };

    render() {
      return (
        <View style={{ width: this.props.width, height: this.props.height, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={this.props.spinnerColor} />
          <View style={{ height: 10 }} />
          <AnterosText style={{ color: this.props.textColor }}>{this.props.text}</AnterosText>
        </View>
      )
    }
}

class AnterosListViewExample extends AnterosNavigationPage {

  static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Anteros listview',
      showBackButton: true
  };

  constructor(props) {
    super(props)
    this.renderControlTab = this.renderControlTab.bind(this);
    this.onChangeLayout = this.onChangeLayout.bind(this);
    this.onChangeScrollToIndex = this.onChangeScrollToIndex.bind(this);
    this.onPressItem = this.onPressItem.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.state = {
      layout: 'list',
      text: '',
      searchValue: ''
    }
  }

  onFetch = async (page = 1, startFetch, abortFetch) => {
    try {
      let pageLimit = 24
      if (this.state.layout === 'grid') pageLimit = 60
      const skip = (page - 1) * pageLimit

      let rowData = [];
      for (index = 0; index < pageLimit; index++) {
        let user = {id:(index+skip+1), 
          firstName:faker.name.firstName(),
          lastName:faker.name.lastName(),
          }
          rowData.push(user);
      }

      if (page === 10) {
        rowData = []
      }

      startFetch(rowData, pageLimit)
    } catch (err) {
      console.log(err);
      abortFetch() 
    }
  }

  onChangeLayout(index){
    this.setState({ text: '' })
    switch (index) {
      case 0:
        this.setState({ layout: 'list' })
        break
      case 1:
        this.setState({ layout: 'grid' })
        break
      default:
        break
    }
  }

  onChangeScrollToIndex(num){
    this.setState({ text: num })
    let index = num
    if (this.state.layout === 'grid') {
      index = num / 3
    }
    try {
      this.listView.scrollToIndex({ viewPosition: 0, index: Math.floor(index) })
    } catch (err) {
      console.warn(err)
    }
  }

  onPressItem(type, index, item){
    Alert.alert(type, `You're pressing on ${item}`)
  }

  sleep = time => new Promise(resolve => setTimeout(() => resolve(), time))

  renderItem(item, index, separator){
    if (this.state.layout === 'list') {
      return (
        <FlatListItem item={item} index={index} onPress={this.onPressItem} />
      )
    } else if (this.state.layout === 'grid') {
      return (
        <FlatListGrid item={item} index={index} onPress={this.onPressItem} />
      )
    }
    return null
  }

  renderControlTab(){
    return <AnterosSegmentedControl
            defaultPage={this.state.layout=='list'?0:1}
            onItemSelected={this.onChangeLayout}
            itemButtonViewStyle = {{
                width:200
            }}
            itemHeaderViewStyle = {{
                paddingVertical:10,
            }}
            ref = {e=>this.SegmentedControl=e}>
              <AnterosSegmentedControl.Item
                  title = {'list'}
              />
              <AnterosSegmentedControl.Item
                  title = {'grid'}
              />
          </AnterosSegmentedControl>
  }

  renderHeader = () => (
    <View>
      <View style={stylesAlv.header}>
        <AnterosText style={{ textAlign: 'center' }}>I am the Header View, you can put some Instructions or Ads Banner here!
        </AnterosText>
      </View>
      <View style={stylesAlv.headerSegment}>
        <Left style={{ flex: 0.15 }} />
        {this.renderControlTab()}
        <Right style={{ flex: 0.15 }} />
      </View>
    </View>
  )

  renderPaginationFetchingView = () => (
    <LoadingSpinner height={height * 0.2} text="loading..." />
  )

  onSearch(value){
    this.setState({...this.state,searchValue:value});
    this.listView.applyFilter();
  }
  onFilter(item){
    if (this.state.searchValue != '') {
        return (item.firstName.indexOf(this.state.searchValue)>=0);
    } else {
        return true;
    }
  }

  renderPage() {
    return (
      <View style={stylesAlv.container}>
          <AnterosSearchBox onSearch={this.onSearch}/>
          <AnterosListView
            ref={ref => this.listView = ref}
            key={this.state.layout} 
            onFetch={this.onFetch}
            keyExtractor={(item, index) => `${index} - ${item}`} 
            refreshableMode="advanced" 
            item={this.renderItem} 
            numColumns={this.state.layout === 'list' ? 1 : 3} 
            displayDate
            filter={this.onFilter}
            header={this.renderHeader}
            paginationFetchingView={this.renderPaginationFetchingView}
            paginationFetchingView={this.renderPaginationFetchingView}
            arrowImageStyle={{ width: 20, height: 20, resizeMode: 'contain' }}
            dateStyle={{ color: 'lightgray' }}
            refreshViewStyle={Platform.OS === 'ios' ? { height: 80, top: -80 } : { height: 80 }}
            refreshViewHeight={80}
          />
      </View>
    )
  }
}