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
import {AnterosButton, AnterosNavigationPage, AnterosLabel, AnterosListRow, AnterosText,
    AnterosImage, AnterosFlipCard, AnterosCard, AnterosCardSection, AnterosSocialBar,
    AnterosCreditCard, AnterosSwiper} from 'anteros-react-native';
import {data} from './data';
const window = Dimensions.get('window');

export default class CardExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Cards',
        showBackButton: true
    };
    constructor(props) {
        super(props);
        this.card1 = this
            .card1
            .bind(this);
        this.card2 = this
            .card2
            .bind(this);    
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

    card1() {
        this
            .navigator
            .push({view: <FlipCardExample/>})
    }

    card2() {
        this
            .navigator
            .push({view: <CreditCardExample/>})
    }

    renderPage() {
        return (
            <ScrollView style={{
                flex: 1
            }}>
                <View style={{
                    height: 20
                }}/>
                <AnterosListRow title='Flip card' onPress={this.card1} topSeparator='full'/>
                <AnterosListRow title='Credit card' onPress={this.card2} topSeparator='full'/>
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

class FlipCardExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Flip card',
        showBackButton: true
    };

    constructor(props) {
        super(props)
        this.state = {
            flip: false
        }
        this.item = data.getArticles()[0];
    }
    renderPage() {
        return (
            <View style={stylesCard.container}>
                <ScrollView>
                    <View>
                        <AnterosText style={stylesCard.welcome}>Minimal</AnterosText>
                        <AnterosFlipCard
                            style={{
                            marginBottom: 5
                        }}>
                            {/* Face Side */}
                            <View style={stylesCard.face}>
                                <AnterosText>The Face</AnterosText>
                            </View>
                            {/* Back Side */}
                            <View style={stylesCard.back}>
                                <AnterosText>The Back</AnterosText>
                            </View>
                        </AnterosFlipCard>

                        <AnterosText style={stylesCard.welcome}>Customized</AnterosText>
                        <AnterosFlipCard
                            flip={this.state.flip}
                            friction={6}
                            perspective={1000}
                            flipHorizontal={true}
                            flipVertical={false}
                            clickable={true}
                            style={stylesCard.card}
                            alignHeight={true}
                            onFlipEnd={(isFlipEnd) => {
                            console.log('isFlipEnd', isFlipEnd)
                        }}>
                            {/* Face Side */}
                            <View style={stylesCard.face}>
                                <AnterosText>The Face</AnterosText>
                            </View>
                            {/* Back Side */}
                            <View style={stylesCard.back}>
                                <AnterosCard
                                    height={225}
                                    imageOverlay={this.item.photo}
                                    style={stylesCard.card}
                                    showBorder={false}
                                    showShadow={false}>
                                    <AnterosCardSection style={stylesCard.cardSection} overlay height={225}>
                                        <AnterosLabel style={stylesCard.title}>{this.item.header}</AnterosLabel>
                                        <AnterosLabel style={stylesCard.time}>{moment()
                                                .add(this.item.time, 'seconds')
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
                            </View>
                        </AnterosFlipCard>
                    </View>

                    <View>
                        <TouchableOpacity
                            style={stylesCard.button}
                            onPress={() => {
                            this.setState({
                                flip: !this.state.flip
                            })
                        }}>
                            <AnterosText style={stylesCard.buttonText}>Flip</AnterosText>
                        </TouchableOpacity>
                    </View>

                    <View>
                        {CARDS.map(createCard)}
                    </View>

                </ScrollView>
            </View>
        )
    }
}

var CARDS = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
]

var createCard = (val, i) => <MyFlipCard key={i} val={val}/>

class MyFlipCard extends PureComponent {
    shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    render() {
        return (
            <View style={{
                margin: 3
            }}>
                <AnterosFlipCard style={stylesCard.card}>
                    {/* Face Side */}
                    <View style={stylesCard.face}>
                        <AnterosText>Card {this.props.val}</AnterosText>
                    </View>
                    {/* Back Side */}
                    <View style={stylesCard.back}>
                        <AnterosText>The back side</AnterosText>
                    </View>
                </AnterosFlipCard>
            </View>
        )
    }
}




const stylesCard = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        marginTop: 20
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    card: {
        height: 225,
        width: window.width-40
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
      },
    face: {
        flex: 1,
        backgroundColor: '#2ecc71',
        justifyContent: 'center',
        alignItems: 'center'
    },
    back: {
        flex: 1,
        backgroundColor: '#f1c40f',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 100,
        height: 30,
        marginTop: 30,
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 3,
        borderWidth: 1,
        backgroundColor: '#007AFF',
        borderColor: 'transparent'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center'
    },
    img: {
        flex: 1,
        height: 64
    }
});



