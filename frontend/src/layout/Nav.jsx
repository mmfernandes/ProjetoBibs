import { NavLink } from 'react-router-dom';
// import CadastroLeitor from '../pages/CadastroLeitor';
import CadastroLivro from '../pages/CadastroLivro';

function Nav(){
return (
    <nav>
    <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/CadastroLivro">Cadastro de Livros</NavLink></li>
        <li><NavLink to="/CadastroLeitor">Cadastro de Leitores</NavLink></li>
    </ul>
    </nav>
  );
}

export default Nav;