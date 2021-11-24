//https://github.com/jmurzy/react-native-foldview

import {Component} from 'react';
import {Platform, ScrollView, StatusBar, StyleSheet, View, UIManager, TouchableHighlight, Text, LayoutAnimation} from 'react-native';
import {AnterosFoldView, AnterosSpacer, AnterosNavigationPage} from 'anteros-react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios'
    ? 20
    : 0;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        backgroundColor: '#4A637D',
        flex: 1,
        padding: 10,
        paddingTop: STATUSBAR_HEIGHT
    }
});

export class FoldViewExample extends AnterosNavigationPage {
    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Foldview',
        showBackButton: true
    };

    constructor(props) {
        super(props);
    }

    renderPage() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Row zIndex={100}/>
                    <Row zIndex={90}/>
                    <Row zIndex={80}/>
                    <Row zIndex={70}/>
                </ScrollView>
            </View>
        );
    }
}

if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ROW_HEIGHT = 180;

class Row extends Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            height: ROW_HEIGHT
        };
    }

    UNSAFE_componentWillMount() {
        this.flip = this
            .flip
            .bind(this);
        this.handleAnimationStart = this
            .handleAnimationStart
            .bind(this);
        this.renderFrontface = this
            .renderFrontface
            .bind(this);
        this.renderBackface = this
            .renderBackface
            .bind(this);
    }

    flip() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    handleAnimationStart(duration, height) {
        const isExpanding = this.state.expanded;

        const animationConfig = {
            duration,
            update: {
                type: isExpanding
                    ? LayoutAnimation.Types.easeOut
                    : LayoutAnimation.Types.easeIn,
                property: LayoutAnimation.Properties.height
            }
        };

        LayoutAnimation.configureNext(animationConfig);

        this.setState({height});
    }

    renderFrontface() {
        return (<InfoCard onPress={this.flip}/>);
    }

    renderBackface() {
        return (<ProfileCard onPress={this.flip}/>);
    }

    render() {
        const {height} = this.state;
        const {zIndex} = this.props;

        const spacerHeight = height - ROW_HEIGHT;

        return (
            <View style={{
                flex: 1,
                zIndex
            }}>
                <View
                    style={{
                    height: ROW_HEIGHT,
                    margin: 10
                }}>
                    <AnterosFoldView
                        expanded={this.state.expanded}
                        onAnimationStart={this.handleAnimationStart}
                        perspective={1000}
                        renderBackface={this.renderBackface}
                        renderFrontface={this.renderFrontface}>
                        <PhotoCard onPress={this.flip}/>
                    </AnterosFoldView>
                </View>
                <AnterosSpacer height={spacerHeight}/>
            </View>
        );
    }
}

const Line = ({style, onPress}) => {
    if (onPress) {
        return (
            <TouchableHighlight
                style={[
                {
                    marginBottom: 10,
                    borderRadius: 2
                },
                style
            ]}
                onPress={onPress}>
                <View/>
            </TouchableHighlight>
        );
    }

    return (<View
        style={[
        {
            marginBottom: 10
        },
        style
    ]}/>);
};

const ThinLine = ({
    color,
    width = 60,
    ...props
}) => (<Line
    style={{
    width,
    backgroundColor: color,
    height: 10
}}
    {...props}/>);

const ThickLine = ({
    color,
    width = 70,
    ...props
}) => (<Line
    style={{
    width,
    backgroundColor: color,
    height: 20
}}
    {...props}/>);

const ThinGrayLine = (props) => (<ThinLine color={'#BDC2C9'} {...props}/>);

const ThickGrayLine = (props) => (<ThickLine color={'#BDC2C9'} {...props}/>);

const ThickWhiteLine = (props) => (<ThickLine color={'#FFFFFF'} {...props}/>);

const ThickDarkGrayLine = (props) => (<ThickLine color={'#33373B'} {...props}/>);

const ThinRedLine = (props) => (<ThinLine color={'#DB0000'} {...props}/>);

const stylesInfoCard = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    leftPane: {
        flex: 1,
        backgroundColor: '#33373B',
        padding: 16,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    rightPane: {
        flex: 2,
        padding: 16,
        backgroundColor: '#fff'
    }
});

class InfoCard extends Component {
    render() {
        return (
            <View style={stylesInfoCard.container}>
                <View style={stylesInfoCard.leftPane}>
                    <ThickGrayLine/>
                    <View>
                        <ThinRedLine onPress={this.props.onPress}/>
                        <ThickGrayLine width={80}/>
                    </View>
                </View>

                <View style={stylesInfoCard.rightPane}>
                    <View
                        style={{
                        flex: 1,
                        flexDirection: 'column'
                    }}>
                        <ThickGrayLine width={140}/>
                        <ThickGrayLine width={160}/>
                    </View>
                    <View
                        style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1
                        }}>
                            <ThinGrayLine width={60}/>
                            <ThickDarkGrayLine width={60}/>
                        </View>

