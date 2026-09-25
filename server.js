const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const path = require("path");
const banco = require("./js/banco/conexao");

const app = express();
const PORT = process.env.PORT || 3000;
const segredoSessao = process.env.SESSION_SECRET;

if (!segredoSessao) throw new Error("SESSION_SECRET não configurada.");

app.set("trust proxy", 1);
app.use(express.json());
app.use(session({
  secret: segredoSessao,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 8
  }
}));
app.use(express.static(__dirname));

function protegerAdmin(req, res, next) {
  if (!req.session.usuario) return res.status(401).json({ mensagem: "Acesso não autorizado." });
  next();
}

app.get("/api/veiculos", async (req, res) => {
  try {
    const resultado = await banco.query(`
      select id::integer, marca, modelo, nome, ano, cambio, combustivel, cor,
        quilometragem, preco::float8, imagem, imagem_mobile, descricao, opcionais
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

app.post("/api/admin/login", async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ mensagem: "Informe e-mail e senha." });

  try {
    const resultado = await banco.query(
      "select id::integer, nome, email, senha_hash from usuarios where lower(email) = lower($1) and administrador = true limit 1",
      [email.trim()]
    );
    const usuario = resultado.rows[0];
    const senhaCorreta = usuario && await bcrypt.compare(senha, usuario.senha_hash);

    if (!senhaCorreta) return res.status(401).json({ mensagem: "E-mail ou senha inválidos." });

    req.session.usuario = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    };

    return res.json({ usuario: req.session.usuario });
  } catch (erro) {
    console.error("Erro ao entrar no painel:", erro.message);
    return res.status(500).json({ mensagem: "Não foi possível entrar no painel." });
  }
});

app.get("/api/admin/sessao", protegerAdmin, (req, res) => {
  return res.json({ usuario: req.session.usuario });
});

app.post("/api/admin/logout", protegerAdmin, (req, res) => {
  req.session.destroy((erro) => {
    if (erro) return res.status(500).json({ mensagem: "Não foi possível sair do painel." });

    res.clearCookie("connect.sid");
    return res.json({ mensagem: "Sessão encerrada." });
  });
});

app.get("/api/admin/resumo", protegerAdmin, async (req, res) => {
  try {
    const veiculos = await banco.query(`
      select
        count(*) filter (where vendido = false)::integer as disponiveis,
        count(*) filter (where vendido = true)::integer as vendidos
      from veiculos
    `);
    const contatos = await banco.query("select count(*)::integer as total from contatos");

    return res.json({
      disponiveis: veiculos.rows[0].disponiveis,
      vendidos: veiculos.rows[0].vendidos,
      contatos: contatos.rows[0].total
    });
  } catch (erro) {
    console.error("Erro ao carregar resumo:", erro.message);
    return res.status(500).json({ mensagem: "Não foi possível carregar o resumo." });
  }
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "admin.html"));
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