var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.static(__dirname));

app.get('/test', function (req, res) {
  res.cookie('chocolateChip', 'tasty'
  // , {httpOnly: true}
  );
  res.end('ran get');
});

app.post('/test', function(req, res) {
  if(req.cookies) {
    var cookie = req.cookies.chocolateChip;
    console.log('Cookie: ' + cookie);
  }
  res.end('ran post');
});

app.listen(8081, function() {
  console.log('server started on port 8081');
});
