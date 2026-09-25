const listaCarros = document.getElementById("lista-carros");

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
  });
}

function formatarQuilometragem(valor) {
  return `${valor.toLocaleString("pt-BR")} km`;
}

function criarCardVeiculo(veiculo) {
  const card = document.createElement("article");
  const picture = document.createElement("picture");
  const imagemMobile = document.createElement("source");
  const imagem = document.createElement("img");
  const conteudo = document.createElement("div");
  const nome = document.createElement("h3");
  const detalhes = document.createElement("p");
  const preco = document.createElement("p");
  const botao = document.createElement("button");

  card.className = "card";
  card.dataset.id = veiculo.id;
  card.dataset.marca = veiculo.marca;
  card.dataset.modelo = veiculo.modelo;
  card.dataset.ano = veiculo.ano;
  card.dataset.preco = veiculo.preco;

  imagemMobile.media = "(max-width: 600px)";
  imagemMobile.srcset = veiculo.imagem_mobile || veiculo.imagem;
  imagem.src = veiculo.imagem;
  imagem.alt = veiculo.nome;
  imagem.loading = "lazy";
  picture.append(imagemMobile, imagem);

  conteudo.className = "card-conteudo";
  nome.textContent = veiculo.nome;
  detalhes.className = "detalhes";
  detalhes.textContent = `${veiculo.ano} · ${veiculo.cambio} · ${formatarQuilometragem(veiculo.quilometragem)}`;
  preco.className = "preco";
  preco.textContent = formatarPreco(veiculo.preco);
  botao.className = "btn";
  botao.type = "button";
  botao.textContent = "Tenho interesse";
  botao.addEventListener("click", () => interesse(veiculo.nome));

  conteudo.append(nome, detalhes, preco, botao);
  card.append(picture, conteudo);
  return card;
}

async function carregarCatalogo() {
  const resposta = await fetch("/api/veiculos");
  if (!resposta.ok) throw new Error("Não foi possível carregar os veículos.");

  const dados = await resposta.json();
  veiculos.splice(0, veiculos.length, ...dados);
  listaCarros.replaceChildren(...veiculos.map(criarCardVeiculo));
  document.getElementById("resultado-busca").textContent = `${veiculos.length} veículos disponíveis.`;
}