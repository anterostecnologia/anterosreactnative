import { Component } from 'react'
import {
  ScrollView,
  StyleSheet, PixelRatio,
  Modal,
  Image
} from 'react-native'

import moment from 'moment'
import {AnterosNavigationPage, AnterosText, AnterosComment, AnterosComments, AnterosImage} from 'anteros-react-native';
const sampleCommentsRaw = require('./data/sampleComments')

sampleCommentsRaw.forEach(c => {
  if (c.children) {
    c.childrenCount = c.children.length
  }
})

const sampleComments = Object.freeze(sampleCommentsRaw)



function getComments () {
  const c = [...sampleComments]
  return c.splice(c.length - 5)
}

function paginateComments (comments, from_commentId, direction, parent_commentId) {
  const c = [...sampleComments]
  if (!parent_commentId) {
    const lastIndex = sampleComments.findIndex((c) => {
      return c.commentId == from_commentId
    })
    if (direction == 'up') {
      comments = comments.concat(c.splice(lastIndex + 1, 5))
    } else {
      let start = lastIndex - 6 > 1 ? lastIndex - 6 : 0
      let part = c.slice(start, lastIndex)
      console.log(start, lastIndex)
      comments = [...part, ...comments]
    }
  } else {
    const parentLastIndexDB = sampleComments.findIndex((c) => c.commentId == parent_commentId)
    const children = c[parentLastIndexDB].children
    const target = children.findIndex((c) => c.commentId == from_commentId)
    const existingIndex = comments.findIndex((c) => c.commentId == parent_commentId)

    if (direction == 'up') {
      const append = children.slice(target + 1, 5)
      comments[existingIndex].children.concat(append)
    } else {
      let start = target - 6 >= 0 ? target : 0
      const prepend = children.slice(start - 6, target)
      comments[existingIndex].children = [...prepend, ...comments[existingIndex].children]
    }

  }
  return comments
}

function like (comments, cmnt) {
  if (!cmnt.parentId) {
    //add result to comments
    if (comments) {
      comments.find(function (c) {
        if (c.commentId === cmnt.commentId) {
          c.liked = !c.liked
          return true
        }
      })
    }
  } else {
    comments.find(function (c) {
      if (c.children) {
        let isItFound = false
        c.children.find(function (child) {

          if (child.commentId === cmnt.commentId) {
            child.liked = !child.liked
            isItFound = true
          }
        })
        return isItFound
      }
    })
  }
  return comments
}

function edit (comments,  cmnt, text) {
  if (!cmnt.parentId) {
    //add result to comments
    if (comments) {
      comments.find(function (c) {
        if (c.commentId === cmnt.commentId) {
          c.body = text
          return true
        }
      })
    }
  } else {
    comments.find(function (c) {
      if (c.children) {
        let isItFound = false
        c.children.find(function (child) {
          if (child.commentId === cmnt.commentId) {
            child.body = text
            isItFound = true
          }
        })
        return isItFound
      }
    })
  }
  return comments
}

function save (comments, text, parentCommentId, date, username) {
  //find last comment id
  let lastCommentId = 0;
  sampleComments.forEach(c=>{
    if(c.commentId > lastCommentId){
      lastCommentId = c.commentId
    }
    if(c.children){
      c.children.forEach(c2=>{
        if(c2.commentId > lastCommentId){
          lastCommentId = c2.commentId
        }
      })
    }
  })
  let com = {
    "parentId": null,
    "commentId": lastCommentId+1,
    "created_at": date,
    "updated_at": date,
    "liked": false,
    "reported": false,
    "email": username,
    "body" : text,
    "likes": []
  }

  if (!parentCommentId) {
    comments.push(com);
  } else {
    comments.find(function (c) {
      if(c.commentId === parentCommentId){
        com.parentId = c.commentId;
        if(c.children){
          c.childrenCount = c.childrenCount+ 1
          c.children.push(com)
        }else{
          c.childrenCount = 1
          c.children = [com]
        }
        return true
      }
    }, this)
  }
  console.log(3, comments);
  return comments
}

function report (comments, cmnt) {
  if (!cmnt.parentId) {
    //add result to comments
    comments.find(function (c) {
      if (c.commentId === cmnt.commentId) {
        c.reported = true
        return true
      }
    })
  } else {
    comments.find(function (c) {
      if (c.children) {
        let isItFound = false
        c.children.find(function (child) {
          if (child.commentId === cmnt.commentId) {
            child.reported = true
            isItFound = true
          }
        })
        return isItFound
      }
    })
  }
  return comments
}



export class CommentsExample extends AnterosNavigationPage {

    static defaultProps = {
      ...AnterosNavigationPage.defaultProps,
      title: 'Comments',
      showBackButton: true
    };

    constructor (props) {
      super(props)
      this.props = props
      this.actions = {getComments,paginateComments,like,edit,save,report};
      this.state = {
        comments: [],
        loadingComments: true,
        lastCommentUpdate: null,
        review: props.review ? props.review : null,
        login: null,
        id: props.id
      }
  
      this.scrollIndex = 0
  
    }
  
    static navigatorStyle = {}
  
    UNSAFE_componentWillMount(){
      const c = this.actions.getComments();
      this.setState({
        comments : c,
        loadingComments: false,
        lastCommentUpdate: new Date().getTime()
      })
    }
  
  
    extractUsername (c) {
      try {
        return c.email  !== '' ? c.email : null
      } catch (e) {
        console.log(e)
      }
    }
  
