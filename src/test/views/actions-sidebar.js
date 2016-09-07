import { _, ViewActionsSidebar } from '../helper';

describe('View action sidebar test', () => {
  beforeEach(() => {
    document.body.innerHTML = _.template('tmp-test.index')()
      .match(`<body(".*?"|[^'"])*>*?</body>`)[0]
      .replace(new RegExp(`<body*?>|</body>|<script(".*?"|[^'"])*>*?</script>`, 'g'), '');
  });
  it('setLinks', () => {
    const actionsSidebar = new ViewActionsSidebar();
    const id = 1;
    const linkObjs = [
      { href: `./#bookmarks/delete/${id}`, text: 'Delete' },
      { href: './#bookmarks', text: 'List Bookmarks' },
      { href: './#tags', text: 'List Tags' },
      { href: './#tags/add', text: 'New Tag' },
    ];
    actionsSidebar.setLinks(linkObjs);
    assert.equal(actionsSidebar.$('.side-nav').html(),'<li class="heading">Actions</li><li><a href="./#bookmarks/delete/1">Delete</a></li><li><a href="./#bookmarks">List Bookmarks</a></li><li><a href="./#tags">List Tags</a></li><li><a href="./#tags/add">New Tag</a></li>');
  });
});