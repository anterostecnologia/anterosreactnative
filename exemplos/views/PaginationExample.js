import React, { Component } from "react";
import {
  Platform,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Text,
  TouchableHighlight,
  Animated,
  Image,
  Dimensions
} from "react-native";
import _ from 'lodash';
import PropTypes from 'prop-types';
import faker from 'faker';
import {AnterosNavigationPage, AnterosPagination, AnterosPaginationDot, AnterosPaginationIcon} from 'anteros-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
const { width, height } = Dimensions.get("window");

export default class PaginationExample extends AnterosNavigationPage {
  static defaultProps = {
    ...AnterosNavigationPage.defaultProps,
    title: "Pagination",
    showBackButton: true
  };

  constructor(props) {
    super(props);

    this.state = {
      Component: ContactListExample,
      showHeader: true
    };
  }

  renderExample([Component, title, backgroundColor]) {
    return (
      <TouchableOpacity
        key={title}
        style={[pes.button, { backgroundColor }]}
        onPress={() => this.setState({ Component })}
      >
        <Text style={{ color: "white", fontWeight: "500" }}>{title}</Text>
      </TouchableOpacity>
    );
  }

  renderBackButton() {
    return (
      <TouchableOpacity
        style={pes.back}
        onPress={() => this.setState({ showHeader: true, Component: null })}
      >
        <Text style={{ fontSize: 15, backgroundColor: "transparent" }}>
          ← Back
        </Text>
      </TouchableOpacity>
    );
  }

