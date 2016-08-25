app.collections.Tags = Backbone.Collection.extend({
  model: app.models.Tags,
  localStorage: new Backbone.LocalStorage('tags'),
  initialize: function () {
    this.on('add', this.addHook);
    this.on('edit', this.addHook);
    this.on('remove', this.removeHook);
    this.fetch();
    return this;
  },
  addHook: function (tag) {
    tag.save();
    return this;
  },
  editHook: function (tag) {
    tag.save();
    return this;
  },
  removeHook: function (tag) {
    tag.destroy();
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
    var bookmark_ids = ('bookmark_ids' in data) ? data['bookmark_ids'] : [];
    delete data['bookmark_ids'];
    var tag = this.add(data);
    if (tag) {
      bookmark_ids.forEach(function (bookmark_id) {
        app.collections.bookmarksTags.add({
          bookmark_id: bookmark_id,
          tag_id: tag.id
        });
      });
    }
    return this;
  },
  editSubmit: function (data) {
    data = this.serializeArrayFormat(data);
    var bookmarksTags = app.collections.bookmarksTags.find({tag_id: data.id});
    var bookmark_ids = ('bookmark_ids' in data) ? data['bookmark_ids'] : [];
    delete data['bookmark_ids'];
    var tag = this.set(data);
    if (tag) {
      app.collections.bookmarksTags.remove(bookmarksTags);
      bookmark_ids.forEach(function (bookmark_id) {
        app.collections.bookmarksTags.add({
          bookmark_id: bookmark_id,
          tag_id: tag.id
        });
      });
    }
    return this;
  },
  view: function (id) {
    var tag = this.get(id);
    var bookmarksTags = app.collections.bookmarksTags.where({tag_id: String(tag.attributes.id)});
    tag.attributes.bookmarks = [];
    bookmarksTags.forEach(function (item) {
      tag.attributes.bookmarks.push(app.collections.bookmarks.get(item.attributes.bookmark_id));
    });
    return tag;
  },
  edit: function (id) {
    var tag = this.get(id);
    var bookmarksTags = app.collections.bookmarksTags.where({tag_id: String(tag.attributes.id)});
    tag.attributes.bookmarks = [];
    bookmarksTags.forEach(function (item) {
      tag.attributes.bookmarks.push(app.collections.bookmarks.get(item.attributes.bookmark_id));
    });
    return tag;
  },
  delete: function (id) {
    this.remove(id);
    var bookmarkTags = app.collections.bookmarksTags.where({tag_id: String(id)});
    bookmarkTags.forEach(function (item) {
      item.destroy();
    });
    return this;
  }
});