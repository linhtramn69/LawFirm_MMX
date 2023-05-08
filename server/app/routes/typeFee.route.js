const express = require("express");
const typeFee = require("../controllers/typeFee.controller")

const router = express.Router();

router.route("/")
    .get(typeFee.findAll)
    .post(typeFee.create);

router.route("/:id")
    .get(typeFee.findById)
    .put(typeFee.update)
    .delete(typeFee.delete);

module.exports = router;