app.views.Bookmarks = Backbone.View.extend({
  initialize: function () {
    return this;
  },

  // event functions
  addSubmit: function (e) {
    e.preventDefault();
    var data = this.$('#bookmark_add').serializeArray();
    app.collections.bookmarks.addSubmit(data);
    app.router.navigate('bookmarks', {trigger: true});
    return this;
  },
  editSubmit: function (e) {
    e.preventDefault();
    var data = this.$('#bookmark_edit').serializeArray();
    app.collections.bookmarks.editSubmit(data);
    app.router.navigate('bookmarks', {trigger: true});
    return this;
  },

  // actions
  index: function () {
    app.views.topBar.setTitle({href: '/#bookmarks', text: 'Bookmarks'});
    app.views.actionsSidebar.setLinks([
      {href: '/#bookmarks/add', text: 'New Bookmark'},
      {href: '/#tags', text: 'List Tags'},
      {href: '/#tags/add', text: 'New Tag'}
    ]);
    this.$el.html(_.template('tmp-bookmarks.index')({bookmarks: app.collections.bookmarks.models}));
    app.views.main.changeContent(this.el);
    return this;
  },
  add: function () {
    this.events = {'submit #bookmark_add': 'addSubmit'};
    app.views.topBar.setTitle({href: '/#bookmarks/add', text: 'Bookmarks'});
    app.views.actionsSidebar.setLinks([
      {href: '/#bookmarks', text: 'List Bookmarks'},
      {href: '/#tags', text: 'List Tags'},
      {href: '/#tags/add', text: 'New Tag'}
    ]);
    this.$el.html(_.template('tmp-bookmarks.add')({tags: app.collections.tags.models}));
    app.views.main.changeContent(this.el);
    this.delegateEvents();
    return this;
  },
  view: function (id) {
    var bookmark = app.collections.bookmarks.view(id);
    app.views.topBar.setTitle({href: '/#bookmarks/view/' + id, text: 'Bookmarks'});
    app.views.actionsSidebar.setLinks([
      {href: '/#bookmarks/edit/' + id, text: 'Edit Bookmark'},
      {href: '/#bookmarks/delete/' + id, text: 'Delete Bookmark'},
      {href: '/#bookmarks', text: 'List Bookmarks'},
      {href: '/#bookmarks/add', text: 'New Bookmark'},
      {href: '/#tags', text: 'List Tags'},
      {href: '/#tags/add', text: 'New Tag'}
    ]);
    this.$el.html(_.template('tmp-bookmarks.view')({bookmark: bookmark}));
    app.views.main.changeContent(this.el);
    return this;
  },
  edit: function (id) {
    this.events = {'submit #bookmark_edit': 'editSubmit'};
    var bookmark = app.collections.bookmarks.edit(id);
    app.views.topBar.setTitle({href: '/#bookmarks/edit/' + id, text: 'Bookmarks'});
    app.views.actionsSidebar.setLinks([
      {href: '/#bookmarks/delete/' + id, text: 'Delete'},
      {href: '/#bookmarks', text: 'List Bookmarks'},
      {href: '/#tags', text: 'List Tags'},
      {href: '/#tags/add', text: 'New Tag'}
    ]);
    this.$el.html(_.template('tmp-bookmarks.edit')({
      bookmark: bookmark,
      relatedTags: _.pluck(bookmark.attributes.tags, 'id'),
      tags: app.collections.tags.models
    }));
    app.views.main.changeContent(this.el);
    this.delegateEvents();
    return this;
  },
  delete: function (id) {
    app.collections.bookmarks.delete(id);
    app.router.navigate('bookmarks', {trigger: true});
    return this;
  }
});