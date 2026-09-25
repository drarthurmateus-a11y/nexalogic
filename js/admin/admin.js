const areaLogin = document.getElementById("area-login");
const areaPainel = document.getElementById("area-painel");
const formularioLogin = document.getElementById("form-login");
const campoLoginEmail = document.getElementById("login-email");
const campoLoginSenha = document.getElementById("login-senha");
const loginStatus = document.getElementById("login-status");
const painelStatus = document.getElementById("painel-status");
const usuarioNome = document.getElementById("usuario-nome");
const totalDisponiveis = document.getElementById("total-disponiveis");
const totalVendidos = document.getElementById("total-vendidos");
const totalContatos = document.getElementById("total-contatos");
const botaoSair = document.getElementById("botao-sair");

function mostrarLogin() {
  areaLogin.hidden = false;
  areaPainel.hidden = true;
}

function mostrarPainel(usuario) {
  usuarioNome.textContent = usuario.nome;
  areaLogin.hidden = true;
  areaPainel.hidden = false;
}

async function carregarResumo() {
  const resposta = await fetch("/api/admin/resumo");
  const resultado = await resposta.json();
  if (!resposta.ok) throw new Error(resultado.mensagem);

  totalDisponiveis.textContent = resultado.disponiveis;
  totalVendidos.textContent = resultado.vendidos;
  totalContatos.textContent = resultado.contatos;
  await carregarVeiculosAdmin();
}

async function verificarSessao() {
  try {
    const resposta = await fetch("/api/admin/sessao");

    if (!resposta.ok) {
      mostrarLogin();
      return;
    }

    const resultado = await resposta.json();
    mostrarPainel(resultado.usuario);
    await carregarResumo();
  } catch {
    mostrarLogin();
  }
}

async function entrar(event) {
  event.preventDefault();
  loginStatus.className = "status";
  loginStatus.textContent = "Entrando...";

  try {
    const resposta = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: campoLoginEmail.value.trim(),
        senha: campoLoginSenha.value
      })
    });
    const resultado = await resposta.json();

    if (!resposta.ok) throw new Error(resultado.mensagem);

    formularioLogin.reset();
    loginStatus.textContent = "";
    mostrarPainel(resultado.usuario);
    await carregarResumo();
  } catch (erro) {
    loginStatus.className = "status erro";
    loginStatus.textContent = erro.message;
  }
}

async function sair() {
  try {
    const resposta = await fetch("/api/admin/logout", {
      method: "POST"
    });
    const resultado = await resposta.json();

    if (!resposta.ok) throw new Error(resultado.mensagem);

    mostrarLogin();
  } catch (erro) {
    painelStatus.className = "status erro";
    painelStatus.textContent = erro.message;
  }
}

formularioLogin.addEventListener("submit", entrar);
botaoSair.addEventListener("click", sair);
