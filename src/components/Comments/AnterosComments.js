import React, { PureComponent } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TextInput,
  Modal,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native'
const screen = Dimensions.get("screen");
import PropTypes from 'prop-types'
import {AnterosTimeAgo} from '../Calendar/AnterosTimeAgo'
import {AnterosIcon} from '../Icon/AnterosIcon';
import {AnterosCollapsible} from '../Collapsible/AnterosCollapsible'
import {AnterosText} from '../Text/AnterosText';
import {AnterosImage} from '../Image/AnterosImage';

export class AnterosComment extends PureComponent {

  constructor (props) {
    super(props)

    this.handleReport = this.handleReport.bind(this)
    this.handleReply = this.handleReply.bind(this)
    this.handleLike = this.handleLike.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleUsernameTap = this.handleUsernameTap.bind(this)
    this.handleLikesTap = this.handleLikesTap.bind(this)
  }

  handleReport(){
    this.props.reportAction(this.props.data)
  }
  handleReply(){
    this.props.replyAction(this.props.data)
  }
  handleLike(){
    this.props.likeAction(this.props.data)
  }
  handleEdit(){
    this.props.editComment(this.props.data)
  }
  handleUsernameTap(){
    this.props.usernameTapAction(this.props.username)
  }
  handleLikesTap(){
    this.props.likesTapAction(this.props.data)
  }

  render () {
    return (
      <View style={styles.commentContainer}>
        <View style={styles.left}>
          <TouchableHighlight onPress={this.handleUsernameTap}>
            <View style={{alignItems: 'center'}}>
              <AnterosImage
                style={[styles.image, {width: 30, height: 30, borderRadius: 15}]}
                source={{uri: this.props.image}}/>
              {this.props.likesNr ? <TouchableHighlight style={[styles.actionButton, {paddingTop: 5}]}
                                                        onPress={ this.handleLikesTap}>
                <View style={{flexDirection: 'row'}}>
                  <AnterosIcon name='heart' type="font-awesome" color={'#df1740'} size={15}/>
                  <AnterosText style={styles.likeNr}> {this.props.likesNr}</AnterosText>
                </View>
              </TouchableHighlight> : null}
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.right}>
          <View style={styles.rightContent}>
            <View style={styles.rightContentTop}>
              <TouchableHighlight onPress={this.handleUsernameTap}>
                <AnterosText style={styles.name}>{this.props.username}</AnterosText>
              </TouchableHighlight>

              {this.props.canEdit ? <TouchableHighlight
                style={styles.editIcon}
                onPress={this.handleEdit}>
                <AnterosIcon name='edit' type="font-awesome" size={15}/>
              </TouchableHighlight> : null}
            </View>
            <AnterosText style={styles.body}>{this.props.body}</AnterosText>
          </View>
          <View style={styles.rightActionBar}>
            <AnterosTimeAgo style={styles.time} time={this.props.updatedAt}/>
            <TouchableHighlight style={styles.actionButton}
                                onPress={this.handleLike }>
              <View style={{flexDirection: 'row'}}>
                <AnterosText style={[styles.actionText, {color: this.props.liked ? '#4DB2DF' : null}]}>Like </AnterosText>

              </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.actionButton} onPress={this.handleReply}>
              <AnterosText style={styles.actionText}>Reply</AnterosText>
            </TouchableHighlight>
            <TouchableHighlight style={styles.actionButton} onPress={this.handleReport}>
              {this.props.reported ? <AnterosText style={{fontStyle: 'italic', fontSize: 11,}}>Reported</AnterosText>
                : <AnterosText style={styles.actionText}>Report</AnterosText>}
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}

AnterosComment.propTypes = {
  data: PropTypes.object,
  body: PropTypes.string,
  canEdit: PropTypes.bool,
  child: PropTypes.bool,
  editComment: PropTypes.func,
  image: PropTypes.string,
  likeAction: PropTypes.func,
  liked: PropTypes.bool,
  likesNr: PropTypes.number,
  likesTapAction: PropTypes.func,
  replyAction: PropTypes.func,
  reportAction: PropTypes.func,
  reported: PropTypes.bool,
  updatedAt: PropTypes.string,
  username: PropTypes.string,
  usernameTapAction: PropTypes.func
}


