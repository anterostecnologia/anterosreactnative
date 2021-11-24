import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';
const staticAsset = require('../images/sample-1.jpeg');

import {AnterosNavigationPage, AnterosHero} from 'anteros-react-native';

export class HeroExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Hero',
      showBackButton: true,
    };

	overlay() {
		return (
			<View style={{ padding: 40 }}>
			  <Text style={{ fontSize: 25, color: '#fff', fontWeight: 'bold'}}>
				Welcome to react-native-hero!
			  </Text>
			  <Text style={{ fontSize: 14, color: '#27ae60'}}>Simplified Hero Units 🎉!</Text>
			</View>
		)
    }
 

	renderPage() {
		return (
			<View style={styles.container}>
  			  <AnterosHero
        		source={{ uri: 'https://s-media-cache-ak0.pinimg.com/736x/8e/f6/30/8ef6306bf7c3749768dbc8df038c414c.jpg' }}
        		renderOverlay={() => this.overlay()}
				fullWidth={false} />
			  <AnterosHero
        		source={{ uri: 'https://images.unsplash.com/16/unsplash_5263607dd1bfc_2.jpg' }}
        		renderOverlay={() => this.overlay()}
        		colorOverlay="#16a085"
        		colorOpacity={0.5} />              
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		width: '100%'
	},
});