// SelectExample.js

'use strict';

import {Component} from 'react';
import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {AnterosText, AnterosSelect, AnterosNavigationPage, AnterosDateTimePicker,
  AnterosListRow, AnterosLabel, AnterosImage, AnterosLabelSelect} from 'anteros-react-native';
import PropTypes from 'prop-types';
import TagSelectExample from './TagSelectExample';
import SwitchSelectorExample from './SwitchSelectorExample';
import MultiSelectExample from './MultiSelectExample';
import ColorPickerExample from './ColorPickerExample';
import PopoverPickerExample from './PopoverPickerExample';
import PullPickerExample from './PullPickerExample';
import HoloColorPickerExample from './HoloColorPickerExample';
import StatusColorPickerExample from './StatusColorPickerExample';



export class SelectExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Select/picker',
        showBackButton: true
    };
    constructor(props) {
        super(props);
        this.select1 = this
            .select1
            .bind(this);
        this.select2 = this
            .select2
            .bind(this);  
        this.select3 = this
            .select3
            .bind(this);      
        this.select4 = this
            .select4
            .bind(this);     
        this.select5 = this
            .select5
            .bind(this);       
        this.select6 = this
            .select6
            .bind(this);       
        this.select7 = this
            .select7
            .bind(this); 
        this.select8 = this
            .select8
            .bind(this);
        this.select9 = this
            .select9
            .bind(this);    
        this.select10 = this
            .select10
            .bind(this);     
        this.select11 = this
            .select11
            .bind(this); 
    }

    renderRow = (highlighted) => {
        if (Platform.OS !== 'android') {
            return <View
                style={[
                {
                    backgroundColor: '#f0f0f0',
                    height: 1
                },
                highlighted && {
                    marginLeft: 0
                }
            ]}/>;
        }

        return null;
    };

    select1() {
        this
            .navigator
            .push({view: <SelectExample1/>})
    }

    select2() {
      this
          .navigator
          .push({view: <TagSelectExample/>})
    }

    select3() {
      this
        .navigator
        .push({view: <SwitchSelectorExample/>})
    }

    select4() {
      this
        .navigator
        .push({view: <MultiSelectExample/>})
    }

    select5() {
      this
        .navigator
        .push({view: <ColorPickerExample/>})
    }

    select6() {
      this
        .navigator
        .push({view: <PopoverPickerExample/>})
    }
    select7() {
      this
        .navigator
        .push({view: <PullPickerExample/>})
    }

    select8() {
      this
        .navigator
        .push({view: <SelectExample2/>})
    }

    select9() {
      this
        .navigator
        .push({view: <DateTimePickerExample/>})
    }

    select10() {
      this
        .navigator
        .push({view: <HoloColorPickerExample/>})
    }
    select11() {
      this
        .navigator
        .push({view: <StatusColorPickerExample/>})
    }


    renderPage() {
        return (
            <ScrollView style={{
                flex: 1
            }}>
                <View style={{
                    height: 20
                }}/>
                <AnterosListRow title='Select' onPress={this.select1} topSeparator='full'/>
                <AnterosListRow title='Tag select' onPress={this.select2} topSeparator='full'/>
                <AnterosListRow title='Switch selector' onPress={this.select3} topSeparator='full'/>
                <AnterosListRow title='Multiple select' onPress={this.select4} topSeparator='full'/>
                <AnterosListRow title='Color picker' onPress={this.select5} topSeparator='full'/>
                <AnterosListRow title='Status color picker' onPress={this.select11} topSeparator='full'/>
                <AnterosListRow title='Holo/Triangle Color picker' onPress={this.select10} topSeparator='full'/>
                <AnterosListRow title='Popover picker' onPress={this.select6} topSeparator='full'/>
                <AnterosListRow title='Pull picker' onPress={this.select7} topSeparator='full'/>
                <AnterosListRow title='Label select' onPress={this.select8} topSeparator='full'/>
                <AnterosListRow title='Date time picker' onPress={this.select9} topSeparator='full'/>
            </ScrollView>
        );
    }
}

const stylesList = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    row: {
        paddingHorizontal: 10,
        paddingVertical: 20
    }
});




