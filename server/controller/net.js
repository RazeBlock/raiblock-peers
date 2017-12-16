const rai = require('../services/rai')

module.exports = {
  async getPeers (ctx) {
    let peers = await rai.getPeers()
    peers = peers.filter(item => item.ip !== '127.0.0.1')
    ctx.body = peers
  }
}
