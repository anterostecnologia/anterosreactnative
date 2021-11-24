import {Component, PureComponent} from 'react';
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
import {AnterosButton,  AnterosNavigationPage, AnterosLabel,AnterosWeekView, 
    AnterosListRow, AnterosText, AnterosImage, AnterosQRCode} from 'anteros-react-native';
import AppIntroExample from './AppIntroExample';
import RatingExample from './RatingExample';
import PulseLoaderExample from './PulseLoaderExample';
import LoadersExample from './LoadersExample';
import HyperlinkExample from './HyperlinkExample';
import DialExample from './DialExample'; 
import GradingExample from './GradingExample';
import SliderExample from './SliderExample';
import ContentLoaderExample from './ContentLoaderExample';
import BounceableExampe from './BounceableExample';
import MultiSliderExample from './MultiSliderExample';
import RippleExample from './RippleExample';
import FormExample from './FormExample';
import ParsedTextExample from './ParsedTextExample';
import ProgressBarExample from './ProgressbarExample';
import CommentsExample from './CommentsExample';
import CountdownExample from './CountdownExample';
import CircularSliderExample from './CircularSliderExample';
import EmoticonsExample from './EmoticonsExample';
import BadgeExample from './BadgeExample';

const timer = require('react-native-timer');

const DEVICE_WIDTH = Dimensions
    .get('window')
    .width;
const DEVICE_HEIGHT = Dimensions
    .get('window')
    .height;


