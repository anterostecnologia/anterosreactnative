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
    Platform,
    ImageBackground,
    ViewPropTypes,
    Animated,
    Easing,
    Image,
    TextInput,
    Dimensions,
    View
} from 'react-native';

import PropTypes from 'prop-types';
import moment from 'moment';
import faker from 'faker';
import {AnterosCalendar, AnterosCalendarList, AnterosButton, AnterosSwiper, AnterosNavigationPage, 
  AnterosActionSheet, AnterosLabel, AnterosListRow, AnterosText, AnterosImage,AnterosMonthSelector,
  AnterosSocialIcon, AnterosCalendarStrip, AnterosAgenda, AnterosMiniCalendar} from 'anteros-react-native';
import CalendarPeriodExample from './CalendarPeriodExample';
import DateHistoryPickerExample from './DateHistoryPickerExample';
import ClockTimePickerExample from './ClockTimePickerExample';
import ClockSliderExample from './ClockSliderExample';
import AnalogClockExample from './AnalogClockExample';


const timer = require('react-native-timer');

const DEVICE_WIDTH = Dimensions
    .get('window')
    .width;
const DEVICE_HEIGHT = Dimensions
    .get('window')
    .height;

export default class CalendarExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Calendar',
        showBackButton: true
    };
    constructor(props) {
        super(props);
        this.calendar1 = this
            .calendar1
            .bind(this);
        this.calendar2 = this
            .calendar2
            .bind(this);    
        this.calendar3 = this.calendar3.bind(this);        
        this.calendar4 = this.calendar4.bind(this);     
        this.calendar5 = this.calendar5.bind(this);     
        this.calendar6 = this.calendar6.bind(this); 
        this.calendar7 = this.calendar7.bind(this);             
        this.calendar8 = this.calendar8.bind(this);             
        this.calendar9 = this.calendar9.bind(this);             
        this.calendar10 = this.calendar10.bind(this); 
        this.calendar11 = this.calendar11.bind(this); 
        this.calendar12 = this.calendar12.bind(this); 
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

    calendar1() {
        this
            .navigator
            .push({view: <CalendarExample1/>})
    }

    calendar2() {
        this
            .navigator
            .push({view: <CalendarsList2/>})
    }

    calendar3() {
      this
          .navigator
          .push({view: <HorizontalCalendarList3/>})
    }

    calendar4() {
      this
          .navigator
          .push({view: <CalendarStripExample3/>})
    }
    calendar5() {
        this
            .navigator
            .push({view: <AgendaExample5/>})
    }

    calendar6() {
      this
          .navigator
          .push({view: <DateHistoryPickerExample/>})
    }

    calendar7() {      
       this
           .navigator
           .push({view: <CalendarPeriodExample/>})
    }

    calendar8() {
      this
          .navigator
          .push({view: <ClockTimePickerExample/>})
    }

    calendar9() {
      this
          .navigator
          .push({view: <MiniCalendarExample/>})
    }
    calendar10() {
      // this
      //     .navigator
      //     .push({view: <ClockSliderExample/>})
    }
    calendar11() {
      this
          .navigator
          .push({view: <AnalogClockExample/>})
    }

    calendar12() {
      this
          .navigator
          .push({view: <MonthSelectorExample/>})
    }

    

    renderPage() {
        return (
            <ScrollView style={{
                flex: 1
            }}>
                <View style={{
                    height: 20
                }}/>
                <AnterosListRow title='Calendar' onPress={this.calendar1} topSeparator='full'/>
                <AnterosListRow title='Calendar list' onPress={this.calendar2}  topSeparator='full'/>
                <AnterosListRow title='Calendar horizontal' onPress={this.calendar3}  topSeparator='full'/>
                <AnterosListRow title='Calendar strip' onPress={this.calendar4}  topSeparator='full'/>
                <AnterosListRow title='Calendar period' onPress={this.calendar7}  topSeparator='full'/>
                <AnterosListRow title='Agenda' onPress={this.calendar5}  topSeparator='full'/>
                <AnterosListRow title='Date history picker' onPress={this.calendar6}  topSeparator='full'/>
                <AnterosListRow title='Clock time picker' onPress={this.calendar8}  topSeparator='full'/>
                <AnterosListRow title='Mini calendar' onPress={this.calendar9}  topSeparator='full'/>
                <AnterosListRow title='Clock slider' onPress={this.calendar10}  topSeparator='full'/>
                <AnterosListRow title='Analog clock' onPress={this.calendar11}  topSeparator='full'/>
                <AnterosListRow title='Month selector' onPress={this.calendar12}  topSeparator='full'/>
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


class CalendarExample1 extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Calendar',
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.onDayPress = this.onDayPress.bind(this);
  }

  renderPage() {
    return (
      <ScrollView style={styles.container}>
        <AnterosText style={styles.text}>Calendar with selectable date and arrows</AnterosText>
        <AnterosCalendar
          onDayPress={this.onDayPress}
          style={styles.calendar}
          hideExtraDays
          markedDates={{[this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
        />
        <AnterosText style={styles.text}>Calendar with marked dates and hidden arrows</AnterosText>
        <AnterosCalendar
          style={styles.calendar}
          current={'2012-05-16'}
          minDate={'2012-05-10'}
          maxDate={'2012-05-29'}
          firstDay={1}
          markedDates={{
            '2012-05-23': {selected: true, marked: true},
            '2012-05-24': {selected: true, marked: true, dotColor: 'green'},
            '2012-05-25': {marked: true, dotColor: 'red'},
            '2012-05-26': {marked: true},
            '2012-05-27': {disabled: true, activeOpacity: 0}
          }}
          // disabledByDefault={true}
          hideArrows={true}
        />
        <AnterosText style={styles.text}>Calendar with custom day component</AnterosText>
        <AnterosCalendar
          style={[styles.calendar, {height: 300}]}
          dayComponent={({date, state}) => {
            return (<View style={{flex: 1}}><AnterosText style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>{date.day}</AnterosText></View>);
          }}
        />
        <AnterosText style={styles.text}>Calendar with period marking and spinner</AnterosText>
        <AnterosCalendar
          style={styles.calendar}
          current={'2012-05-16'}
          minDate={'2012-05-10'}
          displayLoadingIndicator
          markingType={'period'}
          theme={{
            calendarBackground: '#333248',
            textSectionTitleColor: 'white',
            dayTextColor: 'red',
            todayTextColor: 'white',
            selectedDayTextColor: 'white',
            monthTextColor: 'white',
            selectedDayBackgroundColor: '#333248',
            arrowColor: 'white',
            'stylesheet.calendar.header': {
              week: {
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }
            }
          }}
          markedDates={{
            '2012-05-17': {disabled: true},
            '2012-05-08': {textColor: '#666'},
            '2012-05-09': {textColor: '#666'},
            '2012-05-14': {startingDay: true, color: '#FFF9C4', endingDay: true},
            '2012-05-21': {startingDay: true, color: '#FFF9C4'},
            '2012-05-22': {endingDay: true, color: '#EEEEEE'},
            '2012-05-24': {startingDay: true, color: '#EEEEEE'},
            '2012-05-25': {color: '#EEEEEE'},
            '2012-05-26': {endingDay: true, color: '#EEEEEE'}}}
          hideArrows={false}
        />
        <AnterosText style={styles.text}>Calendar with multi-dot marking</AnterosText>
        <AnterosCalendar
          style={styles.calendar}
          current={'2012-05-16'}
          markingType={'multi-dot'}
          markedDates={{
            '2012-05-08': {dots: [{key: 'vacation', color: 'blue', selectedDotColor: 'white'}, {key: 'massage', color: 'red', selectedDotColor: 'white'}], selected: true},
            '2012-05-09': {dots: [{key: 'vacation', color: 'blue', selectedDotColor: 'red'}, {key: 'massage', color: 'red', selectedDotColor: 'blue'}], disabled: true}
          }}
          hideArrows={false}
        />
        <AnterosText style={styles.text}>Calendar with week numbers</AnterosText>
        <AnterosCalendar
          onDayPress={this.onDayPress}
          style={styles.calendar}
          hideExtraDays
          showWeekNumbers
          markedDates={{[this.state.selected]: {selected: true}}}
        />
        <AnterosText style={styles.text}>Custom calendar with custom marking type</AnterosText>
        <AnterosCalendar
          style={styles.calendar}
          onDayLongPress={this.onDayLongPress}
          hideExtraDays
          current={'2018-03-01'}
          minDate={'2018-03-01'}
          markingType={'custom'}
          markedDates={{
            '2018-03-01': {
              customStyles: {
                container: {
                  backgroundColor: 'white',
                  elevation: 2
                },
                text: {
                  color: 'blue',
                },
              }
            },
            '2018-03-08': {selected: true},
            '2018-03-09': {
              customStyles: {
                container: {
                  backgroundColor: '#E53935',
                  elevation: 4,
                },
                text: {
                  color: 'white',
                },
              }
            },
            '2018-03-10': {disabled: true},
            '2018-03-14': {
              customStyles: {
                container: {
                  backgroundColor: 'green',
                },
                text: {
                  color: 'white',
                },
              },
            },
            '2018-03-15': {
              customStyles: {
                container: {
                  backgroundColor: 'black',
                  elevation: 2
                },
                text: {
                  color: 'white',
                },
              }
            },
            '2018-03-20': {
              customStyles: {
                container: {
                  backgroundColor: 'pink',
                  elevation: 4,
                },
                text: {
                  color: 'blue',
                },
              }
            },
            '2018-03-21': {disabled: true},
            '2018-03-28': {
              customStyles: {
                container: {
                  backgroundColor: '#689F38',
                },
                text: {
                  color: 'white',
                  fontWeight: 'bold'
                },
              },
            },
            '2018-03-29': {
              customStyles: {
                container: {
                  backgroundColor: 'white',
                  elevation: 2
                },
                text: {
                  color: 'blue',
                },
              }
            },
            '2018-03-30': {
              customStyles: {
                container: {
                  backgroundColor: '#FDD835',
                  elevation: 4,
                  borderColor: '#F9A825',
                  borderWidth: 5,
                },
                text: {
                  marginTop: 3,
                  fontSize: 11,
                  color: 'blue',
                },
              }
            },
            '2018-03-31': {
              customStyles: {
                container: {
                  backgroundColor: 'green',
                  borderRadius: 0,
                },
                text: {
                  color: 'white',
                },
              },
            }}}
          hideArrows={false}
        />
      </ScrollView>
    );
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  }
});





class CalendarsList2 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "List",
    showBackButton: true
  };
  constructor(props) {
    super(props);
  }

  renderPage() {
    return (
      <AnterosCalendarList current={'2018-04-04'} pastScrollRange={24} futureScrollRange={24} />
    );
  }
}


class HorizontalCalendarList3 extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Horizontal",
    showBackButton: true
  };

  constructor(props) {
    super(props);
  }

  renderPage() {
    return (
      <View>
        <AnterosCalendarList
          current={'2018-04-04'}
          pastScrollRange={24}
          futureScrollRange={24}
          horizontal
          pagingEnabled
          style={{borderBottomWidth: 1, borderBottomColor: 'black'}}
        />
      </View>
    );
  }
}



