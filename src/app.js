const Koa = require('koa')
const Router = require('koa-router')

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
    ctx.body = 3
  }
)

module.exports = app
  .use(router.routes())
  .use(router.allowedMethods())
