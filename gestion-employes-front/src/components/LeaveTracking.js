import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateLeaveForm from './UpdateLeaveForm'; 
import AddLeaveForm from './AddLeaveForm'; 
import Modal from './Modal';

function LeaveTracking() {
    const [leaves, setLeaves] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedLeaveId, setSelectedLeaveId] = useState(null); 
    const [userRole, setUserRole] = useState('');  // Stockage du rôle de l'utilisateur (ex: 'user', 'admin', etc.)

    const BASE_URL = "http://localhost:5000/api/leaves/";

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await axios.get(BASE_URL);
                setLeaves(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des congés", error);
            }
        };

        // Logique pour obtenir le rôle de l'utilisateur depuis localStorage
        const fetchUserRole = () => {
            const storedUser = localStorage.getItem('user'); // On suppose que les données utilisateur sont dans localStorage
            if (storedUser) {
                try {
                    console.log(parsedUser);
                    const parsedUser = JSON.parse(storedUser);
                    setUserRole(parsedUser.role); // Récupérer et définir le rôle de l'utilisateur
                } catch (error) {
                    console.error('Erreur lors de la récupération du rôle de l\'utilisateur', error);
                }
            }
        };

        fetchLeaves();
        fetchUserRole();
    }, []);  // Ne lancer qu'une fois lors du premier rendu

    const handleLeaveAdded = (newLeave) => {
        setLeaves([...leaves, newLeave]);
        setShowModal(false);
    };

    const handleLeaveUpdated = (updatedLeave) => {
        setLeaves(leaves.map(leave => (leave._id === updatedLeave._id ? updatedLeave : leave)));
        setShowModal(false);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}${id}`);
            setLeaves(leaves.filter(leave => leave._id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression du congé", error);
            alert('Échec de la suppression du congé. Veuillez vérifier la console pour plus de détails.');
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', options);
    };

    return (
        <div className="flex pt-16 pl-0 pr-0">
            <div className="w-full p-8">
                <h2 className="text-2xl font-bold mb-4 text-center">Suivi des Congés</h2>

                <button 
                    onClick={() => {
                        setSelectedLeaveId(null); 
                        setShowModal(true);
                    }} 
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
                >
                    Ajouter un Congé
                </button>

                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Employé</th>
                            <th className="py-3 px-6 text-left">Date de début</th>
                            <th className="py-3 px-6 text-left">Date de fin</th>
                            <th className="py-3 px-6 text-left">Type</th>
                            <th className="py-3 px-6 text-left">Statut</th>
                            <th className="py-3 px-6 text-left">Raison</th>
                            <th className="py-3 px-6 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {leaves.map((leave) => (
                            <tr key={leave._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6">{leave.employeeId?.username}</td>
                                <td className="py-3 px-6">{formatDate(leave.startDate)}</td>
                                <td className="py-3 px-6">{formatDate(leave.endDate)}</td>
                                <td className="py-3 px-6">{leave.type}</td>
                                <td className="py-3 px-6 text-yellow-500">{leave.status}</td>
                                <td className="py-3 px-6">{leave.reason}</td>
                                <td className="py-3 px-6 flex space-x-2">
                                    {/* Vérifier si l'utilisateur a le rôle "user" et si le statut est "Pending" */}
                                    {(userRole === 'user' && leave.status === 'Pending') && (
                                        <>
                                            <button 
                                                onClick={() => {
                                                    setSelectedLeaveId(leave._id); 
                                                    setShowModal(true);
                                                }} 
                                                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                            >
                                                Modifier
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(leave._id)} 
                                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            >
                                                Supprimer
                                            </button>
                                        </>
                                    )}
                                    {/* Afficher un message si l'utilisateur n'a pas le droit */}
                                    {(userRole !== 'user' || leave.status !== 'Pending') && (
                                        <span>Accès restreint</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showModal && (
                    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                        {selectedLeaveId ? (
                            <UpdateLeaveForm 
                                leaveId={selectedLeaveId} 
                                onLeaveUpdated={handleLeaveUpdated} 
                                handleClose={() => setShowModal(false)} 
                            />
                        ) : (
                            <AddLeaveForm 
                                handleClose={() => setShowModal(false)} 
                                onLeaveAdded={handleLeaveAdded} 
                            />
                        )}
                    </Modal>
                )}
            </div>
        </div>
    );
}

export default LeaveTracking;
