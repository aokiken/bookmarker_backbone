import _ from 'underscore';
import { View } from 'backbone';
import app from '../app';

export default View.extend({
  // event functions
  addSubmit: (e) => {
    e.preventDefault();
    const data = this.$('#bookmark_add').serializeArray();
    app.collections.bookmarks.addSubmit(data);
    app.router.navigate('bookmarks', { trigger: true });
    return this;
  },
  editSubmit: (e) => {
    e.preventDefault();
    const data = this.$('#bookmark_edit').serializeArray();
    app.collections.bookmarks.editSubmit(data);
    app.router.navigate('bookmarks', { trigger: true });
    return this;
  },

  // actions
  index: () => {
    app.views.topBar.setTitle({ href: './#bookmarks', text: 'Bookmarks' });
    app.views.actionsSidebar.setLinks([
      { href: './#bookmarks/add', text: 'New Bookmark' },
      { href: './#tags', text: 'List Tags' },
      { href: './#tags/add', text: 'New Tag' },
    ]);
    this.$el.html(_.template('tmp-bookmarks.index')({
      bookmarks: app.collections.bookmarks.models,
    }));
    app.views.main.changeContent(this.el);
    this.events = {};
    this.delegateEvents();
    return this;
  },
  add: () => {
    app.views.topBar.setTitle({ href: './#bookmarks/add', text: 'Bookmarks' });
    app.views.actionsSidebar.setLinks([
      { href: './#bookmarks', text: 'List Bookmarks' },
      { href: './#tags', text: 'List Tags' },
      { href: './#tags/add', text: 'New Tag' },
    ]);
    this.$el.html(_.template('tmp-bookmarks.add')({ tags: app.collections.tags.models }));
    app.views.main.changeContent(this.el);
    this.events = { 'submit #bookmark_add': 'addSubmit' };
    this.delegateEvents();
    return this;
  },
  view: (id) => {
    const bookmark = app.collections.bookmarks.view(id);
    app.views.topBar.setTitle({ href: `./#bookmarks/view/${id}`, text: 'Bookmarks' });
    app.views.actionsSidebar.setLinks([
      { href: `./#bookmarks/edit/${id}`, text: 'Edit Bookmark' },
      { href: `./#bookmarks/delete/${id}`, text: 'Delete Bookmark' },
      { href: './#bookmarks', text: 'List Bookmarks' },
      { href: './#bookmarks/add', text: 'New Bookmark' },
      { href: './#tags', text: 'List Tags' },
      { href: './#tags/add', text: 'New Tag' },
    ]);
    this.$el.html(_.template('tmp-bookmarks.view')({ bookmark: bookmark }));
    app.views.main.changeContent(this.el);
    this.events = {};
    this.delegateEvents();
    return this;
  },
  edit: (id) => {
    const bookmark = app.collections.bookmarks.edit(id);
    app.views.topBar.setTitle({ href: `./#bookmarks/edit/${id}`, text: 'Bookmarks' });
    app.views.actionsSidebar.setLinks([
      { href: `./#bookmarks/delete/${id}`, text: 'Delete' },
      { href: './#bookmarks', text: 'List Bookmarks' },
      { href: './#tags', text: 'List Tags' },
      { href: './#tags/add', text: 'New Tag' },
    ]);
    this.$el.html(_.template('tmp-bookmarks.edit')({
      bookmark: bookmark,
      relatedTags: _.pluck(bookmark.attributes.tags, 'id'),
      tags: app.collections.tags.models,
    }));
    app.views.main.changeContent(this.el);
    this.events = { 'submit #bookmark_edit': 'editSubmit' };
    this.delegateEvents();
    return this;
  },
  delete: (id) => {
    app.collections.bookmarks.delete(id);
    app.router.navigate('bookmarks', { trigger: true });
    this.events = {};
    this.delegateEvents();
    return this;
  },
});
