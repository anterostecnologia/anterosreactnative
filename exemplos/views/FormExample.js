// import React, { Component } from "react";
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableHighlight,
//   Modal
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import { AnterosNavigationPage, AnterosText } from "anteros-react-native";

// import {
//   AnterosForm,
//   AnterosSeparator,
//   AnterosInputField,
//   AnterosLinkField,
//   AnterosSwitchField,
//   AnterosPickerField,
//   AnterosDatePickerField,
//   AnterosTimePickerField,
//   AnterosCountDownField
// } from "./AnterosForm";

// class CustomModal extends Component {
//   handleClose() {
//     this.props.onHidePicker && this.props.onHidePicker();
//   }
//   render() {
//     return (
//       <Modal transparent={true}>
//         <View
//           style={{
//             padding: 20,
//             flex: 1,
//             justifyContent: "center",
//             backgroundColor: "rgba(43, 48, 62, 0.57)"
//           }}
//         >
//           <View
//             style={{
//               backgroundColor: "white",
//               borderRadius: 8,
//               flexDirection: "column"
//             }}
//           >
//             <Text
//               style={{
//                 textAlign: "center",
//                 marginTop: 10,
//                 paddingTop: 10,
//                 paddingBottom: 10,
//                 fontSize: 18
//               }}
//             >
//               A Custom Wrapper for your picker
//             </Text>
//             {this.props.children}

//             <TouchableHighlight
//               onPress={this.handleClose.bind(this)}
//               underlayColor="#78ac05"
//             >
//               <View
//                 style={{
//                   flex: 1,
//                   alignItems: "center"
//                 }}
//               >
//                 <Text style={{ fontSize: 19, padding: 15 }}>Close</Text>
//               </View>
//             </TouchableHighlight>
//           </View>
//         </View>
//       </Modal>
//     );
//   }
// }

// class WrappedIcon extends Component {
//   render() {
//     return <Icon {...this.props} />;
//   }
// }

// export class FormExample extends AnterosNavigationPage {
//   static defaultProps = {
//     ...AnterosNavigationPage.defaultProps,
//     title: "Form",
//     showBackButton: true
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       formData: {}
//     };
//   }
//   handleFormChange(formData) {
//     /*
//       formData will contain all the values of the form,
//       in this example.
//       formData = {
//       first_name:"",
//       last_name:"",
//       gender: '',
//       birthday: Date,
//       has_accepted_conditions: bool
//       }
//       */

//     this.setState({ formData: formData });
//     this.props.onFormChange && this.props.onFormChange(formData);
//   }
//   handleFormFocus(e, component) {
//     //console.log(e, component);
//   }
//   openTermsAndConditionsURL() {}
//   resetForm() {
//     this.refs.registrationForm.refs.first_name.setValue("");
//     this.refs.registrationForm.refs.last_name.setValue("");
//     this.refs.registrationForm.refs.other_input.setValue("");
//     this.refs.registrationForm.refs.meeting.setDate(new Date());
//     this.refs.registrationForm.refs.has_accepted_conditions.setValue(false);
//   }
//   renderPage() {
//     return (
//       <ScrollView keyboardShouldPersistTaps="always" style={{ height: 200 }}>
//         <AnterosForm
//           ref="registrationForm"
//           onFocus={this.handleFormFocus.bind(this)}
//           onChange={this.handleFormChange.bind(this)}
//           label="Personal Information"
//         >
//           <AnterosSeparator />
//           <AnterosInputField
//             ref="first_name"
//             label="First Name"
//             placeholder="First Name"
//             helpText={(self => {
//               if (Object.keys(self.refs).length !== 0) {
//                 if (!self.refs.registrationForm.refs.first_name.valid) {
//                   return self.refs.registrationForm.refs.first_name.validationErrors.join(
//                     "\n"
//                   );
//                 }
//               }
//               // if(!!(self.refs && self.refs.first_name.valid)){
//               // }
//             })(this)}
//             validationFunction={[
//               value => {
//                 /*
//               you can have multiple validators in a single function or an array of functions
//                */

