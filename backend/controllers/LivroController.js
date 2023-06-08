const LivroModel = require('../models/LivroModel').LivroModel;

class LivroController {
    async listarLivros(req, res) {
        const listaLivros = await LivroModel.find({})
        res.status(200).json(listaLivros);

    }

    async buscarPorId(req, res) { //nao busca por id
        const idLivro = req.params.id;

        try {
            const livroBusca = await LivroModel.findOne({ '_id': idLivro });
            res.status(200).json(livroBusca);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async salvarLivro(req, res) { 
       
        const livro = req.body;
        const resultado = await LivroModel.create(livro);
        res.json(resultado);

        const livroExistente = await LivroModel.findOne({ _id: livro._id });
  
        if (livroExistente) {
        // Livro já existe, retornar mensagem de erro
         return res.status(409).json({ error: 'Livro com o mesmo ID já existe.' });
         
  }
      }

    async atualizarLivro(req, res) {
        const id = req.params.id;
        const livro = req.body;
        //obter o resultado, usar {new: true} apos o codigo
        const livroAtt = await LivroModel.findOneAndUpdate({ '_id': id }, livro, { new: true });
        if (livroAtt) {
            res.status(200).json({ message: 'Livro atualizado', livro: livroAtt });
        } else {
            res.status(400).send('Erro ao atualizar');
        }
    }

    async excluirLivro(req, res) {
        const id = req.params.id;
        const livro = await LivroModel.findOne({ '_id': id });
        if (!livro) {
            return res.status(404).send({ message: 'livro não encontrado' });
        }
        await LivroModel.findByIdAndDelete(livro._id);
        res.send({ message: 'livro excluído!' });
    }

}
module.exports = new LivroController(); 