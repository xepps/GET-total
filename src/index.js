const express = require('express')

const app = express()
const inventory = require('../data/items.json')
// const discounts = require('../data/discounts.json')

app.get('/total', ({ query }, res) => {
    if (query) {
        const outOfStock = inventory.items
            .find(item => item.slug in query && item.quantity < query[item.slug])

        if (outOfStock) {
            res.status(401)
            return res.send({
                error: `Not enough ${outOfStock.slug}`
            })
        }

        const items = inventory.items
            .filter(item => item.slug in query)
            .map(item => item.price * query[item.slug])
            .reduce((a, b) => a + b, 0)

        res.send({ total: items, success: true })
    }
})

module.exports = app
