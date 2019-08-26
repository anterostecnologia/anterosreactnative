import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableHighlight,
  Image,
  Slider
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {AnterosNavigationPage, AnterosMasonryList} from 'anteros-react-native';

// list of images
let data = [
  {
    data: {
      caption: 'Summer Recipies',
      user: {
        name: 'Henry'
      },
    },
    uri: 'https://source.unsplash.com/Y5HDSClIVeM/150x200',
    key:1,
    renderFooter: (data) => {
      return (
        <View key='brick-header' style={{backgroundColor: 'white', padding: 5, paddingRight: 9, paddingLeft: 9}}>
          <Text style={{lineHeight: 20, fontSize: 14}}>{data.caption}</Text>
        </View>
      )
    },
    renderHeader: (data) => {
      return (
        <View key='brick-footer' style={styles.headerTop}>
          <Image
            source={{ uri: 'https://source.unsplash.com/nLz2z-JvCe4/150x200' }}
            style={styles.userPic}/>
          <Text style={styles.userName}>{data.user.name}</Text>
        </View>
      )
    }
  },
  {
    uri: 'https://source.unsplash.com/MsTOg6rhRVk/150x200',
    key:2,
  },
  {
    uri: 'https://source.unsplash.com/fdlZBWIP0aM/150x200',
    key:3,
  },
  {
    uri: 'https://source.unsplash.com/1Rm9GLHV0UA/150x200',
    key:4,
  },
  {
    uri: 'https://source.unsplash.com/auIbTAcSH6E/150x200',
    key:5,
  },
  {
    uri: 'https://source.unsplash.com/GuvimT4IFok/150x200',
    key:6,
  },
  {
    uri: 'https://source.unsplash.com/nBtmglfY0HU/150x200',
    key:7,
  },
  {
    uri: 'https://source.unsplash.com/oaz0raysASk/150x200',
    key:8,
  },
  {
    uri: 'https://source.unsplash.com/4zm5e0ZgYjE/150x200',
    key:9,
  },
  {
    uri: 'https://source.unsplash.com/usfIE5Yc7PY/150x200',
    key:10,
  },
  {
    uri: 'https://source.unsplash.com/GTMGG-xvxdU/150x200',
    key:11,
  },
  {
    uri: 'https://source.unsplash.com/FnfMtI8w6-E/150x200',
    key:12,
  },
  {
    uri: 'https://source.unsplash.com/EBO7ZeuUtz0/150x200',
    key:13,
  },
  {
    uri: 'https://source.unsplash.com/2r8BzVYZIeo/150x200',
    key:14,
  },
  {
    uri: 'https://source.unsplash.com/qdyBKWSzpSI/150x200',
    key:15,
  },
  {
    uri: 'https://source.unsplash.com/6JUjdlHyqw0/150x200',
    key:16,
  },
  {
    uri: 'https://source.unsplash.com/xRQ_wX0vpKk/150x200',
    key:17,
  },
  {
    uri: 'https://source.unsplash.com/6hxK5l-sHys/150x200',
    key:18,
  },
  {
    uri: 'https://source.unsplash.com/Ul4sgxQMmHU/150x200',
    key:19,
  },
  {
    uri: 'https://source.unsplash.com/Pw7st6DXLZQ/150x200',
    key:20,
  },
  {
    uri: 'https://source.unsplash.com/K0mrkZiTbfQ/150x200',
    key:21,
  }
];

const addData = [
  {
    uri: 'https://source.unsplash.com/zXNC_lBBVGE/150x200'
  },
  {
    uri: 'https://source.unsplash.com/16uhRJI96Yw/150x200'
  },
  {
    uri: 'https://source.unsplash.com/fk6IiypMWss/150x200'
  }
];

export default class MasonryListExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Masonry list',
        showBackButton: true
    };

  constructor() {
      super();

      this.state = {
        columns: 2,
        padding: 5,
        data
      };
  }

  _addData = () => {
    const appendedData = [...data, ...addData];
    this.setState({
      data: appendedData
    });
  }

  renderPage() {
    return (
      <View style={{flex: 1, backgroundColor: '#f4f4f4'}}>
        <View style={[styles.center, styles.header]}>
          <Text style={{ fontWeight: '800', fontSize: 20 }}>Masonry Demo</Text>
        </View>

        <View style={[styles.center, styles.buttonGroup, { marginTop: 10, marginBottom: 25 }]}>
          <TouchableHighlight style={styles.button} onPress={() => this.setState({ columns: 2 })}>
            <Text>2 Column</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => this.setState({ columns: 3 })}>
            <Text>3 Columns</Text>
          </TouchableHighlight>
          <TouchableHighlight  style={styles.button} onPress={() => this.setState({ columns: 6 })}>
            <Text>6 Columns</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => this.setState({ columns: 9 })}>
            <Text>9 Columns</Text>
          </TouchableHighlight>
        </View>

        <View style={[styles.buttonGroup, {marginLeft: 4}]}>
          <TouchableHighlight style={styles.button} onPress={this._addData}>
            <Text>Push New Data</Text>
          </TouchableHighlight>
        </View>

        <View style={[styles.center, styles.slider, { marginTop: 10, marginBottom: 25, flexDirection: 'column'}]}>
          <View style={{paddingLeft: 10}}>
            <Text>Dynamically adjust padding: {this.state.padding}</Text>
          </View>
          <View style={{width: '100%'}}>
            <Slider
              style={{height: 10, margin: 10}}
              maximumValue={40}
              step={5}
              value={20}
              onValueChange={(value) => this.setState({padding: value})} />
          </View>
        </View>

        <View style={{flex: 1, flexGrow: 10, padding: this.state.padding}}>
          <AnterosMasonryList
            sorted
            bricks={this.state.data}
            columns={this.state.columns}
            customImageComponent={FastImage} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    flex: 1,
    flexBasis: '10%'
  },
  header: {
    flexGrow: 1
  },
  buttonGroup: {
    flexGrow: 1
  },
  slider: {
    flexGrow: 1
  },
  button: {
    backgroundColor: '#dbdcdb',
    padding: 10,
    marginRight: 4,
    borderRadius: 4,
    borderBottomColor: '#7b7b7b',
    borderBottomWidth: 5
  },
  buttonText: {
    color: '#404040'
  },
  center: {
    marginTop: 30,
    marginBottom: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  headerTop: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  userPic: {
    height: 20,
    width: 20,
    borderRadius: 10,
    marginRight: 10
  },
  userName: {
    fontSize: 20
  }
});