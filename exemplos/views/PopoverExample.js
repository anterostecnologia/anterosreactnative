// PopoverExample.js

'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Image, ScrollView} from 'react-native';

import {AnterosNavigationPage, AnterosListRow, AnterosPopover, AnterosLabel} from 'anteros-react-native';

export default class PopoverExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Popover',
    showBackButton: true
  };

  renderPage() {
    let img = require('../images/faircup.jpg');
    return (
      <ScrollView style={{
        flex: 1
      }}>
        <View style={{
          height: 20
        }}/>

        <View
          style={{
          padding: 4,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <View
            style={{
            flex: 1,
            paddingRight: 8,
            alignItems: 'flex-end'
          }}>
            <AnterosPopover style={styles.popoverStyle} arrow='bottomRight'>
              <AnterosLabel
                style={{
                color: '#000'
              }}
                text='bottomRight'/>
            </AnterosPopover>
          </View>
          <View>
            <AnterosPopover style={styles.popoverStyle} arrow='bottom'>
              <AnterosLabel
                style={{
                color: '#000'
              }}
                text='bottom'/>
            </AnterosPopover>
          </View>
          <View
            style={{
            flex: 1,
            paddingLeft: 8,
            alignItems: 'flex-start'
          }}>
            <AnterosPopover style={styles.popoverStyle} arrow='bottomLeft'>
              <AnterosLabel
                style={{
                color: '#000'
              }}
                text='bottomLeft'/>
            </AnterosPopover>
          </View>
        </View>

        <View
          style={{
          padding: 4,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <View
            style={{
            flex: 1,
            paddingRight: 40,
            alignItems: 'flex-end'
          }}>
            <AnterosPopover style={styles.popoverStyle} arrow='rightBottom'>
              <AnterosLabel
                style={{
                color: '#000'
              }}
                text='rightBottom'/>
            </AnterosPopover>
          </View>
          <View style={{
            height: 32,
            width: 32
          }}/>
          <View
            style={{
            flex: 1,
            paddingLeft: 40,
            alignItems: 'flex-start'
          }}>
            <AnterosPopover style={styles.popoverStyle} arrow='leftBottom'>
              <AnterosLabel
                style={{
                color: '#000'
              }}
                text='leftBottom'/>
            </AnterosPopover>
          </View>
        </View>

        <View
          style={{
          padding: 4,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <View
            style={{
            flex: 1,
            paddingRight: 40,
            alignItems: 'flex-end'
          }}>
            <AnterosPopover style={styles.popoverStyle} arrow='right'>
              <AnterosLabel
                style={{
                color: '#000'
              }}
                text='right'/>
            </AnterosPopover>
          </View>
          <Image
            style={{
            height: 32,
            width: 32,
            borderRadius: 16,
            tintColor: '#337ab7'
          }}
            source={require('../icons/smile.png')}/>
          <View
            style={{
            flex: 1,
            paddingLeft: 40,
            alignItems: 'flex-start'
          }}>
            <AnterosPopover style={styles.popoverStyle} arrow='left'>
              <AnterosLabel
                style={{
                color: '#000'
              }}
                text='left'/>
            </AnterosPopover>
          </View>
        </View>

        <View
          style={{
          padding: 4,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <View
            style={{
            flex: 1,
            paddingRight: 40,
            alignItems: 'flex-end'
          }}>
            <AnterosPopover style={styles.popoverStyle} arrow='rightTop'>
              <AnterosLabel
                style={{
                color: '#000'
              }}
                text='rightTop'/>
            </AnterosPopover>
          </View>
          <View style={{
            height: 32,
            width: 32
          }}/>
          <View
            style={{
            flex: 1,
            paddingLeft: 40,
            alignItems: 'flex-start'
          }}>
            <AnterosPopover style={styles.popoverStyle} arrow='leftTop'>
              <AnterosLabel
                style={{
                color: '#000'
              }}
                text='leftTop'/>
            </AnterosPopover>
          </View>
        </View>

        <View
          style={{
          padding: 4,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <View
            style={{
            flex: 1,
            paddingRight: 8,
            alignItems: 'flex-end'
          }}>
            <AnterosPopover style={styles.popoverStyle} arrow='topRight'>
              <AnterosLabel
                style={{
                color: '#000'
              }}
                text='topRight'/>
            </AnterosPopover>
          </View>
          <View>
            <AnterosPopover style={styles.popoverStyle} arrow='top'>
              <AnterosLabel
                style={{
                color: '#000'
              }}
                text='top'/>
            </AnterosPopover>
          </View>
          <View
            style={{
            flex: 1,
            paddingLeft: 8,
            alignItems: 'flex-start'
          }}>
            <AnterosPopover style={styles.popoverStyle} arrow='topLeft'>
              <AnterosLabel
                style={{
                color: '#000'
              }}
                text='topLeft'/>
            </AnterosPopover>
          </View>
        </View>

      </ScrollView>
    );
  }

}

var styles = StyleSheet.create({
  popoverStyle: {
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shadowStyle: {
    shadowColor: '#777',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.5,
    shadowRadius: 2
  }
});
