const express = require("express");
const typePay = require("../controllers/typePay.controller")

const router = express.Router();

router.route("/")
    .get(typePay.findAll)
    .post(typePay.create);

router.route("/:id")
    .get(typePay.findById)
    .put(typePay.update)
    .delete(typePay.delete);

module.exports = router;