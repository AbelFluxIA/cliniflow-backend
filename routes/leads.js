// routes/leads.js

const express = require('express');
const router = express.Router();

// Vamos importar nosso "cozinheiro" de leads, que criaremos no próximo passo
const leadsController = require('../controllers/leadsController');

// Quando uma requisição GET chegar para "/leads", chame o cozinheiro "getAllLeads"
router.get('/leads', leadsController.getAllLeads);

// Quando uma requisição POST chegar para "/leads", chame o cozinheiro "createLead"
router.post('/leads', leadsController.createLead);

// Exportamos o cardápio pronto para ser usado pelo nosso gerente (server.js)
module.exports = router;
