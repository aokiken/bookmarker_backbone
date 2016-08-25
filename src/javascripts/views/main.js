app.views.Main = Backbone.View.extend({
  el: '#main',
  initialize: function () {
    return this;
  },
  changeContent: function (dom) {
    this.$el.html(dom);
    return this;
  }
});