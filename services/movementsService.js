require("dotenv").config();

const movementsSchema = require("../models/movementsSchema");

module.exports = {
    setMovement,
    getMovementsByUser,
};

function setMovement(movement) {
    return new Promise((resolve, reject) => {
        newMovement = populateSchema(movement);
        newMovement.save((err, data) => {
            if (err) resolve({ error: err });
            else resolve({ data: data });
        });
    });
}

function getMovementsByUser(userMail) {
    return new Promise((resolve, reject) => {
        movementsSchema.find(
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

function populateSchema(movement) {
    let movementSchema = new movementsSchema();
    movementSchema.description = movement.description;
    movementSchema.createdDate = movement.createdDate;
    movementSchema.amount = movement.amount;
    movementSchema.transactionType = movement.transactionType;
    movementSchema.userMail = movement.userMail;
    movementSchema.status = true;
    return movementSchema;
}