  renderExamples(examples) {
    const { Component } = this.state;

    return (
      <View style={pes.container}>
        {Component && <Component provider={null} />}
        {Component && this.renderBackButton()}
        {!Component && (
          <View style={[pes.contents]}>
            <View style={[pes.headingContainer]}>
              <Text style={[pes.headingText]}>React Native Pagination</Text>
              <Text style={[pes.subHeadingText]}>Example Application</Text>
              <View style={[pes.lineDivider]} />
            </View>
            <ScrollView
              contentContainerStyle={pes.scrollview}
              showsVerticalScrollIndicator={false}
            >
              {examples.map(example => this.renderExample(example))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  }

  renderPage() {
    return this.renderExamples([
      // [<component>, <component title>,<color>]
      [
        RobotsExample,
        "Robots Example - Horizontal Advanced FlatList",
        "rgba(0,166,155,.8)"
      ],
      [
        PagedCardsExample,
        "Paged Cards Example - Horizontal Paged",
        "rgba(0,136,155,.8)"
      ],
      [
        ContactListExample,
        "Contact List Example 1 - Vertical FlatList",
        "rgba(166,0,155,.8)"
      ],
      [
        ContactListExampleLightTheme,
        "Contact List Example 2 - Vertical FlatList \n  (Dots Light Theme)",
        "rgba(166,0,125,.8)"
      ]
    ]);
  }
}

const pes = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  scrollview: {
    alignItems: "center",
    paddingVertical: 40
  },
  button: {
    flex: 1,
    marginTop: 8,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 5
  },

  back: {
    position: "absolute",
    top: 10,
    left: 0,
    padding: 12,
    width: 80,
    alignItems: "center",
    justifyContent: "center"
  },
  contents: { height, width, backgroundColor: "#F5FCFF" },
  headingContainer: {
    marginTop: 40,
    padding: 5,
    backgroundColor: "transparent"
  },
  headingText: { fontSize: 25, color: "#444", margin: 5, fontWeight: "700" },
  subHeadingText: {
    fontSize: 18,
    color: "#a4a6a6",
    margin: 5,
    fontWeight: "400"
  },
  lineDivider: {
    width: 50,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
    margin: 5,
    marginTop: 5,
    marginBottom: 10
  }
});


//============================================================================

let MockPersonList = new _.times(35, i => {
  return {
    id: i,
    index: i,
    key: i,
    name: faker.name.findName(),
    avatar: faker.internet.avatar(),
    group: _.sample(["Family", "Friend", "Acquaintance", "Other"]),
    email: faker.internet.email()
  };
});

let MockRobotsList = new _.times(15, i => {
  return {
    id: i,
    index: i,
    key: i,
    name: faker.name.findName(),
    avatar: faker.internet.avatar(),
    group: _.sample(["Work", "Friend", "Acquaintance", "Other"]),
    email: faker.internet.email()
  };
});
let MockTweetList = new _.times(15, i => {
  return {
    id: i,
    index: i,
    key: i,
    title: faker.name.jobTitle(),
    city: faker.address.city(),
    type: faker.name.jobType(),
    color: faker.internet.color(),
    description: faker.lorem.sentence(),
    // image:faker.image.business(),
    image: faker.internet.avatar()
  };
});


//============================================================================

class ContactListExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: MockPersonList
    };
    this.renderDot = this.renderDot.bind(this);
    this.viewabilityConfig = {
        waitForInteraction: true,
        viewAreaCoveragePercentThreshold: 50,
        waitForInteraction: true
    };
  }
  _keyExtractor = (item, index) => item.id;
  _renderItem = ({ item }) => {
    return (
      <ContactItem
        index={item.id}
        id={item.key}
        name={item.name}
        avatar={item.avatar}
        description={item.email}
        tag={item.group}
        createTagColor
      />
    );
  };

  renderDot(o, i) {
    let dotComponent = (
      <Animated.Image
        source={{ uri: o.item.avatar }}
        style={{
          backgroundColor: "rgba(0,0,0,0.1)",
          width: o.isViewable ? 28 : 15,
          height: o.isViewable ? 28 : 15,
          opacity: o.isViewable ? 1 : 0.5,
          borderRadius: o.isViewable ? 14 : 7.5
        }}
      />
    );
    return (
      <AnterosPaginationDot
        onPress={() => {
          try {
            this.refs.scrollToItem(o);
          } catch (e) {
            console.log(" e: ", e);
          }
        }}
        isViewable={o.isViewable}
        dotComponent={dotComponent}
        dotSwapAxis
        dotPositionSwap
        size={o.isViewable ? 20 : 15}
        textStyle={{
          color: "rgba(0,0,0,0.6)",
          fontSize: 8,
          width: 50,
          margin: 5
        }}
        text={_.get(o, "item.name", "").split(" ")[0]}
        style={{
          margin: 1,
          marginRight: 5,
          backgroundColor: "transparent",
          width: 50,
          justifyContent: "center",
          alignItems: "center"
        }}
      />
    );
  }
  //need this
  onViewableItemsChanged = ({ viewableItems, changed }) => {
     this.setState({ viewableItems, changed });
  };
  render() {
    let heading = "Contacts",
      subheading = "Flat List Vertical Example";
    let ListHeaderComponent = (
      <View style={[{ padding: 10 }, cle.containerMarginTop]}>
        <Text
          style={{ fontSize: 35, color: "#444", margin: 5, fontWeight: "700" }}
        >
          {heading ? heading : "Heading"}
        </Text>
        <Text
          style={{ fontSize: 17, color: "#444", margin: 5, fontWeight: "400" }}
        >
          {subheading}
        </Text>
        <View
          style={{
            width: 50,
            borderBottomWidth: 1,
            borderColor: "#e3e3e3",
            margin: 5,
            marginTop: 5,
            marginBottom: 30
          }}
        />
      </View>
    );
    return (
      <View style={[cle.container]}>
        <FlatList
          data={this.state.items}
          ref={r => (this.refs = r)}
          keyExtractor={this._keyExtractor} //map your keys to whatever unique ids the have (mine is a "key" proptery)
          renderItem={this._renderItem}
          viewabilityConfig={this.viewabilityConfig}
        //   onViewableItemsChanged={this.onViewableItemsChanged.bind(this)} //need this
        />
        <AnterosPagination
          refs={this.refs}
          renderDot={this.renderDot}
          dotIconSizeActive={25}
          paginationVisibleItems={this.state.viewableItems} //needs to track what the user sees
          paginationItems={this.state.items} //pass the same list as data
        />
      </View>
    );
  }
}

const cle = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor:"grey",
  },
  pagination: {
    backgroundColor: "rgba(0,0,0,0)",
    width,
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 7,
    padding: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  containerMarginTop: {
    marginTop: 30
  }
});

