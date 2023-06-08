import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import CadastroLivro from "./pages/CadastroLivro";
import CadastroLeitor from "./pages/CadastroLeitor";


function App() {
    return (
      <>
        <Routes>
            <Route path='/' element={<Layout><Home/></Layout>} />
            <Route path='/CadastroLivro' element={<Layout><CadastroLivro/></Layout>} />
            <Route path='/CadastroLeitor' element={<Layout><CadastroLeitor/></Layout>} />   
            <Route path='/CadastroAutor' element={<Layout><CadastroLeitor/></Layout>} />   
        </Routes>     
      </>
    );
  }
  export default App;
  