const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');

// Route pour ajouter un congé
router.post('/', async (req, res) => {
    console.log("Request body:", req.body); // Affiche le body reçu pour le débogage

    // Vérifier que toutes les données nécessaires sont présentes dans req.body
    const { employeeId, startDate, endDate, type, status, reason } = req.body;

    if (!employeeId || !startDate || !endDate || !type || !status || !reason) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Créer une instance de Leave avec les données reçues
    const leave = new Leave({
        employeeId,
        startDate,
        endDate,
        type,
        status,
        reason,
    });

    try {
        const savedLeave = await leave.save(); // Enregistrer dans la base de données
        res.status(201).json(savedLeave);      // Retourner les données enregistrées
    } catch (err) {
        console.error("Error saving leave:", err);
        res.status(500).json({ message: "Failed to save leave request" });
    }
});

// Récupérer tous les congés
router.get('/', async (req, res) => {
    try {
        const leaves = await Leave.find().populate('employeeId', 'username');  // Peupler employeeId avec le champ username du modèle User
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Récupérer un congé par ID
router.get('/:id', async (req, res) => {
    try {
        const leave = await Leave.findById(req.params.id).populate('employeeId', 'username');  // Peupler employeeId avec le champ username du modèle User
        if (!leave) return res.status(404).json({ message: 'Leave not found' });
        res.json(leave);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Mettre à jour un congé par ID
router.put('/:id', async (req, res) => {
    try {
        const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!leave) return res.status(404).json({ message: 'Leave not found' });
        res.json(leave);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Supprimer un congé par ID
router.delete('/:id', async (req, res) => {
    try {   
        const leave = await Leave.findByIdAndDelete(req.params.id);
        if (!leave) return res.status(404).json({ message: 'Leave not found' });
        res.json({ message: 'Leave deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
