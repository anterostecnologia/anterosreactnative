import populate from '../views/data/dataGenerator'
import users from '../views/data/users'
import articles from '../views/data/articles'
import notifications from '../views/data/notifications'
import conversations from '../views/data/conversations'
import cards from '../views/data/cards'
import _ from 'lodash'

class DataProvider {

  getUser(id = 1) {
    return _.find(users, x => x.id == id);
  }

  getUsers() {
    return users;
  }

  getNotifications() {
    return notifications;
  }

  getArticles(type = 'article') {
    return _.filter(articles, x => x.type == type);
  }

  getArticle(id) {
    return _.find(articles, x => x.id == id);
  }


  getConversation(userId = 1) {
    return _.find(conversations, x => x.withUser.id == userId);
  }

  getChatList() {
    return conversations;
  }

  getComments(postId = 1) {
    return this.getArticle(postId).comments;
  }

  getCards() {
    return cards;
  }

  populateData() {
    populate();
  }
}

export let data = new DataProvider();