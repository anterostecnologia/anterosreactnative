import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    Image,
    DeviceEventEmitter,
    ScrollView,
    ViewPropTypes,
    TouchableHighlight,
    AsyncStorage,
    Platform
} from 'react-native';
import emojiData from 'emoji-datasource';
import _ from 'lodash';
import {AnterosScrollableTabView} from '../TabView/AnterosScrollableTabView';
import splitter from './AnterosEmoticonsGraphemeSplitter';


const {height, width} = Dimensions.get('window');
require('string.fromcodepoint');

const parse = (text) => {
    _.each(emojiData, (value, key) => {
        var reg = new RegExp('\\[' + value.unified + '\\]', "g");
        const emoji = String.fromCodePoint(...value.unified.split('-').map(u => '0x' + u));
        if(text)
            text = text.replace(reg, emoji);
    });
    return text;
};

const stringify = (text) => {
    let result = '';
    _.each(emojiData, (value, key) => {
        const emoji = String.fromCodePoint(...value.unified.split('-').map(u => '0x' + u));
        const pointAt = emoji.codePointAt();
        emojiData[key].pointAt = pointAt;

    });

    const arr = _.toArray(text);

    _.each(arr, (value, key) => {
        const index = _.findIndex(emojiData, function (o) {
            return o.pointAt == value.codePointAt();
        });
        if (index > -1) {
            result += '[' + emojiData[index]['unified'] + ']';
        } else {
            result += value;
        }
    });

    return result;
};


var backImg = require('../../assets/images/backspace.png');

class WebViewPage extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'GreatGreatGreatGreat',
    });

    componentDidMount() {

    }

    componentWillMount() {
    }

    _onBackPress() {
        this.props.onBackPress();
    }

    render() {
        return (
            <View style={[stylesWV.container, Platform.OS === 'android' ? {marginTop: 21} : {marginTop: 21}]} visible='hidden'>
                <View style={stylesWV.toolbar}>
                    <TouchableOpacity
                        style={stylesWV.leftIOSContainer}
                        onPress={this._onBackPress.bind(this)}
                        >
                        <Image
                            style={stylesWV.leftIOS}
                            source={backImg}
                            />
                    </TouchableOpacity>

                    <View style={stylesWV.titleViewIOS}>
                        <TouchableOpacity style={stylesWV.titleViewIOSClick}>
                            <Text
                                style={stylesWV.titleIOS}
                                >
                                表情商城
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>
                <View style={stylesWV.content}>
                    <Text style={stylesWV.tip}>
                        Custom emoticons is on going
                    </Text>
                    <Text style={stylesWV.tip1}>
                        If you like this component, a star will be nice, thanks!
                    </Text>
                </View>

            </View>

        )
    }

}

const stylesWV = StyleSheet.create({
    container: {
        top: 0,
        height: height,
        width: width,
        backgroundColor: '#f0f0f0',
        flex: 1,
        zIndex: 10000
    },
    toolbar: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#eee',
        shadowColor: '#555',
        flexDirection: 'row',
        flexWrap: 'wrap',
        zIndex: 10
    },
    titleIOS: {
        textAlign: 'center',
        color: '#696969',
        fontWeight: 'bold',
        fontSize: 20,
    },
    leftIOSContainer: {
        width: 40,
        height: 35,
        justifyContent: 'center',
    },
    leftIOS: {
        marginLeft: 10
    },
    titleViewIOS: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 40
    },
    titleViewIOSClick: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 40
    },
    content: {
        alignItems: 'center',
        height: height,
        width: width
    },
    tip: {
        fontSize: 20,
        marginTop:30,
    },
    tip1: {
        fontSize: 12,
        position: 'absolute',
        textAlign: 'center',
        width: width,
        color: 'red',
        bottom: 100,
    }
});



