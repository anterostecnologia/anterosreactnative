import { Component } from 'react'
import {
  Text,
  View,
  Slider,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'

import {AnterosNavigationPage, AnterosText, AnterosButton, AnterosImageCrop, AnterosImagePickerDialog} from 'anteros-react-native';
const { width, height } = Dimensions.get('window');
const WINDOW_WIDTH = width;
const WINDOW_HEIGHT = height;
const IMAGE_SIZE = {
  width: WINDOW_WIDTH - 40,
  height: WINDOW_HEIGHT - 150
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  headerContainer: {
    height: 40,
    width: width - 10,
    justifyContent: 'space-around',
    marginTop: 20,
    marginRight: 10,
    flexDirection: 'row'
  },
  openPhotoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.1
  },
  doneContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.1
  },
  cropContainer: {
    flex: 1,
  }
});

export class ImageCropExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Image crop',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      uri: null,
      imageSize: {
        width: 0,
        height: 0,
      },
    };
    this.cropRef = null;
    this.onShowImagePicker = this.onShowImagePicker.bind(this);
    this.onDone = this.onDone.bind(this);
    this.handleCrop = this.handleCrop.bind(this);
    this.renderCropView = this.renderCropView.bind(this);
  }

  onShowImagePicker(){
    AnterosImagePickerDialog.show()
    .then(({ source }) => {
      if (source) {
        console.info(source);
        Image.getSize(source.uri, (imageWidth, imageHeight) => {
          if (imageWidth < 500 && imageHeight < 500) {
            alert('please select the large image, min size is 500*500');
            return;
          }
          this.setState({
            uri: source.uri,
            imageSize: {
              width: imageWidth,
              height: imageHeight
            },
          });
        });
      }
    });
  };

  onDone(){
    this.cropRef.onCrop();
  };

  handleCrop(uri){
    this.setState({ uri });
  };

  renderCropView() {
    const { uri, imageSize } = this.state;
    if (uri !== null) {
      return (
        <View style={styles.cropContainer}>
          <AnterosImageCrop
            ref={(ref) => this.cropRef = ref}
            image={uri}
            onCrop={this.handleCrop}
            initialWidth=
              {imageSize.width === 500 && IMAGE_SIZE.width < 250 ? 250 : IMAGE_SIZE.width }
            initialHeight=
              {imageSize.height === 500 && IMAGE_SIZE.height < 250 ? 250 : IMAGE_SIZE.height}
            minWidth={imageSize.width}
            minHeight={imageSize.height}
            // postCropWidth={300}
            // postCropHeight={480}
          />
        </View>
      );
    }
    return null;
  };

  renderPage() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
            <AnterosButton title='Open Photo' onPress={this.onShowImagePicker}/>
            <AnterosButton title='Done' onPress={this.onDone}/>
        </View>
        {this.renderCropView()}
      </View>
    );
  }
}