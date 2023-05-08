const express = require("express");
const bill = require("../controllers/bill.controller")

const router = express.Router();

router.route("/")
    .get(bill.findAll)
    .post(bill.create);

router.route("/:id")
    .get(bill.findById)
    .put(bill.update)
    .delete(bill.delete);

router.route("/findByMatter")
    .post(bill.findByMatter)

router.route("/findByMonth")
    .post(bill.getByMonthAndType)

module.exports = router;