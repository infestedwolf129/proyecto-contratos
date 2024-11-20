const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Ruta para recibir y guardar el contrato
app.post('/guardar-contrato', (req, res) => {
    const contrato = req.body;  // Recibe los datos del contrato enviados desde el frontend
    console.log('Contrato recibido:', contrato);

    // Aquí podrías guardar los datos en una base de datos o realizar más procesamiento
    res.status(200).send({ message: 'Contrato recibido y guardado', contrato });
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

