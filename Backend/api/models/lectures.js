const mongoose = require('mongoose')

const lectureSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    lectureName: { type: String, required: true },
    lectureCode: { type: String, required: true },
    lectureCredit: { type: Number, required: true },
    lecturer: { type: String, required: false },
    average: { type: Number, default: 0 }
})

module.exports = mongoose.model('lectureSchema', lectureSchema)