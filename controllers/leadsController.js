// controllers/leadsController.js

// Importa a nossa "chave mestra" para o banco de dados
const db = require('../db');

// Cozinheiro 1: Agora sabe como buscar todos os leads do banco de dados real
const getAllLeads = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM leads ORDER BY created_at DESC');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cozinheiro 2: Agora sabe como criar um novo lead no banco de dados real
const createLead = async (req, res) => {
  // Ele pega os dados que o cliente enviou no corpo (body) da requisição
  const { full_name, email, phone_number, source, status, treatment_value, clinic_id } = req.body;

  try {
    const { rows } = await db.query(
      'INSERT INTO leads (full_name, email, phone_number, source, status, treatment_value, clinic_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [full_name, email, phone_number, source, status || 'Novo Contato', treatment_value, clinic_id]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Exportamos nossos novos cozinheiros inteligentes
module.exports = {
  getAllLeads,
  createLead,
};
