const express = require('express')

const app = express()
const inventory = require('../data/items.json')
// const discounts = require('../data/discounts.json')

// const calculateTotal = (products) => {
//     JSON.parse(inventory)
// }

app.get('/total', (req, res) => {
    console.log('QUERY', req.query)
    if (req.query) {
        if (req.query.socks > 2) {
            res.status(401)
            return res.send({
                error: 'Not enough socks'
            })
        }

        const items = inventory.items
            .filter(item => item.slug in req.query)
            .map(item => item.price * req.query[item.slug])
            .reduce((a, b) => a + b, 0)

        res.send({ total: items, success: true })
    }
})

module.exports = app