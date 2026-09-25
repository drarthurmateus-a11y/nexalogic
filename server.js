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
function prepararVeiculo(dados) {
  const camposObrigatorios = [
    dados.marca,
    dados.modelo,
    dados.nome,
    dados.ano,
    dados.cambio,
    dados.combustivel,
    dados.cor,
    dados.preco,
    dados.imagem,
    dados.descricao
  ];

  if (camposObrigatorios.some((campo) => String(campo ?? "").trim() === "")) return null;

  const ano = Number(dados.ano);
  const quilometragem = Number(dados.quilometragem);
  const preco = Number(dados.preco);

  if (!Number.isInteger(ano) || ano < 1900 || !Number.isFinite(quilometragem) || quilometragem < 0 || !Number.isFinite(preco) || preco <= 0) return null;

  return {
    marca: dados.marca.trim().toLowerCase(),
    modelo: dados.modelo.trim().toLowerCase(),
    nome: dados.nome.trim(),
    ano,
    cambio: dados.cambio.trim(),
    combustivel: dados.combustivel.trim(),
    cor: dados.cor.trim(),
    quilometragem,
    preco,
    imagem: dados.imagem.trim(),
    imagemMobile: dados.imagemMobile?.trim() || dados.imagem.trim(),
    descricao: dados.descricao.trim(),
    opcionais: Array.isArray(dados.opcionais) ? dados.opcionais.map((item) => item.trim()).filter(Boolean) : [],
    vendido: Boolean(dados.vendido)
  };
}

app.get("/api/admin/veiculos", protegerAdmin, async (req, res) => {
  try {
    const resultado = await banco.query(`
      select id::integer, marca, modelo, nome, ano, cambio, combustivel, cor,
        quilometragem, preco::float8, imagem, imagem_mobile, descricao, opcionais, vendido
      from veiculos
      order by id
    `);

    return res.json(resultado.rows);
  } catch (erro) {
    console.error("Erro ao listar veículos:", erro.message);
    return res.status(500).json({ mensagem: "Não foi possível listar os veículos." });
  }
});

app.post("/api/admin/veiculos", protegerAdmin, async (req, res) => {
  const veiculo = prepararVeiculo(req.body);

  if (!veiculo) {
    return res.status(400).json({ mensagem: "Preencha os dados do veículo corretamente." });
  }

  try {
    const resultado = await banco.query(`
      insert into veiculos (
        marca, modelo, nome, ano, cambio, combustivel, cor, quilometragem,
        preco, imagem, imagem_mobile, descricao, opcionais, vendido
      ) values (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12, $13, $14
      )
      returning id::integer
    `, [
      veiculo.marca,
      veiculo.modelo,
      veiculo.nome,
      veiculo.ano,
      veiculo.cambio,
      veiculo.combustivel,
      veiculo.cor,
      veiculo.quilometragem,
      veiculo.preco,
      veiculo.imagem,
      veiculo.imagemMobile,
      veiculo.descricao,
      veiculo.opcionais,
      veiculo.vendido
    ]);

    return res.status(201).json({
      mensagem: "Veículo cadastrado com sucesso.",
      id: resultado.rows[0].id
    });
  } catch (erro) {
    console.error("Erro ao cadastrar veículo:", erro.message);
    return res.status(500).json({ mensagem: "Não foi possível cadastrar o veículo." });
  }
});

app.put("/api/admin/veiculos/:id", protegerAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const veiculo = prepararVeiculo(req.body);

  if (!Number.isInteger(id) || !veiculo) {
    return res.status(400).json({ mensagem: "Dados do veículo inválidos." });
  }

  try {
    const resultado = await banco.query(`
      update veiculos set
        marca = $1,
        modelo = $2,
        nome = $3,
        ano = $4,
        cambio = $5,
        combustivel = $6,
        cor = $7,
        quilometragem = $8,
        preco = $9,
        imagem = $10,
        imagem_mobile = $11,
        descricao = $12,
        opcionais = $13,
        vendido = $14
      where id = $15
      returning id
    `, [
      veiculo.marca,
      veiculo.modelo,
      veiculo.nome,
      veiculo.ano,
      veiculo.cambio,
      veiculo.combustivel,
      veiculo.cor,
      veiculo.quilometragem,
      veiculo.preco,
      veiculo.imagem,
      veiculo.imagemMobile,
      veiculo.descricao,
      veiculo.opcionais,
      veiculo.vendido,
      id
    ]);

    if (!resultado.rowCount) {
      return res.status(404).json({ mensagem: "Veículo não encontrado." });
    }

    return res.json({ mensagem: "Veículo atualizado com sucesso." });
  } catch (erro) {
    console.error("Erro ao atualizar veículo:", erro.message);
    return res.status(500).json({ mensagem: "Não foi possível atualizar o veículo." });
  }
});

app.patch("/api/admin/veiculos/:id/status", protegerAdmin, async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ mensagem: "Veículo inválido." });
  }

  try {
    const resultado = await banco.query(
      "update veiculos set vendido = not vendido where id = $1 returning vendido",
      [id]
    );

    if (!resultado.rowCount) {
      return res.status(404).json({ mensagem: "Veículo não encontrado." });
    }

    return res.json({
      mensagem: "Situação atualizada com sucesso.",
      vendido: resultado.rows[0].vendido
    });
  } catch (erro) {
    console.error("Erro ao alterar situação:", erro.message);
    return res.status(500).json({ mensagem: "Não foi possível alterar a situação." });
  }
});

app.delete("/api/admin/veiculos/:id", protegerAdmin, async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ mensagem: "Veículo inválido." });
  }

  try {
    const resultado = await banco.query(
      "delete from veiculos where id = $1 returning id",
      [id]
    );

    if (!resultado.rowCount) {
      return res.status(404).json({ mensagem: "Veículo não encontrado." });
    }

    return res.json({ mensagem: "Veículo excluído com sucesso." });
  } catch (erro) {
    console.error("Erro ao excluir veículo:", erro.message);

    return res.status(409).json({
      mensagem: "Este veículo possui registros relacionados e não pode ser excluído."
    });
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