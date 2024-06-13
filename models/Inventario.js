const { Double } = require('mongodb');
const mongoose = require('mongoose'); 

const { Schema, model } = mongoose; 
const InventarioSchema = new Schema({
  
    serial: {
    type: String,
    required: true,
    unique: true, 
  },
  modelo: {
    type: String,
    required: true,
    unique : true,
  },
  descripcion: {
    type: String,
    required: true,
  },
 foto: {
    type: String,
    required: true,
  },
color: {
    type: String,
    required: true,
    
  },
  fechaCompra: {
    type: Date,
    required: true,
  },
  precio: {
    type:Double,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuarios', 
    required: true,
  },
  marca: {
    type: Schema.Types.ObjectId,
    ref: 'Marcas', 
    required: true,  },
  estado: {
    type: Schema.Types.ObjectId,
    ref: 'Estado_Equipo', 
    required: true,
  },
  tipo: {
    type: Schema.Types.ObjectId,
    ref: 'Tipos', 
    required: true,
  },
});


module.exports = model('Inventario', InventarioSchema);