const express = require("express");
const thanhToan = require("../controllers/thanhToan.controller")

const router = express.Router();

router.route("/")
    .get(thanhToan.findAll)
    .post(thanhToan.create);

router.route("/:id")
    .get(thanhToan.findById)
    .put(thanhToan.update)
    .delete(thanhToan.delete);

module.exports = router;