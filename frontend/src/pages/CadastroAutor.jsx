import "./CadastroLivro";
import "./cadastro.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select";

const selectStyles = {
  control: (provied, state) => ({
    ...provied,
    margin: 0,
    padding: "5px 0",
    borderRadius: 3,
    borderColor: "gray",
    boxShadow: state.isFocused ? "0 0 0 2px black" : 0,
    ":hover": { borderColor: "black" },
  }),
};

function CadastroAutor() {
  const [livros, setLivros] = useState([]);
  const [livrosSelecionados, setLivrosSelecionados] = useState();
  const [autor, setAutor] = useState(null);
  const [autores, setAutores] = useState([]);

  function getAutores() {
    axios.get("http://localhost:3005/autores").then((resposta) => {
      setAutores(resposta.data);
    });
  }

  function getLivros() {
    axios.get("http://localhost:3005/livros").then((resposta) => {
      setLivros(resposta.data);
    });
  }

  useEffect(() => {
    getLivros();
    getAutores();
  }, []);

  function novoAutor() {
    setAutor({
      nome: "",
      email: "",
      cpf: "",
      livros: [],
    });
  }

  function alterarAutor(campo, valor, id) {
    autor[campo] = valor;
    setAutor({
      _id: id,
      ...autor,
    });
  }

  function excluirAutor(id) {
    axios.delete("http://localhost:3005/autores/" + id).then(() => {
      reiniciarEstadoDosObjetos();
    });
  }

  function salvarAutor() {
    if (autor._id) {
      axios
        .put("http://localhost:3005/autores/" + autor._id, autor)
        .then(() => {
          reiniciarEstadoDosObjetos();
        });
    } else {
      axios.post("http://localhost:3005/autores/", autor).then(() => {
        reiniciarEstadoDosObjetos();
      });
    }
  }

  function  getSelectLivros() {
    if (autor !== null) {
      const vetLivros = [];
      const livrosAntes = [];

      for (let i = 0; i < livros.length; i++) {
        const livro = livros[i];
        if (autor.livros && autor.livros.includes(livro._id)) {
          livrosAntes[i] = {
            value: livro._id,
            label: livro.titulo,
          };
        }

        vetLivros[i] = {
          value: livro._id,
          label: livro.titulo,
        };
      }

      return (
        <div>
          <Select
            isMulti
            isClearable={false}
            value={livrosSelecionados}
            defaultValue={livrosAntes}
            onChange={onChangeSelectLivros}
            options={vetLivros}
            styles={selectStyles}
          />
        </div>
      );
    }

    return null;
  }

  function onChangeSelectLivros(valores) {
    setLivrosSelecionados(valores);
    const livrosIds = [];
    for (let i = 0; i < valores.length; i++) {
      livrosIds[i] = valores[i].value;
    }
    alterarAutor("livros", livrosIds, autor._id);
  }

  function getFormulario() {
    return (
      <form>
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={autor.nome}
          onChange={(e) => {
            alterarAutor(e.target.name, e.target.value, autor._id);
          }}
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={autor.email}
          onChange={(e) => {
            alterarAutor(e.target.name, e.target.value, autor._id);
          }}
        />
        <label>CPF</label>
        <input
          type="number"
          name="cpf"
          value={autor.cpf}
          onChange={(e) => {
            alterarAutor(e.target.name, e.target.value, autor._id);
          }}
        />
        <label>Livro</label>
        {getSelectLivros()}
        <button
          id="butao"
          type="button"
          onClick={() => {
            salvarAutor();
          }}
        >
          {" "}
          Salvar{" "}
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
  function getLinhaDaTabela(autor) {
    return (
      <tr id tr key={autor._id}>
        <td id="thtd">{autor._id}</td>
        <td id="thtd">{autor.nome}</td>
        <td id="thtd">{autor.email}</td>
        <td id="thtd">{autor.cpf}</td>
        <td id="thtd">{autor.livros}</td>
        <td id="thtd">
         
          <button
            id="butaoEdita"
            type="button"
            onClick={() => {
              setAutor(autor);
            }}
          >
            {" "}
            Editar
          </button>
          <button
            id="butaoCancela"
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Confirmar a exclusão " + autor.nome + "?"
                )
              ) {
                excluirAutor(autor._id);
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
    for (let i = 0; i < autores.length; i++) {
      const autor = autores[i];
      linhasDaTabela[i] = getLinhaDaTabela(autor);
    }
    return linhasDaTabela;
  }

  function getTabela() {
    return (
      <table className="cadastrarLivro">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Livros</th>
            <th>O que deseja fazer?</th>
          </tr>
          {getLinhasDaTabela()}
        </tbody>
      </table>
    );
  }

  function getConteudo() {
    if (autor == null) {
      return (
        <>
          <button
            id="butaoNovo"
            type="button"
            onClick={() => {
              novoAutor();
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
    setAutor(null);
    getAutores();
  }
}
export default CadastroAutor;
