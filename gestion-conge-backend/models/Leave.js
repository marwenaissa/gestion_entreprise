const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
    reason: { type: String, required: true },
});

module.exports = mongoose.model('Leave', leaveSchema);
