// const express = require('express');
// const path = require('path');

const Window = require('window');

// const app = express();

// // ejs 相关
// app.engine('.html', require('ejs').__express);

// app.set('view engine', 'html');

// // 静态文件
// app.set('views', './');
// app.use(express.static(path.join(__dirname, 'dist')));

// app.use('/demo', (req, res, next) => {
//   res.render('index.html');
// });

// app.listen(1234);
// console.log(`listening port 1234`);

const window = new Window();

const div = window.document.createElement('div');
console.log(111111, div);

// module.exports = app;
