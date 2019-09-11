const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get(
    '/_healthcheck',
    async ctx => {
        ctx.body = {}
    })

module.exports = app
    .use(router.routes())
    .use(router.allowedMethods())