import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import {AnterosText} from '../Text/AnterosText';
import AnterosTheme from '../../themes/AnterosTheme';
import {AnterosImage} from '../Image/AnterosImage';

const window = Dimensions.get('window');
const {width, height, scale} = window;


  
const IMG = {
    closeIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABnElEQVRYR8WXy1HDMBCG/734Sjoh6QAqgBKgg/gij29wtC4uAegAKoASXEJKCFfPeMTIYxn5IVmvTHJM4v0+rbS7MuHKH7oyH6NAXde7tm3fpBARvTLGmpRynPM9gD4+gGcVfxTgnH8CeBj+cAZwn0pigH8D2A3xG8bYoV+sWuVMQH6dRGIFLmN/McYe5wJ7IcQPEd1oqY+SWIMLIX6J6G6xBRIqH0gl4QKfZEDbimgJV/iqQGwmfOBGgVAJX7hVwFciBL4p4CoRCncS2JIYDq/eZDAvNVtHdZ4FlhKV8VWH84I7Z2CjRMcF+qxcPeScgS2JELh3BtR5ADDZ85gB5pUBw2DRz5j37HAWMJVan8aIAeYkYKtzKRAzwDYFXJpMzBS1CrjAY6eoUcAHHiOxKhACD5VYCMTAQyQmAingvhL6rVje24On2trEM1VH13WHsixPk1ZcVVVDRLcqUGhvn4sYJJbXcl0gFdy0HUKIj6IoniYZGEzfiUj282OqtyJdAsCLEOKcZdkxz3PJ+X8zst1aLvnbZiu+JFzG/gPiB7Awgm9hrgAAAABJRU5ErkJggg==',
    addIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA7ElEQVRYR+2X0QnCQAyG87cLuIF1EusEOoq+NPTJ+lSuLzqKTmDdRDdwgbvISRVEhGuVFiGBe8td/nyB+wlo4MDA9amzgLIskyiKjr4B59wsz/Nzl2Y6CzDGLAFsfVERWTHzrm8BBYB1I2DDzIUKUAJKQAn8NwH/t8dxPAcwCulERFIi8sdHDaAOvHe11h4e3vH0gqqqvJmMQx75NkdEzsw88e8MIoCILlmWJS8CGntdEFHQCAB4/NOGxklEgkZARFfn3P5tBG2xGmPUDZWAElACSmDYxaSx7/v/b61Ne1/N2nrHp/zOu+GvBNwAa6vsIVXzFTsAAAAASUVORK5CYII='
  };

