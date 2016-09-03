import { Collection } from 'backbone';
import Store from 'backbone.localstorage';
import ModelBookmarksTags from '../models/bookmarks_tags';

export default Collection.extend({
  model: ModelBookmarksTags,
  localStorage: new Store('bookmarksTags'),
  initialize() {
    this.on('add', this.addHook);
    this.on('remove', this.removeHook);
    this.fetch();
    return this;
  },
  addHook: (bookmarksTags) => bookmarksTags.save(),
  removeHook: (bookmarksTags) => bookmarksTags.destroy(),
});
