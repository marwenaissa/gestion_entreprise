import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function UpdateLeaveForm({ leaveId, onLeaveUpdated, handleClose }) {
    const BASE_URL = "http://localhost:5000/api/leaves/";

    const [initialValues, setInitialValues] = useState({
        employeeId: '',
        startDate: '',
        endDate: '',
        type: 'Paid',
        status: 'Pending',
        reason: ''
    });

    const [userRole, setUserRole] = useState('');  // User role
    const [username, setUsername] = useState('');  // Username
    const [userId, setUserId] = useState('');  // User ID

    const validationSchema = Yup.object({
        employeeId: Yup.string().required('ID Employé est requis'),
        startDate: Yup.date().required('Date de début est requise'),
        endDate: Yup.date()
            .required('Date de fin est requise')
            .min(Yup.ref('startDate'), 'La date de fin doit être postérieure à la date de début'),
        type: Yup.string().required('Type de congé est requis'),
        status: Yup.string().required('Statut est requis'),
        reason: Yup.string(),
    });

    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const response = await axios.get(`${BASE_URL}${leaveId}`);
                const leaveData = response.data;

                // Log the leave data to ensure it's correctly structured
                console.log(leaveData);

                // Set initial values for the form
                setInitialValues({
                    employeeId: leaveData.employeeId.toString() || '', // Ensure employeeId is a string
                    startDate: formatDate(leaveData.startDate) || '',
                    endDate: formatDate(leaveData.endDate) || '',
                    type: leaveData.type || 'Paid',
                    status: leaveData.status || 'Pending',
                    reason: leaveData.reason || '',
                });
            } catch (error) {
                console.error("Erreur lors de la récupération du congé", error);
            }
        };

        if (leaveId) {
            fetchLeave();
        }

        // Get user data from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUserRole(storedUser.role);  // Set user role
            setUsername(storedUser.username);  // Set username
            setUserId(storedUser.id);  // Set user ID
        }
    }, [leaveId]);

    // Helper function to format date
    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0]; // Format YYYY-MM-DD
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        // Ensure employeeId is set to userId (which should be the ID string)
        values.employeeId = userId;  

        try {
            const response = await axios.put(`${BASE_URL}${leaveId}`, values);
            onLeaveUpdated(response.data);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du congé", error);
        } finally {
            setSubmitting(false);
            handleClose();
        }
    };

    return (
        <div>
            <h2>Modifier le congé</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true} // Ensure the form resets with new values
            >
                {({ isSubmitting }) => (
                    <Form>
                        {/* Display the username field as non-editable */}
                        <div className="mb-4">
                            <label>Nom d'utilisateur:</label>
                            <Field
                                type="text"
                                name="employeeId"
                                className="border rounded p-2"
                                value={username}  // Show username from localStorage
                                disabled
                            />
                            <ErrorMessage name="employeeId" component="div" className="text-red-600" />
                        </div>

                        {/* Start Date */}
                        <div className="mb-4">
                            <label>Date de début:</label>
                            <Field type="date" name="startDate" className="border rounded p-2" />
                            <ErrorMessage name="startDate" component="div" className="text-red-600" />
                        </div>

                        {/* End Date */}
                        <div className="mb-4">
                            <label>Date de fin:</label>
                            <Field type="date" name="endDate" className="border rounded p-2" />
                            <ErrorMessage name="endDate" component="div" className="text-red-600" />
                        </div>

                        {/* Leave Type */}
                        <div className="mb-4">
                            <label>Type de congé:</label>
                            <Field as="select" name="type" className="border rounded p-2">
                                <option value="Paid">Payé</option>
                                <option value="Unpaid">Non payé</option>
                            </Field>
                        </div>

                        {/* Status */}
                        <div className="mb-4">
                            <label>Statut:</label>
                            {userRole === 'user' ? (
                                <Field
                                    type="text"
                                    name="status"
                                    className="border rounded p-2"
                                    value="Pending"  // Fixed value for users
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

                        {/* Reason */}
                        <div className="mb-4">
                            <label>Raison:</label>
                            <Field as="textarea" name="reason" className="border rounded p-2" />
                        </div>

                        {/* Buttons */}
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
                                Mettre à jour
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default UpdateLeaveForm;
