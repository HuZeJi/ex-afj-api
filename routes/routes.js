const userController = require("../controllers/userController");
const movementController = require("../controllers/movementsController");
const budgetController = require("../controllers/budgetController");

exports.assignRoutes = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Methods",
            "PUT, GET, POST, DELETE, OPTIONS"
        );
        res.header("Access-Control-Allow-Headers", "Content-Type");
        next();
    });

    app.get("/", function (req, res) {
        res.send("gyt-api-ex-innovation is Running well...");
    });

    app.post("/users", (req, res) => {
        userController.setUser(req.body).then((result) => {
            res.json(result);
        });
    });

    app.post("/users/validate", (req, res) => {
        userController
            .authorizeCredentials(req.body.userMail, req.body.password)
            .then((result) => {
                res.json(result);
            });
    });

    app.put("/users", (req, res) => {
        userController
            .updateUser(req.body.userMail, req.body.userUpdated)
            .then((result) => {
                res.json(result);
            });
    });

    app.delete("/users", (req, res) => {
        userController.deleteUser(req.body.userMail).then((result) => {
            res.json(result);
        });
    });

    app.post("/movements", (req, res) => {
        movementController.setMovement(req.body).then((result) => {
            res.json(result);
        });
    });

    app.post("/movements/by/user", (req, res) => {
        movementController
            .getMovementsByUser(req.body.userMail)
            .then((result) => {
                res.json(result);
            });
    });

    app.post("/budgets", (req, res) => {
        budgetController.setBudget(req.body).then((result) => {
            res.json(result);
        });
    });

    app.post("/budgets/by/user", (req, res) => {
        budgetController.getBudgetsByUser(req.body.userMail).then((result) => {
            res.json(result);
        });
    });
};