    extractBody (c) {
      try {
        return c.body && c.body !== '' ? c.body : null
      } catch (e) {
        console.log(e)
      }
    }
  
    extractImage (c) {
  
      try {
        return c.image_id && c.user.image_id !== '' ? c.user.image_id
          : 'https://randomuser.me/api/portraits/women/63.jpg'
  
      } catch (e) {
        console.log(e)
      }
    }
  
    extractChildrenCount (c) {
      try {
        return c.childrenCount || 0
      } catch (e) {
        console.log(e)
      }
    }
  
    extractEditTime (item) {
      try {
        return item.updated_at
      } catch (e) {
        console.log(e)
      }
    }
  
    extractCreatedTime (item) {
      try {
        return item.created_at
      } catch (e) {
        console.log(e)
      }
    }
  
    likeExtractor (item) {
      return item.liked
    }
  
    reportedExtractor (item) {
      return item.reported
    }
  
    likesExtractor (item) {
  
      return item.likes.map((like) => {
        return {
          image: like.image,
          name: like.username,
          user_id: like.user_id,
          tap: (username) => {
            console.log('Taped: '+username)
          }
        }
      })
  
    }
  
    isCommentChild(item){
      return  item.parentId !== null
    }
  
    renderPage () {
      const review = this.state.review
      const data = this.state.comments
  
      return (
        /*
        * They should add scroll to end on save action
        *They should not update comments if there are modals opened
        *
        * */
        <ScrollView style={styles.container}
  
                    onScroll={(event) => {
                      this.scrollIndex = event.nativeEvent.contentOffset.y
                    }}
                    ref={'scrollView'}>
          <AnterosImage style={{height: 200}}
                 source={{uri: 'https://source.unsplash.com/VLKvzQQiR3o/400x400' }}/>
  
          {this.state.comments.length ? <AnterosComments
            data={data}
            //To compare is user the owner
            viewingUserName={'Lisa'}
            //how many comments to display on init
            initialDisplayCount={5}
            //How many minutes to pass before locking for editing
            editMinuteLimit={0}
  
            //What happens when user taps on username or photo
            usernameTapAction={(username) => {
              console.log('Taped user: '+username)
            }}
            //Where can we find the children within item.
            //Children must be prepared before for pagination sake
            childPropName={'children'}
            isChild={(item) =>this.isCommentChild(item)}
            //We use this for key prop on flat list (i.e. its comment_id)
            keyExtractor={item => item.commentId}
            //Extract the key indicating comments parent
            parentIdExtractor={item=>item.parentId}
            //what prop holds the comment owners username
            usernameExtractor={item => this.extractUsername(item)}
            //when was the comment last time edited
            editTimeExtractor={item => this.extractEditTime(item)}
            //When was the comment created
            createdTimeExtractor={item => this.extractCreatedTime(item)}
            //where is the body
            bodyExtractor={item => this.extractBody(item)}
            //where is the user image
            imageExtractor={item => this.extractImage(item)}
            //Where to look to see if user liked comment
            likeExtractor={item => this.likeExtractor(item)}
            //Where to look to see if user reported comment
            reportedExtractor={item => this.reportedExtractor(item)}
            //Where to find array with user likes
            likesExtractor={item => this.likesExtractor(item)}
            //Where to get nr of replies
            childrenCountExtractor={item => this.extractChildrenCount(item)}
  
            //what to do when user clicks reply. Usually its header height + position (b/c scroll list heights are relative)
            replyAction={offset => {
              this.refs.scrollView.scrollTo({x: null, y: this.scrollIndex + offset - 300, animated: true})
  
            }}
            //what to do when user clicks submits edited comment
            saveAction={(text, parentCommentId) => {
              let date = moment().format('YYYY-MM-DD H:mm:ss');
              let comments = this.actions.save(this.state.comments, text, parentCommentId, date, 'testUser')
              this.setState({
                comments: comments})
  
              if(!parentCommentId){
                this.refs.scrollView.scrollToEnd()
              }
  
            }}
  
            //what to do when user clicks submits edited comment
            editAction={(text, comment) => {
              let comments = this.actions.edit(this.state.comments, comment, text)
              this.setState({
                comments: comments})
            }}
  
            //what to do when user clicks report submit
            reportAction={(comment) => {
              let comments = this.actions.report(this.state.comments, comment)
              this.setState({
                comments: comments})
            }
  
            }
            //what to do when user clicks like
            likeAction={(comment) => {
              let comments = this.actions.like(this.state.comments, comment)
              this.setState({
                comments: comments})
            }
            }
            //Must return promise
            paginateAction={(from_comment_id, direction, parent_comment_id) => {
              //Must return array of new comments after pagination
  
              let newComments = this.actions.paginateComments(
                this.state.comments,
                from_comment_id,
                direction,
                parent_comment_id)
  
              this.setState({
                comments: newComments})
              let self = this
              setTimeout(function () {
                if(direction == 'up') {
                  self.refs.scrollView.scrollTo({x: 0, y: 500, animated: true})
                }else{
                  self.refs.scrollView.scrollTo({x: 0, y: 0, animated: true})
                }
              }, 3000)
  
            }
            }
          /> : null}  
        </ScrollView>  
      )
    }
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