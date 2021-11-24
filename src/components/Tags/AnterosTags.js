import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";


export const AnterosTag = ({ label, onPress, tagContainerStyle, tagTextStyle }) => (
  <TouchableOpacity style={[styles.tag, tagContainerStyle]} onPress={onPress}>
    <Text style={[styles.tagLabel, tagTextStyle]}>{label}</Text>
  </TouchableOpacity>
);
AnterosTag.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func
};

export class AnterosTags extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {tags: props.initialTags,
                  text: props.initialText};
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if (
      nextProps.initialTags === this.state.initialTags &&
      nextProps.initialText === this.state.initialText
    ) {
      return null;
    }
    this.setState({
      tags: nextProps.initialTags,
      text: nextProps.initialText
    });
  }


  onChangeText = text => {
    if (text.length === 0) {
      // `onKeyPress` isn't currently supported on Android; I've placed an extra
      //  space character at the start of `TextInput` which is used to determine if the
      //  user is erasing.
      this.setState(
        {
          tags: this.state.tags.slice(0, -1),
          text: this.state.tags.slice(-1)[0] || " "
        },
        () =>
          this.props.onChangeTags && this.props.onChangeTags(this.state.tags)
      );
    } else if (
      text.length > 1 &&
      (text.slice(-1) === " " || text.slice(-1) === ",")
    ) {
      this.setState(
        {
          tags: [...this.state.tags, text.slice(0, -1).trim()],
          text: " "
        },
        () =>
          this.props.onChangeTags && this.props.onChangeTags(this.state.tags)
      );
    } else {
      this.setState({ text });
    }
  };

  render() {
    return (
      <View style={[styles.container]}>
        {this.state.tags.map((tag, i) => (
          <AnterosTag
            key={i}
            label={tag}
            onPress={e => this.props.onTagPress(i, tag, e)}
            tagContainerStyle={this.props.tagContainerStyle}
            tagTextStyle={this.props.tagTextStyle}
          />
        ))}
        {!this.props.readonly && (
          <View style={[styles.textInputContainer]}>
            <TextInput
              value={this.state.text}
              style={[styles.textInput, this.props.inputStyle]}
              onChangeText={this.onChangeText}
              underlineColorAndroid="transparent"
            />
          </View>
        )}
      </View>
    );
  }
}
AnterosTags.defaultProps = {
  initialTags: [],
  initialText: " ",
  readonly: false
};
AnterosTags.propTypes = {
  initialText: PropTypes.string,
  initialTags: PropTypes.arrayOf(PropTypes.string),
  onChangeTags: PropTypes.func,
  onTagPress: PropTypes.func,
  inputStyle: PropTypes.object,
  tagContainerStyle: PropTypes.object,
  tagTextStyle: PropTypes.object,
  readonly: PropTypes.bool
};


const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center"
    },
  
    textInputContainer: {
      flex: 1,
      width: 100,
      height: 32,
      margin: 4,
      borderRadius: 16,
      backgroundColor: "#ccc"
    },
  
    textInput: {
      margin: 0,
      padding: 0,
      paddingLeft: 12,
      paddingRight: 12,
      flex: 1,
      height: 32,
      fontSize: 13,
      color: "rgba(0, 0, 0, 0.87)"
    },
  
    tag: {
      justifyContent: "center",
      backgroundColor: "#e0e0e0",
      borderRadius: 16,
      paddingLeft: 12,
      paddingRight: 12,
      height: 32,
      margin: 4
    },
    tagLabel: {
      fontSize: 13,
      color: "rgba(0, 0, 0, 0.87)"
    }
  });

