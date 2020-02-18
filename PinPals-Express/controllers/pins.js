const express = require('express')
const router = express.Router()

const Pins = require('../models/pin.js')

// Create route
router.post('/', async (req, res) => {
    try {
        const newPin = await Pin.create(req.body);

        res.status(200).json(newPin);
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
})

// Read route
router.get('/', async (req, res) => {
    try {
        const foundPins = await Pin.find();
        res.status(200).json(foundPins)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
})

// Update route
router.put('/:id', async (req, res) => {
    try {
        const updatedPin = await Pin.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updatedPin);
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
})

// Delete route
router.delete('/:id', async (req, res) => {
    try {
        const deletedPin = await Pin.findByIdAndRemove(req.params.id);
        res.status(200).json(deletedPin);
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
})

module.exports = router
