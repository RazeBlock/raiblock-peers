const ip2location = require('ip2location-nodejs')
const _ = require('lodash')
const path = require('path')
const rpc = require('../utils/rpc')

ip2location.IP2Location_init(path.resolve(__dirname, '../data/IP2LOCATION-LITE-DB11.BIN'))

module.exports = {
  async getPeers () {
    let {peers} = await rpc({action: 'peers'})
    return Object.keys(peers).map(item => {
      let arr = item.match(/\[.*(\d+\.\d+\.\d+\.\d+)]:(\d+)/)
      let ipInfo = ip2location.IP2Location_get_all(arr[1])

      return Object.assign({}, _.pick(ipInfo, [
        'ip', 'ip_no', 'country_short', 'country_long',
        'region', 'city', 'latitude', 'longitude', 'zipcode', 'timezone']), {
          port: arr[2],
          version: peers[item]
        })
    })
  }
}
