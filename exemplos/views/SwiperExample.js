// SwiperExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text, Dimensions, StatusBar} from 'react-native';

import {
  AnterosButton,
  AnterosSwiper,
  AnterosNavigationPage,
  AnterosListRow,
  AnterosActionSheet,
  AnterosLabel,
  AnterosImage,
  AnterosWallpaper,
  AnterosText
} from 'anteros-react-native';

const loading = require('../images/loading_minimal.gif');

const {width, height} = Dimensions.get('window')

var styles = {
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
}

export default class SwiperExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Swiper',
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.swiper1 = this
      .swiper1
      .bind(this);
    this.swiper2 = this
      .swiper2
      .bind(this);
    this.swiper3 = this
      .swiper3
      .bind(this);
    this.swiper4 = this
      .swiper4
      .bind(this);
    this.swiper5 = this
      .swiper5
      .bind(this);  
    this.swiper6 = this
      .swiper6
      .bind(this);    
  }

  show(modal) {
    let items = [
      {
        title: 'Say hello',
        onPress: () => alert('Hello')
      }, {
        title: 'Do nothing'
      }, {
        title: 'Disabled',
        disabled: true
      }
    ];
    let cancelItem = {
      title: 'Cancel'
    };
    AnterosActionSheet.show(items, cancelItem, {modal});
  }

  swiper1() {
    this
      .navigator
      .push({view: <SwiperBasicExample/>})
  }

  swiper2() {
    this
      .navigator
      .push({view: <SwiperDynamicExample/>})
  }

  swiper3() {
    this
      .navigator
      .push({view: <SwiperLoadMinimalExample/>})
  }

  swiper4() {
    this
      .navigator
      .push({view: <SwiperPhoneExample/>})
  }

  swiper5() {
    this
      .navigator
      .push({view: <SwiperNumberExample/>})
  }

  swiper6() {
    this
      .navigator
      .push({view: <TwoSwiperExample/>})
  }

  renderPage() {
    return (
      <ScrollView style={{
        flex: 1
      }}>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow title='Basic' onPress={this.swiper1} topSeparator='full'/>
        <AnterosListRow title='Dynamic' onPress={this.swiper2} bottomSeparator='full'/>
        <AnterosListRow
          title='Load minimal'
          onPress={this.swiper3}
          bottomSeparator='full'/>
        <AnterosListRow
          title='Phone icons'
          onPress={this.swiper4}
          bottomSeparator='full'/>
        <AnterosListRow
          title='Pagination number'
          onPress={this.swiper5}
          bottomSeparator='full'/>  
        <AnterosListRow
          title='Two swiper'
          onPress={this.swiper6}
          bottomSeparator='full'/>   
      </ScrollView>
    );
  }

}

class SwiperBasicExample extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Swiper basic",
    showBackButton: true
  };

  renderPage() {
    return (
      <AnterosSwiper style={styles.wrapper} showsButtons>
        <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </AnterosSwiper>
    )

  }
}

const stylesDynamic = {
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
}

class SwiperDynamicExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Swiper dynamic",
    showBackButton: true
  };

  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }
  componentDidMount() {
    this.setState({
      items: [
        {
          title: 'Hello Swiper',
          css: stylesDynamic.slide1
        }, {
          title: 'Beautiful',
          css: stylesDynamic.slide2
        }, {
          title: 'And simple',
          css: stylesDynamic.slide3
        }
      ]
    })
  }
  renderPage() {
    return (
      <AnterosSwiper showsButtons>
        {this
          .state
          .items
          .map((item, key) => {
            return (
              <View key={key} style={item.css}>
                <AnterosText style={stylesDynamic.text}>{item.title}</AnterosText>
              </View>
            )
          })}
      </AnterosSwiper>
    )
  }
}

const stylesMinimal = {
  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    width,
    flex: 1,
    backgroundColor: 'transparent'
  },

  loadingView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)'
  },

  loadingImage: {
    width: 60,
    height: 60
  }
}

const Slide = props => {
  return (
    <View style={stylesMinimal.slide}>
      <AnterosImage
        onLoad={props
        .loadHandle
        .bind(null, props.i)}
        style={stylesMinimal.image}
        source={{
        uri: props.uri
      }}/>{!props.loaded && <View style={styles.loadingView}>
        <AnterosImage style={stylesMinimal.loadingImage} source={loading}/>
      </View>
}
    </View>
  )
}

class SwiperLoadMinimalExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Swiper load minimal",
    showBackButton: true
  };

  constructor(props) {
    super(props)
    this.state = {
      imgList: [
        'https://gitlab.pro/yuji/demo/uploads/d6133098b53fe1a5f3c5c00cf3c2d670/DVrj5Hz.jp' +
            'g_1',
        'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jp' +
            'g',
        'https://gitlab.pro/yuji/demo/uploads/4421f77012d43a0b4e7cfbe1144aac7c/XFVzKhq.jp' +
            'g',
        'https://gitlab.pro/yuji/demo/uploads/576ef91941b0bda5761dde6914dae9f0/kD3eeHe.jp' +
            'g'
      ],
      loadQueue: [0, 0, 0, 0]
    }
    this.loadHandle = this
      .loadHandle
      .bind(this)
  }
  loadHandle(i) {
    let loadQueue = this.state.loadQueue
    loadQueue[i] = 1
    this.setState({loadQueue})
  }
  renderPage() {
    return (
      <View style={{
        flex: 1
      }}>
        <AnterosSwiper
          loadMinimal
          loadMinimalSize={1}
          style={stylesMinimal.wrapper}
          loop={false}>
          {this
            .state
            .imgList
            .map((item, i) => <Slide
              loadHandle={this.loadHandle}
              loaded={!!this.state.loadQueue[i]}
              uri={item}
              i={i}
              key={i}/>)
}
        </AnterosSwiper>
        <View>
          <AnterosText>Current Loaded Images: {this.state.loadQueue}</AnterosText>
        </View>
      </View>
    )
  }
}

