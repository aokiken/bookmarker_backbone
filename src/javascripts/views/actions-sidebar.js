import _ from 'underscore';
import { View } from 'backbone';

export default View.extend({
  el: '#actions-sidebar',
  linksTemplate: _.template('tmp-layouts.actions-sidebar'),
  setLinks(linkObjs) {
    this.$('.side-nav').html(this.linksTemplate({ linkObjs: linkObjs }));
  },
});

