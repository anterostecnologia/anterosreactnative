import React from 'react';
import {View, StyleSheet} from 'react-native';

export const AnterosSeparator = ({ style }) => <View style={[styles.separator, style]} />;

const styles = StyleSheet.create({
    separator: {
      backgroundColor: "#dcdcdc",
      marginTop: 2,
      marginBottom: 13,
      width: "100%",
      height: 1,
    }
});