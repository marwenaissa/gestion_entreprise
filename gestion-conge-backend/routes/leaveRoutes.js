const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');


router.post('/', async (req, res) => {
    console.log("Request body:", req.body); // Affiche le body reçu
    
    // Créer une instance de Leave avec des données statiques
    const leave = new Leave({
        employeeId: "64fa8c3efb9e7a4d2f6b1234", // ID statique
        startDate: "2024-11-15",               // Date de début statique
        endDate: "2024-11-20",                 // Date de fin statique
        type: "Paid",                          // Type de congé statique
        status: "Pending",                     // Statut statique
        reason: "Family vacation"              // Raison statique
    });

    try {
        const savedLeave = await leave.save();
        res.status(201).json(savedLeave);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});




// Récupérer tous les congés
router.get('/', async (req, res) => {
    try {
        const leaves = await Leave.find();
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Récupérer un congé par ID
router.get('/:id', async (req, res) => {
    try {
        const leave = await Leave.findById(req.params.id);
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

