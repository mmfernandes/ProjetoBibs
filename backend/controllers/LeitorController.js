const LeitorModel = require('../models/LeitorModel').LeitorModel;
const LivroModel = require('../models/LivroModel').LivroModel;

class LeitorController{

    async listarLeitores(req, res){ 
       
        const listarLeitores = await LeitorModel.find({});
        res.json(listarLeitores);
      } //fim lista

      async buscarPorId(req, res){
      
        const idLeitor = req.params.id;
        const leitorBusca = await LeitorModel.findOne({'_id': idLeitor});
        res.json(leitorBusca);

      }// fim buscarId

      async salvar(req, res) {         
        const leitor = req.body;
        const idLivro = leitor.livro;
    
        //Vincula
        if (idLivro != null && idLivro != 'undefined' && idLivro != ''){
          leitor.livro = await LivroModel.findOne({'_id': idLivro});
        }

        //criar uma condição para quando salvar o leitor trazer erro se o livro 
        //que esta sendo cadastrado nao existir
    
        const leitorCriado = await LeitorModel.create(leitor);
        res.json(leitorCriado);
      }

      async att(req, res){
        const idLeitor = req.params.id;
        const leitor = req.body;
        const idLivro = leitor.livro;
    
        //Atualiza o livro no leitor
        if (idLivro != null && idLivro != 'undefined' && idLivro != ''){
            leitor.livro = await LivroModel.findOne({'_id': idLivro})
        }
    
        const resultado = await LeitorModel.findOneAndUpdate({'_id': idLeitor}, leitor, {new: true});
        res.json(resultado);
        
      }
        
      async excluirLeitor(req, res){
   
        const id = req.params.id;
        await LeitorModel.findOneAndDelete({'_id': id});
        res.send("Excluído(a) com sucesso!");
      }
}

module.exports = new LeitorController(); 

