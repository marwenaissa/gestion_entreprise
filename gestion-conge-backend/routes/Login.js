const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Assurez-vous que vous avez un modèle User pour l'authentification
const router = express.Router();

// POST login route - Authentication & JWT generation
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Récupérer les informations d'identification envoyées

    try {
        // Trouver l'utilisateur par email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Comparer le mot de passe envoyé avec celui stocké en utilisant bcrypt
        /* const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        } */

        // Créer la charge utile du JWT (détails de l'utilisateur à inclure)
        const payload = {
            id: user._id,  // Utilisez _id comme identifiant unique
            email: user.email
        };

        // Générer le JWT avec une clé secrète (utilisez une clé secrète plus sécurisée en production)
        const token = jwt.sign(payload, 'votre_clé_secrète', { expiresIn: '1h' });
       // console.log(user);
        // Envoyer à la fois le token et les informations utilisateur sous forme de réponse JSON
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                // Vous pouvez ajouter plus de données utilisateur si nécessaire, par exemple :
                username: user.username,
                role: user.role,
                // Assurez-vous de ne pas retourner le mot de passe !
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
