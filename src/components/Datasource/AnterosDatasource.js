 import { AnterosJacksonParser,AnterosUtils,AnterosDateUtils,
     AnterosDatasourceError,Anteros,AnterosObjectUtils } from '../anteros-core';
import axios from 'axios';
import { cloneDeep, clone } from 'lodash';
import React from 'react';


const dataSourceConstants = {
    DS_BROWSE: 'dsBrowse',
    DS_INSERT: 'dsInsert',
    DS_EDIT: 'dsEdit',
  };
  
  const dataSourceEvents = {
    BEFORE_OPEN: 'beforeOpen',
    AFTER_OPEN: 'afterOpen',
    BEFORE_CLOSE: 'beforeClose',
    AFTER_CLOSE: 'afterClose',
    BEFORE_GOTO_PAGE: 'beforeGoToPage',
    AFTER_GOTO_PAGE: 'afterGoToPage',
    AFTER_SCROLL: 'afterScroll',
    BEFORE_EDIT: 'beforeEdit',
    BEFORE_DELETE: 'befeoreDelete',
    AFTER_EDIT: 'afterEdit',
    AFTER_DELETE: 'afterDelete',
    BEFORE_POST: 'beforePost',
    AFTER_POST: 'afterPost',
    BEFORE_CANCEL: 'beforeCancel',
    AFTER_CANCEL: 'afterCancel',
    BEFORE_INSERT: 'beforeInsert',
    AFTER_INSERT: 'afterInsert',
    BEFORE_VALIDATE: 'beforeValidate',
    AFTER_VALIDATE: 'afterValidate',
    DATA_FIELD_CHANGED: 'dataFieldChanged',
    ON_ERROR: 'onError',
  };
  
  const DATASOURCE_EVENTS = [
    dataSourceEvents.AFTER_DELETE,
    dataSourceEvents.BEFORE_OPEN,
    dataSourceEvents.AFTER_OPEN,
    dataSourceEvents.BEFORE_CLOSE,
    dataSourceEvents.AFTER_CLOSE,
    dataSourceEvents.AFTER_EDIT,
    dataSourceEvents.AFTER_INSERT,
    dataSourceEvents.AFTER_CANCEL,
    dataSourceEvents.ON_ERROR,
    dataSourceEvents.BEFORE_GOTO_PAGE,
    dataSourceEvents.AFTER_GOTO_PAGE,
  ];
  
  class AnterosDatasource {
    constructor() {
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.addEventListener = this.addEventListener.bind(this);
      this.removeEventListener = this.removeEventListener.bind(this);
      this.dispatchEvent = this.dispatchEvent.bind(this);
      this.getData = this.getData.bind(this);
      this.getTotalPages = this.getTotalPages.bind(this);
      this.getCurrentPage = this.getCurrentPage.bind(this);
      this.getTotalRecords = this.getTotalRecords.bind(this);
      this.getGrandTotalRecords = this.getGrandTotalRecords.bind(this);
      this.getSizeOfPage = this.getSizeOfPage.bind(this);
      this.goToPage = this.goToPage.bind(this);
      this.isEmpty = this.isEmpty.bind(this);
      this.isEOF = this.isEOF.bind(this);
      this.isBOF = this.isBOF.bind(this);
      this.getCurrentRecord = this.getCurrentRecord.bind(this);
      this.getState = this.getState.bind(this);
      this.getPrimaryKeyFields = this.getPrimaryKeyFields.bind(this);
      this.getPrimaryKey = this.getPrimaryKey.bind(this);
      this.getRecno = this.getRecno.bind(this);
      this.gotoRecordByPrimaryKey = this.gotoRecordByPrimaryKey.bind(this);
      this.gotoRecord = this.gotoRecord.bind(this);
      this.gotoRecordByData = this.gotoRecordByData.bind(this);
      this.isFirst = this.isFirst.bind(this);
      this.isLast = this.isLast.bind(this);
      this.first = this.first.bind(this);
      this.last = this.last.bind(this);
      this.next = this.next.bind(this);
      this.prior = this.prior.bind(this);
      this.previous = this.previous.bind(this);
      this.hasNext = this.hasNext.bind(this);
      this.hasPrior = this.hasPrior.bind(this);
      this.hasPrevious = this.hasPrevious.bind(this);
      this.insert = this.insert.bind(this);
      this.edit = this.edit.bind(this);
      this.delete = this.delete.bind(this);
      this.post = this.post.bind(this);
      this.cancel = this.cancel.bind(this);
      this.isOpen = this.isOpen.bind(this);
      this._validateDelete = this._validateDelete.bind(this);
      this._validateInsert = this._validateInsert.bind(this);
      this._validateEdit = this._validateEdit.bind(this);
      this._validateCancel = this._validateCancel.bind(this);
      this._validatePost = this._validatePost.bind(this);
      this.disabledAllListeners = this.disabledAllListeners.bind(this);
      this.enableAllListeners = this.enableAllListeners.bind(this);
      this.data = [];
      this.listeners = [];
      this.totalPages = 0;
      this.currentPage = 0;
      this.totalRecords = 0;
      this.grandTotalRecords = 0;
      this.sizeOfPage = 0;
      this.dsState = dataSourceConstants.DS_BROWSE;
      this.currentRecord = null;
      this.currentRecno = -1;
      this.primaryKeyFields = [];
      this.oldRecordInsert = null;
      this.oldRecnoInsert = null;
      this.active = false;
  
      this.getTotalPages = this.getTotalPages.bind(this);
      this.contentProperty = 'content';
      this.totalPagesProperty = 'totalPages';
      this.currentPageProperty = 'number';
      this.totalRecordsProperty = 'numberOfElements';
      this.sizeOfPageProperty = 'size';
      this.grandTotalRecordsProperty = 'totalElements';
  
      this.setContentProperty = this.setContentProperty.bind(this);
      this.setTotalPagesProperty = this.setTotalPagesProperty.bind(this);
      this.setCurrentPageProperty = this.setCurrentPageProperty.bind(this);
      this.setTotalRecordsProperty = this.setTotalRecordsProperty.bind(this);
      this.setSizeOfPageProperty = this.setSizeOfPageProperty.bind(this);
      this.setGrandTotalRecordsProperty = this.setGrandTotalRecordsProperty.bind(
        this,
      );
      this.fieldByName = this.fieldByName.bind(this);
      this.isEmptyField = this.isEmptyField.bind(this);
      this.setFieldByName = this.setFieldByName.bind(this);
  
      this._enableListeners = true;
    }
  
    setContentProperty(name) {
      this.contentProperty = name;
    }
    setTotalPagesProperty(name) {
      this.totalPagesProperty = name;
    }
    setCurrentPageProperty(name) {
      this.currentPageProperty = name;
    }
    setTotalRecordsProperty(name) {
      this.totalRecordsProperty = name;
    }
    setSizeOfPageProperty(name) {
      this.sizeOfPageProperty = name;
    }
    setGrandTotalRecordsProperty(name) {
      this.setGrandTotalRecordsProperty = name;
    }
  
    open() {
      this.close();
      this.data = [];
      this.active = true;
      this.dispatchEvent(dataSourceEvents.BEFORE_OPEN);
    }
  
    isOpen() {
      return this.active;
    }
  
    close() {
      if (this.active) {
        this.active = false;
        this.dispatchEvent(dataSourceEvents.BEFORE_CLOSE);
      }
    }
  
    getData() {
      return this.data;
    }
  
    getTotalPages() {
      return this.totalPages;
    }
  
    getCurrentPage() {
      return this.currentPage;
    }
  
    getTotalRecords() {
      return this.totalRecords;
    }
  
    getSizeOfPage() {
      return this.sizeOfPage;
    }
  
    goToPage(page) {
      this.currentPage = page;
    }
  
    getGrandTotalRecords() {
      return this.grandTotalRecords;
    }
  
    isEmpty() {
      return this.getTotalRecords() == 0;
    }
  
    getCurrentRecord() {
      return this.currentRecord;
    }
  
    getPrimaryKeyFields() {
      return this.primaryKeyFields;
    }
  
    getState() {
      return this.dsState;
    }
  
    getRecno() {
      return this.currentRecno;
    }
    gotoRecordByPrimaryKey(values) {
      if (this.getState() != dataSourceConstants.DS_BROWSE) {
        console.log("gotoRecordByPrimaryKey => Registro atual está sendo inserido ou editado.");
        throw new AnterosDatasourceError(
          'Registro atual está sendo inserido ou editado.',
        );
      }
      if (!values) {
        console.log("gotoRecordByPrimaryKey => Informe os valores da chave primária para ir para um registro.");
        throw new AnterosDatasourceError(
          'Informe os valores da chave primária para ir para um registro.',
        );
      }
      let arrValues = React.Children.toArray(values);
      if (arrValues.length != getPrimaryKeyFields().length) {
        console.log("gotoRecordByPrimaryKey => Número de valores da chave primária incorretos.");
        throw new AnterosDatasourceError(
          'Número de valores da chave primária incorretos.',
        );
      }
  
      if (!this.primaryKeyFields || this.primaryKeyFields.length == 0) {
        console.log("gotoRecordByPrimaryKey => Campos da chave primária do Datasource não foram definidas.");
        throw new AnterosDatasourceError(
          'Campos da chave primária do Datasource não foram definidas.',
        );
      }
  
      if (this.data) {
        let _this = this;
        this.data.forEach(function (record) {
          let _record = record;
          let _primaryKeyFields = _this.getPrimaryKeyFields();
          let found = 0;
          this.arrValues.forEach(function (value, index) {
            if (_record[_primaryKeyFields[index]] == value) {
              found++;
            }
          });
          if (found == _primaryKeyFields.length) {
            return record;
          }
        });
      }
    }
  
    getPrimaryKey() {
      let result = [];
      if (!this.isEmpty()) {
        this.primaryKeyFields.forEach(function (field, index) {
          result.push({
            field: this.currentRecord[field],
          });
        });
      }
    }
    gotoRecord(recno) {
      if (this.getState() != dataSourceConstants.DS_BROWSE) {
        console.log("gotoRecord => Registro atual está sendo inserido ou editado.");
        throw new AnterosDatasourceError(
          'Registro atual está sendo inserido ou editado.',
        );
      }
  
      if (recno == undefined || recno < 0) {
        console.log("gotoRecord => Número do registro informado inválido " + recno);
        throw new AnterosDatasourceError(
          'Número do registro informado inválido ' + recno,
        );
      }
      if (this.isEmpty()) {
        console.log("gotoRecord => Não há registros para posicionar ");
        throw new AnterosDatasourceError('Não há registros para posicionar.');
      }
  
      if (recno > this.getTotalRecords() - 1) {
        console.log("gotoRecord => Número do registro maior que o total de registros");
        throw new AnterosDatasourceError(
          'Número do registro maior que o total de registros.',
        );
      }
  
      this.currentRecno = recno;
      this.currentRecord = this.data[recno];
      this.dispatchEvent(dataSourceEvents.AFTER_SCROLL);
    }
  
    gotoRecordByData(record) {
      let _this = this;
      if (this.getState() != dataSourceConstants.DS_BROWSE) {
        console.log("gotoRecordByData => Registro atual está sendo inserido ou editado.");
        throw new AnterosDatasourceError(
          'Registro atual está sendo inserido ou editado.',
        );
      }
  
      if (this.isEmpty()) {
        return false;
      }
      if (this.currentRecord == record) {
        return true;
      }
  
      let found = false;
      this.data.forEach(function (r, index) {
        if (record == r) {
          _this.currentRecno = index;
          _this.currentRecord = r;
          _this.dispatchEvent(dataSourceEvents.AFTER_SCROLL);
          found = true;
        }
      });
      return found;
    }
  
    isEmptyField(fieldName) {
      return (
        this.fieldByName(fieldName) === undefined ||
        this.fieldByName(fieldName) === ''
      );
    }
  
    fieldByName(fieldName, defaultValue) {
      if (!fieldName) {
        console.log("fieldByName => Nome do campo inválido "+fieldName);
        throw new AnterosDatasourceError('Nome do campo inválido.');
      }
      if (this.isEmpty()) {
        return;
      }
      if (this.isBOF()) {
        console.log("fieldByName => Inicio do Datasource encontrado");
        throw new AnterosDatasourceError('Inicio do Datasource encontrado.');
      }
      if (this.isBOF()) {
        console.log("fieldByName => Fim do Datasource encontrado");
        throw new AnterosDatasourceError('Fim do Datasource encontrado.');
      }
  
      let record = this.data[this.currentRecno];
      if (this.getState() == dataSourceConstants.DS_EDIT) {
        record = this.currentRecord;
      }
  
      let value = this._fieldByName(record, fieldName);
      if (value === undefined && defaultValue !== undefined) {
        value = defaultValue;
      }
      return value;
    }
  
    _fieldByName(record, fieldName) {
      let value = AnterosObjectUtils.getNestedProperty(record, fieldName);
      if (value == undefined) {
        return;
      }
      let date = AnterosDateUtils.parseDateWithFormat(
        value,
        Anteros.dataSourceDatetimeFormat,
      );
      if (date instanceof Date) {
        return date;
      }
      return value;
    }
  
    setFieldByName(fieldName, value) {
      if (this.isEmpty()) {
        return;
      }
      if (this.getState() == dataSourceConstants.DS_BROWSE) {
        console.log("setFieldByName => Registro não está sendo inserido ou editado.");
        throw new AnterosDatasourceError(
          'Registro não está sendo inserido ou editado.',
        );
      }
      let newValue = value;
      if (value instanceof Date) {
        newValue = AnterosDateUtils.formatDate(
          value,
          Anteros.dataSourceDatetimeFormat,
        );
      }
      AnterosObjectUtils.setNestedProperty(
        this.currentRecord,
        fieldName,
        newValue,
      );
  
      this.dispatchEvent(dataSourceEvents.DATA_FIELD_CHANGED, null, fieldName);
    }
  
    locate(values) {
      if (this.getState() != dataSourceConstants.DS_BROWSE) {
        console.log("locate => Registro atual está sendo inserido ou editado.");
        throw new AnterosDatasourceError(
          'Registro atual está sendo inserido ou editado.',
        );
      }
  
      if (this.isEmpty()) {
        return false;
      }
  
      let found = -1;
      let _this = this;
      let index = -1;
      this.data.forEach(function (record) {
        index++;
        for (var propertyName in values) {
          if (_this._fieldByName(record, propertyName) == values[propertyName]) {
            found = index;
          }
        }
      });
  
      if (found >= 0) {
        this.gotoRecord(found);
      }
      return found >= 0;
    }
  
    isEOF() {
      return this.currentRecno > this.totalRecords - 1 || this.isEmpty();
    }
  
    isBOF() {
      return this.currentRecno == -1;
    }
  
    isFirst() {
      return this.currentRecno == 0;
    }
  
    isLast() {
      return this.currentRecno == this.getTotalRecords - 1;
    }
  
    first() {
      if (this.getState() != dataSourceConstants.DS_BROWSE) {
        console.log("first => Registro atual está sendo inserido ou editado.");
        throw new AnterosDatasourceError(
          'Registro atual está sendo inserido ou editado.',
        );
      }
  
      if (this.getTotalRecords() > 0) {
        this.currentRecno = 0;
        this.currentRecord = this.data[this.currentRecno];
        this.dispatchEvent(dataSourceEvents.AFTER_SCROLL);
      } else {
        this.currentRecno = -1;
        this.currentRecord = null;
      }
    }
  
    last() {
      if (this.getState() != dataSourceConstants.DS_BROWSE) {
        console.log("last => Registro atual está sendo inserido ou editado.");
        throw new AnterosDatasourceError(
          'Registro atual está sendo inserido ou editado.',
        );
      }
  
      if (this.getTotalRecords() > 0) {
        this.currentRecno = this.getTotalRecords() - 1;
        this.currentRecord = this.data[this.currentRecno];
        this.dispatchEvent(dataSourceEvents.AFTER_SCROLL);
      } else {
        this.currentRecno = -1;
        this.currentRecord = null;
      }
    }
  
    next() {
      if (this.getState() != dataSourceConstants.DS_BROWSE) {
        console.log("next => Registro atual está sendo inserido ou editado.");
        throw new AnterosDatasourceError(
          'Registro atual está sendo inserido ou editado.',
        );
      }
  
      if (this.isEmpty()) {
        console.log("next => Não há registros. Impossível avançar um registro.");
        throw new AnterosDatasourceError(
          'Não há registros. Impossível avançar um registro.',
        );
      }
      if (this.isEOF()) {
        console.log("next => Não é possível avançar pois você já está no final do DataSource.");
        throw new AnterosDatasourceError(
          'Não é possível avançar pois você já está no final do DataSource.',
        );
      }
      if (this.currentRecno + 1 > this.getTotalRecords() - 1) {
        this.currentRecno = this.currentRecno + 1;
        this.currentRecord = null;
      } else {
        this.currentRecno = this.currentRecno + 1;
        this.currentRecord = this.data[this.currentRecno];
        this.dispatchEvent(dataSourceEvents.AFTER_SCROLL);
      }
    }
  
    prior() {
      if (this.getState() != dataSourceConstants.DS_BROWSE) {
        console.log("prior => Registro atual está sendo inserido ou editado.");
        throw new AnterosDatasourceError(
          'Registro atual está sendo inserido ou editado.',
        );
      }
  
      if (this.isEmpty()) {
        console.log("prior => Não há registros. Impossível voltar um registro.");
        throw new AnterosDatasourceError(
          'Não há registros. Impossível voltar um registro.',
        );
      }
      if (this.isBOF()) {
        console.log("prior => Não há registros. Não é possível retroceder pois você já está no inicio do DataSource.");
        throw new AnterosDatasourceError(
          'Não é possível retroceder pois você já está no inicio do DataSource.',
        );
      }
      if (this.currentRecno - 1 < 0) {
        this.currentRecno = -1;
        this.currentRecord = null;
      } else {
        this.currentRecno = this.currentRecno - 1;
        this.currentRecord = this.data[this.currentRecno];
        this.dispatchEvent(dataSourceEvents.AFTER_SCROLL);
      }
    }
  
    previous() {
      this.prior();
    }
  
    hasNext() {
      if (this.isEmpty() || this.isEOF()) {
        return false;
      } else {
        return this.currentRecno + 1 <= this.getTotalRecords() - 1;
      }
    }
  
    hasPrior() {
      if (this.isEmpty() || this.isBOF()) {
        return false;
      } else {
        return this.currentRecno - 1 >= 0;
      }
    }
  
    hasPrevious() {
      return this.hasPrior();
    }
  
    _validateInsert() {
      if (!this.isOpen()) {
        console.log("_validateInsert => Não é possível realizar INSERT com o dataSource fechado.");
        throw new AnterosDatasourceError(
          'Não é possível realizar INSERT com o dataSource fechado.',
        );
      }
      if (this.getState() == dataSourceConstants.DS_EDIT) {
        console.log("_validateInsert => Registro já está sendo editado.");
        throw new AnterosDatasourceError('Registro já está sendo editado.');
      }
      if (this.getState() == dataSourceConstants.DS_INSERT) {
        console.log("_validateInsert => v");
        throw new AnterosDatasourceError('Registro já está sendo inserido.');
      }
    }
  
    insert() {
      this._validateInsert();
      this.dispatchEvent(dataSourceEvents.BEFORE_INSERT);
      this.oldRecordInsert = this.getCurrentRecord();
      this.oldRecnoInsert = this.getRecno();
      this.totalRecords++;
      this.grandTotalRecords++;
      let nextRecord = this.getTotalRecords();
      this.data[nextRecord - 1] = {};
      this.currentRecord = this.data[nextRecord - 1];
      this.currentRecno = nextRecord - 1;
      this.dsState = dataSourceConstants.DS_INSERT;
      this.dispatchEvent(dataSourceEvents.AFTER_SCROLL);
      this.dispatchEvent(dataSourceEvents.AFTER_INSERT);
    }
  
    _validateDelete() {
      if (this.isEmpty()) {
        console.log("_validateDelete => Não há registros para remover.");
        throw new AnterosDatasourceError('Não há registros para remover.');
      }
      if (this.isBOF()) {
        console.log("_validateDelete => Inicio do Datasource encontrado.");
        throw new AnterosDatasourceError('Inicio do Datasource encontrado.');
      }
      if (this.isBOF()) {
        console.log("_validateDelete => Fim do Datasource encontrado.");
        throw new AnterosDatasourceError('Fim do Datasource encontrado.');
      }
      if (this.getState() == dataSourceConstants.DS_EDIT) {
        console.log("_validateDelete => Registro já está sendo editado.");
        throw new AnterosDatasourceError('Registro já está sendo editado.');
      }
      if (this.getState() == dataSourceConstants.DS_INSERT) {
        console.log("_validateDelete => Registro já está sendo inserido.");
        throw new AnterosDatasourceError('Registro já está sendo inserido.');
      }
    }
  
    delete(callback) {
      this._validateDelete();
      this.dispatchEvent(dataSourceEvents.BEFORE_DELETE);
      this.data.splice(this.currentRecno, 1);
      this.totalRecords--;
      this.grandTotalRecords--;
      if (this.data.length == 0) this.currentRecord = undefined;
      else this.currentRecord = this.data[this.currentRecno];
      this.dsState = dataSourceConstants.DS_BROWSE;
      this.dispatchEvent(dataSourceEvents.AFTER_SCROLL);
      this.dispatchEvent(dataSourceEvents.AFTER_DELETE);
  
      if (callback) callback();
    }
  
    _validateEdit() {
      if (!this.isOpen()) {
        console.log("_validateEdit => Não é possível realizar EDIT com o dataSource fechado.");
        throw new AnterosDatasourceError(
          'Não é possível realizar EDIT com o dataSource fechado.',
        );
      }
      if (this.isEmpty()) {
        console.log("_validateEdit => Não há registros para editar.");
        throw new AnterosDatasourceError('Não há registros para editar.');
      }
      if (this.isBOF()) {
        console.log("_validateEdit => Inicio do Datasource encontrado");
        throw new AnterosDatasourceError('Inicio do Datasource encontrado.');
      }
      if (this.isBOF()) {
        console.log("_validateEdit => Fim do Datasource encontrado.");
        throw new AnterosDatasourceError('Fim do Datasource encontrado.');
      }
      if (this.getState() == dataSourceConstants.DS_EDIT) {
        console.log("_validateEdit => Registro já está sendo editado.");
        throw new AnterosDatasourceError('Registro já está sendo editado.');
      }
      if (this.getState() == dataSourceConstants.DS_INSERT) {
        console.log("_validateEdit => Registro já está sendo inserido.");
        throw new AnterosDatasourceError('Registro já está sendo inserido.');
      }
    }
  
    edit() {
      this._validateEdit();
      this.dispatchEvent(dataSourceEvents.BEFORE_EDIT);
      this.dsState = dataSourceConstants.DS_EDIT;
      this.currentRecord = cloneDeep(this.currentRecord);
      this.dispatchEvent(dataSourceEvents.AFTER_EDIT);
    }
  
    _validatePost() {
      if (this.dsState == dataSourceConstants.DS_BROWSE) {
        console.log("_validatePost => Registro não está sendo inserido ou editado.");
        throw new AnterosDatasourceError(
          'Registro não está sendo inserido ou editado.',
        );
      }
    }
  
    post(callback) {
      this._validatePost();
      this.dispatchEvent(dataSourceEvents.BEFORE_POST);
      if (this.dsState == dataSourceConstants.DS_EDIT) {
        this.data[this.getRecno()] = this.currentRecord;
      }
      this.dsState = dataSourceConstants.DS_BROWSE;
      this.dispatchEvent(dataSourceEvents.AFTER_POST);
      if (callback) callback();
    }
  
    _validateCancel() {
      if (this.dsState == dataSourceConstants.DS_BROWSE) {
        console.log("_validateCancel => Registro não está sendo inserido ou editado.");
        throw new AnterosDatasourceError(
          'Registro não está sendo inserido ou editado.',
        );
      }
    }
  
    cancel() {
      this._validateCancel();
      this.dispatchEvent(dataSourceEvents.BEFORE_CANCEL);
      if (this.dsState == dataSourceConstants.DS_INSERT) {
        this.data.splice(this.currentRecno, 1);
        this.currentRecord = this.oldRecordInsert;
        this.currentRecno = this.oldRecnoInsert;
        this.totalRecords--;
        this.grandTotalRecords--;
        this.dsState = dataSourceConstants.DS_BROWSE;
        this.dispatchEvent(dataSourceEvents.AFTER_SCROLL);
      } else {
        this.currentRecord = this.data[this.currentRecno];
      }
      this.dsState = dataSourceConstants.DS_BROWSE;
      this.dispatchEvent(dataSourceEvents.AFTER_CANCEL);
    }
  
    disabledAllListeners() {
      this._enableListeners = false;
    }
  
    enableAllListeners() {
      this._enableListeners = true;
    }
  
    dispatchEvent(event, error, fieldName) {
      let _this = this;
      if (this._enableListeners) {
        let listToRemove = [];
        this.listeners.forEach(function (listener) {
          if (listener.event == event) {
            if (fieldName) {
              if (listener.fieldName) {
                if (listener.fieldName.startsWith(fieldName)) {
                  listener.dispatch(event, error, fieldName);
                }
              } else {
                listener.dispatch(event, error, fieldName);
              }
            } else {
              if (listener.dispatch === undefined) {
                listToRemove.push(listener);
              } else {
                listener.dispatch(event, error);
              }
            }
          }
        });
        listToRemove.forEach(function (item) {
          _this.removeEventListener(item.dispatch, item.event, item.fieldName);
        });
      }
    }
  
    addEventListener(event, dispatch, fieldName) {
      let _this = this;
      if (AnterosUtils.isArray(event)) {
        event.forEach(function (ev) {
          _this.listeners.push({
            event: ev,
            dispatch,
            fieldName,
          });
        });
      } else {
        this.listeners.push({
          event,
          dispatch,
          fieldName,
        });
      }
    }
  
    removeEventListener(event, dispatch, fieldName) {
      let _this = this;
      if (AnterosUtils.isArray(event)) {
        event.forEach(function (ev) {
          _this.removeEventListener(ev, dispatch);
        });
      } else {
        this.listeners = this.listeners.filter(function (item) {
          return (
            item.event !== event ||
            item.dispatch !== dispatch ||
            item.fieldName !== fieldName
          );
        });
      }
    }
  }
  
  class AnterosRealmDatasource extends AnterosDatasource {
    constructor(database, model) {
      super();
      this.database = database;
      this.model = model;
      this.open();
      this.cloneOnEdit = true;
    }
  
    open(data, cloneOnEdit) {
      super.open();
      this.data = data;
      if (!this.data) {
        this.data = [];
      }
      this.totalRecords = this.data.length;
      this.grandTotalRecords = this.data.length;
      this.first();
      this.dispatchEvent(dataSourceEvents.AFTER_OPEN);
      this.cloneOnEdit = cloneOnEdit == undefined ? false : cloneOnEdit;
    }
  
    close() {
      super.close();
      this.data = [];
      this.totalRecords = this.data.length;
      this.grandTotalRecords = this.data.length;
      this.dispatchEvent(dataSourceEvents.AFTER_CLOSE);
    }
  
    edit() {
      this._validateEdit();
      this.dispatchEvent(dataSourceEvents.BEFORE_EDIT);
      this.dsState = dataSourceConstants.DS_EDIT;
      if (this.cloneOnEdit) this.currentRecord = cloneDeep(this.currentRecord);
      this.dispatchEvent(dataSourceEvents.AFTER_EDIT);
    }
  
    append(record) {
      if (this.getState() == dataSourceConstants.DS_EDIT) {
        console.log("append => Registro já está sendo editado.");
        throw new AnterosDatasourceError('Registro já está sendo editado.');
      }
      if (this.getState() == dataSourceConstants.DS_INSERT) {
        console.log("append => Registro já está sendo inserido.");
        throw new AnterosDatasourceError('Registro já está sendo inserido.');
      }
  
      if (!this.data) {
        this.data = [];
      }
  
      this.data.push(record);
      this.totalRecords = this.data.length;
      this.grandTotalRecords = this.data.length;
      this.currentRecord = record;
      this.currentRecno = this.data.length - 1;
      if (this.currentRecord instanceof Realm.Object) {
        this.model.update(this.currentRecord);
      } else {
        this.model.insert(this.currentRecord);
      }
      this.dispatchEvent(dataSourceEvents.AFTER_POST);
      this.dispatchEvent(dataSourceEvents.AFTER_SCROLL);
    }
  
    searchText(term, limit) {
      mode.searchText(term, limit);
    }
  
    getDatabase() {
      return this.database;
    }
  
    getModel() {
      return this.model;
    }
  
    query() {
      return new AnterosRealmDatasourceQuery(this);
    }
  
    setFieldByName(fieldName, value) {
      if (this.isEmpty()) {
        return;
      }
      if (this.getState() == dataSourceConstants.DS_BROWSE) {
        console.log("setFieldByName => Registro não está sendo inserido ou editado.");
        throw new AnterosDatasourceError(
          'Registro não está sendo inserido ou editado.',
        );
      }
      let newValue = value;
      if (value instanceof Date) {
        newValue = AnterosDateUtils.formatDate(
          value,
          Anteros.dataSourceDatetimeFormat,
        );
      }
      let _this = this;
      try {
        if (_this.getCurrentRecord() instanceof Realm.Object) {
          _this.database.db.write(() => {
            var split = fieldName.split('.');
            if (split.length > 1) {
              AnterosObjectUtils.setNestedProperty(
                _this.currentRecord,
                fieldName,
                newValue,
              );
            } else {
              _this.currentRecord[fieldName] = newValue;
            }
          });
        } else {
          var split = fieldName.split('.');
          if (split.length > 1) {
            AnterosObjectUtils.setNestedProperty(
              _this.currentRecord,
              fieldName,
              newValue,
            );
          } else {
            _this.currentRecord[fieldName] = newValue;
          }
        }
        _this.dispatchEvent(dataSourceEvents.DATA_FIELD_CHANGED, null, fieldName);
      } catch (e) {
        console.log("setFieldByName => "+e);
        throw new AnterosDatasourceError(e);
      }
    }
  
    post(callback) {
      this._validatePost();
      this.dispatchEvent(dataSourceEvents.BEFORE_POST);
      try {
        if (this.currentRecord instanceof Realm.Object) {
          this.model.update(this.currentRecord);
        } else {
          this.model.insert(this.currentRecord);
        }
        if (this.dsState == dataSourceConstants.DS_EDIT) {
          this.data[this.getRecno()] = this.currentRecord;
        }
        this.dsState = dataSourceConstants.DS_BROWSE;
        this.dispatchEvent(dataSourceEvents.AFTER_POST);
        if (callback) callback();
      } catch (e) {
        throw new AnterosDatasourceError(e);
      }
    }
  }
  
  class AnterosRealmDatasourceQuery {
    constructor(dataSource) {
      this.dataSource = dataSource;
      this.query = this.dataSource.getModel().query();
    }
    /**
     * @private
     * @param {any} criteria
     * @param {any} condition
     * @returns {AnterosDatasourceRealmQuery}
     * @memberof AnterosDatasourceRealmQuery
     */
    addCriteria(criteria, condition) {
      this.query.addCriteria(criteria, condition);
      return this;
    }
  
    addValue(value) {
      return this.query.addValue(value);
    }
    /**
     * @private
     * obter objeto filtrado
     * @returns {Realm.Results}
     */
    getFilteredObjects() {
      return this.query.getFilteredObjects();
    }
  
    toStringWithValues() {
      return this.query.toStringWithValues();
    }
  
    toString() {
      return query.toString();
    }
  
    /**
     * Selecionar elemento distinto
     *
     * @param {string|string[]} fieldName
     * @return {AnterosRealmQuery}
     */
    distinct(fieldName) {
      this.query.distinct(fieldName);
      return this;
    }
  
    /**
     * Ordenar resultado
     * @param {string} fieldName
     * @param {'ASC'|'DESC'} order
     */
    sort(fieldName, order = 'ASC') {
      this.query.sort(fieldName, order);
      return this;
    }
  
    /**
     * Localiza todos os objetos que atendem às condições da consulta
     * @return {Realm.Results}
     */
    findAll(callback) {
      let results = this.query.findAll();
      if (callback) {
        callback(results);
      }
      this.dataSource.open(results);
    }
    /**
     * Localiza o primeiro objeto que atende às condições da consulta
     * @return {Realm.Object}
     */
    findFirst() {
      let results = this.query.getFilteredObjects();
      let record = results.length ? results[0] : undefined;
      if (record) this.dataSource.open([record]);
      else this.dataSource.open([]);
    }
  
    /**
     * Retorna o valor máximo dos valores na coleção ou da propriedade especificada
     * entre todos os objetos da coleção ou indefinido se a coleção estiver vazia.
     * Suportado apenas para propriedades int, float, double e date.
     * Valores nulos são totalmente ignorados por esse método e não serão retornados.
     *
     * @param {string} fieldName
     * @returns {number}
     */
    max(fieldName) {
      return this.query.max(fieldName);
    }
  
    /**
     * Retorna o valor mínimo dos valores na coleção ou na propriedade especificada
     * entre todos os objetos da coleção ou indefinido se a coleção estiver vazia.
     * Suportado apenas para propriedades int, float, double e date.
     * Valores nulos são totalmente ignorados por esse método e não serão retornados
     *
     * @param {string} fieldName
     */
    min(fieldName) {
      return this.query.min(fieldName);
    }
    /**
     *
     * @param {string} fieldName
     */
    sum(fieldName) {
      return this.query.sum(fieldName);
    }
    /**
     *
     * @param {string} fieldName
     */
    avg(fieldName) {
      return this.query.avg(fieldName);
    }
  
    /**
     * Conta o número de objetos que atendem às condições da consulta
     *
     * @return {number}
     */
    count() {
      return this.query.count();
    }
  
    /**
     * Condição Between
     *
     * @param {string} fieldName
     * @param {CompareValueType} from
     * @param {CompareValueType} to
     * @return {AnterosRealmQuery}
     */
    between(fieldName, from, to) {
      this.query.between(fieldName, from, to);
      return this;
    }
  
    /**
     * Or between condition
     *
     * @param {string} fieldName
     * @param {CompareValueType} from
     * @param {CompareValueType} to
     * @return {RealmQuery}
     */
    orBetween(fieldName, from, to) {
      this.query.orBetween(fieldName, from, to);
      return this;
    }
  
    /**
     * Condição em que o valor do campo começa com a sequência especificada
     *
     * @param {string} fieldName
     * @param {string} value
     * @param {?boolean} casing  BEGINSWITH[c] or BEGINSWITH
     * @return {RealmQuery}
     */
    beginsWith(fieldName, value, casing, condition = 'AND') {
      this.query.beginsWith(fieldName, value, casing, condition);
      return this;
    }
    /**
     * OU a Condição em que o valor do campo começa com a sequência especificada
     *
     * @param {string} fieldName
     * @param {string} value
     * @param {?boolean} casing  BEGINSWITH[c] or BEGINSWITH
     * @return {AnterosRealmQuery}
     */
    orBeginsWith(fieldName, value, casing) {
      this.query.orBeginsWith(fieldName, value, casing);
      return this;
    }
    /**
     * Além disso, o valor do campo contém a substring especificada
     *
     * @param {string} fieldName
     * @param {string} value
     * @param {?boolean} casing  CONTAINS[c] or CONTAINS
     * @return {AnterosRealmQuery}
     */
    contains(fieldName, value, casing, condition = 'AND') {
      this.query.contains(fieldName, value, casing, condition);
      return this;
    }
    /**
     * OU a Condição em que o valor do campo contém a substring especificada
     *
     * @param {string} fieldName
     * @param {string} value
     * @param {?boolean} casing  CONTAINS[c] or CONTAINS
     * @return {AnterosRealmQuery}
     */
    orContains(fieldName, value, casing) {
      this.query.orContains(fieldName, value, casing);
      return this;
    }
  
    /**
     * Condição em que o valor do campo termine com a sequência especificada
     *
     * @param {string} fieldName
     * @param {string} value
     * @param {boolean?} casing  ENDSWITH[c] or ENDSWITH
     * @return {AnterosRealmQuery}
     */
    endsWith(fieldName, value, casing, condition = 'AND') {
      this.query.endsWith(fieldName, value, casing, condition);
      return this;
    }
  
    /**
     * OU a Condição em que o valor do campo termine com a sequência especificada
     *
     * @param {string} fieldName
     * @param {string} value
     * @param {boolean?} casing  ENDSWITH[c] or ENDSWITH
     * @return {AnterosRealmQuery}
     */
    orEndsWith(fieldName, value, casing) {
      this.query.orEndsWith(fieldName, value, casing);
      return this;
    }
    /**
     * Comparação igual a
     *
     * @param {string} fieldName
     * @param {EqualValueType} value
     * @return {AnerosRealmQuery}
     */
    equalsTo(fieldName, value, condition = 'AND') {
      this.query.equalsTo(fieldName, value, condition);
      return this;
    }
  
    /**
     * Or comparação equal-to
     *
     * @param {string} fieldName
     * @param {EqualsValueType} value
     * @return {AnterosRealmQuery}
     */
    orEqualsTo(fieldName, value) {
      this.query.orEqualsTo(fieldName, value);
      return this;
    }
  
    /**
     * Comparação não igual a
     *
     * @param fieldName {string}
     * @param value {EqualValueType}
     * @return {AnterosRealmQuery}
     */
    notEqualsTo(fieldName, value, condition = 'AND') {
      this.query.notEqualsTo(fieldName, value, condition);
      return this;
    }
  
    /**
     * Ou comparação não igual a
     *
     * @param fieldName {string}
     * @param value {EqualValueType}
     * @return {AnterosRealmQuery}
     */
    orNotEqualsTo(fieldName, value) {
      this.query.orNotEqualsTo(fieldName, value);
      return this;
    }
  
    /**
     * Comparação maior que
     *
     * @param {string} fieldName
     * @param {CompareValueType} value
     * @return {AnterosRealmQuery}
     */
    greaterThan(fieldName, value, condition = 'AND') {
      this.query.greaterThan(fieldName, value, condition);
      return this;
    }
  
    /**
     * Ou comparação maior que
     *
     * @param {string} fieldName
     * @param {CompareValueType} value
     * @return {AnterosRealmQuery}
     */
    orGreaterThan(fieldName, value) {
      this.query.orGreaterThan(fieldName, value);
      return this;
    }
    /**
     * Comparação maior ou igual a
     *
     * @param  {string} fieldName
     * @param {CompareValueType} value
     * @return {AnterosRealmQuery}
     */
    greaterThanOrEqualsTo(fieldName, value, condition = 'AND') {
      this.query.greaterThanOrEqualsTo(fieldName, value, condition);
      return this;
    }
  
    /**
     * Ou comparação maior ou igual a
     *
     * @param  {string} fieldName
     * @param {CompareValueType} value
     * @return {AnterosRealmQuery}
     */
    orGreaterThanOrEqualsTo(fieldName, value) {
      this.query.orGreaterThanOrEqualsTo(fieldName, value);
      return this;
    }
  
    /**
     * Comparação menor que
     *
     * @param {string} fieldName
     * @param {CompareValueType} value
     * @return {AnterosRealmQuery}
     */
    lessThan(fieldName, value, condition = 'AND') {
      this.query.lessThan(fieldName, value, condition);
      return this;
    }
    /**
     * Ou comparação menor que
     *
     * @param {string} fieldName
     * @param {CompareValueType} value
     * @return {AnterosRealmQuery}
     */
    orLessThan(fieldName, value) {
      this.query.orLessThan(fieldName, value);
      return this;
    }
    /**
     * Comparação menor ou igual a
     *
     * @param {string} fieldName
     * @param {CompareValueType} value
     * @return {RealmQuery}
     */
    lessThanOrEqualTo(fieldName, value, condition = 'AND') {
      this.query.lessThanOrEqualTo(fieldName, value, condition);
      return this;
    }
    /**
     * OR comparação menor ou igual a
     *
     * @param {string} fieldName
     * @param {CompareValueType} value
     * @return {AnterosRealmQuery}
     */
    orLessThanOrEqualsTo(fieldName, value) {
      this.query.orLessThanOrEqualsTo(fieldName, value);
      return this;
    }
    /**
     * Comparação na lista
     *
     * @param {string} fieldName
     * @param {EqualValueType[]} values
     * @return {AnterosRealmQuery}
     */
    in(fieldName, values, condition = 'AND') {
      this.query.in(fieldName, values, condition);
      return this;
    }
  
    /**
     * Ou comparação na lista
     *
     * @param {string} fieldName
     * @param {EqualValueType[]} values
     * @return {AnterosRealmQuery}
     */
    orIn(fieldName, values) {
      this.query.orIn(fieldName, values);
      return this;
    }
  
    /**
     * Comparação fora da lista
     *
     * @param {string} fieldName
     * @param {EqualValueType[]} values
     * @return {AnterosRealmQuery}
     */
    notIn(fieldName, values, condition = 'AND') {
      this.query.notIn(fieldName, values, condition);
      return this;
    }
  
    /**
     * Ou comparação fora da lista
     *
     * @param {string} fieldName
     * @param {EqualValueType[]} values
     * @return {AnterosRealmQuery}
     */
    orNotIn(fieldName, values) {
      this.query.orNotIn(fieldName, values);
      return this;
    }
  
    /**
     * Comparação não é nulo
     * @param {string} fieldName
     * @returns {AnterosRealmQuery}
     */
    isNotNull(fieldName) {
      this.isNotNull(fieldName);
      return this;
    }
    /**
     * Comparação é nulo
     * @param {string} fieldName
     * @returns {AnterosRealmQuery}
     */
    isNull(fieldName) {
      this.query.isNull(fieldName);
      return this;
    }
    /**
     * OU comparação não é nulo
     * @param {string} fieldName
     * @returns {AnterosRealmQuery}
     */
    orIsNotNull(fieldName) {
      this.query.orIsNotNull(fieldName);
      return this;
    }
    /**
     * Comparação nulo
     * @param {string} fieldName
     * @returns {AnterosRealmQuery}
     */
    orIsNull(fieldName) {
      this.query.orIsNull(fieldName);
      return this;
    }
    /**
     * Comparação está vazio
     * @param {string} fieldName
     * @returns {AnterosRealmQuery}
     */
    isEmpty(fieldName) {
      this.query.isEmpty(fieldName);
      return this;
    }
    /**
     * Comparação não está vazio
     * @param {string} fieldName
     * @returns {AnterosRealmQuery}
     */
    isNotEmpty(fieldName) {
      this.query.isNotEmpty(fieldName);
      return this;
    }
    /**
     * OU Comparação está vazio
     * @param {string} fieldName
     * @returns {AnterosRealmQuery}
     */
    orIsEmpty(fieldName) {
      this.query.orIsEmpty(fieldName);
      return this;
    }
    /**
     * OU Comparação não está vazio
     * @param {string} fieldName
     * @returns {AnterosRealmQuery}
     */
    orIsNotEmpty(fieldName) {
      this.query.orIsNotEmpty(fieldName);
      return this;
    }
  
    /**
     * Operador Like
     * @private
     * @param fieldName
     * @param value
     * @returns {AnterosRealmQuery}
     */
    like(fieldName, value, condition = 'AND') {
      this.query.like(fieldName, value, condition);
      return this;
    }
    /**
     * OU operador Like
     * @private
     * @param fieldName
     * @param value
     * @returns {AnterosRealmQuery}
     */
    orLike(fieldName, value) {
      this.query.orLike(fieldName, value);
      return this;
    }
    /**
     * Operador NOT
     * @returns {AnterosRealmQuery}
     */
    not() {
      this.query.beginGroup();
      this.query.not();
      return this;
    }
    /**
     * Operador end a NOT
     * @returns {AnterosRealmQuery}
     */
    endNot() {
      this.query.endNot();
      return this;
    }
  
    /**
     * Inicia agrupamento de condições AND ("parêntese esquerdo")
     *
     * @return {AnterosRealmQuery}
     */
    beginGroup(condition = 'AND') {
      this.query.beginGroup(condition);
      return this;
    }
  
    /**
     * Inicia agrupamento de condições OR
     *
     * @return {AnterosRealmQuery}
     */
  
    beginOrGroup() {
      this.query.beginOrGroup();
      return this;
    }
  
    /**
     * Fim do agrupamento de condições ("parêntese direito") que foi aberto por uma chamada para beginGroup()
     * @return {AnterosRealmQuery}
     */
    endGroup() {
      this.query.endGroup();
      return this;
    }
    /**
     * @callback groupCallback
     * @param {AnterosRealmQuery}
     */
  
    /**
     * Consulta de grupo em um retorno de chamada
     * @param {groupCallback} cb
     * @return {AnterosRealmQuery}
     * @example
     * query.group((groupQuery) => {
     *   return groupQuery
     *      .equalsTo('field', 10)
     *      .orEqualsTo('field2', 'value')
     * })
     */
    group(cb) {
      this.query.group(cb);
      return this;
    }
  
    /**
     * Consulta de grupo em um retorno de chamada com o operador OR
     * @param {groupCallback} cb
     * @return {AnterosRealmQuery}
     * @example
     * query.orGroup((groupQuery) => {
     *   return groupQuery
     *      .equalTo('field', 10)
     *      .orEqualTo('field2', 'value')
     * })
     */
    orGroup(cb) {
      this.query.orGroup(cb);
      return this;
    }
  
    /**
     * Combinar para outra consulta
     * @param {AnterosRealmQuery} query
     * @returns {AnterosRealmQuery}
     */
    join(query) {
      this.query.join(query);
      return this;
    }
  
    /**
     * Combinar para outra consulta com o operador OR
     * @param {AnterosRealmQuery} query
     * @returns {AnterosRealmQuery}
     */
    orJoin(query) {
      this.query.orJoin(query);
      return this;
    }
    /**
     * @private
     * @param {AnterosRealmQuery} query
     * @returns {AnterosRealmQuery}
     * @memberof AnterosRealmQuery
     */
    addJoin(query, condition) {
      this.query.addJoin(query, condition);
      return this;
    }
  }
  
  class AnterosLocalDatasource extends AnterosDatasource {
    constructor(data) {
      super();
      this.open(data);
      this.cloneOnEdit = true;
    }
  
    open(data, cloneOnEdit) {
      super.open();
      this.data = data;
      if (!this.data) {
        this.data = [];
      }
      this.totalRecords = this.data.length;
      this.grandTotalRecords = this.data.length;
      this.first();
      this.dispatchEvent(dataSourceEvents.AFTER_OPEN);
      this.cloneOnEdit = cloneOnEdit == undefined ? false : cloneOnEdit;
    }
  
    close() {
      super.close();
      this.data = [];
      this.totalRecords = this.data.length;
      this.grandTotalRecords = this.data.length;
      this.dispatchEvent(dataSourceEvents.AFTER_CLOSE);
    }
  
    edit() {
      this._validateEdit();
      this.dispatchEvent(dataSourceEvents.BEFORE_EDIT);
      this.dsState = dataSourceConstants.DS_EDIT;
      if (this.cloneOnEdit) this.currentRecord = cloneDeep(this.currentRecord);
      this.dispatchEvent(dataSourceEvents.AFTER_EDIT);
    }
  
    append(record) {
      if (this.getState() == dataSourceConstants.DS_EDIT) {
        throw new AnterosDatasourceError('Registro já está sendo editado.');
      }
      if (this.getState() == dataSourceConstants.DS_INSERT) {
        throw new AnterosDatasourceError('Registro já está sendo inserido.');
      }
  
      if (!this.data) {
        this.data = [];
      }
  
      this.data.push(record);
      this.totalRecords = this.data.length;
      this.grandTotalRecords = this.data.length;
      this.currentRecord = record;
      this.currentRecno = this.data.length - 1;
      this.dispatchEvent(dataSourceEvents.AFTER_POST);
      this.dispatchEvent(dataSourceEvents.AFTER_SCROLL);
    }
  }
  
  class AnterosRemoteDatasource extends AnterosDatasource {
    constructor(ajaxConfig) {
      super();
      this.ajaxConfig = ajaxConfig;
      this.ajaxPageConfigHandler = undefined;
      this.ajaxPostConfigHandler = undefined;
      this.ajaxDeleteConfigHandler = undefined;
      this.validatePostResponse = undefined;
      this.validateDeleteResponse = undefined;
      this.storePostResultToRecord = true;
  
      this.setAjaxPageConfigHandler = this.setAjaxPageConfigHandler.bind(this);
      this.setAjaxPostConfigHandler = this.setAjaxPostConfigHandler.bind(this);
      this.setAjaxDeleteConfigHandler = this.setAjaxDeleteConfigHandler.bind(
        this,
      );
      this.setStorePostResultToRecord = this.setStorePostResultToRecord.bind(
        this,
      );
      this.setValidatePostResponse = this.setValidatePostResponse.bind(this);
      this.setValidateDeleteResponse = this.setValidateDeleteResponse.bind(this);
      this.executeAjax = this.executeAjax.bind(this);
      this.executed = false;
    }
  
    setValidatePostResponse(value) {
      this.validatePostResponse = value;
    }
  
    setValidateDeleteResponse(value) {
      this.validateDeleteResponse = value;
    }
  
    setStorePostResultToRecord(value) {
      this.storePostResultToRecord = value;
    }
  
    setAjaxPageConfigHandler(handler) {
      this.ajaxPageConfigHandler = handler;
    }
  
    setAjaxPostConfigHandler(handler) {
      this.ajaxPostConfigHandler = handler;
    }
  
    setAjaxDeleteConfigHandler(handler) {
      this.ajaxDeleteConfigHandler = handler;
    }
  
    open(ajaxConfig, callback) {
      super.open();
      if (ajaxConfig && ajaxConfig != null) {
        let _this = this;
        this.executeAjax(
          ajaxConfig ? ajaxConfig : this.ajaxConfig,
          dataSourceEvents.AFTER_OPEN,
          callback,
        );
      } else {
        this.dispatchEvent(dataSourceEvents.AFTER_OPEN);
      }
    }
  
    append(record) {
      if (this.getState() == dataSourceConstants.DS_EDIT) {
        throw new AnterosDatasourceError('Registro já está sendo editado.');
      }
      if (this.getState() == dataSourceConstants.DS_INSERT) {
        throw new AnterosDatasourceError('Registro já está sendo inserido.');
      }
  
      if (!this.data) {
        this.data = [];
      }
  
      this.data.push(record);
      this.totalRecords = this.data.length;
      this.grandTotalRecords = this.data.length;
      this.currentRecord = record;
      this.currentRecno = this.data.length - 1;
      this.dispatchEvent(dataSourceEvents.AFTER_POST);
      this.dispatchEvent(dataSourceEvents.AFTER_SCROLL);
    }
  
    post(callback) {
      if (!this.ajaxPostConfigHandler || !this.validatePostResponse) {
        let error =
          "Para salvar dados remotamente é necessário configurar 'setAjaxPostConfigHandler' e 'setValidatePostResponse' ";
        console.log("post => "+error);  
        this.dispatchEvent(dataSourceEvents.ON_ERROR, error);
        throw new AnterosDatasourceError(error);
      }
      let _this = this;
      this._validatePost();
      this.dispatchEvent(dataSourceEvents.BEFORE_POST);
  
      let ajaxPostConfig = this.ajaxPostConfigHandler(this.currentRecord);
      axios(ajaxPostConfig)
        .then(function (response) {
          if (_this.validatePostResponse(response)) {
            if (_this.dsState == dataSourceConstants.DS_EDIT) {
              _this.data[_this.getRecno()] = _this.currentRecord;
            }
            if (_this.storePostResultToRecord == true) {
              let newObject = AnterosJacksonParser.convertJsonToObject(
                response.data,
              );
              _this.data[_this.getRecno()] = newObject;
              _this.currentRecord = newObject;
            }
            _this.dsState = dataSourceConstants.DS_BROWSE;
            _this.dispatchEvent(dataSourceEvents.AFTER_POST);
            if (callback) {
              callback();
            }
          }
        })
        .catch(function (error) {
          if (callback) {
            callback(error);
          }
          _this.dispatchEvent(dataSourceEvents.ON_ERROR, error);
        });
    }
  
    delete(callback) {
      if (!this.ajaxDeleteConfigHandler || !this.validateDeleteResponse) {
        let error =
          "Para remover dados remotamente é necessário configurar 'setAjaxDeleteConfigHandler' e 'setValidateDeleteResponse' ";
        console.log("delete => "+error); 
        this.dispatchEvent(dataSourceEvents.ON_ERROR, error);
        throw new AnterosDatasourceError(error);
      }
      let _this = this;
      this._validateDelete();
      this.dispatchEvent(dataSourceEvents.BEFORE_DELETE);
      let ajaxDeleteConfig = this.ajaxDeleteConfigHandler(this.currentRecord);
      axios(ajaxDeleteConfig)
        .then(function (response) {
          if (_this.validateDeleteResponse(response)) {
            _this.data.splice(_this.currentRecno, 1);
            if (_this.data.length == 0) _this.currentRecord = undefined;
            else _this.currentRecord = _this.data[_this.currentRecno];
            _this.totalRecords--;
            _this.grandTotalRecords--;
            _this.dsState = dataSourceConstants.DS_BROWSE;
            _this.dispatchEvent(dataSourceEvents.AFTER_SCROLL);
            _this.dispatchEvent(dataSourceEvents.AFTER_DELETE);
          }
          if (callback) {
            callback();
          }
        })
        .catch(function (error) {
          if (callback) {
            callback(error);
          }
          _this.dispatchEvent(dataSourceEvents.ON_ERROR, error);
        });
    }
  
    goToPage(page) {
      if (!this.ajaxPageConfigHandler) {
        let error =
          "Para buscar dados paginados remotamente é necessário configurar 'setAjaxPageConfigHandler'";
        console.log("goToPage => "+error);   
        this.dispatchEvent(dataSourceEvents.ON_ERROR, error);
        throw new AnterosDatasourceError(error);
      }
      this.dispatchEvent(dataSourceEvents.BEFORE_GOTO_PAGE);
      let ajaxPageConfig = this.ajaxPageConfigHandler(page);
      this.executeAjax(ajaxPageConfig, dataSourceEvents.AFTER_GOTO_PAGE);
    }
  
    executeAjax(ajaxConfig, event, callback) {
      let _this = this;
      this.executed = false;
      axios(ajaxConfig ? ajaxConfig : this.ajaxConfig)
        .then(function (response) {
          if (response.data.hasOwnProperty(_this.totalPagesProperty)) {
            _this.totalPages = response.data[_this.totalPagesProperty];
          }
  
          if (response.data.hasOwnProperty(_this.currentPageProperty)) {
            _this.currentPage = response.data[_this.currentPageProperty];
          }
  
          if (response.data.hasOwnProperty(_this.sizeOfPageProperty)) {
            _this.sizeOfPage = response.data[_this.sizeOfPageProperty];
          }
  
          if (response.data.hasOwnProperty(_this.totalRecordsProperty)) {
            _this.totalRecords = response.data[_this.totalRecordsProperty];
          }
  
          if (response.data.hasOwnProperty(_this.grandTotalRecordsProperty)) {
            _this.grandTotalRecords =
              response.data[_this.grandTotalRecordsProperty];
          }
  
          if (response.data.hasOwnProperty(_this.contentProperty)) {
            let temp = AnterosJacksonParser.convertJsonToObject(
              response.data[_this.contentProperty],
            );
            if (AnterosUtils.isArray(temp)) _this.data = temp;
            else {
              _this.data = [];
              _this.data.push(temp);
            }
          } else {
            let temp = AnterosJacksonParser.convertJsonToObject(response.data);
            if (AnterosUtils.isArray(temp)) _this.data = temp;
            else {
              _this.data = [];
              _this.data.push(temp);
            }
            _this.totalRecords = _this.data.length;
            _this.grandTotalRecords = _this.data.length;
          }
          _this.executed = true;
          _this.first();
          _this.dispatchEvent(event);
          if (callback) {
            callback();
          }
        })
        .catch(function (error) {
          if (_this.executed) {
            if (callback) {
              callback(error);
            }
            throw new Error(error);
          } else {
            _this.dispatchEvent(dataSourceEvents.ON_ERROR, error);
          }
        });
    }
  
    close() {
      super.close();
      this.data = [];
      this.dispatchEvent(dataSourceEvents.AFTER_CLOSE);
    }
  }
  
export { AnterosDatasource, AnterosLocalDatasource, AnterosRemoteDatasource, DATASOURCE_EVENTS, dataSourceConstants, dataSourceEvents };