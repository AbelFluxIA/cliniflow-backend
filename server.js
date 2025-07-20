// server.js

// Importa as ferramentas essenciais que instalamos
const express = require('express');
const cors = require('cors');

// Importa nossos "cardápios" (roteadores)
const leadsRouter = require('./routes/leads');
const authRouter = require('./routes/auth'); // <-- LINHA ADICIONADA

// Cria o nosso "servidor" de API
const app = express();

// Define a porta onde a API vai funcionar. A Render nos dirá qual é, ou usaremos a 3001.
const PORT = process.env.PORT || 3001;

// Configura os "middlewares" - regras que rodam antes de cada requisição
app.use(cors());
app.use(express.json());

// --- Nossas Rotas da API ---
// Rota de teste para ver se a API está no ar
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API do CliniFlow está no ar e funcionando!' });
});

// Diz ao servidor para usar o cardápio de leads para endereços que começam com /api/v1
app.use('/api/v1', leadsRouter);
// Diz ao servidor para usar o cardápio de autenticação para endereços que começam com /api/v1/auth
app.use('/api/v1/auth', authRouter); // <-- LINHA ADICIONADA


// "Liga" o servidor e o coloca para escutar por requisições na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
