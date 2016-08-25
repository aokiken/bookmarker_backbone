app.collections.Bookmarks = Backbone.Collection.extend({
  model: app.models.Bookmarks,
  localStorage: new Store('bookmarks'),
  initialize: function () {
    this.on('add', this.addHook);
    this.on('change', this.changeHook);
    this.on('remove', this.removeHook);
    this.fetch();
    return this;
  },
  addHook: function (bookmark) {
    bookmark.save();
    return this;
  },
  changeHook: function (bookmark) {
    bookmark.save();
    return this;
  },
  removeHook: function (bookmark) {
    bookmark.destroy();
    return this;
  },

  serializeArrayFormat: function (data) {
    var result = {};
    data.forEach(function (item) {
      var isArray = item.name.indexOf('[]') > -1;
      if (isArray) {
        item.name = item.name.replace('[]', '');
        result[item.name] = result[item.name] ? result[item.name] : [];
        result[item.name].push(item.value);
      } else {
        result[item.name] = item.value;
      }
    });
    return result;
  },
  addSubmit: function (data) {
    data = this.serializeArrayFormat(data);
    var tag_ids = ('tag_ids' in data) ? data['tag_ids'] : [];
    delete data['tag_ids'];
    var bookmark = this.add(data);
    if (bookmark) {
      tag_ids.forEach(function (tag_id) {
        app.collections.bookmarksTags.add({
          bookmark_id: bookmark.attributes.id,
          tag_id: tag_id
        });
      });
    }
    return this;
  },
  editSubmit: function (data) {
    data = this.serializeArrayFormat(data);
    var bookmarksTags = app.collections.bookmarksTags.find({bookmark_id: data.id});
    var tag_ids = ('tag_ids' in data) ? data['tag_ids'] : [];
    delete data['tag_ids'];
    var bookmark = this.set(data);
    if (bookmark) {
      app.collections.bookmarksTags.remove(bookmarksTags);
      tag_ids.forEach(function (tag_id) {
        app.collections.bookmarksTags.add({
          bookmark_id: bookmark.attributes.id,
          tag_id: tag_id
        });
      });
    }
    return this;
  },
  view: function (id) {
    var bookmark = this.get(id);
    var bookmarksTags = app.collections.bookmarksTags.where({bookmark_id: String(bookmark.attributes.id)});
    bookmark.attributes.tags = [];
    bookmarksTags.forEach(function (item) {
      bookmark.attributes.tags.push(app.collections.tags.get(item.attributes.tag_id));
    });
    return bookmark;
  },
  edit: function (id) {
    var bookmark = this.get(id);
    var bookmarksTags = app.collections.bookmarksTags.where({bookmark_id: String(bookmark.attributes.id)});
    bookmark.attributes.tags = [];
    bookmarksTags.forEach(function (item) {
      bookmark.attributes.tags.push(app.collections.tags.get(item.attributes.tag_id));
    });
    return bookmark;
  },
  delete: function (id) {
    this.remove(id);
    var bookmarkTags = app.collections.bookmarksTags.where({bookmark_id: String(id)});
    bookmarkTags.forEach(function (item) {
      item.destroy();
    });
  }
});