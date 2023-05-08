const express = require("express");
const accountingEntry = require("../controllers/accountingEntry.controller")

const router = express.Router();

router.route("/")
    .get(accountingEntry.findAll)
    .post(accountingEntry.create);

router.route("/:id")
    .get(accountingEntry.findById)
    .put(accountingEntry.update)
    .delete(accountingEntry.delete);

module.exports = router;