const Koa = require('koa')
const Router = require('koa-router')

const priceComputer = require('./priceComputer')

const app = new Koa()
const router = new Router()

router.get(
  '/_healthcheck',
  async ctx => {
    ctx.body = {}
  })

router.get(
  '/total',
  async ctx => {
    const query = ctx.request.query
    const items = query.i.split(',').map(item => {
      const [slug, quantity] = item.split(':')
      return { slug, quantity }
    })
    ctx.body = priceComputer(items)
  }
)

module.exports = app
  .use(router.routes())
  .use(router.allowedMethods())
