const mongoose = require('mongoose')

const lectureSchema = require('../models/lectures')

exports.getLectures = async (req, res, next) => {
    const auth = req.userData
    if (!auth) { return res.status(401).json({ message: 'Auth failed' }) }

    lectureSchema.find().exec().then(results => {
        if (results.length > 0) {
            res.status(200).json({
                lectureCount: results.length,
                lectures: results
            })
        } else {
            res.status(200).json({ message: 'No lecture found.' })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Cannot get lectures' })
    })
}

exports.newLecture = async (req, res, next) => {
    const auth = req.userData
    if (!auth) { return res.status(401).json({ message: 'Auth failed' }) }

    const newLecture = new lectureSchema({
        _id: new mongoose.Types.ObjectId(),
        lectureName: req.body.lectureName,
        lectureCode: req.body.lectureCode,
        lectureCredit: req.body.lectureCredit,
        lecturer: req.body.lecturer
    })
    newLecture.save().then(result => {
        console.log(result)
        res.status(201).json({ message: 'New lecture created' })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Cannot create new lecture' })
    })
}

exports.getOneLecture = async (req, res, next) => {
    const auth = req.userData
    if (!auth) { return res.status(401).json({ message: 'Auth failed' }) }

    const lectureID = req.params.lectureID
    lectureSchema.findById(lectureID).exec().then(result => {
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json({ message: 'Lecture not found' })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Cannot get lecture' })
    })
}

exports.editLecture = async (req, res, next) => {
    const auth = req.userData
    if (!auth) { return res.status(401).json({ message: 'Auth failed' }) }

    const id = req.params.lectureID
    const update = {}
    for (const key of Object.keys(req.body)) {
        if (req.body[key]) {
            update[key] = req.body[key]
        }
    }
    lectureSchema.findByIdAndUpdate(
        { _id: id },
        { $set: update },
        { new: true }
    ).exec().then(result => {
        console.log(result)
        res.status(200).json({ message: 'Lecture updated' })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Cannot edit lecture' })
    })
}

exports.deleteLecture = async (req, res, next) => {
    const auth = req.userData
    if (!auth) { return res.status(401).json({ message: 'Auth failed' }) }

    const id = req.params.lectureID
    lectureSchema.deleteOne({ _id: id }).exec().then(result => {
        console.log(result)
        res.status(200).json({ message: 'Lecture deleted' })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Cannot delete lecture' })
    })
}