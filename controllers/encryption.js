const crypto = require("crypto");
const algorith = "aes-256-ctr";
const secretKey = "8Fr1amse6GG03xflLN7QSkiF1FVAmTaB";
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorith, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString("hex"),
        content: encrypted.toString("hex"),
    };
};

const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(
        algorith,
        secretKey,
        Buffer.from(hash.iv, "hex")
    );
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(hash.content, "hex")),
        decipher.final(),
    ]);
    return decrypted.toString();
};

module.exports = {
    encrypt,
    decrypt,
};
