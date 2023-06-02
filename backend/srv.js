

const express = require('express');
const srv = express();
srv.use(express.json());
require('./db/mongo');


const livroRouter = require('./router/livrosRouter'); 
srv.use('/livros', livroRouter); 

const leitorRouter = require('./router/leitorRouter')
srv.use('/leitores', leitorRouter);

srv.listen(3005, 
    function() {
    console.log('Servidor rodando na porta 3005! http://localhost:3005');
}
);

