import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LeaveForm = ({ initialValues, validationSchema, onSubmit, handleClose }) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className="mb-4">
                        <label>ID Employé:</label>
                        <Field type="text" name="employeeId" className="border rounded p-2" />
                        <ErrorMessage name="employeeId" component="div" className="text-red-600" />
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
                        <Field as="select" name="type" className="border rounded p-2" validate={value => !value ? "Ce champ est requis" : undefined}>
                            <option value="">-- Choisissez un type de congé --</option>
                            <option value="Paid">Payé</option>
                            <option value="Unpaid">Non payé</option>
                        </Field>
                        <ErrorMessage name="type" component="div" className="text-red-500 mt-1" />
                    </div>


                    <div className="mb-4">
                        <label>Statut:</label>
                        <Field as="select" name="status" className="border rounded p-2">
                            <option value="Pending">En attente</option>
                            <option value="Approved">Approuvé</option>
                            <option value="Rejected">Rejeté</option>
                        </Field>
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
                            Soumettre
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default LeaveForm;
