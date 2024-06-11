const Note = require('../models/schema')
const mongoose = require('mongoose')

//GET all notes
const getNotes = async (req, res) => {
    const user_id = req.user._id

    const notes = await Note.find({ user_id }).sort({createdAt: -1})

    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).json(notes)
}


//GET a single note
const getNote = async (req,res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json("Note does not exist")
    }

    const note = await Note.findById(id)

    if (!note) {
        return res.status(404).json({error: 'Note does not exist'})
    }

    res.status(200).json(note)
}

//CREATE a new note
const createNote = async (req,res) => {
    const {title,body,deadline} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }

    if(!body) {
        emptyFields.push('body')
    }

    if(!deadline) {
        emptyFields.push('deadline')
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({ Error: 'Please fill in all the fields', emptyFields })
    }



    // ADD doc to db
    try{
        const user_id = req.user._id            //Grabbing the ID of the user and creating the new docs with that property
        const note = await Note.create({title, body, deadline, user_id})
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json(note)
    } catch(Error) {
        res.status(400).json({Error: Error.message})
    }
}

//DELETE a note
const deleteNote = async (req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json("Note does not exist")
    }
    const note = await Note.findOneAndDelete({_id: id})

    if(!note) {
        return res.status(400).json({error: "Note does note exist"})
    }
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).json(note)
}

//UPDATE a note
const updateNote = async (req,res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json("Note does not exist")
    }

    const note = await Note.findById( id );

    if(!note) {
        return res.status(404).json({error: "Note does not exist"})
    }

    try{
        const updateNote = await Note.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        );
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json(updateNote)
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}




module.exports = { createNote, getNotes, getNote, deleteNote, updateNote }