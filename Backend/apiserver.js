const express = require('express')
const app = express()

const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const helmet = require('helmet')
const crypto = require('crypto')

require('dotenv').config()

const userRoutes = require('./api/routes/user')
const lectureRoutes = require('./api/routes/lectures')
const gradeRoutes = require('./api/routes/grades')

const databaseUri = process.env.DBL_START + process.env.DBL_PW + process.env.DBL_END

mongoose.connect(databaseUri)
mongoose.connection.on('error', (err) => { console.log('Something went wrong with database connection:\n' + err) })
mongoose.connection.once('open', () => { console.log('Successfully connected to database') })

const port = process.env.APISERVER_PORT
app.listen(port, () => { console.log('Server started and listening to port:' + port) })

app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: false,
        directives: {
            defaultSrc: ["'self'"/*, "example-website.com", "*.examle-website.com" */],
            scriptSrc: ["'self'", 'unsafe-inline', 'unsafe-eval', 'strict-dynamic'],
            objectSrc: ["'none'"],
            baseUri: ["'self'"]
        }
    },
    crossOriginEmbedderPolicy: { policy: "require-corp" },
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginResourcePolicy: { policy: "same-origin" },
    referrerPolicy: { policy: "no-referrer" },
    strictTransportSecurity: {
        maxAge: 15552000,
        includeSubDomains: true
    },
    xPoweredBy: false
}))

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/user', userRoutes)
app.use('/lectures', lectureRoutes)
app.use('/grades', gradeRoutes)

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message,
            status: error.status
        }
    })
})