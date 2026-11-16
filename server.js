const express = require('express');
const cors = require('cors');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Inicializa Banco de Dados SQLite em arquivo
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new DatabaseSync(dbPath);

// Criação da tabela
db.exec(`
  CREATE TABLE IF NOT EXISTS formularios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cnpj TEXT,
    razao_social TEXT,
    nome_fantasia TEXT,
    municipio TEXT,
    uf TEXT,
    tipo_oferta TEXT,
    responsavel_preenchimento TEXT,
    dados_json TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Helper para autenticação do Admin
function checkAdminAuth(req, res, next) {
  const token = req.headers['x-admin-key'] || req.query.key;
  if (token && token === ADMIN_PASSWORD) {
    return next();
  }
  return res.status(401).json({ error: 'Acesso não autorizado. Senha de administrador inválida.' });
}

// ----------------- ROTAS DE API -----------------

// 1. Login do Administrador
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    return res.json({ success: true, token: ADMIN_PASSWORD, message: 'Autenticado com sucesso!' });
  }
  return res.status(401).json({ success: false, error: 'Senha incorreta.' });
});

// 2. Salvar Formulário (Entidade submete online)
app.post('/api/formularios', (req, res) => {
  try {
    const data = req.body;
    const cnpj = data.entidade_cnpj || 'Não informado';
    const razaoSocial = data.entidade_razao_social || 'Não informada';
    const nomeFantasia = data.entidade_nome_fantasia || '';
    const municipio = data.entidade_municipio || '';
    const uf = data.entidade_uf || '';
    const responsavel = data.pres_nome || '';

    // Identificar quais ofertas foram preenchidas
    const ofertas = [];
    if (data.ben_nome_oferta) ofertas.push('Benefícios Assistenciais');
    if (data.ass_nome_oferta) ofertas.push('Assessoramento e Direitos');
    if (data.prog_nome_oferta) ofertas.push('Programas e Projetos');
    if (data.serv_nome_oferta) ofertas.push('Serviço');
    const tipoOferta = ofertas.length > 0 ? ofertas.join(', ') : 'Cadastro Geral';

    const dadosJson = JSON.stringify(data);

    const stmt = db.prepare(`
      INSERT INTO formularios 
      (cnpj, razao_social, nome_fantasia, municipio, uf, tipo_oferta, responsavel_preenchimento, dados_json, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now', 'localtime'), datetime('now', 'localtime'))
    `);

    const info = stmt.run(cnpj, razaoSocial, nomeFantasia, municipio, uf, tipoOferta, responsavel, dadosJson);

    res.json({
      success: true,
      id: Number(info.lastInsertRowid),
      message: 'Formulário recebido e salvo com sucesso no banco de dados online!'
    });
  } catch (error) {
    console.error('Erro ao salvar formulário:', error);
    res.status(500).json({ success: false, error: 'Erro interno ao processar formulário.' });
  }
});

// 3. Listar Formulários (Apenas Admin)
app.get('/api/formularios', checkAdminAuth, (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT id, cnpj, razao_social, nome_fantasia, municipio, uf, tipo_oferta, responsavel_preenchimento, created_at, updated_at
      FROM formularios
      ORDER BY id DESC
    `);
    const rows = stmt.all();
    res.json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    console.error('Erro ao listar:', error);
    res.status(500).json({ success: false, error: 'Erro ao carregar lista de formulários.' });
  }
});

// 4. Obter um Formulário por ID (Para Visualizar e Imprimir)
app.get('/api/formularios/:id', (req, res) => {
  try {
    const id = req.params.id;
    const stmt = db.prepare('SELECT * FROM formularios WHERE id = ?');
    const row = stmt.get(id);

    if (!row) {
      return res.status(404).json({ success: false, error: 'Formulário não encontrado.' });
    }

    res.json({
      success: true,
      data: {
        id: row.id,
        cnpj: row.cnpj,
        razao_social: row.razao_social,
        nome_fantasia: row.nome_fantasia,
        municipio: row.municipio,
        uf: row.uf,
        tipo_oferta: row.tipo_oferta,
        created_at: row.created_at,
        formData: JSON.parse(row.dados_json || '{}')
      }
    });
  } catch (error) {
    console.error('Erro ao obter formulário:', error);
    res.status(500).json({ success: false, error: 'Erro ao consultar formulário.' });
  }
});

// 5. Excluir Formulário (Apenas Admin)
app.delete('/api/formularios/:id', checkAdminAuth, (req, res) => {
  try {
    const id = req.params.id;
    const stmt = db.prepare('DELETE FROM formularios WHERE id = ?');
    stmt.run(id);
    res.json({ success: true, message: 'Formulário excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir:', error);
    res.status(500).json({ success: false, error: 'Erro ao excluir formulário.' });
  }
});

// 6. Exportar Relatório em CSV para Excel (Apenas Admin)
app.get('/api/export-csv', checkAdminAuth, (req, res) => {
  try {
    const stmt = db.prepare('SELECT id, cnpj, razao_social, nome_fantasia, municipio, uf, tipo_oferta, responsavel_preenchimento, created_at FROM formularios ORDER BY id DESC');
    const rows = stmt.all();

    let csv = 'ID;CNPJ;RAZAO SOCIAL;NOME FANTASIA;MUNICIPIO;UF;OFERTAS PREENCHIDAS;RESPONSAVEL;DATA ENVIO\n';
    rows.forEach(r => {
      csv += `"${r.id}";"${r.cnpj}";"${r.razao_social}";"${r.nome_fantasia}";"${r.municipio}";"${r.uf}";"${r.tipo_oferta}";"${r.responsavel_preenchimento}";"${r.created_at}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="CNEAS_Entidades_Cadastradas.csv"');
    res.send('\uFEFF' + csv);
  } catch (error) {
    res.status(500).send('Erro ao exportar CSV.');
  }
});

// ----------------- ROTAS DE FRONT-END -----------------

// Painel Administrativo
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Visualizar e Imprimir Formulário Específico
app.get('/visualizar/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` Servidor CNEAS / SUAS Online rodando com sucesso!`);
  console.log(` - Formulário das Entidades : http://localhost:${PORT}`);
  console.log(` - Painel Administrativo   : http://localhost:${PORT}/admin`);
  console.log(` - Senha inicial do Admin   : ${ADMIN_PASSWORD}`);
  console.log(`=======================================================`);
});
