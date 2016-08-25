app.views.Tags = Backbone.View.extend({
  initialize: function () {
    return this;
  },
  // event functions
  addSubmit: function (e) {
    e.preventDefault();
    var data = this.$('#tag_add').serializeArray();
    app.collections.tags.addSubmit(data);
    app.router.navigate('tags', {trigger: true});
    return this;
  },
  editSubmit: function (e) {
    e.preventDefault();
    var data = this.$('#tag_edit').serializeArray();
    app.collections.tags.editSubmit(data);
    app.router.navigate('tags', {trigger: true});
    return this;
  },

  // actions
  index: function () {
    app.views.topBar.setTitle({href: '/#tags', text: 'tags'});
    app.views.actionsSidebar.setLinks([
      {href: '/#tags/add', text: 'New Tag'},
      {href: '/#bookmarks', text: 'List Bookmarks'},
      {href: '/#bookmarks/add', text: 'New Bookmark'}
    ]);
    app.views.main.changeContent(_.template('tmp-tags.index')({tags: app.collections.tags.models}));
    return this;
  },
  add: function () {
    this.events = {'submit #tag_add': 'addSubmit'};
    app.views.topBar.setTitle({href: '/#tags/add', text: 'Tags'});
    app.views.actionsSidebar.setLinks([
      {href: '/#tags', text: 'List Tags'},
      {href: '/#bookmarks', text: 'List Bookmarks'},
      {href: '/#bookmarks/add', text: 'New Bookmark'}
    ]);
    this.$el.html(_.template('tmp-tags.add')({bookmarks: app.collections.bookmarks.models}));
    app.views.main.changeContent(this.el);
    this.delegateEvents();
    return this;
  },
  view: function (id) {
    var tag = app.collections.tags.view(id);
    app.views.topBar.setTitle({href: '/#tags/view', text: 'Tags'});
    app.views.actionsSidebar.setLinks([
      {href: '/#tags/edit/' + id, text: 'Edit Tag'},
      {href: '/#tags/delete/' + id, text: 'Delete Tag'},
      {href: '/#tags', text: 'List Tags'},
      {href: '/#tags/add', text: 'New Tag'},
      {href: '/#bookmarks', text: 'List Bookmarks'},
      {href: '/#bookmarks/add', text: 'New Bookmark'}
    ]);
    app.views.main.changeContent(_.template('tmp-tags.view')({tag: tag}));
    return this;
  },
  edit: function (id) {
    this.events = {'submit #tag_edit': 'editSubmit'};
    var tag = app.collections.tags.edit(id);
    app.views.topBar.setTitle({href: '/#tags/edit', text: 'Tags'});
    app.views.actionsSidebar.setLinks([
      {href: '/#tags/delete/' + id, text: 'Delete'},
      {href: '/#tags', text: 'List Tags'},
      {href: '/#bookmarks', text: 'List Bookmarks'},
      {href: '/#bookmarks/add', text: 'New Bookmark'}
    ]);
    this.$el.html(_.template('tmp-tags.edit')({
      tag: tag,
      relatedTags: _.pluck(tag.attributes.bookmarks, 'id'),
      bookmarks: app.collections.bookmarks.models
    }));
    app.views.main.changeContent(this.el);
    this.delegateEvents();
    return this;
  },
  delete: function (id) {
    app.collections.tags.delete(id);
    app.router.navigate('tags', {trigger: true});
    return this;
  }
});