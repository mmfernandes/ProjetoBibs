import { NavLink } from "react-router-dom"

function Nav(){
    return(
        <nav>
            <ul>
                <li><NavLink to="/">Principal</NavLink></li>
                <li><NavLink to="/cadastroLivro">Cadastro Livro</NavLink></li>
                <li><NavLink to="/listar">Listar</NavLink></li>
                <li><NavLink to="/buscar">Buscar</NavLink></li>
            </ul>
        </nav>
    )
}

export default Nav