ContactListExample.defaultProps = {
  data: MockPersonList
};


//============================================================================

class ContactListExampleLightTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: MockPersonList
    };
    this.renderDot = this.renderDot.bind(this);

    this.viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 50,
        waitForInteraction: true,
    };
  }

  _keyExtractor = (item, index) => item.id;

  _onPressItem = id => {
    // updater functions are preferred for transactional updates
    this.setState(state => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
  };

  _renderItem = ({ item }) => {
    // console.log(" item: ",item);
    return (
      <ContactItem
        index={item.id}
        id={item.key}
        onPressItem={this._onPressItem}
        name={item.name}
        avatar={item.avatar}
        description={item.email}
        tag={item.group}
        createTagColor
      />
    );
  };
  _renderIteme = ({ item, separators }) => {
    console.log(" item: ", item);
    return (
      <TouchableHighlight
        onPress={() => this._onPress(item)}
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}
      >
        <View style={{ backgroundColor: "white" }}>
          <Text>{item.title}}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  //need this
  onViewableItemsChanged = ({ viewableItems, changed }) => {
     this.setState({ viewableItems, changed });
  };

  renderDot(o, i) {
    return (
      <AnterosPaginationDot
        onPress={() => {
          try {
            this.refs.scrollToItem(o);
          } catch (e) {
            console.log(" e: ", e);
          }
        }}
        isViewable={o.isViewable}
        size={o.isViewable ? 20 : 15}
        textStyle={{
          color: "rgba(255,255,255,0.6)",
          fontSize: 8,
          width,
          margin: 5
        }}
        text={_.get(o, "item.name", "").split(" ")[0]}
        style={{
          margin: 1,
          marginRight: 5,
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center"
        }}
      />
    );
  }

  render() {
    let heading = "Contacts",
      subheading = "Flat List Vertical Example";
    let ListHeaderComponent = (
      <View style={[{ padding: 10 }, clt.containerMarginTop]}>
        <Text
          style={{ fontSize: 35, color: "#444", margin: 5, fontWeight: "700" }}
        >
          {heading ? heading : "Heading"}
        </Text>
        <Text
          style={{ fontSize: 17, color: "#444", margin: 5, fontWeight: "400" }}
        >
          {subheading}
        </Text>
        <View
          style={{
            width: 50,
            borderBottomWidth: 1,
            borderColor: "#e3e3e3",
            margin: 5,
            marginTop: 5,
            marginBottom: 30
          }}
        />
      </View>
    );
    return (
      <View style={[clt.container]}>
        <FlatList
          data={this.state.items}
          ref={r => (this.refs = r)}
          keyExtractor={this._keyExtractor} //map your keys to whatever unique ids the have (mine is a "key" proptery)
          renderItem={this._renderItem}
          viewabilityConfig={this.viewabilityConfig}
        //   onViewableItemsChanged={this.onViewableItemsChanged.bind(this)} //need this
        />

        <AnterosPagination
          refs={this.refs}
          pagingEnabled
          paginationContainerStyle={{
            position: "absolute",
            top: 150,
            bottom: 0,
            right: 0,
            width: 40,
            paddingTop: 200,
            paddingBottom: 200
          }}
          renderDot={this.renderDot}
          dotIconSizeActive={25}
          paginationVisibleItems={this.state.viewableItems} //needs to track what the user sees
          paginationItems={this.state.items} //pass the same list as data
        />
      </View>
    );
  }
}

const clt = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a2530"
  },
  pagination: {
    backgroundColor: "rgba(0,0,0,0)",
    width,
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 7,
    padding: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  containerMarginTop: {
    marginTop: 30
  }
});

ContactListExampleLightTheme.defaultProps = {
  data: MockPersonList
};

//============================================================================

