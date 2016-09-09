import { $, _, app } from '../helper';

describe('View tags test', () => {
  beforeEach(() => {
    document.body.innerHTML = _.template('tmp-test.index')()
      .match(`<body(".*?"|[^'"])*>*?</body>`)[0]
      .replace(new RegExp(`<body*?>|</body>|<script(".*?"|[^'"])*>*?</script>`, 'g'), '');
  });
  it('index', (done) => {
    $(() => {
      const tags = app.views.tags;
      tags.index();
      done();
    });
  });
  it('add', (done) => {
    $(() => {
      const tags = app.views.tags;
      tags.add();
      tags.$('#title').val('sample title');
      tags.$('#tag_add').submit();
      assert.equal(app.collections.tags.length, 1);
      done();
    });
  });
  it('edit', (done) => {
    $(() => {
      const tags = app.views.tags;
      const id = app.collections.tags.models[0].get('id');
      tags.edit(id);
      tags.$('#title').val('sample edit title');
      tags.$('#tag_edit').submit();
      assert.equal(app.collections.tags.models[0].get('title'), 'sample edit title');
      done();
    });
  });
  it('delete', (done) => {
    $(() => {
      const tags = app.views.tags;
      const id = app.collections.tags.models[0].get('id');
      tags.delete(id);
      assert.equal(app.collections.tags.length, 0);
      done();
    });
  });
  afterEach(() => localStorage.clear());
});
