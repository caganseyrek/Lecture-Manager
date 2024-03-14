const mongoose = require('mongoose')

const gradeSchema = require('../models/grades')

exports.getGradeTable = async (req, res, next) => {
    const auth = req.userData
    if (!auth) { return res.status(401).json({ message: 'Auth failed' }) }

    gradeSchema.find().exec().then(results => {
        if (results.length > 0) {
            res.status(200).json({results})
        } else {
            res.status(200).json({ message: 'No grade tables found.' })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Cannot get grade tables' })
    })
}

exports.newGradeTable = async (req, res, next) => {
    const auth = req.userData
    if (!auth) { return res.status(401).json({ message: 'Auth failed' }) }

    const id = req.params.lectureID
    const newGradeTable = new gradeSchema({
        _id: new mongoose.Types.ObjectId(),
        relatedLectureID: id,
    })
    newGradeTable.save().then(result => {
        console.log(result)
        res.status(201).json({ message: 'New grade table created.' })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Cannot create new lecture' })
    })
}

exports.editGradeTable = async (req, res, next) => {
    const auth = req.userData
    if (!auth) { return res.status(401).json({ message: 'Auth failed' }) }

    const id = req.params.lectureID
    const update = {}
    for (const key of Object.keys(req.body)) {
        if (req.body[key]) {
            update[key] = req.body[key]
        }
    }
    gradeSchema.findByIdAndUpdate(
        { _id: id },
        { $set: update },
        { new: true }
    ).exec().then(result => {
        console.log(result)
        res.status(200).json({ message: 'Grade table updated' })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Cannot edit grade table' })
    })
}

exports.deleteGradeTable = async (req, res, next) => {
    const auth = req.userData
    if (!auth) { return res.status(401).json({ message: 'Auth failed' }) }

    const id = req.params.lectureID
    gradeSchema.deleteOne({ _id: id }).exec().then(result => {
        console.log(result)
        res.status(200).json({ message: 'Grade table deleted' })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Cannot delete grade table' })
    })
}