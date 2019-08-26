// PullPickerItem.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';

import AnterosListRow from '../ListRow/AnterosListRow';

export default class AnterosPullPickerItem extends AnterosListRow {

  static propTypes = {
    ...AnterosListRow.propTypes,
    selected: PropTypes.bool,
  };

  buildProps() {
    let {selected, accessory, ...others} = this.props;
    accessory = selected ? 'check' : 'empty';
    this.props = {selected, accessory, ...others} ;

    super.buildProps();
  }

}

              
