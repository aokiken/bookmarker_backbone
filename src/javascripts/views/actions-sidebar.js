app.views.ActionsSidebar = Backbone.View.extend({
  el: '#actions-sidebar',
  initialize: function () {
    return this;
  },
  linksTemplate: _.template('<li class="heading">Actions</li><% _.each(linkObjs, function(linkObj) { %><li><a href="<%= linkObj.href %>"><%= linkObj.text %></a></li><% }); %>'),
  setLinks: function (linkObjs) {
    this.$('.side-nav').html(this.linksTemplate({linkObjs: linkObjs}));
    return this;
  }
});