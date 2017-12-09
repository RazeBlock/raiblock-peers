const rai = require('../services/rai')

module.exports = {
  async getPeers (ctx) {
    let peers = await rai.getPeers()
    ctx.body = peers
  }
}
