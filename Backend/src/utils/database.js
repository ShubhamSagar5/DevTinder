const mongoose = require('mongoose')



const connectionDB = async() => {
    await mongoose.connect("")
}

module.exports = connectionDB