class CalendarStripExample3 extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Calendar strip',
        showBackButton: true
    };

    constructor(props) {
        super(props);
        this.customDatesStyles = [];
        let startDate = moment();
        for (let i = 0; i < 6; i++) {
            this.customDatesStyles.push({
                startDate: startDate
                    .clone()
                    .add(i, 'days'), // Single date since no endDate provided
                dateNameStyle: styles.someDateNameStyle,
                dateNumberStyle: styles.someDateNumberStyle,
                // Random color...
                dateContainerStyle: {
                    backgroundColor: '#' + ('#00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6)
                }
            });
        }
    }

    renderPage() {
        return (
            <View>
                <AnterosCalendarStrip
                    calendarAnimation={{
                    type: 'sequence',
                    duration: 30
                }}
                    daySelectionAnimation={{
                    type: 'background',
                    duration: 300,
                    highlightColor: '#9265DC'
                }}
                    style={{
                    height: 100,
                    paddingTop: 20,
                    paddingBottom: 10
                }}
                    calendarHeaderStyle={{
                    color: 'white'
                }}
                    calendarColor={'#7743CE'}
                    dateNumberStyle={{
                    color: 'white'
                }}
                    dateNameStyle={{
                    color: 'white'
                }}
                    iconLeft={require('../images/left-arrow.png')}
                    iconRight={require('../images/right-arrow.png')}
                    iconContainer={{
                    flex: 0.1
                }}/>
                <AnterosCalendarStrip customDatesStyles={this.customDatesStyles}
                    calendarAnimation={{
                    type: 'sequence',
                    duration: 30
                }}
                    daySelectionAnimation={{
                    type: 'background',
                    duration: 300,
                    highlightColor: '#9265DC'
                }}
                    style={{
                    height: 100,
                    paddingTop: 20,
                    paddingBottom: 10
                }}
                    calendarHeaderStyle={{
                    color: 'white'
                }}
                    calendarColor={'#7743CE'}
                    dateNumberStyle={{
                    color: 'white'
                }}
                    dateNameStyle={{
                    color: 'white'
                }}
                    iconLeft={require('../images/left-arrow.png')}
                    iconRight={require('../images/right-arrow.png')}
                    iconContainer={{
                    flex: 0.1
                }}/>
            </View>
        );
    }
}






