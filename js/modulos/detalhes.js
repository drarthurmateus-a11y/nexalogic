const modalDetalhes = document.getElementById("modal-detalhes");
const modalFundo = document.getElementById("modal-fundo");
const botaoFecharDetalhes = document.getElementById("fechar-detalhes");
const botaoInteresseDetalhes = document.getElementById("interesse-detalhes");
const detalheImagem = document.getElementById("detalhe-imagem");
const detalheNome = document.getElementById("detalhe-nome");
const detalhePreco = document.getElementById("detalhe-preco");
const detalheAno = document.getElementById("detalhe-ano");
const detalheQuilometragem = document.getElementById("detalhe-quilometragem");
const detalheCambio = document.getElementById("detalhe-cambio");
const detalheCombustivel = document.getElementById("detalhe-combustivel");
const detalheCor = document.getElementById("detalhe-cor");
const detalheDescricao = document.getElementById("detalhe-descricao");
const detalheOpcionais = document.getElementById("detalhe-opcionais");
const detalheWhatsapp = document.getElementById("whatsapp-detalhes");
let veiculoSelecionado = null;

function abrirDetalhes(id) {
  const veiculo = veiculos.find((item) => item.id === id);
  if (!veiculo) return;

  veiculoSelecionado = veiculo;
  const imagemResponsiva = window.matchMedia("(max-width: 600px)").matches && veiculo.imagem_mobile ? veiculo.imagem_mobile : veiculo.imagem;
detalheImagem.src = imagemResponsiva;
  detalheImagem.alt = veiculo.nome;
  detalheNome.textContent = veiculo.nome;
  detalhePreco.textContent = formatarPreco(veiculo.preco);
  detalheAno.textContent = veiculo.ano;
  detalheQuilometragem.textContent = formatarQuilometragem(veiculo.quilometragem);
  detalheCambio.textContent = veiculo.cambio;
  detalheCombustivel.textContent = veiculo.combustivel;
  detalheCor.textContent = veiculo.cor;
  detalheDescricao.textContent = veiculo.descricao;
  detalheOpcionais.replaceChildren();

  veiculo.opcionais.forEach((opcional) => {
    const item = document.createElement("li");
    item.textContent = opcional;
    detalheOpcionais.append(item);
  });

  const mensagem = `Olá, tenho interesse no ${veiculo.nome}.`;
  detalheWhatsapp.href = `https://wa.me/5521999999999?text=${encodeURIComponent(mensagem)}`;
  modalDetalhes.hidden = false;
  document.body.classList.add("modal-aberto");
}

function fecharDetalhes() {
  modalDetalhes.hidden = true;
  document.body.classList.remove("modal-aberto");
  veiculoSelecionado = null;
}

function adicionarBotoesDetalhes() {
  document.querySelectorAll(".card").forEach((card) => {
    const conteudo = card.querySelector(".card-conteudo");
    const botaoInteresse = conteudo.querySelector(".btn");
    const acoes = document.createElement("div");
    const botaoDetalhes = document.createElement("button");

    acoes.className = "acoes-card";
    botaoDetalhes.className = "btn btn-detalhes";
    botaoDetalhes.type = "button";
    botaoDetalhes.textContent = "Ver detalhes";
    botaoDetalhes.addEventListener("click", () => abrirDetalhes(Number(card.dataset.id)));

    acoes.append(botaoDetalhes, botaoInteresse);
    conteudo.append(acoes);
  });
}

botaoFecharDetalhes.addEventListener("click", fecharDetalhes);
modalFundo.addEventListener("click", fecharDetalhes);

botaoInteresseDetalhes.addEventListener("click", () => {
  if (!veiculoSelecionado) return;
  const nomeVeiculo = veiculoSelecionado.nome;
  fecharDetalhes();
  interesse(nomeVeiculo);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modalDetalhes.hidden) fecharDetalhes();
});

