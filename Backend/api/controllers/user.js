const mongoose = require('mongoose')
const bcrpyt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = require('../models/user')

exports.editUser = async (req, res, next) => {
    const auth = req.userData
    if (!auth) { return res.status(401).json({ message: 'Auth failed' }) }

    if (req.body.password) { return res.status(409).json({ message: 'Cannot update user' }) }
    const update = {}
    for (const key of Object.keys(req.body)) {
        if (req.body[key]) {
            update[key] = req.body[key]
        }
    }
    userSchema.findOneAndUpdate(
        { email: req.body.email },
        { $set: update }
    ).exec().then(result => {
        console.log(result)
        res.status(200).json({ message: 'Updated user' })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Cannot update user' })
    })
}

exports.resetPassword = async (req, res, next) => {
    const auth = req.userData
    if (!auth) { return res.status(401).json({ message: 'Auth failed' }) }

    // reset token is created with exports.resetPasswordToken
    const resetToken = req.body.passwordResetToken
    bcrpyt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: 'Cannot reset password' })
        } else {
            userSchema.findOneAndUpdate({
                email: req.body.email,
                passwordResetToken: resetToken,
                passwordResetTokenExpiry: { $gt: Date.now() - (1000 * 60 * 60) }
            }, { $set: { password: hash } }).exec().then(result => {
                console.log(result)
                return res.status(200).json({ message: 'Successfully reset password' })
            }).catch(err => {
                console.log(err)
                return res.status(500).json({ message: 'Cannot reset password' })
            })
        }
    })
    res.status(401).json({ message: 'Auth failed' })
}

exports.resetPasswordToken = async (req, res, next) => {
    const auth = req.userData
    if (!auth) { return res.status(401).json({ message: 'Auth failed' }) }

    bcrpyt.compare(req.body.password, user[0].password, (err, response) => {
        if (err) {
            return res.status(401).json({ message: 'Cannot reset password' })
        }
        if (response) {
            // create a reset token
            // set an expiration date for token
            // send an email with token
            return
        }
        res.status(401).json({ message: 'Cannot reset password' })
    })
}

exports.deleteUser = async (req, res, next) => {
    const auth = req.userData
    if (!auth) { return res.status(401).json({ message: 'Auth failed' }) }

    userSchema.find({ email: req.body.email }).exec().then(results => {
        if (results.length == 0) { return res.status(500).json({ message: 'Cannot delete user' }) }
        bcrpyt.compare(req.body.password, results[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({ message: 'Cannot delete user' })
            }
            if (result) {
                userSchema.findOneAndDelete({ email: req.body.email }).exec().then(result => {
                    return res.status(200).json({ message: 'Successfully deleted user' })
                }).catch(err => {
                    console.log(err)
                    return res.status(500).json({ message: 'Cannot delete user' })
                })
            }
        })
    }).catch(err => {
        console.log(err)
        return res.status(500).json({ message: 'Cannot delete user' })
    })
}