export class AnterosLabelSelect extends Component {
  addIcon = {
    uri: IMG.addIcon
  }
  static propTypes = {
    title: PropTypes.string,
    readOnly: PropTypes.bool,
    enable: PropTypes.bool,
    onConfirm: PropTypes.func,
    enableAddBtn: PropTypes.bool,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string
  }
  static defaultProps = {
    style: {},
    customStyle: {},
    title: ' ',
    enable: true,
    readOnly: false,
    onConfirm: () => {},
    enableAddBtn: true,
    confirmText: 'Confirm',
    cancelText: 'Cancel'
  }
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false
    };
    this.selectedList = [];
    this.toggleSelect = this.toggleSelect.bind(this);
    this.cancelSelect = this.cancelSelect.bind(this);
    this.confirmSelect = this.confirmSelect.bind(this);
    this.openModal = this.openModal.bind(this);
  }
  setModalVisible(isVisible) {
    this.setState({isModalVisible: isVisible});
  }
  cancelSelect() {
    this.selectedList = [];
    this.setModalVisible(false);
  }
  confirmSelect() {
    const {onConfirm} = this.props;
    onConfirm(this.selectedList);
    this.selectedList = [];
    this.cancelSelect();
  }
  openModal() {
    if (!React.Children.toArray(this.props.children).filter(item => item.type === ModalItem).length) {
      // TODO
    }
    this.props.enable && !this.props.readOnly && this.setModalVisible(true);
  }
  toggleSelect(time) {
    let index = this.selectedList.findIndex(item => item === time);
    if (~index) {this.selectedList.splice(index, 1);}
    else {this.selectedList.push(time);}
  }
  render() {
    const {
      readOnly,
      enable,
      title,
      style,
      enableAddBtn,
      customStyle,
      confirmText,
      cancelText
    } = this.props;
    let selectedLabels = React.Children.toArray(this.props.children)
      .filter(item => item.type === Label)
      .map((child, index) => {
        return React.cloneElement(child, {
          enable: enable,
          readOnly: readOnly
        });
      });

    let modalItems = this.state.isModalVisible ? React.Children.toArray(this.props.children)
      .filter(item => item.type === ModalItem)
      .map((child, index) => {
        return React.cloneElement(child, {
          toggleSelect: this.toggleSelect
        });
      }) : null;

    return (
      <View style={[styles.selectedView, style]}>
        {selectedLabels}
        {enable && !readOnly && enableAddBtn &&
          <TouchableHighlight
            style={[styles.selectedItem, styles.addItem]}
            underlayColor="transparent"
            onPress={this.openModal}>
            <AnterosImage
              style={styles.addIcon}
              source={this.addIcon}
              resizeMode="cover"
              />
          </TouchableHighlight>
        }
        <Modal
          transparent={true}
          visible={this.state.isModalVisible}
          onRequestClose={() => {}}>
          <View style={{flex: 1}}>
            <TouchableHighlight
              style={styles.modalMask}
              activeOpacity={1}
              underlayColor="#00000077"
              onPress={this.cancelSelect}>
              <View style={styles.modalContainer}>
                <View style={[styles.modal, customStyle.modal || {}]}>
                  <View style={styles.title}><Text style={styles.titleText}>{title}</Text></View>
                  <View style={styles.scrollView}>
                    <ScrollView>
                      {modalItems}
                    </ScrollView>
                  </View>
                  <View style={[styles.buttonView, customStyle.buttonView || {}]}>
                    <TouchableHighlight
                      underlayColor="transparent"
                      activeOpacity={0.8}
                      onPress={this.cancelSelect}>
                      <View style={[styles.modalButton, customStyle.cancelButton || {}]}>
                        <Text style={[styles.buttonText, customStyle.cancelText || {}]}>{cancelText}</Text>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                      underlayColor="transparent"
                      activeOpacity={0.8}
                      onPress={this.confirmSelect}>
                      <View style={[styles.modalButton, styles.confirmButton, customStyle.confirmButton || {}]}>
                        <AnterosText style={[styles.buttonText, customStyle.confirmText || {}]}>{confirmText}</AnterosText>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}

class Label extends Component {
  closeIcon = {
    uri: IMG.closeIcon
  }
  static propTypes = {
    onCancel: PropTypes.func,
    readOnly: PropTypes.bool,
    enable: PropTypes.bool
  }
  static defaultProps = {
    onCancel: () => {},
    enable: true,
    readOnly: false,
    customStyle: {}
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {enable, readOnly, onCancel, customStyle} = this.props;
    return (
      <View style={[styles.selectedItem, !enable && styles.disableColor]}>
        <AnterosText style={[styles.labelText, !enable && styles.disableText, customStyle.text || {}]}
          numberOfLines={1} ellipsisMode="tail">{this.props.children}</AnterosText>
        {enable && !readOnly && <TouchableHighlight
          style={styles.closeContainer}
          underlayColor="transparent"
          activeOpacity={0.5}
          onPress={onCancel}>
          <View>
            <AnterosImage
              style={styles.closeIcon}
              source={this.closeIcon}
              resizeMode="cover"/>
          </View>
        </TouchableHighlight>}
      </View>
    );
  }
}

class ModalItem extends Component {
  static propTypes = {
    toggleSelect: PropTypes.func
  }
  static defaultProps = {
    customStyle: {}
  }
  constructor (props) {
    super(props);
    this.isSelected = false;
    this._toggleSelect = this._toggleSelect.bind(this);
  }
  _toggleSelect() {
    const {toggleSelect, data} = this.props;
    this.isSelected = !this.isSelected;
    this.forceUpdate();
    toggleSelect(data);
  }
  render () {
    const {
      customStyle
    } = this.props;
    return (
      <TouchableHighlight
        activeOpacity={0.5}
        underlayColor="transparent"
        onPress={this._toggleSelect}>
        <View style={styles.modalItem}>
          <AnterosText
            style={[styles.modalText, customStyle.modalText || {}]}
            numberOfLines={1}
            ellipsisMode="tail">
            {this.props.children}
          </AnterosText>
          <View style={[styles.outerCircle, this.isSelected ? styles.enableCircle : {}, customStyle.outerCircle || {}]}>
            {this.isSelected && <View style={[styles.innerCircle, customStyle.innerCircle || {}]}/>}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

AnterosLabelSelect.Label = Label;
AnterosLabelSelect.ModalItem = ModalItem;





const styles = StyleSheet.create({
    selectedView: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    selectedItem: {
      margin: 4,
      borderWidth: 2 / scale,
      borderRadius: 6,
      borderColor: '#aaa',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: '#f6f6f6'
    },
    addItem: {
      padding: 7
    },
    disableColor: {
      backgroundColor: '#eaeaea'
    },
    labelText: {
      padding: 6,
      fontSize: 14,
      lineHeight: 14,
      maxWidth: 300
    },
    closeContainer: {
      padding: 8,
      borderLeftWidth: 2 / scale,
      borderLeftColor: '#c8c8c8'
    },
    closeIcon: {
      width: 10,
      height: 10
    },
    addIcon: {
      width: 12,
      height: 12
    },
    modalMask: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000077'
    },
    modalContainer: {},
    modal: {
      height: height * 0.6,
      width: width * 0.6,
      overflow: 'hidden',
      borderRadius: 10,
      backgroundColor: '#fff'
    },
    title: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderBottomWidth: 2 / scale,
      borderBottomColor: '#bbb'
    },
    titleText: {
      fontSize: 18,
      lineHeight: 20
    },
    scrollView: {
      height: height * 0.6 - 80
    },
    buttonView: {
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    modalButton: {
      height: 40,
      width: width * 0.3,
      paddingLeft: 20,
      paddingRight: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: AnterosTheme.primaryColor
    },
    modalItem: {
      height: 50,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 2 / scale,
      borderBottomColor: '#bbb'
    },
    modalText: {
      fontSize: 16,
      width: width * 0.6 - 70
    },
    buttonText: {
      color: '#fff',
      fontSize: 16
    },
    confirmButton: {
      borderLeftWidth: 2 / scale,
      borderLeftColor: '#fff'
    },
    outerCircle: {
      borderWidth: 2 / scale,
      borderColor: '#888',
      width: 20,
      height: 20,
      borderRadius: 10,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center'
    },
    enableCircle: {
      borderColor: AnterosTheme.primaryColor
    },
    innerCircle: {
      backgroundColor: AnterosTheme.primaryColor,
      width: 16,
      height: 16,
      borderRadius: 8,
      overflow: 'hidden'
    },
    disableText: {
      color: '#999'
    }
  });