// server.js

// Importa as ferramentas essenciais que instalamos
const express = require('express');
const cors = require('cors');

// ADICIONE ESTA LINHA PARA IMPORTAR NOSSO NOVO CARDÁPIO
const leadsRouter = require('./routes/leads');

// Cria o nosso "servidor" de API
const app = express();

// Define a porta onde a API vai funcionar. A Render nos dirá qual é, ou usaremos a 3001.
const PORT = process.env.PORT || 3001;

// Configura os "middlewares" - regras que rodam antes de cada requisição
app.use(cors());
app.use(express.json());

// --- Nossas Rotas da API ---
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API do CliniFlow está no ar e funcionando!' });
});

// ADICIONE ESTA LINHA PARA DIZER AO SERVIDOR PARA USAR O CARDÁPIO DE LEADS
app.use('/api/v1', leadsRouter);


// "Liga" o servidor e o coloca para escutar por requisições na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
