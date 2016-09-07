import { $, _, app } from '../helper';
describe('routing test', () => {
  beforeEach((done) => {
    document.body.innerHTML = _.template('tmp-test.index')()
      .match(`<body(".*?"|[^'"])*>*?</body>`)[0]
      .replace(new RegExp(`<body*?>|</body>|<script(".*?"|[^'"])*>*?</script>`, 'g'), '');
    $(() => {
      done();
    });
  });
  it('bookmarks', (done) => {
    $(() => {
      done();
    });
  });
  it('bookmarks/add', (done) => {
    $(() => {
      done();
    });
  });
  it('bookmarks/view/:id', (done) => {
    $(() => {
      done();
    });
  });
  it('bookmarks/edit/:id', (done) => {
    $(() => {
      done();
    });
  });
  it('bookmarks/delete/:id', (done) => {
    $(() => {
      done();
    });
  });
  it('tags', (done) => {
    $(() => {
      done();
    });
  });
  it('tags/add', (done) => {
    $(() => {
      done();
    });
  });
  it('tags/view/:id', (done) => {
    $(() => {
      done();
    });
  });
  it('tags/edit/:id', (done) => {
    $(() => {
      done();
    });
  });
  it('tags/delete/:id', (done) => {
    $(() => {
      done();
    });
  });
  it('*actions', (done) => {
    $(() => {
      done();
    });
  });
});