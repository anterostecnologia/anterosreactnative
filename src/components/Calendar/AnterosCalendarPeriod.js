import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  ListView,
  ScrollView,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import Moment from 'moment';
import {AnterosText} from '../Text/AnterosText';
import {AnterosImage} from '../Image/AnterosImage';
const {scale, width} = Dimensions.get('window');
let iconSize = 22;
let resultFontSize = 24;
let weekTextFontSize = 16;
let slashLength = 80;
if (width < 350) {
  resultFontSize = 20;
  weekTextFontSize = 14;
  iconSize = 20;
  slashLength = 70;
}

const ICON = {
  close: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADGklEQVR4Xu3b3XXTMBTAcV1Leu8I3YAyAWECygSlE9BOQJmAdAK6QWGCphNQNmAE+mzZl6Mc5xzXtiLJ1r0STfLqJM3/Z9muPwTiwF9w4P3iCHAcAQ4BRDxt2/aDEOKkqqqfAPD0P2EZYy6EEJ/sbwaATVVVtwDwd9gwuQkYY+wHv9n43QcQca21vi4dARFPmqa5F0Ks+r8VEZ+UUu+HCCMAu+abpvnVj+990Z1S6rJUBBtvjHkAgLOp34iIX7XWN/1lI4Cmaa4Q0a5916tIBF+8jUHER631i5ExAqjr+gYAvnjWclEIIfHBAIh41m0CvpFeBEJofBdzqZS627sJ2IV1Xa8B4LNPQAiRFSEmfmr4b48QrkhjjJWyhxLfKwtCZPxvpdQq+DC4Ky4VIVX83hFQKkLK+CAA+6ZSRkLq+GCAEhAo4qMAciJQxUcD5ECgjJ8FwIlAHT8bgAOBI34RACUCV/xiAAoEzvgkACkRuOOTAaRAyBGfFGAJQq745ABzEHLGkwDEItgLMK5reP3zcER0ntL6ztf3LSe7MRJxAuX9/VTxZCNgxqm0E4EynhwgcnMYIVDHswDMReCIZwOIReCKZwOIOdR12wHbhVayo8Bug54Rv/soCwIpwIJ4NgQygATxLAgkAAnjyRGSA8TE27199+BFtjtQSQFi43e3qyL+bU6+Y0wGMDd+xr/NSRGSACyNz4mwGCBVfC6ERQCp43MgzAagiudGmAVAHc+JEA3AFc+FEAXAHc+BEAyQK54aIQggdzwlgheglHgqhL0ApcVTIDgBSo1PjTAJUHp8SgTXfIGH4fP2U3cuOK/euu6chJ5KI+Kt1vpq+D0jgG6yxHfnrZpuQQnxsSNBSvl2OPNl6nH5DQC82wdQUnwMAgBcSynX/bZogBLjIxA+KqV++ACcEyZKjg9AeJZSnobMGbLzbuxm8KYvZZ+3V0qdTz1y7ttfcC+fmO/wjIjnWuuNdydo39AdBu0eczu/BgDsdbgXMy24o2L/nn3wom3bFSL+kVLaFTqaMrdti/3i1/b+I8BrW6OxPQc/Av4BDSZYbnPWwJkAAAAASUVORK5CYII='
};

