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
import {AnterosButton, AnterosSwiper, AnterosNavigationPage,  
    AnterosLabel, AnterosListRow, AnterosText, AnterosModal, AnterosImage} from 'anteros-react-native';
import LinearGradient from 'react-native-linear-gradient';
import AlertExample from './AlertExample';
import DialogExample from './DialogExample';
import DropdownAlertExample from './DropdownAlertExample';
import FlashMessageExample from './FlashMessageExample';
import ModalWalkThroughExample from './ModalWalkThroughExample';

export class ModalExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Modal',
        showBackButton: true
    };
    constructor(props) {
        super(props);
        this.modal1 = this
            .modal1
            .bind(this);          
        this.modal2 = this
            .modal2
            .bind(this);     
        this.modal3 = this
            .modal3
            .bind(this);     
        this.modal4 = this
            .modal4
            .bind(this);     
        this.modal5 = this
            .modal5
            .bind(this);      
        this.modal6 = this
            .modal6
            .bind(this);     
        this.modal7 = this
            .modal7
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

    modal1() {
        this
            .navigator
            .push({view: <ModalExample1/>})
    }

    modal2() {
        this
            .navigator
            .push({view: <AlertExample/>})
    }

    modal3() {
        // this
        //     .navigator
        //     .push({view: <DialogExample/>})
    }
    modal4() {
      this
          .navigator
          .push({view: <View/>})
    }
    modal5() {
      this
          .navigator
          .push({view: <DropdownAlertExample/>})
    }
    modal6() {
      this
          .navigator
          .push({view: <FlashMessageExample/>})
    }
    modal7() {
      this
          .navigator
          .push({view: <ModalWalkThroughExample/>})
    }


    renderPage() {
        return (
            <ScrollView style={{
                flex: 1
            }}>
                <View style={{
                    height: 20
                }}/>
                <AnterosListRow title='Modal' onPress={this.modal1} topSeparator='full'/>
                <AnterosListRow title='Alert' onPress={this.modal2} topSeparator='full'/>
                <AnterosListRow title='Dropdown alert' onPress={this.modal5} topSeparator='full'/>
                <AnterosListRow title='Dialog' onPress={this.modal3} topSeparator='full'/>
                <AnterosListRow title='Flash message' onPress={this.modal6} topSeparator='full'/>
                <AnterosListRow title='Modal through' onPress={this.modal7} topSeparator='full'/>
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



class ModalExample1 extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Modal',
      showBackButton: true
    };

  state = {
    visibleModal: null
  };

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={stylesModal.button}>
        <AnterosText>{text}</AnterosText>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={stylesModal.modalContent}>
      <AnterosText>Hello!</AnterosText>
      {this._renderButton("Close", () => this.setState({ visibleModal: null }))}
    </View>
  );

  _handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y
    });
  };

  _handleScrollTo = p => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };

  renderPage() {
    return (
      <View style={stylesModal.container}>
        {this._renderButton("Default modal", () =>
          this.setState({ visibleModal: 1 })
        )}
        {this._renderButton("Sliding from the sides", () =>
          this.setState({ visibleModal: 2 })
        )}
        {this._renderButton("A slower modal", () =>
          this.setState({ visibleModal: 3 })
        )}
        {this._renderButton("Fancy modal!", () =>
          this.setState({ visibleModal: 4 })
        )}
        {this._renderButton("Bottom half modal", () =>
          this.setState({ visibleModal: 5 })
        )}
        {this._renderButton("Modal that can be closed on backdrop press", () =>
          this.setState({ visibleModal: 6 })
        )}
        {this._renderButton("Swipeable modal", () =>
          this.setState({ visibleModal: 7 })
        )}
        {this._renderButton("Scrollable modal", () =>
          this.setState({ visibleModal: 8 })
        )}
        <AnterosModal isVisible={this.state.visibleModal === 1}>
          {this._renderModalContent()}
        </AnterosModal>
        <AnterosModal
          isVisible={this.state.visibleModal === 2}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
        >
          {this._renderModalContent()}
        </AnterosModal>
        <AnterosModal
          isVisible={this.state.visibleModal === 3}
          animationInTiming={2000}
          animationOutTiming={2000}
          backdropTransitionInTiming={2000}
          backdropTransitionOutTiming={2000}
        >
          {this._renderModalContent()}
        </AnterosModal>
        <AnterosModal
          isVisible={this.state.visibleModal === 4}
          backdropColor={"red"}
          backdropOpacity={1}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}
        >
          {this._renderModalContent()}
        </AnterosModal>
        <AnterosModal
          isVisible={this.state.visibleModal === 5}
          style={styles.bottomModal}
        >
          {this._renderModalContent()}
        </AnterosModal>
        <AnterosModal
          isVisible={this.state.visibleModal === 6}
          onBackdropPress={() => this.setState({ visibleModal: null })}
        >
          {this._renderModalContent()}
        </AnterosModal>
        <AnterosModal
          isVisible={this.state.visibleModal === 7}
          onSwipe={() => this.setState({ visibleModal: null })}
          swipeDirection="left"
        >
          {this._renderModalContent()}
        </AnterosModal>
        <AnterosModal
          isVisible={this.state.visibleModal === 8}
          onSwipe={() => this.setState({ visibleModal: null })}
          swipeDirection="down"
          scrollTo={this._handleScrollTo}
          scrollOffset={this.state.scrollOffset}
          scrollOffsetMax={400 - 300} // content height - ScrollView height
          style={styles.bottomModal}
        >
          <View style={stylesModal.scrollableModal}>
            <ScrollView
              ref={ref => (this.scrollViewRef = ref)}
              onScroll={this._handleOnScroll}
              scrollEventThrottle={16}
            >
              <View style={stylesModal.scrollableModalContent1}>
                <AnterosText>Scroll me up</AnterosText>
              </View>
              <View style={stylesModal.scrollableModalContent1}>
                <AnterosText>Scroll me up</AnterosText>
              </View>
            </ScrollView>
          </View>
        </AnterosModal>
      </View>
    );
  }
}


const stylesModal = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
      backgroundColor: "lightblue",
      padding: 12,
      margin: 16,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
      borderColor: "rgba(0, 0, 0, 0.1)"
    },
    modalContent: {
      backgroundColor: "white",
      padding: 22,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
      borderColor: "rgba(0, 0, 0, 0.1)"
    },
    bottomModal: {
      justifyContent: "flex-end",
      margin: 0
    },
    scrollableModal: {
      height: 300
    },
    scrollableModalContent1: {
      height: 200,
      backgroundColor: "orange",
      alignItems: "center",
      justifyContent: "center"
    },
    scrollableModalContent2: {
      height: 200,
      backgroundColor: "lightgreen",
      alignItems: "center",
      justifyContent: "center"
    }
  });