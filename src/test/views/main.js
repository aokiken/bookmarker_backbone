import { _, ViewMain } from '../helper';

describe('View main test', () => {
  beforeEach(() => {
    document.body.innerHTML = _.template('tmp-test.index')()
      .match(`<body(".*?"|[^'"])*>*?</body>`)[0]
      .replace(new RegExp(`<body*?>|</body>|<script(".*?"|[^'"])*>*?</script>`, 'g'), '');
  });
  it('changeContent', () => {
    const main = new ViewMain();
    const dom = document.createElement('div');
    main.changeContent(dom);
    assert.equal(main.$el.html(), dom.outerHTML);
  });
});
