const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Assurez-vous d'avoir un modèle User
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    //console.log("Request body:", req.body); // Affiche le body reçu

    const { username, email, password, role } = req.body;
  
    // Validation: Check if all required fields are provided
    if (!username || !email || !password) {
      return res.status(400).send({ message: 'Tous les champs sont obligatoires' });
    }
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: 'Cet email est déjà utilisé' });
      }
  
      //console.log(password);
      
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
      //console.log(hashedPassword);
      
      // Create a new user instance with the provided details
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role: role || 'user', // Default to 'user' if no role is provided
      });
  
      // Save the new user to the database
      await newUser.save();
  
      // Send a success response
      res.status(201).send({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Erreur lors de l\'inscription' });
    }
  });
  

module.exports = router;
