import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { jwtVerify, createRemoteJWKSet } from 'jose'
import { config } from 'dotenv'
import { fileURLToPath } from 'node:url'

config({ path: fileURLToPath(new URL('../../.env', import.meta.url)) })

const app = express()

const GATEWAY_PORT = process.env.GATEWAY_PORT || 8080
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000'
const SUPABASE_URL = process.env.SUPABASE_URL!

const JWKS = createRemoteJWKSet(
  new URL(`${SUPABASE_URL}/auth/v1/.well-known/jwks.json`)
)

const PUBLIC_PATHS = ['/api/auth/login', '/api/auth/signup', '/api/auth/refresh']

app.use((req, _res, next) => {
  console.log(`[gateway] ${req.method} ${req.originalUrl} -> ${BACKEND_URL}`)
  next()
})

app.get('/gateway/health', (_req, res) => {
  res.json({ ok: true, service: 'api-gateway' })
})

app.use(async (req, res, next) => {
  if (req.method === 'OPTIONS') return next()
  if (PUBLIC_PATHS.includes(req.path)) return next()

  const h = req.headers.authorization
  if (!h?.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing token' })
  try {
    await jwtVerify(h.slice(7), JWKS, { audience: 'authenticated' })
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
})

app.use(
  '/',
  createProxyMiddleware({
    target: BACKEND_URL,
    changeOrigin: true,
    on: {
      error: (err, _req, res) => {
        console.error('[gateway] proxy error:', err.message)
        if ('writeHead' in res && !res.headersSent) {
          res.writeHead(502, { 'Content-Type': 'application/json' })
        }
        ;(res as any).end(
          JSON.stringify({ error: 'Bad gateway: backend service unavailable' })
        )
      },
    },
  })
)

app.listen(GATEWAY_PORT, () => {
  console.log(`API Gateway: http://localhost:${GATEWAY_PORT}`)
  console.log(`Forwarding all requests -> ${BACKEND_URL}`)
})
