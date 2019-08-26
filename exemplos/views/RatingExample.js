import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import {AnterosText, AnterosRating, AnterosAirbnbRating, AnterosNavigationPage, AnterosButton} from 'anteros-react-native';
const WATER_IMAGE = require('../images/water.png');

export default class StarRatingExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Rating',
    showBackButton: true
  };

  constructor(props) {
    super(props);
    this.state = {
      generalStarCount: 3.5,
      customStarCount: 2.5,
    };
  }

  onGeneralStarRatingPress(rating) {
    this.setState({
      generalStarCount: rating,
    });
  }

  onCustomStarRatingPress(rating) {
    this.setState({
      customStarCount: rating,
    });
  }

  renderPage() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.viewContainer}>
          <Text style={[styles.titleText, { marginTop: 30, color: '#e74c3c', fontSize: 22 }]}>Airbnb-style Tap Ratings</Text>          
          <AnterosAirbnbRating />
          <AnterosAirbnbRating
            count={11}
            reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
            defaultRating={11}
            size={20}
            onFinishRating={this.ratingCompleted}
          />
          <AnterosText style={[styles.titleText, { marginTop: 30, color: '#9b59b6', fontSize: 22 }]}>Whatsapp-style Swipe Ratings</AnterosText>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
            <AnterosRating
              showRating
              imageSize={40}
              onFinishRating={this.ratingCompleted}
              style={{ paddingVertical: 10 }}
            />
            <AnterosRating
              showRating
              type="star"
              fractions={1}
              startingValue={3.6}
              readonly
              imageSize={40}
              onFinishRating={this.ratingCompleted}
              style={{ paddingVertical: 10 }}
            />
            <AnterosRating
              type="custom"
              ratingImage={WATER_IMAGE}
              ratingColor="#3498db"
              ratingBackgroundColor="#ceee"
              ratingCount={10}
              imageSize={30}
              onFinishRating={this.ratingCompleted}
              showRating
              style={{ paddingVertical: 10 }}
            />
            <AnterosRating
              type="heart"
              ratingCount={3}
              fractions={2}
              startingValue={1.57}
              imageSize={40}
              onFinishRating={this.ratingCompleted}
              showRating
              style={{ paddingVertical: 10 }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

StarRatingExample.navigationOptions = {
  title: 'Ratings Component',
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headingContainer: {
    paddingTop: 50,
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    fontFamily: Platform.OS === 'ios' ? 'Menlo-Bold' : null,
    color: '#27ae60',
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : null,
    color: '#34495e',
  },
  viewContainer: {
    flex: 1
  },
});