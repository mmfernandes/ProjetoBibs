import { NavLink } from "react-router-dom";

function Aside() {
  return (
    <aside className="menu-lateral">
      <ul>
        <li>
          <NavLink to="/cadastroLivro">Livros</NavLink>
        </li>
        <li>
          <NavLink to="/leitores">Leitores</NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Aside;
