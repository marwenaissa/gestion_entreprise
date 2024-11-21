import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function AddLeaveForm({ handleClose, onLeaveAdded }) {
    const BASE_URL = "http://localhost:5000/api/leaves/";
    const [userRole, setUserRole] = useState('');  // Rôle de l'utilisateur
    const [username, setUsername] = useState('');  // Nom d'utilisateur
    const [userId, setUserId] = useState('');  // ID de l'utilisateur

    const initialValues = {
        employeeId: '',  // Il sera remplacé par l'ID utilisateur lors de la soumission
        startDate: '',
        endDate: '',
        type: 'Paid',
        status: 'Pending',  // Définir par défaut à "Pending"
        reason: ''
    };

    const validationSchema = Yup.object({
        // Ne pas valider employeeId car il est déjà pré-rempli avec le username et est désactivé
        employeeId: Yup.string().notRequired(),
        startDate: Yup.date().required('Date de début est requise'),
        endDate: Yup.date()
            .required('Date de fin est requise')
            .min(Yup.ref('startDate'), 'La date de fin doit être postérieure à la date de début'),
        type: Yup.string().required('Type de congé est requis'),
        status: Yup.string().required('Statut est requis'),
        reason: Yup.string(),
    });

    // Récupérer le rôle, le username et l'id de l'utilisateur à partir de localStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUserRole(storedUser.role);  // Mettre à jour le rôle de l'utilisateur
            setUsername(storedUser.username);  // Mettre à jour le nom d'utilisateur
            setUserId(storedUser.id);  // Mettre à jour l'ID de l'utilisateur
        }
    }, []);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        // Remplacer 'employeeId' par l'ID utilisateur (userId) avant de soumettre
        values.employeeId = userId;

        try {
            const response = await axios.post(BASE_URL, values);
            onLeaveAdded(response.data);
            resetForm();
        } catch (error) {
            console.error("Erreur lors de l'ajout du congé", error);
        } finally {
            setSubmitting(false);
            handleClose();
        }
    };

    return (
        <div>
            <h2>Ajouter un Congé</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        {/* Affichage du champ pour le nom d'utilisateur pré-rempli, mais non modifiable */}
                        <div className="mb-4">
                            <label>Nom d'utilisateur:</label>
                            <Field
                                type="text"
                                name="employeeId"
                                className="border rounded p-2"
                                value={username}  // Afficher le username récupéré depuis localStorage
                                disabled
                            />
                            {/* Pas besoin de message d'erreur pour ce champ puisqu'il n'est pas valide */}
                        </div>

                        <div className="mb-4">
                            <label>Date de début:</label>
                            <Field type="date" name="startDate" className="border rounded p-2" />
                            <ErrorMessage name="startDate" component="div" className="text-red-600" />
                        </div>

                        <div className="mb-4">
                            <label>Date de fin:</label>
                            <Field type="date" name="endDate" className="border rounded p-2" />
                            <ErrorMessage name="endDate" component="div" className="text-red-600" />
                        </div>

                        <div className="mb-4">
                            <label>Type de congé:</label>
                            <Field as="select" name="type" className="border rounded p-2">
                                <option value="Paid">Payé</option>
                                <option value="Unpaid">Non payé</option>
                            </Field>
                        </div>

                        {/* Afficher le statut sous forme de texte si l'utilisateur est un "user", sinon comme select */}
                        <div className="mb-4">
                            <label>Statut:</label>
                            {userRole === 'user' ? (
                                <Field
                                    type="text"
                                    name="status"
                                    className="border rounded p-2"
                                    value="Pending"  // La valeur est fixe pour les utilisateurs
                                    disabled
                                />
                            ) : (
                                <Field as="select" name="status" className="border rounded p-2">
                                    <option value="Pending">En attente</option>
                                    <option value="Approved">Approuvé</option>
                                    <option value="Rejected">Rejeté</option>
                                </Field>
                            )}
                            <ErrorMessage name="status" component="div" className="text-red-600" />
                        </div>

                        <div className="mb-4">
                            <label>Raison:</label>
                            <Field as="textarea" name="reason" className="border rounded p-2" />
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Ajouter
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default AddLeaveForm;