//                 if (value == "") return "Required";
//                 //Initial state is null/undefined
//                 if (!value) return true;
//                 var matches = value.match(/\d+/g);
//                 if (matches != null) {
//                   return "First Name can't contain numbers";
//                 }

//                 return true;
//               },
//               value => {
//                 if (!value) return true;
//                 if (value.indexOf("4") != -1) {
//                   return "I can't stand number 4";
//                 }
//                 return true;
//               }
//             ]}
//           />
//           <AnterosInputField
//             iconLeft={
//               <WrappedIcon
//                 style={{
//                   marginLeft: 10,
//                   alignSelf: "center",
//                   color: "#793315"
//                 }}
//                 name="ios-american-football-outline"
//                 size={30}
//               />
//             }
//             ref="last_name"
//             value="Default Value"
//             placeholder="Last Name"
//           />
//           <AnterosInputField
//             multiline={true}
//             ref="other_input"
//             placeholder="Other Input"
//             helpText="this is an helpful text it can be also very very long and it will wrap"
//           />
//           <AnterosInputField
//             ref="email"
//             value="test@test.it"
//             keyboardType="email-address"
//             placeholder="Email fields"
//             helpTextComponent={<Text>Custom Help Text Component</Text>}
//           />
//           <AnterosSeparator />
//           <AnterosInputField
//             label="LinkField, it acts like a button"
//             onPress={() => {}}
//             iconLeft={
//               <Icon
//                 style={{
//                   marginLeft: 10,
//                   alignSelf: "center",
//                   color: "#793315"
//                 }}
//                 name="ios-american-football-outline"
//                 size={30}
//               />
//             }
//             iconRight={
//               <Icon
//                 style={{
//                   alignSelf: "center",
//                   marginRight: 10,
//                   color: "#969696"
//                 }}
//                 name="ios-arrow-forward"
//                 size={30}
//               />
//             }
//           />
//           <AnterosSwitchField
//             label="I accept Terms & Conditions"
//             ref="has_accepted_conditions"
//             helpText="Please read carefully the terms & conditions"
//           />
//           <AnterosPickerField
//             ref="gender"
//             label="Gender"
//             value="female"
//             options={{
//               "": "",
//               male: "Male",
//               female: "Female"
//             }}
//           />
//           <AnterosDatePickerField
//             ref="birthday"
//             minimumDate={new Date("1/1/1900")}
//             maximumDate={new Date()}
//             iconRight={[
//               <Icon
//                 style={{ alignSelf: "center", marginLeft: 10 }}
//                 name="ios-arrow-forward"
//                 size={30}
//               />,
//               <Icon
//                 style={{ alignSelf: "center", marginLeft: 10 }}
//                 name="ios-arrow-down"
//                 size={30}
//               />
//             ]}
//             placeholder="Birthday"
//           />
//           <AnterosTimePickerField
//             ref="alarm_time"
//             placeholder="Set Alarm"
//             iconLeft={
//               <Icon
//                 style={{ alignSelf: "center", marginLeft: 10 }}
//                 name="ios-alarm"
//                 size={30}
//               />
//             }
//             prettyPrint={true}
//             pickerWrapper={<CustomModal />}
//           />
//           <AnterosCountDownField
//             ref="countdown"
//             label="CountDown"
//             placeholder="11:00"
//           />
//           <AnterosDatePickerField
//             ref="meeting"
//             iconLeft={[
//               <Icon
//                 style={{ alignSelf: "center", marginLeft: 10 }}
//                 name="ios-flame"
//                 size={30}
//               />,
//               <Icon
//                 style={{ alignSelf: "center", marginLeft: 10, color: "red" }}
//                 name="ios-flame"
//                 size={30}
//               />
//             ]}
//             minimumDate={new Date("1/1/1900")}
//             maximumDate={new Date()}
//             mode="datetime"
//             placeholder="Meeting"
//           />
//         </AnterosForm>
//         <Text>{JSON.stringify(this.state.formData)}</Text>
//         <TouchableHighlight
//           onPress={this.resetForm.bind(this)}
//           underlayColor="#78ac05"
//         >
//           <View
//             style={[
//               {
//                 flex: 1,
//                 alignItems: "center"
//               }
//             ]}
//           >
//             <Text style={{ fontSize: 19, padding: 15 }}>Reset</Text>
//           </View>
//         </TouchableHighlight>
//         <TouchableHighlight
//           disabled={!this.state.formData.has_accepted_conditions}
//           onPress={() => this.refs.registrationForm.refs.other_input.focus()}
//           underlayColor="#78ac05"
//         >
//           <View
//             style={[
//               {
//                 flex: 1,
//                 alignItems: "center",
//                 borderColor: this.state.formData.has_accepted_conditions
//                   ? "#2398c9"
//                   : "grey",
//                 borderWidth: 5
//               }
//             ]}
//           >
//             <Text style={{ fontSize: 19, padding: 15 }}>Focus First Name</Text>
//           </View>
//         </TouchableHighlight>
//       </ScrollView>
//     );
//   }
// }




