const listaContatosAdmin = document.getElementById("lista-contatos-admin");

function formatarDataContato(data) {
  return new Date(data).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function criarLinkContato(texto, endereco) {
  const link = document.createElement("a");
  link.href = endereco;
  link.textContent = texto;
  return link;
}

function criarLinhaContato(contato) {
  const linha = document.createElement("tr");
  const data = document.createElement("td");
  const cliente = document.createElement("td");
  const dadosCelula = document.createElement("td");
  const dados = document.createElement("div");
  const veiculo = document.createElement("td");
  const mensagem = document.createElement("td");
  const telefoneLimpo = contato.telefone.replace(/[^\d+]/g, "");

  data.textContent = formatarDataContato(contato.criado_em);
  cliente.textContent = contato.nome;
  dados.className = "contato-dados";
  dados.append(
    criarLinkContato(contato.email, `mailto:${contato.email}`),
    criarLinkContato(contato.telefone, `tel:${telefoneLimpo}`)
  );
  dadosCelula.append(dados);
  veiculo.textContent = contato.veiculo || "Veículo removido";
  mensagem.className = "contato-mensagem";
  mensagem.textContent = contato.mensagem;
  linha.append(data, cliente, dadosCelula, veiculo, mensagem);
  return linha;
}

async function carregarContatosAdmin() {
  const resposta = await fetch("/api/admin/contatos");
  const resultado = await resposta.json();
  if (!resposta.ok) throw new Error(resultado.mensagem);

  if (!resultado.length) {
    const linha = document.createElement("tr");
    const mensagem = document.createElement("td");
    mensagem.colSpan = 5;
    mensagem.className = "contatos-vazios";
    mensagem.textContent = "Nenhum contato recebido.";
    linha.append(mensagem);
    listaContatosAdmin.replaceChildren(linha);
    return;
  }

  listaContatosAdmin.replaceChildren(...resultado.map(criarLinhaContato));
}