const mongoose = require('mongoose')

const gradeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    relatedLecture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lectureSchema',
        required: true
    },
    grade1: { type: Number, default: 0 },
    grade2: { type: Number, default: 0 },
    grade3: { type: Number, default: 0 },
    grade4: { type: Number, default: 0 },
    grade5: { type: Number, default: 0 },
    percentage1: { type: Number, default: 0 },
    percentage2: { type: Number, default: 0 },
    percentage3: { type: Number, default: 0 },
    percentage4: { type: Number, default: 0 },
    percentage5: { type: Number, default: 0 }
})

module.exports = mongoose.model('gradeSchema', gradeSchema)