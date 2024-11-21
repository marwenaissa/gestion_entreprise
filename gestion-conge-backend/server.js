const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const leaveRoutes = require('./routes/leaveRoutes');
const cors = require('cors'); // Importez le middleware CORS
const passport = require('passport');
const passportConfig = require('./config/passport');
const session = require('express-session'); // Add this line
const register = require('./routes/Register'); // Import the Register routes here
const login = require('./routes/Login'); // Import the Login routes here
const userRoutes = require('./routes/userRoutes'); // Import the user routes here

dotenv.config(); // Chargez les variables d'environnement depuis .env

const app = express(); // Créez l'application Express

app.use(cors()); // Activez CORS pour toutes les routes
app.use(bodyParser.json()); // Pour parser les requêtes JSON


// Middleware
app.use(cors());
app.use(session({ secret: 'secretkey', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Import Passport setup
require('./config/passport');  // Adjust the path as needed


// Connectez-vous à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));


// Routes pour les congés
app.use('/api/leaves', leaveRoutes);
app.use('/api/users', userRoutes);  // Ajout des routes utilisateur ici
app.use('/api/users', login);  // Utilisation des routes de login sous le chemin '/api/users'
app.use('/auth', register);  // Utilisation des routes de login sous le chemin '/api/users'


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
