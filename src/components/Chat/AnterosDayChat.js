/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import moment from 'moment';

import Color from './AnterosColorChat';

import { isSameDay, isSameUser, warnDeprecated } from './AnterosUtilsChat';
import { DATE_FORMAT } from './AnterosConstantChat';

export default function AnterosDayChat(
  { dateFormat, currentMessage, previousMessage, nextMessage, containerStyle, wrapperStyle, textStyle, inverted },
  context,
) {
  if (!isSameDay(currentMessage, inverted ? previousMessage : nextMessage)) {
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={wrapperStyle}>
          <Text style={[styles.text, textStyle]}>
            {moment(currentMessage.createdAt)
              .locale(context.getLocale())
              .format(dateFormat)
              .toUpperCase()}
          </Text>
        </View>
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  text: {
    backgroundColor: Color.backgroundTransparent,
    color: Color.defaultColor,
    fontSize: 12,
    fontWeight: '600',
  },
});

AnterosDayChat.contextTypes = {
  getLocale: PropTypes.func,
};

AnterosDayChat.defaultProps = {
  currentMessage: {
    // TODO: test if crash when createdAt === null
    createdAt: null,
  },
  previousMessage: {},
  nextMessage: {},
  containerStyle: {},
  wrapperStyle: {},
  textStyle: {},
  // TODO: remove in next major release
  isSameDay: warnDeprecated(isSameDay),
  isSameUser: warnDeprecated(isSameUser),
  dateFormat: DATE_FORMAT,
};

AnterosDayChat.propTypes = {
  currentMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  inverted: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  // TODO: remove in next major release
  isSameDay: PropTypes.func,
  isSameUser: PropTypes.func,
  dateFormat: PropTypes.string,
};
