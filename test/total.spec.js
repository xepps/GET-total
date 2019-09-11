const request = require('supertest')
const app = require('../src/app')

describe('Total App', () => {
  let server = null

  beforeEach(done => {
    server = app.listen(done)
  })

  afterEach(() => {
    server.close()
  })

  it('should be able to run', async () => {
    const response = await request(server).get('/_healthcheck')
    expect(response.statusCode).toBe(200)
  })

  ;[
    { item: 'socks', result: 3 },
    { item: 'computer', result: 300 }
  ].forEach(({ item, result }) => {
    it(`should give you the price for one ${item}`, async () => {
      const response = await request(server).get(`/total?i=${item}:1`)
      expect(response.body).toBe(result)
    })
  })
})
