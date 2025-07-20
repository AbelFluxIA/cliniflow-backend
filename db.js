// db.js

const { Pool } = require('pg');
require('dotenv').config(); // Carrega as variáveis de ambiente

// O 'Pool' é como uma central de conexões. Ele gerencia as conexões
// com o banco de dados de forma eficiente.
const pool = new Pool({
  // A biblioteca 'pg' é inteligente. Se ela encontrar a variável de ambiente
  // DATABASE_URL (que a Render nos deu e configuramos), ela a usará automaticamente.
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Necessário para conexões com a Render
  }
});

// Exportamos o 'pool' para que nossos "cozinheiros" (controllers) possam usá-lo
module.exports = {
  query: (text, params) => pool.query(text, params),
};
