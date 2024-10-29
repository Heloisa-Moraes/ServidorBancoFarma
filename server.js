const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado ao MongoDB!');

        // Iniciar o servidor apenas após a conexão bem-sucedida
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro de conexão:', err);
        process.exit(1); // Finaliza o processo se a conexão falhar
    });

// Modelo Mongoose para Farmacia
const farmaciaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    endereco: { type: String, required: true },
    // outros campos que você deseja adicionar...
});

const Farmacia = mongoose.model('Farmacia', farmaciaSchema);

// Rotas
app.get('/api/test', (req, res) => {
    res.send('API está funcionando!');
});

// Endpoint para buscar farmácias
app.get('/api/test/farmacias', async (req, res) => {
    try {
        const farmacias = await Farmacia.find(); // Busca todas as farmácias no banco
        res.json(farmacias); // Retorna as farmácias como JSON
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
