// src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth(); // Utiliser le hook d'authentification
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/users/login', {
            email,
            password,
        });

        // Vérifier si la réponse est OK
        if (response.status === 200) {
            const data = response.data;

            // Créer un objet avec le token, username, role, et id
            const userToStore = {
                token: data.token,
                username: data.user.username,
                role: data.user.role,
                id: data.user.id,  // Ajouter l'ID de l'utilisateur
            };

            // Stocker les informations dans localStorage
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('user', JSON.stringify(userToStore)); // Sauvegarder l'utilisateur avec son rôle, son nom d'utilisateur et son ID

            // Appeler la fonction login pour stocker les données de l'utilisateur dans le contexte
            login(userToStore);

            // Rediriger vers le tableau de bord
            navigate('/dashboard');
        } else {
            setError('Email ou mot de passe incorrect');
        }
    } catch (error) {
        setError('Une erreur est survenue, veuillez réessayer');
        console.error(error);
    }
};

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
      {/* Cette div va être centrée avec le formulaire */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-2xl font-semibold text-center mb-6">Se connecter</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email :</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Mot de passe :</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300">
            Se connecter
          </button>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>

        {/* Lien vers la page d'inscription */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Pas de compte ?{' '}
            <a href="/register" className="text-blue-500 hover:text-blue-600">
              S'inscrire ici
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
