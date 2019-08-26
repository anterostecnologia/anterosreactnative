import React, { Component } from 'react';
import { FlatList, StyleSheet,Dimensions,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View
     } from 'react-native';
import {AnterosIcon} from '../Icon/AnterosIcon';
import {AnterosText} from '../Text/AnterosText';

const getContrastYIQ = hexcolor => {
    var r = parseInt(hexcolor.substring(1, 3), 16);
    var g = parseInt(hexcolor.substring(3, 5), 16);
    var b = parseInt(hexcolor.substring(5, 7), 16);
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#444' : '#fff';
};


export class AnterosColorPicker extends Component {
  state = {
    colors: this.props.colors,
    selectedColor: this.props.selectedColor,
  };

  renderItem = ({ item }) => {
    const fontColor = getContrastYIQ(item);
    return (
    <TouchableOpacity
      style={[styles.circle, { backgroundColor: item }]}
      onPress={() => {
        this.setState({ selectedColor: item });
        this.props.onSelect(item);
      }}>
      {this.state.selectedColor === item &&
        <AnterosIcon type="material-community" name="check" color={fontColor} fontSize={24}/>}
    </TouchableOpacity>
  )};

  _keyExtractor = (item, index) => index;

  render() {
    return (
      <FlatList
        data={this.state.colors}
        extraData={this.state}
        renderItem={this.renderItem}
        keyExtractor={this._keyExtractor}
        horizontal={true}
        keyboardShouldPersistTaps="always"
        style={{ maxHeight: 75 }}
      />
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export class AnterosFullStatusColorPicker extends Component {
  state = {
    selectedColor: this.props.selectedColor,
    text: this.props.text,
  };

  changeColor = async () => {
    const colors = this.props.colors;
    let index = colors.findIndex(e => e === this.state.selectedColor) + 1;
    index = index < 0 || index >= colors.length ? 0 : index;
    await this.setState({ selectedColor: colors[index] });
    this.props.onChange(this.state);
  };

  render() {
    const fontColor = getContrastYIQ(this.state.selectedColor);
    return (
      <View
        style={[
            stylesFull.container,
          { backgroundColor: this.state.selectedColor },
        ]}>
        <TextInput
          placeholder="Type a Status"
          placeholderTextColor={fontColor}
          multiline={true}
          defaultValue={this.state.text}
          onChangeText={async (text) => {
            await this.setState({ text });
            this.props.onChange(this.state);
          }}
          underlineColorAndroid="#0000"
          style={[stylesFull.textInput, { color: fontColor }]}
        />
        <View style={{ justifyContent: 'center' }}>
          <AnterosIcon
            name="palette"
            type="material-community"
            onPress={this.changeColor}
            size={25}
            color={fontColor}
            style={{
              alignSelf: 'center',
              padding: 20,
            }}
          />
        </View>
      </View>
    );
  }
}

const stylesFull = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  textInput: {
    fontSize: 20,
    fontWeight: 'bold',
    minWidth: 125,
  },
});




export  class AnterosStatusColorPicker extends Component {
  state = {
    colors: this.props.colors,
    selectedColor: this.props.selectedColor,
    text: this.props.text,
    backupColor: this.props.selectedColor,
    backupText: this.props.text,
  };

  onSelect = color => this.setState({ selectedColor: color });

  cancel = () => {
    this.setState({
      selectedColor: this.state.backupColor,
      text: this.state.backupText,
    });
    this.props.onCancel();
  }

  ok = () => {
    this.setState({
      backupText: this.state.text,
      backupColor: this.state.selectedColor,
    });
    this.props.onOk({
      selectedColor: this.state.selectedColor,
      text: this.state.text,
    });
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}>
        <View style={stylesColor.container}>
          <View style={stylesColor.card}>
            <AnterosColorPicker
              colors={this.state.colors}
              selectedColor={this.state.selectedColor}
              onSelect={this.onSelect}
            />
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  width: 10,
                  backgroundColor: this.state.selectedColor,
                }}
              />
              <TextInput
                placeholder="Text"
                multiline={true}
                defaultValue={this.state.text}
                onChangeText={text => this.setState({ text })}
                underlineColorAndroid="#0000"
                style={stylesColor.textInput}
              />
            </View>
            <View style={stylesColor.actionsContainer}>
              <TouchableOpacity
                style={stylesColor.actionContainer}
                onPress={this.cancel}>
                <AnterosText>Cancel</AnterosText>
              </TouchableOpacity>
              <TouchableOpacity
                style={stylesColor.actionContainer}
                onPress={this.ok}>
                <AnterosText>Ok</AnterosText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const screenWidth = Dimensions.get('window').width;

const stylesColor = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0004',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: screenWidth - 40,
    backgroundColor: '#fff',
  },
  textInput: {
    padding: 15,
    fontSize: 18,
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionContainer: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#eee',
  },
});