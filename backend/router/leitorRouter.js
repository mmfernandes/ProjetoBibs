const LeitorController = require('../controllers/LeitorController')
const express = require('express');
const router = express.Router(); 

router.get('/', LeitorController.listarLeitores);//
router.post('/', LeitorController.salvar); //
router.put('/:id', LeitorController.att);//
router.delete('/:id', LeitorController.excluirLeitor);//
router.get('/:id', LeitorController.buscarPorId); //

module.exports = router; 