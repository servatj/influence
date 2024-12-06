import { FastifyAdapter } from '@nestjs/platform-fastify'

const app: FastifyAdapter = new FastifyAdapter({
  trustProxy: true,
})
export { app as fastifyApp }

app.register(require('@scalar/fastify-api-reference'), {
  routePrefix: '/reference',
  configuration: {
    title: 'Our API Reference',
    spec: {
      url: '/docs-json',
    },
  },
})

app.getInstance().addHook('onRequest', (request, reply, done) => {
  // set undefined origin
  const origin = request.headers.origin
  if (!origin) {
    request.headers.origin = request.headers.host
  }

  // forbidden php

  const url = request.url

  if (url.endsWith('.php')) {
    reply.raw.statusMessage =
      'Eh. PHP is not support on this machine. Yep, I also think PHP is bestest programming language. But for me it is beyond my reach.'

    return reply.code(418).send()
  } else if (/\/(adminer|admin|wp-login)$/g.test(url)) {
    reply.raw.statusMessage = 'Hey, What the fuck are you doing!'
    return reply.code(200).send()
  }

  // skip favicon request
  if (/favicon.ico$/.test(url) || /manifest.json$/.test(url)) {
    return reply.code(204).send()
  }

  done()
})
