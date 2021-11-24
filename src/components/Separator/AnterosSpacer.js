import {
    Component,
  } from 'react';
  
  import {
    View,
  } from 'react-native';

export const AnterosSpacer = ({ height }) => (
    <View
      pointerEvents="none"
      style={{
        height,
      }}
    />
  );