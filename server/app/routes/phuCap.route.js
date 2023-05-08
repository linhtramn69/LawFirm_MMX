const express = require("express");
const phuCap = require("../controllers/phuCap.controller")

const router = express.Router();

router.route("/")
    .get(phuCap.findAll)
    .post(phuCap.create);

router.route("/:id")
    .get(phuCap.findById)
    .put(phuCap.update)
    .delete(phuCap.delete);

module.exports = router;