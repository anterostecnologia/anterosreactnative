// https://github.com/hectahertz/react-native-material-dialog

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Modal,
  Text,
  Platform,
  TouchableHighlight,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ListView,
  Dimensions,
} from 'react-native';
import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AnterosText} from '../Text/AnterosText';
import {AnterosTheme} from '../../themes/AnterosTheme';
import {AnterosButton} from '../Button/AnterosButton';


const colors = {
  background: '#FFFFFF',
  backgroundOverlay: 'rgba(0, 0, 0, 0.6)',

  androidColorPrimaryDark: '#5AD185',
  primaryColor: AnterosTheme.primaryColor,
  androidPressedUnderlay: '#F0F0F0',
  androidBorderColor: '#DCDCDC',
  androidPrimaryTextColor: 'rgba(0, 0, 0, 0.87)',
};

const { height } = Dimensions.get('window');

export const AnterosDialog = ({
  visible,
  scrolled,
  title,
  titleColor,
  colorAccent,
  backgroundColor,
  addPadding,
  onOk,
  onCancel,
  okLabel,
  cancelLabel,
  children,
}) => (
  <Modal
    animationType={'fade'}
    transparent
    hardwareAccelerated
    visible={visible}
    onRequestClose={onCancel}
    supportedOrientations={['portrait', 'landscape']}
  >
    <TouchableWithoutFeedback onPress={onCancel}>
      <View style={styles.backgroundOverlay}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View
            style={[
              styles.modalContainer,
              (title != null || (addPadding && title == null)) && styles.modalContainerPadding,
              { backgroundColor },
            ]}
          >
            <TouchableWithoutFeedback>
              <View>
                {title != null ? (
                  <View style={scrolled ? styles.titleContainerScrolled : styles.titleContainer}>
                    <AnterosText style={[{ color: titleColor }]}>{title}</AnterosText>
                  </View>
                ) : null}
                <View
                  style={
                    scrolled
                      ? [
                        styles.contentContainerScrolled,
                        addPadding && styles.contentContainerScrolledPadding,
                      ]
                      : [styles.contentContainer, addPadding && styles.contentContainerPadding]
                  }
                >
                  {children}
                </View>
                {onOk != null && onCancel != null ? (
                  <View
                    style={scrolled ? styles.actionsContainerScrolled : styles.actionsContainer}
                  >
                    <AnterosButton
                      testID="dialog-cancel-button"
                      containerStyle={{padding:4}}
                      onPress={onCancel}
                      title={cancelLabel}
                    />
                    <AnterosButton
                      testID="dialog-ok-button"
                      containerStyle={{padding:4}}
                      colorAccent={colorAccent}
                      onPress={onOk}
                      title={okLabel}
                    />
                  </View>
                ) : null}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

const styles = StyleSheet.create({
  backgroundOverlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundOverlay,
  },
  modalContainer: {
    marginHorizontal: 16,
    marginVertical: 106,
    minWidth: 280,
    borderRadius: 2,
    elevation: 24,
    overflow: 'hidden',
  },
  modalContainerPadding: {
    paddingTop: 24,
  },
  titleContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleContainerScrolled: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.androidBorderColor,
  },
  contentContainer: {
    flex: -1,
  },
  contentContainerPadding: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  contentContainerScrolled: {
    flex: -1,
    maxHeight: height - 264, // (106px vertical margin * 2) + 52px
  },
  contentContainerScrolledPadding: {
    paddingHorizontal: 24,
  },
  actionsContainer: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 8,
  },
  actionsContainerScrolled: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.androidBorderColor,
  },
  actionContainer: {
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    minWidth: 64,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

AnterosDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func,
  cancelLabel: PropTypes.string,
  okLabel: PropTypes.string,
  title: PropTypes.string,
  titleColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  colorAccent: PropTypes.string,
  scrolled: PropTypes.bool,
  addPadding: PropTypes.bool,
};

AnterosDialog.defaultProps = {
  okLabel: 'OK',
  cancelLabel: 'CANCEL',
  title: undefined,
  titleColor: colors.androidPrimaryTextColor,
  backgroundColor: colors.background,
  colorAccent: colors.primaryColor,
  scrolled: false,
  addPadding: true,
  onOk: undefined,
  onCancel: undefined,
};





