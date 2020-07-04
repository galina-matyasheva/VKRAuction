const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://galina:Ghjcnj14!@cluster0-a80sz.mongodb.net/auction', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
