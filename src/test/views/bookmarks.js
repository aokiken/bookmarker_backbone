import { $, _, app } from '../helper';

describe('View bookmarks test', () => {
  beforeEach(() => {
    document.body.innerHTML = _.template('tmp-test.index')()
      .match(`<body(".*?"|[^'"])*>*?</body>`)[0]
      .replace(new RegExp(`<body*?>|</body>|<script(".*?"|[^'"])*>*?</script>`, 'g'), '');
  });
  it('index', (done) => {
    $(() => {
      let bookmarks = app.views.bookmarks;
      bookmarks.index();
      done();
    });
  });
  it('add', (done) => {
    $(() => {
      let bookmarks = app.views.bookmarks;
      bookmarks.add();
      bookmarks.$('#title').val('sample title');
      bookmarks.$('#description').val('sample description');
      bookmarks.$('#url').val('sample url');
      bookmarks.$('#bookmark_add').submit();
      assert.equal(app.collections.bookmarks.length, 1);
      done();
    });
  });
  it('edit', (done) => {
    $(() => {
      let bookmarks = app.views.bookmarks;
      const id = app.collections.bookmarks.models[0].get('id');
      bookmarks.edit(id);
      bookmarks.$('#title').val('sample edit title');
      bookmarks.$('#description').val('sample edit description');
      bookmarks.$('#url').val('sample edit url');
      bookmarks.$('#bookmark_edit').submit();
      assert.equal(app.collections.bookmarks.models[0].get('title'), 'sample edit title');
      done();
    });
  });
  it('delete', (done) => {
    $(() => {
      let bookmarks = app.views.bookmarks;
      const id = app.collections.bookmarks.models[0].get('id');
      bookmarks.delete(id);
      assert.equal(app.collections.bookmarks.length, 0);
      done();
    });
  });
  afterEach(() => localStorage.clear());
});