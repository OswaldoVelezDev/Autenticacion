const { Router } = require('express');
const Inventario = require('../models/Inventario');
const { validationResult, check } = require('express-validator');


const router = Router();

router.post('/', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('modelo', 'invalid.modelo').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
    check('foto', 'invalid.descripcion').not().isEmpty(),
    check('color', 'invalid.color'),
    check('fechaCompra', 'invalid.fechaCompra').not().isEmpty(),
    check('precio', 'invalid.precio').not().isEmpty(),
    check('usuario', 'invalid.usuario').not().isEmpty(),
    check('marca', 'invalid.marca').not().isEmpty(),
    check('estado_equipo', 'invalid.estado_equipo').not().isEmpty(),
    check('tipo', 'invalid.tipo').not().isEmpty()


], async function (req, res) {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const existeInventarioPorserial = await Inventario.findOne({ serial: req.body.serial });
        if (existeInventarioPorserial) {
            return res.status(500).send("Ya hay un registro con este Serial");
        }

    let inventario = new Inventario(req.body);
     inventario.serial = req.body.serial;
     inventario.modelo = req.body.modelo;
     inventario.descripcion = req.body.descripcion;
     inventario.foto = req.body.foto;
     inventario.color = req.body.color;
     inventario.fechaCompra = req.body.fechaCompra;
     inventario.precio = req.body.precio;
     inventario.usuario = req.body.usuarios._Id;
     inventario.marca = req.body.marcas._Id;
     inventario.estado_equipo = req.body.estado_equipo._Id;
     inventario.tipo = req.body.tipos._Id;
     

     inventario = await inventario.save();
        res.send (inventario);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

//listar inventario
router.get('/', async function (req, res) {

    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor" })
    }

    const Inventario = req.query.inventario;
    const  Inventa = await Inventario.find().populate([
        {
            path:  'usuario', select: 'nombre estado email'
        },
        {
           path: 'marca', select: 'nombre estado'
        },
        {
            path : 'estado_equipo', select:'nombre estado '
        },
        {
            path :  'tipo' ,select: ' nombre estado '
        }
    ]);
    
    res.send(inventa);
});

//actualizar inventario
router.put('/ inventarioId', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('modelo', 'invalid.modelo').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
    check('foto', 'invalid.descripcion').not().isEmpty(),
    check('color', 'invalid.color'),
    check('fechaCompra', 'invalid.fechaCompra').not().isEmpty(),
    check('precio', 'invalid.precio').not().isEmpty(),
    check('usuario', 'invalid.usuario').not().isEmpty(),
    check('marca', 'invalid.marca').not().isEmpty(),
    check('estado_equipo', 'invalid.estado_equipo').not().isEmpty(),
    check('tipo', 'invalid.tipo').not().isEmpty()
], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let inventario = await inventario.findById(req.params.inventarioId);
        if ( inventario) {
            return res.status(404).json("el inventario no existe.");
        }
        const inventarioExistente = await inventario.findOne({ nombre: req.body.nombre, _Id: { $ne: inventario._id } });
        if  (inventarioExistente) {
            return res.status(409).json({ mensaje: ["el inventario ya existe"] })
        }


        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.foto = req.body.foto;
        inventario.color = req.body.color;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuarios._Id;
        inventario.marca = req.body.marcas._Id;
        inventario.estado_equipo = req.body.estado_equipo._Id;
        inventario.tipo = req.body.tipos._Id;


     inventario = await inventario.save();

        res.send (inventario);


    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error en el servidor al actualizar el inventario" });
    }
});


module.exports = router;

