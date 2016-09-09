let util = {};
util.testFormat = (htmlString) =>
  htmlString
    .match(`<body(".*?"|[^'"])*>*?</body>`)[0]
    .replace(new RegExp(`<body*?>|</body>|<script(".*?"|[^'"])*>*?</script>`, 'g'), '');

export default util;