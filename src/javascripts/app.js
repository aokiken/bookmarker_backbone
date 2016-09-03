import Backbone from 'backbone';
import $ from 'jquery';
import ViewMain from './views/main';
import ViewTopBar from './views/top-bar';
import ViewActionsSidebar from './views/actions-sidebar';
import ViewBookmarks from './views/bookmarks';
import ViewTags from './views/tags';
import CollectionBookmarks from './collections/bookmarks';
import CollectionBookmarksTags from './collections/bookmarks_tags';
import CollectionTags from './collections/tags';
import Router from './routes/router';

let App = function Application() {
  let instance;
  App = () => instance;
  App.prototype = this;
  instance = new App();
  instance.constructor = App;

  instance.views = {};
  instance.models = {};
  instance.collections = {};
  instance.routes = {};
  instance.router = {};
  instance.initialize = () => {
    instance.views.main = new ViewMain();
    instance.views.topBar = new ViewTopBar();
    instance.views.actionsSidebar = new ViewActionsSidebar();
    instance.views.bookmarks = new ViewBookmarks();
    instance.views.tags = new ViewTags();
    instance.collections.bookmarks = new CollectionBookmarks();
    instance.collections.tags = new CollectionTags();
    instance.collections.bookmarksTags = new CollectionBookmarksTags();
    instance.router = new Router();
    Backbone.history.start();
    return instance;
  };
  return instance;
};

$(() => new App().initialize());

export default new App();