class ContactItem extends Component {
  // Generates a Hex Color for a string
  stringToHex(str) {
    if (!str) str = "none";
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var color = "#";
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).substr(-2);
    }
    return color;
  }

  render() {
    const {
      name,
      avatar,
      color,
      seen,
      selected,
      key,
      id,
      tag,
      onPressItem,
      description
    } = this.props;
    // console.log(" this.props: ",this.props);
    let TagColor = "#33333";
    if (color) TagColor = color;
    if (!color && tag) TagColor = this.stringToHex(this.props.tag);
    return (
      <TouchableOpacity
        style={[{ flex: 1, justifyContent: "center", alignItems: "center" }]}
        onPress={item => onPressItem(item)}
      >
        <View
          style={{
            paddingBottom: 15,
            paddingTop: 15,
            flex: 1,
            width,
            flexDirection: "row",
            borderBottomWidth: 1,
            opacity: 0.5,
            borderColor: "#e3e3e3"
          }}
        >
          <View style={{ alignSelf: "center", justifyContent: "center" }}>
            <View
              style={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: TagColor,
                backgroundColor: TagColor,
                alignSelf: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  padding: 1,
                  textAlign: "center",
                  fontWeight: "400",
                  color: "#fff",
                  fontSize: 10
                }}
              >
                {tag}
              </Text>
            </View>
            {avatar && (
              <Image
                source={{ uri: avatar }}
                resizeMode="contain"
                style={{
                  height: 50,
                  width: 50,
                  margin: 8,
                  borderRadius: 25,
                  backgroundColor: "#f8f8f8"
                }}
              />
            )}
          </View>
          <View style={{ alignSelf: "center", justifyContent: "center" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 210
              }}
            >
              <Text style={{ fontWeight: "600", color: TagColor }}>{name}</Text>
            </View>
            {description && (
              <Text
                style={{
                  height: 35,
                  fontSize: 12,
                  fontWeight: "300",
                  color: TagColor
                }}
              >
                {" "}
                {description}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

ContactItem.PropTypes = {
  key: PropTypes.number,
  onPressItem: PropTypes.function,
  seen: PropTypes.boolean,
  name: PropTypes.string,
  avatar: PropTypes.string,
  tag: PropTypes.string,
  createTagColor: PropTypes.boolean
};
ContactItem.DefaultProps = {
  selected: false,
  createTagColor: true
};

//============================================================================

class PagedCardsExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: MockTweetList
    };
    this.onPressDot = this.onPressDot.bind(this);

    this.AnimatedValue = new Animated.Value(0);
    this.viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 50,
        waitForInteraction: true
    };
  }
  _renderItem = ({ item }) => {
    return (
      <TweetItem
        index={item.id}
        id={item.id}
        onPressItem={this._onPressItem}
        title={item.title}
        city={item.city}
        type={item.type}
        color={item.color}
        description={item.description}
        image={item.image}
      />
    );
  };

  _keyExtractor = (item, index) => item.id;

  // REQUIRED for ReactNativePagination to work correctly
  onViewableItemsChanged = ({ viewableItems, changed }) => {
     this.setState({ viewableItems, changed });
  };

  onPressDot = item => console.log(" onPressDot:item ", item);

  componentWillReceiveProps(nextProps) {
    this.AnimatedValue.setValue(0);
  }

  render() {
    let loadingComponent = <Text style={[pcs.textStyle]}>Loading</Text>;
    return (
      <View style={[pcs.container]}>
        <FlatList
          horizontal
          pagingEnabled
          ref={r => (this.refs = r)}
          data={this.state.items}
          keyExtractor={this._keyExtractor} //map your keys to whatever unique ids the have (mine is a "id" prop)
          renderItem={this._renderItem}
          viewabilityConfig={this.viewabilityConfig}
        //   onViewableItemsChanged={this.onViewableItemsChanged.bind(this)} //need this
        />
        <AnterosPagination
          lightTheme
          horizontal
          refs={this.refs}
          showEndDot
          showStartDot
          pagingEnabled
          dotIconSizeActive={25}
          paginationVisibleItems={this.state.viewableItems} //needs to track what the user sees
          paginationItems={this.state.items} //pass the same list as data
          paginationItemPadSize={4} //num of items to pad above and bellow your visable items
        />
      </View>
    );
  }
}
const pcs = StyleSheet.create({
  textStyle: {
    color: "rgba(0,0,0,0.5)",
    textAlignVertical: "center",
    textAlign: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "grey" //<-- use with "dotThemeLight"
  },
  paginationDotStyle: {
    margin: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  }
});

