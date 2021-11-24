// SelectRow.js

'use strict';

import {Component} from 'react';
import PropTypes from 'prop-types';

import {AnterosTheme, AnterosListRow, AnterosSelect} from 'anteros-react-native';

export class SelectRow extends AnterosListRow {

  static propTypes = {
    ...AnterosListRow.propTypes,
    value: PropTypes.any,
    items: PropTypes.array,
    getItemValue: PropTypes.func,
    getItemText: PropTypes.func,
    emptyText: PropTypes.string,
    emptyTextColor: PropTypes.string,
    onSelected: PropTypes.func.isRequired
  };

  static defaultProps = {
    ...AnterosListRow.defaultProps,
    emptyText: 'Select item',
    emptyTextColor: '#ff8f99'
  };

  buildProps() {
    let {
      title,
      detail,
      value,
      items,
      getItemValue,
      getItemText,
      emptyText,
      emptyTextColor,
      onSelected,
      ...others
    } = this.props;
    detail = (<AnterosSelect
      style={{
      borderWidth: 0,
      flex: 1
    }}
      value={value}
      valueStyle={{
      textAlign: 'right'
    }}
      items={items}
      getItemValue={getItemValue}
      getItemText={getItemText}
      editable={items && items.length > 0}
      placeholder={emptyText}
      placeholderTextColor={emptyTextColor}
      pickerTitle={typeof title === 'string'
      ? title
      : null}
      onSelected={(item, index) => onSelected && onSelected(items[index], index)}/>);

    this.props = {
      title,
      detail,
      value,
      items,
      getItemValue,
      getItemText,
      emptyText,
      emptyTextColor,
      onSelected,
      ...others
    };

    super.buildProps();
  }

}
