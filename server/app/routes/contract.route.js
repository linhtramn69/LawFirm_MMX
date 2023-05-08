const express = require("express");
const contract = require("../controllers/contract.controller")

const router = express.Router();

router.route("/")
    .get(contract.findAll)
    .post(contract.create);

router.route("/:id")
    .get(contract.findById)
    .put(contract.update)
    .delete(contract.delete);

module.exports = router;