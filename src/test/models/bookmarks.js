import { ModelBookmarks } from '../helper';

describe('Model bookmark test', () => {
  it('set', () => {
    const title = 'sample title';
    const description = 'sample description';
    const url = 'sample url';
    let bookmark = new ModelBookmarks();
    bookmark.set({
      title: title,
      description: description,
      url: url,
    });
    assert.equal(bookmark.get('title'), title);
    assert.equal(bookmark.attributes.title, title);
    assert.equal(bookmark.get('title'), bookmark.attributes.title);

    assert.equal(bookmark.get('description'), description);
    assert.equal(bookmark.attributes.description, description);
    assert.equal(bookmark.get('description'), bookmark.attributes.description);

    assert.equal(bookmark.get('url'), url);
    assert.equal(bookmark.attributes.url, url);
    assert.equal(bookmark.get('url'), bookmark.attributes.url);
  });
});