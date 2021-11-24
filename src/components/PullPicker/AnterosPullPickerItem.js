// PullPickerItem.js

'use strict';

import React,{Component} from "react";
import PropTypes from 'prop-types';

import {AnterosListRow} from '../ListRow/AnterosListRow';
export class AnterosPullPickerItem extends AnterosListRow {

  constructor(props){
    super(props);
  }

  static propTypes = {
    ...AnterosListRow.propTypes,
    selected: PropTypes.bool,
  };

  renderAccessory(accessory = null) {
    return super.renderAccessory(this.props.selected ? 'check' : 'empty');
  }

}
