const {Schema, model} = require ('mongoose');

const UsuariosSchema = Schema({
    nombre: { type: String, required: true },
    estado: { type: String, required: true, enum:['Activo', 'Inactivo'] },
    email: { type: String, required: true, unique: true },
    fechaCreacion: { type: Date, required:true },
    fechaActualizacion: { type: Date, required: true },
    
  });

  module.exports=model('Usuarios',UsuariosSchema);