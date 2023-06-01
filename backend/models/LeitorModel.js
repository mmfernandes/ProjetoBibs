  const mongoose = require('mongoose');

  const LeitorSchema = new mongoose.Schema({
    _id: { type: Number, required: true, default: -1 },
    nomeLeitor : { type: String, required : [true, "Nome é obrigatório!"] },
    idadeLeitor:  { type: Number, required:[true, "Idade é obrigatório"] },
    livro : { type: Number, ref: 'livro' }
    
  }, { 
    versionKey: false 
  });
  
  LeitorSchema.pre('save', async function(next){
    if (this._id < 1){
      const Model = mongoose.model('leitor', LeitorSchema);
      const objMaxId = await Model.findOne().sort({'_id': -1});
      this._id = objMaxId == null ? 1 : objMaxId._id + 1;
    }
    next();
  });
  
  module.exports = {
    LeitorSchema: LeitorSchema,
    LeitorModel: mongoose.model('leitor', LeitorSchema)
  }
 