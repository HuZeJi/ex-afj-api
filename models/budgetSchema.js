const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
    description: String,
    date: Date,
    amount: Number,
    goalAmount: Number,
    userMail: String,
    status: Boolean,
});

module.exports = mongoose.model("budgets", BudgetSchema, "Budgets");
