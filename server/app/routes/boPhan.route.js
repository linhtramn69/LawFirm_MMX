const express = require("express");
const boPhan = require("../controllers/boPhan.controller")

const router = express.Router();

router.route("/")
    .get(boPhan.findAll)
    .post(boPhan.create);

router.route("/:id")
    .get(boPhan.findById)
    .put(boPhan.update)
    .delete(boPhan.delete);

module.exports = router;