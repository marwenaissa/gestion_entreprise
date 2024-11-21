const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
  console.log('aze');
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from header
  console.log('Token:', token);
  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.status(403).json({ message: 'Token invalide' });
    }
    req.user = decoded; // Add the decoded user (payload) to the request object
    console.log('Decoded user:', req.user);
    next(); // Proceed to the next middleware or route handler
  });
};


// Route to get the logged-in user's info
// Route pour obtenir l'utilisateur connecté
router.get('/me', authenticateToken, async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
          return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.json(user); // Retourner les informations de l'utilisateur
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

module.exports = router;
