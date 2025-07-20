// controllers/authController.js

const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Cozinheiro 1: Registrar uma nova clínica
const register = async (req, res) => {
  const { clinic_name, owner_email, password } = req.body;

  // Validação simples
  if (!clinic_name || !owner_email || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Criptografa a senha para nunca salvarmos a senha real no banco
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Gera uma chave de API única e segura
    const api_key = `sk_live_${crypto.randomBytes(24).toString('hex')}`;

    // Insere a nova clínica no banco de dados
    const { rows } = await db.query(
      'INSERT INTO clinics (clinic_name, owner_email, password_hash, api_key) VALUES ($1, $2, $3, $4) RETURNING id, clinic_name, owner_email, created_at',
      [clinic_name, owner_email, password_hash, api_key]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    // Trata o caso de e-mail já existente
    if (error.code === '23505') {
        return res.status(409).json({ error: 'Este e-mail já está em uso.' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Cozinheiro 2: Fazer o login de uma clínica
const login = async (req, res) => {
    const { owner_email, password } = req.body;

    if (!owner_email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        // Procura a clínica pelo e-mail
        const { rows } = await db.query('SELECT * FROM clinics WHERE owner_email = $1', [owner_email]);
        const clinic = rows[0];

        if (!clinic) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // Compara a senha enviada com a senha criptografada no banco
        const isMatch = await bcrypt.compare(password, clinic.password_hash);

        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // Se a senha estiver correta, cria um token de sessão (JWT)
        const payload = {
            clinic_id: clinic.id,
            email: clinic.owner_email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET || 'seu_segredo_jwt_padrao', { expiresIn: '7d' });

        res.status(200).json({ 
            message: 'Login bem-sucedido!',
            token: token
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
  register,
  login,
};
