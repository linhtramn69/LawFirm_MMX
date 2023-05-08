const express = require("express");
const customer = require("../controllers/customer.controller")

const router = express.Router();

router.route("/")
    .get(customer.findAll)
    .post(customer.create);

router.route("/:id")
    .get(customer.findById)
    .put(customer.update)
    .delete(customer.delete);

router.route("/login")
    .post(customer.login);

module.exports = router;