
import PropTypes from 'prop-types';

import { View, TextInput,
  StyleSheet,
  ScrollView,
  Text,
  SliderIOS,
  TouchableWithoutFeedback,
  DeviceEventEmitter
} from 'react-native';
import StyleSheetTypes from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import ViewPropTypes from 'react-native/Libraries/Components/View/ViewPropTypes'
import React,{Component} from "react";

// export {AnterosCountDownField} from './fields/AnterosCountDownField';
// export {AnterosPickerField} from './fields/AnterosPickerField';
// export {AnterosInputField} from './fields/AnterosInputField';
// export {AnterosSwitchField} from './fields/AnterosSwitchField';
// export {AnterosSeparator} from './fields/AnterosSeparator';
// export {AnterosLinkField} from './fields/AnterosLinkField';
// export {AnterosDatePickerField} from './fields/AnterosDatePickerField';
// export {AnterosTimePickerField} from './fields/AnterosTimePickerField';

export class AnterosForm extends Component{
  constructor(props){
    super();

    this.values = {};

  }

  handleFieldFocused(event, inputHandle){
    this.props.onFocus && this.props.onFocus(event, inputHandle);
  }
  handleFieldChange(field_ref, value){
    this.values[field_ref] = value;
    this.props.onChange && this.props.onChange(this.values);
  }
  getValues(){
    return this.values;
  }

  underscoreToSpaced(str){
    var words = str.split('_');
    var res=[];
    words.map(function(word, i){
      res.push(word.charAt(0).toUpperCase() + word.slice(1));
    })

    return res.join(' ');
  }

  render(){
    let wrappedChildren = [];

    React.Children.map(this.props.children, (child, i)=> {
      if (!child) {
        return;
      }
        wrappedChildren.push(React.cloneElement(child, {
          key: child.ref || child.type+i,
          fieldRef : child.ref,
          ref: child.ref,
          onFocus:this.handleFieldFocused.bind(this),
          onChange:this.handleFieldChange.bind(this, child.ref)
        }
      ));
    }, this);

    return (
      <View style={this.props.style}>
          {wrappedChildren}
      </View>
    );
  }
}



export class AnterosKeyboardAwareScrollView extends Component {
    constructor (props) {
      super(props)
      this.state = {
        keyboardSpace: 0,
      }
      this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this)
      this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this)
    }
  
    // Keyboard actions
    // TODO: automatically handle TabBar height instead of using props
    updateKeyboardSpace (frames) {
      // let coordinatesHeight = (frames.endCoordinates)? frames.endCoordinates.height : frames.end.height;
      let coordinatesHeight = frames.endCoordinates.height;
      const keyboardSpace = (this.props.viewIsInsideTabBar) ? coordinatesHeight - 49 : coordinatesHeight
      this.setState({
        keyboardSpace: keyboardSpace,
      })
      return {
  
      }
    }
  
    resetKeyboardSpace () {
      this.setState({
        keyboardSpace: 0,
      })
    }
  
    componentDidMount () {
      // Keyboard events
      DeviceEventEmitter.addListener('keyboardWillShow', this.updateKeyboardSpace)
      DeviceEventEmitter.addListener('keyboardWillHide', this.resetKeyboardSpace)
    }
  
    componentWillUnmount () {
      // TODO: figure out if removeAllListeners is the right thing to do
      DeviceEventEmitter.removeAllListeners('keyboardWillShow')
      DeviceEventEmitter.removeAllListeners('keyboardWillHide')
    }
  
    /**
     * @param extraHeight: takes an extra height in consideration.
     */
    scrollToFocusedInput (event, reactNode, extraHeight = 69) {
      const scrollView = this.refs.keyboardScrollView.getScrollResponder();
      setTimeout(() => {
        scrollView.scrollResponderScrollNativeHandleToKeyboard(
          reactNode, extraHeight, true
        )
      }, 220)
    }
  
    render () {
      return (
        <ScrollView
          keyboardShouldPersistTaps={false}
          ref='keyboardScrollView'
          keyboardDismissMode='interactive'
          contentInset={{bottom: this.state.keyboardSpace}}
          showsVerticalScrollIndicator={true}
          style={this.props.style}>
          {this.props.children}
        </ScrollView>
      )
    }
  }
  
  AnterosKeyboardAwareScrollView.propTypes = {
    //style: StyleSheetTypes(ViewPropTypes),
    children: PropTypes.node,
    viewIsInsideTabBar: PropTypes.bool,
  }

 