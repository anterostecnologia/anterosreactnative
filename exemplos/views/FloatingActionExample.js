
import {
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  View
} from 'react-native';

import FloatingActionRightScreen from './screens/FloatingActionRightScreen';
import FloatingActionLeftScreen from './screens/FloatingActionLeftScreen';
import FloatingActionCenterScreen from './screens/FloatingActionCenterScreen';
import FloatingActionOverrideWithActionScreen from './screens/FloatingActionOverrideWithActionScreen';
import FloatingActionDistanceEdge from './screens/FloatingActionDistanceEdge';
import FloatingActionOverlayScreen from './screens/FloatingActionOverlayScreen';
import FloatingActionColorScreen from './screens/FloatingActionColorScreen';
import FloatingActionVisibilityScreen from './screens/FloatingActionVisibilityScreen';
import FloatingActionOpenMountScreen from './screens/FloatingActionOpenMountScreen';
import FloatingActionHideBackgroundScreen from './screens/FloatingActionHideBackgroundScreen';
import FloatingActionActionsDistance from './screens/FloatingActionActionsDistance';
import FloatingActionStatusProgramatically from './screens/FloatingActionStatusProgramatically';
import FloatingActionChangeActionColor from './screens/FloatingActionChangeActionColor';
import {AnterosNavigationPage, AnterosListRow} from 'anteros-react-native';

export class FloatingActionExample extends AnterosNavigationPage {

  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: 'Floating action',
    showBackButton: true
  };

  renderRow = (highlighted) => {
    if (Platform.OS !== 'android') {
      return <View
        style={[
        {
          backgroundColor: '#f0f0f0',
          height: 1
        },
        highlighted && {
          marginLeft: 0
        }
      ]}/>;
    }

    return null;
  };

  renderPage() {
    return (
      <ScrollView style={{
        flex: 1
      }}>
        <View style={{
          height: 20
        }}/>
        <AnterosListRow
          title='Right position'
          onPress={() => this.navigator.push({view: <FloatingActionRightScreen/>})}
          topSeparator='full'/>
        <AnterosListRow
          title='Left position'
          onPress={() => this.navigator.push({view: <FloatingActionLeftScreen/>})}
          bottomSeparator='full'/>
        <AnterosListRow
          title='Center position'
          onPress={() => this.navigator.push({view: <FloatingActionCenterScreen/>})}
          bottomSeparator='full'/>
        <AnterosListRow
          title='No list of actions'
          onPress={() => this.navigator.push({view: <FloatingActionOverrideWithActionScreen/>})}
          bottomSeparator='full'/>
        <AnterosListRow
          title='Set distance from edges'
          onPress={() => this.navigator.push({view: <FloatingActionDistanceEdge/>})}
          bottomSeparator='full'/>
        <AnterosListRow
          title='Set overlay color'
          onPress={() => this.navigator.push({view: <FloatingActionOverlayScreen/>})}
          bottomSeparator='full'/>
        <AnterosListRow
          title='Set button color'
          onPress={() => this.navigator.push({view: <FloatingActionColorScreen/>})}
          bottomSeparator='full'/>
        <AnterosListRow
          title='Set visibility'
          onPress={() => this.navigator.push({view: <FloatingActionVisibilityScreen/>})}
          bottomSeparator='full'/>
        <AnterosListRow
          title='Open on mount'
          onPress={() => this.navigator.push({view: <FloatingActionOpenMountScreen/>})}
          bottomSeparator='full'/>
        <AnterosListRow
          title='Hide background'
          onPress={() => this.navigator.push({view: <FloatingActionHideBackgroundScreen/>})}
          bottomSeparator='full'/>
        <AnterosListRow
          title='Change Actions Distance'
          onPress={() => this.navigator.push({view: <FloatingActionActionsDistance/>})}
          bottomSeparator='full'/>
        <AnterosListRow
          title='Change visibility programatically'
          onPress={() => this.navigator.push({view: <FloatingActionStatusProgramatically/>})}
          bottomSeparator='full'/>
        <AnterosListRow
          title='Change Action Text Container colors'
          onPress={() => this.navigator.push({view: <FloatingActionChangeActionColor/>})}
          bottomSeparator='full'/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  row: {
    paddingHorizontal: 10,
    paddingVertical: 20
  }
});