const _ = require('lodash')
const fetch = require('node-fetch')

const cache = {}
const cacheTime = 1000

module.exports = function (body) {
  let {action} = body || {}
  if (cache[action] && cache[action].result && cache[action].timestamp && _.isEqual(body, cache[action].params)) {
    if (new Date().getTime() - cache[action].timestamp < cacheTime) {
      return Promise.resolve(cache[action].result)
    }
  }

  return fetch('http://127.0.0.1:7076', {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    method: 'POST'
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        let err = new Error(data.error)
        err.data = data
        throw err
      }
      cache[action] = {
        params: _.clone(body),
        result: _.clone(data),
        timestamp: new Date().getTime()
      }
      return data
    })
}
