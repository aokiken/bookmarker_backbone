app.models.Bookmarks = Backbone.Model.extend({
  defaults: {
    title: '',
    description: '',
    url: '',
    created: Date.now(),
    modified: Date.now()
  },
  dateFormat: function (columnName) {
    return moment(this.get(columnName)).format("YYYY/MM/DD, h:mm a");
  }
});