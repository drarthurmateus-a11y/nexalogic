const express = require("express");
const path = require("path");
const banco = require("./js/banco/conexao");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.get("/api/veiculos", async (req, res) => {
  try {
    const resultado = await banco.query(`
      select id::integer, marca, modelo, nome, ano, cambio, combustivel, cor,
        quilometragem, preco::float8, imagem, descricao, opcionais
      from veiculos
      where vendido = false
      order by id
    `);

    return res.json(resultado.rows);
  } catch (erro) {
    console.error("Erro ao buscar veículos:", erro.message);
    return res.status(500).json({ mensagem: "Não foi possível buscar os veículos." });
  }
});

app.post("/api/contatos", async (req, res) => {
  const { nome, email, telefone, veiculoId, mensagem } = req.body;

  if (!nome || !email || !telefone || !veiculoId || !mensagem) {
    return res.status(400).json({ mensagem: "Preencha todos os campos." });
  }

  try {
    await banco.query(
      "insert into contatos (nome, email, telefone, mensagem, veiculo_id) values ($1, $2, $3, $4, $5)",
      [nome, email, telefone, mensagem, Number(veiculoId)]
    );

    return res.status(201).json({ mensagem: "Mensagem enviada com sucesso." });
  } catch (erro) {
    console.error("Erro ao salvar contato:", erro.message);
    return res.status(500).json({ mensagem: "Não foi possível salvar a mensagem." });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

banco.query("select now()")
  .then(() => console.log("Banco de dados conectado"))
  .catch((erro) => console.error("Erro ao conectar ao banco:", erro.message));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});