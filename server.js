// //Install express server
// const express = require('express');
// const path = require('path');
//
// const app = express();
//
// // Serve only the static files form the dist directory
// app.use(express.static('./dist/angulator-v3-ui'));
//
// app.get('/*', function(req,res) {
//
//   res.sendFile(path.join('./dist/angulator-v3-ui/index.html'));
// });
//
// // Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);

const router = require('koa-router')();
const body = require('koa-body')({ text: false });
const send = require('koa-send');
const fs = require('fs');

/**
 * Code about server routes ommited
 */

async function main(ctx, next) {
  //All dynamic routes start with "/api"
  if (/\/api\//.test(ctx.path)) {
    try {
      await next();
    }
    catch (error) {
      if (error instanceof ApplicationError) {
        logger.error(error, { data: error.data, stack: error.stack });
        ctx.status = error.code;
      } else {
        ctx.status = 500;
        logger.error(error.message, { stack: error.stack });
      }
    }
    return;
  } else {
    //Not a dynamic route, serve static content
    if ((ctx.path != "/") && (fs.existsSync('dist' + ctx.path))) {
      await send(ctx, 'dist' + ctx.path);
    } else {
      await send(ctx, 'dist/index.html');
    }
  }
}

module.exports = app => {
  app.use(main);
  app.use(router.routes());
};
