import { _, ViewTopBar } from '../helper';

describe('View top bar test', () => {
  beforeEach(() => {
    document.body.innerHTML = _.template('tmp-test.index')()
      .match(`<body(".*?"|[^'"])*>*?</body>`)[0]
      .replace(new RegExp(`<body*?>|</body>|<script(".*?"|[^'"])*>*?</script>`, 'g'), '');
  });
  it('setTitle', () => {
    const topBar = new ViewTopBar();
    const id = 1;
    const titleObj = { href: `./#bookmarks/edit/${id}`, text: 'Bookmarks' };
    topBar.setTitle(titleObj);
    assert.equal(topBar.$('.title').html(), '<a href="./#bookmarks/edit/1">Bookmarks</a>');
  });
});
