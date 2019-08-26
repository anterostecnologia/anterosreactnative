import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ViewPropTypes,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import {AnterosText, AnterosNavigationPage,AnterosGiftedChat, AnterosActionsChat, 
  AnterosCameraRollPicker, AnterosBubbleChat, AnterosSystemMessage} from 'anteros-react-native';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';


const messages = [
    {
      _id: Math.round(Math.random() * 1000000),
      text: 'Yes, and I use Gifted Chat!',
      createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
      user: {
        _id: 1,
        name: 'Developer',
      },
      sent: true,
      received: true,
      // location: {
      //   latitude: 48.864601,
      //   longitude: 2.398704
      // },
    },
    {
      _id: Math.round(Math.random() * 1000000),
      text: 'Are you building a chat app?',
      createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
      user: {
        _id: 2,
        name: 'React Native',
      },
    },
    {
      _id: Math.round(Math.random() * 1000000),
      text: "You are officially rocking GiftedChat.",
      createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
      system: true,
    },
  ];

 const old_messages = [
    {
      _id: Math.round(Math.random() * 1000000),
      text:
        "It uses the same design as React, letting you compose a rich mobile UI from declarative components https://facebook.github.io/react-native/",
      createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
      user: {
        _id: 1,
        name: "Developer"
      }
    },
    {
      _id: Math.round(Math.random() * 1000000),
      text: "React Native lets you build mobile apps using only JavaScript",
      createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
      user: {
        _id: 1,
        name: "Developer"
      }
    },
    {
      _id: Math.round(Math.random() * 1000000),
      text: "This is a system message.",
      createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
      system: true
    }
  ];

export default class ChatExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Chat',
        showBackButton: true
    };

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderSystemMessage = this.renderSystemMessage.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;
  }

  componentWillMount() {
    this._isMounted = true;
    this.setState(() => {
      return {
        messages: messages,
      };
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: AnterosGiftedChat.prepend(previousState.messages, old_messages),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: AnterosGiftedChat.append(previousState.messages, messages),
      };
    });

    // for demo purpose
    this.answerDemo(messages);
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: 'React Native is typing'
          };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive('Nice picture!');
          } else if (messages[0].location) {
            this.onReceive('My favorite place');
          } else {
            if (!this._isAlright) {
              this._isAlright = true;
              this.onReceive('Alright');
            }
          }
        }
      }

      this.setState((previousState) => {
        return {
          typingText: null,
        };
      });
    }, 1000);
  }

  onReceive(text) {
    this.setState((previousState) => {
      return {
        messages: AnterosGiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            // avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        }),
      };
    });
  }

  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}
        />
      );
    }
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <AnterosActionsChat
        {...props}
        options={options}
      />
    );
  }

  renderBubble(props) {
    return (
      <AnterosBubbleChat
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  renderSystemMessage(props) {
    return (
      <AnterosSystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    );
  }

  renderCustomView(props) {
    return (
      <View
        {...props}
      />
    );
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <AnterosText style={styles.footerText}>
            {this.state.typingText}
          </AnterosText>
        </View>
      );
    }
    return null;
  }

  renderPage() {
    return (
      <AnterosGiftedChat
        style={{backgroundColor: '#E3F2FD'}}
        messages={this.state.messages}
        onSend={this.onSend}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}

        user={{
          _id: 1, // sent messages should have same user._id
        }}

        renderActions={this.renderCustomActions}
        renderBubble={this.renderBubble}
        renderSystemMessage={this.renderSystemMessage}
        //renderCustomView={this.renderCustomView}
        renderFooter={this.renderFooter}
      />
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});




 class CustomActions extends React.Component {
    constructor(props) {
      super(props);
      this._images = [];
      this.state = {
        modalVisible: false,
      };
      this.onActionsPress = this.onActionsPress.bind(this);
      this.selectImages = this.selectImages.bind(this);
    }
  
    setImages(images) {
      this._images = images;
    }
  
    getImages() {
      return this._images;
    }
  
    setModalVisible(visible = false) {
      this.setState({modalVisible: visible});
    }
  
    onActionsPress() {
      const options = ['Choose From Library', 'Send Location', 'Cancel'];
      const cancelButtonIndex = options.length - 1;
      this.context.actionSheet().showActionSheetWithOptions({
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            this.setModalVisible(true);
            break;
          case 1:
            navigator.geolocation.getCurrentPosition(
              (position) => {
                this.props.onSend({
                  location: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  },
                });
              },
              (error) => alert(error.message),
              {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
            );
            break;
          default:
        }
      });
    }
  
    selectImages(images) {
      this.setImages(images);
    }
  
    renderNavBar() {
      return (
        <NavBar style={{
          statusBar: {
            backgroundColor: '#FFF',
          },
          navBar: {
            backgroundColor: '#FFF',
          },
        }}>
          <NavButton onPress={() => {
            this.setModalVisible(false);
          }}>
            <NavButtonText style={{
              color: '#000',
            }}>
              {'Cancel'}
            </NavButtonText>
          </NavButton>
          <NavTitle style={{
            color: '#000',
          }}>
            {'Camera Roll'}
          </NavTitle>
          <NavButton onPress={() => {
            this.setModalVisible(false);
  
            const images = this.getImages().map((image) => {
              return {
                image: image.uri,
              };
            });
            this.props.onSend(images);
            this.setImages([]);
          }}>
            <NavButtonText style={{
              color: '#000',
            }}>
              {'Send'}
            </NavButtonText>
          </NavButton>
        </NavBar>
      );
    }
  
    renderIcon() {
      if (this.props.icon) {
        return this.props.icon();
      }
      return (
        <View
          style={[stylesActions.wrapper, this.props.wrapperStyle]}
        >
          <Text
            style={[stylesActions.iconText, this.props.iconTextStyle]}
          >
            +
          </Text>
        </View>
      );
    }
  
    render() {
      return (
        <TouchableOpacity
          style={[stylesActions.container, this.props.containerStyle]}
          onPress={this.onActionsPress}
        >
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(false);
            }}
          >
            {this.renderNavBar()}
            <AnterosCameraRollPicker
              maximum={10}
              imagesPerRow={4}
              callback={this.selectImages}
              selected={[]}
            />
          </Modal>
          {this.renderIcon()}
        </TouchableOpacity>
      );
    }
  }
  
  const stylesActions = StyleSheet.create({
    container: {
      width: 26,
      height: 26,
      marginLeft: 10,
      marginBottom: 10,
    },
    wrapper: {
      borderRadius: 13,
      borderColor: '#b2b2b2',
      borderWidth: 2,
      flex: 1,
    },
    iconText: {
      color: '#b2b2b2',
      fontWeight: 'bold',
      fontSize: 16,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
  });
  
  CustomActions.contextTypes = {
    actionSheet: PropTypes.func,
  };
  
  CustomActions.defaultProps = {
    onSend: () => {},
    options: {},
    icon: null,
    containerStyle: {},
    wrapperStyle: {},
    iconTextStyle: {},
  };
  
  CustomActions.propTypes = {
    onSend: PropTypes.func,
    options: PropTypes.object,
    icon: PropTypes.func,
    containerStyle: ViewPropTypes.style,
    wrapperStyle: ViewPropTypes.style,
    iconTextStyle: Text.propTypes.style,
  };