export class OthersExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Others',
        showBackButton: true
    };
    constructor(props) {
        super(props);
        this.others1 = this
            .others1
            .bind(this);
        this.others2 = this
            .others2
            .bind(this);          
        this.others5 = this
            .others5
            .bind(this);    
        this.others6 = this
            .others6
            .bind(this);    
        this.others7 = this
            .others7
            .bind(this);    
        this.others8 = this
            .others8
            .bind(this);     
        this.others9 = this
            .others9
            .bind(this);     
        this.others11 = this
            .others11
            .bind(this);    
        this.others12 = this
            .others12
            .bind(this); 
        this.others13 = this
            .others13
            .bind(this);     
        this.others14 = this
            .others14
            .bind(this);
        this.others15 = this
            .others15
            .bind(this);    
        this.others16 = this
            .others16
            .bind(this);     
        this.others17 = this
            .others17
            .bind(this);     
        this.others18 = this
            .others18
            .bind(this);     
        this.others19 = this
            .others19
            .bind(this);     
        this.others20 = this
            .others20
            .bind(this); 
        this.others21 = this
            .others21
            .bind(this); 
        this.others22 = this
            .others22
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

    others1() {
         this
             .navigator
             .push({view: <AppIntroExample/>})
    }
    others2() {
        this
            .navigator
            .push({view: <RatingExample/>})
    }
    others5() {
        // this
        //     .navigator
        //     .push({view: <HyperlinkExample/>})
    }
    others6() {
        this
            .navigator
            .push({view: <QRCodeExample/>})
    }
    others7() {
        this
            .navigator
            .push({view: <DialExample/>})
    }

    others8() {
         this
             .navigator
             .push({view: <GradingExample/>})
    }

    others9() {
        this
            .navigator
            .push({view: <SliderExample/>})
    }
    others11() {
        this
            .navigator
            .push({view: <BounceableExampe/>})
    }
    others12() {
        this
            .navigator
            .push({view: <MultiSliderExample/>})
    }
    others13() {
        this
            .navigator
            .push({view: <RippleExample/>})
    }
    others14() {
        // this
        //     .navigator
        //     .push({view: <FormExample/>})
    }
    others15() {
         this
             .navigator
             .push({view: <ParsedTextExample/>})
    }
    others16() {
        this
            .navigator
            .push({view: <ProgressBarExample/>})
    }
    others17() {
        this
            .navigator
            .push({view: <CommentsExample/>})
    }
    others18() {
        this
            .navigator
            .push({view: <CountdownExample/>})
    }
    others19() {
        // this
        //     .navigator
        //     .push({view: <Teste/>})
    }

    others20() {
         this
             .navigator
             .push({view: <CircularSliderExample/>})
    }

    others21() {
         this
             .navigator
             .push({view: <EmoticonsExample/>})
    }

    others22() {
        this
            .navigator
            .push({view: <BadgeExample/>})
    }


    renderPage() {
        return (
            <ScrollView style={{
                flex: 1
            }}>
                <View style={{
                    height: 20
                }}/>
                <AnterosListRow title='Badge' onPress={this.others22} topSeparator='full'/>
                <AnterosListRow title='App introduction' onPress={this.others1} topSeparator='full'/>
                <AnterosListRow title='Rating' onPress={this.others2} topSeparator='full'/>
                <AnterosListRow title='Grading' onPress={this.others8} topSeparator='full'/>
                <AnterosListRow title='Hyperlink' onPress={this.others5} topSeparator='full'/>
                <AnterosListRow title='QR Code' onPress={this.others6} topSeparator='full'/>
                <AnterosListRow title='Dial' onPress={this.others7} topSeparator='full'/>
                <AnterosListRow title='Slider' onPress={this.others9} topSeparator='full'/>
                <AnterosListRow title='Circular slider' onPress={this.others20} topSeparator='full'/>
                <AnterosListRow title='Multi slider' onPress={this.others12} topSeparator='full'/>
                <AnterosListRow title='Progress bar' onPress={this.others16} topSeparator='full'/>
                <AnterosListRow title='Bonunceable effect' onPress={this.others11} topSeparator='full'/>
                <AnterosListRow title='Ripple effect' onPress={this.others13} topSeparator='full'/>
                <AnterosListRow title='Teste' onPress={this.others14} topSeparator='full'/>
                <AnterosListRow title='Parsed text' onPress={this.others15} topSeparator='full'/>
                <AnterosListRow title='Comments' onPress={this.others17} topSeparator='full'/>
                <AnterosListRow title='Countdown' onPress={this.others18} topSeparator='full'/>
                <AnterosListRow title='Emoticons' onPress={this.others21} topSeparator='full'/>
                <AnterosListRow title='Teste' onPress={this.others19} topSeparator='full'/>
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



class QRCodeExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'QR Code',
      showBackButton: true
    };

    renderPage(){
        return <View style={{ flex:1, justifyContent:'space-around', alignItems: 'center',
        }}>
            <AnterosQRCode size={200} value="http://www.anteros.com.br"/>
            <AnterosQRCode size={200} value="http://www.bangboo.com.br" backgroundColor="#FFFDE7"/>
        </View>
    }

}


class Teste extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'week',
      showBackButton: true
    };

    constructor(props){
        super(props);
        this.selectedDate = new Date();
        this.hoje = new Date();
    }

   
    generateDates = (date, hours, minutes) => {
        return date;
    //   let newDate = new Date(date);
    //   newDate.setHours(newDate.getHours() + hours);
    //   if (minutes != null) {
    //     newDate.setMinutes(minutes);
    //   }
    //   return newDate;
    };
  
    render() {
      const date = new Date();
      const events = [
        {
          id: 1,
          description: 'Event 1',
          startDate: this.generateDates(date,0,30),
          endDate: this.generateDates(date,2),
          color: 'blue',
        },
        {
          id: 2,
          description: 'Event 2',
          startDate: this.generateDates(date,1,40),
          endDate: this.generateDates(date,4),
          color: 'red',
        },
        {
          id: 3,
          description: 'Event 3',
          startDate: this.generateDates(date,-5,20),
          endDate: this.generateDates(date,-3),
          color: '#2196F3',
        },
        {
            id: 4,
            description: 'Event 111',
            startDate: this.generateDates(date,0),
            endDate: this.generateDates(date,2),
            color: '#FF6E40',
          },
          {
            id: 5,
            description: 'Event 21',
            startDate: this.generateDates(date,1),
            endDate: this.generateDates(date,4),
            color: '#AB47BC',
          },
          {
            id: 6,
            description: 'Event 31',
            startDate: this.generateDates(date,-5),
            endDate: this.generateDates(date,-3),
            color: 'yellow',
          },
      ];
  
      return (
        <View style={stylesWeek.container}>
          <AnterosWeekView
            events={events}
            selectedDate={this.selectedDate}
            numberOfDays={3}
            onEventPress={() => Alert.alert('select')}
            headerStyle={stylesWeek.headerStyle}
          />
        </View>
      );
    }
  }
  
  const stylesWeek = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      paddingTop: 22,
    },
    headerStyle: {
      backgroundColor: '#4286f4',
    },
  });
