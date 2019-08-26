import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import moment from 'moment';

const { width: screenWidth } = Dimensions.get('window');
const TIME_LABELS_COUNT = 48;
const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = MINUTES_IN_HOUR * 24;
const ROW_HEIGHT = 40;
const CONTENT_HEIGHT = ROW_HEIGHT * TIME_LABELS_COUNT;
const TIME_LABEL_WIDTH = 40;
const EVENTS_CONTAINER_WIDTH = screenWidth - TIME_LABEL_WIDTH - 35;
const GREY_COLOR = '#E9EDF0';
export const CONTENT_OFFSET = 16;

const TimeLabel = ({ time }) => { // eslint-disable-line react/prop-types
  return (
    <View style={stylesWeek.timeLabel}>
      <Text style={stylesWeek.timeText}>{time}</Text>
    </View>
  );
};





const LIGHT_COLOR = '#FFF';

const stylesWeek = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeLineContainer: {
    flexDirection: 'row',
  },
  timeColumn: {
    flex: -1,
    paddingTop: 10,
    width: 40,
  },
  timeLabel: {
    flex: -1,
    height: 40,
  },
  timeText: {
    fontSize: 12,
    textAlign: 'center',
  },
  eventColumn: {
    flex: 1,
    backgroundColor: LIGHT_COLOR,
  },
});












