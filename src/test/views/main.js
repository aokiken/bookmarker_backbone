import { util, _, ViewMain } from '../helper';

describe('View main test', () => {
  beforeEach(() => {
    document.body.innerHTML = util.testFormat(_.template('tmp-test.index')());
  });
  it('changeContent', () => {
    const main = new ViewMain();
    const dom = document.createElement('div');
    main.changeContent(dom);
    assert.equal(main.$el.html(), dom.outerHTML);
  });
});
