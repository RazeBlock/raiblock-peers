const path = require('path')
const rpc = require('../utils/rpc')
const maxmind = require('maxmind')
const cityLookup = maxmind.openSync(path.resolve(__dirname, '../data/GeoLite2-City.mmdb'))

module.exports = {
  async getPeers () {
    let {peers} = await rpc({action: 'peers'})
    return Object.keys(peers).map(item => {
      let arr = item.match(/\[.*(\d+\.\d+\.\d+\.\d+)]:(\d+)/)
      let {city = {}, location = {}, country = {}} = cityLookup.get(arr[1]) || {}
      city = city || {}
      country = country || {}
      location = location || {}
      return {
        ip: arr[1],
        port: arr[2],
        city: city.names && city.names.en,
        latitude: location.latitude,
        longitude: location.longitude,
        country: {
          iso_code: country.iso_code,
          name: country.names && country.names.en
        }
      }
    })
  }
}
