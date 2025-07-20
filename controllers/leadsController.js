// controllers/leadsController.js

// Vamos criar uma lista de leads de exemplo para testar
let leadsDeExemplo = [
  { id: 1, full_name: "Juliano (Exemplo)", email: "juliano@exemplo.com", status: "Novo Contato" },
  { id: 2, full_name: "Abel de Camargo (Exemplo)", email: "abel@exemplo.com", status: "Qualificado" }
];

// Cozinheiro 1: Sabe como buscar e listar todos os leads
const getAllLeads = (req, res) => {
  // Por enquanto, ele apenas retorna nossa lista de exemplo
  res.status(200).json(leadsDeExemplo);
};

// Cozinheiro 2: Sabe como criar um novo lead
const createLead = (req, res) => {
  // Ele pega os dados que o cliente enviou no corpo (body) da requisição
  const novoLead = req.body;
  
  // Adiciona um ID de exemplo
  novoLead.id = Date.now(); 

  // Adiciona o novo lead à nossa lista de exemplo
  leadsDeExemplo.push(novoLead);

  // Retorna uma resposta de sucesso (201 Created) e o lead que foi criado
  res.status(201).json(novoLead);
};

// Exportamos nossos cozinheiros para o cardápio poder usá-los
module.exports = {
  getAllLeads,
  createLead,
};