let darkColor = "black";
let lightColor = "white";


//============================================================================

class TweetItem extends Component {
  render() {
    const {
      id,
      index,
      key,
      title,
      city,
      type,
      color,
      description,
      image
    } = this.props;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: color,
          opacity: 0.9,
          width,
          borderRadius: 5
        }}
      >
        <View
          style={{
            padding: 5,
            marginTop: 35,
            margin: 5,
            flexDirection: "row"
          }}
        >
          <Image
            style={s.profilePicture}
            source={{ height: 80, width: 80, uri: image }}
          />

          <Text style={[tis.displayName, { flex: 1 }]}>{title}</Text>
          <View style={[{ height: 20 }, tis.badgeSection]}>
            <View style={[tis.badgeSlug, { backgroundColor: "white" }]}>
              <Text style={[tis.badgeText, { color: "rgba(0,0,0,.6)" }]}>
                ({index}) in {city}
              </Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={tis.bodyText}>{description}</Text>
        </View>
        <View style={tis.reactionBox}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
              LayoutAnimation.easeInEaseOut();
            }}
          >
            <Text
              style={[
                tis.description,
                {
                  textShadowColor: darkColor
                },
                { color: darkColor }
              ]}
            >
              {description}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const tis = StyleSheet.create({
  bodyText: {
    fontSize: 32,
    color: "white",
    backgroundColor: "transparent",
    margin: 20
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  reactionBox: {
    flex: 1,
    justifyContent: "flex-end",
    margin: 40
  },
  description: {
    textAlign: "center",
    backgroundColor: "transparent",
    fontSize: 10,
    padding: 15,
    color: "white",
    textShadowRadius: 5,
    textShadowOffset: {
      width: 2,
      heigth: 2
    }
  },

  footerText: {
    textAlign: "center",
    backgroundColor: "transparent",
    color: "white",
    padding: 0
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent"
  },


  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    margin: 20,
    marginRight: 10
  },
  displayName: {
    backgroundColor: "transparent",
    color: "white",
    marginLeft: 0,
    marginTop: 22,

    fontSize: 20,
    marginBottom: 5
  },
  badgeSection: {
    top: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
    marginRight: 10,
    justifyContent: "center"
  },
  badgeSlug: {
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 12
  },
  badgeText: {
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold"
  }
});

TweetItem.PropTypes = {
  id: PropTypes.number,
  index: PropTypes.number,
  key: PropTypes.number,
  title: PropTypes.string,
  city: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
};

TweetItem.DefaultProps = {
  selected: false,
  createTagColor: true
};

//============================================================================

let ITEM_HEIGHT = 100;

class RobotsExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      activeId: null,
      activeItem: null,
      items: MockRobotsList
    };

    this.renderDot = this.renderDot.bind(this);
    this.getFlatListItems = this.getFlatListItems.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 50,
        waitForInteraction: true
    };
  }

  getFlatListItems() {
    this.setState({ isLoading: true });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setTimeout(
      function() {
        this.setState({ isLoading: false, items: MockRobotsList });
      }.bind(this),
      2000
    );
  }

  setItemAsActive(activeItem) {
    this.setState({ scrollToItemRef: activeItem });
    this.setState({ activeId: activeItem.index, activeItem: activeItem.item });
  }
  renderItem(o, i) {
    return (
      <View
        style={{
          flex: 1,
          height,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TouchableOpacity
          onPress={() => this.setItemAsActive(o)}
          style={[
            res.renderItem,
            this.state.activeId === _.get(o, "item.id", false)
              ? { backgroundColor: "#01a699" }
              : { backgroundColor: "#ff5b5f" }
          ]}
        >
          <AnterosImage
            resizeMode="center"
            style={res.image}
            source={{
              uri: `https://robohash.org/${o.item.name}?size=350x350&set=set1`
            }}
          />
          <AnterosText
            style={[
              res.name,
              this.state.activeId === o.item.id
                ? { color: "#01a699" }
                : { color: "#ff5b5f" }
            ]}
          >
            {o.item.name ? o.item.name : "no name attrabute"}
          </AnterosText>
        </TouchableOpacity>
      </View>
    );
  }

  clearList() {
    this.setState({ items: [] });
  }
  onEndReached(o) {
    console.log(" reached end: ", o);
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
     this.setState({ viewableItems, changed });
  };

  renderDot(o, i) {
    let dotComponent = (
      <Animated.Image
        source={{
          uri: `https://robohash.org/${_.get(
            o,
            "item.name",
            "default"
          )}?size=350x350&set=set1`
        }}
        style={{
          backgroundColor: "rgba(0,0,0,0.1)",
          width: o.isViewable ? 30 : 15,
          height: o.isViewable ? 30 : 15,
          opacity: o.isViewable ? 1 : 0.5,
          borderRadius: o.isViewable ? 15 : 7.5
        }}
      />
    );

    return (
      <AnterosPaginationDot
        onPress={() => {
          try {
            this.refs.scrollToItem(o);
          } catch (e) {
            console.log(" e: ", e);
          }
        }}
        dotComponent={dotComponent}
        isViewable={o.isViewable}
        size={o.isViewable ? 20 : 15}
        textStyle={{ color: "rgba(0,0,0,0.6)", fontSize: 8, width, margin: 5 }}
        text={_.get(o, "item.name", "").split(" ")[0]}
        style={{
          margin: 1,
          marginBottom: 5,
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center"
        }}
      />
    );
  }

  render() {
    const ListEmptyComponent = () => {
      return (
        <View
          style={{
            flex: 1,
            height,
            width,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity onPress={() => this.getFlatListItems()}>
            <Text
              style={{
                color: "rgba(0,0,0,0.5)",
                fontSize: 20,
                textAlign: "center",
                margin: 10
              }}
            >
              Nothing is Here!
            </Text>
            <Text
              style={{
                color: "rgba(0,0,0,0.5)",
                fontSize: 15,
                textAlign: "center"
              }}
            >
              Try Again?
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View style={[res.container]}>
        <View style={res.innerContainer}>
          {!this.state.activeItem && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1
              }}
            >
              <Text
                style={{
                  textAlignVertical: "center",
                  color: "rgba(0,0,0,.4)",
                  textAlign: "center",
                  fontWeight: "400",
                  fontSize: 15
                }}
              >
                Make a Selection!
              </Text>
            </View>
          )}

          {this.state.activeItem && (
            <TouchableOpacity
              onPress={() => this.setItemAsActive(o)}
              style={[res.renderItem, res.activeItem]}
            >
              <Image
                resizeMode="center"
                style={res.image}
                source={{
                  uri: `https://robohash.org/r${_.get(
                    this.state.activeItem,
                    "name",
                    "default"
                  )}?size=350x350&set=set1`
                }}
              />
              <Text style={[res.name, { color: "#fff" }]}>
                {_.get(this.state.activeItem, "name", "No Default")}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => this.clearList()}
            style={res.trashButton}
          >
            <Ionicons
              name={"ios-trash-outline"}
              size={25}
              color="rgba(0,0,0,0.5)"
            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, height, width }}>
          <FlatList
            ListEmptyComponent={ListEmptyComponent}
            horizontal
            ref={r => (this.refs = r)}
            getItemLayout={(data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index
            })}
            onRefresh={o => alert("onRefresh:", o)}
            initialScrollIndex={0}
            refreshing={this.state.isLoading}
            onEndReached={o => this.onEndReached}
            keyExtractor={(o, i) => o.key}
            data={this.state.items}
            scrollRenderAheadDistance={width * 2}
            renderItem={this.renderItem}
            viewabilityConfig={this.viewabilityConfig}
            // onViewableItemsChanged={this.onViewableItemsChanged.bind(this)}
          />
          <TouchableOpacity
            onPress={() => this.clearList()}
            style={{
              position: "absolute",
              backgroundColor: "ff5b5f",
              right: 35,
              top: 0,
              margin: 10,
              zIndex: 3,
              height: 35,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent"
            }}
          >
            <Ionicons
              name={"ios-refresh-outline"}
              size={25}
              color="rgba(0,0,0,0.5)"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.clearList()}
            style={{
              position: "absolute",
              backgroundColor: "ff5b5f",
              right: 0,
              top: 0,
              margin: 10,
              zIndex: 3,
              height: 35,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent"
            }}
          >
            <Ionicons
              name={"ios-trash-outline"}
              size={25}
              color="rgba(0,0,0,0.5)"
            />
          </TouchableOpacity>

          <AnterosPagination
            horizontal
            refs={this.refs}
            pagingEnabled
            renderDot={this.renderDot}
            dotIconSizeActive={25}
            paginationVisibleItems={this.state.viewableItems} //needs to track what the user sees
            paginationItems={this.state.items} //pass the same list as data
            paginationItemPadSize={2} //num of items to pad above and bellow your visable items
          />
        </View>
      </View>
    );
  }
}

