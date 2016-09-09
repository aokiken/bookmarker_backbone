import { ModelTags } from '../helper';

describe('Model tag test', () => {
  it('set', () => {
    const title = 'sample title';
    const tag = new ModelTags();
    tag.set({ title: title });
    assert.equal(tag.get('title'), title);
    assert.equal(tag.attributes.title, title);
    assert.equal(tag.get('title'), tag.attributes.title);
  });
});
