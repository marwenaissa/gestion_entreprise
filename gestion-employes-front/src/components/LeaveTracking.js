import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateLeaveForm from './UpdateLeaveForm'; // Make sure this path is correct
import AddLeaveForm from './AddLeaveForm'; // Assuming you have this component for adding leaves


function LeaveTracking() {
    const [leaves, setLeaves] = useState([]);
    const [formData, setFormData] = useState({
        employeeId: '',
        startDate: '',
        endDate: '',
        type: 'Paid',
        status: 'Pending', // Default status set to 'Pending'
        reason: ''
    });

    const [selectedLeaveId, setSelectedLeaveId] = useState(null); // State for selected leave ID

    const handleLeaveAdded = (newLeave) => {
        setLeaves([...leaves, newLeave]);
    };

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await axios.get(BASE_URL); // Utilisez BASE_URL ici
                setLeaves(response.data); // Mettez à jour l'état avec les congés récupérés
            } catch (error) {
                console.error("Erreur lors de la récupération des congés", error);
            }
        };
    
        fetchLeaves(); // Appelez la fonction pour récupérer les congés
    }, []); // Le tableau vide assure que l'effet s'exécute uniquement lors du premier rendu
    
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const BASE_URL = "http://localhost:5000/api/leaves/";

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}${id}`);
            console.log(response.data);
    
            setLeaves(leaves.filter(leave => leave._id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression du congé", error);
            alert('Failed to delete the leave. Please check the console for details.');
        }
    };

    // Fonction pour mettre à jour un congé (exemple)
    const handleUpdate = async (id) => {
        // Vous pouvez implémenter une logique pour mettre à jour le congé ici
        // Par exemple, ouvrir un formulaire ou une modale pour modifier les détails du congé
        console.log(`Mettre à jour le congé avec l'ID: ${id}`);
        // Implémentez votre logique de mise à jour ici
    };

    const handleLeaveUpdated = (updatedLeave) => {
        setLeaves(leaves.map(leave => (leave._id === updatedLeave._id ? updatedLeave : leave)));
        setSelectedLeaveId(null); // Reset selected leave ID after update
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        // Appel API pour créer un nouveau congé
        axios.post('http://localhost:5000/api/leaves', formData)
            .then(response => {
                handleLeaveAdded(response.data); // Call the function to handle the newly added leave
                setFormData({ employeeId: '', startDate: '', endDate: '', type: 'Paid', status: 'Pending', reason: '' }); // Réinitialiser le formulaire
            })
            .catch(error => console.error("Erreur lors de la création du congé", error));
    };

    return (
        <div>
            <h2>Suivi des Congés</h2>
            <ul>
                {leaves.map((leave) => (
                    <li key={leave._id}>
                        {leave.employeeId?.name} - {leave.startDate} à {leave.endDate} ({leave.type}) - Statut : {leave.status}
                        <button onClick={() => setSelectedLeaveId(leave._id)}>Modifier</button>
                        <button onClick={() => handleDelete(leave._id)}>Supprimer</button>
                    </li>
                ))}
            </ul>

            {selectedLeaveId ? (
                <UpdateLeaveForm leaveId={selectedLeaveId} onLeaveUpdated={handleLeaveUpdated} />
            ) : (
                <AddLeaveForm onLeaveAdded={handleLeaveAdded} />
            )}
        </div>
    );
}

export default LeaveTracking;
