const filtroMarca = document.getElementById("filtro-marca");
const filtroModelo = document.getElementById("filtro-modelo");
const filtroAno = document.getElementById("filtro-ano");
const filtroPreco = document.getElementById("filtro-preco");
const resultadoBusca = document.getElementById("resultado-busca");
const semResultados = document.getElementById("sem-resultados");
let cardsVeiculos = [];
const botaoBuscar = document.getElementById("botao-buscar");
const botaoLimpar = document.getElementById("botao-limpar");

function filtrarCarros() {
  const marca = filtroMarca.value;
  const modelo = filtroModelo.value;
  const ano = filtroAno.value;
  const preco = Number(filtroPreco.value);
  let total = 0;

  cardsVeiculos.forEach((card) => {
    const correspondeMarca = !marca || card.dataset.marca === marca;
    const correspondeModelo = !modelo || card.dataset.modelo === modelo;
    const correspondeAno = !ano || card.dataset.ano === ano;
    const correspondePreco = !preco || Number(card.dataset.preco) <= preco;
    const corresponde = correspondeMarca && correspondeModelo && correspondeAno && correspondePreco;

    card.hidden = !corresponde;
    if (corresponde) total += 1;
  });

  resultadoBusca.textContent = total === 1 ? "1 veículo encontrado." : `${total} veículos encontrados.`;
  semResultados.hidden = total !== 0;
}

function limparFiltros() {
  filtroMarca.value = "";
  filtroModelo.value = "";
  filtroAno.value = "";
  filtroPreco.value = "";
  filtrarCarros();
}

function atualizarCardsFiltro() {
  cardsVeiculos = document.querySelectorAll(".carros .card");
}

botaoBuscar.addEventListener("click", filtrarCarros);
botaoLimpar.addEventListener("click", limparFiltros);
