import { View } from 'backbone';

export default View.extend({
  el: '#main',
  changeContent: (dom) => this.$el.html(dom),
});
