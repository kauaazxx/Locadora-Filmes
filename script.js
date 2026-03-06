let filmes = JSON.parse(localStorage.getItem("filmes")) || [];

document.addEventListener("DOMContentLoaded", renderizarTabela);

function abrirModal() {
    document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
    limparCampos();
}

function limparCampos() {

    document.getElementById("titulo").value = "";
    document.getElementById("produtora").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("ano").value = "";
    document.getElementById("capa").value = "";
    document.getElementById("classificacao").value = "";
}

function atualizarLocalStorage() {

    localStorage.setItem("filmes", JSON.stringify(filmes));
}

function salvarFilme() {

    const titulo = document.getElementById("titulo").value.trim();
    const produtora = document.getElementById("produtora").value.trim();
    const genero = document.getElementById("genero").value.trim();
    const ano = document.getElementById("ano").value;
    const capa = document.getElementById("capa").value.trim();
    const classificacao = document.getElementById("classificacao").value;

    if (!titulo || !produtora) {

        alert("TÍTULO e PRODUTORA são obrigatórios!");
        return;
    }

    const novoFilme = {

        id: Date.now(),
        titulo,
        produtora,
        genero,
        ano,
        capa,
        classificacao
    };

    filmes.push(novoFilme);

    atualizarLocalStorage();

    renderizarTabela();

    fecharModal();
}

function renderizarTabela(lista = filmes) {

    const tabela = document.getElementById("dados");

    tabela.innerHTML = "";

    lista.forEach((filme, index) => {

        tabela.innerHTML += `
        <tr>

        <td>
        <img src="${filme.capa}" class="img-capa">
        </td>

        <td>${filme.titulo}</td>

        <td>${filme.produtora}</td>

        <td>${filme.genero}</td>

        <td>${filme.classificacao}</td>

        <td>${filme.ano}</td>

        <td>

        <button onclick="editarFilme(${index})">
        Editar
        </button>

        <button onclick="removerFilme(${index})">
        Excluir
        </button>

        </td>

        </tr>
        `;
    });
}

function removerFilme(index) {

    if (confirm("Tem certeza que deseja excluir este filme?")) {

        filmes.splice(index, 1);

        atualizarLocalStorage();

        renderizarTabela();
    }
}

function editarFilme(index) {

    const filme = filmes[index];

    document.getElementById("titulo").value = filme.titulo;
    document.getElementById("produtora").value = filme.produtora;
    document.getElementById("genero").value = filme.genero;
    document.getElementById("ano").value = filme.ano;
    document.getElementById("capa").value = filme.capa;
    document.getElementById("classificacao").value = filme.classificacao;

    filmes.splice(index, 1);

    atualizarLocalStorage();

    abrirModal();
}

function filtrarGenero() {

    const generoSelecionado = document.getElementById("filtroGenero").value;

    if (generoSelecionado === "todos") {

        renderizarTabela();
        return;
    }

    const filtrados = filmes.filter(filme => filme.genero === generoSelecionado);

    renderizarTabela(filtrados);
}