import _ from 'underscore';
import { View } from 'backbone';

export default View.extend({
  el: '#top-bar',
  titleTemplate: _.template('tmp-layouts.top-bar'),
  setTitle(linkObj) {
    this.$('.title').html(this.titleTemplate({ linkObj: linkObj }));
  },
});
