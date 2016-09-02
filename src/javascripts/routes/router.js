import { Router } from 'backbone';
import app from '../app';

export default Router.extend({
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
    '*actions': 'toppage',
  },
  toppage: () => app.router.navigate('bookmarks', { trigger: true }),
  bookmarks: () => app.views.bookmarks.index(),
  bookmarksAdd: () => app.views.bookmarks.add(),
  bookmarksView: (id) => app.views.bookmarks.view(id),
  bookmarksEdit: (id) => app.views.bookmarks.edit(id),
  bookmarksDelete: (id) => app.views.bookmarks.delete(id),
  tags: () => app.views.tags.index(),
  tagsAdd: () => app.views.tags.add(),
  tagsView: (id) => app.views.tags.view(id),
  tagsEdit: (id) => app.views.tags.edit(id),
  tagsDelete: (id) => app.views.tags.delete(id),
});
