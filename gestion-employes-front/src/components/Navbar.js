// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Tableau de Bord</Link></li>
                <li><Link to="/employees">Employés</Link></li>
                <li><Link to="/leave-tracking">Suivi des Congés</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
