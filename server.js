const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(express.static(__dirname));

app.post("/api/contatos", (req, res) => {
  const { nome, email, telefone, veiculoInteresse, mensagem } = req.body;

  if (!nome || !email || !telefone || !veiculoInteresse || !mensagem) {
    return res.status(400).json({ mensagem: "Preencha todos os campos." });
  }

  return res.status(201).json({ mensagem: "Mensagem enviada com sucesso." });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});