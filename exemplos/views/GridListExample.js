import React, { PureComponent } from 'react';
import {
  Dimensions,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  View,
} from 'react-native';

import {AnterosNavigationPage, AnterosText, AnterosGridList, AnterosImage} from 'anteros-react-native';
const { width, height } = Dimensions.get('window');

const newImage = {
  0: 'https://source.unsplash.com/b1NFkUR-3Fg/200x200',
  1: 'https://source.unsplash.com/BHh-jKrTIoU/200x200',
  2: 'https://source.unsplash.com/DPXytK8Z59Y/200x200',
  3: 'https://source.unsplash.com/nTfGYGPURFA/200x200',
  4: 'https://source.unsplash.com/L-2p8fapOA8/200x200',
  5: 'https://source.unsplash.com/lyvCvA8sKGc/200x200',
  6: 'https://source.unsplash.com/gdBXlLO53N4/200x200',
  7: 'https://source.unsplash.com/wpTWYBll4_w/200x200',
  8: 'https://source.unsplash.com/4olkDk9vD2k/200x200',
  9: 'https://source.unsplash.com/dO8qMqWimo8/200x200',
};

const image = index => ({
  thumbnail: {
    uri: newImage[index]    
  },
});

const itemsAnimationAndSeparator = Array.from(Array(5)).map((_, index) =>
  image(index),
);
const itemsAnimation = Array.from(Array(6)).map((_, index) => image(index));
const itemsSeparator = Array.from(Array(4)).map((_, index) => image(index));

export default class GridListExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Grid list',
    showBackButton: true,
  };

  renderItemAnimationAndSeparator = ({ item, animation }) => (
    <AnterosImage
      style={styles.imageRadius}
      source={item.thumbnail}
      onLoad={() => animation.start()}
    />
  );
  renderItemAnimation = ({ item, animation }) => (
    <AnterosImage
      style={styles.image}
      source={item.thumbnail}
      onLoad={() => animation.start()}
    />
  );

  renderPage() {
    console.log(itemsAnimationAndSeparator);
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* AnimationAndSeparator */}
        <Text>Separator and animation when loading</Text>
        <View style={styles.gridAnimationAndSeparator}>
          <AnterosGridList
            showAnimation
            showSeparator
            data={itemsAnimationAndSeparator}
            numColumns={3}
            renderItem={this.renderItemAnimationAndSeparator}
            separatorBorderWidth={2}
            separatorBorderColor={'#EEEEEE'}
            animationInitialBackgroundColor={'white'}
          />
        </View>

        {/* Animation */}
        <AnterosText>Animation when loading</AnterosText>
        <View style={styles.gridAnimation}>
          <AnterosGridList
            showAnimation
            data={itemsAnimation}
            numColumns={4}
            renderItem={this.renderItemAnimation}
          />
        </View>

        {/* Separator with children */}
        <AnterosText>Separator with children</AnterosText>
        <View style={styles.gridSeparator}>
          <AnterosGridList
            showSeparator
            numColumns={2}
            separatorBorderWidth={15}
            separatorBorderColor={'#DCEDC8'}
          >
            <View style={[styles.child, { backgroundColor: '#689F38' }]}>
              <AnterosText style={styles.text}>1</AnterosText>
            </View>
            <Image style={styles.image} source={itemsSeparator[0].thumbnail} />
            <View style={[styles.child, { backgroundColor: '#558B2F' }]}>
              <AnterosText style={styles.text}>3</AnterosText>
            </View>
            <AnterosImage style={styles.image} source={itemsSeparator[3].thumbnail} />
          </AnterosGridList>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '5%',
  },
  gridAnimationAndSeparator: {
    backgroundColor: '#DCEDC8',
  },
  gridAnimation: {
    backgroundColor: 'tomato',
  },
  gridSeparator: {
    borderWidth: 1,
    borderColor: '#689F38',
  },
  imageRadius: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  child: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: width * 0.2,
    textAlign: 'center',
    color: '#FFEB3B'
  },
});