
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native';

import {AnterosNavigationPage, AnterosContentLoader} from 'anteros-react-native';
import {Circle, Rect} from 'react-native-svg'

export class ContentLoaderExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Content loader',
    showBackButton: true
  };

  renderPage(){
      return (
          <ScrollView>
            <View >
                <View style={styles.container}>
                    <AnterosContentLoader height={300} duration={1000} style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Circle cx="30" cy="30" r="30"/>
                        <Rect x="75" y="13" rx="4" ry="4" width="100" height="13"/>
                        <Rect x="75" y="37" rx="4" ry="4" width="50" height="8"/>
                        <Rect x="0" y="70" rx="5" ry="5" width="400" height="200"/>
                    </AnterosContentLoader>
                </View>
                <View style={styles.container}>
                    <AnterosContentLoader primaryColor="#e8f7ff"
                        secondaryColor="#4dadf7"
                        duration={700}
                        height={140} style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Rect x="0" y="0" rx="5" ry="5" width="70" height="70"/>
                        <Rect x="80" y="17" rx="4" ry="4" width="300" height="13"/>
                        <Rect x="80" y="40" rx="3" ry="3" width="250" height="10"/>
                        <Rect x="0" y="80" rx="3" ry="3" width="350" height="10"/>
                        <Rect x="0" y="100" rx="3" ry="3" width="200" height="10"/>
                        <Rect x="0" y="120" rx="3" ry="3" width="360" height="10"/>
                    </AnterosContentLoader>
                </View>
                <View style={styles.container}>
                    <AnterosContentLoader
                        primaryColor="#fff0f6"
                        secondaryColor="#f783ac"
                        height={80} style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Rect x="0" y="0" rx="3" ry="3" width="70" height="10"/>
                        <Rect x="80" y="0" rx="3" ry="3" width="100" height="10"/>
                        <Rect x="190" y="0" rx="3" ry="3" width="10" height="10"/>
                        <Rect x="15" y="20" rx="3" ry="3" width="130" height="10"/>
                        <Rect x="155" y="20" rx="3" ry="3" width="130" height="10"/>
                        <Rect x="15" y="40" rx="3" ry="3" width="90" height="10"/>
                        <Rect x="115" y="40" rx="3" ry="3" width="60" height="10"/>
                        <Rect x="185" y="40" rx="3" ry="3" width="60" height="10"/>
                        <Rect x="0" y="60" rx="3" ry="3" width="30" height="10"/>
                    </AnterosContentLoader>
                </View>
                <View style={styles.container}>
                    <AnterosContentLoader style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Circle cx="30" cy="30" r="30" />
                        <Rect x="75" y="13" rx="4" ry="4" width="100" height="13" />
                        <Rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
                        <Rect x="0" y="70" rx="5" ry="5" width="400" height="400" />
                    </AnterosContentLoader>
                </View>
                <View style={styles.container}>
                    <AnterosContentLoader style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Circle cx="10" cy="20" r="8" />
                        <Rect x="25" y="15" rx="5" ry="5" width="220" height="10" />
                        <Circle cx="10" cy="50" r="8" />
                        <Rect x="25" y="45" rx="5" ry="5" width="220" height="10" />
                        <Circle cx="10" cy="80" r="8" />
                        <Rect x="25" y="75" rx="5" ry="5" width="220" height="10" />
                        <Circle cx="10" cy="110" r="8" />
                        <Rect x="25" y="105" rx="5" ry="5" width="220" height="10" />
                    </AnterosContentLoader>
                </View>    
                <View style={styles.container}>
                    <AnterosContentLoader style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
                        <Rect x="20" y="20" rx="3" ry="3" width="220" height="10" />
                        <Rect x="20" y="40" rx="3" ry="3" width="170" height="10" />
                        <Rect x="0" y="60" rx="3" ry="3" width="250" height="10" />
                        <Rect x="20" y="80" rx="3" ry="3" width="200" height="10" />
                        <Rect x="20" y="100" rx="3" ry="3" width="80" height="10" />
                    </AnterosContentLoader>
                </View>    
            </View>
      </ScrollView>);
  }

}


const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        borderColor: '#EEEEEE',
        borderWidth: 1,
    }
})