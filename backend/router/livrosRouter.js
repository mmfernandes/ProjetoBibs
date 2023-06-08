const LivroController = require('../controllers/LivroController');
const express = require('express');
const router = express.Router();


router.post('/', LivroController.salvarLivro);//salvando
router.get('/', LivroController.listarLivros);//listando
router.get('/:id', LivroController.buscarPorId);//buscando
router.put('/:id', LivroController.atualizarLivro);//atualizando :)) 
router.delete('/:id', LivroController.excluirLivro);//deletando

module.exports = router; 