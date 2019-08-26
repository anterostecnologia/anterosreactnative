import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    FlatList,
    Alert,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Actions,
    SafeAreaView,
    Platform,
    ImageBackground,
    TouchableHighlight,
    ViewPropTypes,
    Animated,
    StatusBar,
    Easing,
    Image,
    TextInput,
    Dimensions,
    View
} from 'react-native';
import PropTypes from 'prop-types';
import {AnterosButton, AnterosNavigationPage, AnterosActionSheet, AnterosIcon,
     AnterosLabel, AnterosListRow, AnterosText, AnterosColorPicker, AnterosFullStatusColorPicker, AnterosStatusColorPicker} from 'anteros-react-native';



export default class LayoutExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Color picker',
        showBackButton: true
    };
    constructor(props) {
        super(props);
        this.color1 = this
            .color1
            .bind(this);
        this.color2 = this
            .color2
            .bind(this);    
        this.color3 = this
            .color3
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

    color1() {
        this
            .navigator
            .push({view: <ColorPickerExample/>})
    }

    color2() {
        this
            .navigator
            .push({view: <FullColorPickerExample/>})
    }

    color3() {
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
                <AnterosListRow title='Color picker' onPress={this.color1} topSeparator='full'/>
                <AnterosListRow title='Full screen color picker' onPress={this.color2} topSeparator='full'/>
                <AnterosListRow title='Status color picker' onPress={this.color3} topSeparator='full'/>
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



class ColorPickerExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Color picker',
      showBackButton: true,
    };

    state = {
      colors: ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B"],
      selectedColor: '#F44336',
    };
  
    onSelect = color => this.setState({ selectedColor: color });
  
    renderPage() {
      return (
        <View style={styles1.container}>
  
          <AnterosColorPicker
            colors={this.state.colors}
            selectedColor={this.state.selectedColor}
            onSelect={this.onSelect}
          />
  
          <AnterosText>Selected Color = {this.state.selectedColor}</AnterosText>
  
        </View>
      );
    }
  }
  
  const styles1 = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  


class FullColorPickerExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Full color picker',
      showBackButton: true,
    };

    state = {
      colors: ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B"],
      selectedColor: '#F44336',
      text: '',
    };
  
    onChange = data => {
      this.setState({ selectedColor: data.selectedColor, text: data.text });
    };
  
    renderPage() {
      return (
        <View style={styles2.container}>
            <AnterosFullStatusColorPicker
              colors={this.state.colors}
              selectedColor={this.state.selectedColor}
              text={this.state.text}
              onChange={this.onChange}
            />
        </View>
      );
    }
  }
  
  const styles2 = StyleSheet.create({
    container: {
      flex: 1,
    },
  });


class StatusColorPickerExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Status color picker',
      showBackButton: true,
    };

    state = {
      visible: false,
      colors: ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B"],
      selectedColor: '#F44336',
      text: '',
    };
  
    ok = data => {
      this.setState({ selectedColor: data.selectedColor, text: data.text });
      this.close();
    };
  
    close = () => {
      this.setState({ visible: false });
    };
  
    renderPage() {
      return (
        <View style={styles3.container}>
          
          <AnterosIcon
            name="palette"
            type="material-community"
            size={34} 
            color={this.state.selectedColor}
            onPress={() => this.setState({ visible: true })}
          />
          <AnterosStatusColorPicker
            visible={this.state.visible}
            colors={this.state.colors}
            selectedColor={this.state.selectedColor}
            text={this.state.text}
            onOk={this.ok}
            onCancel={this.close}
          />
  
          <AnterosText>Selected Color = {this.state.selectedColor}</AnterosText>
          <AnterosText>Text = {this.state.text}</AnterosText>
          
        </View>
      );
    }
  }
  
  const styles3 = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });