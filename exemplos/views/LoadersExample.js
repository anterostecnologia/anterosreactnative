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
    AnterosNavigationPage,
    AnterosListRow,
    AnterosText,
    AnterosImage,
    AnterosBouncingPreloader,
    AnterosLoader,
    AnterosTheme
} from 'anteros-react-native';
import GridListExample from './GridListExample';
import {data} from './data';
import ArticlesExamples from './ArticlesExample';
import PulseLoaderExample from './PulseLoaderExample';
import ContentLoaderExample from './ContentLoaderExample';


const window = Dimensions.get('window');


export default class LoadersExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Loaders',
        showBackButton: true
    };
    constructor(props) {
        super(props);
        this.loader1 = this
            .loader1
            .bind(this);          
        this.loader2 = this
            .loader2
            .bind(this);     
        this.loader3 = this
            .loader3
            .bind(this);     
        this.loader4 = this
            .loader4
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

    loader1() {
        this
            .navigator
            .push({view: <LoadersExample1/>})
    }

    loader2() {
        this
            .navigator
            .push({view: <PulseLoaderExample/>})
    }

    loader3() {
        this
            .navigator
            .push({view: <ContentLoaderExample/>})
    }

    loader4() {
        this
            .navigator
            .push({view: <BouncingLoader/>})
    }


    renderPage() {
        return (
            <ScrollView style={{
                flex: 1
            }}>
                <View style={{
                    height: 20
                }}/>
                <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                        iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='spinner' 
                        title='Loaders' onPress={this.loader1} topSeparator='full'/>
                <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                        iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='spinner' 
                        title='Pulse loader' onPress={this.loader2} topSeparator='full'/>
                <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                        iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='spinner'  
                        title='Content loader' onPress={this.loader3} topSeparator='full'/>
                <AnterosListRow iconStyle={{paddingRight: 8}} iconType='font-awesome' 
                        iconSize={24} iconColor={AnterosTheme.primaryColor} iconName='spinner'  
                        title='Bouncing loader' onPress={this.loader4} topSeparator='full'/>        
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



class LoadersExample1 extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Loaders',
        showBackButton: true
    };

    renderPage(){
        return <ScrollView >
                    <View style={styles.container}>
                        <View>
                            <AnterosLoader.Breathing size={30} color={'#1e90ff'} strokeWidth={3} frequency={800}/>
                            <AnterosText>{'Breathing'}</AnterosText>
                        </View>
                        <View> 
                            <AnterosLoader.Bubbles color={'#1e90ff'} dotRadius={10} size={40}/>
                            <AnterosText>{'Bubbles'}</AnterosText>
                        </View>
                    </View>
                    <View style={styles.container}>    
                        <View>
                            <AnterosLoader.Circles color={'#1e90ff'} dotRadius={8} size={40}/>
                            <AnterosText>{'Circles'}</AnterosText>
                        </View>
                        <View>
                            <AnterosLoader.RotationCircleScale size={50} color={'#1e90ff'}/>
                            <AnterosText>{'RotationCircleScale'}</AnterosText>
                        </View>
                    </View>     
                    <View style={styles.container}>    
                        <View>
                            <AnterosLoader.ColorDots size={15} betweenSpace={7} color1={'#ff4500'} color2={'#ffd700'} color3={'#9acd32'}/>
                            <AnterosText>{'ColorDots'}</AnterosText>
                        </View>
                        <View>
                            <AnterosLoader.Dots color={'#1e90ff'} size={10} betweenSpace={5}/>
                            <AnterosText>{'Dots'}</AnterosText>
                        </View>
                    </View> 
                    
                    <View style={styles.container}>    
                        <View>
                            <AnterosLoader.DoubleCircle color={'#1e90ff'} size={30}/>
                            <AnterosText>{'DoubleCircle'}</AnterosText>
                        </View>
                        <View>
                            <AnterosLoader.EatBean size={30} color={'#1e90ff'}/>
                            <AnterosText>{'EatBean'}</AnterosText>
                        </View>
                    </View> 
                    <View style={styles.container}>    
                        <View>
                            <AnterosLoader.LineDots color={'#1e90ff'} size={10} dotsNumber={5} betweenSpace={5}/>
                            <AnterosText>{'LineDots'}</AnterosText>
                        </View>
                       
                    </View> 
                    <View style={styles.container}>                        
                        <View>
                            <AnterosLoader.Lines color={'#1e90ff'} betweenSpace={2} barNumber={5} barWidth={5} barHeight={40}/>
                            <AnterosText>{'Lines'}</AnterosText>
                        </View>
                    </View> 
                    <View style={styles.container}>    
                        <View>
                            <AnterosLoader.Music color={'#1e90ff'} betweenSpace={5} barWidth={3} barHeight={30}/>
                            <AnterosText>{'Music'}</AnterosText>
                        </View>
                        <View>
                            <AnterosLoader.NineCubes size={20} color={'#1e90ff'}/>
                            <AnterosText>{'NineCubes'}</AnterosText>
                        </View>
                    </View> 
                    <View style={styles.container}>    
                        <View>
                            <AnterosLoader.Pulse color={'#1e90ff'} size={30} frequency={1000}/>
                            <AnterosText>{'Pulse'}</AnterosText>
                        </View>
                        <View>
                            <AnterosLoader.Ripple color={'#1e90ff'} size={40} strokeWidth={3}/>
                            <AnterosText>{'Ripple'}</AnterosText>
                        </View>
                    </View>
                    <View style={styles.container}>    
                        <View>
                            <AnterosLoader.RotationCircle size={40} color={'#1e90ff'} rotationSpeed={800}/>
                            <AnterosText>{'RotationCircle'}</AnterosText>
                        </View>
                        <View>
                            <AnterosLoader.RotationHole size={40} color={'#1e90ff'} rotationSpeed={800} strokeWith={8}/>
                            <AnterosText>{'RotationHole'}</AnterosText>
                        </View>
                    </View>
                    <View style={styles.container}>    
                        <View>
                            <AnterosLoader.Text textStyle={{color:'gray', size:14}}/>
                            <AnterosText>{'Text'}</AnterosText>
                        </View>
                    </View>         
                </ScrollView>        
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center', 
        padding:15, 
    }
});



const icons = [
    "https://www.shareicon.net/data/256x256/2016/05/04/759946_bar_512x512.png",
    "https://www.shareicon.net/data/256x256/2016/05/04/759908_food_512x512.png",
    "https://www.shareicon.net/data/256x256/2016/05/04/759956_food_512x512.png",
    "https://www.shareicon.net/data/256x256/2016/05/04/759954_food_512x512.png",
    "https://www.shareicon.net/data/256x256/2016/05/04/759906_food_512x512.png",
    "https://www.shareicon.net/data/256x256/2016/05/04/759921_food_512x512.png"
  ];

  class BouncingLoader extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Bouncing loader',
        showBackButton: true
    };

    renderPage() {
      return (
        <View style={stylesLoader.container}>
          <AnterosBouncingPreloader
            icons={icons}
            leftDistance={-100}
            rightDistance={-150}
            speed={1000}
          />
        </View>
      );
    }
  }
  
  const stylesLoader = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff"
    }
  });