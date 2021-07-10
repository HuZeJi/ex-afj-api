const MongoClient = require("mongodb").MongoClient;
const url = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB_NAME;
const client = new MongoClient(url);

const mongoose = require("mongoose");

const db = url;
mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);

mongoose.connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error) => {
        if (error) console.error(error);
    }
);

module.exports = {
    MongoClient,
    url,
    dbName,
    client,
};