const stylesPhone = {
  wrapper: {
    // backgroundColor: '#f00'
  },

  slide: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  container: {
    flex: 1
  },

  imgBackground: {
    width,
    height,
    backgroundColor: 'transparent',
    position: 'absolute'
  },

  image: {
    width,
    height
  }
}

class SwiperPhoneExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Swiper phone",
    showBackButton: true
  };

  renderPage() {
    return (
      <View style={stylesPhone.container}>
        <StatusBar barStyle='light-content'/>
        <AnterosWallpaper backgroundSource={require('../images/bg.jpg')}>
          <AnterosSwiper
            style={stylesPhone.wrapper}
            dot={< View style = {{backgroundColor: 'rgba(255,255,255,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}}/>}
            activeDot={< View style = {{backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}}/>}
            paginationStyle={{
            bottom: 70
          }}
            loop={false}>
            <View style={stylesPhone.slide}>
              <AnterosImage
                style={stylesPhone.image}
                source={require('../images/1.png')}
                resizeMode='cover'/>
            </View>
            <View style={stylesPhone.slide}>
              <AnterosImage
                style={stylesPhone.image}
                source={require('../images/2.png')}
                resizeMode='cover'/>
            </View>
            <View style={stylesPhone.slide}>
              <AnterosImage style={stylesPhone.image} source={require('../images/3.png')}/>
            </View>
          </AnterosSwiper>
        </AnterosWallpaper>
      </View>
    )
  }
}



const stylesNumber = {
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  image: {
    width,
    flex: 1
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  paginationText: {
    color: 'white',
    fontSize: 20
  }
}

const renderPagination = (index, total, context) => {
  return (
    <View style={stylesNumber.paginationStyle}>
      <AnterosText style={stylesNumber.paginationText}>
        <AnterosText style={stylesNumber.paginationText}>{index + 1}</AnterosText >/{total}
      </AnterosText>
    </View>
  )
}

class SwiperNumberExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Swiper number",
    showBackButton: true
  };

  renderPage() {
    return (
        <AnterosSwiper
          style={stylesNumber.wrapper}
          renderPagination={renderPagination}
          loop={false}
        >
          <View style={stylesNumber.slide} title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
            <AnterosImage style={stylesNumber.image} source={require('../images/11.jpg')} />
          </View>
          <View style={stylesNumber.slide} title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
            <AnterosImage style={stylesNumber.image} source={require('../images/21.jpg')} />
          </View>
          <View style={stylesNumber.slide} title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
            <AnterosImage style={stylesNumber.image} source={require('../images/31.jpg')} />
          </View>
          <View style={stylesNumber.slide} title={<Text numberOfLines={1}>Learn from Kim K to land that job</Text>}>
            <AnterosImage style={stylesNumber.image} source={require('../images/41.jpg')} />
          </View>
        </AnterosSwiper>
    )
  }
}



const stylesSwiper = {
  container: {
    flex: 1
  },

  wrapper: {
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },

  image: {
    width,
    flex: 1
  }
}

class TwoSwiperExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Two Swiper",
    showBackButton: true
  };

  renderPage () {
    return (
      <View style={stylesSwiper.container}>
        <AnterosSwiper style={stylesSwiper.wrapper} height={200} horizontal={false} autoplay>
          <View style={stylesSwiper.slide1}>
            <AnterosText style={stylesSwiper.text}>Hello Swiper</AnterosText>
          </View>
          <View style={stylesSwiper.slide2}>
            <AnterosText style={stylesSwiper.text}>Beautiful</AnterosText>
          </View>
          <View style={stylesSwiper.slide3}>
            <AnterosText style={stylesSwiper.text}>And simple</AnterosText>
          </View>
        </AnterosSwiper>

        <AnterosSwiper style={stylesSwiper.wrapper} height={240}
          onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
          dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
          activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
          paginationStyle={{
            bottom: -23, left: null, right: 10
          }} loop>
          <View style={stylesSwiper.slide} title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
            <AnterosImage resizeMode='stretch' style={stylesSwiper.image} source={require('../images/11.jpg')} />
          </View>
          <View style={stylesSwiper.slide} title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
            <AnterosImage resizeMode='stretch' style={stylesSwiper.image} source={require('../images/21.jpg')} />
          </View>
          <View style={stylesSwiper.slide} title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
            <AnterosImage resizeMode='stretch' style={stylesSwiper.image} source={require('../images/31.jpg')} />
          </View>
          <View style={stylesSwiper.slide} title={<Text numberOfLines={1}>Learn from Kim K to land that job</Text>}>
            <AnterosImage resizeMode='stretch' style={stylesSwiper.image} source={require('../images/41.jpg')} />
          </View>
        </AnterosSwiper>
      </View>
    )
  }
}