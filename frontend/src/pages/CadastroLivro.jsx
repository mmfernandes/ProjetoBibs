import "./cadastroLivro.css";
import axios from "axios";
import { useState, useEffect } from "react";

//select chips
const selectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    margin: 0,
    padding: "5px 0",
    borderRadius: 3,
    borderColor: "gray",
    boxShadow: state.isFocused ? "0 0 0 2px black" : 0,
    ":hover": { borderColor: "black" },
  }),
};

function CadastroLivro() {
  const [leitores, setLeitores] = useState([]);
  const [leitoresSelecionados, setLivrosSelecionados] = useState();
  const [livro, setLivro] = useState(null);
  const [livros, setLivros] = useState([]);

  //endpoint livros
  function getLivros() {
    axios.get("http://localhost:3005/livros").then((resposta) => {
      setLivros(resposta.data);
    });
  }

  useEffect(() => {
    getLivros();
    //  buscar dados, atualizar o estado, entre outras ações
    // chamando as funções async.
    // [] como o segundo argumento indicando que esse efeito deve ser executado apenas uma vez, após a montagem inicial do componente.
  }, []);

  function novoLivro() {
    setLivro({
      autor: "",
      titulo: "",
      npaginas: "",
      editora: "",
    });
  }

  function alterarLivro(campo, valor, id) {
    livro[campo] = valor;
    setLivro({
      _id: id,
      ...livro,
    });
  }

  function excluirLivro(id) {
    axios.delete("http://localhost:3005/livros/" + id).then(() => {
      reiniciarEstadoDosObjetos();
    });
  }

  function salvarLivro() {
    if (livro._id) {
      axios.put("http://localhost:3005/livros/" + livro._id, livro).then(() => {
        reiniciarEstadoDosObjetos();
      });
    } else {
      axios.post("http://localhost:3005/livros/", livro).then(() => {
        reiniciarEstadoDosObjetos();
      });
    }
  }

  function getFormulario() {
    return (
      <form>
        <label>Autor</label>
        <input
          type="text"
          name="autor"
          value={livro.autor}
          onChange={(e) => {
            alterarLivro(e.target.name, e.target.value, livro._id);
          }}
        />
        <label>Título</label>
        <input
          type="text"
          name="titulo"
          value={livro.titulo}
          onChange={(e) => {
            alterarLivro(e.target.name, e.target.value, livro._id);
          }}
        />
        <label>Páginas</label>
        <input
          type="number"
          name="npaginas"
          value={livro.npaginas}
          onChange={(e) => {
            alterarLivro(e.target.name, e.target.value, livro._id);
          }}
        />
        <label>Editora</label>
        <input
          type="text"
          name="editora"
          value={livro.editora}
          onChange={(e) => {
            alterarLivro(e.target.name, e.target.value, livro._id);
          }}
        />
        <button
          id="butao"
          type="button"
          onClick={() => {
            salvarLivro();
          }}
        >
          {" "}
          Salvar livro{" "}
        </button>
        <button
          id="butaoCancela"
          type="button"
          onClick={() => {
            reiniciarEstadoDosObjetos();
          }}
        >
          Cancelar
        </button>
      </form>
    );
  }

  //geração da tabela
  function getLinhaDaTabela(livro) {
    return (
      <tr id tr key={livro._id}>
        <td id="thtd">{livro._id}</td>
        <td id="thtd">{livro.autor}</td>
        <td id="thtd">{livro.titulo}</td>
        <td id="thtd">{livro.npaginas}</td>
        <td id="thtd">{livro.editora}</td>
        <td id="thtd">
          <button
            id="butaoEdita"
            type="button"
            onClick={() => {
              setLivro(livro);
            }}
          >
            Editar
          </button>
          <button
            id="butaoCancela"
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Confirmar a exclusão da livro " + livro.titulo + "?"
                )
              ) {
                excluirLivro(livro._id);
              }
            }}
          >
            Deletar
          </button>
        </td>
      </tr>
    );
  }

  function getLinhasDaTabela() {
    const linhasDaTabela = [];
    for (let i = 0; i < livros.length; i++) {
      const livro = livros[i];
      linhasDaTabela[i] = getLinhaDaTabela(livro);
    }
    return linhasDaTabela;
  }

  function getTabela() {
    return (
      <table className="cadastrarLivro">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Autor</th>
            <th>Titulo</th>
            <th>Páginas</th>
            <th>Editora</th>
            <th>O que deseja fazer?</th>
          </tr>
          {getLinhasDaTabela()}
        </tbody>
      </table>
    );
  }

  function getConteudo() {
    if (livro == null) {
      return (
        <>
          <button
            id="butaoNovo"
            type="button"
            onClick={() => {
              novoLivro();
            }}
          >
            Novo livro
          </button>
          {getTabela()}
        </>
      );
    } else {
      return getFormulario();
    }
  }

  return (
    <div className="cadastroLivro">
      <div className="conteudo">{getConteudo()}</div>
    </div>
  );

  function reiniciarEstadoDosObjetos() {
    setLivro(null);
    getLivros();
  }
}

export default CadastroLivro;
