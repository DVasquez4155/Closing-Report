// Dependencies
var Example = require("../models/example.js");

// Routes
module.exports = app => {
    // Create all our routes and set up logic within those routes where required.
    app.get("/", function (req, res) {
        res.render("index");
    });
    app.get("/api", (req,res) => {
        Example.findAll().then(function(results) {
            res.json(results);
        });
    })
    app.post("/api/create", (req,res) => {
        Example.create({
            name: req.body.name
        })
        .then(result => {
            res.json(req.body)
        })
    })
}