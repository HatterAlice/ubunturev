const express = require('express');
const provSchema = require('../models/proveedores');
const router = express.Router();

//create prov
router.post('/post', (req, res) =>{
    const prov  = provSchema(req.body);
    prov
        .save()
        .then((data) => res.redirect('/prove'))
        .catch((error) => res.json({message: error}));
});

//get all prov
router.get('/get', (req, res) =>{
    provSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

//get a prov
router.get('/get/:id', (req, res) =>{
    const { id } = req.params;
    provSchema
        .findById( {_id: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

//update a prov
router.post('/put/:id', (req, res) =>{
    const { id } = req.params;
    const {nombreprov, telefono } = req.body;
    provSchema
        .updateOne({ _id: id }, {$set : {nombreprov, telefono}})
        .then((data) => res.redirect('/prove'))
        .catch((error) => res.json({message: error}));
});


//delete a prov
router.post('/eliminar/:id', (req, res) =>{
    const { id } = req.params;
    provSchema
        .deleteOne({ _id: id })
        .then((data) => res.redirect('/prove'))
        .catch((error) => res.json({message: error}));
});


module.exports = router;