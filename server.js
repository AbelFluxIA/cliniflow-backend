// Importa as ferramentas essenciais que instalamos
const express = require('express');
const cors = require('cors');

// Cria o nosso "servidor" de API
const app = express();

// Define a porta onde a API vai funcionar. A Render nos dirá qual é, ou usaremos a 3001.
const PORT = process.env.PORT || 3001;

// Configura os "middlewares" - regras que rodam antes de cada requisição
app.use(cors()); // Permite que nosso frontend (em outro endereço) possa conversar com a API
app.use(express.json()); // Permite que a API entenda o formato JSON

// --- Nossas Rotas da API virão aqui no futuro ---
// Por enquanto, vamos criar uma rota de teste para ver se o servidor está no ar
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API do CliniFlow está no ar e funcionando!' });
});

// "Liga" o servidor e o coloca para escutar por requisições na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