const styles = StyleSheet.create({
    commentContainer: {
      paddingRight: 5,
      marginBottom: 10,
      flexDirection: 'row'
    },
    left: {
      padding: 5
    },
    image: {
      height: 30,
      width: 30,
      borderRadius: 15
    },
    right: {
      flex: 1,
    },
    rightContent: {
      borderRadius: 10,
      padding: 5,
      backgroundColor: '#f1f3f6'
    },
    rightContentTop: {
      flexDirection: 'row'
    },
  
    name: {
      fontWeight: 'bold',
      paddingBottom: 5
    },
    editIcon: {
      flex: 1,
      alignItems: 'flex-end',
    },
    body: {
      paddingBottom: 10
    },
    rightActionBar: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    time: {
      fontSize: 12,
      paddingLeft: 5,
      color: '#9B9B9B',
      fontStyle: 'italic'
    },
    actionText: {
      color: '#9B9B9B',
      fontWeight: 'bold'
    },
    repliedSection: {
      paddingTop: 15,
      paddingBottom: 20,
      width: 150,
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
    repliedImg: {
      height: 20,
      width: 20,
      borderRadius: 10
    },
    repliedUsername: {
      color: '#9B9B9B'
    },
    repliedText: {
      color: '#9B9B9B',
    },
    repliedCount: {
      color: '#9B9B9B',
      fontSize: 11
    },
    inputSection: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    submit: {
      padding: 10,
    },
    input: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
      color: '#424242',
    },
    likeNr: {
      fontWeight: 'normal',
      fontSize: 12
    },
    likeHeader: {
      textAlign: 'center',
      padding: 10,
      marginTop: 30,
      fontWeight: 'bold'
  
    },
    likeButton: {
      margin: 10,
      alignItems: 'center',
  
    },
    likeContainer: {
      padding: 10,
      width: 200,
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
  
    },
    likeImage: {
      width: 30,
      height: 30,
      borderRadius: 15
    },
    likename: {
      fontWeight: 'bold',
      fontSize: 14
    },
    editModalContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    editModal: {
      backgroundColor: "white",
      width: 400,
      height: 300,
      borderWidth: 2,
      borderColor: "silver"
    },
    editButtons:{
      flexDirection:"row",
      justifyContent: "space-around",
      height: 40,
      width: 80,
      paddingLeft: 5,
      paddingRight: 5,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "silver",
      borderRadius: 5,
      margin: 10
  
    }
  
  })







export class AnterosComments extends PureComponent {
  constructor(props) {
    super(props);
    this.bookmark = null;
    this.props = props;
    this.state = {
      loadingComments: props.data && props.data.length ? false : true,
      likesModalVisible: false,
      likesModalData: null,
      editModalVisible: false,
      commentsLastUpdated: null,
      expanded: [],
      pagination: []
    };
    this.newCommentText = null;
    this.replyCommentText = null;
    this.editCommentText = null;
    this.editingComment = null;
    this.textInputs = [];
    this.renderComment = this.renderComment.bind(this);

    this.handleReport = this.handleReport.bind(this);
    this.handleReply = this.handleReply.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleUsernameTap = this.handleUsernameTap.bind(this);
    this.handleLikesTap = this.handleLikesTap.bind(this);
    this.handleEditAction = this.handleEditAction.bind(this);
    this.renderLike = this.renderLike.bind(this);
  }

  setLikesModalVisible(visible) {
    this.setState({ likesModalVisible: visible });
  }

