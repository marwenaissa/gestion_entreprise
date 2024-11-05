// src/components/UpdateLeaveForm.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UpdateLeaveForm({ leaveId, onLeaveUpdated }) {
    const [formData, setFormData] = useState({
        employeeId: '',
        startDate: '',
        endDate: '',
        type: 'Paid',
        status: 'Pending',
        reason: ''
    });

    const BASE_URL = "http://localhost:5000/api/leaves/";

    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const response = await axios.get(`${BASE_URL}${leaveId}`);
                setFormData(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération du congé", error);
            }
        };

        if (leaveId) {
            fetchLeave();
        }
    }, [leaveId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${BASE_URL}${leaveId}` , formData);
            onLeaveUpdated(response.data); // Appel de la fonction pour mettre à jour le congé dans le parent
        } catch (error) {
            console.error("Erreur lors de la mise à jour du congé", error);
        }
    };

    return (
        <div>
            <h3>Modifier le congé</h3>
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
                <button type="submit">Mettre à jour Congé</button>
            </form>
        </div>
    );
}

export default UpdateLeaveForm;