class AgendaExample5 extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Agenda",
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }

  renderPage() {
    return (
      <AnterosAgenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={'2017-05-16'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[stylesAgenda.item, {height: item.height}]}><AnterosText>{item.name}</AnterosText></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={stylesAgenda.emptyDate}><AnterosText>This is empty date!</AnterosText></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const stylesAgenda = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});






class MiniCalendarExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Mini calendar",
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
    this.onDateSelect = this.onDateSelect.bind(this)
  }

  onDateSelect(date){
    console.log(date);
  }

  renderPage() {
    return (
      <View style={{flex:1, alignItems:'center'}}>
          <AnterosMiniCalendar
            containerStyle={{height:150,width:300}}
            showDayHeading={true}
            dayHeadings={['Su','Mo','Tu','We','Th','Fr','Sa']}
            onDateSelect={this.onDateSelect}
            startDate={moment().format('YYYY-MM-DD')}
            selectedDate={moment((new Date()).toISOString()).format('YYYY-MM-DD')}
            numberOfDaysToShow={14}
            enabledDaysOfTheWeek={['Mo','We','Fr']}
            isoWeek={false}
            disablePreviousDays={true}
            disableToday={false}
            dayStyle={{ textAlign: 'center', lineHeight: 56 }}
            headingStyle={{backgroundColor: '#AFB42B', lineHeight: 26}}
            activeDayStyle={{backgroundColor: '#E6EE9C', color: 'blue'}}
            disabledDayStyle={{backgroundColor: '#F5F5F5', color: 'darkgrey'}}
            selectedDayStyle={{backgroundColor: '#FFEB3B', color: 'black'}}
          />
      </View>
    );
  }
}


class MonthSelectorExample extends AnterosNavigationPage {
  
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Month selector",
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.state = {month: moment(new Date())};
  }

  renderPage() {
    return (
      <View>
        <AnterosText style={styles.welcome}>
          Selected Month is { this.state.month && this.state.month.format('MMM YYYY')}
        </AnterosText>
        <AnterosMonthSelector
           selectedDate={this.state.month}
           monthTapped={(date) => this.setState({ month: date })}
        />
      </View>
    );
  }
}