  setEditModalVisible(visible) {
    this.setState({ editModalVisible: visible });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        commentsLastUpdated: new Date().getTime(),
        loadingComments: false
      });
    }
  }

  isExpanded(id) {
    return this.state.expanded.indexOf(id) !== -1;
  }

  toggleExpand(c, focus) {
    const id = this.props.keyExtractor(c);
    let expanded = this.state.expanded;

    let index = expanded.indexOf(id);

    if (index === -1) {
      expanded.push(id);
    } else {
      expanded.splice(index, 1);
    }
    this.forceUpdate();
    this.setState({ expanded: expanded });
    if (focus && index === -1) {
      this.focusOnReplyInput(id);
    }
  }

  handleReport(c) {
    this.props.reportAction(c);
  }

  focusOnReplyInput(id) {
    console.log(id);
    let input = this.textInputs["input" + id];

    input.measure((x, y, width, height, pageX, pageY) => {
      console.log(pageY);
      input.focus();
      this.props.replyAction(pageY);
    });
  }

  handleReply(c) {
    if (!this.props.isChild(c)) {
      this.toggleExpand(c, true);
    } else {
      this.focusOnReplyInput(this.props.parentIdExtractor(c));
    }
  }

  handleLike(c) {
    this.props.likeAction(c);
  }

  handleEdit(c) {
    this.editCommentText = this.props.bodyExtractor(c);
    this.editingComment = c;
    this.setEditModalVisible(!this.state.editModalVisible);
  }

  handleUsernameTap(username) {
    this.props.usernameTapAction(username);
  }

  handleLikesTap(c) {
    this.setState({ likesModalData: this.props.likesExtractor(c) });
    this.setLikesModalVisible(!this.state.likesModalVisible);
  }

  handleEditAction(c) {
    this.props.editAction(this.editCommentText, c);
  }

  /**
   *
   * Generates a single comment
   * */
  generateComment(c) {
    return (
      <AnterosComment
        data={c}
        id={this.props.keyExtractor(c)}
        usernameTapAction={this.handleUsernameTap}
        username={this.props.usernameExtractor(c)}
        body={this.props.bodyExtractor(c)}
        likesNr={this.props.likesExtractor(c).length}
        canEdit={this.canUserEdit(c)}
        updatedAt={this.props.editTimeExtractor(c)}
        replyAction={this.handleReply}
        image={this.props.imageExtractor(c)}
        child={true}
        reportAction={this.handleReport}
        liked={this.props.likeExtractor(c)}
        reported={this.props.reportedExtractor(c)}
        likeAction={this.handleLike}
        editAction={this.handleEditAction}
        editComment={this.handleEdit}
        likesTapAction={this.handleLikesTap}
      />
    );
  }

  /**
   * Renders comments children
   * */
  renderChildren(items) {
    if (!items || !items.length) return;
    let self = this;
    return items.map(function(c) {
      return (
        <View key={self.props.keyExtractor(c) + "" + Math.random()}>
          {self.generateComment(c)}
        </View>
      );
    });
  }

  /**
   * Returns last child id
   * */
  getLastChildCommentId(item) {
    if (!item) return;
    const items = item[this.props.childPropName];
    return this.props.keyExtractor(items[items.length - 1]);
  }

  /**
   * Returns first child id
   * */
  getFirstChildCommentId(item) {
    if (!item) return;
    const items = item[this.props.childPropName];

    return this.props.keyExtractor(items[0]);
  }

  /**
   * Does a pagination action
   * */
  paginate(fromCommentId, direction, parentCommentId) {
    this.setState({ loadingComments: true });
    this.props.paginateAction(fromCommentId, direction, parentCommentId);
  }

  /**
   * Can user edit a comment
   * */
  canUserEdit(item) {
    if (this.props.viewingUserName == this.props.usernameExtractor(item)) {
      if (!this.props.editMinuteLimit) return true;
      let created =
        new Date(this.props.createdTimeExtractor(item)).getTime() / 1000;
      return (
        new Date().getTime() / 1000 - created < this.props.editMinuteLimit * 60
      );
    }
    return false;
  }

  renderLike(l) {
    let like = l.item;
    return (
      <TouchableHighlight
        onPress={() => {
          this.setLikesModalVisible(false), like.tap(like.name);
        }}
        style={styles.likeButton}
        key={like.user_id}
      >
        <View style={[styles.likeContainer]}>
          <AnterosImage style={[styles.likeImage]} source={{ uri: like.image }} />
          <AnterosText style={[styles.likeName]}>{like.name}></AnterosText>
        </View>
      </TouchableHighlight>
    );
  }

  /**
   * Renders a comment with pagination
   * */
  renderComment(c) {
    const item = c.item;
    return (
      <View>
        {this.generateComment(item)}
        <View style={{ marginLeft: 40 }}>
          {item.childrenCount ? (
            <TouchableHighlight onPress={() => this.toggleExpand(item)}>
              <View style={styles.repliedSection}>
                <AnterosImage
                  style={styles.repliedImg}
                  source={{
                    uri: this.props.imageExtractor(
                      item[this.props.childPropName][0]
                    )
                  }}
                />
                <AnterosText style={styles.repliedUsername}>
                  {" "}
                  {this.props.usernameExtractor(
                    item[this.props.childPropName][0]
                  )}{" "}
                </AnterosText>
                <AnterosText style={styles.repliedText}>replied</AnterosText>
                <AnterosText style={styles.repliedCount}>
                  {" "}
                  * {this.props.childrenCountExtractor(item)}
                  {this.props.childrenCountExtractor(item) > 1
                    ? " replies"
                    : " reply"}
                </AnterosText>
              </View>
            </TouchableHighlight>
          ) : null}
          <AnterosCollapsible
            easing={"easeOutCubic"}
            duration={400}
            collapsed={!this.isExpanded(this.props.keyExtractor(item))}
          >
            {this.props.childrenCountExtractor(item) ? (
              <View>
                {this.props.childrenCountExtractor(item) >
                item[this.props.childPropName].length ? (
                  <TouchableHighlight
                    onPress={() =>
                      this.paginate(
                        this.getFirstChildCommentId(item),
                        "down",
                        this.props.keyExtractor(item)
                      )
                    }
                  >
                    <AnterosText style={{ textAlign: "center", paddingTop: 15 }}>
                      Show previous...
                    </AnterosText>
                  </TouchableHighlight>
                ) : null}

                {this.renderChildren(
                  item[this.props.childPropName],
                  this.props.keyExtractor(item)
                )}

                {this.props.childrenCountExtractor(item) >
                item[this.props.childPropName].length ? (
                  <TouchableHighlight
                    onPress={() =>
                      this.paginate(
                        this.getLastChildCommentId(item),
                        "up",
                        this.props.keyExtractor(item)
                      )
                    }
                  >
                    <AnterosText style={{ textAlign: "center", paddingTop: 15 }}>
                      Show more...
                    </AnterosText>
                  </TouchableHighlight>
                ) : null}
              </View>
            ) : null}
            <View style={styles.inputSection}>
              <TextInput
                ref={input =>
                  (this.textInputs[
                    "input" + this.props.keyExtractor(item)
                  ] = input)
                }
                style={styles.input}
                multiline={true}
                onChangeText={text => (this.replyCommentText = text)}
                placeholder={"Write comment"}
                numberOfLines={3}
              />
              <TouchableHighlight
                onPress={() => {
                  this.props.saveAction(
                    this.replyCommentText,
                    this.props.keyExtractor(item)
                  );
                  this.replyCommentText = null;
                  this.textInputs[
                    "input" + this.props.keyExtractor(item)
                  ].clear();
                }}
              >
                <AnterosIcon
                  iconStyle={styles.submit}
                  type="font-awesome"
                  name="caret-right"
                  size={40}
                  color="#000"
                />
              </TouchableHighlight>
            </View>
          </AnterosCollapsible>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            ref={input => (this.textInputs["inputMain"] = input)}
            multiline={true}
            onChangeText={text => (this.newCommentText = text)}
            placeholder={"Write comment"}
            numberOfLines={3}
          />
          <TouchableHighlight
            onPress={() => {
              this.props.saveAction(this.newCommentText, false);
              this.newCommentText = null;
              this.textInputs["inputMain"].clear();
            }}
          >
            <AnterosIcon
              iconStyle={styles.submit}
              name="caret-right"
              type="font-awesome"
              size={40}
              color="#000"
            />
          </TouchableHighlight>
        </View>
        {!this.state.loadingComments && !this.props.data ? (
          <AnterosText style={{ textAlign: "center" }}>No comments yet</AnterosText>
        ) : null}

        {!this.state.loadingComments && this.props.data ? (
          <TouchableHighlight
            onPress={() => {
              this.paginate(
                this.props.keyExtractor(this.props.data[0]),
                "down"
              );
            }}
          >
            <View>
              <AnterosText style={{ textAlign: "center" }}>Show previous</AnterosText>
            </View>
          </TouchableHighlight>
        ) : null}
        {/*Comments*/}
        {this.props.data ? (
          <FlatList
            style={{ backgroundColor: "white" }}
            data={this.props.data}
            extraData={this.state.commentsLastUpdated}
            initialNumToRender={this.props.initialDisplayCount}
            keyExtractor={item => this.props.keyExtractor(item)}
            renderItem={this.renderComment}
          />
        ) : null}

        {this.state.loadingComments ? (
          <View
            style={{
              position: "absolute",
              zIndex: 10,
              bottom: 0,
              height: 60,
              backgroundColor: "rgba(255,255,255, 0.9)"
            }}
          >
            <ActivityIndicator
              animating={true}
              style={{
                height: 50,
                width: screen.width,
                alignItems: "center",
                justifyContent: "center"
              }}
              size="small"
            />
          </View>
        ) : null}

        {!this.state.loadingComments && this.props.data ? (
          <TouchableHighlight
            style={{ height: 70 }}
            onPress={() => {
              this.paginate(
                this.props.keyExtractor(
                  this.props.data[this.props.data.length - 1]
                ),
                "up"
              );
            }}
          >
            <AnterosText style={{ textAlign: "center" }}>Show more</AnterosText>
          </TouchableHighlight>
        ) : null}

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.likesModalVisible}
          onRequestClose={() => {
            this.setLikesModalVisible(false);
          }}
        >
          <TouchableHighlight
            onPress={() => this.setLikesModalVisible(false)}
            style={{
              position: "absolute",
              width: 100,
              zIndex: 9,
              alignSelf: "flex-end",
              top: 10
            }}
          >
            <View style={{ position: "relative", left: 50, top: 5 }}>
              <AnterosIcon name="times" type="font-awesome" size={40} />
            </View>
          </TouchableHighlight>
          <AnterosText style={styles.likeHeader}>Users that liked the comment</AnterosText>
          {this.state.likesModalVisible ? (
            <FlatList
              initialNumToRender="10"
              keyExtractor={item => item.like_id}
              data={this.state.likesModalData}
              renderItem={this.renderLike}
            />
          ) : null}
        </Modal>

        <Modal
          animationType={"slide"}
          onShow={() => {
            this.textInputs["editCommentInput"].focus();
          }}
          transparent={true}
          visible={this.state.editModalVisible}
          onRequestClose={() => {
            this.setEditModalVisible(false);
            this.setState({ editModalData: null });
          }}
        >
          <View style={styles.editModalContainer}>
            <View style={styles.editModal}>
              <TextInput
                ref={input => (this.textInputs["editCommentInput"] = input)}
                style={styles.input}
                multiline={true}
                defaultValue={this.editCommentText}
                onChangeText={text => (this.editCommentText = text)}
                placeholder={"Edit comment"}
                numberOfLines={3}
              />
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableHighlight
                  onPress={() => this.setEditModalVisible(false)}
                >
                  <View style={styles.editButtons}>
                    <AnterosText>Cancel</AnterosText>
                    <AnterosIcon name="times" type="font-awesome" size={20} />
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    this.props.editAction(
                      this.editCommentText,
                      this.editingComment
                    );
                    this.setEditModalVisible(!this.state.editModalVisible);
                  }}
                >
                  <View style={styles.editButtons}>
                    <AnterosText>Save</AnterosText>
                    <AnterosIcon name="send" type="font-awesome" size={20} />
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

