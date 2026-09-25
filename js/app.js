async function iniciarAplicacao() {
  try {
    await carregarCatalogo();
    adicionarBotoesDetalhes();
    adicionarControlesVeiculos();
    atualizarCardsFiltro();
    carregarVeiculosContato();
    mostrarComparacao();
  } catch (erro) {
    document.getElementById("resultado-busca").textContent = erro.message;
  }
}

iniciarAplicacao();