export class AnterosCalendarPeriod extends Component {
  static propTypes = {
    i18n: PropTypes.string,
    format: PropTypes.string,
    customI18n: PropTypes.object,
    color: PropTypes.object,
    minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
  }
  static defaultProps = {
    format: 'YYYY-MM-DD',
    i18n: 'en',
    customI18n: {},
    color: {}
  }
  static I18N_MAP = {
    'zh': {
      'w': ['', '一', '二', '三', '四', '五', '六', '日'],
      'weekday': ['', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      'text': {
        'start': '开 始',
        'end': '结 束',
        'date': '日 期',
        'save': '保 存',
        'clear': '清除'
      },
      'date': 'M月D日'
    },
    'en': {
      'w': ['', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
      'weekday': ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      'text': {
        'start': 'Start',
        'end': 'End',
        'date': 'Date',
        'save': 'Save',
        'clear': 'Reset'
      },
      'date': 'DD / MM'
    },
    'ptBR': {
        'w': ['', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
        'weekday': ['', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        'text': {
          'start': 'Inicio',
          'end': 'Fim',
          'date': 'Data',
          'save': 'Ok',
          'clear': 'Limpar'
        },
        'date': 'DD / MM'
      },
    'jp': {
      'w': ['', '月', '火', '水', '木', '金', '土', '日'],
      'weekday': ['', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'],
      'text': {
        'start': 'スタート',
        'end': 'エンド',
        'date': '時　間',
        'save': '確　認',
        'clear': 'クリア'
      },
      'date': 'M月D日'
    }
  }
  constructor (props) {
    super(props);
    this.state = {
      isModalVisible: false
    };
    this._today = Moment();
    this._year = this._today.year();
    this._i18n = this._i18n.bind(this);
    this._getDateRange = this._getDateRange.bind(this);
    this._onChoose = this._onChoose.bind(this);
    this._resetCalendar = this._resetCalendar.bind(this);
    this.close = this.close.bind(this);
    this.cancel = this.cancel.bind(this);
    this.open = this.open.bind(this);
    this.clear = this.clear.bind(this);
    this.confirm = this.confirm.bind(this);
    this._getDateRange();
  }
  componentDidMount () {
    this._resetCalendar();
  }
  _i18n (data, type) {
    const {
      i18n,
      customI18n
    } = this.props;
    if (~['w', 'weekday', 'text'].indexOf(type)) {
      return (customI18n[type] || {})[data] || Calendar.I18N_MAP[i18n][type][data];
    }
    if (type === 'date') {
      return data.format(customI18n[type] || Calendar.I18N_MAP[i18n][type]);
    }
  }
  _resetCalendar () {
    const {
      startDate,
      endDate,
      format
    } = this.props;
    let start = Moment(startDate, format);
    let end = Moment(endDate, format);
    let isStartValid = start.isValid() && start >= this._minDate && start <= this._maxDate;
    let isEndValid = end.isValid() && end >= this._minDate && end <= this._maxDate;
    this.setState({
      startDate: isStartValid ? start : null,
      startDateText: isStartValid ? this._i18n(start, 'date') : '',
      startWeekdayText: isStartValid ? this._i18n(start.isoWeekday(), 'weekday') : '',
      endDate: isEndValid ? end: null,
      endDateText: isEndValid ? this._i18n(end, 'date') : '',
      endWeekdayText: isEndValid ? this._i18n(end.isoWeekday(), 'weekday') : ''
    });
  }
  _getDateRange () {
    const {
      maxDate,
      minDate,
      format
    } = this.props;
    let max = Moment(maxDate, format);
    let min = Moment(minDate, format);
    let maxValid = max.isValid();
    let minValid = min.isValid();
    if (!maxValid && !minValid) {
      max = Moment().add(3, 'months');
      min = Moment();
    }
    if (!maxValid && minValid) {
      max = min.add(3, 'months');
    }
    if (maxValid && !minValid) {
      min = max.subtract(3, 'months');
    }
    if (min.isSameOrAfter(max)) return {};
    this._minDate = min;
    this._maxDate = max;
  }
  _onChoose (day) {
    const {
      startDate,
      endDate
    } = this.state;
    if ((!startDate && !endDate) || day < startDate || (startDate && endDate)) {
      this.setState({
        startDate: day,
        endDate: null,
        startDateText: this._i18n(day, 'date'),
        startWeekdayText: this._i18n(day.isoWeekday(), 'weekday'),
        endDateText: '',
        endWeekdayText: '',
      });
    } else if (startDate && !endDate && day > startDate) {
      this.setState({
        endDate: day,
        endDateText: this._i18n(day, 'date'),
        endWeekdayText: this._i18n(day.isoWeekday(), 'weekday')
      });
    }
  }
  cancel () {
    this.close();
    this._resetCalendar();
  }
  close () {
    this.setState({
      isModalVisible: false
    });
  }
  open () {
    this.setState({
      isModalVisible: true
    });
  }
  clear () {
    this.setState({
      startDate: null,
      endDate: null,
      startDateText: '',
      startWeekdayText: '',
      endDateText: '',
      endWeekdayText: ''
    });
  }
  confirm () {
    const {
      startDate,
      endDate
    } = this.state;
    let startMoment = startDate ? startDate.clone() : null;
    let endMoment = endDate ? endDate.clone() : null;
    this.props.onConfirm && this.props.onConfirm({
      startDate: startMoment ? startMoment.toDate() : null,
      endDate: endMoment ? endMoment.toDate() : null,
      startMoment,
      endMoment
    });
    this.close();
  }
  render () {
    const {
      startDate,
      endDate,
      startDateText,
      startWeekdayText,
      endDateText,
      endWeekdayText
    } = this.state;
    const {
      mainColor = '#15aaaa',
      subColor = '#fff',
      borderColor = 'rgba(255, 255, 255, 0.50)'
    } = this.props.color;
    let color = {mainColor, subColor, borderColor};
    let mainBack = {backgroundColor: mainColor};
    let subBack = {backgroundColor: subColor};
    let mainFontColor = {color: mainColor};
    let subFontColor = {color: subColor};
    let isValid = !startDate || endDate;
    let isClearVisible = startDate || endDate;
    return (
      <Modal
        animationType={'slide'}
        visible={this.state.isModalVisible}
        onRequestClose={this.close}>
        <View style={[styles.container, mainBack]}>
          <View style={styles.ctrl}>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={this.cancel}
              >
              <AnterosImage
                style={styles.closeIcon}
                source={{uri: ICON.close}}
                resizeMode="cover"/>
            </TouchableHighlight>
            {isClearVisible && <TouchableHighlight
              underlayColor="transparent"
              activeOpacity={0.8}
              onPress={this.clear}>
              <AnterosText style={[styles.clearText, subFontColor]}>{this._i18n('clear', 'text')}</AnterosText>
            </TouchableHighlight>}
          </View>
          <View style={styles.result}>
            <View style={styles.resultPart}>
              <AnterosText style={[styles.resultText, styles.startText, subFontColor]}>
                {startDateText || this._i18n('start', 'text')}
              </AnterosText>
              <AnterosText style={[styles.resultText, styles.startText, subFontColor]}>
                {startWeekdayText || this._i18n('date', 'text')}
              </AnterosText>
            </View>
            <View style={[styles.resultSlash, subBack]}/>
            <View style={styles.resultPart}>
              <AnterosText style={[styles.resultText, styles.endText, subFontColor]}>
                {endDateText || this._i18n('end', 'text')}
              </AnterosText>
              <AnterosText style={[styles.resultText, styles.endText, subFontColor]}>
                {endWeekdayText || this._i18n('date', 'text')}
              </AnterosText>
            </View>
          </View>
          <View style={styles.week}>
            {[7, 1, 2, 3, 4, 5, 6].map(item =>
              <AnterosText style={[styles.weekText, subFontColor]}　key={item}>{this._i18n(item, 'w')}</AnterosText>
            )}
          </View>
          <View style={[styles.scroll, {borderColor}]}>
            <MonthList
              today={this._today}
              minDate={this._minDate}
              maxDate={this._maxDate}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChoose={this._onChoose}
              i18n={this.props.i18n}
              color={color}
            />
          </View>
          <View style={styles.btn}>
            {isValid ?
              <TouchableHighlight
                underlayColor="rgba(255, 255, 255, 0.45)"
                style={styles.confirmContainer}
                onPress={this.confirm}>
                <View style={styles.confirmBtn}>
                  <AnterosText
                    ellipsisMode="tail" numberOfLines={1}
                    style={[styles.confirmText, subFontColor]}>
                    {this._i18n('save', 'text')}
                  </AnterosText>
                </View>
              </TouchableHighlight> :
              <View style={[styles.confirmContainer, styles.confirmContainerDisabled]}>
                <View style={styles.confirmBtn}>
                  <AnterosText
                    ellipsisMode="tail" numberOfLines={1}
                    style={[styles.confirmText, styles.confirmTextDisabled]}>
                    {this._i18n('save', 'text')}
                  </AnterosText>
                </View>
              </View>
            }
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  ctrl: {
    flex: 1.5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 15
  },
  result: {
    flex: 2.5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  resultSlash: {
    width: slashLength,
    height: 1 / scale,
    transform: [
      {
        rotateZ: '-45deg'
      }
    ]
  },
  resultPart: {
    flex: 1
  },
  resultText: {
    fontSize: resultFontSize,
    marginVertical: 4,
    fontWeight: '200'
  },
  clearText: {
    fontSize: 18,
    fontWeight: '400'
  },
  startText: {
    textAlign: 'left'
  },
  endText: {
    textAlign: 'right'
  },
  week: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  weekText: {
    flex: 1,
    fontSize: weekTextFontSize,
    textAlign: 'center'
  },
  scroll: {
    flex: 9,
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  scrollArea: {
    flex: 1
  },
  btn: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmContainer: {
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.40)',
    borderRadius: 4,
    margin: 14,
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  confirmContainerDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.20)'
  },
  confirmText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  confirmTextDisabled: {
    color: 'rgba(255, 255, 255, 0.40)'
  },
  closeIcon: {
    width: iconSize,
    height: iconSize
  }
});



class Month extends Component {
  constructor (props) {
    super(props);
    this._getDayList = this._getDayList.bind(this);
    this._renderDayRow = this._renderDayRow.bind(this);
    this._getMonthText = this._getMonthText.bind(this);
  }
  static I18N_MAP = {
    'zh': [
      '一月', '二月', '三月', '四月', '五月', '六月',
      '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    'jp': [
      '一月', '二月', '三月', '四月', '五月', '六月',
      '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    'en': [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    'ptBR': [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]
  }
  _getMonthText () {
    const {
      month,
      today,
      i18n
    } = this.props;
    let y = month.year();
    let m = month.month();
    let year = today.year();
    if (year === y) {
      return Month.I18N_MAP[i18n][m];
    } else {
      if (i18n === 'en') {
        return `${Month.I18N_MAP[i18n][m]}, ${y}`;
      }
      return month.format('YYYY年M月');
    }
  }
  _getDayList (date) {
    let dayList;
    let month = date.month();
    let weekday = date.isoWeekday();
    if (weekday === 7) {
      dayList = [];
    } else {
      dayList = new Array(weekday).fill({
        empty: date.clone().subtract(1, 'h')
      });
    }
    while (date.month() === month) {
      dayList.push({
        date: date.clone()
      });
      date.add(1, 'days');
    }
    date.subtract(1, 'days');
    weekday = date.isoWeekday();
    if (weekday === 7) {
      return dayList.concat(new Array(6).fill({
        empty: date.clone().hour(1)
      }));
    }
    return dayList.concat(new Array(Math.abs(weekday - 6)).fill({
      empty: date.clone().hour(1)
    }));
  }
  _renderDayRow (dayList, index) {
    const {
      startDate,
      endDate,
      today
    } = this.props;
    return (
      <View style={stylesMonth.dayRow} key={'row' + index}>
        {dayList.map((item, i) =>
          <Day
            date={item.date}
            empty={item.empty}
            {...this.props}
            key={'day' + i}/>
        )}
      </View>
    );
  }
  render () {
    const {
      month,
      today,
      color
    } = this.props;
    let subColor = {color: color.subColor};
    let titleText = this._getMonthText();
    let dayList = this._getDayList(month.clone());
    let rowArray = new Array(dayList.length / 7).fill('');
    return (
      <View style={stylesMonth.month}>
        <View style={stylesMonth.monthTitle}>
          <AnterosText style={[stylesMonth.monthTitleText, subColor]}>{titleText}</AnterosText>
        </View>
        <View style={styles.days}>
          {rowArray.map((item, i) =>
            this._renderDayRow(dayList.slice(i * 7, i * 7 + 7), i)
          )}
        </View>
      </View>
    );
  }
}


const stylesMonth = StyleSheet.create({
  month: {
    paddingTop: 15,
    paddingBottom: 10
  },
  monthTitle: {
    paddingHorizontal: 20
  },
  monthTitleText: {
    fontSize: 24,
    lineHeight: 24,
    fontWeight: '300'
  },
  dayRow: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: 5
  }
});



class MonthList extends Component {
  constructor (props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r2.shouldUpdate;
      }
    });
    this.monthList = [];
    this.state = {
      dataSource: this.ds.cloneWithRows(this._getMonthList())
    };
    this._renderMonth = this._renderMonth.bind(this);
    this._shouldUpdate = this._shouldUpdate.bind(this);
    this._checkRange = this._checkRange.bind(this);
    this._getWeekNums = this._getWeekNums.bind(this);
    this._scrollToSelecetdMonth = this._scrollToSelecetdMonth.bind(this);
  }
  componentWillReceiveProps (nextProps) {
    let isDateUpdated = ['startDate', 'endDate', 'minDate', 'maxDate'].reduce((prev, next) => {
      if (prev || nextProps[next] !== this.props[next]) {
        return true;
      }
      return prev;
    }, false);
    if (isDateUpdated) {
      this.setState({
        dataSource:
          this.state.dataSource.cloneWithRows(this._getMonthList(nextProps))
      });
    }
  }
  _renderMonth (month) {
    return (
      <Month
        month={month.date || {}}
        {...this.props}
      />
    );
  }
  _checkRange (date, start, end) {
    if (!date || !start) return false;
    if (!end) return date.year() === start.year() && date.month() === start.month();
    if (date.year() < start.year() || (date.year() === start.year() && date.month() < start.month())) return false;
    if (date.year() > end.year() || (date.year() === end.year() && date.month() > end.month())) return false;
    return true;
  }
  _shouldUpdate (month, props) {
    if (!props) return false;
    const {
      startDate,
      endDate
    } = props;
    const {
      date
    } = month;
    let next = this._checkRange(date, startDate, endDate);
    let prev = this._checkRange(date, this.props.startDate, this.props.endDate);
    if (prev || next) return true;
    return false;
  }
  _getMonthList (props) {
    let minDate = (props || this.props).minDate.clone().date(1);
    let maxDate = (props || this.props).maxDate.clone();
    let monthList = [];
    if (!maxDate || !minDate) return monthList;
    while (maxDate > minDate || (
      maxDate.year() === minDate.year() &&
      maxDate.month() === minDate.month()
    )) {
      let month = {
        date: minDate.clone()
      };
      month.shouldUpdate = this._shouldUpdate(month, props);
      monthList.push(month);
      minDate.add(1, 'month');
    }
    return monthList;
  }
  _getWeekNums(start, end) {
    let clonedMoment = Moment(start), date, day, num, y, m, total = 0;
    while (!clonedMoment.isSame(end, 'months')) {
      y = clonedMoment.year();
      m = clonedMoment.month();
      date = new Date(y, m, 1);
      day = date.getDay();
      num = new Date(y, m + 1, 0).getDate();
      total += Math.ceil((num + day) / 7);
      clonedMoment.add(1, 'months');
    }
    return total;
  }
  _scrollToSelecetdMonth () {
    const {
      startDate,
      minDate
    } = this.props;
    let monthOffset = 12 * (startDate.year() - minDate.year()) +
      startDate.month() - minDate.month();
    let weekOffset = this._getWeekNums(minDate, startDate);
    setTimeout(() => {
      this.list && this.list.scrollTo({
        x: 0,
        y: monthOffset * (24 + 25) + (monthOffset ? weekOffset * Math.ceil(width / 7 + 10) : 0),
        animated: true
      });
    }, 400);
  }
  componentDidMount () {
    this.props.startDate && this._scrollToSelecetdMonth();
  }
  render () {
    return (
      <ListView
        ref={(list) => {this.list = list;}}
        style={styles.scrollArea}
        dataSource={this.state.dataSource}
        renderRow={this._renderMonth}
        pageSize={2}
        initialListSize={2}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

class Day extends Component {
  static propTypes = {
    onChoose: PropTypes.func
  }
  constructor (props) {
    super(props);
    this._chooseDay = this._chooseDay.bind(this);
    this._statusCheck = this._statusCheck.bind(this);
    this._statusCheck();
  }
  _chooseDay () {
    this.props.onChoose && this.props.onChoose(this.props.date);
  }
  _statusCheck (props) {
    const {
      startDate,
      endDate,
      today,
      date = null,
      minDate,
      maxDate,
      empty
    } = props || this.props;
    this.isToday = today.isSame(date, 'd');
    this.isValid = date &&
      (date >= minDate || date.isSame(minDate, 'd')) &&
      (date <= maxDate || date.isSame(maxDate, 'd'));
    this.isMid = date > startDate && date < endDate ||
      (!date && empty >= startDate && empty <= endDate);
    this.isStart = date && date.isSame(startDate, 'd');
    this.isStartPart = this.isStart && endDate;
    this.isEnd = date && date.isSame(endDate, 'd');
    this.isFocus = this.isMid || this.isStart || this.isEnd;
    return this.isFocus;
  }
  shouldComponentUpdate (nextProps) {
    let prevStatus = this.isFocus;
    let nextStatus = this._statusCheck(nextProps);
    if (prevStatus || nextStatus) return true;
    return false;
  }
  render () {
    const {
      date,
      color
    } = this.props;
    let text = date ? date.date() : '';
    let mainColor = {color: color.mainColor};
    let subColor = {color: color.subColor};
    let mainBack = {backgroundColor: color.mainColor};
    let subBack = {backgroundColor: color.subColor};
    return (
      <View
        style={[
          stylesDay.dayContainer,
          this.isMid && subBack,
          this.isStartPart && stylesDay.startContainer,
          this.isEnd && stylesDay.endContainer,
          (this.isStartPart || this.isEnd) && subBack
        ]}>
        {this.isValid ?
          <TouchableHighlight
            style={[stylesDay.day, this.isToday && stylesDay.today, this.isFocus && subBack]}
            underlayColor="rgba(255, 255, 255, 0.35)"
            onPress={this._chooseDay}>
            <AnterosText style={[stylesDay.dayText, subColor, this.isFocus && mainColor]}>{text}</AnterosText>
          </TouchableHighlight> :
          <View style={[stylesDay.day, this.isToday && stylesDay.today]}>
            <AnterosText style={stylesDay.dayTextDisabled}>{text}</AnterosText>
          </View>
        }
      </View>
    );
  }
}



let dayWidth = width / 7;
let mod = scale * width % 7;
if (mod) {
  dayWidth = ((7 - mod) / scale + width) / 7;
}
const stylesDay = StyleSheet.create({
  dayContainer: {
    width: dayWidth,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startContainer: {
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100
  },
  endContainer: {
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100
  },
  today: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.40)'
  },
  day: {
    width: dayWidth,
    height: dayWidth,
    borderRadius: dayWidth / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dayText: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center'
  },
  dayTextDisabled: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.54)',
    textAlign: 'center'
  }
});