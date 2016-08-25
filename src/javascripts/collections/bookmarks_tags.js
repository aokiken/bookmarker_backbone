app.collections.BookmarksTags = Backbone.Collection.extend({
  model: app.models.BookmarksTags,
  localStorage: new Backbone.LocalStorage('bookmarksTags'),
  initialize: function () {
    this.on('add', this.addHook);
    this.on('remove', this.removeHook);
    this.fetch();
    return this;
  },
  addHook: function (bookmarksTags) {
    bookmarksTags.save();
    return this;
  },
  removeHook: function (bookmarksTags) {
    bookmarksTags.destroy();
    return this;
  }
});