// src/components/AddLeaveForm.js

import React, { useState } from 'react';
import axios from 'axios';

function AddLeaveForm({ onLeaveAdded }) {
    const [formData, setFormData] = useState({
        employeeId: '',
        startDate: '',
        endDate: '',
        type: 'Paid',
        status: 'Pending',
        reason: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/leaves', formData);
            onLeaveAdded(response.data); // Appel de la fonction pour ajouter le congé au parent
            setFormData({ employeeId: '', startDate: '', endDate: '', type: 'Paid', status: 'Pending', reason: '' });
        } catch (error) {
            console.error("Erreur lors de la création du congé", error);
        }
    };

    return (
        <div>
            <h3>Ajouter un nouveau congé</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    ID Employé:
                    <input
                        type="text"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Date de début:
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Date de fin:
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Type de congé:
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                    >
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                        <option value="Sick">Sick</option>
                    </select>
                </label>
                <label>
                    Statut:
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </label>
                <label>
                    Raison:
                    <input
                        type="text"
                        name="reason"
                        value={formData.reason}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Ajouter Congé</button>
            </form>
        </div>
    );
}

export default AddLeaveForm;
