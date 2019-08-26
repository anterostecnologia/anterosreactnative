import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image, Text, Platform, ScrollView } from 'react-native';
import Interactable from 'react-native-interactable';
import PropTypes from 'prop-types';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - 75
}

export class AnterosNotifyPanel extends Component {
  constructor(props){
    super(props);
    this.onLayout = this.onLayout.bind(this);
    this.state = {width: Dimensions.get('window').width, height: Dimensions.get('window').height}
  }

  static propTypes = {
    dataSource : PropTypes.array.isRequired,
    renderItem : PropTypes.func.isRequired,
    backgroundColor : PropTypes.string.isRequired
  }

  static defaultProps = {
    backgroundColor: '#182e43f0'
  }

  onLayout(e){
    this.setState({width: e.nativeEvent.layout.width,height: e.nativeEvent.layout.height});
  }


  render() {
    return (
        <View style={styles.panelContainer} onLayout={this.onLayout}>
          <Interactable.View
            verticalOnly={true}
            snapPoints={[{y: 0, tension: 0, damping: 1}, {y: -Screen.height + 80}]}
            gravityPoints={[{y: 0, strength: 220, falloff: Screen.height*8, damping: 0.7, influenceArea: {top: (-Screen.height + 80) * 0.5}}]}
            initialPosition={{y: -Screen.height + 80}}
            boundaries={{top: -Screen.height, bottom: 0, bounce: 2, haptics: true}}>
            <View style={[styles.panel,{backgroundColor:this.props.backgroundColor}]}>
              <ScrollView style={{height:this.state.height*0.70}}>
                {this.props.dataSource.map((item, index) => {
                      return (
                      this.props.renderItem(item,index)
                      );
                  })}   
              </ScrollView>
              <View style={(Platform.OS === 'android') ? styles.panelFooterAndroid : styles.panelFooterIos }>
                <Text style={styles.panelFooterText}>{this.props.footerTitle}</Text>
                <View style={styles.panelHandle} />
              </View>
            </View>
          </Interactable.View>
        </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef',
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  panel: {
    height: Screen.height + 2,
    backgroundColor: '#182e43f0',
    padding: 15,
    paddingTop: 30,
    flexDirection: 'column'
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 10
  },
  contentImage: {
    width: Screen.width-50,
    height: Screen.width-50
  },
  contentBody: {
    fontSize: 18,
    color: 'gray',
    marginTop: 10
  },
  panelHeader: {
    fontSize: 24,
    color: 'white',
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 10,
    justifyContent: 'flex-start'
  },
  panelFooterIos: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  panelFooterAndroid: {
    flex: 1,
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  panelFooterText: {
    fontSize: 13,
    color: '#ffffff80',
    marginBottom: 10
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff80'
  },
  notificationContainer: {
    backgroundColor: '#b0cbdd',
    borderRadius: 14,
    marginBottom: 10
  },
  notificationHeader: {
    height: 30,
    backgroundColor: '#c3d6e1',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingHorizontal: 20
  },
  notificationTitle: {
    marginTop: 5,
    fontSize: 16,
    color: '#1c5675'
  },
  notificationBody: {
    marginVertical: 14,
    marginHorizontal: 20
  }
});