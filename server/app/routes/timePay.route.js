const express = require("express");
const timePay = require("../controllers/timePay.controller")

const router = express.Router();

router.route("/")
    .get(timePay.findAll)
    .post(timePay.create);

router.route("/:id")
    .get(timePay.findById)
    .put(timePay.update)
    .delete(timePay.delete);

module.exports = router;