const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const Estado_Equipo = require('../models/Estado_Equipo');

const router = Router();

//crear estado_equipo
router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
], async (req, res) => {


    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() })
        }

        let estado_equipo = new Estado_Equipo();
        estado_equipo.nombre = req.body.nombre;
        estado_equipo.estado = req.body.estado;
        estado_equipo.fechaCreacion = new Date();
        estado_equipo.fechaActualizacion = new Date();

        estado_equipo = await estado_equipo.save();
        res.send(estado_equipo);

    } catch (error) {
        console.log(error);
        res.status(500).json('Ocurrio un error inesperado');
    }


});

// listar estado_equipos
router.get('/', async function (req, res) {

    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor" })
    }

    const estado_equipo = req.query.estado_equipo;
    const estados_equipos = await estado_equipo.find();
    res.send(estados_equipos);
});

// actualizar estado_equipos
router.put('/:estado_equipoId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let estado_equipo = await Estado_Equipo.findById(req.params.estado_equipoId);
        if (!estado_equipo) {
            return res.status(404).json("no existe");
        }


        estado_equipo.nombre = req.body.nombre;
        estado_equipo.estado = req.body.estado;
        estado_equipo.fechaActualizacion = new Date();


        estado_equipo = await estado_equipo.save();

        res.send(estado_equipo);


    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor al actualizar el estado del equipo" });
    }
});

module.exports = router;