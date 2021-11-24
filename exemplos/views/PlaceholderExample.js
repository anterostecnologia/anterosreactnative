import { PureComponent, Component } from 'react';
import { View, Text, StyleSheet, Animated, Image, ScrollView } from 'react-native';

import {AnterosNavigationPage, AnterosPlaceHolder} from 'anteros-react-native';

class Line extends PureComponent {
  render() {
    return (
      <View style={[{
        height: 3,
        backgroundColor: 'rgba(154, 154, 154, 0.29)',
        overflow: 'hidden',
      }, this.props.style]}
      >
        <View style={[this.props.style]} />
      </View>
    );
  }
}

export class PlaceholderExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Placeholder',
      showBackButton: true,
    };

  constructor(props) {
    super(props);
    this.loadingAnimated = [];
    this.avatarLoadingAnimated = [];
    this.animatedAvatarReverseLoading = [];
    this.bigImageAndSomeRowsAnimated = [];
    this.state = {
      isfetched: false,
      imageIsFetched: false,
    };
  }
  componentDidMount() {
    this.runAnimated();
    this.runAvatarAnimated();
    this.runAvatarReverseAnimated();
    this.runBigAvatarAndSomeRowsAnimated();
    setTimeout(() => this.setState({ isfetched: true }), 2000);
  }

  runAnimated() {
    if (Array.isArray(this.loadingAnimated) && this.loadingAnimated.length > 0) {
      const threeRowAnimated = Animated.parallel(
        this.loadingAnimated.map(animate => {
          if (animate && animate.getAnimated) {
              return animate.getAnimated();
          } else 
          return null;
        }),
        {
          stopTogether: false,
        },
      );
      Animated.loop(threeRowAnimated).start();
    }
  }
  runAvatarReverseAnimated() {
    this.animatedAvatarReverseLoading = this.animatedAvatarReverseLoading.slice(this.animatedAvatarReverseLoading.length - 5, this.animatedAvatarReverseLoading.length);
    if (Array.isArray(this.animatedAvatarReverseLoading) && this.animatedAvatarReverseLoading.length > 0) {
      const sequenceReverseAnimated = Animated.stagger(400,[
        this.animatedAvatarReverseLoading[0].getAnimated(), // image left
        Animated.parallel( //4 row middle
          this.animatedAvatarReverseLoading.slice(1, this.animatedAvatarReverseLoading.length-1).map(animate => {
            if (animate && animate.getAnimated) {
                return animate.getAnimated();
            } else 
            return null;
          }), 
          {
            stopTogether: false,
          },
        ),
        this.animatedAvatarReverseLoading[this.animatedAvatarReverseLoading.length - 1].getAnimated(), // right image
      ]
    )
    .start(()=>this.runAvatarReverseAnimated())
    // Animated.loop(sequenceReverseAnimated).start()
    }
  }
  runBigAvatarAndSomeRowsAnimated() {
    if (Array.isArray(this.bigImageAndSomeRowsAnimated) && this.bigImageAndSomeRowsAnimated.length > 0) {
      Animated.parallel(
        [
          this.bigImageAndSomeRowsAnimated[0].getAnimated(),
          ...this.bigImageAndSomeRowsAnimated.slice(1).map(animate => {
          if (animate && animate.getAnimated) {
              return animate.getAnimated();
          } else 
            return null;
          }),
        ],
        {
          stopTogether: false,
        }).start(() => {
          this.runBigAvatarAndSomeRowsAnimated();
    })
    }
  }
  runAvatarAnimated() {
    if (Array.isArray(this.avatarLoadingAnimated) && this.avatarLoadingAnimated.length > 0) {
      const avatarandrowsAnimated = Animated.stagger(400,[
        this.avatarLoadingAnimated[0].getAnimated(),
        Animated.parallel(
          this.avatarLoadingAnimated.slice(1).map(animate => {
            if (animate&&animate.getAnimated) {
               return animate.getAnimated();
            } else 
            return null
          }),
          {
            stopTogether: false
          }
        )]
      );
      Animated.loop(avatarandrowsAnimated).start();
    }
  }
  _renderRows(loadingAnimated,number,uniqueKey){
    shimmerRows=[]
    for(let index=0;index<number;index++ ){
      shimmerRows.push(
        <AnterosPlaceHolder
          key={`loading-${index}-${uniqueKey}`}
          ref = {(ref) => loadingAnimated.push(ref)}
          style={{ marginBottom: 7 }}
        />
      )
    }
    return(
      <View>
        {shimmerRows}
      </View>
    )
  }
  _renderRowsReverse(loadingAnimated,number,uniqueKey){
    shimmerRows=[]
    for(let index=0;index<number;index++ ){
      shimmerRows.push(
        <AnterosPlaceHolder
          key={`loading-${index}-${uniqueKey}`}
          ref={(ref) => loadingAnimated.push(ref)}
          width={150}
          style={{ marginBottom: 7}}
          reverse

        />
      )
    }
    return(
      <View>
        {shimmerRows}
      </View>
    )
  }
  _renderImageAndRows = () => {
    this.avatarLoadingAnimated=[]
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <AnterosPlaceHolder
            ref={(ref) => this.avatarLoadingAnimated.push(ref)}
            width={60}
            height={60}
            style={{ marginRight: 16 }}
          />
          {this._renderRows(this.avatarLoadingAnimated, 3, 'image-row')}
        </View>
      </View>
    )
  }
  _renderReverseAnimated= () => {
    // this.animatedAvatarReverseLoading = []
    return(
      <View style={{ flexDirection: 'row-reverse' }}>
        <AnterosPlaceHolder
          ref={(ref) => this.animatedAvatarReverseLoading.push(ref)}
          width={60}
          height={60}
          style={{ marginLeft: 16, borderRadius: 30}}
          reverse
        />
        <View>
          {this._renderRowsReverse(this.animatedAvatarReverseLoading, 3, 'reverse')}
        </View>
        <AnterosPlaceHolder
          ref={(ref) => this.animatedAvatarReverseLoading.push(ref)}
          width={60}
          height={60}
          style={{ marginLeft: 16, marginRight: 16 }}
          reverse
        />
      </View>
    )
  }
  renderPage() {
    const { isfetched, imageIsFetched } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Text style={{ marginBottom: 7 }}> Simple </Text>
        <AnterosPlaceHolder autoRun={true} />
        <Line style={{ marginTop: 7, marginBottom: 7, paddingLeft: 16 }} />
        <Text style={{ marginBottom: 7 }}> 3 Rows </Text>
        {this._renderRows(this.loadingAnimated, 3, 'three-rows')}
        <Line style={{ marginTop: 7, marginBottom: 7, paddingLeft: 16 }} />
        <Text style={{ marginBottom: 7 }}> Image and Rows </Text>
        {this._renderImageAndRows()}
        <Line style={{ marginTop: 7, marginBottom: 7, paddingLeft: 16 }} />
        <Text style={{ marginBottom: 7 }}>Reverse Animated</Text>
        {this._renderReverseAnimated()}

        <Line style={{ marginTop: 7, marginBottom: 7, paddingLeft: 16 }} />
        <Text style={{ marginBottom: 7 }}>Fetching image and text</Text>

        <View style={{ alignItems: 'center' }} >
          <AnterosPlaceHolder
            ref={(ref) => this.bigImageAndSomeRowsAnimated.push(ref)}
            width={200}
            height={200}
            style={{ width: 200, height: 200, borderRadius: 100 }}
            visible={imageIsFetched}
            backgroundColorBehindBorder={'white'}
          >
            <Image
              style={{ width: 200, height: 200, borderRadius: 100 }}
              source={{ uri: 'https://unsplash.it/1000/1000' }}
              onLoad={() => { this.setState({ imageIsFetched: true }); }}

            />
          </AnterosPlaceHolder>
          <View>
            <AnterosPlaceHolder
              ref={(ref) => this.bigImageAndSomeRowsAnimated.push(ref)}
              style={{ marginTop: 7 }}
              width={350}
              height={9}
              visible={isfetched}
            >
              <Text style={{ marginTop: 3 }}>Lorem Ipsum is simply dummy text of the printing</Text>
            </AnterosPlaceHolder>
            <AnterosPlaceHolder
              ref={(ref) => this.bigImageAndSomeRowsAnimated.push(ref)}
              style={{ marginTop: 7 }}
              width={350}
              height={9}
              visible={isfetched}
            >
              <Text style={{ marginTop: 3 }}>Lorem Ipsum is simply dummy text of the printing </Text>
            </AnterosPlaceHolder>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    paddingBottom: 0,
    backgroundColor: 'white',
  },
});