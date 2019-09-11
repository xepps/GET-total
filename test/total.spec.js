const request = require('supertest')
const app = require('../src/app')

describe('Total App', () => {
    let server = null;

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
})