import { NavLink } from 'react-router-dom';

function Nav(){
return (
    <nav>
    <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/cadastroLivros">Cadastro de Livros</NavLink></li>
        <li><NavLink to="/cadastroLeitores">Cadastro de Leitores</NavLink></li>
    </ul>
    </nav>
  );
}

export default Nav;