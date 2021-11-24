
import {Component, PureComponent} from 'react';
import {
    StyleSheet,
    Text,    
    Dimensions,
    View
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {AnterosButton, AnterosNavigationPage, AnterosText, AnterosLabel, AnterosCalendarPeriod} from 'anteros-react-native';


export class CalendarPeriodExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Calendar period',
        showBackButton: true
    };
    
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(2018, 6, 12),
            endDate: new Date(2018, 8, 2)
        };
        this.confirmDate = this.confirmDate.bind(this);
        this.openCalendar = this.openCalendar.bind(this);
    }
    // when confirm button is clicked, an object is conveyed to outer component
    // contains following property:
    // startDate [Date Object], endDate [Date Object]
    // startMoment [Moment Object], endMoment [Moment Object]
    confirmDate({
        startDate,
        endDate,
        startMoment,
        endMoment
    }) {
        this.setState({
            startDate,
            endDate
        });
    }
    openCalendar() {
        this.calendar && this.calendar.open();
    }
    // in render function
    renderPage() {
        // It's an optional property, I use this to show the structure of customI18n object.
        let customI18n = {
            'w': ['', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
            'weekday': ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            'text': {
                'start': 'Check in',
                'end': 'Check out',
                'date': 'Date',
                'save': 'Confirm',
                'clear': 'Reset'
            },
            'date': 'DD / MM' // date format
        };
        // optional property, too.
        let color = {
            subColor: '#f0f0f0'
        };
        return ( <View style={{flex:1, alignItems:'center', justifyContent:'space-around'}}>
            <AnterosButton title="Open Calendar" onPress={this.openCalendar}/>
            <AnterosCalendarPeriod
              i18n="en"
              ref={(calendar) => {this.calendar = calendar;}}
              customI18n={customI18n}
              color={color}
              format="YYYYMMDD"
              minDate="20170510"
              maxDate="20180312"
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onConfirm={this.confirmDate}
            />            
            <AnterosLabel size='lg' text={moment(this.state.startDate).format('YYYY/MM/DD')+' to '+moment(this.state.endDate).format('YYYY/MM/DD')}/>
          </View>);
    }
}