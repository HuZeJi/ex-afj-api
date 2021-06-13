require("dotenv").config();
const movementsService = require("../services/movementsService");
const log4js = require("log4js");
const logger = log4js.getLogger("movementsControllers");

module.exports = {
    setMovement,
    getMovementsByUser,
};

function setMovement(movement) {
    logger.level = "debug";
    logger.debug("Starting new movement process!");
    return new Promise(async (resolve, reject) => {
        try {
            const response = await movementsService.setMovement(movement);
            let status;
            if (response.error) {
                status = 500;
                logger.error(response.error);
            } else {
                status = 200;
                logger.debug("New movement process success");
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

function getMovementsByUser(userMail) {
    logger.level = "debug";
    logger.debug("Starting get movements by user process!");
    return new Promise(async (resolve, reject) => {
        try {
            const response = await movementsService.getMovementsByUser(
                userMail
            );
            logger.info(response);
            let status;
            if (response.error) {
                status = 500;
                logger.error(response.error);
            } else {
                status = 200;
                logger.debug("Get movements by user process success");
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
