import "./cadastro.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select";

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
  const [autores, setAutores] = useState([]);
  const [autoresSelecionados, setAutoresSelecionados] = useState();
  const [livro, setLivro] = useState(null);
  const [livros, setLivros] = useState([]);

  //endpoint livros
  function getLivros() {
    axios.get("http://localhost:3005/livros").then((resposta) => {
      setLivros(resposta.data);
    });
  }
  function getAutores() {
    axios.get("http://localhost:3005/autores").then((resposta) => {
      setAutores(resposta.data);
    });
  }

  //  buscar dados, atualizar o estado, entre outras ações
  // chamando as funções async.
  // [] como o segundo argumento indicando que esse efeito deve ser executado apenas uma vez, após a montagem inicial do componente
  useEffect(() => {
    getLivros();
    getAutores();
  }, []);

  function novoLivro() {
    setLivro({
      autores: [],
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

  function getSelectAutores() {
    if (livro !== null) {
      const vetAutores = [];
      const autoresAnteriores = [];
      for (let i = 0; i < autores.length; i++) {
        const autor = autores[i];
        if (livro.autores.includes(autor._id)) {
          autoresAnteriores[i] = {
            value: autor._id,
            label: autor.nome,
          };
        }
        vetAutores[i] = {
          value: autor._id,
          label: autor.nome,
        };
      }

      return (
        <Select
          isMulti
          isClearable={false}
          value={autoresSelecionados}
          defaultValue={autoresAnteriores}
          onChange={onChangeSelectAutores}
          options={vetAutores}
          styles={selectStyles}
        />
      );
    }
  }

  function onChangeSelectAutores(valores) {
    setAutoresSelecionados(valores);
    const autoresIds = [];
    for (let i = 0; i < valores.length; i++) {
      autoresIds[i] = valores[i].value;
    }
    alterarLivro("autores", autoresIds, livro._id);
  }

  function getFormulario() {
    return (
      <form>
        <label>Autor</label>
        {getSelectAutores()}

        {/* <input
            type="text"
            name="autor"
            value={livro.autor} 
            
            onChange={(e) => {
              alterarLivro(e.target.name, e.target.value, livro._id);
            }}
          /> BOX QUE ESCREVIA O NOME DO AUTOR*/}
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
          Salvar
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
  function adicionarVirgula() {
    var cell = document.getElementById("celda");
    var cellValue = cell.innerHTML;
    cell.innerHTML = cellValue + ",";
  }
  //geração da tabela
  function getLinhaDaTabela(livro, autor) {
    return (
      <tr id tr key={livro._id}>
        <td id="thtd">{livro._id}</td>
        <td id="celda">{livro.autores}</td>
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
            Novo
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
} //FIM FUNCAO

export default CadastroLivro;
