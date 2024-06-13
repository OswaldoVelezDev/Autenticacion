const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const Tipos = require('../models/Tipos');



const router = Router();

//crear tipos
router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
], async (req, res) => {


    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() })
        }

        let tipos = new Tipos();
        tipos.nombre = req.body.nombre;
        tipos.estado = req.body.estado;
        tipos.fechaCreacion = new Date();
        tipos.fechaActualizacion = new Date();

        tipos = await tipos.save();
        res.send(tipos);

    } catch (error) {
        console.log(error);
        res.status(500).json('Ocurrio un error inesperado');
    }


});

// listar tipos
router.get('/', async function (req, res) {

    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor" })
    }

    const tipos = req.query.tipos;
    const tipo = await tipos.find();
    res.send(tipo);
});

// actualizar tipos
router.put('/:tiposId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let tipos = await tipos.findById(req.params.tiposId);
        if (!tipos) {
            return res.status(404).json(" el tipo no existe");
        }


        tipos.nombre = req.body.nombre;
        tipos.estado = req.body.estado;
        tipos.fechaActualizacion = new Date();


        tipos = await tipos.save();

        res.send(tipos);


    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor al actualizar los tipos" });
    }
});

module.exports = router;