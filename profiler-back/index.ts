import express from 'express'
import session from 'express-session'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { userRouter } from './routes/index.js'
import { prisma } from './prismaClient.js'
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Use an external store for consistency across multiple server instances.
})
// sessions
const sess = {
    secret: process.env.APP_SECRET || 'hello-les-poneys',
    cookie: {
        secure: false,
    },
    resave: true,
    saveUninitialized: true,
}

const app = express()
app.use(cors())
app.use(helmet())
app.use(limiter)
app.use(session(sess))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

// Apply the rate limiting middleware to all requests.
app.get('/ping', (_req, res) => {
    res.status(200).json('pong')
})

// routes
app.use('/users', userRouter)

async function main() {
    try {
        await prisma.$connect()
        app.listen(9000, () => {
            console.log('Listenin on PORT 9000')
        })
    } catch (error) {
        console.error(error)
        await prisma.$disconnect()
        process.exit(1)
    }
}
main()
