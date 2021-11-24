import _ from 'lodash';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import {AnterosStar} from './AnterosStar';
import {AnterosText} from '../Text/AnterosText';

export class AnterosAirbnbRating extends Component {
  static defaultProps = {
    defaultRating: 5,
    reviews: ["Terrible", "Bad", "Okay", "Good", "Great"],
    count: 5,
    onFinishRating: () => {},
    showRating: true
  };

  constructor() {
    super()

    this.state = {
      position: 5
    }
  }

  componentDidMount() {
    const { defaultRating } = this.props

    this.setState({ position: defaultRating })
  }

  renderStars(rating_array) {
    return _.map(rating_array, (star, index) => {
      return star
    })
  }

  starSelectedInPosition(position) {
    const { onFinishRating } = this.props

    onFinishRating(position);

    this.setState({ position: position })
  }

  render() {
    const { position } = this.state
    const { count, reviews, showRating } = this.props
    const rating_array = []

    _.times(count, index => {
      rating_array.push(
        <AnterosStar
          key={index}
          position={index + 1}
          starSelectedInPosition={this.starSelectedInPosition.bind(this)}
          fill={position >= index + 1}
          {...this.props}
        />
      )
    })

    return (
      <View style={styles.ratingContainer}>
        { showRating &&
          <AnterosText style={styles.reviewText}>
            {reviews[position - 1]}
          </AnterosText>
        }
        <View style={styles.starContainer}>
          {this.renderStars(rating_array)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ratingContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewText: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
    color: 'rgba(230, 196, 46, 1)'
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});