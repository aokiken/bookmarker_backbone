import { Model } from 'backbone';
import moment from 'moment';

export default Model.extend({
  defaults: {
    title: '',
    description: '',
    url: '',
    created: Date.now(),
    modified: Date.now(),
  },
  dateFormat(columnName) {
    return moment(this.attributes[columnName]).format('YYYY/MM/DD, h:mm a');
  },
});
