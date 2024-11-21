const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User'); // Assurez-vous que votre modèle User est correctement importé
const bcrypt = require('bcryptjs'); // Utilisez bcryptjs si vous l'avez installé

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    console.log('ici');
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'No user found with that email' });
    }

    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Invalid password' });
    }

    return done(null, user); // Retourne l'utilisateur authentifié
  } catch (err) {
    return done(err);
  }
}));

// Assurez-vous que le module exporte correctement la configuration de Passport
module.exports = passport;
