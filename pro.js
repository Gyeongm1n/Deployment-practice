const sanitizeHtml = require('sanitize-html');

const html = "<script>location.href = 'http://gilbut.co.kr'</script>가"
console.log(sanitizeHtml(html));
