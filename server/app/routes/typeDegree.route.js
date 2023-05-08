const express = require("express");
const typeDegree = require("../controllers/typeDegree.controller")

const router = express.Router();

router.route("/")
    .get(typeDegree.findAll)
    .post(typeDegree.create);

router.route("/:id")
    .get(typeDegree.findById)
    .put(typeDegree.update)
    .delete(typeDegree.delete);

module.exports = router;