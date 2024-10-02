const mongoose = require('mongoose')



const connectionDB = async() => {
    await mongoose.connect("mongodb+srv://s60889355:6kO3skMaRco7DaZs@cluster0.zwttd.mongodb.net/devTinder")
}

module.exports = connectionDB