export class AnterosMultiPickerDialog extends Component {
  constructor(props) {
    super(props);

    const { items, selectedItems } = props;
    const rows = buildSelectedRows(items, selectedItems);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.value !== r2.value || r1.selected !== r2.selected,
    }).cloneWithRows(rows);

    this.state = {
      dataSource,
      rows,
    };
  }

  // Refreshing the dataSource when we refresh any prop (such as visible)
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { items, selectedItems } = nextProps;
    const rows = buildSelectedRows(items, selectedItems);
    const dataSource = this.state.dataSource.cloneWithRows(rows);
    this.setState({ dataSource, rows });
  }

  onRowPress(rowID) {
    const rows = [...this.state.rows];
    rows[rowID] = Object.assign({}, rows[rowID], {
      selected: !rows[rowID].selected,
    });
    const dataSource = this.state.dataSource.cloneWithRows(rows);
    this.setState({ dataSource, rows });
  }

  renderRow = (row, sectionID, rowID) => (
    <TouchableOpacity key={row.value} onPress={() => this.onRowPress(rowID)}>
      <View style={stylesMulti.rowContainer}>
        <View style={stylesMulti.iconContainer}>
          <Icon
            name={row.selected ? 'check-box' : 'check-box-outline-blank'}
            color={this.props.colorAccent}
            size={24}
          />
        </View>
        <Text style={material.subheading}>{row.label}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <AnterosDialog
        title={this.props.title}
        titleColor={this.props.titleColor}
        colorAccent={this.props.colorAccent}
        visible={this.props.visible}
        okLabel={this.props.okLabel}
        scrolled={this.props.scrolled}
        onOk={() =>
          this.props.onOk({
            selectedItems: this.state.rows.filter(row => row.selected),
          })}
        cancelLabel={this.props.cancelLabel}
        onCancel={this.props.onCancel}
      >
        <ListView dataSource={this.state.dataSource} renderRow={this.renderRow} />
      </AnterosDialog>
    );
  }
}

function buildSelectedRows(items, selectedItems) {
  const rows = items.map(item =>
    Object.assign({}, item, {
      selected: selectedItems.some(i => i.value === item.value),
    }),
  );

  return rows;
}

const stylesMulti = StyleSheet.create({
  rowContainer: {
    height: 56,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 16,
  },
});

AnterosMultiPickerDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  titleColor: PropTypes.string,
  colorAccent: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  cancelLabel: PropTypes.string,
  okLabel: PropTypes.string,
  scrolled: PropTypes.bool,
};

AnterosMultiPickerDialog.defaultProps = {
  selectedItems: [],
  title: undefined,
  titleColor: undefined,
  colorAccent: colors.primaryColor,
  cancelLabel: undefined,
  okLabel: undefined,
  scrolled: false,
};

export class AnterosSinglePickerDialog extends Component {
  constructor(props) {
    super(props);

    const { items, selectedItem } = props;

    const rows = items.map(item => Object.assign({}, item, { selected: false }));

    let selectedIndex;
    if (selectedItem != null) {
      selectedIndex = rows.findIndex(item => item.value === selectedItem.value);

      rows[selectedIndex] = Object.assign({}, rows[selectedIndex], {
        selected: true,
      });
    }

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.value !== r2.value || r1.selected !== r2.selected,
    }).cloneWithRows(rows);

    this.state = { dataSource, rows, selectedIndex };
  }

  // TODO: Extract common logic with the constructor
  // Refreshing the dataSource when we refresh any prop (such as visible)
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { items, selectedItem } = nextProps;

    const rows = items.map(item => Object.assign({}, item, { selected: false }));

    let selectedIndex;
    if (selectedItem != null) {
      selectedIndex = rows.findIndex(item => item.value === selectedItem.value);

      rows[selectedIndex] = Object.assign({}, rows[selectedIndex], {
        selected: true,
      });
    }

    const dataSource = this.state.dataSource.cloneWithRows(rows);

    this.setState({ dataSource, rows, selectedIndex });
  }

  onRowPress(rowID) {
    const rows = [...this.state.rows];
    const { selectedIndex } = this.state;

    if (selectedIndex != null) {
      rows[selectedIndex] = Object.assign({}, rows[selectedIndex], {
        selected: false,
      });
    }
    rows[rowID] = Object.assign({}, rows[rowID], { selected: true });

    const dataSource = this.state.dataSource.cloneWithRows(rows);

    this.setState({ dataSource, rows, selectedIndex: rowID });
  }

  renderRow = (row, sectionID, rowID) => (
    <TouchableOpacity key={row.value} onPress={() => this.onRowPress(rowID)}>
      <View style={stylesSingle.rowContainer}>
        <View style={stylesSingle.iconContainer}>
          <Icon
            name={row.selected ? 'radio-button-checked' : 'radio-button-unchecked'}
            color={this.props.colorAccent}
            size={24}
          />
        </View>
        <AnterosText>{row.label}</AnterosText>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <AnterosDialog
        title={this.props.title}
        titleColor={this.props.titleColor}
        colorAccent={this.props.colorAccent}
        visible={this.props.visible}
        okLabel={this.props.okLabel}
        scrolled={this.props.scrolled}
        onOk={() =>
          this.props.onOk({
            selectedItem: this.state.rows[this.state.selectedIndex],
          })}
        cancelLabel={this.props.cancelLabel}
        onCancel={() => {
          this.props.onCancel();
        }}
      >
        <ListView dataSource={this.state.dataSource} renderRow={this.renderRow} />
      </AnterosDialog>
    );
  }
}

const stylesSingle = StyleSheet.create({
  rowContainer: {
    height: 56,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 16,
  },
});

AnterosSinglePickerDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedItem: PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  }),
  title: PropTypes.string,
  titleColor: PropTypes.string,
  colorAccent: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  cancelLabel: PropTypes.string,
  okLabel: PropTypes.string,
  scrolled: PropTypes.bool,
};

AnterosSinglePickerDialog.defaultProps = {
  selectedItem: undefined,
  title: undefined,
  titleColor: undefined,
  colorAccent: colors.primaryColor,
  cancelLabel: undefined,
  okLabel: undefined,
  scrolled: false,
};