                        <View style={{
                            flex: 1
                        }}>
                            <ThinGrayLine width={60}/>
                            <ThickDarkGrayLine width={60}/>
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}

const stylesPhotoCard = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#33373B',
        padding: 10,
        flexDirection: 'column'
    },
    card: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'flex-end'
    }
});

class PhotoCard extends Component {
    render() {
        return (
            <View style={stylesPhotoCard.container}>
                <View
                    style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#5A4A9C',
                    height: 40,
                    padding: 10
                }}>
                    <ThickWhiteLine width={40} onPress={this.props.onPress}/>
                    <ThickWhiteLine width={60}/>
                    <ThickWhiteLine width={40}/>
                </View>

                <View style={stylesPhotoCard.card}>
                    <View
                        style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 10,
                        paddingBottom: 0
                    }}>
                        <ThinGrayLine width={40}/>
                        <ThinGrayLine width={80}/>
                        <ThinGrayLine width={50} onPress={this.props.onPress}/>
                    </View>
                </View>
            </View>
        );
    }
}

class ProfileCard extends Component {
    UNSAFE_componentWillMount() {
        this.renderBackface = this
            .renderBackface
            .bind(this);
        this.renderInnerBackFace = this
            .renderInnerBackFace
            .bind(this);
    }

    renderBlankFace() {
        return (<View
            style={{
            backgroundColor: '#D6EFFF',
            flex: 1
        }}/>);
    }

    renderBackface() {
        const onPress = this.props.onPress;
        return (
            <View style={{
                flex: 1
            }}>
                <AnterosFoldView
                    renderFrontface={this.renderBlankFace}
                    renderBackface={this.renderInnerBackFace}>
                    <AdditionalInfoCard onPress={this.props.onPress}/>
                </AnterosFoldView>
            </View>
        );
    }

    renderInnerBackFace() {
        const onPress = this.props.onPress;
        return (
            <View
                style={{
                backgroundColor: '#fff',
                flex: 1,
                borderTopWidth: StyleSheet.hairlineWidth,
                borderTopColor: '#BDC2C9',
                borderBottomLeftRadius: 2,
                borderBottomRightRadius: 2
            }}>
                <View
                    style={{
                    backgroundColor: '#FFBD18',
                    flex: 1,
                    margin: 14,
                    borderRadius: 2
                }}>
                    <TouchableHighlight
                        style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                        onPress={onPress}>
                        <Text>
                            PRESS ME
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    render() {
        const onPress = this.props.onPress;

        return (
            <View
                style={{
                flex: 1,
                backgroundColor: '#fff',
                flexDirection: 'column'
            }}>
                <View style={{
                    flex: 1
                }}>
                    <View
                        style={{
                        flex: 1,
                        paddingBottom: 10,
                        padding: 16
                    }}>
                        <ThinGrayLine width={120}/>
                        <View
                            style={{
                            marginTop: 10,
                            flexDirection: 'row'
                        }}>
                            <TouchableHighlight onPress={this.props.onPress}>
                                <View
                                    style={{
                                    width: 40,
                                    height: 40,
                                    marginRight: 10,
                                    backgroundColor: '#BDC2C9'
                                }}/>
                            </TouchableHighlight>
                            <View
                                style={{
                                flex: 1,
                                flexDirection: 'column'
                            }}>
                                <ThickDarkGrayLine width={200}/>
                                <ThinGrayLine width={120}/>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        flex: 1
                    }}>
                        <AnterosFoldView
                            renderFrontface={this.renderBlankFace}
                            renderBackface={this.renderBackface}>
                            <ProfileDetailCard onPress={this.props.onPress}/>
                        </AnterosFoldView>
                    </View>
                </View>
            </View>
        );
    }
}

const stylesDetailCard = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#BDC2C9'
    }
});

class ProfileDetailCard extends Component {
    render() {
        return (
            <View style={stylesDetailCard.container}>
                <View style={{
                    flex: 1
                }}>
                    <ThickGrayLine width={60}/>
                    <ThinGrayLine width={120}/>
                </View>

                <View style={{
                    flex: 1
                }}>
                    <ThickGrayLine width={60} onPress={this.props.onPress}/>
                    <ThinGrayLine width={120}/>
                </View>
            </View>
        );
    }
}

class AdditionalInfoCard extends Component {
    render() {
        return (
            <View
                style={{
                flex: 1,
                paddingTop: 10,
                paddingHorizontal: 16,
                flexDirection: 'row',
                backgroundColor: '#FFFFFF',
                borderTopWidth: StyleSheet.hairlineWidth,
                borderTopColor: '#BDC2C9'
            }}>
                <View style={{
                    flex: 1
                }}>
                    <ThickDarkGrayLine width={100}/>
                    <ThinGrayLine width={80} onPress={this.props.onPress}/>
                </View>
                <View style={{
                    flex: 1
                }}>
                    <ThickDarkGrayLine width={60}/>
                    <ThinGrayLine width={120}/>
                </View>

            </View>
        );
    }
}
