require("dotenv").config();

const budgetsSchema = require("../models/budgetSchema");

module.exports = {
    setBudget,
    getBudgetsByUser,
};

function setBudget(budget) {
    return new Promise((resolve, reject) => {
        const newBudget = populateSchema(budget);
        newBudget.save((err, data) => {
            if (err) resolve({ error: err });
            else resolve({ data: data });
        });
    });
}

function getBudgetsByUser(userMail) {
    return new Promise((resolve, reject) => {
        budgetsSchema.find(
            { userMail: userMail, status: true },
            (err, data) => {
                if (err) resolve({ error: err });
                else if (!data) resolve({ error: "Data not found!" });
                else resolve({ data: data });
            }
        );
    });
}

// Utils

function populateSchema(budget) {
    let budgetSchema = new budgetsSchema();
    budgetSchema.description = budget.description;
    budgetSchema.date = budget.date;
    budgetSchema.amount = budget.amount;
    budgetSchema.goalAmount = budget.goalAmount;
    budgetSchema.userMail = budget.userMail;
    budgetSchema.status = true;
    return budgetSchema;
}
