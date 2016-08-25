app.models.Tags = Backbone.Model.extend({
  defaults: {
    title: '',
    created: Date.now(),
    modified: Date.now()
  },
  dateFormat: function (columnName) {
    return moment(this.get(columnName)).format("YYYY/MM/DD, h:mm a");
  }
});