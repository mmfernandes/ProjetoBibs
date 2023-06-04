const mongoose = require('mongoose');

  const LivroSchema = new mongoose.Schema({
    _id: { type: Number, required: true, default: -1 },
    autor: String,
    titulo: {type: String, required: [true, "nome é obrigatório"]},
    npaginas: { type: Number, required: true },
    editora: { type: String, required: true },
    leitor: {type: Number, ref: 'leitor'},
    
  }, { 
    versionKey: false 
  });

  LivroSchema.pre('save', async function(next){
    if (this._id < 1){
      const Model = mongoose.model('livros', LivroSchema);
      const objMaxId = await Model.findOne().sort({'_id': -1});
      this._id = objMaxId == null ? 1 : objMaxId._id + 1;
    }
    //else{
    //   return(400).send('erro');
    // }
    next();
  });



module.exports = {
  LivroSchema: LivroSchema,
  LivroModel: mongoose.model('livro', LivroSchema)
}