AnterosComments.propTypes = {
  data: PropTypes.array.isRequired,
  viewingUserName: PropTypes.string,
  initialDisplayCount: PropTypes.number,
  editMinuteLimit: PropTypes.number,
  usernameTapAction: PropTypes.func.isRequired,
  childPropName: PropTypes.string.isRequired,
  isChild: PropTypes.func.isRequired,
  keyExtractor: PropTypes.func.isRequired,
  parentIdExtractor: PropTypes.func.isRequired,
  usernameExtractor: PropTypes.func.isRequired,
  editTimeExtractor: PropTypes.func.isRequired,
  createdTimeExtractor: PropTypes.func.isRequired,
  bodyExtractor: PropTypes.func.isRequired,
  imageExtractor: PropTypes.func.isRequired,
  likeExtractor: PropTypes.func.isRequired,
  reportedExtractor: PropTypes.func.isRequired,
  likesExtractor: PropTypes.func.isRequired,
  childrenCountExtractor: PropTypes.func.isRequired,
  replyAction: PropTypes.func.isRequired,
  saveAction: PropTypes.func.isRequired,
  editAction: PropTypes.func.isRequired,
  reportAction: PropTypes.func.isRequired,
  likeAction: PropTypes.func.isRequired,
  paginateAction: PropTypes.func.isRequired
};