

import {
  View,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
  Text,
} from 'react-native';

import {AnterosButton, AnterosText, AnterosNavigationPage, AnterosImage, AnterosThumbnailSelector} from 'anteros-react-native';

export class ThumbnailSelectorExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: "Thumbnail selector",
      showBackButton: true
    };

  constructor(props) {
    const items = [
      {
        key: 0,
        title: 'Paul',
        borderColor: 'white',
        imageUri: {uri:'https://source.unsplash.com/DPXytK8Z59Y/200x100'},
        selected: true,
      },
      {
        key: 1,
        title: 'Brian',
        borderColor: 'white',
        imageUri: {uri:'https://source.unsplash.com/nTfGYGPURFA/200x100'},
        selected: false,
      },
      {
        key: 2,
        title: 'Gene',
        borderColor: 'white',
        imageUri: {uri:'https://source.unsplash.com/L-2p8fapOA8/200x100'},
        selected: false,
      },
      {
        key: 3,
        title: 'Jose',
        borderColor: 'white',
        imageUri: {uri:'https://source.unsplash.com/lyvCvA8sKGc/200x200'},
        selected: false,
      },
      {
        key: 4,
        title: 'Jon',
        borderColor: 'white',
        imageUri: {uri:'https://source.unsplash.com/gdBXlLO53N4/200x100'},
        selected: false,
      },
      {
        key: 5,
        title: 'Craig',
        borderColor: 'white',
        imageUri: {uri:'https://source.unsplash.com/wpTWYBll4_w/200x100'},
        selected: false,
      },
      {
        key: 6,
        title: 'Sean',
        borderColor: 'white',
        imageUri: {uri:'https://source.unsplash.com/4olkDk9vD2k/200x100'},
        selected: false,
      },
    ];
    super(props);
    this.state = {
      items: items,
      visible: true,
      imageUri: {uri:'https://source.unsplash.com/dO8qMqWimo8/200x100'},
      title: items[0].title + ' #' + items[0].key
    };
  }
  showAction() {
    const {visible} = this.state
    this.setState({
      visible: !visible
    })
  }
  onSelectedItem(item) {
    this.setState({
      visible: false,
      imageUri: item.imageUri,
      title: item.title + ' #' + item.key
    })
  }
  loadMore = () => {
    var items = this.state.items;
    var itemCount = items.length
    const more = [{
        key: itemCount++,
        title: 'Paul',
        borderColor: 'white',
        imageUri: 'https://source.unsplash.com/b1NFkUR-3Fg/200x100',
        selected: false,
      },
      { key: itemCount++,
        title: 'Brian',
        borderColor: 'white',
        imageUri: 'https://source.unsplash.com/BHh-jKrTIoU/200x100',
        selected: false,
      },
    ]
    items = items.concat(more)
    this.setState({
      items: items
    })
  }
  renderPage() {
    return (
      <View style={styles.container}>
        <AnterosImage style={{width: 125, height: 125}} source={this.state.imageUri}/>
        <AnterosText style={styles.text}>{this.state.title}</AnterosText>
        <AnterosButton
          onPress={() => this.showAction()}
          title={"Toggle"}
          color={"steelblue"}
          accessibilityLabel={"Toggle"}
        />
        <AnterosThumbnailSelector
          visible={this.state.visible}
          items={this.state.items}
          onSelectedItem={(item) => this.onSelectedItem(item)}
          loadMore={this.loadMore}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EEEF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Avenir'
  }
});