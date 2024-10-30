const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080; // Mudei para 8080 para combinar com o Railway

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
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

// Definindo o modelo de farmácia
const farmaciaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    endereco: { type: String, required: true },
    telefone: { type: String },
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true } // Array de números
    },
    abre: { type: String },
    fecha: { type: String },
    plantao: { type: [Date] } // Array de datas
});

const Farmacia = mongoose.model('Farmacia', farmaciaSchema);

// Rotas
app.get('/api/test', (req, res) => {
    res.send('API está funcionando!');
});

app.get('/api/test/farmacias', async (req, res) => {
    try {
        const farmacias = await Farmacia.find();
        console.log('Farmácias encontradas:', farmacias); // Log para depuração
        res.json(farmacias);
    } catch (error) {
        console.error('Erro ao buscar farmácias:', error); // Log do erro
        res.status(500).send('Erro ao buscar farmácias');
    }
});
