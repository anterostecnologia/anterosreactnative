import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {AnterosText, AnterosNavigationPage, AnterosCameraRollPicker} from 'anteros-react-native';

export class CameraExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Camera roll picker',
        showBackButton: true
    };

  constructor(props) {
    super(props);

    this.state = {
      num: 0,
      selected: [],
    };
  }

  getSelectedImages(images, current) {
    var num = images.length;

    this.setState({
      num: num,
      selected: images,
    });

    console.log(current);
    console.log(this.state.selected);
  }

  renderPage() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <AnterosText style={styles.text}>
            <AnterosText style={styles.bold}> {this.state.num} </AnterosText> images has been selected
          </AnterosText>
        </View>
        <AnterosCameraRollPicker
          scrollRenderAheadDistance={500}
          initialListSize={1}
          pageSize={3}
          removeClippedSubviews={false}
          groupTypes='SavedPhotos'
          batchSize={5}
          maximum={3}
          selected={this.state.selected}
          assetType='Photos'
          imagesPerRow={3}
          imageMargin={5}
          callback={this.getSelectedImages.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6AE2D',
  },
  content: {
    marginTop: 15,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    alignItems: 'center',
    color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  },
});