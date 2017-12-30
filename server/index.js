const path = require('path')
const Koa = require('koa')
const app = new Koa()
const router = require('./router')
const bodyParser = require('koa-bodyparser')
const historyApiFallback = require('koa2-connect-history-api-fallback');

app.use(bodyParser())
app.use(historyApiFallback({ whiteList: ['/api'] }))
app
  .use(router.routes())
  .use(router.allowedMethods())

app.use(require('koa-static')(path.resolve(__dirname, '../dist')));

app.listen(3000, () => {
  console.log('Listen on http://localhost:3000')
})
