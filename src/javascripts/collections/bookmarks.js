import { Collection } from 'backbone';
import Store from 'backbone.localstorage';
import ModelBookmarks from '../models/bookmarks';
import app from '../app';

export default Collection.extend({
  model: ModelBookmarks,
  localStorage: new Store('bookmarks'),
  initialize: () => {
    this.on('add', this.addHook);
    this.on('change', this.changeHook);
    this.on('remove', this.removeHook);
    this.fetch();
    return this;
  },
  addHook: (bookmark) => bookmark.save(),
  changeHook: (bookmark) => bookmark.save(),
  removeHook: (bookmark) => bookmark.destroy(),

  serializeArrayFormat: (data) => {
    const result = {};
    data.forEach((item) => {
      const isArray = item.name.indexOf('[]') > -1;
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
  addSubmit: (data) => {
    data = this.serializeArrayFormat(data);
    const tagIds = ('tag_ids' in data) ? data.tag_ids : [];
    delete data.tag_ids;
    const bookmark = this.add(data);
    if (bookmark) {
      tagIds.forEach((tagId) => {
        app.collections.bookmarksTags.add({
          bookmark_id: bookmark.attributes.id,
          tag_id: tagId,
        });
      });
    }
    return this;
  },
  editSubmit: (data) => {
    data = this.serializeArrayFormat(data);
    const bookmark = app.collections.bookmarks.get(data.id);
    const bookmarksTags = app.collections.bookmarksTags.find({ bookmark_id: data.id });
    const tagIds = ('tag_ids' in data) ? data.tag_ids : [];
    delete data.tag_ids;
    bookmark.set(data);
    if (bookmark) {
      app.collections.bookmarksTags.remove(bookmarksTags);
      tagIds.forEach((tagId) =>
        app.collections.bookmarksTags.add({
          bookmark_id: bookmark.id,
          tag_id: tagId,
        })
      );
    }
    return this;
  },
  view: (id) => {
    const bookmark = this.get(id);
    const bookmarksTags = app.collections.bookmarksTags.where({
      bookmark_id: String(bookmark.attributes.id),
    });
    bookmark.attributes.tags = [];
    bookmarksTags.forEach((item) =>
      bookmark.attributes.tags.push(app.collections.tags.get(item.attributes.tag_id)));
    return bookmark;
  },
  edit: (id) => {
    const bookmark = this.get(id);
    const bookmarksTags = app.collections.bookmarksTags.where({
      bookmark_id: String(bookmark.attributes.id),
    });
    bookmark.attributes.tags = [];
    bookmarksTags.forEach((item) =>
      bookmark.attributes.tags.push(app.collections.tags.get(item.attributes.tag_id)));
    return bookmark;
  },
  delete: (id) => {
    this.remove(id);
    const bookmarkTags = app.collections.bookmarksTags.where({
      bookmark_id: String(id),
    });
    bookmarkTags.forEach((item) => item.destroy());
  },
});
