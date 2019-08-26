import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';

import {AnterosNavigationPage, AnterosGrading} from 'anteros-react-native';

export default class GradingExample extends AnterosNavigationPage {
  static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Grading',
      showBackButton: true
  };

  constructor(props) {
    super(props);
    this.state = {
      board: {
        num: 124,
        score: 4.5
      },
      arcs: {
        score: 8.4
      },
      stars: {
        score: 6.0
      },
      smiles: {
        isLike: true
      }
    };
    this.changeBoardScore = this.changeBoardScore.bind(this);
    this.changeStarScore = this.changeStarScore.bind(this);
    this.changeArcScore = this.changeArcScore.bind(this);
    this.changeSmileScore = this.changeSmileScore.bind(this);
  }
  changeBoardScore(newScore) {
    const {num, score} = this.state.board;
    this.setState({
      board: {
        num: num + 1,
        score: (score * num + newScore) / (num + 1)
      }
    });
  }
  changeStarScore(score) {
    this.setState({
      stars: {score: score}
    });
  }
  changeArcScore(score) {
    console.log(score);
    this.setState({
      arcs: {score: score}
    });
  }
  changeSmileScore(score) {
    this.setState({
      smiles: {isLike: score}
    });
  }
  renderPage() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.boardGrading}>
          <AnterosGrading
            score={this.state.board.score}
            num={this.state.board.num}
            defaultColor="#9ce0d6"
            onGrading={this.changeBoardScore}
            />
          <AnterosGrading score={4.0} num={72346} fontColor="#552da6" readOnly={true}/>
          <AnterosGrading score={2.45} num={712338} activeColor="#2bb8aa" enable={false}/>
          <AnterosGrading
            score={4.9}
            num={234234523478}
            readOnly={true}
            fontColor="#3c77b5"
            />
        </View>
        <View style={styles.starsGrading}>
          <AnterosGrading
            mode="stars"
            scale={2.4}
            score={this.state.stars.score}
            scoreBase={10}
            activeColor="#eb5461"
            onGrading={this.changeStarScore}/>
          <AnterosGrading
            mode="stars"
            scale={2}
            scoreBase={8}
            defaultColor="#dad9b8"
            score={5}
            enable={false}/>
          <AnterosGrading mode="stars" score={4.45} readOnly={true}/>
        </View>
        <View style={styles.arcsGrading}>
          <AnterosGrading mode="arcs" score={this.state.arcs.score} scoreBase={10} name="Design" onGrading={this.changeArcScore}/>
          <AnterosGrading
            mode="arcs"
            score={4.7}
            scoreBase={10}
            activeColor="#2bb8aa"
            scale={1.2}
            name="Creativity"
            readOnly={true}
            />
          <AnterosGrading
            mode="arcs"
            score={45}
            scale={1.6}
            isPercentage={true}
            name="Usability"
            enable={false}
            />
        </View>
        <View style={styles.simlesGrading}>
          <AnterosGrading
            mode="smiles"
            isLike={this.state.smiles.isLike}
            onGrading={this.changeSmileScore}/>
          <AnterosGrading mode="smiles" scale={1.2} activeColor="#d23f2b" isLike={false} readOnly={true}/>
          <AnterosGrading mode="smiles" scale={1.4} activeColor="#f2558d" isLike={true} enable={false}/>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    marginTop: 30,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#333333'
  },
  boardGrading: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  starsGrading: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'space-around'
  },
  arcsGrading: {
    marginTop: 20,
    justifyContent: 'space-around'
  },
  simlesGrading: {
    marginTop: 20,
    alignItems: 'center'
  }
});