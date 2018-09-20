const express = require('express');
const path = require('path');
const render = require('./render-demo');

const app = express();

// ejs 相关
app.engine('.html', require('ejs').__express);

app.set('view engine', 'ejs');

// 静态文件
app.set('views', './');
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/indiv-doc', (req, res, next) => {
  res.render('index.ejs', {
    content: render(req.url),
  });
});

app.listen(3234);
console.log(`listening port 3234`);


module.exports = app;
