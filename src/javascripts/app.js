window.app = {
  views: {},
  models: {},
  collections: {},
  routes: {},
  router: {},
  initialize: function () {
    app.views.main = new app.views.Main();
    app.views.topBar = new app.views.TopBar();
    app.views.actionsSidebar = new app.views.ActionsSidebar();

    app.views.bookmarks = new app.views.Bookmarks();
    app.views.tags = new app.views.Tags();

    app.collections.bookmarks = new app.collections.Bookmarks();
    app.collections.tags = new app.collections.Tags();
    app.collections.bookmarksTags = new app.collections.BookmarksTags();

    app.router = new app.routes.Router();
    Backbone.history.start();
    return this;
  }
};
$(function () {
  app.initialize();
});