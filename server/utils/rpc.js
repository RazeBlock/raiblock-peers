const fetch = require('node-fetch')

module.exports = function (body) {
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
      return data
    })
}
