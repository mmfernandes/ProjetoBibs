const mongoose = require('mongoose');

const AutorSchema = new mongoose.Schema({
  _id: { type: Number, required: true, default: -1 },
  nome : { type: String, required : [true, "Nome é obrigatório!"] },
  email : { type: String, required : [true, "Email é obrigatório!"] },
  cpf:  { type: Number, required:[true, "CPF é obrigatório"] },
  livros : [{ type: Number, ref: 'livro' }]
  
}, { 
  versionKey: false 
});

AutorSchema.pre('save', async function(next){
  if (this._id < 1){
    const Model = mongoose.model('autor', AutorSchema);
    const objMaxId = await Model.findOne().sort({'_id': -1});
    this._id = objMaxId == null ? 1 : objMaxId._id + 1;
  }
  next();
});

module.exports = {
  AutorSchema: AutorSchema,
  AutorModel: mongoose.model('autor', AutorSchema)
}
