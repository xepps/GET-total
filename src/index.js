const express = require('express')

const app = express()
const inventory = require('../data/items.json')
// const discounts = require('../data/discounts.json')

// const calculateTotal = (products) => {
    
// }

app.get('/total', (req, res) => {
    // const total = calculateTotal(req.query)
    console.log('QUERY', req.query)
    if (req.query.table) {
        res.status(401)
        return res.send({ error: 'Not enuf socks' })
    }
    res.send({ total: 3, success: true })
})

module.exports = app