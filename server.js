//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/angulator-v3-ui'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/*', function(req,res) {

  res.sendFile(path.join('./dist/angulator-v3-ui/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

console.log('asdsad');
