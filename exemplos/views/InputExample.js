// InputExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {AnterosNavigationPage, AnterosListRow, AnterosInput, AnterosLabel,} from 'anteros-react-native';
  AnterosAutoComplete, AnterosTextArea

const API = 'https://swapi.co/api';
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];


export default class InputExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Input',
    showBackButton: true
  };
  
  constructor(props) {
    super(props);
    Object.assign(this.state, {
      valueSM: null,
      valueMD: null,
      valueLG: null,
      valueReadonly: 'Readonly',
      valueDisable: 'Disable',
      valueCustom: null,
      films: [],
      query: ''
    });
  }

  componentDidMount() {
    fetch(`${API}/films/`).then(res => res.json()).then((json) => {
      const { results: films } = json;
      this.setState({...this.state, films });
    });
  }

  findFilm(query) {
    if (query === '') {
      return [];
    }

    const { films } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return films.filter(film => film.title.search(regex) >= 0);
  }

  renderPage() {
    const { query } = this.state;
    const films = this.findFilm(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <ScrollView style={{
        flex: 1
      }}>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Size sm'
          detail={< AnterosInput style = {{width: 200}}size = 'sm' value = {
          this.state.valueSM
        }
        placeholder = 'Size sm' onChangeText = {
          text => this.setState({valueSM: text})
        } />}
          topSeparator='full'/>
        <AnterosListRow
          title='Size md'
          detail={< AnterosInput style = {{width: 200}}size = 'md' value = {
          this.state.valueMD
        }
        placeholder = 'Size md' onChangeText = {
          text => this.setState({valueMD: text})
        } />}/>
        <AnterosListRow
          title='Size lg'
          detail={< AnterosInput style = {{width: 200}}size = 'lg' value = {
          this.state.valueLG
        }
        placeholder = 'Size lg' onChangeText = {
          text => this.setState({valueLG: text})
        } />}
          bottomSeparator='full'/>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Readonly'
          detail={< AnterosInput style = {{width: 200}}editable = {
          false
        }
        value = {
          this.state.valueReadonly
        } />}
          topSeparator='full'/>
        <AnterosListRow
          title='Disabled'
          detail={< AnterosInput style = {{width: 200}}disabled = {
          true
        }
        value = {
          this.state.valueDisable
        } />}
          bottomSeparator='full'/>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Custom'
          detail={< AnterosInput style = {{width: 200, backgroundColor: '#rgba(238, 169, 91, 0.1)', borderColor: '#8a6d3b', color: '#8a6d3b', textAlign: 'right'}}value = {
          this.state.valueCustom
        }
        placeholder = 'Custom' onChangeText = {
          text => this.setState({valueCustom: text})
        } />}
          topSeparator='full'
          bottomSeparator='full'/>
        <AnterosListRow
          title='Auto Complete'
          detailMultiLine={true}
          detail={<AnterosAutoComplete
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={styles.autocompleteContainer}
            data={films.length === 1 && comp(query, films[0].title) ? [] : films}
            defaultValue={query}
            onChangeText={text => this.setState({...this.state, query: text })}
            placeholder="Enter Star Wars film title"
            renderItem={({ title, release_date }) => (
              <TouchableOpacity onPress={() => this.setState({...this.state, query: title })}>
                <Text style={styles.itemText}>
                  {title} ({release_date.split('-')[0]})
                </Text>
              </TouchableOpacity>
            )}
          />}
          topSeparator='full'
          bottomSeparator='full'/>
      <AnterosTextArea
          containerStyle={styles.textareaContainer}
          style={styles.textarea}
          onChangeText={this.onChange}
          defaultValue={this.state.text}
          maxLength={120}
          placeholder={'Writing text here...'}
          placeholderTextColor={'#c7c7c7'}
          underlineColorAndroid={'transparent'}
        />    
      </ScrollView>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25
  },
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 8
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  },
    textareaContainer: {
      height: 180,
      padding: 5,
      backgroundColor: '#F5FCFF',
    },
    textarea: {
      textAlignVertical: 'top',  // hack android
      height: 170,
      fontSize: 14,
      color: '#333',
    },
  
});