const styles = StyleSheet.create({
    baseText: {
        fontSize: 13,
        color: '#4a4a4a',
        lineHeight: 18
    },
    dimText: {
        color: '#9b9b9b',
    },
    wvContainer:{
        backgroundColor: '#fff',
        height: height,
        width: width,
        position: 'absolute',
        bottom: 0,
        left:0,
        zIndex:1000
    },
    container: {
        backgroundColor: '#fff',
        height: 300,
        width: width,
        position: 'absolute',
        bottom: 0,
        left:0,
    },
    emoji: {
        textAlign: 'center',
        fontSize: 25,
        lineHeight: 30,
        color: '#rgba(0,0,0,1)'
    },
    emojiTouch:{
        width: (width-30)/6,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    delete:{
        right:0
    },
    scrollTable: {
        width: width
    },
    scrollGroupTable: {
        paddingBottom: 50
    },
    cateView: {
        flex: 1,
    },
    groupView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 0,
        width: 60,
        borderRightWidth: 1,
        borderColor: 'rgba(178,178,178,.3)',
        backgroundColor: '#fff'
    },
    tabs: {
        height: 40,
        width: width,
        flexDirection: 'row',
        borderWidth: 1,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopColor: 'rgba(178,178,178,0.3)',
        backgroundColor: 'rgba(255,255,255,1)',
    },
    tabsDot: {
        height: 40,
        width: width,
        flexDirection: 'row',
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    dot: {
        backgroundColor: '#f1f1f1',
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    backspace:{
        width:30,
        height:30,
        opacity: .5
    },
    plusButton: {
        width: 20,
        height: 20,
        opacity: 0.8
    }
});

const categories = ['People', 'Nature', 'Foods', 'Activity', 'Places', 'Objects', 'Symbols', 'Flags'];
const filters = ['white_frowning_face'];
const blockIconNum = 23;
let choiceness = ['grinning', 'grin', 'joy', 'sweat_smile', 'laughing', 'wink', 'blush', 'yum', 'heart_eyes', 'kissing_heart',
    'kissing_smiling_eyes', 'stuck_out_tongue_winking_eye', 'sunglasses', 'smirk', 'unamused', 'thinking_face',
    'flushed', 'rage', 'triumph', 'sob', 'mask', 'sleeping', 'zzz', 'hankey', 'ghost', '+1', '-1', 'facepunch', 'v',
    'ok_hank', 'muscle', 'pray', 'point_up', 'lips', 'womans_hat', 'purse', 'crown', 'dog', 'panda_face', 'pig',
    'earth_asia', 'cherry_blossom', 'sunny', 'thunder_cloud_and_rain', 'zap', 'snowflake', 'birthday', 'lollipop',
    'beers', 'popcorn', 'soccer', 'airplane', 'iphone', 'tada', 'heart', 'broken_heart', 'flag_us', 'flag_cn'];

const choicenessAndroid = ['grinning', 'grin', 'joy', 'sweat_smile', 'laughing', 'wink', 'blush', 'yum', 'heart_eyes', 'kissing_heart',
    'kissing_smiling_eyes', 'stuck_out_tongue_winking_eye', 'sunglasses', 'smirk', 'unamused',
    'flushed', 'rage', 'triumph', 'sob', 'mask', 'sleeping', 'zzz', 'hankey', 'ghost', '+1', '-1', 'facepunch', 'v',
    'ok_hank', 'muscle', 'pray', 'point_up', 'lips', 'womans_hat', 'purse', 'crown', 'dog', 'panda_face', 'pig',
    'earth_asia', 'cherry_blossom', 'sunny', 'thunder_cloud_and_rain', 'zap', 'snowflake', 'birthday', 'lollipop',
    'beers', 'soccer', 'airplane', 'iphone', 'tada', 'heart', 'broken_heart', 'flag_us', 'flag_cn'];

const HISTORY_STORAGE = 'history_storage';
class AnterosEmoticons extends React.Component {
    constructor(props) {
        super(props);
        this._classify = this._classify.bind(this);
        this._onEmoticonPress = this._onEmoticonPress.bind(this);
        this.state = {
            data: [],
            groupIndex: Platform.OS === 'android' ? 0 : 1,
            showWV: false,
            position: new Animated.Value(this.props.show ? 0 : -300),
            wvPosition: new Animated.Value(-height),
            history: [],
            currentMainTab: 0,
            currentDotTab: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        };
        Platform.OS === 'android' ? choiceness = choicenessAndroid : '';
    }

    static defaultProps = {
        show: false,
        concise: true,
        showHistoryBar: true,
        asyncRender: false
    };

    componentDidMount() {
        AsyncStorage.getItem(HISTORY_STORAGE, (err, result)=> {
            if (result) {
                this.setState({history: JSON.parse(result)});
            }
        });
    }

    componentWillMount() {

        if (this.props.showHistoryBar) {
            this.setState({groupIndex: this.state.groupIndex++});
            this.setState({currentMainTab: ++this.state.currentMainTab});
        }
        this._classify();
    }

    componentDidUpdate() {
        Animated.timing(
            this.state.position,
            {
                duration: 300,
                toValue: this.props.show ? 0 : -300
            }
        ).start();
        Animated.timing(
            this.state.wvPosition,
            {
                duration: 300,
                toValue: this.state.showWV ? 0 : -height
            }
        ).start();
    }

    _charFromCode(utf16) {
        return String.fromCodePoint(...utf16.split('-').map(u => '0x' + u));
    }

    _classify() {
        let filteredData = emojiData.filter(e=> !_.includes(filters, e.short_name));
        let sortedData = _.orderBy(filteredData, 'sort_order');
        let groupedData = _.groupBy(sortedData, 'category');

        if (this.props.concise) {
            filteredData = emojiData.filter(e=> _.includes(choiceness, e.short_name));
            const temp = [];
            _.mapKeys(filteredData, (value)=> {
                temp.push({
                    code: this._charFromCode(value.unified),
                    name: value.short_name
                });
            });
            _.each(choiceness, (value)=> {
                const one = temp.filter(e=> _.includes([value], e.name));
                if (one[0])
                    this.state.data.push(one[0]);
            });
        } else {
            this.state.data = _.mapValues(groupedData, group => group.map((value)=> {
                return {
                    code: this._charFromCode(value.unified),
                    name: value.short_name
                }
            }));
        }

    }

    _onChangeTabMain(data) {
        this.setState({currentMainTab: data.i});
    }

    _onChangeTabDot(data) {
        this.state.currentDotTab[this.state.currentMainTab] = data.i;
        this.setState({currentDotTab: this.state.currentDotTab});
    }

    _onEmoticonPress(val) {
        if (this.props.onEmoticonPress) {
            this.props.onEmoticonPress(val);
            this._history(val);
        }
    }

    _onBackspacePress() {
        if (this.props.onBackspacePress)
            this.props.onBackspacePress();
    }

    _onCloseWV() {
        this.setState({showWV: false});
    }

    _history(val) {
        //AsyncStorage.removeItem(HISTORY_STORAGE);
        AsyncStorage.getItem(HISTORY_STORAGE, (err, result)=> {
            let value = _.clone(val);
            if (result) {
                result = JSON.parse(result);
                valIndex = _.find(result, value);
                if (valIndex) {
                    valIndex.freq++;
                    _.remove(result, {name: valIndex.name});
                    result.push(valIndex);
                } else {
                    value.freq = 1;
                    result.push(value);
                }
            }
            result = _.reverse(_.sortBy(result, [function (o) {
                return o.freq;
            }]));
            AsyncStorage.setItem(HISTORY_STORAGE, JSON.stringify(result));
            this.setState({history: result});
        });
    }

    render() {

        const the = this;
        let groupIndex = 0;
        let group = emoji => {
            if (this.props.asyncRender && this.state.currentMainTab !== groupIndex) {
                groupIndex++;
                return [];
            }
            groupIndex++;

            let groupView = [];
            if (!emoji)
                return groupView;
            const blocks = Math.ceil(emoji.length / blockIconNum);
            for (let i = 0; i < blocks; i++) {
                let ge = _.slice(emoji, i * blockIconNum, (i + 1) * blockIconNum);
                groupView.push(
                    <View style={styles.groupView} key={emoji[0]['name']+'block'+i}
                          tabLabel={emoji[0]['name']+'block'+i}>
                        {
                            ge.map((value, key) => {
                                if ((this.props.asyncRender && this.state.currentDotTab[this.state.currentMainTab] == i)
                                    || !this.props.asyncRender)
                                    return (
                                        <TouchableHighlight
                                            underlayColor={'#f1f1f1'}
                                            onPress={()=>this._onEmoticonPress(value)}
                                            style={styles.emojiTouch}
                                            key={Math.random()+value.name}
                                            >
                                            <Text
                                                style={styles.emoji}
                                                >
                                                {value.code}
                                            </Text>
                                        </TouchableHighlight>

                                    );

                            })
                        }
                        {
                            (this.props.asyncRender && this.state.currentDotTab[this.state.currentMainTab] == i)
                            || !this.props.asyncRender ? (<TouchableOpacity
                                onPress={()=>this._onBackspacePress()}
                                style={[styles.emojiTouch, styles.delete]}
                                >
                                <Image
                                    resizeMode={'contain'}
                                    style={styles.backspace}
                                    source={require('../../assets/images/backspace.png')}/>
                            </TouchableOpacity>) : null
                        }


                    </View>
                );
            }
            return groupView;
        };


        let groupsView = [];
        

        const histroyView = group(the.state.history);
        const history = <View
            tabLabel={'history'}
            style={styles.cateView}
            key={'0_history'}
            >
            <AnterosScrollableTabView
                tabBarPosition='bottom'
                renderTabBar={() => <TabBarDot {...the.props} />}
                onChangeTab={this._onChangeTabDot.bind(this)}
                initialPage={0}
                tabBarActiveTextColor="#fc7d30"
                style={styles.scrollGroupTable}
                tabBarUnderlineStyle={{backgroundColor:'#fc7d30',height: 2}}
                >
                {
                    histroyView
                }
            </AnterosScrollableTabView>
        </View>;
        if (this.props.showHistoryBar) {
            groupsView.push(history);
        }

        if (this.props.concise) {
            const groupView = group(the.state.data);

            groupsView.push(
                <View
                    tabLabel={the.state.data[0]['code']}
                    style={styles.cateView}
                    key={the.state.data[0]['name']}
                    >
                    <AnterosScrollableTabView
                        tabBarPosition='bottom'
                        renderTabBar={() => <TabBarDot {...the.props} />}
                        onChangeTab={this._onChangeTabDot.bind(this)}
                        initialPage={0}
                        tabBarActiveTextColor="#fc7d30"
                        style={styles.scrollGroupTable}
                        tabBarUnderlineStyle={{backgroundColor:'#fc7d30',height: 2}}
                        >
                        {
                            groupView
                        }
                    </AnterosScrollableTabView>

                </View>
            );
        } else {
            _.each(categories, (value, key)=> {
                const groupView = group(the.state.data[value]);
                if (groupView.length >= 0) {
                    groupsView.push(
                        <View
                            tabLabel={the.state.data[value][0]['code']}
                            style={styles.cateView}
                            key={value}
                            >
                            <AnterosScrollableTabView
                                tabBarPosition='bottom'
                                renderTabBar={() => <TabBarDot {...the.props}/>}
                                onChangeTab={this._onChangeTabDot.bind(this)}
                                initialPage={0}
                                tabBarActiveTextColor="#fc7d30"
                                style={styles.scrollGroupTable}
                                tabBarUnderlineStyle={{backgroundColor:'#fc7d30',height: 2}}
                                >
                                {
                                    groupView
                                }
                            </AnterosScrollableTabView>

                        </View>
                    );
                }
            });
        }


        return (
            (!this.state.showWV) ?
                <Animated.View style={[this.props.style,styles.container,{bottom: this.state.position}]}>
                    <AnterosScrollableTabView
                        tabBarPosition='overlayBottom'
                        renderTabBar={() => <TabBar {...this.props}/>}
                        initialPage={this.state.groupIndex}
                        onChangeTab={this._onChangeTabMain.bind(this)}
                        tabBarActiveTextColor="#fc7d30"
                        style={styles.scrollTable}
                        tabBarUnderlineStyle={{backgroundColor:'#fc7d30',height: 2}}
                        >
                        {groupsView}
                    </AnterosScrollableTabView>

                </Animated.View> :
                <Animated.View style={[styles.wvContainer,{bottom: this.state.wvPosition}]}>
                    <WebViewPage onBackPress={this._onCloseWV.bind(this)}/>
                </Animated.View>
        );
    }
}

AnterosEmoticons.propTypes = {
    onEmoticonPress: PropTypes.func.isRequired,
    onBackspacePress: PropTypes.func,
    style: ViewPropTypes.style,
    show: PropTypes.bool,
    concise: PropTypes.bool,
    showHistoryBar: PropTypes.bool,
    asyncRender: PropTypes.bool
};




class TabBar extends React.Component {
    constructor(props) {
        super(props);
        this._setAnimationValue = this._setAnimationValue.bind(this);

        this.state = {
            cameraPressed: false
        };
        this.tabComponent = [];
    }


    static propTypes = {
        goToPage: PropTypes.func,
        activeTab: PropTypes.number,
        tabs: PropTypes.array,
    };

    componentDidMount() {
        this._listener = this.props.scrollValue.addListener(this._setAnimationValue);
        if (Platform.OS === 'android')
            setTimeout(()=>{
                this.props.goToPage(this.props.activeTab+1);
            },100)
    }

    componentWillUpdate(){

    }

    _setAnimationValue({ value, }) {
    }


    _onIconPress(i) {
        this.props.goToPage(i);
        if (Platform.OS === 'android' && this.props.asyncRender)
            DeviceEventEmitter.emit('tabChanged', i);
    }


    componentWillReceiveProps() {
    }

    render() {
        return (
            <View style={[styles.tabs, this.props.style, ]}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {this.props.tabs.map((tab, i) => {
                        if(tab === 'history'){
                            return <TouchableOpacity ref={(component) => this.tabComponent.push(component)}
                                                     key={tab} onPress={() => this._onIconPress(i)}
                                                     style={[styles.tab,{backgroundColor: (this.props.activeTab === i? '#f1f1f1': '#fff')}]}>
                                <Image
                                    resizeMode={'contain'}
                                    style={styles.plusButton}
                                    source={require('../../assets/images/history.png')}/>
                            </TouchableOpacity>;
                        }

                        return <TouchableOpacity ref={(component) => this.tabComponent.push(component)}
                                                 key={tab} onPress={() => this._onIconPress(i)}
                                                 style={[styles.tab,{backgroundColor: (this.props.activeTab === i? '#f1f1f1': '#fff')}]}>
                            <Text style={styles.emoji }>{this.props.tabs[i]}</Text>
                        </TouchableOpacity>;
                    })}
                </ScrollView>

            </View>);
    }
}


class TabBarDot extends React.Component {
    constructor(props) {
        super(props);
        this._setAnimationValue = this._setAnimationValue.bind(this);

        this.state = {
            cameraPressed: false
        };
        this.tabComponent = [];
    }


    static propTypes = {
        goToPage: PropTypes.func,
        activeTab: PropTypes.number,
        tabs: PropTypes.array,
    };

    componentDidMount() {
        const the = this;
        this._listener = this.props.scrollValue.addListener(this._setAnimationValue);

        DeviceEventEmitter.addListener('tabChanged',(tab)=>{
            the.props.goToPage(0);

        });
    }

    _setAnimationValue({ value, }) {
    }


    _onIconPress(i) {
        this.props.goToPage(i);
    }

    componentWillReceiveProps(){
    }

    componentDidUpdate(){
        
    }

    render() {
        return (<View style={[styles.tabsDot, this.props.style, ]}>
            {this.props.tabs.map((tab, i) => {
                return <TouchableOpacity ref={(component) => this.tabComponent.push(component)}
                                         key={tab} onPress={() => this._onIconPress(i)}
                                         style={[styles.tabDot,{backgroundColor: (this.props.activeTab === i? '#ccc': '#fff')}]}>
                    <View style={styles.dot}></View>
                </TouchableOpacity>;
            })}
        </View>);
    }
}


export {
    AnterosEmoticons,
    stringify as stringify,
    parse as parse,
    splitter as splitter
}