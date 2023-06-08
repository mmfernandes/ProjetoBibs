import { NavLink } from 'react-router-dom';

function Nav(){
return (
    <nav>
    <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/CadastroLivro">Cadastro de Livros</NavLink></li>
        <li><NavLink to="/CadastroLeitor">Cadastro de Leitores</NavLink></li>
        <li><NavLink to="/CadastroAutor">Cadastro de Autor</NavLink></li>
    </ul>
    </nav>
  );
}

export default Nav;