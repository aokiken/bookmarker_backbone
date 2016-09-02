import { Model } from 'backbone';
import moment from 'moment';

export default Model.extend({
  defaults: {
    title: '',
    created: Date.now(),
    modified: Date.now(),
  },
  dateFormat: (columnName) => moment(this.get(columnName)).format('YYYY/MM/DD, h:mm a'),
});
