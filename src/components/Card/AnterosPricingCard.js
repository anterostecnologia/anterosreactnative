import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet, Platform,  ViewPropTypes as RNViewPropTypes } from 'react-native';
import {AnterosText, fonts, normalize} from '../Text/AnterosText';
import {AnterosButton} from '../Button/AnterosButton';
import {AnterosIcon} from '../Icon/AnterosIcon';
const ViewPropTypes = RNViewPropTypes || View.propTypes;


const colors = {
    primary: '#2089dc',
    secondary: '#8F0CE8',
    grey0: '#393e42',
    grey1: '#43484d',
    grey2: '#5e6977',
    grey3: '#86939e',
    grey4: '#bdc6cf',
    grey5: '#e1e8ee',
    greyOutline: '#bbb',
    searchBg: '#303337',
    error: '#ff190c',
  };

export const AnterosPricingCard = props => {
  const {
    containerStyle,
    wrapperStyle,
    title,
    price,
    info,
    button,
    color,
    titleFont,
    pricingFont,
    infoFont,
    onButtonPress,
    ...attributes
  } = props;
  return (
    <View
      {...attributes}
      style={[styles.container, containerStyle && containerStyle]}
    >
      <View style={[styles.wrapper, wrapperStyle && wrapperStyle]}>
        <AnterosText
          style={[
            styles.pricingTitle,
            { color },
            titleFont && { fontFamily: titleFont },
          ]}
        >
          {title}
        </AnterosText>
        <AnterosText
          style={[
            styles.pricingPrice,
            pricingFont && { fontFamily: pricingFont },
          ]}
        >
          {price}
        </AnterosText>
        {info.map((item, i) => {
          return (
            <AnterosText
              key={i}
              style={[styles.pricingInfo, infoFont && { fontFamily: infoFont }]}
            >
              {item}
            </AnterosText>
          );
        })}
        <AnterosButton
          title={button.title}
          buttonStyle={[
            styles.button,
            button.buttonStyle,
            { backgroundColor: color },
          ]}
          onPress={onButtonPress}
          icon={<AnterosIcon name={button.icon} type={button.type} size={15} color="white" />}
        />
      </View>
    </View>
  );
};

AnterosPricingCard.propTypes = {
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  title: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  info: PropTypes.array,
  button: PropTypes.object,
  color: PropTypes.string,
  onButtonPress: PropTypes.any,
  titleFont: PropTypes.string,
  pricingFont: PropTypes.string,
  infoFont: PropTypes.string,
  buttonFont: PropTypes.string,
};

AnterosPricingCard.defaultProps = {
  color: colors.primary,
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    marginBottom: 15,
    backgroundColor: 'white',
    borderColor: colors.grey5,
    borderWidth: 1,
    padding: 15,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 0.5,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  wrapper: {
    backgroundColor: 'transparent',
  },
  pricingTitle: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: normalize(30),
    ...Platform.select({
      ios: {
        fontWeight: '800',
      },
      android: {
        ...fonts.android.black,
      },
    }),
  },
  pricingPrice: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: normalize(40),
    ...Platform.select({
      ios: {
        fontWeight: '700',
      },
      android: {
        ...fonts.android.bold,
      },
    }),
  },
  pricingInfo: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    color: colors.grey3,
    ...Platform.select({
      ios: {
        fontWeight: '600',
      },
      android: {
        ...fonts.android.bold,
      },
    }),
  },
  button: {
    marginTop: 15,
    marginBottom: 10,
  },
});