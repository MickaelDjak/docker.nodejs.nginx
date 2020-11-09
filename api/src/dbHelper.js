const mongoose = require('mongoose');
const {db} = require('./config')

module.exports = () => {
   mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});

   return  mongoose.connection
}