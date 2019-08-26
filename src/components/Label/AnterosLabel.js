// AnterosLabel.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Text} from 'react-native';

import AnterosTheme from '../../themes/AnterosTheme';
import {scale} from '../../utils/AnterosUtils';

export default class AnterosLabel extends Component {

  static propTypes = {
    ...Text.propTypes,
    type: PropTypes.oneOf(['default', 'title', 'detail', 'danger']),
    size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  static defaultProps = {
    ...Text.defaultProps,
    type: 'default',
    size: 'md',
    numberOfLines: 1
  };

  buildProps() {
    let {
      type,
      size,
      style,
      text,
      children,
      ...others
    } = this.props;

    let color,
      fontSize, fontFamily;
    switch (size) {
      case 'xl':
        fontSize = scale(AnterosTheme.labelFontSizeXL);
        break;
      case 'lg':
        fontSize = scale(AnterosTheme.labelFontSizeLG);
        break;
      case 'sm':
        fontSize = scale(AnterosTheme.labelFontSizeSM);
        break;
      case 'xs':
        fontSize = scale(AnterosTheme.labelFontSizeXS);
        break;
      default:
        fontSize = scale(AnterosTheme.labelFontSizeMD);
    }
    switch (type) {
      case 'title':
        color = AnterosTheme.labelTextTitleColor;
        fontSize = Math.round(fontSize * AnterosTheme.labelTitleScale);
        break;
      case 'detail':
        color = AnterosTheme.labelTextDetailColor;
        fontSize = Math.round(fontSize * AnterosTheme.labelDetailScale);
        break;
      case 'danger':
        color = AnterosTheme.labelTextDangerColor;
        fontSize = Math.round(fontSize * AnterosTheme.labelDangerScale);
        break;
      default:
        color = AnterosTheme.labelTextColor;
    }
    fontFamily = AnterosTheme.labelFontFamily;
    style = [
      {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: color,
        fontSize: fontSize,
        overflow: 'hidden',
        fontFamily
      }
    ].concat(style);

    if (text || text === '' || text === 0) 
      children = text;
    
    let newProps = {
      type,
      size,
      style,
      text,
      children,
      ...others
    };
    return newProps;
  }

  render() {
    let newProps = this.buildProps();
    return <Text {...newProps}/>
  }
}
