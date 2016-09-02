import { Collection } from 'backbone';
import Store from 'backbone.localstorage';
import ModelTags from '../models/tags';
import app from '../app';

export default Collection.extend({
  model: ModelTags,
  localStorage: new Store('tags'),
  initialize: () => {
    this.on('add', this.addHook);
    this.on('edit', this.addHook);
    this.on('remove', this.removeHook);
    this.fetch();
    return this;
  },
  addHook: (tag) => tag.save(),
  editHook: (tag) => tag.save(),
  removeHook: (tag) => tag.destroy(),
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
    const bookmarkIds = ('bookmark_ids' in data) ? data.bookmark_ids : [];
    delete data.bookmark_ids;
    const tag = this.add(data);
    if (tag) {
      bookmarkIds.forEach((bookmarkId) =>
        app.collections.bookmarksTags.add({
          bookmark_id: bookmarkId,
          tag_id: tag.id,
        })
      );
    }
    return this;
  },
  editSubmit: (data) => {
    data = this.serializeArrayFormat(data);
    const tag = app.collections.tags.get(data.id);
    const bookmarksTags = app.collections.bookmarksTags.find({ tag_id: data.id });
    const bookmarkIds = ('bookmark_ids' in data) ? data.bookmark_ids : [];
    delete data.bookmark_ids;
    tag.set(data);

    if (tag) {
      app.collections.bookmarksTags.remove(bookmarksTags);
      bookmarkIds.forEach((bookmarkId) =>
        app.collections.bookmarksTags.add({
          bookmark_id: bookmarkId,
          tag_id: tag.id,
        })
      );
    }
    return this;
  },
  view: (id) => {
    const tag = this.get(id);
    const bookmarksTags = app.collections.bookmarksTags.where({
      tag_id: String(tag.attributes.id),
    });
    tag.attributes.bookmarks = [];
    bookmarksTags.forEach((item) =>
      tag.attributes.bookmarks.push(app.collections.bookmarks.get(item.attributes.bookmark_id)));
    return tag;
  },
  edit: (id) => {
    const tag = this.get(id);
    const bookmarksTags = app.collections.bookmarksTags.where({
      tag_id: String(tag.attributes.id),
    });
    tag.attributes.bookmarks = [];
    bookmarksTags.forEach((item) =>
      tag.attributes.bookmarks.push(app.collections.bookmarks.get(item.attributes.bookmark_id)));
    return tag;
  },
  delete: (id) => {
    this.remove(id);
    const bookmarkTags = app.collections.bookmarksTags.where({ tag_id: String(id) });
    bookmarkTags.forEach((item) => item.destroy());
    return this;
  },
});
