app.models.BookmarksTags = Backbone.Model.extend({
  defaults: {
    bookmark_id: '',
    tag_id: ''
  },
  initialize: function () {
    return this;
  }
});