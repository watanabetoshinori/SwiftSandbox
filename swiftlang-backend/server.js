var exec = require('child_process').exec;
var express = require('express');
var app = express();

const bodyParser = require('body-parser');

const kTimeout = 5000; // 5 sec

app.use(bodyParser.urlencoded({
  extended: true
}));

//app.use(bodyParser.json());

app.get('/swift/version', function(req, res) {
  exec('swift -version', function(err, stdout, stderr) {
    res.header('Access-Control-Allow-Origin', '*');
    if (stderr) {
      res.send(stderr);
    } else {
      res.send(stdout);
    }
  });
})

app.post('/swift/run', function(req, res) {
  var uuid = req.body.uuid
  var code = req.body.code
  var input = req.body.input

  const fs = require('fs')
  fs.writeFile('./temp/input_' + uuid + '.txt' , input, function(err) {
    fs.writeFile('./temp/main_' + uuid + '.swift' , code, function(err) {
      exec('swift ./temp/main_' + uuid + '.swift <./temp/input_' + uuid + '.txt', {timeout: kTimeout}, function(err, stdout, stderr) {
          res.header('Access-Control-Allow-Origin', '*');
          if (stderr) {
            res.send(stderr);
          } else if (stdout) {
            res.send(stdout);
          } else {
            res.send("Time Limit Exceeded");
          }
      });
    });
  });
});

app.listen(3001);