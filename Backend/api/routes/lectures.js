const express = require('express')
const router = express.Router()

const lectureControllers = require('../controllers/lectures')
const auth = require('../middleware/isAuth')

router.get('/', auth, lectureControllers.getLectures)
router.post('/', auth, lectureControllers.newLecture)

router.get('/:lectureID', auth, lectureControllers.getOneLecture)
router.patch('/:lectureID', auth, lectureControllers.editLecture)
router.delete('/:lectureID', auth, lectureControllers.deleteLecture)

module.exports = router