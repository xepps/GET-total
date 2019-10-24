const tape = require('tape')
const supertest = require('supertest')
const index = require('../src/index')

tape('Calculate total with no items', async t => {
    const res = await supertest(index).get('/total')
    t.equals(res.statusCode, 200)
    t.end()
})

tape('Calculate total with single item', async t => {
    const testCases = [
        [ '/total/?socks=2', 6 ],
        [ '/total/?socks=2&netacea=2', 2000006 ]
    ]

    for (const [ url, expectedTotal ] of testCases) {
        const res = await supertest(index).get(url)
        t.equals(res.statusCode, 200)
        t.deepEquals(res.body, {
            total: expectedTotal,
            success: true
        })
    }

    t.end()
})

tape('Calculate total with insufficient stock', async t => {
    const res = await supertest(index).get('/total/?socks=3')
    t.equals(res.statusCode, 401)
    t.deepEquals(res.body, {
        error: 'Not enough socks'
    })
    t.end()
})
