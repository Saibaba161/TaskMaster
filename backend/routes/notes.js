const express = require('express')
const { createNote, getNotes,getNote,deleteNote, updateNote } = require('../controllers/noteController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// Authorization for all note routes
router.use(requireAuth)

//GET all notes

router.get('/', getNotes)

//GET a single note

router.get('/:id', getNote)

//POST a note

router.post('/', createNote)

//DELETE a note

router.delete('/:id',deleteNote)

//PATCH a note

router.patch('/:id', updateNote)

module.exports = router