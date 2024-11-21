import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Pour la redirection
import { useAuth } from '../context/AuthContext'; // Adaptez ce chemin selon votre structure de dossiers

function Header() {
    const [notifications, setNotifications] = useState([
        "New employee added",
        "Leave request pending approval",
    ]); // Remplacer par des données réelles de notifications
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate(); // Initialiser le hook de navigation
    const { logout } = useAuth(); // Récupérer la fonction logout depuis le contexte

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    // Fonction de déconnexion
    const handleLogout = () => {
        logout(); // Appeler la méthode logout du contexte
        navigate('/login'); // Rediriger vers la page de connexion
    };

    return (
        <header className="bg-gray-800 p-4 shadow-md flex justify-between items-center fixed top-0 left-0 w-full z-10">
            {/* Right Section: Notifications and Logout */}
            <div className="flex items-center space-x-4 ml-auto relative">
                {/* Notification Circle */}
                <div onClick={toggleDropdown} className="relative cursor-pointer">
                    {notifications.length > 0 && (
                        <div className="bg-red-500 h-3 w-3 rounded-full absolute top-0 right-0"></div>
                    )}
                    <div className="bg-gray-400 h-6 w-6 rounded-full flex items-center justify-center text-white text-xs">
                        {notifications.length}
                    </div>

                    {/* Dropdown */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                            <ul className="p-2">
                                {notifications.length > 0 ? (
                                    notifications.map((notification, index) => (
                                        <li key={index} className="text-gray-800 px-4 py-2 hover:bg-gray-100">
                                            {notification}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-500 px-4 py-2">No notifications</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Déconnecter Button */}
                <button 
                    onClick={handleLogout} // Ajouter l'événement pour la déconnexion
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                    Déconnecter
                </button>
            </div>
        </header>
    );
}

export default Header;
