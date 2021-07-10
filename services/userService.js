require("dotenv").config();
const encryption = require("./../controllers/encryption");

const userSchema = require("../models/userSchema");

module.exports = {
  setUser,
  authenticateUser,
  updateUser,
  deleteUser,
  getAllUsers,
};

function setUser(user) {
    return new Promise((resolve, reject) => {
        newUser = userToSchema(user);
        newUser.save((err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
}

function userToSchema(user) {
    const passwordObject = encryption.encrypt(user.password);

    let populatedUser = new userSchema();
    populatedUser._id = user.email;
    populatedUser.name = user.name;
    populatedUser.authToken = user.authToken;
    populatedUser.email = user.email;
    populatedUser.firstName = user.firstName;
    populatedUser.lastName = user.lastName;
    populatedUser.provider = user.provider;
    populatedUser.photoUrl = user.photoUrl;
    populatedUser.passwordIv = passwordObject.iv;
    populatedUser.passwordContent = passwordObject.content;
    populatedUser.status = true;
    return populatedUser;
}

function getAllUsers() {
    return new Promise((resolve, reject) => {
        userSchema.find((err, user) => {
            if (!user) {
                resolve({ status: 204, error: "No users" });
            } else {
                if (!err) {
                    resolve({ status: 200, data: user });
                } else {
                    resolve({ status: 500, error: "Server error" });
                }
            }
        });
    });
}

function getUser(userMail) {
    users = new userSchema();
    return new Promise((resolve, reject) => {
        resolve(
            users.findById(userMail, (err, user) => {
                if (!user) {
                    resolve.statusCode = 404;
                    return resolve.send({ error: "Not found" });
                }
                if (!err) {
                    return resolve.send({ status: "OK", user: user });
                } else {
                    resolve.statusCode = 500;
                    return resolve.send({ error: "Server error" });
                }
            })
        );
    });
}

function authenticateUser(userMail, password) {
    return new Promise((resolve, reject) => {
        userSchema.findById(userMail, (err, user) => {
            if (!user) {
                resolve({
                    status: 401,
                    error:
                        "Credentials unauthorized for mail " + userMail,
                });
            } else {
                if (!err) {
                    const passToDecrypt = {
                        iv: user.passwordIv,
                        content: user.passwordContent,
                    };
                    const passDecrypted = encryption.decrypt(passToDecrypt);
                    if (
                        (passDecrypted === password.trim() &&
                        user.status !== false) ||
                        user.provider.toLowerCase() === 'google'
                    ) {
                        resolve({ status: 200, data: true });
                    } else {
                        resolve({
                            status: 401,
                            error:
                                "Credentials unauthorized for mail " + userMail,
                        });
                    }
                } else {
                    resolve({ status: 500, error: "Server error" });
                }
            }
        });
    });
}

function deleteUser(userMail) {
    return updateUser(userMail, { status: false });
}

function updateUser(userMail, userUpdated) {
    return new Promise((resolve, reject) => {
        if (userUpdated.password)
            userUpdated = getPasswordEncryption(userUpdated);
        userSchema.findByIdAndUpdate(userMail, userUpdated, (err, data) => {
            if (!data) resolve({ error: "User not found!" });
            else if (err) resolve({ error: err });
            else resolve(data);
        });
    });
}

function getPasswordEncryption(user) {
    const passwordObject = encryption.encrypt(user.password);
    user.passwordIv = passwordObject.iv;
    user.passwordContent = passwordObject.content;
    return user;
}
