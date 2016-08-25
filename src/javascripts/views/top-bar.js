app.views.TopBar = Backbone.View.extend({
  el: '#top-bar',
  initialize: function () {
    return this;
  },
  titleTemplate: _.template('<a href="<%= linkObj.href %>"><%= linkObj.text %></a>'),
  setTitle: function (linkObj) {
    this.$('.title').html(this.titleTemplate({linkObj: linkObj}));
    return this;
  }
});