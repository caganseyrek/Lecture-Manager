const express = require('express')
const router = express.Router()

const gradeController = require('../controllers/grades')
const auth = require('../middleware/isAuth')

router.get('/:lectureID', auth, gradeController.getGradeTable)
router.post('/:lectureID', auth, gradeController.newGradeTable)
router.patch('/:lectureID', auth, gradeController.editGradeTable)
router.delete('/:lectureID', auth, gradeController.deleteGradeTable)

module.exports = router