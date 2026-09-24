const favoritosSalvos = JSON.parse(localStorage.getItem("lucenaCarsFavoritos")) || [];
const favoritos = favoritosSalvos.map(Number);
const veiculosComparacao = [];
const mensagemComparacao = document.getElementById("comparacao-mensagem");
const resultadoComparacao = document.getElementById("resultado-comparacao");
const botaoLimparComparacao = document.getElementById("limpar-comparacao");
const comparacaoNomeUm = document.getElementById("comparacao-nome-um");
const comparacaoNomeDois = document.getElementById("comparacao-nome-dois");
const comparacaoPrecoUm = document.getElementById("comparacao-preco-um");
const comparacaoPrecoDois = document.getElementById("comparacao-preco-dois");
const comparacaoAnoUm = document.getElementById("comparacao-ano-um");
const comparacaoAnoDois = document.getElementById("comparacao-ano-dois");
const comparacaoQuilometragemUm = document.getElementById("comparacao-quilometragem-um");
const comparacaoQuilometragemDois = document.getElementById("comparacao-quilometragem-dois");

function salvarFavoritos() {
  localStorage.setItem("lucenaCarsFavoritos", JSON.stringify(favoritos));
}

function alternarFavorito(id) {
  const indice = favoritos.indexOf(id);

  if (indice >= 0) {
    favoritos.splice(indice, 1);
  } else {
    favoritos.push(id);
  }

  salvarFavoritos();
  atualizarBotoesVeiculos();
}

function alternarComparacao(id) {
  const indice = veiculosComparacao.indexOf(id);

  if (indice >= 0) {
    veiculosComparacao.splice(indice, 1);
  } else if (veiculosComparacao.length >= 2) {
    mensagemComparacao.textContent = "Você pode comparar apenas dois veículos.";
    return;
  } else {
    veiculosComparacao.push(id);
  }

  atualizarBotoesVeiculos();
  mostrarComparacao();
}

function atualizarBotoesVeiculos() {
  document.querySelectorAll(".card").forEach((card) => {
    const id = Number(card.dataset.id);
    const botaoFavorito = card.querySelector(".botao-favorito");
    const botaoComparar = card.querySelector(".botao-comparar");
    const favorito = favoritos.includes(id);
    const comparando = veiculosComparacao.includes(id);

    card.classList.toggle("card-favorito", favorito);
    botaoFavorito.classList.toggle("selecionado", favorito);
    botaoComparar.classList.toggle("selecionado", comparando);
    botaoFavorito.textContent = favorito ? "Remover favorito" : "Favoritar";
    botaoComparar.textContent = comparando ? "Remover comparação" : "Comparar";
    botaoFavorito.setAttribute("aria-pressed", String(favorito));
    botaoComparar.setAttribute("aria-pressed", String(comparando));
  });
}

function mostrarComparacao() {
  if (veiculosComparacao.length < 2) {
    resultadoComparacao.hidden = true;
    mensagemComparacao.textContent = veiculosComparacao.length === 1 ? "Selecione mais um veículo para comparar." : "Selecione dois veículos para iniciar a comparação.";
    return;
  }

  const primeiroVeiculo = veiculos.find((veiculo) => veiculo.id === veiculosComparacao[0]);
  const segundoVeiculo = veiculos.find((veiculo) => veiculo.id === veiculosComparacao[1]);
  if (!primeiroVeiculo || !segundoVeiculo) return;

  comparacaoNomeUm.textContent = primeiroVeiculo.nome;
  comparacaoNomeDois.textContent = segundoVeiculo.nome;
  comparacaoPrecoUm.textContent = formatarPreco(primeiroVeiculo.preco);
  comparacaoPrecoDois.textContent = formatarPreco(segundoVeiculo.preco);
  comparacaoAnoUm.textContent = primeiroVeiculo.ano;
  comparacaoAnoDois.textContent = segundoVeiculo.ano;
  comparacaoQuilometragemUm.textContent = formatarQuilometragem(primeiroVeiculo.quilometragem);
  comparacaoQuilometragemDois.textContent = formatarQuilometragem(segundoVeiculo.quilometragem);
  mensagemComparacao.textContent = "Comparação pronta.";
  resultadoComparacao.hidden = false;
}

function adicionarControlesVeiculos() {
  document.querySelectorAll(".card").forEach((card) => {
    const id = Number(card.dataset.id);
    const conteudo = card.querySelector(".card-conteudo");
    const acoesCard = conteudo.querySelector(".acoes-card");
    const controles = document.createElement("div");
    const botaoFavorito = document.createElement("button");
    const botaoComparar = document.createElement("button");

    controles.className = "controles-card";
    botaoFavorito.className = "botao-card botao-favorito";
    botaoComparar.className = "botao-card botao-comparar";
    botaoFavorito.type = "button";
    botaoComparar.type = "button";

    botaoFavorito.addEventListener("click", () => alternarFavorito(id));
    botaoComparar.addEventListener("click", () => alternarComparacao(id));

    controles.append(botaoFavorito, botaoComparar);
    conteudo.insertBefore(controles, acoesCard);
  });

  atualizarBotoesVeiculos();
}

botaoLimparComparacao.addEventListener("click", () => {
  veiculosComparacao.length = 0;
  atualizarBotoesVeiculos();
  mostrarComparacao();
});

adicionarControlesVeiculos();
mostrarComparacao();