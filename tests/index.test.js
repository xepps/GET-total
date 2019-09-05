const tape = require('tape')
const supertest = require('supertest')
const index = require('../src/index')

tape('GET /total challenge', async t => {
    const res = await supertest(index).get('/total')
    // console.log(res)
    t.equals(res.statusCode, 200)
    t.end()
})

tape('Calculate total with single item', async t => {
    const res = await supertest(index).get('/total/?socks=3')
    // console.log(res)
    t.equals(res.statusCode, 200)
    t.deepEquals(res.body, {
        total: 3,
        success: true
    })
    t.end()
})

tape('Calculate total with sufficient stock', async t => {
    const res = await supertest(index).get('/total/?socks=3&table=99999999')
    // console.log(res)
    t.equals(res.statusCode, 401)
    t.deepEquals(res.body, {
        error: 'Not enuf socks'
    })
    t.end()
})

tape('Calculate total with sufficient stock', async t => {
    const res = await supertest(index).get('/total/?socks=3&netacea=2')
    // console.log(res)
    t.equals(res.statusCode, 200)
    t.deepEquals(res.body, {
        total: 2000003,
        success: true
    })
    t.end()
})