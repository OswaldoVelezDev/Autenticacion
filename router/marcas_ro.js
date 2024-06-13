const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const Marcas = require('../models/Marcas');

const router = Router();

//crear marcas
router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
], async (req, res) => {


    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() })
        }

        let marcas = new Marcas();
        marcas.nombre = req.body.nombre;
        marcas.estado = req.body.estado;
        marcas.fechaCreacion = new Date();
        marcas.fechaActualizacion = new Date();

        marcas = await marcas.save();
        res.send(marcas);

    } catch (error) {
        console.log(error);
        res.status(500).json('Ocurrio un error inesperado');
    }


});

// listar marcas
router.get('/', async function (req, res) {

    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor" })
    }

    const marcas = req.query.marcas;
    const marca = await marcas.find();
    res.send(marca);
});

// actualizar marcas
router.put('/:marcasId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let marcas = await marcas.findById(req.params.marcasId);
        if (!marcas) {
            return res.status(404).json(" la marca no existe");
        }


        marcas.nombre = req.body.nombre;
        marcas.estado = req.body.estado;
        marcas.fechaActualizacion = new Date();


        marcas = await marcas.save();

        res.send(marcas);


    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor al actualizar la marca" });
    }
});

module.exports = router;