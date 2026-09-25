const botaoNovoVeiculo = document.getElementById("botao-novo-veiculo");
const botaoCancelarVeiculo = document.getElementById("botao-cancelar-veiculo");
const formularioVeiculo = document.getElementById("form-veiculo");
const formularioVeiculoTitulo = document.getElementById("form-veiculo-titulo");
const veiculoFormStatus = document.getElementById("veiculo-form-status");
const listaVeiculosAdmin = document.getElementById("lista-veiculos-admin");
const campoVeiculoId = document.getElementById("veiculo-id");
const campoVeiculoMarca = document.getElementById("veiculo-marca");
const campoVeiculoModelo = document.getElementById("veiculo-modelo");
const campoVeiculoNome = document.getElementById("veiculo-nome");
const campoVeiculoAno = document.getElementById("veiculo-ano");
const campoVeiculoCambio = document.getElementById("veiculo-cambio");
const campoVeiculoCombustivel = document.getElementById("veiculo-combustivel");
const campoVeiculoCor = document.getElementById("veiculo-cor");
const campoVeiculoQuilometragem = document.getElementById("veiculo-quilometragem");
const campoVeiculoPreco = document.getElementById("veiculo-preco");
const campoVeiculoImagem = document.getElementById("veiculo-imagem");
const campoVeiculoImagemMobile = document.getElementById("veiculo-imagem-mobile");
const campoVeiculoDescricao = document.getElementById("veiculo-descricao");
const campoVeiculoOpcionais = document.getElementById("veiculo-opcionais");
const campoVeiculoVendido = document.getElementById("veiculo-vendido");
let veiculosAdmin = [];

function formatarValor(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
  });
}

function criarBotaoTabela(texto, classe, acao) {
  const botao = document.createElement("button");
  botao.className = `botao-tabela ${classe}`;
  botao.type = "button";
  botao.textContent = texto;
  botao.addEventListener("click", acao);
  return botao;
}

function criarLinhaVeiculo(veiculo) {
  const linha = document.createElement("tr");
  const nome = document.createElement("td");
  const ano = document.createElement("td");
  const preco = document.createElement("td");
  const situacaoCelula = document.createElement("td");
  const situacao = document.createElement("span");
  const acoesCelula = document.createElement("td");
  const acoes = document.createElement("div");

  nome.textContent = veiculo.nome;
  ano.textContent = veiculo.ano;
  preco.textContent = formatarValor(veiculo.preco);
  situacao.className = `situacao ${veiculo.vendido ? "vendido" : "disponivel"}`;
  situacao.textContent = veiculo.vendido ? "Vendido" : "Disponível";
  acoes.className = "acoes-tabela";

  const botaoEditar = criarBotaoTabela("Editar", "", () => editarVeiculo(veiculo.id));
  const textoSituacao = veiculo.vendido ? "Marcar disponível" : "Marcar vendido";
  const botaoSituacao = criarBotaoTabela(textoSituacao, "", () => alterarSituacao(veiculo.id));
  const botaoExcluir = criarBotaoTabela("Excluir", "botao-excluir", () => excluirVeiculo(veiculo.id));

  situacaoCelula.append(situacao);
  acoes.append(botaoEditar, botaoSituacao, botaoExcluir);
  acoesCelula.append(acoes);
  linha.append(nome, ano, preco, situacaoCelula, acoesCelula);
  return linha;
}

async function carregarVeiculosAdmin() {
  const resposta = await fetch("/api/admin/veiculos");
  const resultado = await resposta.json();

  if (!resposta.ok) throw new Error(resultado.mensagem);

  veiculosAdmin = resultado;
  listaVeiculosAdmin.replaceChildren(...veiculosAdmin.map(criarLinhaVeiculo));
}

function limparFormularioVeiculo() {
  formularioVeiculo.reset();
  campoVeiculoId.value = "";
  formularioVeiculoTitulo.textContent = "Cadastrar veículo";
  veiculoFormStatus.textContent = "";
}

