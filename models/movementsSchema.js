const mongoose = require("mongoose");

const MovementSchema = new mongoose.Schema({
    description: String,
    createdDate: Date,
    amount: Number,
    transactionType: Number,
    userMail: String,
    status: Boolean,
});

module.exports = mongoose.model("movements", MovementSchema, "Movements");
