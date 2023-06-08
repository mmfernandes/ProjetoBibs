const AutorModel = require('../models/AutorModel').AutorModel;
const LivroModel = require('../models/LivroModel').LivroModel;

class AutorController{

    async listarAutores(req, res){ 
       
        const lsitarAutores = await AutorModel.find({});
        res.json(lsitarAutores);
      } 

      async buscarPorId(req, res){
      
        const idAutor = req.params.id;
        const autorBusca = await AutorModel.findOne({'_id': idAutor});
        res.json(autorBusca);

      }

      async salvar(req, res) {         
        const autor = req.body;
        const idLivro = autor.livro;
        //Vincula
        if (idLivro != null && idLivro != 'undefined' && idLivro != ''){
            autor.livro = await LivroModel.findOne({'_id': idLivro});
        }

        //criar uma condição para quando salvar o leitor trazer erro se o livro 
        //que esta sendo cadastrado nao existir
    
        const autorCriado = await AutorModel.create(autor);
        res.json(autorCriado);
      }

      async att(req, res){
        const idAutor = req.params.id;
        const autor = req.body;
        const idLivro = autor.livro;
    
        //Atualiza o livro no leitor
        if (idLivro != null && idLivro != 'undefined' && idLivro != ''){
            autor.livro = await LivroModel.findOne({'_id': idLivro})
        }
    
        const resultado = await AutorModel.findOneAndUpdate({'_id': idAutor}, autor, {new: true});
        res.json(resultado);
        
      }
        
      async excluirAutor(req, res){
   
        const id = req.params.id;
        await AutorModel.findOneAndDelete({'_id': id});
        res.send("Excluído(a) com sucesso!");
      }
}

module.exports = new AutorController(); 

