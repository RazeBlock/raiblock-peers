const Router = require('koa-router')
const router = new Router()
const net = require('./controller/net')

router.get('/peers', net.getPeers)

module.exports = router
