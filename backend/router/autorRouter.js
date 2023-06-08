const AutorController = require('../controllers/AutorController')
const express = require('express');
const router = express.Router(); 

router.get('/', AutorController.listarAutores);
router.post('/', AutorController.salvar); 
router.put('/:id', AutorController.att);
router.delete('/:id', AutorController.excluirAutor);
router.get('/:id', AutorController.buscarPorId); 

module.exports = router; 