import {Component, PureComponent} from 'react';
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
import moment from 'moment';
import {AnterosButton, AnterosSwiper, AnterosNavigationPage, AnterosActionSheet, AnterosImageSVG,
     AnterosLabel, AnterosListRow, AnterosText, AnterosImage, AnterosImageSlider, AnterosImageResponsive} from 'anteros-react-native';
import AvatarExample from './AvatarExample';
import ImageCropExample from './ImageCropExample';
import ThumbnailSelectorExample from './ThumbnailSelectorExample';
import ImageLightboxExample from './ImageLightboxExample';
import CameraExample from './CameraExample';
import ImageHeaderScrollViewExample from './ImageHeaderScrollViewExample';
import ImageViewerExample from './ImageViewerExample';
import ZoomableExample from './ZoomableExample';

const timer = require('react-native-timer');

export class LayoutExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Layout',
        showBackButton: true
    };
    constructor(props) {
        super(props);
        this.image1 = this
            .image1
            .bind(this);
        this.image2 = this
            .image2
            .bind(this);    
        this.image3 = this
            .image3
            .bind(this);    
        this.image4 = this
            .image4
            .bind(this);    
        this.image5 = this
            .image5
            .bind(this);     
        this.image6 = this
            .image6
            .bind(this);    
        this.image7 = this
            .image7
            .bind(this);      
        this.image8 = this
            .image8
            .bind(this);    
        this.image9 = this
            .image9
            .bind(this);      
        this.image10 = this
            .image10
            .bind(this);      
        this.image11 = this
            .image11
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

    image1() {
        this
            .navigator
            .push({view: <AvatarExample/>})
    }

    image2() {
        this
            .navigator
            .push({view: <ImageCropExample/>})
    }

    image3() {
         this
             .navigator
             .push({view: <ImageSVGExample/>})
    }

    image4() {
        this
            .navigator
            .push({view: <ImageResponsiveExample/>})
    }

    image5() {
        this
            .navigator
            .push({view: <ThumbnailSelectorExample/>})
    }

    image6() {
        this
            .navigator
            .push({view: <ImageLightboxExample/>})
    }

    image7() {
        //  this
        //      .navigator
        //      .push({view: <CameraExample/>})
    }
    image8() {
        this
            .navigator
            .push({view: <ImageSliderExample/>})
    }
    image9() {
         this
             .navigator
             .push({view: <ImageHeaderScrollViewExample/>})
    }
    image10() {
         this
             .navigator
             .push({view: <ImageViewerExample/>})
    }
    image11() {
        // this
        //     .navigator
        //     .push({view: <ZoomableExample/>})
    }


    renderPage() {
        return (
            <ScrollView style={{
                flex: 1
            }}>
                <View style={{
                    height: 20
                }}/>
                <AnterosListRow title='Avatar' onPress={this.image1} topSeparator='full'/>
                <AnterosListRow title='Image crop' onPress={this.image2} topSeparator='full'/>
                <AnterosListRow title='Image SVG' onPress={this.image3} topSeparator='full'/>
                <AnterosListRow title='Image responsive' onPress={this.image4} topSeparator='full'/>
                <AnterosListRow title='Thumbnail selector' onPress={this.image5} topSeparator='full'/>
                <AnterosListRow title='Light box' onPress={this.image6} topSeparator='full'/>
                <AnterosListRow title='Camera roll picker' onPress={this.image7} topSeparator='full'/>
                <AnterosListRow title='Image slider' onPress={this.image8} topSeparator='full'/>
                <AnterosListRow title='Image header scrollview' onPress={this.image9} topSeparator='full'/>
                <AnterosListRow title='Image viewer' onPress={this.image10} topSeparator='full'/>
                <AnterosListRow title='Zoomable' onPress={this.image11} topSeparator='full'/>
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




class ImageSVGExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Image SVG',
      showBackButton: true
    };

    renderPage(){
        return (
            <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                <View style={{margin:20, borderWidth:1, borderColor: '#EEEEEE'}}>
                    <AnterosImageSVG
                    style={{ width: 300, height: 200}}
                    source={{uri:'https://svgshare.com/i/6Zq.svg'}}
                    />
                </View>
                <View style={{margin:20, borderWidth:1, borderColor: '#EEEEEE'}}>
                    <AnterosImageSVG
                    style={{ width: 300, height: 200 }}
                    source={{uri:'https://openclipart.org/download/301432/Thumbs-Down-Dog_Remix.svg'}}
                    />   
                </View>             
            </View>
          );
    }
}


class ImageResponsiveExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Image responsive',
        showBackButton: true
    };

    renderPage(){
        return (
            <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <AnterosImageResponsive source={{uri: 'https://reactjs.org/logo-og.png'}} initWidth="100" initHeight="100"/>
                <AnterosImageResponsive source={{uri: 'https://reactjs.org/logo-og.png'}} initWidth="100" initHeight="100"/>
                <AnterosImageResponsive source={{uri: 'https://reactjs.org/logo-og.png'}} initWidth="100" initHeight="100"/>
            </View>
        );
    }
}



class ImageSliderExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Image slider',
      showBackButton: true
    };

    renderPage(){
      const images = [
        'https://placeimg.com/640/640/nature',
        'https://placeimg.com/640/640/people',
        'https://placeimg.com/640/640/animals',
        'https://placeimg.com/640/640/beer',
      ];
  
      return (
        <View style={stylesSlider.container}>
          <View style={stylesSlider.content1}>
            <AnterosText style={stylesSlider.contentText}>Content 1</AnterosText>
          </View>
          <AnterosImageSlider
            loop
            autoPlayWithInterval={3000}
            images={images}
            onPress={({ index }) => alert(index)}
            customSlide={({ index, item, style, width }) => (
              // It's important to put style here because it's got offset inside
              <View
                key={index}
                style={[
                  style,
                  styles.customSlide,
                  { backgroundColor: index % 2 === 0 ? 'yellow' : 'green' },
                ]}
              >
                <AnterosImage source={{ uri: item }} style={stylesSlider.customImage} />
              </View>
            )}
            customButtons={(position, move) => (
              <View style={stylesSlider.buttons}>
                {images.map((image, index) => {
                  return (
                    <TouchableHighlight
                      key={index}
                      underlayColor="#ccc"
                      onPress={() => move(index)}
                      style={stylesSlider.button}
                    >
                      <AnterosText style={position === index && stylesSlider.buttonSelected}>
                        {index + 1}
                      </AnterosText>
                    </TouchableHighlight>
                  );
                })}
              </View>
            )}
          />
          <View style={stylesSlider.content2}>
            <AnterosText style={stylesSlider.contentText}>Content 2</AnterosText>
          </View>
        </View>
      );
    }
  }
  
  const stylesSlider = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    slider: { backgroundColor: '#000', height: 350 },
    content1: {
      width: '100%',
      height: 50,
      marginBottom: 10,
      backgroundColor: '#FFE0B2',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content2: {
      width: '100%',
      height: 50,
      marginTop: 10,
      backgroundColor: '#FFB74D',
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentText: { color: 'black' },
    buttons: {
      zIndex: 1,
      height: 15,
      marginTop: -25,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    button: {
      margin: 3,
      width: 15,
      height: 15,
      opacity: 0.9,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonSelected: {
      opacity: 1,
      color: 'red',
    },
    customSlide: {
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
    },
    customImage: {
      flex:1
    },
  });