const SWIPER_HEIGHT = 180;



class CreditCardExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Credit card',
        showBackButton: true
    };

    constructor(props) {
        super(props);
        this.state = {
            focused: 'name',
            number: '',
            name: '',
            cvc: '',
            expiry: '',
            index: 0,
            type: 'visa'
        }
    }

    onNext() {
        this.swiper.scrollBy(1);
    }

    componentDidMount() {
        this.refs['number'].focus();
    }

    componentWillMount() {
        
    }

    onMomentumScrollEnd(e, state, context) {
        var indexMap = [
            'number',
            'name',
            'expiry',
            'cvc',
            'type',
        ];
        this.setState({
            index: state.index,
            focused: indexMap[state.index]
        }, () => {
            try {
                this.refs[indexMap[state.index]].focus();
            } catch(e) {

            }
        });
    }

    renderPage() {
        var cardTypes = []; 
        for (var key in AnterosCreditCard.CardImages) {
            cardTypes.push({type: key, image: AnterosCreditCard.CardImages[key]});
        }
        if (this.state.restoring) {
            return null;
        }
        return (
            <View style={stylesCredCard.container}>
                <AnterosCreditCard
                    style={{marginVertical: 10, marginHorizontal: 10, marginBottom: 0, elevation: 3, alignSelf: 'center'}}
                    imageFront={require('../images/card-front.png')}
                    imageBack={require('../images/card-back.png')}
                    shiny={false}
                    bar={false}
                    focused={this.state.focused}
                    number={this.state.number}
                    name={this.state.name}
                    expiry={this.state.expiry}
                    cvc={this.state.cvc}/>
                
                <AnterosSwiper 
                    style={styles.wrapper} 
                    height={SWIPER_HEIGHT} 
                    showsButtons={false}
                    onMomentumScrollEnd = {this.onMomentumScrollEnd.bind(this)} 
                    ref={(swiper) => {this.swiper = swiper}}
                    index={this.state.index}>
                    <View style={stylesCredCard.slide}>
                        <View style={stylesCredCard.card}>
                            <AnterosText style={stylesCredCard.textNumber}>CARD NUMBER</AnterosText>
                            <TextInput ref="number" autoFocus={true} value={this.state.number} onChangeText={(number) => this.setState({number})}/>
                        </View>
                    </View>
                    <View style={stylesCredCard.slide}>
                        <View style={stylesCredCard.card}>
                            <Text style={stylesCredCard.textName}>CARD HOLDER'S NAME</Text>
                            <TextInput ref="name" value={this.state.name} onChangeText={(name) => this.setState({name})}/>
                        </View>
                    </View>
                    <View style={stylesCredCard.slide}>
                        <View style={stylesCredCard.card}>
                            <Text style={stylesCredCard.textName}>EXPIRY</Text>
                            <TextInput ref="expiry" value={this.state.expiry} onChangeText={(expiry) => this.setState({expiry})}/>
                        </View>
                    </View>
                    <View style={stylesCredCard.slide}>
                        <View style={stylesCredCard.card}>
                            <Text style={stylesCredCard.textCvc}>CVV/CVC NUMBER</Text>
                            <TextInput ref="cvc" value={this.state.cvc} onChangeText={(cvc) => this.setState({cvc})}/>
                        </View>
                    </View>
                    <View style={stylesCredCard.slide}>
                        <View style={stylesCredCard.card}>
                            <Text style={stylesCredCard.textNumber}>CARD TYPE</Text>
                            <View style={{flexDirection: 'row'}}>
                                {cardTypes.map((cardType) => {
                                    return (
                                        <TouchableOpacity key={cardType.type} onPress={() => this.setState({type: cardType.type})}>
                                            <View>
                                                <Image source={{uri: cardType.image}} style={{width: 57, height: 35, marginHorizontal: 5}} />
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    </View>
                </AnterosSwiper>
                <TouchableOpacity onPress={this.onNext.bind(this)}>
                    <View style={stylesCredCard.button}>
                        <Text style={stylesCredCard.textButton}>NEXT</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}


const stylesCredCard = StyleSheet.create({    
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1,
        paddingTop: 30
    },
    wrapper: {
        height: SWIPER_HEIGHT,
    },
    slide: {
        height: SWIPER_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        
    },
    card: {
        marginHorizontal: 10,
        marginBottom: 30,
        backgroundColor: '#fff',
        borderRadius: 3,
        elevation: 3,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ddd',
        padding: 10,
    },
    button: {
        height: 40,
        backgroundColor: '#1ba549',
        justifyContent: 'center',
    },
    textButton: {
        textAlign: 'center',
        color: '#fff'
    }

});