function abrirFormularioNovo() {
  limparFormularioVeiculo();
  formularioVeiculo.hidden = false;
  formularioVeiculo.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function fecharFormularioVeiculo() {
  limparFormularioVeiculo();
  formularioVeiculo.hidden = true;
}

function editarVeiculo(id) {
  const veiculo = veiculosAdmin.find((item) => item.id === id);
  if (!veiculo) return;

  campoVeiculoId.value = veiculo.id;
  campoVeiculoMarca.value = veiculo.marca;
  campoVeiculoModelo.value = veiculo.modelo;
  campoVeiculoNome.value = veiculo.nome;
  campoVeiculoAno.value = veiculo.ano;
  campoVeiculoCambio.value = veiculo.cambio;
  campoVeiculoCombustivel.value = veiculo.combustivel;
  campoVeiculoCor.value = veiculo.cor;
  campoVeiculoQuilometragem.value = veiculo.quilometragem;
  campoVeiculoPreco.value = veiculo.preco;
  campoVeiculoImagem.value = veiculo.imagem;
  campoVeiculoImagemMobile.value = veiculo.imagem_mobile || "";
  campoVeiculoDescricao.value = veiculo.descricao;
  campoVeiculoOpcionais.value = (veiculo.opcionais || []).join(", ");
  campoVeiculoVendido.checked = veiculo.vendido;
  formularioVeiculoTitulo.textContent = "Editar veículo";
  veiculoFormStatus.textContent = "";
  formularioVeiculo.hidden = false;
  formularioVeiculo.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function obterDadosVeiculo() {
  return {
    marca: campoVeiculoMarca.value.trim(),
    modelo: campoVeiculoModelo.value.trim(),
    nome: campoVeiculoNome.value.trim(),
    ano: Number(campoVeiculoAno.value),
    cambio: campoVeiculoCambio.value.trim(),
    combustivel: campoVeiculoCombustivel.value.trim(),
    cor: campoVeiculoCor.value.trim(),
    quilometragem: Number(campoVeiculoQuilometragem.value),
    preco: Number(campoVeiculoPreco.value),
    imagem: campoVeiculoImagem.value.trim(),
    imagemMobile: campoVeiculoImagemMobile.value.trim(),
    descricao: campoVeiculoDescricao.value.trim(),
    opcionais: campoVeiculoOpcionais.value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    vendido: campoVeiculoVendido.checked
  };
}

async function salvarVeiculo(event) {
  event.preventDefault();

  const id = campoVeiculoId.value;
  const editando = Boolean(id);
  const endereco = editando ? `/api/admin/veiculos/${id}` : "/api/admin/veiculos";
  const metodo = editando ? "PUT" : "POST";

  veiculoFormStatus.className = "status";
  veiculoFormStatus.textContent = "Salvando...";

  try {
    const resposta = await fetch(endereco, {
      method: metodo,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obterDadosVeiculo())
    });
    const resultado = await resposta.json();

    if (!resposta.ok) throw new Error(resultado.mensagem);

    fecharFormularioVeiculo();
    painelStatus.className = "status";
    painelStatus.textContent = resultado.mensagem;
    await carregarResumo();
  } catch (erro) {
    veiculoFormStatus.className = "status erro";
    veiculoFormStatus.textContent = erro.message;
  }
}

async function alterarSituacao(id) {
  try {
    const resposta = await fetch(`/api/admin/veiculos/${id}/status`, {
      method: "PATCH"
    });
    const resultado = await resposta.json();

    if (!resposta.ok) throw new Error(resultado.mensagem);

    painelStatus.className = "status";
    painelStatus.textContent = resultado.mensagem;
    await carregarResumo();
  } catch (erro) {
    painelStatus.className = "status erro";
    painelStatus.textContent = erro.message;
  }
}

async function excluirVeiculo(id) {
  const veiculo = veiculosAdmin.find((item) => item.id === id);

  if (!veiculo || !window.confirm(`Excluir ${veiculo.nome} permanentemente?`)) return;

  try {
    const resposta = await fetch(`/api/admin/veiculos/${id}`, {
      method: "DELETE"
    });
    const resultado = await resposta.json();

    if (!resposta.ok) throw new Error(resultado.mensagem);

    painelStatus.className = "status";
    painelStatus.textContent = resultado.mensagem;
    await carregarResumo();
  } catch (erro) {
    painelStatus.className = "status erro";
    painelStatus.textContent = erro.message;
  }
}

formularioVeiculo.addEventListener("submit", salvarVeiculo);
botaoNovoVeiculo.addEventListener("click", abrirFormularioNovo);
botaoCancelarVeiculo.addEventListener("click", fecharFormularioVeiculo);
verificarSessao();