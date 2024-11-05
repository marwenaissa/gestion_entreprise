const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const leaveRoutes = require('./routes/leaveRoutes');
const cors = require('cors'); // Importez le middleware CORS

dotenv.config(); // Chargez les variables d'environnement depuis .env

const app = express(); // Créez l'application Express

app.use(cors()); // Activez CORS pour toutes les routes
app.use(bodyParser.json()); // Pour parser les requêtes JSON

// Connectez-vous à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes pour les congés
app.use('/api/leaves', leaveRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
