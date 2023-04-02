const mongoose = require('mongoose');
const provSchema = mongoose.Schema({
    nombreprov: {
        type: String,
        required: true
    },
    telefono:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Proveedores', provSchema);