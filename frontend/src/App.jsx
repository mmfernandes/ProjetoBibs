import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import CadastroLivro from "./pages/CadastroLivro";
import CadastroLeitor from "./pages/CadastroLeitor";
import CadastroAutor from "./pages/CadastroAutor";


function App() {
    return (
      <>
        <Routes>
            <Route path='/' element={<Layout><Home/></Layout>} />
            <Route path='/CadastroLivro' element={<Layout><CadastroLivro/></Layout>} />
            <Route path='/CadastroLeitor' element={<Layout><CadastroLeitor/></Layout>} />   
            <Route path='/CadastroAutor' element={<Layout><CadastroAutor/></Layout>} />   
        </Routes>     
      </>
    );
  }
  export default App;
  