const res = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  innerContainer: {
    flex: 1,
    height,
    width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#01a699"
  },
  text: {
    fontWeight: "600",
    fontSize: 100,
    textAlignVertical: "center",
    textAlign: "center"
  },
  renderItem: {
    width: ITEM_HEIGHT,
    borderColor: "rgba(0,0,0,.3)",
    shadowColor: "rgba(0,0,0,.3)",
    height: ITEM_HEIGHT,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 3,
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 0.8
  },
  activeItem: {
    borderColor: "rgba(255,255,255,1)",
    backgroundColor: "#f5fcff",
    shadowColor: "rgba(255,255,255,1)"
  },
  name: {
    position: "absolute",
    bottom: -34,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    fontSize: 12,
    width: 100,
    textAlign: "center",
    fontWeight: "600"
  },
  trashButton: {
    position: "absolute",
    backgroundColor: "#ff5b5f",
    right: 0,
    bottom: 0,
    margin: 10,
    zIndex: 3,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 48
  }
});

//============================================================================


class RobotItem extends Component {
  render() {
    const { key, image, title, color, description, type, city } = this.props;
    console.log(" key: ", key);

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: color,
          opacity: 0.9,
          width,
          borderRadius: 5
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            style={ris.profilePicture}
            source={{ height: 80, width: 80, uri: image }}
          />

          <Text style={ris.displayName}>{title}</Text>
          <View style={ris.badgeSection}>
            <View style={[ris.badgeSlug, { backgroundColor: "white" }]}>
              <Text style={[ris.badgeText, { color: "red" }]}>ff{city}</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={ris.bodyText}>{description}</Text>
        </View>
        <View style={ris.reactionBox}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
              LayoutAnimation.easeInEaseOut();
            }}
          >
            <Text
              style={[
                ris.description,
                {
                  textShadowColor: darkColor
                }
              ]}
            >
              {city}- {description}
            </Text>
          </TouchableHighlight>
          <Text style={[ris.footerText, { color: darkColor }]}>
            {description}
          </Text>
        </View>
      </View>
    );
  }
}

const ris = StyleSheet.create({
  bodyText: {
    fontSize: 32,
    color: "white",
    backgroundColor: "transparent",
    margin: 20
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  reactionBox: {
    flex: 1,
    justifyContent: "flex-end",
    margin: 40
  },
  description: {
    textAlign: "center",
    backgroundColor: "transparent",
    fontSize: 10,
    padding: 15,
    color: "white",
    textShadowRadius: 10,
    textShadowOffset: {
      width: 5,
      heigth: 5
    }
  },

  footerText: {
    textAlign: "center",
    backgroundColor: "transparent",
    color: "white",
    padding: 0
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent"
  },

  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    margin: 20,
    marginRight: 10
  },
  displayName: {
    backgroundColor: "transparent",
    color: "white",
    marginLeft: 0,
    marginTop: 22,

    fontSize: 20,
    marginBottom: 5
  },
  badgeSection: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 20,
    justifyContent: "center"
  },
  badgeSlug: {
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 12
  },
  badgeText: {
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold"
  }
});

RobotItem.PropTypes = {
  key: PropTypes.number,
  index: PropTypes.number,
  name: PropTypes.string,
  avatar: PropTypes.string,
  group: PropTypes.string,
  email: PropTypes.string
};
RobotItem.DefaultProps = {
  selected: false,
  createTagColor: true
};

