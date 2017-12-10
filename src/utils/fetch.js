export default function (url, options) {
  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    ...options,
    body: JSON.stringify(options && options.body)
  })
    .then(res => res.json())
}