import React, { Component } from 'react';

import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import {AnterosNavigationPage} from 'anteros-react-native';

import {
  Dimensions
} from 'react-native';
import moment from 'moment';
export class FormExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Form',
    showBackButton: true,
  };


  renderPage() {

        return (
          <GiftedForm
            formName='signupForm' // GiftedForm instances that use the same name will also share the same states

            openModal={(route) => {
              this.navigator.push({view:route}); // The ModalWidget will be opened using this method. Tested with ExNavigator
            }}

            clearOnClose={false} // delete the values of the form when unmounted

            defaults={{
              username: 'Farid',
              'gender{M}': true,
              password: 'abcdefg',
              country: 'FR',
              birthday: new Date(((new Date()).getFullYear() - 18) + ''),
            }}

            validators={{
              fullName: {
                title: 'Full name',
                validate: [{
                  validator: 'isLength',
                  arguments: [1, 23],
                  message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                }]
              },
              username: {
                title: 'Username',
                validate: [{
                  validator: 'isLength',
                  arguments: [3, 16],
                  message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                }, {
                  validator: 'matches',
                  arguments: /^[a-zA-Z0-9]*$/,
                  message: '{TITLE} can contains only alphanumeric characters'
                }]
              },
              password: {
                title: 'Password',
                validate: [{
                  validator: 'isLength',
                  arguments: [6, 16],
                  message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                }]
              },
              emailAddress: {
                title: 'Email address',
                validate: [{
                  validator: 'isLength',
                  arguments: [6, 255],
                }, {
                  validator: 'isEmail',
                }]
              },
              bio: {
                title: 'Biography',
                validate: [{
                  validator: 'isLength',
                  arguments: [0, 512],
                  message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                }]
              },
              gender: {
                title: 'Gender',
                validate: [{
                  validator: (...args) => {
                    if (args[0] === undefined) {
                      return false;
                    }
                    return true;
                  },
                  message: '{TITLE} is required',
                }]
              },
              birthday: {
                title: 'Birthday',
                validate: [{
                  validator: 'isBefore',
                  arguments: [moment().utc().subtract(18, 'years').format('YYYY-MM-DD')],
                  message: 'You must be at least 18 years old'
                }, {
                  validator: 'isAfter',
                  arguments: [moment().utc().subtract(100, 'years').format('YYYY-MM-DD')],
                  message: '{TITLE} is not valid'
                }]
              },
              country: {
                title: 'Country',
                validate: [{
                  validator: 'isLength',
                  arguments: [2],
                  message: '{TITLE} is required'
                }]
              },
            }}
          >

            <GiftedForm.SeparatorWidget />

            <GiftedForm.TextInputWidget
              name='fullName' // mandatory
              title='Full name'

              image={require('../images/color/user.png')}

              placeholder='Marco Polo'
              clearButtonMode='while-editing'
            />

            <GiftedForm.TextInputWidget
              name='username'
              title='Username'
              image={require('../images/color/contact_card.png')}

              placeholder='MarcoPolo'
              clearButtonMode='while-editing'

              onTextInputFocus={(currentText = '') => {
                if (!currentText) {
                  let fullName = GiftedFormManager.getValue('signupForm', 'fullName');
                  if (fullName) {
                    return fullName.replace(/[^a-zA-Z0-9-_]/g, '');
                  }
                }
                return currentText;
              }}
            />

            <GiftedForm.TextInputWidget
              name='password' // mandatory
              title='Password'

              placeholder='******'


              clearButtonMode='while-editing'
              secureTextEntry={true}
              image={require('../images/color/lock.png')}
            />

            <GiftedForm.TextInputWidget
              name='emailAddress' // mandatory
              title='Email address'
              placeholder='example@nomads.ly'

              keyboardType='email-address'

              clearButtonMode='while-editing'

              image={require('../images/color/email.png')}
            />

            <GiftedForm.SeparatorWidget />

            <GiftedForm.ModalWidget
              title='Gender'
              displayValue='gender'
              image={require('../images/color/gender.png')}
            >
              <GiftedForm.SeparatorWidget />

              <GiftedForm.SelectWidget name='gender' title='Gender' multiple={false}>
                <GiftedForm.OptionWidget image={require('../images/color/female.png')} title='Woman' value='W'/>
                <GiftedForm.OptionWidget image={require('../images/color/male.png')} title='Man' value='M'/>
                <GiftedForm.OptionWidget image={require('../images/color/other.png')} title='Other' value='O'/>
              </GiftedForm.SelectWidget>
            </GiftedForm.ModalWidget>

            <GiftedForm.ModalWidget
              title='Birthday'
              displayValue='birthday'
              image={require('../images/color/birthday.png')}

              scrollEnabled={false}
            >
              <GiftedForm.SeparatorWidget/>
              <GiftedForm.DatePickerIOSWidget
                name='birthday'
                mode='date'

                getDefaultDate={() => {
                  return new Date(((new Date()).getFullYear() - 18) + '');
                }}
              />
            </GiftedForm.ModalWidget>

            <GiftedForm.ModalWidget
              title='Country'
              displayValue='country'
              image={require('../images/color/passport.png')}
              scrollEnabled={false}

            >
              <GiftedForm.SelectCountryWidget
                code='alpha2'
                name='country'
                title='Country'
                autoFocus={true}
              />
            </GiftedForm.ModalWidget>

            <GiftedForm.ModalWidget
              title='Biography'
              displayValue='bio'

              image={require('../images/color/book.png')}

              scrollEnabled={true} // true by default
            >
              <GiftedForm.SeparatorWidget/>
              <GiftedForm.TextAreaWidget
                name='bio'

                autoFocus={true}

                placeholder='Something interesting about yourself'
              />
            </GiftedForm.ModalWidget>

            <GiftedForm.ErrorsWidget/>

            <GiftedForm.SubmitWidget
              title='Sign up'
              widgetStyles={{
                submitButton: {
                  backgroundColor: '#2185D0',
                }
              }}
              onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
                if (isValid === true) {
                  // prepare object
                  values.gender = values.gender[0];
                  values.birthday = moment(values.birthday).format('YYYY-MM-DD');

                  /* Implement the request to your server using values variable
                   ** then you can do:
                   ** postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
                   ** postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
                   ** GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
                   */

                  postSubmit();
                }
              }}
            />

            <GiftedForm.NoticeWidget
              title='By signing up, you agree to the Terms of Service and Privacy Policity.'
            />

            <GiftedForm.HiddenWidget name='tos' value={true}/>

          </GiftedForm>
        );
      
  }
}

