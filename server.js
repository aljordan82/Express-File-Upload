const express = require('express');
const app = express();
var fileupload = require("express-fileupload");
app.use(fileupload());
const PORT = 8080;
// app.use('/form', express.static(__dirname + '/index.html'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/src/index.html');
});

app.get('/ping', function(req, res) {
  res.send('pong');
});

app.post('/upload', function(req, res) {

  let file;
  const uploadPathArray = [];

  console.log(req.files )

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  file = req.files.file;
  if(Array.isArray(file) ) {
    req.files.file.forEach(function(f) {
      const uploadPath = __dirname + '/uploads/' + f.name;
      uploadPathArray.push(uploadPath + '\n')
      f.mv(uploadPath, function(err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    })
  } else {
    const uploadPath = __dirname + '/uploads/' + file.name;
      uploadPathArray.push(uploadPath + '\n')
      file.mv(uploadPath, function(err) {
        if (err) {
          return res.status(500).send(err);
        }
      });

  }
 
  res.send('File uploaded to ' + uploadPathArray.join(''));
});

app.listen(PORT, function(req, res) {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
  // res.send('File uploaded to ')
});
