import { NavLink } from "react-router-dom"

function Nav(){
    return(
        <nav>
            <ul>
                <li><NavLink to="/">Principal</NavLink></li>
                <li><NavLink to="/CadastroLivro">Cadastro Livro</NavLink></li>
                <li><NavLink to="/CadastroLeitor">Cadastro Leitor</NavLink></li>
                {/* <li><NavLink to="/buscar">Buscar</NavLink></li> */}
            </ul>
        </nav>
    )
}

export default Nav