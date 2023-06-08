import { NavLink } from "react-router-dom";

function Aside() {
  return (
    <aside className="menu-lateral">
      <ul>
        <li>
          <NavLink to="/CadastroLivro">Livros</NavLink>
        </li>
        <li>
          <NavLink to="/CadastroLeitor">Leitores</NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Aside;
