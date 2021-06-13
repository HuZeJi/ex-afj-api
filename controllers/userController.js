require("dotenv").config();
const userService = require("../services/userService");
const log4js = require("log4js");
const logger = log4js.getLogger("userController");

module.exports = {
    setUser,
    authorizeCredentials,
    updateUser,
    deleteUser,
};

function setUser(user) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await userService.setUser(user);
            resolve({ status: 200, message: "ok", data: response });
        } catch (ex) {
            resolve({ status: 500, message: "ex", data: ex });
        }
    });
}

function authorizeCredentials(userMail, password) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await userService.authenticateUser(
                userMail,
                password
            );
            resolve({
                status: response.status,
                message: "ok",
                data: response.data,
                error: response.error,
            });
        } catch (ex) {
            resolve({ status: 500, message: "error", data: ex });
        }
    });
}

function updateUser(userMail, userUpdated) {
    logger.level = "debug";
    logger.debug("Starting update user process!");
    return new Promise(async (resolve, reject) => {
        try {
            const response = await userService.updateUser(
                userMail,
                userUpdated
            );
            if (response.error) {
                logger.error(response.error);
                resolve({ status: 500, error: response.error });
            } else {
                logger.debug("Update success!");
                resolve({ status: 200, data: true });
            }
        } catch (err) {
            resolve({ status: 500, error: err });
        }
    });
}

function deleteUser(userMail) {
    logger.level = "debug";
    logger.debug("Starting delete user process!");
    return new Promise(async (resolve, reject) => {
        try {
            const response = await userService.deleteUser(userMail);
            if (response.error) {
                logger.error(response.error);
                resolve({ status: 500, error: response.error });
            } else {
                logger.debug("Delete success!");
                resolve({ status: 200, data: true });
            }
        } catch (err) {
            logger.error("Delete failed!");
            resolve({ status: 500, error: err });
        }
    });
}
