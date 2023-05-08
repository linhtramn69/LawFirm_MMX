const express = require("express");
const fee = require("../controllers/fee.controller")

const router = express.Router();

router.route("/")
    .get(fee.findAll)
    .post(fee.create);

router.route("/:id")
    .get(fee.findById)
    .patch(fee.update)
    .delete(fee.delete);

router.route("/findByMatter")
    .post(fee.findByMatter)

router.route("/findByStatus")
    .post(fee.findByStatus);

module.exports = router;