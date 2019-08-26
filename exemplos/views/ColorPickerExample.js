import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native';

import {AnterosColorPickerSliders,AnterosColorHueGradient,AnterosColorSaturationGradient,AnterosNavigationPage,
   AnterosColorLightnessGradient,AnterosColorHueSlider,AnterosColorSaturationSlider,AnterosColorLightnessSlider} from 'anteros-react-native';
import tinycolor from 'tinycolor2';


export default class ColorPickerExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Color picker',
    showBackButton: true
  };

  state = {
    modalVisible: false,
    recents: ['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654'],
    color: tinycolor('#70c1b3').toHsl()
  };

  updateHue = h => this.setState({ color: { ...this.state.color, h } });
  updateSaturation = s => this.setState({ color: { ...this.state.color, s } });
  updateLightness = l => this.setState({ color: { ...this.state.color, l } });

  renderPage() {
    const overlayTextColor = tinycolor(this.state.color).isDark()
      ? '#FAFAFA'
      : '#222';
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.header,
            { backgroundColor: tinycolor(this.state.color).toHslString() }
          ]}
        >
          <Text style={[styles.headerText, { color: overlayTextColor }]}>
            react-native-color
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.sectionText}>Pickers</Text>
          <Text style={styles.componentText}>{'<AnterosColorPickerSliders/>'}</Text>
          <TouchableOpacity
            onPress={() => this.setState({ modalVisible: true })}
            style={[
              styles.colorPreview,
              { backgroundColor: tinycolor(this.state.color).toHslString() }
            ]}
          >
            <Text style={[styles.colorString, { color: overlayTextColor }]}>
              {tinycolor(this.state.color).toHexString()}
            </Text>
          </TouchableOpacity>
          <Text style={styles.sectionText}>Gradients</Text>
          <Text style={styles.componentText}>{'<AnterosColorHueGradient/>'}</Text>
          <View style={styles.gradient}>
            <AnterosColorHueGradient gradientSteps={16} />
          </View>
          <Text style={styles.componentText}>{'<AnterosColorSaturationGradient/>'}</Text>
          <View style={styles.gradient}>
            <AnterosColorSaturationGradient color={this.state.color} gradientSteps={16} />
          </View>
          <Text style={styles.componentText}>{'<AnterosColorLightnessGradient/>'}</Text>
          <View style={styles.gradient}>
            <AnterosColorLightnessGradient color={this.state.color} gradientSteps={16} />
          </View>
          <Text style={styles.sectionText}>Sliders</Text>
          <Text style={styles.componentText}>{'<AnterosColorHueSlider/>'}</Text>
          <AnterosColorHueSlider
            style={styles.sliderRow}
            gradientSteps={40}
            value={this.state.color.h}
            onValueChange={this.updateHue}
          />
          <Text style={styles.componentText}>{'<AnterosColorSaturationSlider/>'}</Text>
          <AnterosColorSaturationSlider
            style={styles.sliderRow}
            gradientSteps={20}
            value={this.state.color.s}
            color={this.state.color}
            onValueChange={this.updateSaturation}
          />
          <Text style={styles.componentText}>{'<AnterosColorLightnessSlider/>'}</Text>
          <AnterosColorLightnessSlider
            style={styles.sliderRow}
            gradientSteps={20}
            value={this.state.color.l}
            color={this.state.color}
            onValueChange={this.updateLightness}
          />

          <AnterosColorPickerSliders
            visible={this.state.modalVisible}
            color={this.state.color}
            returnMode={'hex'}
            onCancel={() => this.setState({ modalVisible: false })}
            onOk={colorHex => {
              this.setState({
                modalVisible: false,
                color: tinycolor(colorHex).toHsl()
              });
              this.setState({
                recents: [
                  colorHex,
                  ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                ]
              });
            }}
            swatches={this.state.recents}
            swatchesLabel="RECENTS"
            okLabel="Done"
            cancelLabel="Cancel"
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : 0,
    paddingBottom: 16
  },
  content: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 32,
    paddingBottom: 32
  },
  headerText: {
    marginTop: 24,
    fontSize: 34,
    lineHeight: 41,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-bold'
      },
      ios: {
        fontWeight: '700',
        letterSpacing: 0.41
      }
    })
  },
  sectionText: {
    marginTop: 32,
    color: '#222',
    fontSize: 22,
    lineHeight: 28,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium'
      },
      ios: {
        fontWeight: '600',
        letterSpacing: 0.75
      }
    })
  },
  componentText: {
    marginTop: 16,
    color: '#222',
    fontSize: 16,
    lineHeight: 21,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium'
      },
      ios: {
        fontWeight: '600',
        letterSpacing: -0.408
      }
    })
  },
  colorPreview: {
    marginLeft: 12,
    marginTop: 12,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.25
  },
  gradient: {
    alignSelf: 'stretch',
    marginLeft: 12,
    marginTop: 12,
    marginBottom: 16,
    height: 4
  },
  sliderRow: {
    alignSelf: 'stretch',
    marginLeft: 12,
    marginTop: 12
  },
  colorString: {
    fontSize: 34,
    lineHeight: 41,
    ...Platform.select({
      android: {
        fontFamily: 'monospace'
      },
      ios: {
        fontFamily: 'Courier New',
        fontWeight: '600',
        letterSpacing: 0.75
      }
    })
  }
});