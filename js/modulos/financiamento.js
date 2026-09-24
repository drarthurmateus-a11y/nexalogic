const formularioFinanciamento = document.getElementById("form-financiamento");
const campoValorVeiculo = document.getElementById("valor-veiculo");
const campoValorEntrada = document.getElementById("valor-entrada");
const campoParcelas = document.getElementById("quantidade-parcelas");
const campoTaxaJuros = document.getElementById("taxa-juros");
const resultadoFinanciamento = document.getElementById("resultado-financiamento");
const totalFinanciado = document.getElementById("total-financiado");
const valorParcela = document.getElementById("valor-parcela");
const financiamentoErro = document.getElementById("financiamento-erro");

function calcularFinanciamento(event) {
  event.preventDefault();

  const valorVeiculo = Number(campoValorVeiculo.value);
  const valorEntrada = Number(campoValorEntrada.value);
  const parcelas = Number(campoParcelas.value);
  const taxaJuros = Number(campoTaxaJuros.value);

  if (valorVeiculo <= 0) {
    financiamentoErro.textContent = "Informe um valor válido para o veículo.";
    resultadoFinanciamento.hidden = true;
    return;
  }

  if (valorEntrada < 0 || valorEntrada >= valorVeiculo) {
    financiamentoErro.textContent = "A entrada deve ser menor que o valor do veículo.";
    resultadoFinanciamento.hidden = true;
    return;
  }

  if (parcelas <= 0 || taxaJuros < 0) {
    financiamentoErro.textContent = "Informe parcelas e taxa de juros válidas.";
    resultadoFinanciamento.hidden = true;
    return;
  }

  const valorFinanciado = valorVeiculo - valorEntrada;
  const taxaMensal = taxaJuros / 100;
  let parcela = valorFinanciado / parcelas;

  if (taxaMensal > 0) {
    const fatorJuros = Math.pow(1 + taxaMensal, parcelas);
    parcela = valorFinanciado * (taxaMensal * fatorJuros) / (fatorJuros - 1);
  }

  financiamentoErro.textContent = "";
  totalFinanciado.textContent = formatarPreco(valorFinanciado);
  valorParcela.textContent = `${parcelas}x de ${formatarPreco(parcela)}`;
  resultadoFinanciamento.hidden = false;
}

formularioFinanciamento.addEventListener("submit", calcularFinanciamento);