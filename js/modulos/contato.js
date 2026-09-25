const campoContatoNome = document.getElementById("contato-nome");
const campoContatoEmail = document.getElementById("contato-email");
const campoContatoTelefone = document.getElementById("contato-telefone");
const campoContatoVeiculo = document.getElementById("contato-veiculo");
const campoContatoMensagem = document.getElementById("contato-mensagem");
const contatoStatus = document.getElementById("contato-status");

function carregarVeiculosContato() {
  veiculos.forEach((veiculo) => {
    const opcao = document.createElement("option");
    opcao.value = veiculo.id;
    opcao.textContent = veiculo.nome;
    campoContatoVeiculo.append(opcao);
  });
}

async function enviarContato(event) {
  event.preventDefault();

  const dadosContato = {
    nome: campoContatoNome.value.trim(),
    email: campoContatoEmail.value.trim(),
    telefone: campoContatoTelefone.value.trim(),
    veiculoId: Number(campoContatoVeiculo.value),
    mensagem: campoContatoMensagem.value.trim()
  };

  contatoStatus.className = "contato-status";
  contatoStatus.textContent = "Enviando mensagem...";

  try {
    const resposta = await fetch("/api/contatos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dadosContato)
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      contatoStatus.className = "contato-status erro";
      contatoStatus.textContent = resultado.mensagem;
      return;
    }

    contatoStatus.className = "contato-status sucesso";
    contatoStatus.textContent = resultado.mensagem;
    formularioContato.reset();
  } catch {
    contatoStatus.className = "contato-status erro";
    contatoStatus.textContent = "Não foi possível enviar a mensagem.";
  }
}


formularioContato.addEventListener("submit", enviarContato);