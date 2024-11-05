// src/pages/EmployeeDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

function EmployeeDetails() {
    const { id } = useParams();
    // Utilisez l'ID pour récupérer les détails de l'employé
    return (
        <div>
            <h2>Détails de l'Employé {id}</h2>
            <p>Informations détaillées sur l'employé.</p>
        </div>
    );
}

export default EmployeeDetails;
