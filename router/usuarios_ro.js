const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const Usuarios = require('../models/Usuarios');



const router = Router();

//crear Usuarios
router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check('email', 'invalid.email').not().isEmpty(),
], async (req, res) => {


    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() })
        }

        let usuarios = new Usuarios();
        usuarios.nombre = req.body.nombre;
        usuarios.estado = req.body.estado;
        usuarios.email = req.body.email;
        usuarios.fechaCreacion = new Date();
        usuarios.fechaActualizacion = new Date();

        usuarios = await usuarios.save();
        res.send(usuarios);

    } catch (error) {
        console.log(error);
        res.status(500).json('Ocurrio un error inesperado');
    }


});

// listar usuarios
router.get('/', async function (req, res) {

    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor" })
    }

    const usuarios = req.query.usuarios;
    const usuario= await usuarios.find();
    res.send(usuario);
});

// actualizar Usuarios
router.put('/:UsuariosId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check('email', 'invalid.email'),
], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let usuarios = await usuarios.findById(req.params.usuariosId);
        if (!usuarios) {
            return res.status(404).json(" el Usuario no existe");
        }


        usuarios.nombre = req.body.nombre;
        usuarios.estado = req.body.estado;
        usuarios.email = req.body.email;
        usuarios.fechaActualizacion = new Date();


        usuarios = await usuarios.save();

        res.send(usuarios);


    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor al actualizar los usuarios" });
    }
});

module.exports = router;