const Event = ({ event, onPress, style }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[stylesEvents.item, style, {
          backgroundColor: event.color,
        }]}
      >
        <Text style={stylesEvents.description}>{event.description}</Text>
      </TouchableOpacity>
    );
  };
  
  const eventPropTypes = PropTypes.shape({
    color: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string,
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
  });
  
  Event.propTypes = {
    event: eventPropTypes.isRequired,
    onPress: PropTypes.func,
    style: View.style,
  };


  const getBorder = (items, index) => {
    return {
      borderLeftWidth: index === 0 ? 1 : 0,
      borderRightWidth: index < items.length - 1 ? 1 : 0,
    };
  };
  
  const getColumns = (numberOfDays, selectedDate) => {
    const columns = [];
    let initial = 0;
    if (numberOfDays === 7) {
      initial = 1;
      initial -= moment().isoWeekday();
    }
    for (let i = initial; i < (numberOfDays + initial); i += 1) {
      let date = moment(selectedDate);
      date = date.add(i, 'd');
      columns.push(date.toDate());
    }
    return columns;
  };
  
  const getFormattedDate = (date) => {
    return moment(date).format('MMM D');
  };
  
  const getCurrentMonth = (date) => {
    return moment(date).format('MMMM Y');
  };
  
  const getFontSizeHeader = (numberOfDays) => {
    if (numberOfDays > 1) {
      return 12;
    }
  
    return 16;
  };
  
  const getDayTextStyles = (numberOfDays) => {
    const fontSize = numberOfDays === 7 ? 12 : 14;
    return {
      fontSize,
    };
  };
  
  // components
  
  const Column = ({ column, style, numberOfDays }) => { // eslint-disable-line react/prop-types
    return (
      <View style={[stylesHeader.column, style]}>
        <Text style={[stylesHeader.text, getDayTextStyles(numberOfDays)]}>
          {getFormattedDate(column)}
        </Text>
      </View>
    );
  };
  
  const Columns = ({ columns, numberOfDays }) => { // eslint-disable-line react/prop-types
    return (
      <View style={stylesHeader.columns}>
        {columns.map((column, index) => {
          return (
            <Column
              key={column}
              column={column}
              numberOfDays={numberOfDays}
              style={getBorder(columns, index)}
            />
          );
        })}
      </View>
    );
  };
  
  const Title = ({ numberOfDays, selectedDate }) => { // eslint-disable-line react/prop-types
    return (
      <View style={[stylesHeader.oneDayHeader, { width: numberOfDays > 1 ? 60 : '100%' }]}>
        <Text
          style={[stylesHeader.text, { fontSize: getFontSizeHeader(numberOfDays) }]}
        >
          {getCurrentMonth(selectedDate)}
        </Text>
      </View>
    );
  };
  
  const WeekViewHeader = ({ numberOfDays, selectedDate, style }) => {
    const columns = numberOfDays > 1 && getColumns(numberOfDays, selectedDate);
    return (
      <View style={[stylesHeader.container, style]}>
        <Title numberOfDays={numberOfDays} selectedDate={selectedDate} />
        {columns && <Columns columns={columns} numberOfDays={numberOfDays} />}
      </View>
    );
  };
  
  WeekViewHeader.propTypes = {
    numberOfDays: PropTypes.oneOf([1, 3, 7]).isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    style: View.style,
  };


  const stylesHeader = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
    },
    oneDayHeader: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    columns: {
      flex: 1,
      flexDirection: 'row',
    },
    column: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#fff',
      borderTopWidth: 1,
    },
    text: {
      color: '#fff',
    },
  });



  const TimeRow = () => {
    return (
      <View style={stylesEvents.timeRow}>
        <View style={stylesEvents.timeLabelLine} />
      </View>
    );
  };
  
  class Events extends Component {
    onEventPress = (item) => {
      const { onEventPress } = this.props;
      if (onEventPress) {
        onEventPress(item.data);
      }
    };
  
    getEventsByNumberOfDays = (numberOfDays, events, selectedDate) => {
      const total = [];
      let initial = 0;
      if (numberOfDays === 7) {
        initial = 1;
        initial -= moment().isoWeekday();
      }
      for (let i = initial; i < (numberOfDays + initial); i += 1) {
        let dates = events.filter((item) => {
          const date = moment(selectedDate);
          date.add(i, 'd');
          return date.isSame(item.startDate, 'day') || date.isSame(item.endDate, 'day');
        });
        dates = dates.map((item) => {
          const date = moment(selectedDate).add(i, 'd');
          let newDate = moment(item.startDate);
          if (!date.isSame(item.startDate, 'day')) {
            newDate = moment(item.startDate).add(i, 'd').startOf('day');
          }
          return {
            ...item,
            startDate: newDate.toDate(),
          };
        });
        total.push(dates);
      }
      return total;
    };
  
    getStyleForEvent = (item) => {
      const startHours = moment(item.startDate).hours();
      const startMinutes = moment(item.startDate).minutes();
      const totalStartMinutes = (startHours * MINUTES_IN_HOUR) + startMinutes;
      const topOffset = (totalStartMinutes * CONTENT_HEIGHT) / MINUTES_IN_DAY;
      const height = (moment(item.endDate).diff(item.startDate, 'minutes') * CONTENT_HEIGHT) / MINUTES_IN_DAY;
      const width = this.getEventItemWidth();
  
      return {
        top: topOffset + CONTENT_OFFSET,
        left: 0,
        height,
        width,
      };
    };
  
    getEventsWithPosition = (totalEvents) => {
      const itemWidth = this.getEventItemWidth();
      return totalEvents.map((events) => {
        // get position and width for each event
        const eventsWithStyle = events.map((item, index) => {
          return {
            data: item,
            style: this.getStyleForEvent(item, index),
          };
        });
        eventsWithStyle.forEach((event, i) => {
          let numberOfDuplicate = 1;
          // check if previous events have the same position or not,
          // start from 0 to current index of event item
          for (let j = 0; j < i; j += 1) {
            const previousEvent = eventsWithStyle[j];
            // if left and top of previous event collides with current item,
            // move current item to the right and update new width for both
            const foundDuplicate = previousEvent.style.left === event.style.left &&
            previousEvent.style.top + previousEvent.style.height >= event.style.top;
            if (foundDuplicate) {
              numberOfDuplicate += 1;
              event.style = { // eslint-disable-line no-param-reassign
                ...event.style,
                left: 5 + (itemWidth / numberOfDuplicate),
                width: itemWidth / numberOfDuplicate,
              };
              previousEvent.style.width = itemWidth / numberOfDuplicate;
            }
          }
        });
        return eventsWithStyle;
      });
    };
  
    getEventItemWidth = () => {
      return EVENTS_CONTAINER_WIDTH / this.props.numberOfDays;
    };
  
    getEventStyles = (events, index) => {
      return {
        borderLeftWidth: index === 0 ? 1 : 0,
        borderRightWidth: index < events.length - 1 ? 1 : 0,
      };
    };
  
    sortEventByDates = (events) => {
      const sortedEvents = events.slice(0)
        .sort((a, b) => {
          return moment(a.startDate)
            .diff(b.startDate, 'minutes');
        });
      return sortedEvents;
    };
  
    render() {
      const {
        events,
        numberOfDays,
        selectedDate,
        onEventPress,
        times,
      } = this.props;
      const sortedEvents = this.sortEventByDates(events);
      let totalEvents = this.getEventsByNumberOfDays(numberOfDays, sortedEvents, selectedDate);
      totalEvents = this.getEventsWithPosition(totalEvents);
      return (
        <View style={{ paddingTop: 16 }}>
          {times.map((time) => {
            return (<TimeRow key={time} time={time} />);
          })}
          <View style={stylesEvents.scheduleItems}>
            {totalEvents.map((eventsInSection, sectionIndex) => {
                return (
                  <View
                    key={sectionIndex}
                    style={[stylesEvents.event, this.getEventStyles(totalEvents, sectionIndex)]}
                  >
                    {eventsInSection.map((item) => {
                    return (
                      <Event
                        key={item.data.id}
                        event={item.data}
                        style={item.style}
                        onPress={onEventPress}
                      />
                    );
                  })}
                  </View>);
              })}
          </View>
        </View>
      );
    }
  }
  
  Events.propTypes = {
    numberOfDays: PropTypes.oneOf([1, 3, 7]).isRequired,
    events: PropTypes.arrayOf(Event.propTypes.event),
    onEventPress: PropTypes.func,
    selectedDate: PropTypes.instanceOf(Date),
    times: PropTypes.arrayOf(PropTypes.string),
  };
  
  Events.defaultProps = {
    events: [],
    selectedDate: new Date(),
  };
  
  
  
  
  const stylesEvents = StyleSheet.create({
    timeRow: {
      flex: 0,
      height: ROW_HEIGHT,
    },
    timeLabelLine: {
      height: 1,
      backgroundColor: GREY_COLOR,
      position: 'absolute',
      right: 0,
      left: 10,
    },
    event: {
      flex: 1,
      overflow: 'hidden',
      borderColor: GREY_COLOR,
    },
    scheduleItems: {
      position: 'absolute',
      flexDirection: 'row',
      left: 20,
      right: 0,
      bottom: 0,
      top: 0,
      backgroundColor: 'transparent',
    },
  });


  export class AnterosWeekView extends Component {
    constructor(props) {
      super(props);
  
      this.times = this.generateTimes();
    }
  
    onEventPress = (item) => {
      const { onEventPress } = this.props;
      if (onEventPress) {
        onEventPress(item.data);
      }
    };
  
    generateTimes = () => {
      const times = [];
      for (let i = 0; i < TIME_LABELS_COUNT; i += 1) {
        const minutes = i % 2 === 0 ? '00' : '30';
        const hour = Math.floor(i / 2);
        const time = `${hour}:${minutes}`;
        times.push(time);
      }
      return times;
    };
  
    render() {
      const {
        events,
        selectedDate,
        numberOfDays,
        style,
      } = this.props;
      return (
        <View style={[stylesWeek.container, style]}>
          <ScrollView>
            <View style={stylesWeek.timeLineContainer}>
              <View style={stylesWeek.timeColumn}>
                {this.times.map((time) => {
                  return (<TimeLabel key={`${time}`} time={time} />);
                })}
              </View>
              <View style={stylesWeek.eventColumn}>
                <Events
                  times={this.times}
                  events={events}
                  numberOfDays={numberOfDays}
                  onEventPress={this.onEventPress}
                  selectedDate={selectedDate}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
  
  AnterosWeekView.propTypes = {
    numberOfDays: PropTypes.oneOf([1, 3, 7]).isRequired,
    events: Events.propTypes.events,
    onEventPress: PropTypes.func,
    style: View.style,
    selectedDate: PropTypes.instanceOf(Date),
  };
  
  AnterosWeekView.defaultProps = {
    events: [],
    selectedDate: new Date(),
  };