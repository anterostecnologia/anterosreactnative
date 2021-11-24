import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  FlatList,
  View,
  Dimensions,
  StyleSheet,
  BackHandler,
  BackAndroid,
  TouchableWithoutFeedback,
} from 'react-native';

export class AnterosModalWalkThrough extends Component {
  static get propTypes() {
    return {
      height: PropTypes.number,
      width: PropTypes.number,
      onStepChange: PropTypes.func,
      onFinish: PropTypes.func,
      children: PropTypes.children,
      visible: PropTypes.bool.isRequired
    };
  }

  static get defaultProps() {
    return {
      height: null,
      width: null,
      onStepChange: null,
      onFinish: null,
      children: null,
      visible: false
    };
  }

  /**
   * Get the actual window height in pixels
   * @returns {Number} value in px
   */
  static get screenHeight() {
    return Dimensions.get('window').height;
  }

  /**
   * Get the actual window width in pixels
   * @returns {Number} value in px
   */
  static get screenWidth() {
    return Dimensions.get('window').width;
  }


  constructor(props) {
    super(props);

    this.goToStep = this.goToStep.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleHardwareBackPress = this.handleHardwareBackPress.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.renderChild = this.renderChild.bind(this);

    this.state = {
      visible: props.visible,
    };
  }


  componentDidMount() {
    if (
      BackHandler &&
      typeof BackHandler.addEventListener === 'function'
    ) {
      BackHandler.addEventListener('hardwareBackPress', this.handleHardwareBackPress);
    } else {
      BackAndroid.addEventListener('hardwareBackPress', this.handleHardwareBackPress);
    }
  }

  componentWillUnmount() {
    if (
      BackHandler &&
      typeof BackHandler.addEventListener === 'function'
    ) {
      BackHandler.removeEventListener('hardwareBackPress', this.handleHardwareBackPress);
    } else {
      BackAndroid.removeEventListener('hardwareBackPress', this.handleHardwareBackPress);
    }
  }

  /**
   * Height of the scene
   * @return {Number|String} the height value
   */
  get height() {
    return this.props.height || '40%';
  }

  /**
   * Width of the scene
   * @return {Number|String} the width value
   */
  get width() {
    return this.props.width || (AnterosModalWalkThrough.screenWidth * 0.8);
  }

  /**
   * Go to a specific step in the walkthrough
   * @param {Number} [index=0] the index to scroll to
   * @returns {void}
   */
  goToStep(index = 0) {
    if (index > this.props.children.length - 1) {
      // In case of going beyond last step, close the modal
      this.setState({ visible: false });

      // Trigger onFinish in case defined
      if (typeof this.props.onFinish === 'function') {
        this.props.onFinish();
      }
    } else {
      // Scroll the walkthrough to a specific step
      this.flatList.scrollToOffset({
        animated: true,
        offset: index * AnterosModalWalkThrough.screenWidth,
      });
    }
  }

  /**
   * Handle user scroll event
   * @param {Object} eventData
   * @returns {void}
   */
  handleScroll(eventData) {
    // Only when onStepChange was defined
    if (typeof this.props.onStepChange === 'function') {
      const { x } = eventData.nativeEvent.contentOffset;
      const step = Math.round(x / AnterosModalWalkThrough.screenWidth);

      // Trigger an onStepChange event with the current step
      this.props.onStepChange(step);
    }
  }

  /**
   * Handle a press on the physical back button (Android, tvOS)
   * @returns {void}
   */
  handleHardwareBackPress() {
    this.hide();
  }

  /**
   * Make the modal visible
   * @returns {void}
   */
  show() {
    this.setState({ visible: true });
  }

  /**
   * Make the modal invisible
   * @returns {void}
   */
  hide() {
    this.setState({ visible: false });
  }

  /**
   * Render child of the walkThrough
   * @param {Object} param0 Options param
   * @param {Object} param0.item Item component to render
   * @param {Nummber} param0.index Index of component
   * @returns {Component} component
   */
  renderChild({ item, index }) {
    return (
      <View
        style={[
          styles.sceneWrapper,
          { height: AnterosModalWalkThrough.screenHeight, width: AnterosModalWalkThrough.screenWidth },
        ]}
      >
        <View
          key={index}
          style={[styles.scene, { height: this.height, width: this.width }]}
        >
          {item}
        </View>
      </View>
    );
  }

  render() {
    return (
      <Modal
        transparent
        animationType="fade"
        visible={this.state.visible}
      >
        <TouchableWithoutFeedback
          onPress={this.hide}
        >
          <View
            style={styles.overlay}
          >
            <FlatList
              data={this.props.children}
              renderItem={this.renderChild}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              ref={(flatList) => { this.flatList = flatList; }}
              onScroll={this.handleScroll}
              bounces={false}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    flex: 1,
  },
  sceneWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scene: {
    backgroundColor: '#ffffff',
    borderRadius: 3,
  },
});