class SelectExample1 extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Select',
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.items = [
      'Apple',
      'Banana',
      'Cherry',
      'Durian',
      'Filbert',
      'Grape',
      'Hickory',
      'Lemon',
      'Mango'
    ];
    this.customItems = [
      {
        text: 'Long long long long long long long',
        value: 1
      }, {
        text: 'Short',
        value: 2
      }, {
        text: <Image
          style={{
          width: 40,
          height: 40
        }}
          source={require('../images/teaset1_s.jpg')}/>,
        value: 3
      }
    ];
    Object.assign(this.state, {
      valueSM: null,
      valueMD: null,
      valueLG: null,
      valueAuto: null,
      valuePull: null,
      valuePopover: null,
      valueReadonly: 'Readonly',
      valueDisable: null,
      valueCustom: null
    });
  }

  renderPage() {
    let {
      valueSM,
      valueMD,
      valueLG,
      valueAuto,
      valuePull,
      valuePopover,
      valueReadonly,
      valueDisable,
      valueCustom
    } = this.state;
    return (
      <ScrollView style={{
        flex: 1
      }}>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Size sm'
          detail={< AnterosSelect style = {{width: 200}}size = 'sm' value = {
          valueSM
        }
        items = {
          this.items
        }
        placeholder = 'Select item' pickerTitle = 'Size sm' onSelected = {
          (item, index) => this.setState({valueSM: item})
        } />}
          topSeparator='full'/>
        <AnterosListRow
          title='Size md'
          detail={< AnterosSelect style = {{width: 200}}size = 'md' value = {
          valueMD
        }
        items = {
          this.items
        }
        placeholder = 'Select item' pickerTitle = 'Size md' onSelected = {
          (item, index) => this.setState({valueMD: item})
        } />}/>
        <AnterosListRow
          title='Size lg'
          detail={< AnterosSelect style = {{width: 200}}size = 'lg' value = {
          valueLG
        }
        items = {
          this.items
        }
        placeholder = 'Select item' pickerTitle = 'Size lg' onSelected = {
          (item, index) => this.setState({valueLG: item})
        } />}
          bottomSeparator='full'/>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='PickerType auto'
          detail={< AnterosSelect style = {{width: 200}}size = 'md' value = {
          valueAuto
        }
        items = {
          this.items
        }
        placeholder = 'Select item' pickerType = 'auto' pickerTitle = 'PickerType auto' onSelected = {
          (item, index) => this.setState({valueAuto: item})
        } />}/>
        <AnterosListRow
          title='PickerType pull'
          detail={< AnterosSelect style = {{width: 200}}size = 'md' value = {
          valuePull
        }
        items = {
          this.items
        }
        placeholder = 'Select item' pickerType = 'pull' pickerTitle = 'PickerType pull' onSelected = {
          (item, index) => this.setState({valuePull: item})
        } />}/>
        <AnterosListRow
          title='PickerType popover'
          detail={< AnterosSelect style = {{width: 200}}size = 'md' value = {
          valuePopover
        }
        items = {
          this.items
        }
        placeholder = 'Select item' pickerType = 'popover' pickerTitle = 'PickerType popover' onSelected = {
          (item, index) => this.setState({valuePopover: item})
        } />}/>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Readonly'
          detail={< AnterosSelect style = {{width: 200}}placeholder = 'Select item' editable = {
          false
        }
        value = {
          valueReadonly
        } />}
          topSeparator='full'/>
        <AnterosListRow
          title='Disabled'
          detail={<AnterosSelect style = {{width: 200}}items = {
          this.items
        }
        placeholder = 'Select item' disabled = {
          true
        }
        value = {
          valueDisable
        } />}
          bottomSeparator='full'/>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Custom'
          detail={<AnterosSelect style = {{width: 200, backgroundColor: '#rgba(238, 169, 91, 0.1)', borderColor: '#8a6d3b'}}size = 'lg' value = {
          valueCustom
        }
        valueStyle = {{flex: 1, color: '#8a6d3b', textAlign: 'right'}}items = {
          this.customItems
        }
        getItemValue = {
          (item, index) => item.value
        }
        getItemText = {
          (item, index) => item.text
        }
        icon = { <Text style = {{color: '#8a6d3b', fontSize: 16, paddingRight: 4}} > ▼ </Text>} placeholder='Select item' pickerTitle='Custom' onSelected={(item, index) => this.setState({valueCustom: item.value})} / >}
          topSeparator='full'
          bottomSeparator='full'/>
      </ScrollView>
    );
  }

}



