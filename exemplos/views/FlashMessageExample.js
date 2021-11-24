import React,{Component} from "react";
import { StyleSheet, StatusBar, TouchableOpacity, ScrollView, Text, View } from "react-native";
import {AnterosSeparator, AnterosButton, AnterosNavigationPage, AnterosFlashMessage, showMessage, hideMessage} from 'anteros-react-native';


  
  const stylesButton = StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "stretch",
      backgroundColor: "#999",
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 8,
      overflow: "hidden",
    },
    buttonLabel: {
      fontSize: 16,
      letterSpacing: -0.3,
      lineHeight: 19,
      textAlign: "center",
      color: "#fff",
    },
  });

export class FlashMessageExample extends AnterosNavigationPage {
  static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Flash message',
        showBackButton: true
  };

  static navigationOptions = {
    title: "Flash Message Demo",
  };

  constructor(props){
      super(props);
      this.showSimpleMessage = this.showSimpleMessage.bind(this);
      this.messageWithPosition = this.messageWithPosition.bind(this);
  }


  showSimpleMessage(type = "default", props = {}) {
    const message = {
      message: "Some message title",
      description: "Lorem ipsum dolar sit amet",
      icon: { icon: "auto", position: "left" },
      type,
      ...props,
    };

    showMessage(message);
  }
  messageWithPosition(position = "top") {
    const message = {
      message: "Some message title",
      description: "Lorem ipsum dolar sit amet",
      type: "info",
      position,
    };

    showMessage(message);
  }
  renderPage() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>       
        <ScrollView style={{ flex: 1 }} alwaysBounceVertical={false}>
          <View style={{ alignSelf: "center", width: "100%", padding: 23 }}>
            <View style={styles.group}>
              <AnterosButton buttonStyle={styles.button} title="Simple Message" onPress={() => this.showSimpleMessage()} />
              <AnterosButton
                buttonStyle={[styles.button, { backgroundColor: "#636363" }]}
                title="Single Line"
                onPress={() => showMessage({ message: "Just one single line in this", type: "info" })}
              />
              <AnterosButton
                buttonStyle={[styles.button, { backgroundColor: "#CC00FF" }]}
                labelStyle={{ fontSize: 14 }}
                title="Hide Status (iOS)"
                onPress={() =>
                  showMessage({
                    message: "Message that hide your status bar",
                    description: "Cool, uhm?",
                    type: "success",
                    hideStatusBar: true,
                  })
                }
              />
              <AnterosButton buttonStyle={styles.button} title="Hide Message" onPress={() => hideMessage()} />
            </View>
            <AnterosSeparator />
            <View style={styles.group}>
              <AnterosButton
                buttonStyle={[styles.button, { backgroundColor: AnterosFlashMessage.ColorTheme.success }]}
                title="Success"
                onPress={() => this.showSimpleMessage("success")}
              />
              <AnterosButton
                buttonStyle={[styles.button, styles.buttonInline, { backgroundColor: AnterosFlashMessage.ColorTheme.info }]}
                title="Info"
                onPress={() => this.showSimpleMessage("info")}
              />
              <AnterosButton
                buttonStyle={[styles.button, { backgroundColor: AnterosFlashMessage.ColorTheme.warning }]}
                title="Warning"
                onPress={() => this.showSimpleMessage("warning")}
              />
              <AnterosButton
                buttonStyle={[styles.button, { backgroundColor: AnterosFlashMessage.ColorTheme.danger }]}
                title="Danger"
                onPress={() => this.showSimpleMessage("danger")}
              />
              <AnterosButton
                buttonStyle={[styles.button, styles.buttonInline, { backgroundColor: "#F48FB1" }]}
                title="Custom Color"
                onPress={() => this.showSimpleMessage("default", { backgroundColor: "#F48FB1" })}
              />
              <AnterosButton
                buttonStyle={[styles.button, styles.buttonInline, { backgroundColor: "#B3E5FC" }]}
                titleStyle={{color:"#0277BD"}}
                title="Custom Text Color"
                onPress={() => this.showSimpleMessage("default", { backgroundColor: "#B3E5FC", color: "#0277BD" })}
              />
              <AnterosButton
                buttonStyle={[styles.button, { backgroundColor: AnterosFlashMessage.ColorTheme.success }]}
                title="Success (Floating)"
                onPress={() => this.showSimpleMessage("success", { floating: true })}
              />
            </View>
            <AnterosSeparator />
            <View style={styles.group}>
              <AnterosButton
                buttonStyle={styles.button}
                title="Message Bottom"
                onPress={() => this.messageWithPosition("bottom")}
              />
              <AnterosButton
                buttonStyle={styles.button}
                title="Message Center"
                onPress={() => this.messageWithPosition("center")}
              />
              <AnterosButton
                buttonStyle={styles.button}
                title="Message Top"
                onPress={() => this.messageWithPosition("top")}
              />
              <AnterosButton
                buttonStyle={styles.button}
                title="Custom Message Position"
                onPress={() => this.messageWithPosition({ top: 60, left: 30, right: 30 })}
              />
            </View>
            <AnterosSeparator />
            <View style={styles.group}>
              <AnterosButton
                buttonStyle={styles.button}
                labelStyle={{ fontSize: 14 }}
                title="Message without Anim"
                onPress={() => this.showSimpleMessage("info", { animated: false })}
              />
              <AnterosButton
                buttonStyle={styles.button}
                title="autoHide=false"
                onPress={() =>
                  showMessage({
                    message: "This message will desapear only if you press",
                    type: "warning",
                    autoHide: false,
                  })
                }
              />
            </View>            
          </View>          
        </ScrollView>
        <AnterosFlashMessage position="top" animated={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  group: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    alignSelf: "auto",
    marginBottom: 9,
    marginHorizontal: 5,
  },
});



