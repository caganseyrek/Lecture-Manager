const express = require('express')
const app = express()

const morgan = require('morgan')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const jsonwebtoken = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrpyt = require('bcrypt')

const auth = require('./api/middleware/isAuth')
const userSchema = require('./api/models/user')

require('dotenv').config()

const port = process.env.AUTHSERVER_PORT
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

function generateAccessToken(user) {
    return jsonwebtoken.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

const getMailActivationToken = () => {
    var chars = 'abcdefghijklmnopqrstuvwxyz1234567890'
    var token = ''
    for (var index = 30; index > 0; index--) {
        var randomIndex = Math.floor(Math.random() * 36)
        token += chars.charAt(randomIndex)
    }
    return token.toString()
}

let refreshTokens = []

app.post('/token', (req, res) => {
    const refreshToken = req.body.refreshToken
    if (refreshToken == null) return res.status(401)
    if (!refreshTokens.includes(refreshToken)) return res.status(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, res) => {
        if (err) return res.status(403)
        const accessToken = jwt.sign({ email: user[0].email, id: user[0]._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
        res.json({ accessToken: accessToken })
    })
})

app.post('/signup', async (req, res, next) => {
    userSchema.find({ email: req.body.email }).exec().then(results => {
        if (results.length >= 1) {
            console.log(results)
            return res.status(401).json({ message: 'Auth failed' })
        }
    }).catch(err => {
        console.log(err)
        return res.status(500).json({ message: 'Auth failed' })
    })
    const salt = await bcrpyt.genSalt()
    bcrpyt.hash(req.body.password, salt, (err, hash) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: 'Auth failed' })
        } else {
            const newUser = new userSchema({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: hash
            })
            newUser.save().then(result => {
                res.status(201).json({ message: 'Created new user' })
            }).catch(err => {
                console.log(err)
                res.status(500).json({ message: 'Auth failed' })
            })
        }
    })
})

app.post('/login', async (req, res, next) => {
    userSchema.find({ email: req.body.email }).exec().then(user => {
        if (user.length == 0) {
            return res.status(401).json({ message: 'Auth failed' })
        }
        bcrpyt.compare(req.body.password, user[0].password, (err, response) => {
            if (err) {
                return res.status(401).json({ message: 'Auth failed' })
            }
            if (response) {
                const accessToken = jwt.sign({ email: user[0].email, id: user[0]._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
                const refreshToken = jwt.sign({ email: user[0].email, id: user[0]._id }, process.env.REFRESH_TOKEN_SECRET)
                return res.status(200).json({
                    message: 'Auth successful',
                    accessToken: accessToken,
                    refreshToken: refreshToken
                })
            }
            res.status(401).json({ message: 'Auth failed' })
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Auth failed' })
    })
})

app.post('/logout', auth, async (req, res, next) => {
    const auth = req.userData
    if (!auth) { return res.status(401).json({ message: 'Auth failed' }) }

    refreshTokens = refreshTokens.filter(token => token !== req.body.refToken)
    res.status(204)
})

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res) => {
    console.log(error)
    res.status(error.status || 500)
})