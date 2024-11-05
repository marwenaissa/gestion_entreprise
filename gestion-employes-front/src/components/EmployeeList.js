// src/components/EmployeeList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Appel API pour récupérer la liste des employés
        axios.get('/api/employees')
            .then(response => setEmployees(response.data))
            .catch(error => console.error("Erreur lors de la récupération des employés", error));
    }, []);

    return (
        <div>
            <h2>Liste des Employés</h2>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>
                        {employee.name} - {employee.position}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EmployeeList;
