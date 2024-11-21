import React, { createContext, useContext, useState, useEffect } from 'react';

// Créer le contexte d'authentification
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Chargement de l'utilisateur depuis localStorage lors du montage du composant
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // Exemple : récupérer les infos utilisateur stockées
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Fonction de connexion de l'utilisateur
  const login = (userData) => {
    setUser(userData); // Définit l'utilisateur dans l'état local
    localStorage.setItem('user', JSON.stringify(userData)); // Sauvegarde les infos utilisateur dans localStorage
  };

  // Fonction de déconnexion de l'utilisateur
  const logout = () => {
    setUser(null); // Supprimer l'utilisateur de l'état local
    localStorage.removeItem('user'); // Retirer les infos utilisateur de localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte d'authentification
export const useAuth = () => {
  return useContext(AuthContext);
};
