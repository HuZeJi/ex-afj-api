require("dotenv").config();
const budgetsService = require("../services/budgetService");
const log4js = require("log4js");
const logger = log4js.getLogger("budgetController");

module.exports = {
    setBudget,
    getBudgetsByUser,
};

function setBudget(budget) {
    logger.level = "debug";
    logger.debug("Starting new budget process!");
    return new Promise(async (resolve, reject) => {
        try {
            const response = await budgetsService.setBudget(budget);
            let status;
            if (response.error) {
                status = 500;
                logger.error(response.error);
            } else {
                status = 200;
                logger.debug("New budget process success");
            }
            resolve({
                status: status,
                data: true,
                error: response.error,
            });
        } catch (ex) {
            logger.error(ex);
            resolve({ status: 500, error: ex });
        }
    });
}

function getBudgetsByUser(userMail) {
    logger.level = "debug";
    logger.debug("Starting get budgets by user process!");
    return new Promise(async (resolve, reject) => {
        try {
            const response = await budgetsService.getBudgetsByUser(userMail);
            logger.info(response);
            let status;
            if (response.error) {
                status = 500;
                logger.error(response.error);
            } else {
                status = 200;
                logger.debug("Get budgets by user process success");
            }
            resolve({
                status: status,
                data: response.data,
                error: response.error,
            });
        } catch (ex) {
            logger.error(ex);
            resolve({ status: 500, error: ex });
        }
    });
}
