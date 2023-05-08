const express = require("express");
const period = require("../controllers/period.controller")

const router = express.Router();

router.route("/")
    .get(period.findAll)
    .post(period.create);

router.route("/:id")
    .get(period.findById)
    .put(period.update)
    .delete(period.delete);

module.exports = router;