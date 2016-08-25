app.routes.Router = Backbone.Router.extend({
  routes: {
    '': 'toppage',
    'bookmarks': 'bookmarks',
    'bookmarks/add': 'bookmarksAdd',
    'bookmarks/view/:id': 'bookmarksView',
    'bookmarks/edit/:id': 'bookmarksEdit',
    'bookmarks/delete/:id': 'bookmarksDelete',
    'tags': 'tags',
    'tags/add': 'tagsAdd',
    'tags/view/:id': 'tagsView',
    'tags/edit/:id': 'tagsEdit',
    'tags/delete/:id': 'tagsDelete',
    '*actions': 'toppage'
  },
  toppage: function () {
    app.router.navigate('bookmarks', {trigger: true});
    return this;
  },
  bookmarks: function () {
    app.views.bookmarks.index();
    return this;
  },
  bookmarksAdd: function () {
    app.views.bookmarks.add();
    return this;
  },
  bookmarksView: function (id) {
    app.views.bookmarks.view(id);
    return this;
  },
  bookmarksEdit: function (id) {
    app.views.bookmarks.edit(id);
    return this;
  },
  bookmarksDelete: function (id) {
    app.views.bookmarks.delete(id);
    return this;
  },
  tags: function () {
    app.views.tags.index();
    return this;
  },
  tagsAdd: function () {
    app.views.tags.add();
    return this;
  },
  tagsView: function (id) {
    app.views.tags.view(id);
    return this;
  },
  tagsEdit: function (id) {
    app.views.tags.edit(id);
    return this;
  },
  tagsDelete: function (id) {
    app.views.tags.delete(id);
    return this;
  }
});