class SelectExample2 extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Label select',
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.state = {
      arr: [{
        name: 'Aspirin',
        isSelected: false,
        value: 1
      }, {
        name: 'MarginTop',
        isSelected: true,
        value: 2
      }, {
        name: 'Dooper',
        isSelected: true,
        value: 3
      }, {
        name: 'Young Skywalker',
        isSelected: false,
        value: 4
      }, {
        name: 'Jedi Master',
        isSelected: true,
        value: 5
      }, {
        name: 'Anakin',
        isSelected: false,
        value: 6
      }, {
        name: 'Orange',
        isSelected: false,
        value: 7
      }, {
        name: 'Hot dog',
        isSelected: false,
        value: 8
      }]
    };
    this.selectConfirm = this.selectConfirm.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  selectConfirm(list) {
    let {arr} = this.state;
    for (let item of list) {
      let index = arr.findIndex(ele => ele === item);
      if (~index) arr[index].isSelected = true;
      else continue;
    }
    this.setState({arr: arr});
  }
  deleteItem(item) {
    let {arr} = this.state;
    let index = arr.findIndex(a => a === item);
    arr[index].isSelected = false;
    this.setState({arr: arr});
  }
  renderPage() {
    return (
      <View style={stylesLabel.container}>
        <AnterosText style={stylesLabel.text}>Normal LabelSelect</AnterosText>
        <AnterosLabelSelect
          title="Checkbox"
          ref="select"
          style={stylesLabel.labelSelect}
          onConfirm={this.selectConfirm}
        >
          {this.state.arr.filter(item => item.isSelected).map((item, index) =>
            <AnterosLabelSelect.Label
              key={'label-' + index}
              data={item}
              onCancel={() => {this.deleteItem(item);}}
            >{item.name}</AnterosLabelSelect.Label>
          )}
          {this.state.arr.filter(item => !item.isSelected).map((item, index) =>
            <AnterosLabelSelect.ModalItem
              key={'modal-item-' + index}
              data={item}
            >{item.name}</AnterosLabelSelect.ModalItem>
          )}
        </AnterosLabelSelect>
        <AnterosText style={stylesLabel.text}>ReadOnly LabelSelect</AnterosText>
        <AnterosLabelSelect
          style={stylesLabel.labelSelect}
          title="Checkbox"
          readOnly={true}
          onConfirm={this.selectConfirm}
        >
          {this.state.arr.filter(item => item.isSelected).map((item, index) =>
            <AnterosLabelSelect.Label
              key={'label-' + index}
              data={item}
              onCancel={() => {this.deleteItem(item);}}
            >{item.name}</AnterosLabelSelect.Label>
          )}
        </AnterosLabelSelect>
        <AnterosText style={stylesLabel.text}>Disabled LabelSelect</AnterosText>
        <AnterosLabelSelect
          style={stylesLabel.labelSelect}
          title="Checkbox"
          enable={false}
          onConfirm={this.selectConfirm}
        >
          {this.state.arr.filter(item => item.isSelected).map((item, index) =>
            <AnterosLabelSelect.Label
              key={'label-' + index}
              data={item}
              onCancel={() => {this.deleteItem(item);}}
            >{item.name}</AnterosLabelSelect.Label>
          )}
        </AnterosLabelSelect>
      </View>
    );
  }
}

const stylesLabel = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#e3eeee'
  },
  labelSelect: {
    marginTop: 5,
    marginBottom: 20,
    padding: 5,
    borderWidth: 1,
    borderRadius: 6,
    borderStyle: 'dashed',
    borderColor: '#6dc2a2'
  },
  text: {
    fontSize: 16,
    color: 'rgb(13, 131, 144)'
  }
});




class DateTimePickerExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Date time picker',
    showBackButton: true
  };

  state = {
    isDatePickerVisible: false,
    isTimePickerVisible: false,
    isDateTimePickerVisible: false
  };

  _showDatePicker = () => this.setState({ isDatePickerVisible: true });

  _hideDatePicker = () => this.setState({ isDatePickerVisible: false });

  _showTimePicker = () => this.setState({ isTimePickerVisible: true });

  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this._hideDatePicker();
  };

  _handleTimePicked = date => {
    console.log("A time has been picked: ", date);
    this._hideTimePicker();
  };

  _handleDateTimePicked = date => {
    console.log("A date/time has been picked: ", date);
    this._hideDateTimePicker();
  };

  renderPage() {
    return (
      <View style={stylesDate.container}>
        <TouchableOpacity onPress={this._showDatePicker}>
          <View style={stylesDate.button}>
            <Text>Show DatePicker</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._showTimePicker}>
          <View style={stylesDate.button}>
            <Text>Show TimePicker</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <View style={stylesDate.button}>
            <Text>Show DateTimePicker</Text>
          </View>
        </TouchableOpacity>
        <AnterosDateTimePicker
          isVisible={this.state.isDatePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDatePicker}
        />
        <AnterosDateTimePicker
          mode={'time'}
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this._handleTimePicked}
          onCancel={this._hideTimePicker}
        />
        <AnterosDateTimePicker
          mode={'datetime'}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDateTimePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    );
  }
}

const stylesDate = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
});