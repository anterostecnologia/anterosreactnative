//https://github.com/rafaelmotta/react-native-tag-select/blob/master/Demo/App.js

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
  Text,
} from 'react-native';

import { AnterosButton, AnterosNavigationPage, AnterosTagSelect } from 'anteros-react-native';

export default class TagSelectExample extends AnterosNavigationPage {

    static defaultProps = {
        ...AnterosNavigationPage.defaultProps,
        title: 'Tag',
        showBackButton: true,
    };

  renderPage() {
    const data = [
      { id: 1, label: 'Money' },
      { id: 2, label: 'Credit card' },
      { id: 3, label: 'Debit card' },
      { id: 4, label: 'Online payment' },
      { id: 5, label: 'Bitcoin' },
    ];

    const arrayOfString = ['soccer', 'basketball', 'golf', 'handball']

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.labelText}>Using an array of objects with max of 3 items:</Text>
        <View style={styles.codeContainer}>
          <Text>{JSON.stringify(data)}</Text>
        </View>
        <AnterosTagSelect
          value={[data[0]]}
          data={data}
          max={3}
          ref={(tag) => {
            this.tag = tag;
          }}
          onMaxError={() => {
            Alert.alert('Ops', 'Max reached');
          }}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.buttonInner}>
            <AnterosButton
              title="Get selected count"
              style={styles.button}
              onPress={() => {
                Alert.alert('Selected count', `Total: ${this.tag.totalSelected}`);
              }}
            />
          </View>
          <View>
            <AnterosButton
              title="Get selected"
              onPress={() => {
                Alert.alert('Selected items:', JSON.stringify(this.tag.itemsSelected));
              }}
            />
          </View>
        </View>
        <View style={styles.separattor} />
        <Text style={styles.labelText}>Using an array of strings:</Text>
        <View style={styles.codeContainer}>
          <Text>{JSON.stringify(arrayOfString)}</Text>
        </View>
        <AnterosTagSelect
          value={[arrayOfString[0]]}
          data={arrayOfString}
          ref={(tag) => {
            this.tagString = tag;
          }}
          max={2}
          onMaxError={() => {
            Alert.alert('Ops', 'Max reached');
          }}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.buttonInner}>
            <AnterosButton
              title="Get selected count"
              style={styles.button}
              onPress={() => {
                Alert.alert('Selected count', `Total: ${this.tagString.totalSelected}`);
              }}
            />
          </View>
          <View>
            <AnterosButton
              title="Get selected"
              onPress={() => {
                Alert.alert('Selected items:', JSON.stringify(this.tagString.itemsSelected));
              }}
            />
          </View>
        </View>
        <View style={styles.separattor} />
        <Text style={styles.labelText}>Inverse theme:</Text>
        <AnterosTagSelect
          theme="inverse"
          data={data}
        />
        <View style={styles.separattor} />
        <Text style={styles.labelText}>Success theme:</Text>
        <AnterosTagSelect
          theme="success"
          data={data}
        />
        <View style={styles.separattor} />
        <Text style={styles.labelText}>Info theme:</Text>
        <AnterosTagSelect
          theme="info"
          data={data}
        />
        <View style={styles.separattor} />
        <Text style={styles.labelText}>Danger theme:</Text>
        <AnterosTagSelect
          theme="danger"
          data={data}
        />
        <View style={styles.separattor} />
        <Text style={styles.labelText}>warning theme:</Text>
        <AnterosTagSelect
          theme="warning"
          data={data}
        />
        <Text style={styles.labelText}>Custom theme:</Text>
        <AnterosTagSelect 
          data={data}
          itemStyle={styles.customItem}
          itemStyleSelected={styles.customItemSelected}
          itemLabelStyle={styles.customItemLabel}
          itemLabelStyleSelected={styles.customItemLabelSelected}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 45,
  },
  codeContainer: {
    marginBottom: 15,
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 4
  },
  buttonContainer: {
    padding: 15,
  },
  buttonInner: {
    marginBottom: 15,
  },
  labelText: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 15,
  },
  separattor: {
    borderColor: '#DCDCDC',
    borderTopWidth: 1.5,
    marginBottom: 30
  },
  customItem: {
    borderColor: 'red',
    borderWidth: 1,
  },
  customItemSelected: {
    backgroundColor: 'green',
    borderColor: 'blue',
    borderWidth: 2,
  },
  customItemLabel: {
    color: 'green',
    fontSize: 16,
  },
  customItemLabelSelected: {
    color: 'yellow',
  }
});