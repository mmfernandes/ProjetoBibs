import "./CadastroLivro";
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

function CadastroLeitor() {
  const [livros, setLivros] = useState([]);
  const [livrosSelecionados, setLivrosSelecionados] = useState();
  const [leitor, setLeitor] = useState(null);
  const [leitores, setLeitores] = useState([]);

  function getLeitores() {
    axios.get("http://localhost:3005/leitores").then((resposta) => {
      setLeitores(resposta.data);
    });
  }

  function getLivros() {
    axios.get("http://localhost:3005/livros").then((resposta) => {
      setLivros(resposta.data);
    });
  }

  useEffect(() => {
    getLivros();
    getLeitores();
  }, []);

  function novoLeitor() {
    setLeitor({
      nomeLeitor: "",
      idadeLeitor: "",
      livros: [],
    });
  }

  function alterarLeitor(campo, valor, id) {
    leitor[campo] = valor;
    setLeitor({
      _id: id,
      ...leitor,
    });
  }

  function excluirLeitor(id) {
    axios.delete("http://localhost:3005/leitores/" + id).then(() => {
      reiniciarEstadoDosObjetos();
    });
  }

  function salvarLeitor() {
    if (leitor._id) {
      axios
        .put("http://localhost:3005/leitores/" + leitor._id, leitor)
        .then(() => {
          reiniciarEstadoDosObjetos();
        });
    } else {
      axios.post("http://localhost:3005/leitores/", leitor).then(() => {
        reiniciarEstadoDosObjetos();
      });
    }
  }

  function  getSelectLivros() {
    if (leitor !== null) {
      const vetLivros = [];
      const livrosAntes = [];

      for (let i = 0; i < livros.length; i++) {
        const livro = livros[i];
        if (leitor.livros && leitor.livros.includes(livro._id)) {
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
    alterarLeitor("livros", livrosIds, leitor._id);
  }

  function getFormulario() {
    return (
      <form>
        <label>Nome Leitor</label>
        <input
          type="text"
          name="nomeLeitor"
          value={leitor.nomeLeitor}
          onChange={(e) => {
            alterarLeitor(e.target.name, e.target.value, leitor._id);
          }}
        />
        <label>Idade do Leitor</label>
        <input
          type="number"
          name="idadeLeitor"
          value={leitor.idadeLeitor}
          onChange={(e) => {
            alterarLeitor(e.target.name, e.target.value, leitor._id);
          }}
        />
        <label>Livro</label>
        {getSelectLivros()}
        <button
          id="butao"
          type="button"
          onClick={() => {
            salvarLeitor();
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

  //geração da tabela
  function getLinhaDaTabela(leitor, livros) {
    // const livroAssociado = leitor.livros && leitor.livros.length > 0 ? livros.find(livro => leitor.livros.includes(livro._id)) : null;
    // const tituloLivro = livroAssociado ? livroAssociado.titulo : '';

    return (
      <tr id tr key={leitor._id}>
        <td id="thtd">{leitor._id}</td>
        <td id="thtd">{leitor.nomeLeitor}</td>
        <td id="thtd">{leitor.idadeLeitor}</td>
        <td>{leitor.livros}</td>
        <td id="thtd">
        <button
            id="butaoEdita"
            type="button"
            onClick={() => {
              setLeitor(leitor);
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
                  "Confirmar a exclusão do leitor " + leitor.nomeLeitor + "?"
                )
              ) {
                excluirLeitor(leitor._id);
              }
            }}
          >
            Deletar
          </button>
          
        </td>
        {/* <td>{livros._id}</td> */}
      </tr>
    );
  }
  function getLinhasDaTabela() {
    const linhasDaTabela = [];
    for (let i = 0; i < leitores.length; i++) {
      const leitor = leitores[i];
      linhasDaTabela[i] = getLinhaDaTabela(leitor);
    }
    return linhasDaTabela;
  }
  //TABELA PRINCIPAL
  function getTabela() {
    return (
      <table className="cadastrarLivro">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Livros</th>
            <th>O que deseja fazer?</th>
            {/* <th>Livro</th> */}
          </tr>
          {getLinhasDaTabela()}
        </tbody>
      </table>
    );
  }

  function getConteudo() {
    if (leitor == null) {
      return (
        <>
          <button
            id="butaoNovo"
            type="button"
            onClick={() => {
              novoLeitor();
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
    setLeitor(null);
    getLeitores();
  }
}
export default CadastroLeitor;
